"use client";

import { useEffect, useRef, useState } from "react";
import {
  FIGTREE,
  IMG,
  MONO,
  ORBITRON,
  clamp,
  css,
  scrollY,
  useScrollFrame,
} from "./shared";

export interface HeroImage {
  src: string;
  alt?: string;
}

export interface DuskHeroProps {
  sky?: HeroImage;
  subject?: HeroImage;
  focus?: string;
  name?: string;
  split?: number;
  wordScale?: number;
  wordBottom?: number;
  track?: number;
  line?: string;
  cta1?: string;
  link1?: string;
  cta2?: string;
  link2?: string;
  rays?: boolean;
  rayX?: number;
  tint?: number;
  fitWidth?: boolean;
  phoneTop?: number;
  phoneDrop?: number;
  topColor?: string;
  phoneFocus?: string;
  noteSide?: "left" | "right";
  scrim?: number;
  showLinks?: boolean;
  showLine?: boolean;
  kicker?: string;
  /** Footer variant: no default artwork unless an image is passed. */
  defaultArt?: boolean;
}

const HERO_CSS = `
.dh-root{--p:0}
.dh-l{display:inline-block}
@keyframes dh-rise{from{transform:translate3d(0,104%,0)}to{transform:translate3d(0,0,0)}}
@keyframes dh-focus{from{opacity:0;filter:blur(18px);transform:translate3d(0,8%,0)}to{opacity:1;filter:blur(0);transform:translate3d(0,0,0)}}
.dh-anim .dh-back .dh-l{animation:dh-rise .62s cubic-bezier(.2,.8,.2,1) both}
.dh-anim .dh-front .dh-l{animation:dh-focus .62s cubic-bezier(.2,.8,.2,1) both}
@keyframes dh-settle{from{transform:scale(1.06)}to{transform:scale(1)}}
.dh-anim .dh-img{animation:dh-settle 1.6s cubic-bezier(.2,.8,.2,1) both}
.dh-ray{position:absolute;top:-30%;height:150%;transform-origin:50% 0;filter:blur(32px);mix-blend-mode:screen;pointer-events:none;will-change:transform,opacity}
@keyframes dh-sway{0%{transform:rotate(var(--r0)) translateX(0)}50%{transform:rotate(var(--r1)) translateX(var(--dx))}100%{transform:rotate(var(--r0)) translateX(0)}}
@keyframes dh-sweep{0%{transform:rotate(calc(var(--r0) - 26deg));opacity:0}60%{opacity:1}100%{transform:rotate(var(--r0));opacity:1}}
.dh-play .dh-ray{animation:dh-sweep 1.6s cubic-bezier(.2,.7,.2,1) both, dh-sway var(--dur) ease-in-out 1.6s infinite}
.dh-link{display:flex;align-items:center;gap:12px;text-decoration:none;color:inherit;transition:opacity .25s ease, gap .3s ease}
.dh-link:hover{gap:18px}
.dh-link i{display:block;width:22px;height:1px;background:currentColor;transition:width .3s ease}
.dh-link:hover i{width:34px}
@media (prefers-reduced-motion: reduce){.dh-play .dh-ray,.dh-anim .dh-l,.dh-anim .dh-img{animation:none}}
`;

function Letters({
  text,
  split,
  layer,
  size,
  track,
}: {
  text: string;
  split: number;
  layer: "back" | "front";
  size: number;
  track: number;
}) {
  const chars = Array.from(text);
  return (
    <div
      className={layer === "back" ? "dh-back" : "dh-front"}
      style={{
        display: "flex",
        whiteSpace: "nowrap",
        fontFamily: ORBITRON,
        fontWeight: 500,
        fontSize: size,
        lineHeight: 0.86,
        letterSpacing: `${track}em`,
        overflow: layer === "back" ? "hidden" : "visible",
        paddingBottom: "0.12em",
        paddingTop: "0.06em",
      }}
      aria-hidden={layer === "front"}
    >
      {chars.map((ch, i) => {
        const visible = layer === "back" ? i < split : i >= split;
        const dist = layer === "back" ? i : Math.abs(i - split);
        const solid = layer === "front" && visible;
        const outline = layer === "front" && !visible;
        const style = {
          visibility:
            visible || outline ? ("visible" as const) : ("hidden" as const),
          animationDelay: `${(layer === "back" ? 0.04 : 0.22) + dist * 0.035}s`,
          ...(outline
            ? {
                color: "transparent",
                WebkitTextStroke: "1.25px rgba(255,255,255,.5)",
                opacity: 0.9,
              }
            : solid
              ? {
                  backgroundImage:
                    "linear-gradient(100deg, rgba(255,226,204,.94) 0%, rgba(248,170,196,.8) 46%, rgba(196,166,244,.74) 100%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                  WebkitTextStroke: "1px rgba(255,255,255,.35)",
                }
              : { color: "#FFFFFF" }),
        };
        return (
          <span key={i} className="dh-l" style={style}>
            {ch === " " ? " " : ch}
          </span>
        );
      })}
    </div>
  );
}

/** The hero used on Home, as the page header on every other page, and (without art) in the footer. */
export function DuskHero(props: DuskHeroProps) {
  const {
    sky,
    subject,
    focus = "50% 40%",
    name = "",
    split = 4,
    wordScale = 0.205,
    wordBottom = 4.5,
    track = -0.06,
    line = "",
    cta1 = "Sign Up",
    link1 = "/sign-up",
    cta2 = "Music",
    link2 = "/music",
    rays = true,
    rayX = 30,
    tint = 0.35,
    fitWidth = true,
    phoneTop = 21,
    phoneDrop = 0,
    topColor = "#55418F",
    phoneFocus = "",
    noteSide = "left",
    scrim = 0.58,
    showLinks = true,
    showLine = true,
    kicker = "",
    defaultArt = true,
  } = props;

  const root = useRef<HTMLElement | null>(null);
  const [width, setWidth] = useState(1440);
  const [phase, setPhase] = useState<"idle" | "pre" | "play">("idle");
  const [q, setQ] = useState(0);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const ro =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(() => setWidth(el.clientWidth || 1440))
        : null;
    ro?.observe(el);
    setWidth(el.clientWidth || 1440);
    return () => ro?.disconnect();
  }, []);

  useEffect(() => {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    setPhase("pre");
    const id = window.setTimeout(() => setPhase("play"), 80);
    return () => window.clearTimeout(id);
  }, []);

  useScrollFrame(() => {
    const el = root.current;
    if (!el) return;
    const h = el.offsetHeight || 900;
    const top = el.getBoundingClientRect().top + scrollY();
    const r = clamp((scrollY() - top) / h);
    setQ((prev) => (Math.abs(prev - r) > 0.002 ? r : prev));
  });

  useEffect(() => {
    const el = root.current;
    if (!el || !window.matchMedia?.("(pointer: fine)").matches) return;
    const move = (e: PointerEvent) => {
      const b = el.getBoundingClientRect();
      el.style.setProperty(
        "--mx",
        `${((e.clientX - b.left) / b.width) * 100}%`,
      );
      el.style.setProperty(
        "--my",
        `${((e.clientY - b.top) / b.height) * 100}%`,
      );
      el.style.setProperty("--ml", "1");
    };
    const leave = () => el.style.setProperty("--ml", "0");
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
    };
  }, []);

  const phone = width < 720;
  const gutter = phone ? 18 : Math.round(width * 0.045);

  // Width of the name at 200px, measured once fonts are ready, so the name can span the hero exactly.
  const [nameWidth, setNameWidth] = useState(
    () => (name ? Array.from(name).length * (0.497 + track) : 0),
  );
  useEffect(() => {
    if (!name) {
      setNameWidth(0);
      return;
    }
    const probe = document.createElement("span");
    probe.style.cssText = `position:fixed;left:-10000px;top:-10000px;pointer-events:none;visibility:hidden;white-space:nowrap;font-family:${FIGTREE};font-weight:500;font-size:200px;letter-spacing:${track}em`;
    probe.textContent = name;
    document.body.appendChild(probe);
    const measure = () => {
      if (document.fonts?.check && !document.fonts.check("500 20px Figtree"))
        return;
      const w = probe.getBoundingClientRect().width / 200;
      if (w > 0) setNameWidth(w);
    };
    measure();
    void document.fonts?.ready.then(measure);
    const id = window.setTimeout(measure, 1200);
    return () => {
      window.clearTimeout(id);
      probe.remove();
    };
  }, [name, track]);

  const fitted =
    nameWidth > 0 ? (width - gutter * 2) / nameWidth : width * wordScale;
  const size = Math.round(
    fitWidth
      ? fitted * 0.995
      : width * (phone ? Math.min(0.24, wordScale * 1.12) : wordScale),
  );

  const plate = sky?.src ?? (defaultArt ? IMG["hero3-plate"] : "");
  const cut = subject?.src ?? (defaultArt && !sky?.src ? IMG["hero3-cut"] : "");
  const imgStyle = {
    position: "absolute" as const,
    inset: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover" as const,
    objectPosition: phone && phoneFocus ? phoneFocus : focus,
    display: "block" as const,
  };
  const settle = "transform .22s linear, opacity .22s linear";
  const cutTransform = `translate3d(0, ${(-1.5 * q).toFixed(3)}%, 0) scale(${(1 + 0.075 * q).toFixed(4)})`;
  const plateShift = `translate3d(0, ${(7 * q).toFixed(3)}%, 0)`;
  const wordTransform = `translate3d(0, ${(-26 * q).toFixed(2)}%, 0) scale(${(1 - 0.05 * q).toFixed(4)})`;
  const wordOpacity = 1 - 0.55 * q;
  const wordPos = phone
    ? { top: `${phoneTop}%` }
    : { bottom: `${wordBottom}%` };

  // Cyberpunk rays: neon pink, blue and violet, soft enough to screen-blend.
  const beams = [
    {
      x: rayX,
      w: 15,
      r0: "-24deg",
      r1: "-19deg",
      dx: "2%",
      dur: "14s",
      o: 0.5,
      tone: "linear-gradient(180deg, rgba(255,44,223,.95) 0%, rgba(255,44,223,.42) 34%, rgba(255,44,223,0) 78%)",
    },
    {
      x: rayX + 9,
      w: 7,
      r0: "-20deg",
      r1: "-25deg",
      dx: "-1.5%",
      dur: "11s",
      o: 0.46,
      tone: "linear-gradient(180deg, rgba(59,130,246,.95) 0%, rgba(59,130,246,.4) 36%, rgba(59,130,246,0) 80%)",
    },
    {
      x: rayX - 7,
      w: 5,
      r0: "-28deg",
      r1: "-23deg",
      dx: "1%",
      dur: "17s",
      o: 0.4,
      tone: "linear-gradient(180deg, rgba(168,85,255,.92) 0%, rgba(168,85,255,.38) 38%, rgba(168,85,255,0) 82%)",
    },
  ];

  const note = (align: "left" | "right") =>
    showLine && !phone && noteSide === align ? (
      <p
        style={
          align === "left"
            ? {
                margin: "0 0 18px",
                maxWidth: 300,
                fontSize: 15,
                lineHeight: 1.45,
                fontWeight: 400,
                color: "#fff",
                textWrap: "balance",
              }
            : {
                margin: 0,
                maxWidth: 300,
                textAlign: "right",
                fontSize: 15,
                lineHeight: 1.45,
                fontWeight: 400,
                color: "rgba(255,255,255,.86)",
                textWrap: "balance",
              }
        }
      >
        {line}
      </p>
    ) : null;

  return (
    <section
      ref={root}
      className={`dh-root dh-anim ${phase === "play" ? "dh-play" : ""}`}
      style={css({
        position: "relative",
        width: "100%",
        height: "100%",
        minHeight: 560,
        overflow: "hidden",
        background:
          phone && phoneDrop
            ? topColor
            : "linear-gradient(180deg,#6F5BA6 0%,#B57AB0 45%,#F2A88E 100%)",
        color: "#fff",
        fontFamily: FIGTREE,
        "--mx": "70%",
        "--my": "30%",
        "--ml": 0,
      })}
      aria-label={name ? `${name} hero` : "Hero"}
    >
      <style>{HERO_CSS}</style>
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: phone ? `${phoneDrop}%` : 0,
          height: "100%",
          transform: plateShift,
          transition: settle,
          ...(phone && phoneDrop
            ? {
                WebkitMaskImage:
                  "linear-gradient(180deg, transparent 0, #000 14%)",
                maskImage: "linear-gradient(180deg, transparent 0, #000 14%)",
              }
            : {}),
        }}
      >
        {plate ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            className="dh-img"
            src={plate}
            alt={sky?.alt ?? ""}
            style={imgStyle}
          />
        ) : null}
      </div>
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `linear-gradient(180deg, rgba(40,26,80,${tint * 0.55}) 0%, rgba(0,0,0,0) 30%, rgba(0,0,0,0) 55%, rgba(60,24,70,${tint}) 100%)`,
          pointerEvents: "none",
        }}
      />
      {rays ? (
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
          {beams.map((b, i) => (
            <div
              key={i}
              className="dh-ray"
              style={css({
                left: `${b.x}%`,
                width: `${b.w}%`,
                opacity: b.o,
                background: b.tone,
                transform: `rotate(${b.r0})`,
                "--r0": b.r0,
                "--r1": b.r1,
                "--dx": b.dx,
                "--dur": b.dur,
                animationDelay: `${i * 0.12}s, ${1.6 + i * 0.12}s`,
              })}
            />
          ))}
        </div>
      ) : null}
      {name ? (
        <div
          style={{
            position: "absolute",
            left: gutter,
            right: gutter,
            ...wordPos,
            transform: wordTransform,
            opacity: wordOpacity,
            transition: settle,
            transformOrigin: "50% 100%",
          }}
        >
          <Letters
            text={name}
            split={split}
            layer="back"
            size={size}
            track={track}
          />
        </div>
      ) : null}
      {cut ? (
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: phone ? `${phoneDrop}%` : 0,
            height: "100%",
            transform: plateShift,
            transition: settle,
            pointerEvents: "none",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="dh-img"
            src={cut}
            alt=""
            aria-hidden
            style={{
              ...imgStyle,
              transform: cutTransform,
              transformOrigin: "50% 100%",
              transition: "transform .22s linear",
            }}
          />
        </div>
      ) : null}
      {name ? (
        <div
          style={{
            position: "absolute",
            left: gutter,
            right: gutter,
            ...wordPos,
            transform: wordTransform,
            opacity: wordOpacity,
            transition: settle,
            transformOrigin: "50% 100%",
            pointerEvents: "none",
          }}
        >
          <Letters
            text={name}
            split={split}
            layer="front"
            size={size}
            track={track}
          />
        </div>
      ) : null}
      {rays ? (
        <div
          className="dh-ray"
          style={css({
            left: `${rayX + 2}%`,
            width: "18%",
            opacity: 0.18,
            background:
              "linear-gradient(180deg, rgba(120,180,255,.85), rgba(120,180,255,0) 72%)",
            "--r0": "-22deg",
            "--r1": "-18deg",
            "--dx": "1%",
            "--dur": "15s",
            transform: "rotate(-22deg)",
          })}
        />
      ) : null}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          opacity: "var(--ml)",
          transition: "opacity .5s ease",
          // Cyberpunk cursor glow: neon pink core, blue halo, violet offset.
          background:
            "radial-gradient(22% 26% at var(--mx) var(--my), rgba(255,44,223,.42) 0%, rgba(255,44,223,0) 66%), radial-gradient(44% 50% at var(--mx) var(--my), rgba(59,130,246,.28) 0%, rgba(59,130,246,0) 72%), radial-gradient(30% 38% at calc(var(--mx) + 9%) calc(var(--my) + 7%), rgba(168,85,255,.26) 0%, rgba(168,85,255,0) 70%)",
          mixBlendMode: "screen",
        }}
      />
      <h1
        style={{
          position: "absolute",
          width: 1,
          height: 1,
          overflow: "hidden",
          clip: "rect(0 0 0 0)",
          margin: 0,
        }}
      >
        {name ? `${name}. ${line}` : line || "Valerie Skyler"}
      </h1>
      <div
        style={{
          position: "absolute",
          zIndex: 3,
          left: gutter,
          right: gutter,
          bottom: phone ? "7%" : `calc(${wordBottom}% + ${size * 1.04}px)`,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          gap: 24,
          opacity: 1 - q * 1.6,
          transition: "opacity .22s linear",
          pointerEvents: q > 0.5 ? "none" : "auto",
        }}
      >
        <div
          style={{
            position: "relative",
            isolation: "isolate",
            display: "flex",
            flexDirection: "column",
            gap: 10,
            fontSize: phone ? 14 : 15,
            fontWeight: 500,
            textShadow: "0 1px 2px rgba(30,14,48,.35)",
          }}
        >
          {scrim > 0 && (showLine || kicker || (showLinks && (cta1 || cta2))) ? (
            <span
              aria-hidden
              style={{
                position: "absolute",
                left: -40,
                right: -48,
                top: -34,
                bottom: -30,
                zIndex: -1,
                borderRadius: 40,
                background: `rgba(30,16,50,${scrim})`,
                filter: "blur(22px)",
                pointerEvents: "none",
              }}
            />
          ) : null}
          {note("left")}
          {kicker ? (
            <span
              style={{
                font: `500 12px/1 ${MONO}`,
                letterSpacing: ".05em",
                marginBottom: 6,
              }}
            >
              {kicker}
            </span>
          ) : null}
          {showLinks && cta1 ? (
            <a className="dh-link" href={link1}>
              <i />
              {cta1}
            </a>
          ) : null}
          {showLinks && cta2 ? (
            <a className="dh-link" href={link2} style={{ opacity: 0.86 }}>
              <i />
              {cta2}
            </a>
          ) : null}
        </div>
        {note("right")}
      </div>
      {phone && showLine && scrim > 0 ? (
        <span
          aria-hidden
          style={{
            position: "absolute",
            left: gutter - 30,
            width: 300,
            bottom: "calc(7% - 24px)",
            height: 190,
            borderRadius: 40,
            background: `rgba(30,16,50,${scrim})`,
            filter: "blur(24px)",
            pointerEvents: "none",
          }}
        />
      ) : null}
      {phone && showLine ? (
        <p
          style={{
            position: "absolute",
            zIndex: 3,
            left: gutter,
            right: gutter,
            bottom: "calc(7% + 64px)",
            textShadow: "0 1px 2px rgba(30,14,48,.4)",
            margin: 0,
            fontSize: 15,
            lineHeight: 1.45,
            color: "rgba(255,255,255,.9)",
            maxWidth: 260,
          }}
        >
          {line}
        </p>
      ) : null}
    </section>
  );
}
