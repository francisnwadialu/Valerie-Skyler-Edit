"use client";

import { useRef, useState } from "react";
import {
  FIGTREE,
  MONO,
  ORBITRON,
  clamp,
  useScrollFrame,
  useWidth,
  viewportHeight,
} from "./shared";

const FLOOR = 0.14; // opacity of a word that has not been read yet

/** Headline whose words light up one by one as it scrolls into view; small image "windows" open between words. */
export function ReadIn({
  label = "About Valerie Skyler",
  before = "Brands and sites that hold",
  phrase = "the last light",
  after = "",
  note = "From ObsidianHeights2108.",
  pill1,
  pill2,
  pill1After = 0,
  pill2After = 3,
  ink = "#ffffff",
  accent = "#F08A5D",
}: {
  label?: string;
  before?: string;
  phrase?: string;
  after?: string;
  note?: string;
  pill1?: string;
  pill2?: string;
  pill1After?: number;
  pill2After?: number;
  ink?: string;
  accent?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const width = useWidth(ref, 1200);
  const [k, setK] = useState(0);
  useScrollFrame(() => {
    const el = ref.current;
    if (!el) return;
    const vh = viewportHeight();
    const next = clamp(
      (vh * 0.82 - el.getBoundingClientRect().top) / (vh * 0.62),
    );
    setK((p) => (Math.abs(p - next) > 0.003 ? next : p));
  });

  const phone = width < 700;
  const size = phone
    ? Math.max(34, Math.round(width * 0.1))
    : Math.min(112, Math.round(width * 0.068));
  const head = before.split(/\s+/).filter(Boolean);
  const tail = after.split(/\s+/).filter(Boolean);
  const total = head.length + 1 + tail.length;
  const lit = (i: number) => clamp((k * (total + 2) - i) / 1.6);

  const word = (w: string, i: number, key: string) => (
    <span
      key={key}
      style={{
        opacity: FLOOR + (1 - FLOOR) * lit(i),
        transition: "opacity .3s linear",
      }}
    >
      {w}{" "}
    </span>
  );
  const window_ = (src: string | undefined, i: number, key: string) => {
    const r = lit(i + 0.5);
    return (
      <span
        key={key}
        aria-hidden
        style={{
          display: "inline-block",
          verticalAlign: "-0.08em",
          height: "0.78em",
          width: `${(1.7 * r).toFixed(3)}em`,
          marginRight: `${(0.22 * r).toFixed(3)}em`,
          borderRadius: "0.4em",
          overflow: "hidden",
          position: "relative",
          transition: "width .35s cubic-bezier(.2,.8,.2,1), margin .35s",
          background: "linear-gradient(120deg,#7B67B5,#E59AB0 55%,#F7B892)",
        }}
      >
        {src ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={src}
            alt=""
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        ) : null}
      </span>
    );
  };

  const parts: React.ReactNode[] = [];
  head.forEach((w, i) => {
    parts.push(word(w, i, `w${i}`));
    if (pill1 !== undefined && i === pill1After)
      parts.push(window_(pill1, i, "p1"));
    if (pill2 !== undefined && i === pill2After)
      parts.push(window_(pill2, i, "p2"));
  });
  const glow = lit(head.length);
  parts.push(
    <span
      key="phrase"
      style={{
        backgroundImage: `linear-gradient(90deg, ${ink} 0%, ${ink} 33.3%, #F2A27E 45%, #E888AC 60%, #A98BD6 75%, #E888AC 90%, #F2A27E 100%)`,
        backgroundSize: "300% 100%",
        backgroundPosition: `${(glow * 78).toFixed(2)}% 0`,
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        color: "transparent",
        opacity: FLOOR + (1 - FLOOR) * clamp(glow * 3),
        transition: "background-position .35s linear, opacity .3s linear",
      }}
    >
      {phrase}
    </span>,
  );
  tail.forEach((w, i) => {
    parts.push(<span key={`s${i}`}> </span>);
    parts.push(word(w, head.length + 1 + i, `t${i}`));
  });
  parts.push(
    <span key="dot" style={{ color: accent, opacity: lit(total) }}>
      .
    </span>,
  );

  const corners = ["0 0", "100% 0", "0 100%", "100% 100%"];
  return (
    <div
      ref={ref}
      style={{
        width: "100%",
        position: "relative",
        overflowX: "clip",
        fontFamily: FIGTREE,
        color: ink,
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: phone ? "1fr" : "minmax(160px, 1fr) 4fr",
          gap: phone ? 28 : 40,
          alignItems: "start",
        }}
      >
        <div style={{ paddingTop: phone ? 0 : size * 0.22 }}>
          <span
            style={{
              position: "relative",
              display: "inline-block",
              padding: "9px 12px",
              font: `500 12px/1 ${MONO}`,
              letterSpacing: ".04em",
              color: ink,
              opacity: 0.8,
            }}
          >
            {corners.map((c, i) => (
              <i
                key={i}
                style={{
                  position: "absolute",
                  width: 7,
                  height: 7,
                  left: c.startsWith("0") ? 0 : undefined,
                  right: c.startsWith("100") ? 0 : undefined,
                  top: c.endsWith(" 0") ? 0 : undefined,
                  bottom: c.endsWith("100%") ? 0 : undefined,
                  borderColor: ink,
                  borderStyle: "solid",
                  borderWidth: `${+c.endsWith(" 0")}px ${+c.startsWith("100")}px ${+c.endsWith("100%")}px ${+c.startsWith("0")}px`,
                  opacity: 0.6,
                }}
              />
            ))}
            {label}
          </span>
        </div>
        <div>
          <h2
            style={{
              margin: 0,
              fontFamily: ORBITRON,
              fontSize: size,
              lineHeight: 1.08,
              fontWeight: 500,
              letterSpacing: "-0.035em",
              textWrap: "balance",
            }}
          >
            {parts}
          </h2>
          {note ? (
            <p
              style={{
                margin: `${Math.round(size * 0.7)}px 0 0`,
                maxWidth: 420,
                fontSize: phone ? 15 : 17,
                lineHeight: 1.5,
                color: ink,
                opacity: 0.25 + 0.5 * clamp(k * 1.4 - 0.3),
                transition: "opacity .3s linear",
              }}
            >
              {note}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
