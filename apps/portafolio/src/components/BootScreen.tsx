import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { BrandLogo } from "./BrandLogo";

/**
 * The site "boots up" once per session: black screen, the mark scramble-decodes
 * over a loading bar, then the screen lifts. Skipped entirely under reduced
 * motion and on repeat navigations. Content renders underneath the whole time,
 * so this never blocks LCP.
 */
export function BootScreen() {
  const reduce = useReducedMotion();
  // Boot only on the first visit of the session (and never under reduced motion);
  // decided once at mount so the effect below never flips state synchronously.
  const [done, setDone] = useState(() => {
    if (reduce) return true;
    try {
      return sessionStorage.getItem("zntsns-booted") === "1";
    } catch {
      return false;
    }
  });

  useEffect(() => {
    if (done) return;
    const t = setTimeout(() => {
      setDone(true);
      try {
        sessionStorage.setItem("zntsns-booted", "1");
      } catch {
        /* private mode: boot again next load, harmless */
      }
    }, 500);
    return () => clearTimeout(t);
  }, [done]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          data-theme="dark"
          className="fixed inset-0 z-[120] grid place-items-center bg-void"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.2, 0, 0, 1] }}
          aria-hidden="true"
        >
          <div className="flex flex-col items-center gap-5">
              <BrandLogo height={44} boot />
            <div className="h-[3px] w-40 overflow-hidden rounded-full bg-panel-2">
              <motion.div
                className="h-full origin-left bg-acid"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.5, ease: [0.2, 0, 0, 1] }}
              />
            </div>
            <span className="font-mono text-[11px] tracking-[0.3em] text-faint uppercase">
              booting
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
