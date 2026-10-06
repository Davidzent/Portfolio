import { useEffect } from "react";

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
      stop = startSmoothScroll().stop;
    });

    return () => {
      cancelled = true;
      stop?.();
    };
  }, []);
}
