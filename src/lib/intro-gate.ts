import { prefersReducedMotion } from "@/lib/gsap";

/*
 * Gate for the cinematic intro on hard loads of "/". Entrance choreographies
 * (header cascade, hero reveals) consult this module so they hold until the
 * intro's exit zoom begins, and run untouched everywhere else.
 *
 * This module must stay in the eager root bundle (chrome.tsx, imported by
 * __root.tsx, imports it), so bootPath is captured before hydration and before
 * any SPA navigation can change location. Capturing it in the code-split index
 * chunk would race route preloading and misread SPA navs as hard loads.
 */

/** Path of the document's hard load; null on the server. */
export const bootPath = typeof window !== "undefined" ? window.location.pathname : null;

let played = false;
let resolver: (() => void) | undefined;
const done = new Promise<void>((resolve) => {
  resolver = resolve;
});

/*
 * Initial mount state for the overlay, and nothing else. Deliberately blind to
 * reduced motion: that's a client-only signal, and using it during hydration
 * would mismatch the SSR'd overlay and force React into a full client
 * re-render. Hard loads of "/" hydrate the overlay (reduced-motion CSS hides
 * it pre-paint; the layout effect then unmounts it), SPA remounts render null
 * via the module flag.
 */
export function introOverlayMounts(): boolean {
  return typeof window !== "undefined" && bootPath === "/" && !played;
}

/** True while a hard "/" load should (still) show the intro. */
export function introWillPlay(): boolean {
  return typeof window !== "undefined" && bootPath === "/" && !played && !prefersReducedMotion();
}

/** Marks the intro finished (or skipped) and releases every gated entrance. Idempotent. */
export function resolveIntro(): void {
  played = true;
  resolver?.();
}

/*
 * If a consumer defers on the intro but the loader never resolves (its chunk
 * failed to load, an error before the timeline's own failsafe), release the
 * page anyway rather than holding entrances hidden forever.
 */
let failsafeArmed = false;
function armFailsafe(): void {
  if (failsafeArmed) return;
  failsafeArmed = true;
  window.setTimeout(resolveIntro, 8000);
}

/** Runs cb immediately when no intro gates it, otherwise after the intro resolves. */
export function whenIntroDone(cb: () => void): void {
  if (!introWillPlay()) {
    cb();
    return;
  }
  armFailsafe();
  void done.then(cb);
}
