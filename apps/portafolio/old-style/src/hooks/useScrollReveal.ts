import { useEffect } from "react";

/**
 * Reveals every element marked with [data-reveal] as it enters the
 * viewport. Content is static, so a single observer set up once after
 * mount covers the whole page. Respects prefers-reduced-motion.
 */
export function useScrollReveal() {
  useEffect(() => {
    const elements = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]"),
    );

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      elements.forEach((el) => el.classList.add("revealed"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );

    elements.forEach((el) => observer.observe(el));

    // Safety net: if the observer never reports (e.g. it fails, or the tab is
    // opened in the background and closed before it's ever shown), make sure
    // the content can't stay stuck invisible. Only fires if nothing revealed.
    const fallback = window.setTimeout(() => {
      if (!document.querySelector("[data-reveal].revealed")) {
        elements.forEach((el) => el.classList.add("revealed"));
      }
    }, 1600);

    return () => {
      observer.disconnect();
      window.clearTimeout(fallback);
    };
  }, []);
}
