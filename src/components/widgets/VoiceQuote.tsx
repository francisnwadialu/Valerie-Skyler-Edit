"use client";

import { useRef, useState } from "react";
import {
  FIGTREE,
  IMG,
  MONO,
  clamp,
  useScrollFrame,
  useWidth,
  viewportHeight,
} from "./shared";

const CSS = `
@keyframes vq-sway{0%,100%{transform:rotate(-20deg) translateX(0)}50%{transform:rotate(-15deg) translateX(3%)}}
.vq-ray{position:absolute;top:-30%;height:160%;transform-origin:50% 0;filter:blur(24px);mix-blend-mode:screen;pointer-events:none;animation:vq-sway 16s ease-in-out infinite}
@media (prefers-reduced-motion: reduce){.vq-ray{animation:none}}
`;

/** Testimonial over a photo: the quote resolves word by word as it scrolls into view. */
export function VoiceQuote({
  image = IMG.voice,
  quote = "They made our brand feel like the best hour of the day.",
  name = "Mara Quint",
  role = "Founder, Juno",
}: {
  image?: string;
  quote?: string;
  name?: string;
  role?: string;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const width = useWidth(ref, 1440);
  const [reveal, setReveal] = useState(0);
  const [par, setPar] = useState(0.5);
  useScrollFrame(() => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const vh = viewportHeight();
    setReveal(clamp((vh * 0.8 - r.top) / (vh * 0.5)));
    setPar(clamp((vh - r.top) / (vh + r.height)));
  });

  const words = quote.split(/\s+/);
  const phone = width < 760;
  const size = phone ? 34 : Math.min(80, Math.round(width * 0.054));

  return (
    <figure
      ref={ref}
      style={{
        position: "relative",
        margin: 0,
        width: "100%",
        height: "100%",
        minHeight: 560,
        overflow: "hidden",
        fontFamily: FIGTREE,
        color: "#fff",
      }}
    >
      <style>{CSS}</style>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={image}
        alt=""
        style={{
          position: "absolute",
          inset: "-8% 0",
          width: "100%",
          height: "116%",
          objectFit: "cover",
          objectPosition: "50% 60%",
          transform: `translate3d(0, ${((par - 0.5) * -6).toFixed(2)}%, 0)`,
          transition: "transform .2s linear",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(14,15,38,.55), rgba(14,15,38,.15) 45%, rgba(14,15,38,.6))",
        }}
      />
      <div
        className="vq-ray"
        style={{
          left: "52%",
          width: "16%",
          opacity: 0.35,
          background:
            "linear-gradient(180deg, rgba(255,226,236,.9), rgba(255,226,236,0) 75%)",
        }}
      />
      <blockquote
        style={{
          position: "absolute",
          left: phone ? 16 : "8%",
          right: phone ? 16 : "8%",
          top: phone ? 70 : "16%",
          margin: 0,
          fontSize: size,
          lineHeight: 1.06,
          fontWeight: 500,
          letterSpacing: "-0.04em",
          textWrap: "balance",
        }}
      >
        <span style={{ color: "#F2A27E" }}>“</span>
        {words.map((w, i) => {
          const k = clamp(reveal * (words.length + 3) - i);
          return (
            <span
              key={i}
              style={{
                display: "inline-block",
                marginRight: "0.24em",
                opacity: 0.08 + 0.92 * k,
                filter: `blur(${((1 - k) * 8).toFixed(1)}px)`,
                transform: `translate3d(0, ${((1 - k) * 12).toFixed(1)}px, 0)`,
                transition:
                  "opacity .4s ease, filter .4s ease, transform .5s cubic-bezier(.2,.8,.2,1)",
              }}
            >
              {w}
            </span>
          );
        })}
      </blockquote>
      <figcaption
        style={{
          position: "absolute",
          left: phone ? 16 : "8%",
          bottom: phone ? 28 : 48,
          display: "flex",
          alignItems: "center",
          gap: 12,
          font: `500 13px/1.4 ${MONO}`,
          letterSpacing: ".03em",
          opacity: clamp(reveal * 1.6 - 0.6),
        }}
      >
        <i
          style={{ display: "block", width: 28, height: 1, background: "#fff" }}
        />
        {name}, {role}
      </figcaption>
    </figure>
  );
}
