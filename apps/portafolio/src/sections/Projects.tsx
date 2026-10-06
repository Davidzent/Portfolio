import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  GithubLogo,
  ArrowUpRight,
  GameController,
  Code,
  Wrench,
  CaretLeft,
  CaretRight,
} from "@phosphor-icons/react";
import { projects, type Project } from "../data/content";
import { SectionHeading } from "../components/SectionHeading";
import { Reveal } from "../components/Reveal";
import { ProjectScene } from "../components/ProjectScene";
import { cn } from "../lib/cn";

const PANEL_ID = "featured-project";
const tabId = (p: Project) => `level-${p.id}`;
const pad = (n: number) => String(n).padStart(2, "0");

function TypeChip({ isGame }: { isGame: boolean }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-void/70 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider backdrop-blur">
      {isGame ? (
        <GameController size={12} weight="bold" className="text-amber" />
      ) : (
        <Code size={12} weight="bold" className="text-acid" />
      )}
      <span className={isGame ? "text-amber" : "text-acid"}>{isGame ? "game" : "web"}</span>
    </span>
  );
}

function TechList({ tech, className }: { tech: string[]; className?: string }) {
  return (
    <ul className={cn("flex flex-wrap gap-1.5", className)}>
      {tech.map((t) => (
        <li
          key={t}
          className="rounded border border-white/10 bg-panel px-2 py-0.5 font-mono text-[11px] text-muted"
        >
          {t}
        </li>
      ))}
    </ul>
  );
}

/** "awardtrace.zntsns.com" or "zntsns.com/simmer" for the screen's address bar. */
function address(p: Project): string | null {
  const link = p.links.demo ?? p.links.github;
  if (!link) return null;
  const url = new URL(link, "https://www.zntsns.com");
  return url.host.replace(/^www\./, "") + url.pathname.replace(/\/$/, "");
}

interface LevelSelectProps {
  index: number;
  onSelect: (i: number) => void;
}

/**
 * Console-style level select: a row of animated tiles that keeps the selected
 * one centered. It's an ARIA tablist, so the arrow keys move the selection.
 */
function LevelSelect({ index, onSelect }: LevelSelectProps) {
  const reduce = useReducedMotion();
  const listRef = useRef<HTMLUListElement>(null);

  // Scroll the row itself; scrollIntoView would also move the page.
  useEffect(() => {
    const list = listRef.current;
    const tile = list?.querySelector<HTMLElement>('[aria-selected="true"]');
    if (!list || !tile) return;
    const left = tile.offsetLeft - (list.clientWidth - tile.offsetWidth) / 2;
    list.scrollTo({ left, behavior: reduce ? "auto" : "smooth" });
  }, [index, reduce]);

  const onKeyDown = (e: KeyboardEvent) => {
    const n = projects.length;
    const next = { ArrowRight: (index + 1) % n, ArrowLeft: (index - 1 + n) % n, Home: 0, End: n - 1 }[
      e.key
    ];
    if (next === undefined) return;
    e.preventDefault();
    onSelect(next);
    document.getElementById(tabId(projects[next]))?.focus({ preventScroll: true });
  };

  return (
    <ul
      ref={listRef}
      role="tablist"
      aria-label="Projects"
      onKeyDown={onKeyDown}
      className="relative -mx-5 mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 pt-6 [mask-image:linear-gradient(to_right,transparent,black_20px,black_calc(100%-20px),transparent)] [scrollbar-width:none] sm:-mx-8 sm:gap-5 sm:px-8 [&::-webkit-scrollbar]:hidden"
    >
      {projects.map((p, i) => {
        const active = i === index;
        const isGame = p.type === "game";
        return (
          <li key={p.id} role="presentation" className="flex-none snap-center">
            <motion.button
              type="button"
              role="tab"
              id={tabId(p)}
              aria-selected={active}
              aria-controls={PANEL_ID}
              aria-label={`${p.title} (${p.type})`}
              tabIndex={active ? 0 : -1}
              onClick={() => onSelect(i)}
              animate={{ scale: active && !reduce ? 1.06 : 1 }}
              transition={{ type: "spring", stiffness: 380, damping: 28 }}
              className="group block w-44 text-left sm:w-56"
            >
              <span
                className={cn(
                  "relative block aspect-[16/10] overflow-hidden rounded-xl border bg-void transition-[opacity,border-color,box-shadow] duration-300",
                  active
                    ? "box-glow-acid border-acid/60"
                    : "border-white/10 opacity-60 group-hover:border-white/25 group-hover:opacity-100",
                )}
              >
                <ProjectScene id={p.mark} />
                {isGame && <span className="fx-scan opacity-20" aria-hidden="true" />}
                <span className="absolute left-2 top-2">
                  <TypeChip isGame={isGame} />
                </span>
              </span>
              <span
                className={cn(
                  "mt-3 block truncate text-sm font-bold transition-colors",
                  active ? "text-acid" : "text-muted group-hover:text-ink",
                )}
              >
                {p.title}
              </span>
            </motion.button>
          </li>
        );
      })}
    </ul>
  );
}

/**
 * The selected level's briefing: a landing-page screenshot beside what it is
 * and how it works. Web projects swap in crisp, games springy.
 */
function Featured({ project }: { project: Project }) {
  const reduce = useReducedMotion();
  const isGame = project.type === "game";
  const addr = address(project);
  const enter = reduce
    ? { duration: 0 }
    : isGame
      ? { type: "spring" as const, stiffness: 300, damping: 26 }
      : { duration: 0.32, ease: [0.2, 0, 0, 1] as const };

  return (
    <div
      id={PANEL_ID}
      role="tabpanel"
      aria-labelledby={tabId(project)}
      className="mt-4 overflow-clip rounded-2xl border border-white/10 bg-surface"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={project.id}
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8, transition: { duration: 0.16 } }}
          transition={enter}
        >
          <div className="grid lg:grid-cols-[1.2fr_1fr]">
            {/* The screen stays dark in both themes, like the hero machine. */}
            <div
              data-theme="dark"
              className="border-b border-white/10 bg-void p-3 sm:p-4 lg:flex lg:flex-col lg:border-b-0 lg:border-r"
            >
              {/* Side by side, the briefing usually sets the row height; the
                  screen grows to match and the tall capture shows more page. */}
              <div className="overflow-hidden rounded-lg border border-white/10 bg-panel lg:flex lg:flex-1 lg:flex-col">
                <div className="flex items-center gap-3 border-b border-white/10 px-3 py-2">
                  <span className="flex flex-none gap-1.5" aria-hidden="true">
                    <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                    <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                    <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                  </span>
                  {addr && (
                    <span className="min-w-0 flex-1 truncate rounded bg-void/70 px-2.5 py-1 font-mono text-[11px] text-muted">
                      {addr}
                    </span>
                  )}
                </div>
                <div className="relative aspect-[16/10] overflow-hidden bg-void lg:aspect-auto lg:min-h-72 lg:flex-1">
                  {project.shot ? (
                    <motion.img
                      src={project.shot}
                      alt={`The ${project.title} landing page`}
                      width={1440}
                      height={1800}
                      decoding="async"
                      className="absolute inset-0 h-full w-full object-cover object-top"
                      initial={reduce ? false : { clipPath: "inset(0 0 100% 0)" }}
                      animate={{ clipPath: "inset(0 0 0% 0)" }}
                      transition={{ duration: 0.6, ease: [0.2, 0, 0, 1], delay: 0.08 }}
                    />
                  ) : (
                    <>
                      <ProjectScene id={project.mark} />
                      {isGame && <div className="fx-scan opacity-20" aria-hidden="true" />}
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="flex flex-col p-6 sm:p-8">
              <div className="flex items-center gap-3">
                <TypeChip isGame={isGame} />
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-faint">
                  now playing
                </span>
              </div>
              <h3 className="mt-4 text-2xl font-bold leading-tight sm:text-3xl">{project.title}</h3>
              <span className="font-mono text-sm text-muted">{project.short}</span>
              {project.highlight && (
                <p className="mt-4 border-l-2 border-acid/40 pl-3 font-mono text-[11px] text-acid">
                  {project.highlight}
                </p>
              )}
              <p className="mt-5 text-[15px] leading-relaxed text-muted">{project.details.what}</p>

              <div className="mt-auto flex flex-wrap items-center gap-3 pt-7">
                {project.links.demo ? (
                  <a
                    href={project.links.demo}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg bg-acid px-6 py-3 font-mono text-sm font-bold uppercase tracking-wider text-void transition-transform hover:-translate-y-0.5"
                  >
                    Launch demo <ArrowUpRight size={16} weight="bold" />
                  </a>
                ) : project.links.github ? (
                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg bg-acid px-6 py-3 font-mono text-sm font-bold uppercase tracking-wider text-void transition-transform hover:-translate-y-0.5"
                  >
                    <GithubLogo size={17} weight="bold" /> View source
                  </a>
                ) : (
                  <span className="inline-flex items-center gap-2 rounded-lg border border-amber/40 px-6 py-3 font-mono text-sm font-bold uppercase tracking-wider text-amber">
                    <Wrench size={16} weight="bold" /> In development
                  </span>
                )}
                {project.links.demo && project.links.github && (
                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg border border-white/15 px-5 py-3 font-mono text-sm text-muted transition-colors hover:border-acid/40 hover:text-acid"
                  >
                    <GithubLogo size={16} /> Source code
                  </a>
                )}
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 p-6 sm:p-8">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-acid">
              $ how it works
            </span>
            <ul className="mt-4 grid gap-x-8 gap-y-2.5 md:grid-cols-2">
              {project.details.how.map((point, i) => (
                <li key={i} className="flex gap-2.5 text-[14px] leading-snug text-muted">
                  <span className={cn("mt-px", isGame ? "text-amber" : "text-acid")}>▸</span>
                  {point}
                </li>
              ))}
            </ul>
            <TechList tech={project.tech} className="mt-6" />
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

const STEP_BTN =
  "grid h-9 w-9 place-items-center rounded-md border border-white/10 text-muted transition-colors hover:border-acid/40 hover:text-acid";

export function Projects() {
  const [index, setIndex] = useState(0);
  const n = projects.length;
  const step = (d: number) => setIndex((i) => (i + d + n) % n);

  return (
    <section id="projects" className="border-t border-white/5 px-5 py-16 sm:px-8 lg:py-24">
      <div className="mx-auto max-w-[1200px]">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            cmd="select level"
            title={
              <>
                Things I&apos;ve <span className="text-acid">shipped</span>.
              </>
            }
            sub="Production web platforms and games. Pick a level to load its briefing."
          />
          <Reveal>
            <div className="flex items-center gap-2">
              <span className="mr-2 font-mono text-xs tabular-nums text-faint" aria-hidden="true">
                <span className="text-acid">{pad(index + 1)}</span> / {pad(n)}
              </span>
              <button type="button" onClick={() => step(-1)} aria-label="Previous project" className={STEP_BTN}>
                <CaretLeft size={16} weight="bold" />
              </button>
              <button type="button" onClick={() => step(1)} aria-label="Next project" className={STEP_BTN}>
                <CaretRight size={16} weight="bold" />
              </button>
            </div>
          </Reveal>
        </div>

        <LevelSelect index={index} onSelect={setIndex} />
        <Featured project={projects[index]} />
      </div>
    </section>
  );
}
