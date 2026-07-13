import { useEffect, useRef, useState } from "react";

interface CountUpProps {
  end: number;
  suffix?: string;
  duration?: number;
}

const canAnimate = () =>
  typeof window !== "undefined" &&
  typeof IntersectionObserver !== "undefined" &&
  !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Counts from 0 to `end` when scrolled into view. Respects reduced motion and
 *  falls back to the final value where the observer isn't available. */
export function CountUp({ end, suffix = "", duration = 1300 }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(() => (canAnimate() ? 0 : end));

  useEffect(() => {
    const el = ref.current;
    if (!el || !canAnimate()) return;

    let raf = 0;
    const run = () => {
      const start = performance.now();
      const tick = (now: number) => {
        const p = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - p, 3);
        setValue(Math.round(eased * end));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };

    // The counter is only visible once it's scrolled into view, which is
    // exactly when the observer fires — so there's no "stuck at 0" a user
    // could actually see, and no need for a time-based fallback.
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          run();
          observer.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(el);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [end, duration]);

  return (
    <span ref={ref} className="stat-num">
      {value}
      {suffix && <span>{suffix}</span>}
    </span>
  );
}
