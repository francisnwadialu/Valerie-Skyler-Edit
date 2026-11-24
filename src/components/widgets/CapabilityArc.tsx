"use client";

import { useRef, useState } from "react";
import {
  FIGTREE,
  IMG,
  MONO,
  ORBITRON,
  clamp,
  useScrollFrame,
  useWidth,
  viewportHeight,
} from "./shared";

const NAMES = [
  "Brand strategy",
  "Identity",
  "Art direction",
  "UI/UX design",
  "Design systems",
  "Framer sites",
  "Motion",
  "Launch",
];
const PICTURES = [
  "cap-1",
  "cap-2",
  "cap-3",
  "cap-4",
  "card-golden",
  "card-blue",
  "team-5",
  "card-afterglow",
];
const HUES = [0, -10, 8, -18, 6, -24, 12, -6];

/** "What we make": craft names ride an arc as you scroll while the portrait on the right crossfades. */
export function CapabilityArc({
  heading = "What we make",
  note = "Eight crafts, one team, one evening at a time.",
  ink = "#F4EEF6",
  stepVh = 32,
  names = NAMES,
}: {
  heading?: string;
  note?: string;
  ink?: string;
  stepVh?: number;
  names?: string[];
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const width = useWidth(ref, 1440);
  const [progress, setProgress] = useState(0);
  useScrollFrame(() => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const p = clamp(-r.top / Math.max(1, r.height - viewportHeight()));
    setProgress((prev) => (Math.abs(prev - p) > 0.002 ? p : prev));
  });

  const count = names.length;
  const pos = progress * (count - 1);
  const active = Math.round(pos);
  const phone = width < 860;
  const size = phone ? 34 : Math.min(72, Math.round(width * 0.05));
  const radius = phone ? 260 : Math.round(width * 0.36);
  const step = phone ? 13 : 10.5;
  const pictures = names.map((_, i) => IMG[PICTURES[i % PICTURES.length]]);

  return (
    <div
      ref={ref}
      data-step={active}
      style={{
        position: "relative",
        width: "100%",
        height: `calc(100vh + ${count * stepVh}vh)`,
      }}
    >
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          overflow: "hidden",
          color: ink,
          fontFamily: FIGTREE,
        }}
      >
        <div
          style={{
            position: "absolute",
            left: phone ? 16 : 48,
            top: phone ? 28 : 44,
            font: `500 12px/1 ${MONO}`,
            letterSpacing: ".05em",
            display: "flex",
            gap: 14,
          }}
        >
          <span>{heading}</span>
          <span style={{ opacity: 0.55, fontVariantNumeric: "tabular-nums" }}>
            {String(active + 1).padStart(2, "0")} /{" "}
            {String(count).padStart(2, "0")}
          </span>
        </div>
        <div
          style={{
            position: "absolute",
            right: phone ? 16 : 48,
            top: phone ? "auto" : "50%",
            bottom: phone ? 26 : "auto",
            width: Math.round(phone ? width * 0.42 : width * 0.27),
            aspectRatio: "4 / 5",
            transform: phone ? "none" : "translateY(-50%)",
            borderRadius: 3,
            overflow: "hidden",
            background: "#2B2752",
          }}
        >
          {pictures.map((src, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={i}
              src={src}
              alt=""
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                opacity: +(i === active),
                transform: `scale(${i === active ? 1.02 : 1.1})`,
                filter: `hue-rotate(${HUES[i % HUES.length]}deg)`,
                transition:
                  "opacity .7s ease, transform 1.2s cubic-bezier(.2,.8,.2,1)",
              }}
            />
          ))}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(180deg, rgba(0,0,0,0) 60%, rgba(18,16,40,.55))",
            }}
          />
          <span
            style={{
              position: "absolute",
              left: 14,
              bottom: 12,
              font: `500 11px/1 ${MONO}`,
              letterSpacing: ".05em",
              color: "#fff",
            }}
          >
            {names[active]}
          </span>
        </div>
        <div
          style={{
            position: "absolute",
            left: phone ? -radius + 30 : -radius + Math.round(width * 0.08),
            top: phone ? "40%" : "50%",
            width: 0,
            height: 0,
          }}
        >
          {names.map((n, i) => {
            const d = i - pos;
            const dist = Math.abs(d);
            const a = clamp(1 - dist * 0.3, 0, 1);
            return (
              <div
                key={i}
                style={{
                  position: "absolute",
                  left: 0,
                  top: 0,
                  transform: `rotate(${(d * step).toFixed(2)}deg) translate(${radius}px, -50%)`,
                  transformOrigin: "0 0",
                  whiteSpace: "nowrap",
                  fontFamily: ORBITRON,
                  fontSize: size,
                  fontWeight: 500,
                  letterSpacing: "-0.045em",
                  lineHeight: 1,
                  opacity: 0.12 + 0.88 * a,
                  filter: `blur(${Math.min(8, dist * 3.2).toFixed(1)}px)`,
                  transition:
                    "transform .25s linear, opacity .25s linear, filter .25s linear",
                }}
              >
                {n}
              </div>
            );
          })}
        </div>
        {phone ? null : (
          <p
            style={{
              position: "absolute",
              left: 48,
              bottom: 44,
              margin: 0,
              maxWidth: 320,
              fontSize: 16,
              lineHeight: 1.5,
              opacity: 0.75,
            }}
          >
            {note}
          </p>
        )}
      </div>
    </div>
  );
}
