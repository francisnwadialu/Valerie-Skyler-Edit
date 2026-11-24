"use client";

import { useEffect, useRef, useState } from "react";
import { MONO, ORBITRON } from "./shared";

/**
 * Official Bandsintown widget for Valerie Skyler (artist id 15622702). Bandsintown's script scans the
 * page for `.bit-widget-initializer` anchors and renders its own responsive list (its `layout-breakpoint`
 * of 900 switches to the stacked mobile layout on tablets and phones).
 *
 * The app id ships in the page HTML by design but is still kept out of the repository:
 *   NEXT_PUBLIC_BANDSINTOWN_APP_ID=<your Bandsintown app id>
 *   NEXT_PUBLIC_BANDSINTOWN_ARTIST_ID=15622702   (optional, this is the default)
 * When no app id is set the widget uses Bandsintown's own fallback (`js_<hostname>`), so dates still
 * load; the env var only attributes the requests to a real Bandsintown app.
 */
const APP_ID = (process.env.NEXT_PUBLIC_BANDSINTOWN_APP_ID ?? "").trim();
const ARTIST_ID = process.env.NEXT_PUBLIC_BANDSINTOWN_ARTIST_ID ?? "15622702";
const SCRIPT_SRC = "https://widgetv3.bandsintown.com/main.min.js";
const ARTIST_URL = `https://www.bandsintown.com/a/${ARTIST_ID}`;

const INK = "rgba(244,238,246,1)"; // site body ink
const PINK = "#ff2cdf"; // hero neon pink
const INK_DIM = "rgba(244,238,246,0.55)";

/** Dark variant of the widget options: transparent panel so the section's #222227 shows through. */
const WIDGET_ATTRS: Record<string, string> = {
  "data-artist-name": `id_${ARTIST_ID}`,
  "data-background-color": "rgba(0,0,0,0)",
  "data-separator-color": "rgba(255,255,255,0.14)",
  "data-text-color": INK,
  "data-font": "Figtree",
  "data-auto-style": "true",
  "data-button-label-capitalization": "uppercase",
  "data-header-capitalization": "uppercase",
  "data-location-capitalization": "uppercase",
  "data-venue-capitalization": "uppercase",
  "data-local-dates-position": "tab",
  "data-display-lineup": "false",
  "data-display-start-time": "false",
  "data-social-share-icon": "false",
  "data-display-limit": "all",
  "data-date-format": "MMM. D, YYYY",
  "data-date-orientation": "horizontal",
  "data-date-border-color": "rgba(255,255,255,0.28)",
  "data-date-border-width": "1px",
  "data-date-capitalization": "capitalize",
  "data-date-border-radius": "10px",
  "data-event-ticket-cta-size": "medium",
  "data-event-ticket-text": "TICKETS",
  "data-event-ticket-icon": "false",
  "data-event-ticket-cta-text-color": "#0b0710",
  "data-event-ticket-cta-bg-color": PINK,
  "data-event-ticket-cta-border-color": PINK,
  "data-event-ticket-cta-border-width": "0px",
  "data-event-ticket-cta-border-radius": "2px",
  "data-sold-out-button-text-color": "rgba(244,238,246,0.62)",
  "data-sold-out-button-background-color": "rgba(255,255,255,0.08)",
  "data-sold-out-button-border-color": "rgba(255,255,255,0.18)",
  "data-sold-out-button-clickable": "true",
  "data-event-rsvp-position": "left",
  "data-event-rsvp-cta-size": "medium",
  "data-event-rsvp-only-show-icon": "false",
  "data-event-rsvp-text": "RSVP",
  "data-event-rsvp-icon": "false",
  "data-event-rsvp-cta-text-color": INK,
  "data-event-rsvp-cta-bg-color": "rgba(0,0,0,0)",
  "data-event-rsvp-cta-border-color": "rgba(255,255,255,0.26)",
  "data-event-rsvp-cta-border-width": "1px",
  "data-event-rsvp-cta-border-radius": "2px",
  "data-follow-section-position": "top",
  "data-follow-section-alignment": "center",
  "data-follow-section-header-text":
    "Get updates on new shows, new music, and more",
  "data-follow-section-cta-size": "medium",
  "data-follow-section-cta-text": "FOLLOW",
  "data-follow-section-cta-icon": "false",
  "data-follow-section-cta-text-color": "#0b0710",
  "data-follow-section-cta-bg-color": PINK,
  "data-follow-section-cta-border-color": PINK,
  "data-follow-section-cta-border-width": "0px",
  "data-follow-section-cta-border-radius": "2px",
  "data-play-my-city-position": "bottom",
  "data-play-my-city-alignment": "center",
  "data-play-my-city-header-text": "Don’t see a show near you?",
  "data-play-my-city-cta-size": "medium",
  "data-play-my-city-cta-text": "REQUEST A SHOW",
  "data-play-my-city-cta-icon": "false",
  "data-play-my-city-cta-text-color": "#0b0710",
  "data-play-my-city-cta-bg-color": PINK,
  "data-play-my-city-cta-border-color": PINK,
  "data-play-my-city-cta-border-width": "0px",
  "data-play-my-city-cta-border-radius": "2px",
  "data-language": "en",
  "data-layout-breakpoint": "900",
  "data-bit-logo-position": "bottomRight",
  "data-bit-logo-color": INK_DIM,
};

export function BandsintownWidget({ heading = "Shows" }: { heading?: string }) {
  const host = useRef<HTMLDivElement | null>(null);
  // Bandsintown draws nothing at all when the artist has no dates, so the section keeps a styled
  // empty state instead of collapsing to a blank band. It disappears the moment the widget paints.
  const [showEmpty, setShowEmpty] = useState(false);

  useEffect(() => {
    const box = host.current;
    if (!box) return;

    // The widget owns this subtree, so build the anchor outside React.
    box.replaceChildren();
    const anchor = document.createElement("a");
    anchor.className = "bit-widget-initializer";
    anchor.setAttribute("data-app-id", APP_ID || `js_${window.location.hostname}`);
    Object.entries(WIDGET_ATTRS).forEach(([key, value]) =>
      anchor.setAttribute(key, value),
    );
    box.appendChild(anchor);

    const painted = () => {
      const list = box.querySelector(".bit-container");
      return !!list && list.childElementCount > 0;
    };
    const observer = new MutationObserver(() => {
      if (painted()) setShowEmpty(false);
    });
    observer.observe(box, { childList: true, subtree: true });
    // Only show "no dates" once the widget has had time to answer, so it never flashes.
    const timer = window.setTimeout(() => setShowEmpty(!painted()), 2500);

    // Re-adding the script makes Bandsintown scan the DOM again, which is how the widget
    // mounts long after the first page load (e.g. client-side navigation back to home).
    const existing = document.querySelector<HTMLScriptElement>(
      `script[src="${SCRIPT_SRC}"]`,
    );
    if (existing) {
      existing.remove();
    }
    const script = document.createElement("script");
    script.src = SCRIPT_SRC;
    script.charset = "utf-8";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      observer.disconnect();
      window.clearTimeout(timer);
      box.replaceChildren();
    };
  }, []);

  return (
    <div className="shows-widget">
      <h2
        style={{
          margin: "0 0 40px",
          fontFamily: ORBITRON,
          fontSize: "clamp(34px, 4.2vw, 64px)",
          lineHeight: 1.02,
          fontWeight: 500,
          letterSpacing: "-0.04em",
          color: "#ffffff",
        }}
      >
        {heading}
      </h2>
      <div
        className={
          showEmpty ? "shows-widget-frame is-empty" : "shows-widget-frame"
        }
        ref={host}
      />
      {showEmpty ? (
        <div className="shows-widget-empty">
          <p>
            No upcoming shows right now — new dates are announced on
            Bandsintown first.
          </p>
          <a
            href={ARTIST_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            Follow on Bandsintown
            <span aria-hidden="true"> ↗</span>
          </a>
        </div>
      ) : null}
      <style>{`
        .shows-widget { display: flex; flex-direction: column; width: 100%; height: auto; }
        /* The widget grows to fit every date; nothing here may clip or cap it. */
        .shows-widget-frame {
          width: 100%;
          height: auto;
          min-height: 120px;
          overflow: visible;
          color: ${INK};
        }
        .shows-widget-frame .bit-widget,
        .shows-widget-frame .bit-widget * {
          font-family: "Figtree", "Inter", system-ui, sans-serif !important;
        }
        .shows-widget-frame .bit-widget {
          background: transparent !important;
          padding: 0 !important;
          color: ${INK} !important;
        }
        /* Bandsintown paints a white card behind some layouts; keep it transparent. */
        .shows-widget-frame .bit-widget .bit-event,
        .shows-widget-frame .bit-widget .bit-events,
        .shows-widget-frame .bit-widget .bit-top-track-button,
        .shows-widget-frame .bit-widget .bit-follow,
        .shows-widget-frame .bit-widget .bit-play-my-city,
        .shows-widget-frame .bit-widget .bit-venue,
        .shows-widget-frame .bit-widget .bit-details,
        .shows-widget-frame .bit-widget .bit-date,
        .shows-widget-frame .bit-widget .bit-event-headline {
          background: transparent !important;
          color: ${INK} !important;
        }
        .shows-widget-frame .bit-widget a { color: ${INK} !important; }
        /* The ticket CTA is itself the anchor (a.bit-offers.bit-button), not a child of .bit-offers. */
        .shows-widget-frame .bit-widget a.bit-offers,
        .shows-widget-frame .bit-widget a.bit-offers:visited,
        .shows-widget-frame .bit-widget .bit-button-type-tickets,
        .shows-widget-frame .bit-widget a.bit-button-type-tickets {
          background: ${PINK} !important;
          color: #0b0710 !important;
          border: 0 !important;
        }
        .shows-widget-frame .bit-widget a.bit-button-type-rsvp,
        .shows-widget-frame .bit-widget a[class*="rsvp"] {
          background: transparent !important;
          color: ${INK} !important;
          border: 1px solid rgba(255,255,255,0.26) !important;
        }
        .shows-widget-frame .bit-widget a[class*="sold-out"],
        .shows-widget-frame .bit-widget a[class*="sold_out"] {
          background: rgba(255,255,255,0.08) !important;
          color: rgba(244,238,246,0.62) !important;
          border: 1px solid rgba(255,255,255,0.18) !important;
        }
        .shows-widget-frame .bit-widget .bit-logo-container,
        .shows-widget-frame .bit-widget .bit-logo-container a { opacity: .55; }
        /* With no dates there is nothing in the frame; collapsing it removes the blank band. */
        .shows-widget-frame.is-empty { min-height: 0; }
        /* Styled "no dates" state: same hairline + mono caption language as the ticket rows. */
        .shows-widget-empty {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 16px;
          padding-top: 28px;
          border-top: 1px solid rgba(255,255,255,0.14);
          font-family: Figtree, Inter, system-ui, sans-serif;
        }
        .shows-widget-empty p {
          margin: 0;
          max-width: 46ch;
          font-size: 17px;
          line-height: 1.45;
          color: rgba(244,238,246,0.72);
        }
        .shows-widget-empty a {
          font-family: ${MONO};
          font-size: 12px;
          letter-spacing: .08em;
          text-transform: uppercase;
          text-decoration: none;
          color: ${PINK};
          border-bottom: 1px solid rgba(255,44,223,0.45);
          padding-bottom: 3px;
        }
        .shows-widget-empty a:hover { border-color: ${PINK}; }
      `}</style>
    </div>
  );
}
