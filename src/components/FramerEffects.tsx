"use client";

import { useEffect } from "react";
import { initContactForm } from "./effects/contact-form";
import { initFaq } from "./effects/faq";
import { initHover } from "./effects/hover";

/**
 * Re-attaches the behaviors the original Framer runtime provided to the
 * server-rendered markup. Every initializer is defensive: if the markup it
 * expects is not on the page it does nothing.
 */
export function FramerEffects({ faq }: { faq: Record<string, string> }) {
  useEffect(() => {
    const stops = [
      initFaq(document, faq),
      initHover(),
      initContactForm(document),
    ];
    return () => stops.forEach((stop) => stop());
  }, [faq]);
  return null;
}
