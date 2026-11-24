"use client";

import { useRef, useState } from "react";
import {
  FIGTREE,
  IMG,
  MONO,
  ORBITRON,
  clamp,
  lerp,
  useScrollFrame,
  useWidth,
  viewportHeight,
} from "./shared";

interface Step {
  time: string;
  title: string;
  line: string;
}

const STEPS: Step[] = [
  {
    time: "01",
    title: "Listen",
    line: "Two calls, one workshop. We learn what has to be true.",
  },
  {
    time: "02",
    title: "Shape",
    line: "One direction, drawn three ways, chosen together.",
  },
  {
    time: "03",
    title: "Build",
    line: "Identity, interface and Framer site, made side by side.",
  },
  {
    time: "04",
    title: "Launch",
    line: "We ship, hand over, and stay for the first month.",
  },
];

/** "How an evening goes": a sticky scene where the sun sets and the steps change as you scroll. */
export function EveningSteps({
  image = IMG.horizon,
  heading = "How an evening goes",
  stepVh = 80,
  horizon = 0.86,
  steps = STEPS,
}: {
  image?: string;
  heading?: string;
  stepVh?: number;
  horizon?: number;
  steps?: Step[];
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const width = useWidth(ref, 1440);
  const [m, setM] = useState(0);
  useScrollFrame(() => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const p = clamp(-r.top / Math.max(1, r.height - viewportHeight()));
    setM((prev) => (Math.abs(prev - p) > 0.002 ? p : prev));
  });

  const count = steps.length;
  const active = Math.min(count - 1, Math.floor(m * count));
  const phone = width < 760;
  const sunY = lerp(0.18, horizon + 0.07, m);
  const sunX = lerp(0.62, 0.55, m);
  const sunR = phone ? 70 : Math.round(width * 0.065);
  const brightness = lerp(1.05, 0.62, m);
  const saturate = lerp(1.1, 0.85, m);
  const title = phone ? 64 : Math.min(150, Math.round(width * 0.1));

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
          background: "#1B1838",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image}
          alt=""
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "50% 50%",
            filter: `brightness(${brightness.toFixed(3)}) saturate(${saturate.toFixed(3)})`,
            transform: `scale(${lerp(1.03, 1, m).toFixed(3)})`,
            transition: "filter .3s linear, transform .3s linear",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `linear-gradient(180deg, rgba(14,15,38,${lerp(0.05, 0.75, m).toFixed(3)}) 0%, rgba(14,15,38,0) 55%)`,
            transition: "background .3s linear",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            height: `${horizon * 100}%`,
            overflow: "hidden",
            pointerEvents: "none",
          }}
        >
          <div
            style={{
              position: "absolute",
              left: `${sunX * 100}%`,
              top: `${(sunY / horizon) * 100}%`,
              width: sunR * 2,
              height: sunR * 2,
              marginLeft: -sunR,
              marginTop: -sunR,
              borderRadius: "50%",
              mixBlendMode: "screen",
              background:
                "radial-gradient(circle at 50% 45%, rgba(255,241,222,.95) 0%, rgba(255,197,154,.9) 38%, rgba(245,154,138,.55) 62%, rgba(245,154,138,0) 71%)",
              boxShadow: `0 0 ${sunR * 1.6}px ${Math.round(sunR * 0.5)}px rgba(255,180,140,${lerp(0.55, 0.25, m).toFixed(2)})`,
              transition: "top .3s linear, left .3s linear",
            }}
          />
        </div>
        <div
          style={{
            position: "absolute",
            left: `${sunX * 100}%`,
            top: `${horizon * 100}%`,
            width: sunR * 0.9,
            marginLeft: -sunR * 0.45,
            height: "30%",
            background:
              "linear-gradient(180deg, rgba(255,200,160,.7), rgba(255,200,160,0))",
            filter: "blur(10px)",
            opacity: lerp(0.9, 0.1, m),
            mixBlendMode: "screen",
            transition: "opacity .3s linear, left .3s linear",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: phone ? 16 : 48,
            right: phone ? 16 : 48,
            top: phone ? 26 : 38,
            display: "flex",
            justifyContent: "space-between",
            color: "#fff",
            font: `500 12px/1 ${MONO}`,
            letterSpacing: ".05em",
          }}
        >
          <span>{heading}</span>
          <span style={{ display: "flex", gap: 8 }}>
            {steps.map((_, i) => (
              <i
                key={i}
                style={{
                  display: "block",
                  width: 26,
                  height: 2,
                  background: "#fff",
                  opacity: i <= active ? 1 : 0.3,
                  transition: "opacity .4s",
                }}
              />
            ))}
          </span>
        </div>
        <div
          style={{
            position: "absolute",
            left: phone ? 16 : 48,
            bottom: phone ? 40 : 56,
            right: phone ? 16 : "auto",
            color: "#fff",
            fontFamily: FIGTREE,
          }}
        >
          <div
            style={{
              position: "relative",
              height: title * 1.02,
              minWidth: phone ? 0 : title * 5.5,
            }}
          >
            {steps.map((s, i) => (
              <div
                key={i}
                style={{
                  position: "absolute",
                  left: 0,
                  bottom: 0,
                  display: "flex",
                  alignItems: "baseline",
                  gap: phone ? 12 : 24,
                  whiteSpace: "nowrap",
                  opacity: +(i === active),
                  filter: i === active ? "none" : "blur(10px)",
                  transform: `translate3d(0, ${i === active ? 0 : i < active ? -30 : 30}px, 0)`,
                  transition:
                    "opacity .6s ease, filter .6s ease, transform .7s cubic-bezier(.2,.8,.2,1)",
                }}
              >
                <span
                  style={{
                    font: `500 ${phone ? 14 : 16}px/1 ${MONO}`,
                    opacity: 0.85,
                  }}
                >
                  {s.time}
                </span>
                <span
                  style={{
                    fontFamily: ORBITRON,
                    fontSize: title,
                    fontWeight: 500,
                    letterSpacing: "-0.055em",
                    lineHeight: 0.9,
                  }}
                >
                  {s.title}
                </span>
              </div>
            ))}
          </div>
          <div
            style={{
              position: "relative",
              height: 48,
              marginTop: 18,
              maxWidth: 420,
            }}
          >
            {steps.map((s, i) => (
              <p
                key={i}
                style={{
                  position: "absolute",
                  left: 0,
                  top: 0,
                  margin: 0,
                  fontSize: phone ? 15 : 17,
                  lineHeight: 1.45,
                  color: "rgba(255,255,255,.88)",
                  opacity: +(i === active),
                  transition: "opacity .5s ease",
                }}
              >
                {s.line}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
