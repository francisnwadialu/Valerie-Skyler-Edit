"use client";

/**
 * Copy markup overlay — development only.
 *
 * This file is mounted from `src/app/layout.tsx` behind a `NODE_ENV` check and
 * is aliased away in production builds (see `next.config.ts`), so visitors never
 * receive it and its code is not part of the production bundle.
 *
 * Usage
 *  - Click the pill / press Ctrl+Shift+X to open or close the panel.
 *  - "Start marking" turns the page into a picker: hovering highlights the copy
 *    element under the cursor, clicking it opens a note composer.
 *  - Annotations are stored in localStorage under a key namespaced by PROJECT,
 *    so they are per browser and per origin, and never collide with another
 *    site using the same overlay on the same host.
 *  - "Export" produces the whole list as plain text (grouped by route) to copy
 *    into a message, a ticket or a doc.
 */

import { usePathname } from "next/navigation";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from "react";

/* -------------------------------------------------------------------------- */
/*  Configuration                                                             */
/* -------------------------------------------------------------------------- */

/**
 * Namespaces the localStorage bucket. Every project that carries this overlay
 * must use its own slug here, otherwise annotations made on two different
 * sites in the same browser profile would land in one list.
 */
const PROJECT = "website-valerieskyler";

const STORAGE_KEY = `copy-markup:${PROJECT}:v1`;

const ACCENT = "#c9f24d";
const DANGER = "#ff6b81";
const Z_INDEX = 2147483000;

/** Elements that are not copy and cannot be annotated. */
const SKIP_TAGS = new Set([
  "HTML",
  "BODY",
  "HEAD",
  "SCRIPT",
  "STYLE",
  "NOSCRIPT",
  "TEMPLATE",
  "META",
  "LINK",
  "IMG",
  "PICTURE",
  "SOURCE",
  "VIDEO",
  "AUDIO",
  "CANVAS",
  "IFRAME",
  "OBJECT",
  "EMBED",
  "INPUT",
  "TEXTAREA",
  "SELECT",
  "OPTION",
  "BR",
  "HR",
]);

/* -------------------------------------------------------------------------- */
/*  Types                                                                     */
/* -------------------------------------------------------------------------- */

type Annotation = {
  id: string;
  /** Pathname the copy was marked on, e.g. "/shows". */
  route: string;
  /** Structural selector back to the marked element. */
  selector: string;
  /** Lower-case tag name, for the export. */
  tag: string;
  /** The element's text when it was marked (truncated). */
  text: string;
  note: string;
  createdAt: string;
};

type Draft = {
  route: string;
  selector: string;
  tag: string;
  text: string;
  note: string;
};

type Rect = { top: number; left: number; width: number; height: number };

type Pin = Rect & { id: string; number: number; visible: boolean };

/* -------------------------------------------------------------------------- */
/*  Storage                                                                   */
/* -------------------------------------------------------------------------- */

function isAnnotation(value: unknown): value is Annotation {
  if (!value || typeof value !== "object") return false;
  const record = value as Record<string, unknown>;
  return (["id", "route", "selector", "tag", "text", "note", "createdAt"] as const).every(
    (key) => typeof record[key] === "string",
  );
}

function readAnnotations(): Annotation[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter(isAnnotation) : [];
  } catch {
    return [];
  }
}

function writeAnnotations(annotations: Annotation[]): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(annotations));
  } catch {
    /* storage full or disabled — the overlay keeps working for this session */
  }
}

function newId(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `a_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

/* -------------------------------------------------------------------------- */
/*  DOM helpers                                                               */
/* -------------------------------------------------------------------------- */

function normalize(value: string | null | undefined): string {
  return (value ?? "").replace(/\s+/g, " ").trim();
}

function escapeId(id: string): string {
  if (typeof CSS !== "undefined" && typeof CSS.escape === "function") {
    return CSS.escape(id);
  }
  return id.replace(/[^a-zA-Z0-9_-]/g, "\\$&");
}

/** Builds a stable-ish selector from the element up to <body>. */
function selectorFor(element: Element): string {
  const parts: string[] = [];
  let node: Element | null = element;

  while (node && node !== document.body && node.parentElement) {
    if (node.id) {
      parts.unshift(`#${escapeId(node.id)}`);
      break;
    }
    const parent: Element = node.parentElement;
    const sameTag = Array.from(parent.children).filter(
      (child) => child.tagName === node!.tagName,
    );
    const index = sameTag.indexOf(node) + 1;
    parts.unshift(`${node.tagName.toLowerCase()}:nth-of-type(${index})`);
    node = parent;
  }

  return parts.join(" > ");
}

/** Walks up from a hit element to the nearest element that carries copy. */
function annotatableTarget(start: Element | null): HTMLElement | null {
  let node: HTMLElement | null = start instanceof HTMLElement ? start : null;

  while (node && node !== document.body && node !== document.documentElement) {
    if (node.closest("[data-copy-markup]")) return null;
    const isSkipped =
      SKIP_TAGS.has(node.tagName) || node instanceof SVGElement;
    if (!isSkipped && normalize(node.textContent).length >= 2) return node;
    node = node.parentElement;
  }

  return null;
}

/**
 * The copy under the cursor. The exact text node wins over the hit element, so
 * a word inside a headline marks the headline rather than the wrapper around
 * it; the hit element is only a fallback for text-less areas.
 */
function copyTargetAt(x: number, y: number): HTMLElement | null {
  const range = document.caretRangeFromPoint?.(x, y);

  if (range && range.startContainer.nodeType === Node.TEXT_NODE) {
    let node = range.startContainer.parentElement;

    while (node && node !== document.body && node !== document.documentElement) {
      if (node.closest("[data-copy-markup]")) break;

      const isSkipped = SKIP_TAGS.has(node.tagName) || node instanceof SVGElement;
      if (!isSkipped && normalize(node.textContent).length >= 2) {
        const display = window.getComputedStyle(node).display;
        if (display !== "inline" && display !== "contents") return node;
      }

      node = node.parentElement;
    }
  }

  return annotatableTarget(document.elementFromPoint(x, y));
}

/** Finds the live element for a stored annotation, falling back to its text. */
function resolveAnnotation(annotation: Annotation): HTMLElement | null {
  const wanted = normalize(annotation.text);

  const looksRight = (element: Element): boolean => {
    if (!wanted) return true;
    const actual = normalize(element.textContent);
    if (!actual) return false;
    return (
      actual === wanted ||
      actual.startsWith(wanted) ||
      (wanted.length >= 40 && actual.length >= 40 && wanted.startsWith(actual))
    );
  };

  try {
    const direct = document.querySelector(annotation.selector);
    if (direct instanceof HTMLElement && looksRight(direct)) return direct;
  } catch {
    /* the stored selector is no longer valid — fall through to the text match */
  }

  if (!wanted) return null;

  const candidates = document.querySelectorAll(
    "h1,h2,h3,h4,h5,h6,p,li,a,button,label,blockquote,figcaption,span,strong,em,small,b,div,dt,dd,td,th,cite,q,time",
  );
  for (const candidate of Array.from(candidates)) {
    if (candidate instanceof HTMLElement && normalize(candidate.textContent) === wanted) {
      return candidate;
    }
  }

  return null;
}

function rectOf(element: Element): Rect {
  const box = element.getBoundingClientRect();
  return { top: box.top, left: box.left, width: box.width, height: box.height };
}

/* -------------------------------------------------------------------------- */
/*  Export                                                                    */
/* -------------------------------------------------------------------------- */

function buildExport(annotations: Annotation[]): string {
  if (annotations.length === 0) {
    return `Copy markup — ${PROJECT}\n\nNo annotations yet.\n`;
  }

  const byRoute = new Map<string, Annotation[]>();
  for (const annotation of annotations) {
    const items = byRoute.get(annotation.route) ?? [];
    items.push(annotation);
    byRoute.set(annotation.route, items);
  }

  const routes = Array.from(byRoute.keys()).sort((a, b) => a.localeCompare(b));
  const count = annotations.length;
  const lines: string[] = [
    `Copy markup — ${PROJECT}`,
    `${count} annotation${count === 1 ? "" : "s"} across ${routes.length} page${
      routes.length === 1 ? "" : "s"
    }`,
    `Exported ${new Date().toISOString()}`,
    "",
  ];

  for (const route of routes) {
    const items = byRoute.get(route) ?? [];
    lines.push(`=== ${route} (${items.length}) ===`);
    items.forEach((annotation, index) => {
      lines.push(`${index + 1}. <${annotation.tag}> ${annotation.text}`);
      lines.push(`   note: ${annotation.note}`);
      lines.push(`   selector: ${annotation.selector}`);
      lines.push("");
    });
  }

  return `${lines.join("\n").trimEnd()}\n`;
}

/* -------------------------------------------------------------------------- */
/*  Styles                                                                    */
/* -------------------------------------------------------------------------- */

const panelStyle: CSSProperties = {
  position: "fixed",
  right: 16,
  bottom: 16,
  zIndex: Z_INDEX,
  width: "min(390px, calc(100vw - 24px))",
  maxHeight: "min(72vh, 660px)",
  display: "flex",
  flexDirection: "column",
  boxSizing: "border-box",
  background: "rgba(12, 12, 14, 0.97)",
  color: "#f4f4f7",
  border: "1px solid rgba(201, 242, 77, 0.4)",
  borderRadius: 10,
  boxShadow: "0 18px 48px rgba(0, 0, 0, 0.55)",
  font: '12px/1.5 ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace',
  overflow: "hidden",
  textAlign: "left",
};

const buttonStyle: CSSProperties = {
  appearance: "none",
  border: "1px solid #3a3a40",
  background: "#1a1a1e",
  color: "#f4f4f7",
  font: "inherit",
  fontSize: 11,
  lineHeight: 1,
  padding: "6px 8px",
  borderRadius: 5,
  cursor: "pointer",
};

const headerButtonStyle: CSSProperties = {
  ...buttonStyle,
  padding: "4px 7px",
  background: "transparent",
  borderColor: "#33333a",
  color: "#c9c9d2",
};

const mutedStyle: CSSProperties = {
  color: "#8f8f9c",
  fontSize: 11,
};

/* -------------------------------------------------------------------------- */
/*  Component                                                                 */
/* -------------------------------------------------------------------------- */

export function Annotator() {
  const pathname = usePathname() ?? "/";

  const [mounted, setMounted] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [open, setOpen] = useState(true);
  const [marking, setMarking] = useState(false);
  const [annotations, setAnnotations] = useState<Annotation[]>([]);
  const [hover, setHover] = useState<Rect | null>(null);
  const [pins, setPins] = useState<Pin[]>([]);
  const [flash, setFlash] = useState<Rect | null>(null);
  const [draft, setDraft] = useState<Draft | null>(null);
  const [showExport, setShowExport] = useState(false);
  const [copied, setCopied] = useState(false);

  const draftTextRef = useRef<HTMLTextAreaElement | null>(null);
  const exportTextRef = useRef<HTMLTextAreaElement | null>(null);
  const flashTimer = useRef<number | null>(null);
  const markingRef = useRef(false);

  markingRef.current = marking;

  /* ---------------------------------------------------------------- */
  /*  Load + persist                                                   */
  /* ---------------------------------------------------------------- */

  useEffect(() => {
    setAnnotations(readAnnotations());
    setHydrated(true);
    setMounted(true);
  }, []);

  // Only write back once the stored list has been loaded into state, otherwise
  // the first render would persist an empty array over the saved annotations.
  useEffect(() => {
    if (!hydrated) return;
    writeAnnotations(annotations);
  }, [annotations, hydrated]);

  useEffect(() => {
    const onStorage = (event: StorageEvent) => {
      if (event.key !== STORAGE_KEY) return;
      setAnnotations(readAnnotations());
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  /* ---------------------------------------------------------------- */
  /*  Keyboard: toggle panel, cancel marking                           */
  /* ---------------------------------------------------------------- */

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (
        (event.metaKey || event.ctrlKey) &&
        event.shiftKey &&
        (event.key === "x" || event.key === "X")
      ) {
        event.preventDefault();
        setOpen((value) => !value);
        return;
      }
      if (event.key !== "Escape") return;
      if (markingRef.current) {
        event.preventDefault();
        setMarking(false);
        setDraft(null);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  /* ---------------------------------------------------------------- */
  /*  Mark mode: highlight under the cursor, click to annotate         */
  /* ---------------------------------------------------------------- */

  useEffect(() => {
    if (!marking) {
      setHover(null);
      return;
    }

    const body = document.body;
    const previousCursor = body.style.cursor;
    const previousSelect = body.style.userSelect;
    body.style.cursor = "crosshair";
    body.style.userSelect = "none";

    let frame = 0;
    let lastX = 0;
    let lastY = 0;

    const targetAt = (x: number, y: number): HTMLElement | null => copyTargetAt(x, y);

    const paint = () => {
      frame = 0;
      const target = targetAt(lastX, lastY);
      setHover(target ? rectOf(target) : null);
    };

    const onPointerMove = (event: PointerEvent) => {
      lastX = event.clientX;
      lastY = event.clientY;
      if (!frame) frame = window.requestAnimationFrame(paint);
    };

    const onPointerDown = (event: PointerEvent) => {
      const target = targetAt(event.clientX, event.clientY);
      if (!target) return;
      event.preventDefault();
      event.stopPropagation();
      setHover(rectOf(target));
      setDraft({
        route: window.location.pathname,
        selector: selectorFor(target),
        tag: target.tagName.toLowerCase(),
        text: normalize(target.textContent).slice(0, 240),
        note: "",
      });
      window.setTimeout(() => draftTextRef.current?.focus(), 0);
    };

    // While marking, a click must never navigate or trigger the page's own UI.
    const swallow = (event: Event) => {
      const target = event.target;
      if (target instanceof Element && target.closest("[data-copy-markup]")) return;
      event.preventDefault();
      event.stopPropagation();
    };

    window.addEventListener("pointermove", onPointerMove, true);
    window.addEventListener("pointerdown", onPointerDown, true);
    window.addEventListener("click", swallow, true);
    window.addEventListener("auxclick", swallow, true);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      body.style.cursor = previousCursor;
      body.style.userSelect = previousSelect;
      window.removeEventListener("pointermove", onPointerMove, true);
      window.removeEventListener("pointerdown", onPointerDown, true);
      window.removeEventListener("click", swallow, true);
      window.removeEventListener("auxclick", swallow, true);
    };
  }, [marking]);

  /* ---------------------------------------------------------------- */
  /*  Pins on the current page                                         */
  /* ---------------------------------------------------------------- */

  const measurePins = useCallback(() => {
    const route = window.location.pathname;
    const onRoute = annotations.filter((annotation) => annotation.route === route);
    const next: Pin[] = [];

    onRoute.forEach((annotation, index) => {
      const element = resolveAnnotation(annotation);
      if (!element) return;
      const rect = rectOf(element);
      if (rect.width === 0 && rect.height === 0) return;
      next.push({
        id: annotation.id,
        number: index + 1,
        ...rect,
        visible: rect.top + rect.height > 0 && rect.top < window.innerHeight,
      });
    });

    setPins(next);
  }, [annotations]);

  useEffect(() => {
    if (!mounted) return;
    measurePins();

    let frame = 0;
    const onScrollOrResize = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        measurePins();
      });
    };

    window.addEventListener("scroll", onScrollOrResize, { passive: true, capture: true });
    window.addEventListener("resize", onScrollOrResize);
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScrollOrResize, { capture: true });
      window.removeEventListener("resize", onScrollOrResize);
    };
  }, [measurePins, mounted, pathname]);

  /* ---------------------------------------------------------------- */
  /*  Actions                                                          */
  /* ---------------------------------------------------------------- */

  const saveDraft = useCallback(() => {
    if (!draft) return;
    const note = draft.note.trim();
    if (!note) return;

    const annotation: Annotation = {
      id: newId(),
      route: draft.route,
      selector: draft.selector,
      tag: draft.tag,
      text: draft.text,
      note,
      createdAt: new Date().toISOString(),
    };

    setAnnotations((previous) => [...previous, annotation]);
    setDraft(null);
  }, [draft]);

  const focusAnnotation = useCallback((annotation: Annotation) => {
    const element = resolveAnnotation(annotation);
    if (!element) return;

    element.scrollIntoView({ block: "center", behavior: "smooth", inline: "nearest" });

    if (flashTimer.current) window.clearTimeout(flashTimer.current);
    flashTimer.current = window.setTimeout(() => {
      setFlash(rectOf(element));
      flashTimer.current = window.setTimeout(() => {
        setFlash(null);
        flashTimer.current = null;
      }, 1300);
    }, 320);
  }, []);

  useEffect(
    () => () => {
      if (flashTimer.current) window.clearTimeout(flashTimer.current);
    },
    [],
  );

  const removeAnnotation = useCallback((id: string) => {
    setAnnotations((previous) => previous.filter((annotation) => annotation.id !== id));
  }, []);

  const clearAll = useCallback(() => {
    if (!window.confirm(`Delete all ${annotations.length} copy annotations for ${PROJECT}?`)) {
      return;
    }
    setAnnotations([]);
  }, [annotations.length]);

  const exportText = useMemo(() => buildExport(annotations), [annotations]);

  const copyExport = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(exportText);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      const field = exportTextRef.current;
      if (!field) return;
      field.focus();
      field.select();
      try {
        document.execCommand("copy");
        setCopied(true);
        window.setTimeout(() => setCopied(false), 1600);
      } catch {
        /* the textarea is still selectable by hand */
      }
    }
  }, [exportText]);

  /* ---------------------------------------------------------------- */
  /*  Render                                                           */
  /* ---------------------------------------------------------------- */

  if (!mounted) return null;

  const onThisRoute = annotations.filter((annotation) => annotation.route === pathname);

  /* Collapsed pill */
  if (!open) {
    return (
      <div data-copy-markup="" style={{ position: "fixed", right: 16, bottom: 16, zIndex: Z_INDEX }}>
        <button
          type="button"
          onClick={() => setOpen(true)}
          style={{
            ...buttonStyle,
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "7px 11px",
            borderRadius: 999,
            border: `1px solid ${ACCENT}`,
            background: "rgba(12, 12, 14, 0.95)",
            color: ACCENT,
            fontSize: 11,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
          }}
          title="Open the copy markup overlay (Ctrl+Shift+X)"
        >
          <span
            style={{
              width: 7,
              height: 7,
              borderRadius: 999,
              background: ACCENT,
              display: "inline-block",
            }}
          />
          Copy markup · {annotations.length}
        </button>
      </div>
    );
  }

  return (
    <>
      {/* Hover outline while picking an element */}
      {marking && hover ? (
        <div
          data-copy-markup=""
          aria-hidden="true"
          style={{
            position: "fixed",
            top: hover.top,
            left: hover.left,
            width: hover.width,
            height: hover.height,
            border: `1px solid ${ACCENT}`,
            background: "rgba(201, 242, 77, 0.12)",
            boxShadow: "0 0 0 1px rgba(0, 0, 0, 0.5)",
            zIndex: Z_INDEX - 1,
            pointerEvents: "none",
            boxSizing: "border-box",
          }}
        />
      ) : null}

      {/* Numbered pins on already-annotated copy */}
      {pins.map((pin) =>
        pin.visible ? (
          <div
            key={pin.id}
            data-copy-markup=""
            aria-hidden="true"
            style={{
              position: "fixed",
              top: pin.top - 8,
              left: Math.max(pin.left - 22, 2),
              minWidth: 16,
              height: 16,
              padding: "0 4px",
              boxSizing: "border-box",
              borderRadius: 999,
              background: ACCENT,
              color: "#101010",
              font: "600 10px/16px ui-monospace, SFMono-Regular, Menlo, monospace",
              textAlign: "center",
              zIndex: Z_INDEX - 2,
              pointerEvents: "none",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.45)",
            }}
          >
            {pin.number}
          </div>
        ) : null,
      )}

      {/* Flash when jumping from the list to the copy */}
      {flash ? (
        <div
          data-copy-markup=""
          aria-hidden="true"
          style={{
            position: "fixed",
            top: flash.top - 3,
            left: flash.left - 3,
            width: flash.width + 6,
            height: flash.height + 6,
            border: `2px solid ${ACCENT}`,
            background: "rgba(201, 242, 77, 0.18)",
            zIndex: Z_INDEX - 1,
            pointerEvents: "none",
            boxSizing: "border-box",
          }}
        />
      ) : null}

      {/* Marking hint */}
      {marking && !draft ? (
        <div
          data-copy-markup=""
          style={{
            position: "fixed",
            bottom: 24,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: Z_INDEX,
            padding: "7px 12px",
            borderRadius: 999,
            background: "rgba(12, 12, 14, 0.95)",
            border: `1px solid ${ACCENT}`,
            color: ACCENT,
            font: "11px/1.4 ui-monospace, SFMono-Regular, Menlo, monospace",
            pointerEvents: "none",
            whiteSpace: "nowrap",
          }}
        >
          Click any copy to annotate it · Esc to stop
        </div>
      ) : null}

      <section data-copy-markup="" style={panelStyle} aria-label="Copy markup overlay">
        {/* Header */}
        <header
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "10px 12px",
            borderBottom: "1px solid #26262c",
          }}
        >
          <span
            style={{
              width: 7,
              height: 7,
              borderRadius: 999,
              background: marking ? ACCENT : "#5b5b66",
              display: "inline-block",
              flex: "none",
            }}
          />
          <div style={{ display: "flex", flexDirection: "column", gap: 1, minWidth: 0 }}>
            <span
              style={{
                fontSize: 11,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "#e9e9f2",
              }}
            >
              Copy markup
            </span>
            <span style={{ ...mutedStyle, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {PROJECT}
            </span>
          </div>
          <span style={{ flex: 1 }} />
          <button
            type="button"
            style={headerButtonStyle}
            onClick={() => {
              setShowExport(true);
              setDraft(null);
            }}
            title="Export every annotation as text"
          >
            Export
          </button>
          <button
            type="button"
            style={{ ...headerButtonStyle, fontSize: 13, padding: "2px 6px" }}
            onClick={() => {
              setMarking(false);
              setDraft(null);
              setOpen(false);
            }}
            aria-label="Close copy markup overlay"
            title="Close (Ctrl+Shift+X)"
          >
            ×
          </button>
        </header>

        {/* Mark toggle */}
        <div style={{ padding: "10px 12px 8px", borderBottom: "1px solid #26262c" }}>
          <button
            type="button"
            onClick={() => {
              setMarking((value) => !value);
              setDraft(null);
            }}
            style={{
              ...buttonStyle,
              width: "100%",
              padding: "8px 10px",
              textAlign: "center",
              border: `1px solid ${marking ? ACCENT : "#3a3a40"}`,
              background: marking ? "rgba(201, 242, 77, 0.16)" : "#1a1a1e",
              color: marking ? ACCENT : "#f4f4f7",
              fontSize: 11,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
            }}
          >
            {marking ? "Stop marking (Esc)" : "Start marking"}
          </button>
          <p style={{ ...mutedStyle, margin: "8px 0 0", lineHeight: 1.5 }}>
            {marking
              ? "Hover to highlight the copy, click to write a note."
              : `${onThisRoute.length} annotation${onThisRoute.length === 1 ? "" : "s"} on ${
                  pathname
                } · ${annotations.length} total`}
          </p>
        </div>

        {showExport ? (
          /* Export view */
          <div style={{ display: "flex", flexDirection: "column", gap: 8, padding: 12, minHeight: 0 }}>
            <textarea
              ref={exportTextRef}
              readOnly
              value={exportText}
              spellCheck={false}
              onFocus={(event) => event.currentTarget.select()}
              style={{
                width: "100%",
                height: 240,
                resize: "vertical",
                boxSizing: "border-box",
                background: "#0b0b0d",
                color: "#d9d9e3",
                border: "1px solid #2c2c33",
                borderRadius: 6,
                padding: 8,
                font: '11px/1.5 ui-monospace, SFMono-Regular, Menlo, monospace',
                whiteSpace: "pre",
              }}
            />
            <div style={{ display: "flex", gap: 8 }}>
              <button
                type="button"
                onClick={() => void copyExport()}
                style={{
                  ...buttonStyle,
                  flex: 1,
                  border: `1px solid ${copied ? ACCENT : "#3a3a40"}`,
                  color: copied ? ACCENT : "#f4f4f7",
                  padding: "8px 10px",
                }}
              >
                {copied ? "Copied" : "Copy to clipboard"}
              </button>
              <button
                type="button"
                style={{ ...buttonStyle, padding: "8px 10px" }}
                onClick={() => {
                  setShowExport(false);
                  setCopied(false);
                }}
              >
                Back
              </button>
            </div>
            <span style={mutedStyle}>
              Nothing is uploaded. This is the whole list for {PROJECT}.
            </span>
          </div>
        ) : draft ? (
          /* Composer */
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 8,
              padding: 12,
              borderBottom: "1px solid #26262c",
            }}
          >
            <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
              <span style={{ color: ACCENT, fontSize: 11 }}>&lt;{draft.tag}&gt;</span>
              <span style={{ ...mutedStyle, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {draft.route}
              </span>
            </div>
            <p
              style={{
                margin: 0,
                padding: "6px 8px",
                borderLeft: `2px solid ${ACCENT}`,
                background: "#141418",
                color: "#d9d9e3",
                maxHeight: 72,
                overflow: "auto",
              }}
            >
              {draft.text || "(no text)"}
            </p>
            <textarea
              ref={draftTextRef}
              autoFocus
              value={draft.note}
              placeholder="What should change? e.g. tighten, wrong claim, casing…"
              onChange={(event) =>
                setDraft((current) =>
                  current ? { ...current, note: event.target.value } : current,
                )
              }
              onKeyDown={(event) => {
                if (event.key === "Enter" && (event.metaKey || event.ctrlKey)) {
                  event.preventDefault();
                  saveDraft();
                }
              }}
              style={{
                width: "100%",
                height: 84,
                resize: "vertical",
                boxSizing: "border-box",
                background: "#0b0b0d",
                color: "#f4f4f7",
                border: "1px solid #2c2c33",
                borderRadius: 6,
                padding: 8,
                font: "inherit",
              }}
            />
            <div style={{ display: "flex", gap: 8 }}>
              <button
                type="button"
                onClick={saveDraft}
                disabled={!draft.note.trim()}
                style={{
                  ...buttonStyle,
                  flex: 1,
                  padding: "8px 10px",
                  border: `1px solid ${draft.note.trim() ? ACCENT : "#3a3a40"}`,
                  background: draft.note.trim() ? "rgba(201, 242, 77, 0.16)" : "#1a1a1e",
                  color: draft.note.trim() ? ACCENT : "#6f6f7b",
                  cursor: draft.note.trim() ? "pointer" : "not-allowed",
                }}
                title="Save annotation (Ctrl+Enter)"
              >
                Save note
              </button>
              <button
                type="button"
                style={{ ...buttonStyle, padding: "8px 10px" }}
                onClick={() => setDraft(null)}
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          /* Annotation list */
          <div style={{ overflowY: "auto", flex: 1, minHeight: 0 }}>
            {annotations.length === 0 ? (
              <p style={{ ...mutedStyle, margin: 0, padding: "14px 12px", lineHeight: 1.6 }}>
                No annotations yet. Turn on marking, then click a headline, paragraph or button
                label to leave a note.
              </p>
            ) : (
              <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
                {annotations.map((annotation, index) => {
                  const onRoute = annotation.route === pathname;
                  const number = index + 1;
                  return (
                    <li
                      key={annotation.id}
                      style={{
                        display: "flex",
                        gap: 8,
                        padding: "10px 12px",
                        borderBottom: "1px solid #202026",
                      }}
                    >
                      <span
                        style={{
                          flex: "none",
                          width: 18,
                          height: 18,
                          borderRadius: 999,
                          background: onRoute ? ACCENT : "#2a2a31",
                          color: onRoute ? "#101010" : "#a5a5b2",
                          font: "600 10px/18px ui-monospace, SFMono-Regular, Menlo, monospace",
                          textAlign: "center",
                        }}
                      >
                        {number}
                      </span>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div
                          style={{
                            color: "#e9e9f2",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                          title={annotation.text}
                        >
                          <span style={{ color: ACCENT }}>&lt;{annotation.tag}&gt;</span>{" "}
                          {annotation.text || "(no text)"}
                        </div>
                        <div style={{ color: "#f4f4f7", marginTop: 3, whiteSpace: "pre-wrap" }}>
                          {annotation.note}
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 4 }}>
                          <span style={{ ...mutedStyle, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                            {annotation.route}
                          </span>
                          {onRoute ? (
                            <button
                              type="button"
                              onClick={() => focusAnnotation(annotation)}
                              style={{
                                ...buttonStyle,
                                padding: "2px 6px",
                                fontSize: 10,
                                background: "transparent",
                                color: "#c9c9d2",
                              }}
                            >
                              Locate
                            </button>
                          ) : null}
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeAnnotation(annotation.id)}
                        style={{
                          ...headerButtonStyle,
                          flex: "none",
                          alignSelf: "flex-start",
                          padding: "1px 5px",
                          fontSize: 12,
                          color: DANGER,
                          borderColor: "transparent",
                        }}
                        aria-label={`Delete annotation ${number}`}
                        title="Delete"
                      >
                        ×
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        )}

        {/* Footer */}
        <footer
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "8px 12px",
            borderTop: "1px solid #26262c",
            background: "#101013",
          }}
        >
          <span style={mutedStyle}>
            {annotations.length} saved · Ctrl+Shift+X
          </span>
          <span style={{ flex: 1 }} />
          {annotations.length > 0 ? (
            <button
              type="button"
              onClick={clearAll}
              style={{
                ...headerButtonStyle,
                color: DANGER,
                borderColor: "transparent",
                padding: "2px 4px",
              }}
            >
              Clear all
            </button>
          ) : null}
        </footer>
      </section>
    </>
  );
}

export default Annotator;
