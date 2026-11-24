/**
 * Contact form states: "Send the brief" -> "Sending…" -> "Sent. Talk soon." (or "Try again"), with the
 * colors the original used for each state. The original posted to Framer's form service; here the form
 * posts to the endpoint in NEXT_PUBLIC_FORM_ENDPOINT (see README).
 */
const ENDPOINT = process.env.NEXT_PUBLIC_FORM_ENDPOINT ?? "";

const STATES = {
  idle: { label: "Send the brief", cls: "framer-v-lw363z", bg: "", ink: "" },
  pending: {
    label: "Sending…",
    cls: "framer-v-1ibf7wt",
    bg: "var(--token-6559151e-b3db-40e8-bc0b-3e41f07b541e)",
    ink: "",
  },
  error: {
    label: "Try again",
    cls: "framer-v-1owm3ti",
    bg: "rgb(184, 50, 90)",
    ink: "",
  },
  success: {
    label: "Sent. Talk soon.",
    cls: "framer-v-3th3wz",
    bg: "var(--token-b6ee4dcb-e020-468b-aab7-5de7ec43ace1)",
    ink: "#17141F",
  },
} as const;
type State = keyof typeof STATES;

export function initContactForm(root: ParentNode): () => void {
  const form = root.querySelector<HTMLFormElement>("form");
  const button = form?.querySelector<HTMLElement>(".framer-IsWPZ");
  if (!form || !button) return () => {};
  const label = button.querySelector<HTMLElement>("p");
  const idleBg = button.style.backgroundColor;
  const idleInk = label?.style.getPropertyValue("--framer-text-color") ?? "";
  let timer = 0;

  const set = (state: State) => {
    const s = STATES[state];
    button.classList.remove(...Object.values(STATES).map((v) => v.cls));
    button.classList.add(s.cls);
    button.style.backgroundColor = s.bg || idleBg;
    if (label) {
      label.textContent = s.label;
      if (s.ink) label.style.setProperty("--framer-text-color", s.ink);
      else if (idleInk) label.style.setProperty("--framer-text-color", idleInk);
    }
  };

  const onSubmit = async (e: SubmitEvent) => {
    e.preventDefault();
    window.clearTimeout(timer);
    set("pending");
    try {
      if (!ENDPOINT) throw new Error("NEXT_PUBLIC_FORM_ENDPOINT is not set");
      const res = await fetch(ENDPOINT, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });
      if (!res.ok) throw new Error(`Form endpoint answered ${res.status}`);
      set("success");
      form.reset();
      timer = window.setTimeout(() => set("idle"), 6000);
    } catch (err) {
      console.error(err);
      set("error");
      timer = window.setTimeout(() => set("idle"), 4000);
    }
  };
  form.addEventListener("submit", onSubmit);
  return () => {
    window.clearTimeout(timer);
    form.removeEventListener("submit", onSubmit);
  };
}
