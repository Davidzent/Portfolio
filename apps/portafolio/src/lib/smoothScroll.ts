import Lenis from "lenis";
import { gsap, ScrollTrigger } from "./gsap";

/**
 * Lenis plus the GSAP ticker driving it and ScrollTrigger listening. Its own
 * module so ~140 kB loads after first paint rather than blocking the hero.
 */
export function startSmoothScroll(): { lenis: Lenis; stop: () => void } {
  const lenis = new Lenis({
    duration: 1.05,
    smoothWheel: true,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  });

  lenis.on("scroll", ScrollTrigger.update);
  const raf = (time: number) => lenis.raf(time * 1000);
  gsap.ticker.add(raf);
  gsap.ticker.lagSmoothing(0);

  return {
    lenis,
    stop: () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
    },
  };
}
