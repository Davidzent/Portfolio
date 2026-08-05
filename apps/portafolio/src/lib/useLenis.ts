import { useEffect } from "react";
import type Lenis from "lenis";

/** Module-level handle so overlays (e.g. the project modal) can pause
 *  smooth scrolling. Null under reduced motion, where Lenis never runs, and
 *  briefly on load before the runtime below arrives. */
let instance: Lenis | null = null;

export function getLenis(): Lenis | null {
  return instance;
}

/**
 * Smooth scroll via Lenis, driven off GSAP's ticker so ScrollTrigger stays in
 * sync (no `window.onscroll` anywhere). Disabled entirely under reduced motion,
 * where the browser's native scroll is exactly what the user asked for.
 *
 * The runtime is fetched dynamically: nothing about it is visible until the
 * page scrolls, so making the hero wait on it buys nothing.
 */
export function useLenis() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let cancelled = false;
    let stop: (() => void) | undefined;

    void import("./smoothScroll").then(({ startSmoothScroll }) => {
      // Unmounted before the chunk landed — starting now would leak a ticker.
      if (cancelled) return;
      const started = startSmoothScroll();
      instance = started.lenis;
      stop = started.stop;
    });

    return () => {
      cancelled = true;
      stop?.();
      instance = null;
    };
  }, []);
}
