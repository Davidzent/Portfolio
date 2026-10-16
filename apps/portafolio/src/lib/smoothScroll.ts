import Lenis from "lenis";

/**
 * Lenis on its own requestAnimationFrame loop. Its own module so the runtime
 * loads after first paint rather than blocking the hero.
 */
export function startSmoothScroll(): { lenis: Lenis; stop: () => void } {
  const lenis = new Lenis({
    duration: 1.05,
    smoothWheel: true,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    autoRaf: true,
  });

  // destroy() also cancels the autoRaf frame.
  return { lenis, stop: () => lenis.destroy() };
}
