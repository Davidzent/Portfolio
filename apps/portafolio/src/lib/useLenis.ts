import { useEffect } from "react";
import type Lenis from "lenis";

/** Module-level handle so overlays (e.g. the project modal) can pause smooth
 *  scrolling. Null under reduced motion, and briefly before the chunk lands. */
let instance: Lenis | null = null;

export function getLenis(): Lenis | null {
  return instance;
}

/**
 * Smooth scroll via Lenis, driven off GSAP's ticker so ScrollTrigger stays in
 * sync. Disabled under reduced motion. The runtime is imported dynamically —
 * none of it matters until the page scrolls.
 */
export function useLenis() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let cancelled = false;
    let stop: (() => void) | undefined;

    void import("./smoothScroll").then(({ startSmoothScroll }) => {
      // Unmounted before the chunk landed; starting now would leak a ticker.
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
