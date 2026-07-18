import { useEffect, useRef } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  X,
  GithubLogo,
  ArrowUpRight,
  GameController,
  Code,
  Wrench,
} from "@phosphor-icons/react";
import type { Project } from "../data/content";
import { ProjectScene } from "./ProjectScene";
import { getLenis } from "../lib/useLenis";
import { cn } from "../lib/cn";

interface Props {
  project: Project | null;
  onClose: () => void;
}

/**
 * The briefing: click a level-select card and it opens big, with the animated
 * scene as a header, the full what/how breakdown, and a primary "Launch demo"
 * action. Escape, backdrop click, and the X all close it; focus moves in on
 * open and back to the card on close. Web projects enter crisp, games springy.
 */
export function ProjectModal({ project, onClose }: Props) {
  const reduce = useReducedMotion();
  const panelRef = useRef<HTMLDivElement>(null);

  // Scroll lock + Escape + focus hand-off while open.
  useEffect(() => {
    if (!project) return;
    const opener = document.activeElement as HTMLElement | null;
    getLenis()?.stop();
    document.body.style.overflow = "hidden";
    panelRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      // Keep Tab cycling inside the dialog while it's open.
      if (e.key !== "Tab") return;
      const panel = panelRef.current;
      if (!panel) return;
      const focusables = panel.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input, textarea, select, [tabindex]:not([tabindex="-1"])',
      );
      if (focusables.length === 0) {
        e.preventDefault();
        return;
      }
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement;
      if (e.shiftKey) {
        if (active === first || active === panel || !panel.contains(active)) {
          e.preventDefault();
          last.focus();
        }
      } else if (active === last || !panel.contains(active)) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      getLenis()?.start();
      opener?.focus?.();
    };
  }, [project, onClose]);

  const isGame = project?.type === "game";
  const enter = reduce
    ? { duration: 0 }
    : isGame
      ? { type: "spring" as const, stiffness: 300, damping: 24 }
      : { duration: 0.3, ease: [0.2, 0, 0, 1] as const };

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[110] grid place-items-center overflow-y-auto p-3 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduce ? 0 : 0.22 }}
          onClick={onClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" aria-hidden="true" />

          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="pmodal-title"
            tabIndex={-1}
            data-lenis-prevent
            onClick={(e) => e.stopPropagation()}
            className="relative max-h-[92dvh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-white/15 bg-surface shadow-2xl outline-none"
            initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.92, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.95, y: 10 }}
            transition={enter}
          >
            {/* Scene header (stays a dark screen in both themes) */}
            <div className="relative aspect-[21/9] overflow-hidden border-b border-white/10 bg-void">
              <ProjectScene id={project.mark} />
              {isGame && <div className="fx-scan opacity-20" aria-hidden="true" />}
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent"
                aria-hidden="true"
              />
              <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-void/70 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider backdrop-blur">
                {isGame ? (
                  <GameController size={12} weight="bold" className="text-amber" />
                ) : (
                  <Code size={12} weight="bold" className="text-acid" />
                )}
                <span className={isGame ? "text-amber" : "text-acid"}>
                  {isGame ? "game" : "web"}
                </span>
              </span>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close project details"
                className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-md border border-white/15 bg-void/70 text-ink backdrop-blur transition-colors hover:border-acid/50 hover:text-acid"
              >
                <X size={18} weight="bold" />
              </button>
            </div>

            <div className="p-6 sm:p-8">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h3 id="pmodal-title" className="text-2xl font-bold leading-tight sm:text-3xl">
                    {project.title}
                  </h3>
                  <span className="font-mono text-sm text-muted">{project.short}</span>
                </div>
                {project.highlight && (
                  <p className="border-l-2 border-acid/40 pl-3 font-mono text-[11px] text-acid">
                    {project.highlight}
                  </p>
                )}
              </div>

              <p className="mt-5 text-[15px] leading-relaxed text-muted">
                {project.details.what}
              </p>

              <div className="mt-6">
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-acid">
                  $ how it works
                </span>
                <ul className="mt-3 space-y-2.5">
                  {project.details.how.map((point, i) => (
                    <li key={i} className="flex gap-2.5 text-[14px] leading-snug text-muted">
                      <span className={cn("mt-px", isGame ? "text-amber" : "text-acid")}>▸</span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>

              <ul className="mt-6 flex flex-wrap gap-1.5">
                {project.tech.map((t) => (
                  <li
                    key={t}
                    className="rounded border border-white/10 bg-panel px-2 py-0.5 font-mono text-[11px] text-muted"
                  >
                    {t}
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-white/10 pt-6">
                {project.links.demo ? (
                  <a
                    href={project.links.demo}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg bg-acid px-7 py-3.5 font-mono text-sm font-bold uppercase tracking-wider text-void transition-transform hover:-translate-y-0.5"
                  >
                    Launch demo <ArrowUpRight size={16} weight="bold" />
                  </a>
                ) : project.links.github ? (
                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg bg-acid px-7 py-3.5 font-mono text-sm font-bold uppercase tracking-wider text-void transition-transform hover:-translate-y-0.5"
                  >
                    <GithubLogo size={17} weight="bold" /> View source
                  </a>
                ) : (
                  <span className="inline-flex items-center gap-2 rounded-lg border border-amber/40 px-7 py-3.5 font-mono text-sm font-bold uppercase tracking-wider text-amber">
                    <Wrench size={16} weight="bold" /> In development
                  </span>
                )}
                {project.links.demo && project.links.github && (
                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg border border-white/15 px-6 py-3.5 font-mono text-sm text-muted transition-colors hover:border-acid/40 hover:text-acid"
                  >
                    <GithubLogo size={16} /> Source code
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
