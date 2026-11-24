"use client";

import { useState, type CSSProperties, type FormEvent } from "react";

const FIGTREE = '"Figtree", "Figtree Placeholder", sans-serif';

/** Same delivery convention as the contact form: POST FormData to this endpoint. */
const ENDPOINT = process.env.NEXT_PUBLIC_FORM_ENDPOINT ?? "";

type State = "idle" | "pending" | "error" | "done";

const LABELS: Record<Exclude<State, "done">, string> = {
  idle: "Subscribe",
  pending: "Sending…",
  error: "Try again",
};

/**
 * One-line email capture in the footer, replacing the plain mailto line.
 * Posts `{ email }` to NEXT_PUBLIC_FORM_ENDPOINT when it is configured; without
 * an endpoint it confirms in place so the preview stays usable.
 */
export function EmailSignup({ isPhone }: { isPhone: boolean }) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<State>("idle");

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!email.trim()) return;
    setState("pending");
    try {
      if (ENDPOINT) {
        const res = await fetch(ENDPOINT, {
          method: "POST",
          body: new FormData(form),
          headers: { Accept: "application/json" },
        });
        if (!res.ok) throw new Error(`Signup endpoint answered ${res.status}`);
      } else {
        console.warn(
          "EmailSignup: NEXT_PUBLIC_FORM_ENDPOINT is not set, so the address was not sent anywhere.",
        );
      }
      setEmail("");
      setState("done");
    } catch (err) {
      console.error(err);
      setState("error");
    }
  };

  if (state === "done") {
    return (
      <p
        aria-live="polite"
        style={{
          margin: 0,
          fontFamily: FIGTREE,
          fontWeight: 500,
          fontSize: isPhone ? 20 : 24,
          letterSpacing: "-0.03em",
          lineHeight: 1.15,
          color: "#f4eef6",
        }}
      >
        Thanks — you&apos;re on the list.
      </p>
    );
  }

  const field: CSSProperties = {
    width: "100%",
    display: "block",
    background: "transparent",
    border: 0,
    borderBottom: "1px solid rgba(244,238,246,0.4)",
    borderRadius: 0,
    padding: "8px 0 10px",
    color: "#f4eef6",
    outlineColor: "rgba(255,44,223,0.7)",
    fontFamily: FIGTREE,
    fontWeight: 500,
    fontSize: isPhone ? 17 : 22,
    letterSpacing: "-0.02em",
  };

  return (
    <form
      onSubmit={submit}
      style={{
        display: "flex",
        alignItems: "flex-end",
        gap: 12,
        width: isPhone ? 280 : 430,
        maxWidth: "100%",
      }}
    >
      <label htmlFor="footer-email" style={{ flex: "1 1 auto", minWidth: 0 }}>
        <span
          style={{
            position: "absolute",
            width: 1,
            height: 1,
            overflow: "hidden",
            clip: "rect(0 0 0 0)",
            whiteSpace: "nowrap",
          }}
        >
          Email address
        </span>
        <input
          id="footer-email"
          type="email"
          name="email"
          required
          autoComplete="email"
          placeholder="Your email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            if (state === "error") setState("idle");
          }}
          style={field}
        />
      </label>
      <button
        type="submit"
        className="vs-signup-box"
        disabled={state === "pending"}
        style={{
          flex: "0 0 auto",
          cursor: state === "pending" ? "progress" : "pointer",
          fontFamily: FIGTREE,
          fontWeight: 500,
          fontSize: 14,
          letterSpacing: 0,
        }}
      >
        {LABELS[state]}
      </button>
    </form>
  );
}
