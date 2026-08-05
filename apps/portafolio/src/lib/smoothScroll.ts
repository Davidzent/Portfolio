import Lenis from "lenis";
import { gsap, ScrollTrigger } from "./gsap";

/**
 * Everything smooth scrolling needs: Lenis, GSAP's ticker driving it, and
 * ScrollTrigger listening for position updates. Split into its own module so
 * the ~140 kB of scroll machinery loads after first paint instead of blocking
 * the hero — none of it matters until the visitor scrolls.
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
