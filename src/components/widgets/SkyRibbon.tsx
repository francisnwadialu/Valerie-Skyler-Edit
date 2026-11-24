"use client";

import { useRef, useState } from "react";
import {
  FIGTREE,
  IMG,
  MONO,
  clamp,
  scrollY,
  useScrollFrame,
  useWidth,
} from "./shared";

const CLIENTS = [
  "Juno",
  "Kite",
  "Alder Hotel",
  "Marlow",
  "Ridge",
  "Linen",
  "Cove",
  "Vale",
  "Hollow",
  "Orchard",
  "Pilot",
  "Saffron",
];

const CSS = `
@keyframes sr-l{from{transform:translate3d(0,0,0)}to{transform:translate3d(-50%,0,0)}}
@keyframes sr-r{from{transform:translate3d(-50%,0,0)}to{transform:translate3d(0,0,0)}}
.sr-track{display:flex;width:max-content;will-change:transform}
@media (prefers-reduced-motion: reduce){.sr-track{animation:none !important}}
`;

/** Client names on two crossing bands over a sky; the bands tilt with scroll speed and the sky drifts. */
export function SkyRibbon({
  image = IMG["sky-ribbon"],
  label = "Clients, 2014 to tonight",
  speed = 38,
  names = CLIENTS,
}: {
  image?: string;
  label?: string;
  speed?: number;
  names?: string[];
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const width = useWidth(ref, 1440);
  const last = useRef(0);
  const [tilt, setTilt] = useState(0);
  const [shift, setShift] = useState(0);

  useScrollFrame(
    () => {
      const y = scrollY();
      const v = clamp((y - last.current) / 40, -1, 1);
      last.current = y;
      setTilt((t) => t * 0.5 + v * 0.5);
      const el = ref.current;
      if (el) {
        const r = el.getBoundingClientRect();
        setShift(
          clamp((window.innerHeight - r.top) / (window.innerHeight + r.height)),
        );
      }
    },
    true,
    120,
  );

  const phone = width < 760;
  const size = phone ? 30 : Math.min(58, Math.round(width * 0.04));

  const word = (name: string, i: number, peach: boolean) => (
    <span
      key={i}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: size * 0.55,
        paddingRight: size * 0.55,
        fontSize: size,
        fontWeight: i % 3 === 1 ? 400 : 500,
        fontStyle: i % 4 === 2 ? "italic" : "normal",
        letterSpacing: i % 3 === 0 ? "-0.045em" : "-0.02em",
        textTransform: i % 5 === 3 ? "uppercase" : "none",
        // dark ink sits on the peach band, white on the glass band
        color: peach ? "#17141F" : "#fff",
        whiteSpace: "nowrap",
      }}
    >
      {name}
      <i
        style={{
          display: "block",
          width: size * 0.22,
          height: size * 0.22,
          borderRadius: "50%",
          background: peach
            ? "#17141F"
            : "linear-gradient(180deg,#F8C49A,#E888AC)",
          opacity: peach ? 0.8 : 1,
        }}
      />
    </span>
  );
  const track = (peach: boolean, dir: "l" | "r") => (
    <div
      className="sr-track"
      style={{ animation: `sr-${dir} ${speed}s linear infinite` }}
    >
      {[0, 1].map((k) => (
        <div key={k} style={{ display: "flex" }}>
          {names.map((n, i) => word(n, i + k, peach))}
        </div>
      ))}
    </div>
  );

  return (
    <div
      ref={ref}
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        minHeight: 420,
        overflow: "hidden",
        fontFamily: FIGTREE,
      }}
    >
      <style>{CSS}</style>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={image}
        alt=""
        style={{
          position: "absolute",
          inset: "-10% 0",
          width: "100%",
          height: "120%",
          objectFit: "cover",
          transform: `translate3d(0, ${((shift - 0.5) * -8).toFixed(2)}%, 0)`,
          transition: "transform .2s linear",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(18,16,46,.35), rgba(18,16,46,0) 40%, rgba(18,16,46,.4))",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: phone ? 16 : 48,
          top: phone ? 22 : 34,
          color: "#fff",
          font: `500 12px/1 ${MONO}`,
          letterSpacing: ".05em",
        }}
      >
        {label}
      </div>
      <div
        style={{
          position: "absolute",
          left: "-5%",
          right: "-5%",
          top: "34%",
          transform: `rotate(${(-4 + tilt * 2).toFixed(2)}deg)`,
          transition: "transform .3s ease",
          background: "#F2A27E",
          padding: `${size * 0.32}px 0`,
          boxShadow: "0 20px 60px rgba(40,20,60,.25)",
        }}
      >
        {track(true, "l")}
      </div>
      <div
        style={{
          position: "absolute",
          left: "-5%",
          right: "-5%",
          top: "52%",
          transform: `rotate(${(3 - tilt * 2).toFixed(2)}deg)`,
          transition: "transform .3s ease",
          background: "rgba(255,255,255,.12)",
          borderTop: "1px solid rgba(255,255,255,.35)",
          borderBottom: "1px solid rgba(255,255,255,.35)",
          backdropFilter: "blur(14px) saturate(1.2)",
          WebkitBackdropFilter: "blur(14px) saturate(1.2)",
          padding: `${size * 0.32}px 0`,
        }}
      >
        {track(false, "r")}
      </div>
    </div>
  );
}
