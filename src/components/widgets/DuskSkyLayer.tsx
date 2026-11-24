"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  clamp,
  lerp,
  scrollFraction,
  scrollY,
  useScrollFrame,
  viewportHeight,
} from "./shared";

type Stop = readonly [number, string];

/** Page background by "hour" (0 = top of page, 1 = bottom). Recolored: charcoal by day, deep navy by night. */
const GROUND: Stop[] = [
  [0, "#141416"],
  [0.16, "#151518"],
  [0.3, "#16161b"],
  [0.4, "#191920"],
  [0.5, "#1d1b33"],
  [0.58, "#1c2048"],
  [0.75, "#171c45"],
  [0.9, "#12153a"],
  [1, "#0e0f26"],
];
/** Warm glow behind the page. */
const GLOW: Stop[] = [
  [0, "rgba(255,196,150,0.28)"],
  [0.3, "rgba(246,160,170,0.26)"],
  [0.5, "rgba(190,150,230,0.35)"],
  [0.75, "rgba(110,120,220,0.22)"],
  [1, "rgba(80,90,200,0.12)"],
];

const NOISE =
  "url(\"data:image/svg+xml;utf8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20width%3D'220'%20height%3D'220'%3E%3Cfilter%20id%3D'n'%3E%3CfeTurbulence%20type%3D'fractalNoise'%20baseFrequency%3D'.85'%20numOctaves%3D'2'%20stitchTiles%3D'stitch'%2F%3E%3CfeColorMatrix%20values%3D'0%200%200%200%20.5%200%200%200%200%20.5%200%200%200%200%20.5%200%200%200%20.9%200'%2F%3E%3C%2Ffilter%3E%3Crect%20width%3D'100%25'%20height%3D'100%25'%20filter%3D'url(%23n)'%2F%3E%3C%2Fsvg%3E\")";

function parseColor(c: string): [number, number, number, number] {
  const s = c.trim();
  if (s.startsWith("#")) {
    let h = s.slice(1);
    if (h.length === 3) h = [...h].map((x) => x + x).join("");
    return [
      parseInt(h.slice(0, 2), 16),
      parseInt(h.slice(2, 4), 16),
      parseInt(h.slice(4, 6), 16),
      1,
    ];
  }
  const m = s.match(/rgba?\(([^)]+)\)/);
  if (m) {
    const p = m[1].split(",").map(parseFloat);
    return [p[0], p[1], p[2], p.length > 3 ? p[3] : 1];
  }
  return [0, 0, 0, 1];
}

function ramp(stops: Stop[], t: number): string {
  const x = clamp(t);
  let i = 0;
  while (i < stops.length - 2 && x > stops[i + 1][0]) i++;
  const [p0, c0] = stops[i];
  const [p1, c1] = stops[i + 1];
  const k = clamp((x - p0) / Math.max(1e-6, p1 - p0));
  const a = parseColor(c0);
  const b = parseColor(c1);
  const o = a.map((v, n) => lerp(v, b[n], k));
  return `rgba(${Math.round(o[0])},${Math.round(o[1])},${Math.round(o[2])},${o[3].toFixed(3)})`;
}

/** Hour from the `@0.25`-style markers in section names, interpolated at the middle of the viewport. */
function hourFromAnchors(): number | null {
  const marks: Array<[number, number]> = [];
  const y = scrollY();
  document
    .querySelectorAll<HTMLElement>("[data-framer-name*='@']")
    .forEach((el) => {
      if (!el.offsetParent && getComputedStyle(el).position !== "fixed") return;
      const m = (el.getAttribute("data-framer-name") ?? "").match(
        /@\s*([01](?:\.\d+)?)/,
      );
      if (!m) return;
      const r = el.getBoundingClientRect();
      if (r.height !== 0) marks.push([r.top + y, parseFloat(m[1])]);
    });
  if (marks.length < 2) return null;
  marks.sort((a, b) => a[0] - b[0]);
  const mid = y + viewportHeight() * 0.5;
  if (mid <= marks[0][0]) return marks[0][1];
  for (let i = 0; i < marks.length - 1; i++) {
    const [p0, h0] = marks[i];
    const [p1, h1] = marks[i + 1];
    if (mid >= p0 && mid <= p1)
      return lerp(h0, h1, (mid - p0) / Math.max(1, p1 - p0));
  }
  const last = marks[marks.length - 1];
  const end =
    (document.documentElement.scrollHeight || last[0] + 1) -
    viewportHeight() * 0.5;
  return lerp(last[1], 1, clamp((mid - last[0]) / Math.max(1, end - last[0])));
}

function SkyLayer({ hour }: { hour: number }) {
  const ground = ramp(GROUND, hour);
  const glow = ramp(GLOW, hour);
  const gx = lerp(80, 58, hour);
  const gy = lerp(6, 118, hour ** 0.9);
  const stars = clamp((hour - 0.62) / 0.3);
  const haze = clamp(1 - Math.abs(hour - 0.46) / 0.22);
  const t = "background .5s linear, opacity .5s linear";
  return (
    <div
      aria-hidden
      style={{
        position: "fixed",
        inset: 0,
        zIndex: -1,
        pointerEvents: "none",
        overflow: "hidden",
        background: ground,
        transition: t,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: "-20%",
          background: `radial-gradient(40% 46% at ${gx}% ${gy}%, ${glow}, rgba(0,0,0,0) 70%)`,
          transition: t,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          height: "55%",
          opacity: haze * 0.9,
          background:
            "linear-gradient(to top, rgba(246,160,128,.55), rgba(233,138,168,.25) 45%, rgba(0,0,0,0))",
          transition: t,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: stars,
          transition: t,
          backgroundImage:
            "radial-gradient(1px 1px at 12% 18%, #fff 50%, transparent 51%), radial-gradient(1px 1px at 33% 72%, #fff 50%, transparent 51%), radial-gradient(1.4px 1.4px at 58% 28%, #fff 50%, transparent 51%), radial-gradient(1px 1px at 76% 64%, #fff 50%, transparent 51%), radial-gradient(1px 1px at 88% 12%, #fff 50%, transparent 51%), radial-gradient(1.2px 1.2px at 47% 46%, #fff 50%, transparent 51%), radial-gradient(1px 1px at 22% 88%, #fff 50%, transparent 51%), radial-gradient(1px 1px at 66% 90%, #fff 50%, transparent 51%)",
          backgroundSize: "640px 520px",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: NOISE,
          backgroundSize: "220px",
          opacity: lerp(0.05, 0.09, hour),
          mixBlendMode: "overlay",
        }}
      />
    </div>
  );
}

/**
 * Page-wide "dusk": as you scroll the page background moves from charcoal to deep navy, with a fixed sky layer
 * (glow, horizon haze, stars, grain) behind the content. Sections named `... @0.25` anchor the hour.
 */
export function DuskSkyLayer() {
  const [hour, setHour] = useState(0);
  const [mounted, setMounted] = useState(false);
  const marker = useRef<HTMLDivElement | null>(null);

  useScrollFrame(() => {
    const anchored = hourFromAnchors();
    const next = anchored === null ? scrollFraction() : anchored;
    setHour((h) => (Math.abs(h - next) > 0.002 ? next : h));
  });

  // Let the sky show through: clear the backgrounds of the sections it sits behind.
  useEffect(() => {
    setMounted(true);
    const undo: Array<[HTMLElement, string]> = [];
    let el: HTMLElement | null = marker.current?.parentElement ?? null;
    while (el && el !== document.body) {
      const bg = getComputedStyle(el).backgroundColor;
      if (bg && bg !== "transparent" && !/rgba\([^)]*,\s*0\)$/.test(bg)) {
        undo.push([el, el.style.background]);
        el.style.background = "transparent";
      }
      el = el.parentElement;
    }
    const clear = () =>
      document
        .querySelectorAll<HTMLElement>("[data-framer-name*='@']")
        .forEach((s) => {
          if (s.dataset.duskCleared) return;
          // Sections that paint their own panel keep it.
          if (s.hasAttribute("data-keep-background")) return;
          s.dataset.duskCleared = "1";
          undo.push([s, s.style.background]);
          s.style.background = "transparent";
        });
    clear();
    const id = window.setInterval(clear, 1500);
    return () => {
      window.clearInterval(id);
      undo.forEach(([n, b]) => (n.style.background = b));
    };
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    const ground = ramp(GROUND, hour);
    root.style.setProperty("--dusk-hour", hour.toFixed(4));
    root.style.setProperty("--dusk-ground", ground);
    root.style.setProperty("--dusk-ink", "#F4EEF6");
    document.body.style.background = ground;
  }, [hour]);

  return (
    <div
      ref={marker}
      data-dusk-sky=""
      data-hour={hour.toFixed(3)}
      style={{ width: "100%", height: "100%", pointerEvents: "none" }}
    >
      {mounted ? createPortal(<SkyLayer hour={hour} />, document.body) : null}
    </div>
  );
}
