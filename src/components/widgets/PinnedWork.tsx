"use client";

import { useEffect, useRef, useState } from "react";
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

export interface WorkItem {
  title: string;
  tags: string;
  time: string;
  year: string;
  link: string;
  image: string;
}

export const WORK_ITEMS: WorkItem[] = [
  {
    image: IMG["work-juno"],
    title: "Juno",
    tags: "Brand identity, App UI/UX, Launch site",
    year: "2026",
    time: "18:58",
    link: process.env.NEXT_PUBLIC_FOURTHWALL_JUNO_URL || "/music/juno",
  },
  {
    image: IMG["work-kite"],
    title: "Kite",
    tags: "Packaging, Art direction, Campaign",
    year: "2026",
    time: "19:16",
    link: "/music/kite",
  },
  {
    image: IMG["work-alder"],
    title: "Alder Hotel",
    tags: "Identity, Framer site, Booking flow",
    year: "2025",
    time: "19:31",
    link: process.env.NEXT_PUBLIC_FOURTHWALL_ALDER_URL || "/music/alder-hotel",
  },
  {
    image: IMG["work-marlow"],
    title: "Marlow",
    tags: "Art direction, E-commerce, Lookbook",
    year: "2025",
    time: "19:47",
    link: "/music/marlow",
  },
  {
    image: IMG["work-ridge"],
    title: "Ridge",
    tags: "Product UI, Design system, Marketing site",
    year: "2024",
    time: "20:02",
    link: "/music/ridge",
  },
];

const CSS = `
.pw-img{position:absolute;inset:0;transition:clip-path .9s cubic-bezier(.7,0,.2,1)}
.pw-img img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;transition:transform 1.4s cubic-bezier(.2,.8,.2,1)}
.pw-title{position:absolute;left:0;top:0;transition:filter .7s ease, opacity .7s ease, transform .9s cubic-bezier(.2,.8,.2,1);white-space:nowrap}
.pw-tag{transition:opacity .5s ease, transform .6s cubic-bezier(.2,.8,.2,1)}
.pw-thumb{display:block;transition:opacity .4s ease, transform .4s ease, outline-color .4s ease;outline:1px solid transparent;outline-offset:2px}
.pw-thumb:hover{opacity:1 !important}
.pw-link{display:inline-flex;gap:10px;align-items:center;text-decoration:none;color:inherit}
.pw-link i{display:block;width:22px;height:1px;background:currentColor;transition:width .3s ease}
.pw-link:hover i{width:36px}
@media (prefers-reduced-motion: reduce){.pw-img,.pw-title,.pw-tag{transition:none}}
`;

/** "Selected work": a tall section with a sticky stage; scrolling steps through the projects. */
export function PinnedWork({
  label = "Selected music",
  allLabel = "All music",
  allLink = "/music",
  ink = "#ffffff",
  stepVh = 70,
  items = WORK_ITEMS,
}: {
  label?: string;
  allLabel?: string;
  allLink?: string;
  ink?: string;
  stepVh?: number;
  items?: WorkItem[];
}) {
  const root = useRef<HTMLDivElement | null>(null);
  const width = useWidth(root, 1440);
  const [active, setActive] = useState(0);
  const [frac, setFrac] = useState(0);
  const [viewH, setViewH] = useState(900);
  const titles = useRef<Array<HTMLAnchorElement | null>>([]);
  const [widths, setWidths] = useState<number[]>([]);
  const count = items.length;
  const [videoOpen, setVideoOpen] = useState(false);

  useScrollFrame(() => {
    const el = root.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const p = clamp(-r.top / Math.max(1, r.height - viewportHeight())) * count;
    const i = Math.min(count - 1, Math.floor(p));
    setActive((a) => (a === i ? a : i));
    setFrac(clamp(p - i));
  });

  useEffect(() => {
    const update = () => setViewH(viewportHeight());
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const small = width < 1000;
  const E = viewH;
  const gutter = small ? 16 : Math.round(width * 0.035);
  const boxW = small
    ? width - gutter * 2
    : Math.round(Math.min(width * 0.64, E * 0.74 * 1.6));
  const boxH = Math.round(
    small ? boxW * 1.05 : Math.min(E * 0.72, boxW / 1.55),
  );
  const boxX = small ? gutter : Math.round(width - gutter - 56 - boxW);
  const boxY = Math.round(small ? E * 0.2 : (E - boxH) / 2 + 10);
  const size = small
    ? Math.round(width * 0.15)
    : Math.min(196, Math.round(width * 0.112));

  useEffect(() => {
    const measure = () =>
      setWidths(
        titles.current.map((t) => (t ? t.getBoundingClientRect().width : 0)),
      );
    measure();
    void document.fonts?.ready.then(measure);
    const id = window.setTimeout(measure, 1500);
    return () => window.clearTimeout(id);
  }, [width, size, count]);

  const widthOf = (i: number) => widths[i] || size * 2.4;
  const leftOf = (i: number) =>
    small
      ? gutter
      : Math.max(
          gutter,
          Math.round(
            boxX + Math.min(boxW * 0.3, widthOf(i) * 0.45) - widthOf(i),
          ),
        );
  const drift = ((frac - 0.5) * -24).toFixed(1);
  const pad = (n: number) => String(n).padStart(2, "0");

  const titleLayer = (overlay: boolean) => (
    <div
      aria-hidden={overlay ? true : undefined}
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        top: small ? boxY + boxH - size * 0.62 : boxY + boxH * 0.56,
        height: size * 1.1,
        zIndex: count + 2 + (overlay ? 1 : 0),
        pointerEvents: "none",
        clipPath: overlay
          ? `inset(0 ${width - boxX - boxW}px 0 ${boxX}px)`
          : `polygon(0 0, ${boxX}px 0, ${boxX}px 100%, 0 100%, 0 0, 100% 0, 100% 100%, ${boxX + boxW}px 100%, ${boxX + boxW}px 0)`,
        transform: `translate3d(0, ${drift}px, 0)`,
        transition: "transform .25s linear",
      }}
    >
      {items.map((it, i) => (
        <a
          key={i}
          className="pw-title"
          href={it.link}
          tabIndex={overlay || i !== active ? -1 : 0}
          ref={overlay ? undefined : (el) => void (titles.current[i] = el)}
          style={{
            left: leftOf(i),
            pointerEvents: i === active && !overlay ? "auto" : "none",
            textDecoration: "none",
            color: overlay ? "#FFFFFF" : ink,
            fontFamily: ORBITRON,
            fontSize: size,
            fontWeight: 500,
            letterSpacing: "-0.055em",
            lineHeight: 0.92,
            filter: i === active ? "blur(0px)" : "blur(18px)",
            opacity: +(i === active),
            transform: `translate3d(${i === active ? 0 : i < active ? -40 : 40}px, 0, 0)`,
          }}
        >
          {it.title}
        </a>
      ))}
    </div>
  );

  return (
    <div
      ref={root}
      data-step={active}
      style={{
        position: "relative",
        width: "100%",
        height: `calc(100vh + ${count * (small ? stepVh * 0.8 : stepVh)}vh)`,
        fontFamily: FIGTREE,
        color: ink,
      }}
    >
      <style>{CSS}</style>
      <div
        style={{
          position: "sticky",
          top: 0,
          height: small ? "100svh" : "100vh",
          width: "100%",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: gutter,
            right: gutter,
            top: small ? 18 : Math.max(18, boxY - 92),
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            color: ink,
          }}
        >
          <h2
            style={{
              margin: 0,
              fontFamily: ORBITRON,
              // Same scale as the "Latest Releases" / "Shows" headings.
              fontSize: small
                ? 34
                : Math.min(64, Math.round((width - gutter * 2) * 0.042)),
              lineHeight: 1.02,
              fontWeight: 500,
              letterSpacing: "-0.04em",
            }}
          >
            {label}
          </h2>
          <span
            style={{
              font: `500 12px/1 ${MONO}`,
              letterSpacing: ".05em",
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {pad(active + 1)} / {pad(count)}
          </span>
        </div>
        <div
          style={{
            position: "absolute",
            left: boxX,
            top: boxY,
            width: boxW,
            height: boxH,
            overflow: "hidden",
            borderRadius: 3,
            transform: `translate3d(0, ${drift}px, 0)`,
            transition: "transform .25s linear",
          }}
        >
          {items.map((it, i) => (
            <div
              key={i}
              className="pw-img"
              style={{
                clipPath:
                  i <= active ? "inset(0% 0% 0% 0%)" : "inset(100% 0% 0% 0%)",
                zIndex: i,
                background:
                  "linear-gradient(135deg,#6F5BA6,#E59AB0 60%,#F5B892)",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={it.image}
                alt={it.title}
                style={{
                  transform:
                    i === active
                      ? `scale(${(1.02 + frac * 0.05).toFixed(3)})`
                      : "scale(1.12)",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(180deg, rgba(20,12,40,0) 50%, rgba(20,12,40,.35) 100%)",
                }}
              />
            </div>
          ))}
          <button
            type="button"
            onClick={() => setVideoOpen(true)}
            aria-label={`Play Valerie Skyler video preview, ${items[active].time} · ${items[active].year}`}
            style={{
              position: "absolute",
              zIndex: count + 1,
              left: 14,
              top: 10,
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              border: "1px solid rgba(255,44,223,.75)",
              borderRadius: 2,
              padding: "7px 9px",
              background: "rgba(5,5,9,.72)",
              boxShadow: "0 0 14px rgba(255,44,223,.24)",
              color: "#fff",
              font: `500 11px/1 ${MONO}`,
              letterSpacing: ".06em",
              cursor: "pointer",
              backdropFilter: "blur(8px)",
            }}
          >
            <span aria-hidden="true" style={{ color: "#ff2cdf" }}>▶</span>
            {items[active].time} · {items[active].year}
            <span style={{ color: "#ff72e8" }}>WATCH</span>
          </button>
          <span
            style={{
              position: "absolute",
              zIndex: count + 1,
              right: 14,
              top: 12,
              font: `500 11px/1 ${MONO}`,
              color: "rgba(255,255,255,.9)",
              letterSpacing: ".06em",
            }}
          >
            EVT—{String(active + 1).padStart(3, "0")}
          </span>
        </div>
        {titleLayer(false)}
        {titleLayer(true)}
        <div
          style={{
            position: "absolute",
            left: gutter,
            bottom: small ? 30 : Math.max(30, E - boxY - boxH + 6),
            width: small
              ? width - gutter * 2
              : Math.max(160, boxX - gutter - 24),
            height: small ? 40 : 84,
            color: ink,
          }}
        >
          {items.map((it, i) => (
            <div
              key={i}
              className="pw-tag"
              style={{
                position: "absolute",
                left: 0,
                bottom: 0,
                opacity: +(i === active),
                transform: `translate3d(0, ${i === active ? 0 : i < active ? -10 : 10}px, 0)`,
                fontSize: 14,
                lineHeight: 1.5,
              }}
            >
              {small ? (
                <div>{it.tags}</div>
              ) : (
                it.tags.split(",").map((t, k) => <div key={k}>{t.trim()}</div>)
              )}
            </div>
          ))}
        </div>
        <div
          style={{
            position: "absolute",
            right: small ? "auto" : gutter,
            left: small ? gutter : "auto",
            top: small ? boxY - 40 : "50%",
            transform: small ? "none" : "translateY(-50%)",
            display: "flex",
            flexDirection: small ? "row" : "column",
            gap: 6,
          }}
        >
          {items.map((it, i) => (
            <a
              key={i}
              className="pw-thumb"
              href={it.link}
              aria-label={it.title}
              style={{
                width: 34,
                height: 24,
                opacity: i === active ? 1 : 0.45,
                transform: i === active && !small ? "translateX(-6px)" : "none",
                outlineColor: i === active ? ink : "transparent",
                background: `center/cover no-repeat url(${it.image})`,
              }}
            />
          ))}
        </div>
        <a
          className="pw-link"
          href={allLink}
          style={{
            position: "absolute",
            right: small ? gutter : gutter + 56,
            bottom: small ? "auto" : Math.max(24, (E - boxY - boxH) / 2 - 10),
            top: small ? boxY - 44 : "auto",
            fontSize: 14,
            fontWeight: 500,
            color: ink,
          }}
        >
          <i />
          {allLabel}
        </a>
      </div>
      {videoOpen ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Valerie Skyler video preview"
          onClick={(event) => {
            if (event.target === event.currentTarget) setVideoOpen(false);
          }}
          onKeyDown={(event) => {
            if (event.key === "Escape") setVideoOpen(false);
          }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 10000,
            display: "grid",
            placeItems: "center",
            padding: 24,
            background: "rgba(0,0,0,.94)",
            backdropFilter: "blur(14px)",
          }}
        >
          <button
            type="button"
            autoFocus
            onClick={() => setVideoOpen(false)}
            aria-label="Close video"
            style={{
              position: "absolute",
              top: 20,
              right: 24,
              border: "1px solid rgba(255,44,223,.7)",
              background: "#08080d",
              color: "#fff",
              padding: "10px 14px",
              cursor: "pointer",
              font: `12px ${MONO}`,
            }}
          >
            CLOSE ×
          </button>
          <video
            src="/assets/sO6ZR8lWeH3OmVK3qLdoEm1fA.mp4"
            controls
            autoPlay
            playsInline
            style={{
              display: "block",
              width: "min(1100px, 100%)",
              maxHeight: "82vh",
              background: "#000",
              boxShadow: "0 0 40px rgba(255,44,223,.18)",
            }}
          />
        </div>
      ) : null}
    </div>
  );
}
