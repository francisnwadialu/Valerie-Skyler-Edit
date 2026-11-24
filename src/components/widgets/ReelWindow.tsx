"use client";

import { useEffect, useRef, useState } from "react";
import {
  FIGTREE,
  IMG,
  MONO,
  clamp,
  smooth,
  useScrollFrame,
  useWidth,
  viewportHeight,
} from "./shared";

/** Showreel: a small window that opens to full bleed as you scroll, with the video playing while it is on screen. */
export function ReelWindow({
  video = IMG.reel,
  poster = IMG["reel-poster"],
  word = "tide",
  label = "Reel 2026",
  duration = "01:12",
  cta = "Play the reel",
  link = "/music",
  ground = "#141228",
  scrollVh = 140,
}: {
  video?: string;
  poster?: string;
  word?: string;
  label?: string;
  duration?: string;
  cta?: string;
  link?: string;
  ground?: string;
  scrollVh?: number;
}) {
  const wrap = useRef<HTMLDivElement | null>(null);
  const vid = useRef<HTMLVideoElement | null>(null);
  const width = useWidth(wrap, 1440);
  const [x, setX] = useState(0);
  const [visible, setVisible] = useState(false);

  useScrollFrame(() => {
    const el = wrap.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const vh = viewportHeight();
    const p = clamp(-r.top / Math.max(1, r.height - vh));
    setX((prev) => (Math.abs(prev - p) > 0.002 ? p : prev));
    setVisible(r.top < vh && r.bottom > 0);
  });

  useEffect(() => {
    const v = vid.current;
    if (!v) return;
    if (visible) void v.play()?.catch(() => {});
    else v.pause();
  }, [visible]);

  const phone = width < 760;
  const e = smooth(clamp(x / 0.75));
  const inX = (phone ? 0.12 : 0.32) * (1 - e) * 100;
  const inY = (phone ? 0.3 : 0.26) * (1 - e) * 100;
  const radius = 6 * (1 - e);
  const wordSize = Math.round(width * (phone ? 0.36 : 0.3));
  const scale = `scale(${(1.25 - 0.25 * e).toFixed(3)})`;
  const fill = {
    position: "absolute" as const,
    inset: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover" as const,
    transform: scale,
    transition: "transform .2s linear",
  };

  return (
    <div
      ref={wrap}
      data-reel={x.toFixed(2)}
      style={{
        position: "relative",
        width: "100%",
        height: `calc(100vh + ${scrollVh}vh)`,
      }}
    >
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          overflow: "hidden",
          background: ground,
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            clipPath: `inset(${inY.toFixed(2)}% ${inX.toFixed(2)}% ${inY.toFixed(2)}% ${inX.toFixed(2)}% round ${radius}px)`,
            transition: "clip-path .2s linear",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={poster} alt="" style={fill} />
          {video ? (
            <video
              ref={vid}
              src={video}
              poster={poster}
              muted
              loop
              playsInline
              preload="metadata"
              style={fill}
            />
          ) : null}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(180deg, rgba(20,14,40,.25), rgba(20,14,40,0) 40%, rgba(20,14,40,.45))",
            }}
          />
          {word ? (
            <div
              aria-hidden
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                top: "50%",
                transform: `translate3d(0,-52%,0) scale(${(0.7 + 0.3 * e).toFixed(3)})`,
                textAlign: "center",
                fontFamily: FIGTREE,
                fontWeight: 500,
                fontSize: wordSize,
                lineHeight: 0.8,
                letterSpacing: "-0.06em",
                backgroundImage:
                  "linear-gradient(100deg, rgba(255,222,196,.8), rgba(246,164,190,.6) 50%, rgba(188,160,240,.55))",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
                WebkitTextStroke: "1px rgba(255,255,255,.25)",
                transition: "transform .2s linear",
              }}
            >
              {word}
            </div>
          ) : null}
        </div>
        {(
          [
            ["left", "top"],
            ["right", "top"],
            ["left", "bottom"],
            ["right", "bottom"],
          ] as const
        ).map(([sx, sy], i) => (
          <span
            key={i}
            aria-hidden
            style={{
              position: "absolute",
              [sx]: `calc(${inX.toFixed(2)}% - 14px)`,
              [sy]: `calc(${inY.toFixed(2)}% - 14px)`,
              width: 10,
              height: 10,
              borderColor: "rgba(255,255,255,.7)",
              borderStyle: "solid",
              borderWidth: `${+(sy === "top")}px ${+(sx === "right")}px ${+(sy === "bottom")}px ${+(sx === "left")}px`,
              opacity: 1 - e,
              transition: "all .2s linear",
            }}
          />
        ))}
        <div
          style={{
            position: "absolute",
            left: phone ? 16 : 40,
            right: phone ? 16 : 40,
            top: phone ? 22 : 32,
            display: "flex",
            justifyContent: "space-between",
            color: "#fff",
            font: `500 12px/1 ${MONO}`,
            letterSpacing: ".05em",
          }}
        >
          <span>{label}</span>
          <span style={{ opacity: 0.7 }}>{duration}</span>
        </div>
        <a
          href={link}
          style={{
            position: "absolute",
            left: "50%",
            bottom: phone ? 28 : 40,
            transform: "translateX(-50%)",
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            padding: "12px 18px 12px 14px",
            borderRadius: 40,
            background: "rgba(255,255,255,.12)",
            border: "1px solid rgba(255,255,255,.35)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            color: "#fff",
            textDecoration: "none",
            fontFamily: FIGTREE,
            fontSize: 14,
            fontWeight: 500,
          }}
        >
          <span
            style={{
              width: 0,
              height: 0,
              borderLeft: "8px solid #fff",
              borderTop: "5px solid transparent",
              borderBottom: "5px solid transparent",
            }}
          />
          {cta}
        </a>
      </div>
    </div>
  );
}
