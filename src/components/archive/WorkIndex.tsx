"use client";

/**
 * ARCHIVED 2026-11-18: this was the home "Shows" list (eight hard-coded Juno -> Vale rows). The section
 * now renders Bandsintown's widget instead, so nothing imports this file; it is kept here untouched in
 * case the owner wants the static list back. To restore it, import `WorkIndex` and render
 * `<WorkIndex rows={WORK_ROWS} />` where the home page mounts `BandsintownWidget`.
 */
import { useEffect, useRef, useState } from "react";
import {
  FIGTREE,
  IMG,
  MONO,
  ORBITRON,
  useScrollFrame,
  useWidth,
  viewportHeight,
} from "@/components/widgets/shared";

export interface WorkIndexRow {
  title: string;
  tags: string;
  year: string;
  time: string;
  link: string;
  /** Hover stills; live event rows have none. */
  stills?: [string, string, string];
}

export const WORK_ROWS: WorkIndexRow[] = [
  {
    title: "Juno",
    tags: "Brand · App · Launch",
    year: "2026",
    time: "18:58",
    link: "/music/juno",
    stills: [IMG["work-juno"], IMG["cap-2"], IMG["pill-1"]],
  },
  {
    title: "Kite",
    tags: "Packaging · Campaign",
    year: "2026",
    time: "19:16",
    link: "/music/kite",
    stills: [IMG["work-kite"], IMG["cover-2"], IMG["cover-5"]],
  },
  {
    title: "Alder Hotel",
    tags: "Identity · Framer site",
    year: "2025",
    time: "19:31",
    link: "/music/alder-hotel",
    stills: [IMG["work-alder"], IMG["journal-3"], IMG["cover-1"]],
  },
  {
    title: "Marlow",
    tags: "Art direction · E-commerce",
    year: "2025",
    time: "19:47",
    link: "/music/marlow",
    stills: [IMG["work-marlow"], IMG["team-6"], IMG["cap-3"]],
  },
  {
    title: "Ridge",
    tags: "Product UI · Design system",
    year: "2024",
    time: "20:02",
    link: "/music/ridge",
    stills: [IMG["work-ridge"], IMG.horizon, IMG["journal-1"]],
  },
  {
    title: "Linen",
    tags: "Stationery · Identity",
    year: "2024",
    time: "20:18",
    link: "/music/linen",
    stills: [IMG["work-linen"], IMG["cover-4"], IMG["pill-2"]],
  },
  {
    title: "Cove",
    tags: "Travel brand · Website",
    year: "2024",
    time: "20:33",
    link: "/music/cove",
    stills: [IMG["work-cove"], IMG["cap-1"], IMG.horizon],
  },
  {
    title: "Vale",
    tags: "Fashion film · Lookbook",
    year: "2023",
    time: "20:51",
    link: "/music/vale",
    stills: [IMG["work-vale"], IMG["cover-3"], IMG["journal-2"]],
  },
];

const CSS = `
.wi-row{position:relative;display:grid;align-items:center;text-decoration:none;color:inherit;transition:transform .5s cubic-bezier(.2,.8,.2,1)}
.wi-rule{position:absolute;left:0;top:0;height:1px;background:currentColor;opacity:.18;transform-origin:0 0;transition:transform 1.1s cubic-bezier(.2,.8,.2,1)}
.wi-pre .wi-rule{transform:scaleX(0)}
.wi-title{transition:transform .5s cubic-bezier(.2,.8,.2,1), letter-spacing .5s ease}
.wi-row:hover .wi-title{transform:translateX(14px)}
.wi-strip{position:absolute;right:0;top:50%;display:flex;gap:6px;transform:translate3d(30px,-50%,0);opacity:0;pointer-events:none;transition:transform .6s cubic-bezier(.2,.8,.2,1), opacity .4s ease}
.wi-strip i{display:block;background-size:cover;background-position:center;border-radius:2px;transform:translateY(8px);transition:transform .6s cubic-bezier(.2,.8,.2,1)}
.wi-row:hover .wi-strip{transform:translate3d(0,-50%,0);opacity:1}
.wi-row:hover .wi-strip i{transform:none}
.wi-row:hover .wi-strip i:nth-child(2){transition-delay:.05s}.wi-row:hover .wi-strip i:nth-child(3){transition-delay:.1s}
.wi-sun{width:7px;height:7px;border-radius:7px;background:linear-gradient(180deg,#F8C49A,#E888AC);box-shadow:0 0 0 rgba(248,196,154,0);transform:scale(.4);opacity:.4;transition:all .5s ease}
.wi-row:hover .wi-sun{transform:scale(1);opacity:1;box-shadow:0 0 14px rgba(248,196,154,.9)}
.wi-row:hover .wi-meta{opacity:.2}
.wi-meta{transition:opacity .4s ease}
@media (hover:none){.wi-strip{display:none}}
`;

/** Project index: hairlines draw in on scroll; rows shift, show a still strip and light a sun dot on hover. */
export function WorkIndex({
  heading = "Shows",
  ink = "#ffffff",
  rows = WORK_ROWS,
}: {
  heading?: string;
  ink?: string;
  rows?: WorkIndexRow[];
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const width = useWidth(ref, 1200);
  const [pre, setPre] = useState(true);
  useEffect(() => {
    // Without scroll-in motion (reduced motion) show the rules at once.
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches)
      setPre(false);
  }, []);
  useScrollFrame(() => {
    const el = ref.current;
    if (el && el.getBoundingClientRect().top < viewportHeight() * 0.85)
      setPre(false);
  }, pre);

  const phone = width < 760;
  const title = phone ? 34 : Math.min(64, Math.round(width * 0.044));
  const rowH = phone ? 84 : Math.round(title * 1.9);

  return (
    <div
      ref={ref}
      className={pre ? "wi-pre" : ""}
      style={{
        width: "100%",
        overflowX: "clip",
        fontFamily: FIGTREE,
        color: ink,
      }}
    >
      <style>{CSS}</style>
      <h2
        style={{
          margin: `0 0 ${phone ? 28 : 44}px`,
          fontFamily: ORBITRON,
          fontSize: phone ? 34 : Math.min(64, Math.round(width * 0.042)),
          lineHeight: 1.02,
          fontWeight: 500,
          letterSpacing: "-0.04em",
        }}
      >
        {heading}
      </h2>
      {rows.map((r, i) => (
        <a
          key={r.title}
          className="wi-row"
          href={r.link}
          style={{
            height: rowH,
            gridTemplateColumns: phone
              ? "1fr auto"
              : "56px 1.4fr 1fr 90px 60px",
          }}
        >
          <span
            className="wi-rule"
            style={{ right: 0, transitionDelay: `${i * 0.07}s` }}
          />
          {phone ? null : (
            <span
              className="wi-meta"
              style={{ font: `400 12px/1 ${MONO}`, opacity: 0.5 }}
            >
              {String(i + 1).padStart(2, "0")}
            </span>
          )}
          <span
            className="wi-title"
            style={{
              fontFamily: ORBITRON,
              fontSize: title,
              fontWeight: 500,
              letterSpacing: "-0.045em",
              lineHeight: 1,
            }}
          >
            {r.title}
          </span>
          {phone ? null : (
            <span className="wi-meta" style={{ fontSize: 15, opacity: 0.7 }}>
              {r.tags}
            </span>
          )}
          {phone ? null : (
            <span
              className="wi-meta"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                font: `400 12px/1 ${MONO}`,
              }}
            >
              <span className="wi-sun" />
              {r.time}
            </span>
          )}
          <span
            className="wi-meta"
            style={{
              font: `400 12px/1 ${MONO}`,
              opacity: 0.6,
              textAlign: "right",
            }}
          >
            {r.year}
          </span>
          {phone || !r.stills ? null : (
            <span className="wi-strip" style={{ right: 70 }}>
              {r.stills.map((src, k) => (
                <i
                  key={k}
                  style={{
                    width: Math.round(rowH * 1.25),
                    height: Math.round(rowH * 0.86),
                    backgroundImage: `url(${src})`,
                  }}
                />
              ))}
            </span>
          )}
        </a>
      ))}
      <div style={{ position: "relative", height: 1 }}>
        <span
          className="wi-rule"
          style={{ right: 0, transitionDelay: `${rows.length * 0.07}s` }}
        />
      </div>
    </div>
  );
}
