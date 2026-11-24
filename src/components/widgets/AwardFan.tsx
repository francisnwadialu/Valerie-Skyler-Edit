"use client";

import { useRef, useState } from "react";
import {
  FIGTREE,
  IMG,
  MONO,
  ORBITRON,
  clamp,
  smooth,
  useScrollFrame,
  useWidth,
  viewportHeight,
} from "./shared";

interface Award {
  title: string;
  note: string;
  img: string;
}

const ITEMS: Award[] = [
  { title: "Best identity", note: "Juno · 2026", img: IMG["cover-1"] },
  { title: "Gold, packaging", note: "Kite · 2026", img: IMG["cover-4"] },
  {
    title: "Shortlist, digital",
    note: "Alder Hotel · 2025",
    img: IMG["cover-2"],
  },
  { title: "Print feature", note: "Issue 12 · 2025", img: IMG["cover-5"] },
  {
    title: "Honourable mention, web",
    note: "Ridge · 2024",
    img: IMG["cover-3"],
  },
];

const CSS = `
.af-c{position:absolute;left:50%;bottom:0;transform-origin:50% 120%;border-radius:4px;overflow:hidden;color:#fff;text-decoration:none;box-shadow:0 30px 60px rgba(10,8,30,.35);transition:transform .9s cubic-bezier(.2,.8,.2,1), box-shadow .5s ease}
.af-c:hover{box-shadow:0 40px 80px rgba(10,8,30,.5)}
.af-c img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
`;

/** "Shop Items": award cards fan out as the block scrolls into view and lift on hover. */
export function AwardFan({
  heading = "Shop Items",
  link = "/cast#recognition",
  ink = "#F4EEF6",
  items = ITEMS,
}: {
  heading?: string;
  link?: string;
  ink?: string;
  items?: Award[];
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const width = useWidth(ref, 1440);
  const [p, setP] = useState(0);
  const [hover, setHover] = useState(-1);
  useScrollFrame(() => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const vh = viewportHeight();
    setP(smooth(clamp((vh * 0.95 - r.top) / (vh * 0.55))));
  });

  const phone = width < 760;
  const count = items.length;
  const w = Math.round(phone ? width * 0.46 : Math.min(300, width * 0.19));
  const h = Math.round(w * 1.32);
  const spread = phone ? 12 : 14;

  return (
    <div
      ref={ref}
      style={{
        position: "relative",
        width: "100%",
        overflowX: "clip",
        overflowY: "visible",
        paddingTop: 50,
        marginTop: -50,
        color: ink,
        fontFamily: FIGTREE,
      }}
    >
      <style>{CSS}</style>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          gap: 24,
          flexWrap: "wrap",
        }}
      >
        <h2
          style={{
            margin: 0,
            fontFamily: ORBITRON,
            fontSize: phone ? 34 : Math.min(56, Math.round(width * 0.038)),
            fontWeight: 500,
            letterSpacing: "-0.04em",
            lineHeight: 1.02,
          }}
        >
          {heading}
        </h2>
      </div>
      <div
        style={{
          position: "relative",
          height: h + (phone ? 70 : 110),
          marginTop: phone ? 5 : 25,
        }}
      >
        {items.map((a, i) => {
          const n = i - (count - 1) / 2;
          const rotate = n * spread * p;
          const x = n * (phone ? w * 0.34 : w * 0.62) * p;
          const lift = hover === i ? -46 : 0;
          return (
            <a
              key={i}
              className="af-c"
              href={link}
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(-1)}
              style={{
                width: w,
                height: h,
                marginLeft: -w / 2,
                zIndex: hover === i ? 20 : 10 - Math.abs(Math.round(n)),
                transform: `translate3d(${x.toFixed(1)}px, ${lift}px, 0) rotate(${rotate.toFixed(2)}deg)`,
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={a.img} alt="" />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(180deg, rgba(20,14,40,.1), rgba(20,14,40,.55))",
                }}
              />
              <span
                style={{
                  position: "absolute",
                  left: 14,
                  top: 14,
                  right: 14,
                  display: "flex",
                  justifyContent: "space-between",
                  font: `500 10px/1 ${MONO}`,
                  letterSpacing: ".08em",
                  textTransform: "uppercase",
                }}
              >
                <span>Valerie Skyler</span>
                <span>№ {String(i + 1).padStart(2, "0")}</span>
              </span>
              <span
                style={{
                  position: "absolute",
                  left: 14,
                  right: 14,
                  bottom: 14,
                }}
              >
                <span
                  style={{
                    display: "block",
                    fontSize: Math.round(w * 0.1),
                    fontWeight: 500,
                    letterSpacing: "-0.035em",
                    lineHeight: 1,
                  }}
                >
                  {a.title}
                </span>
                <span
                  style={{
                    display: "block",
                    marginTop: 6,
                    font: `400 11px/1.3 ${MONO}`,
                    opacity: 0.85,
                  }}
                >
                  {a.note}
                </span>
              </span>
            </a>
          );
        })}
      </div>
    </div>
  );
}
