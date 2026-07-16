import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { CaretLeft, CaretRight, User } from "@phosphor-icons/react";
import { cn } from "../lib/cn";

export interface Slide {
  src: string;
  caption: string;
}

const ARROW =
  "absolute top-1/2 z-20 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-md border border-white/15 bg-void/60 text-ink backdrop-blur transition-all duration-200 opacity-0 group-hover:opacity-100 focus-visible:opacity-100 pointer-coarse:opacity-100 hover:border-acid/50 hover:text-acid";

/**
 * The player-card portrait as a rotating photo gallery. Auto-advances (paused
 * while hovered or keyboard-focused), with prev/next arrows that appear on
 * hover (always visible on touch, where hover doesn't exist), dots for direct
 * jumps, and a caption line that changes with the active photo. Under reduced
 * motion: no auto-rotate, no crossfade, arrows and dots still work.
 */
export function PortraitCarousel({ slides, classLabel }: { slides: Slide[]; classLabel: string }) {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const n = slides.length;

  const prev = useCallback(() => setI((v) => (v - 1 + n) % n), [n]);
  const next = useCallback(() => setI((v) => (v + 1) % n), [n]);

  useEffect(() => {
    if (reduce || paused || n <= 1) return;
    const t = window.setInterval(() => setI((v) => (v + 1) % n), 4200);
    return () => window.clearInterval(t);
  }, [reduce, paused, n]);

  const active = n > 0 ? slides[i] : null;

  return (
    <div>
      <div
        className="group relative aspect-[4/5] overflow-hidden bg-panel"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
        role="group"
        aria-roledescription="carousel"
        aria-label="Travel photos"
      >
        {active ? (
          <AnimatePresence initial={false}>
            <motion.img
              key={i}
              src={active.src}
              alt={active.caption}
              loading={i === 0 ? "eager" : "lazy"}
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover"
              initial={reduce ? { opacity: 1 } : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduce ? 0 : 0.7, ease: [0.2, 0, 0, 1] }}
            />
          </AnimatePresence>
        ) : (
          <div className="grid-lines absolute inset-0 grid place-items-center">
            <div className="flex flex-col items-center gap-3 text-faint">
              <User size={54} weight="thin" />
              <span className="font-mono text-[11px] uppercase tracking-[0.25em]">
                portrait // placeholder
              </span>
            </div>
          </div>
        )}

        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent"
          aria-hidden="true"
        />
        <span className="pointer-events-none absolute left-3 top-3 z-10 h-4 w-4 border-l-2 border-t-2 border-acid/70" />
        <span className="pointer-events-none absolute right-3 top-3 z-10 h-4 w-4 border-r-2 border-t-2 border-acid/70" />

        {n > 1 && (
          <>
            <button type="button" onClick={prev} aria-label="Previous photo" className={cn(ARROW, "left-2")}>
              <CaretLeft size={18} weight="bold" />
            </button>
            <button type="button" onClick={next} aria-label="Next photo" className={cn(ARROW, "right-2")}>
              <CaretRight size={18} weight="bold" />
            </button>
          </>
        )}

        <div className="absolute inset-x-3 bottom-3 z-10 flex items-end justify-between gap-2">
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-acid drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">
            {classLabel}
          </span>
          {n > 1 && (
            <div className="flex gap-1.5">
              {slides.map((s, j) => (
                <button
                  key={s.src}
                  type="button"
                  onClick={() => setI(j)}
                  aria-label={`Show photo ${j + 1} of ${n}`}
                  aria-current={j === i}
                  className={cn(
                    "h-1.5 rounded-full transition-all",
                    j === i ? "w-4 bg-acid" : "w-1.5 bg-white/40 hover:bg-white/80",
                  )}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {active && (
        <div className="flex items-center justify-between gap-2 border-t border-white/10 px-3.5 py-2.5">
          <span className="font-mono text-[11px] text-muted" aria-live="polite">
            {active.caption}
          </span>
          <span className="font-mono text-[10px] tabular-nums text-faint">
            {i + 1}/{n}
          </span>
        </div>
      )}
    </div>
  );
}
