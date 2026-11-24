/**
 * Framer-style hover: components whose generated stylesheet has `.hover` rules (buttons, journal/work cards,
 * the contact submit button, FAQ rows, ...) get a `hover` class while the pointer is over them.
 */
const HOVER_TARGETS =
  '[data-highlight="true"], .framer-PMrot, .framer-PB8fO, .framer-IsWPZ, .framer-pvqxw';

export function initHover(): () => void {
  if (!window.matchMedia?.("(hover: hover)").matches) return () => {};
  const mark = (e: PointerEvent, on: boolean) => {
    const target =
      e.target instanceof Element
        ? e.target.closest<HTMLElement>(HOVER_TARGETS)
        : null;
    if (!target) return;
    // ignore moves between children of the same element
    const related = e.relatedTarget instanceof Node ? e.relatedTarget : null;
    if (related && target.contains(related)) return;
    target.classList.toggle("hover", on);
  };
  const over = (e: PointerEvent) => mark(e, true);
  const out = (e: PointerEvent) => mark(e, false);
  document.addEventListener("pointerover", over);
  document.addEventListener("pointerout", out);
  return () => {
    document.removeEventListener("pointerover", over);
    document.removeEventListener("pointerout", out);
  };
}
