"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type RefObject,
} from "react";

export const FIGTREE = '"Figtree", "Inter", system-ui, sans-serif';
export const ORBITRON =
  'var(--font-orbitron), "Orbitron", "Figtree", system-ui, sans-serif';
export const MONO =
  '"Geist Mono", ui-monospace, SFMono-Regular, Menlo, monospace';

export const clamp = (v: number, lo = 0, hi = 1): number =>
  Math.min(hi, Math.max(lo, v));
export const lerp = (a: number, b: number, t: number): number =>
  a + (b - a) * t;
export const smooth = (t: number): number => t * t * (3 - 2 * t);

/** Style objects with CSS custom properties need a cast. */
export const css = (
  o: Record<string, string | number | undefined>,
): CSSProperties => o as CSSProperties;

export const viewportHeight = (): number =>
  typeof window === "undefined"
    ? 900
    : window.innerHeight || document.documentElement.clientHeight || 900;

export const scrollY = (): number =>
  typeof window === "undefined"
    ? 0
    : window.scrollY || document.documentElement.scrollTop || 0;

/** Page scroll as a 0..1 fraction. */
export function scrollFraction(): number {
  const max = Math.max(
    1,
    (document.documentElement.scrollHeight || 1) - viewportHeight(),
  );
  return clamp(scrollY() / max);
}

/** Width of an element, kept up to date with a ResizeObserver. */
export function useWidth(
  ref: RefObject<HTMLElement | null>,
  fallback = 1200,
): number {
  const [w, setW] = useState(fallback);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(() => setW(el.clientWidth || fallback))
        : null;
    ro?.observe(el);
    setW(el.clientWidth || fallback);
    return () => ro?.disconnect();
  }, [ref, fallback]);
  return w;
}

/** Calls `cb` on scroll and resize (and once on mount). */
export function useScrollFrame(
  cb: () => void,
  enabled = true,
  pollMs = 160,
): void {
  const fn = useRef(cb);
  fn.current = cb;
  useEffect(() => {
    if (!enabled) return;
    let last = -1;
    const run = () => fn.current();
    window.addEventListener("scroll", run, { passive: true });
    window.addEventListener("resize", run);
    const id = window.setInterval(() => {
      const y = scrollY();
      if (y !== last) {
        last = y;
        run();
      }
    }, pollMs);
    run();
    return () => {
      window.removeEventListener("scroll", run);
      window.removeEventListener("resize", run);
      window.clearInterval(id);
    };
  }, [enabled, pollMs]);
}

/** Local copies of the images the original components fall back to. */
const asset = (name: string) => `/assets/${name}`;
export const IMG: Record<string, string> = {
  "cap-1": asset("gyeSU2TPAKjUEqqKLTCuekv7zyo.webp"),
  "cap-2": asset("mHP4XfgJ8bMa1xNgUvt7y0Hlmq0.webp"),
  "cap-3": asset("pF3dYO59rImIhZVp87j7wwbALE.webp"),
  "cap-4": asset("NITgIgJ8ZM7cZzQ9k8k8NoCMGc.webp"),
  "card-afterglow": asset("qqfZIrcNBNrGIt8lRD3pohMwqS0.webp"),
  "card-blue": asset("tiYSqeC6a3AAT9qZoZIzZYdno1k.webp"),
  "card-golden": asset("daSvfhVTqOjJPrOX4JdHeMoIAA.webp"),
  "cover-1": asset("gcGPfdbjTwPZhzpm8PNmZaR4aI.webp"),
  "cover-2": asset("CZyqZrrWPmpO1tuNF19GP0R1p7M.webp"),
  "cover-3": asset("8BGte7ej44YXZpbaELIivxyaIA.webp"),
  "cover-4": asset("OmjdHbbXDrb2cTsSRGNj7b5e3jo.webp"),
  "cover-5": asset("sP7CV1SRnqqQbAo8ETfIm4OA.webp"),
  "footer-cut": asset("vZnpJUdTyWujACeFLoU4bQxUsDU.webp"),
  "footer-plate": asset("hFtu9YOQYN18TKvbhsQSTPCw.webp"),
  "hero3-cut": asset("z1wxBUjtdEOZYBXKsic6OE03yQM.webp"),
  "hero3-plate": asset("fhhFUK3c6doyt8pwFR9RLBTgGqg.webp"),
  horizon: asset("AFOtBakM1oo2YgjwzCxfeaASg8.webp"),
  "journal-1": asset("w2UlbKx2Vdo5e7BnZeNPIe1yo.webp"),
  "journal-2": asset("Eb1uFBWT6v6lD14cKqee1Rr2Iw4.webp"),
  "journal-3": asset("urb7pwcsBQOWCSywBmbtIytIg.webp"),
  "pill-1": asset("KuzBdrMSkisZvxNb9je1m36fs.webp"),
  "pill-2": asset("hW2hwZLEyAP5TcAH6kIPTzosoo.webp"),
  reel: asset("sO6ZR8lWeH3OmVK3qLdoEm1fA.mp4"),
  "reel-poster": asset("rCDUF7QGDhaQhvwB9f4KpAiGyM.webp"),
  "sky-ribbon": asset("ocAm6qW5p5Zumd8tOOxG8CwzdZw.webp"),
  voice: asset("baTXyIsXCnxa0vASZKj7C5gA.webp"),
  "work-alder": asset("gU3eOlAmRnBLtEaxFQIWfEiOM.webp"),
  "work-cove": asset("LDux8qLU1zO4PKEK1rBPn6yPAfA.webp"),
  "work-juno": asset("Y2X7sGZkQ49oUsVM1KLmOJ5xHU.webp"),
  "work-kite": asset("8KiI4mEzaAiC4si7BIewiRbMiko.webp"),
  "work-linen": asset("x5ESroMsYGsarXZ1xWgAtRNHlUo.webp"),
  "work-marlow": asset("vHxgnYQ47nQv909GTILXnl8Xm0.webp"),
  "work-ridge": asset("X5mjlMnAVB4TZoburb19UnqInU.webp"),
  "work-vale": asset("clua8EEkWpOsWrBVNUmgiHKzG8.webp"),
  "team-1": asset("hVpBRZ44qbWpdicwkYfsz8EsbQc.webp"),
  "team-2": asset("ZjRGChNFFmjzH13y0JFehJELyA.webp"),
  "team-3": asset("JNYvwEU8QxZa0S86PyZQx77lA.webp"),
  "team-4": asset("gZoNexNHqe6GbmxzsHJaaYRsJA8.webp"),
  "team-5": asset("f5jpX9ECM8FSM9TCaMygYOt21U.webp"),
  "team-6": asset("f6S4vAOkmftW2ipmoo6ML2jwts.webp"),
};
