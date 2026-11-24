"use client";

import { useEffect, useRef, useState } from "react";
import {
  FIGTREE,
  MONO,
  ORBITRON,
  clamp,
  useScrollFrame,
  useWidth,
  viewportHeight,
} from "./shared";

interface Card {
  img?: { src: string; alt?: string };
  title: string;
  line: string;
  link: string;
}

const BASE = [
  {
    time: "01",
    phase: "Prelude",
    grad: "linear-gradient(180deg,#F3B28E,#E58FA5 60%,#8E6DB5)",
  },
  {
    time: "02",
    phase: "Blue hour",
    grad: "linear-gradient(180deg,#5E79C9,#9D8AD3 55%,#E7A8B8)",
  },
  {
    time: "03",
    phase: "Afterglow",
    grad: "linear-gradient(180deg,#F7C09C,#EE8F80 50%,#5B3F7E)",
  },
] as const;

const CSS = `
.hc-card{position:relative;display:block;overflow:hidden;border-radius:4px;text-decoration:none;color:#fff;isolation:isolate;transition:clip-path 1s cubic-bezier(.2,.8,.2,1), transform .25s linear}
.hc-pre .hc-card{clip-path:inset(100% 0 0 0)}
.hc-card img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;transition:transform 1.1s cubic-bezier(.2,.8,.2,1), filter .8s ease;transform:scale(1.02)}
.hc-card:hover img{transform:scale(1.07);filter:hue-rotate(-14deg) saturate(1.18) brightness(1.04)}
.hc-ray{position:absolute;top:-40%;left:-60%;width:38%;height:180%;transform:rotate(18deg) translateX(0);background:linear-gradient(90deg,rgba(255,236,246,0),rgba(255,236,246,.42),rgba(255,236,246,0));filter:blur(14px);mix-blend-mode:screen;pointer-events:none;animation:hc-sweep 7.5s cubic-bezier(.5,0,.3,1) infinite}
.hc-card:hover .hc-ray{animation-duration:2.2s}
@keyframes hc-sweep{0%,62%{transform:rotate(18deg) translateX(0);opacity:0}66%{opacity:1}100%{transform:rotate(18deg) translateX(520%);opacity:0}}
.hc-line{transform:translateY(110%);opacity:0;transition:transform .55s cubic-bezier(.2,.8,.2,1), opacity .4s ease}
.hc-card:hover .hc-line,.hc-card:focus-visible .hc-line{transform:none;opacity:1}
.hc-title{transition:transform .55s cubic-bezier(.2,.8,.2,1)}
.hc-card:hover .hc-title{transform:translateY(-6px)}
@media (hover:none){.hc-line{transform:none;opacity:1}}
@media (prefers-reduced-motion: reduce){.hc-ray{animation:none;opacity:0}.hc-card{transition:none}}
`;

/** "One studio. Three kinds of light.": three cards that wipe in on scroll, drift with it, and react to hover. */
export function HourCards({
  heading,
  ink = "#ffffff",
  cards,
}: {
  heading: string;
  ink?: string;
  cards: [Card, Card, Card];
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const width = useWidth(ref, 1200);
  const [state, setState] = useState<"idle" | "pre" | "in">("idle");
  const [b, setB] = useState(0.5);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (!reduced && el.getBoundingClientRect().top > viewportHeight() * 0.9)
      setState("pre");
  }, []);

  useScrollFrame(() => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const vh = viewportHeight();
    if (r.top < vh * 0.82) setState((s) => (s === "pre" ? "in" : s));
    const next = clamp((vh - r.top) / (vh + r.height));
    setB((p) => (Math.abs(p - next) > 0.003 ? next : p));
  });

  const phone = width < 700;
  const h2 = phone ? 34 : Math.min(64, Math.round(width * 0.042));
  const offsets = phone ? [0, 0, 0] : [0, 90, 36];
  const drift = phone ? [0, 0, 0] : [-40, 50, -10];

  return (
    <div
      ref={ref}
      className={state === "pre" ? "hc-pre" : ""}
      style={{
        width: "100%",
        overflowX: "clip",
        overflowY: "visible",
        fontFamily: FIGTREE,
        color: ink,
      }}
    >
      <style>{CSS}</style>
      <h2
        style={{
          margin: `0 0 ${phone ? 32 : 56}px`,
          fontFamily: ORBITRON,
          fontSize: h2,
          lineHeight: 1.02,
          fontWeight: 500,
          letterSpacing: "-0.04em",
          maxWidth: phone ? "100%" : "9.5em",
        }}
      >
        {heading}
      </h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: phone ? "1fr" : "repeat(3, 1fr)",
          gap: phone ? 14 : Math.round(width * 0.018),
          alignItems: "start",
          paddingBottom: phone ? 0 : 90,
        }}
      >
        {cards.map((c, i) => {
          const base = BASE[i];
          const y = offsets[i] + drift[i] * (b - 0.5) * 2;
          return (
            <a
              key={i}
              className="hc-card"
              href={c.link}
              style={{
                aspectRatio: phone ? "4 / 4.4" : "3 / 4",
                transform: `translate3d(0, ${y.toFixed(1)}px, 0)`,
                transitionDelay: `${i * 0.14}s, 0s`,
                background: base.grad,
              }}
            >
              {c.img ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={c.img.src} alt={c.img.alt ?? ""} />
              ) : null}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(180deg, rgba(20,12,40,.28) 0%, rgba(0,0,0,0) 28%, rgba(0,0,0,0) 52%, rgba(30,14,44,.55) 100%)",
                }}
              />
              <div
                className="hc-ray"
                style={{ animationDelay: `${1.2 + i * 2.4}s` }}
              />
              <div
                style={{
                  position: "absolute",
                  left: 20,
                  top: 18,
                  right: 20,
                  display: "flex",
                  justifyContent: "space-between",
                  font: `500 12px/1 ${MONO}`,
                  letterSpacing: ".05em",
                  opacity: 0.9,
                }}
              >
                <span>{base.time}</span>
                <span>{base.phase}</span>
              </div>
              <div
                style={{
                  position: "absolute",
                  left: 20,
                  right: 20,
                  bottom: 20,
                  overflow: "hidden",
                }}
              >
                <div
                  className="hc-title"
                  style={{
                    fontFamily: ORBITRON,
                    fontSize: phone
                      ? 40
                      : Math.min(54, Math.round(width * 0.036)),
                    fontWeight: 500,
                    letterSpacing: "-0.045em",
                    lineHeight: 1,
                  }}
                >
                  {c.title}
                </div>
                <div style={{ overflow: "hidden", marginTop: 10 }}>
                  <p
                    className="hc-line"
                    style={{
                      margin: 0,
                      fontSize: 15,
                      lineHeight: 1.4,
                      maxWidth: 260,
                      color: "rgba(255,255,255,.9)",
                    }}
                  >
                    {c.line}
                  </p>
                </div>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}
