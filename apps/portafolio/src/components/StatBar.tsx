import { motion, useReducedMotion } from "motion/react";

/** RPG-style stat bar. Fills via scaleX (transform-only) when scrolled in. */
export function StatBar({ label, value }: { label: string; value: number }) {
  const reduce = useReducedMotion();
  return (
    <div>
      <div className="flex items-baseline justify-between font-mono text-[11px] uppercase tracking-wider">
        <span className="text-muted">{label}</span>
        <span className="text-acid tabular-nums">{value}</span>
      </div>
      <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-panel-2">
        <motion.div
          className="h-full origin-left rounded-full bg-acid"
          style={{ boxShadow: "0 0 12px rgba(125,252,90,0.5)" }}
          initial={reduce ? { scaleX: value / 100 } : { scaleX: 0 }}
          whileInView={{ scaleX: value / 100 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.9, ease: [0.2, 0, 0, 1] }}
        />
      </div>
    </div>
  );
}
