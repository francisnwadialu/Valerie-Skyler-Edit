/**
 * Production stand-in for the copy markup overlay.
 *
 * `next.config.ts` aliases `@/components/dev/annotator` to this module for
 * production builds, so the real overlay (and everything it imports) never
 * enters the bundle. It renders nothing and has no client-side code.
 */
export function Annotator() {
  return null;
}

export default Annotator;
