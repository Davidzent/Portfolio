import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { GithubLogo, ArrowUpRight, GameController, Code } from "@phosphor-icons/react";
import { projects, type Project, type ProjectType } from "../data/content";
import { SectionHeading } from "../components/SectionHeading";
import { Reveal } from "../components/Reveal";
import { TiltCard } from "../components/TiltCard";
import { ProjectScene } from "../components/ProjectScene";
import { cn } from "../lib/cn";

type Filter = "all" | ProjectType;
const FILTERS: { v: Filter; label: string }[] = [
  { v: "all", label: "All" },
  { v: "web", label: "Web" },
  { v: "game", label: "Games" },
];

function Card({ project }: { project: Project }) {
  const [hover, setHover] = useState(false);
  const isGame = project.type === "game";
  return (
    <TiltCard className="h-full">
      <article
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className="group h-full overflow-hidden rounded-2xl border border-white/10 bg-surface transition-colors hover:border-acid/40"
        style={{ transformStyle: "preserve-3d" }}
      >
        <div className="relative aspect-[16/10] overflow-hidden bg-void">
          <ProjectScene id={project.mark} />
          {isGame && <div className="fx-scan opacity-20" aria-hidden="true" />}
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-surface/85 via-transparent to-transparent"
            aria-hidden="true"
          />

          <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-void/70 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider backdrop-blur">
            {isGame ? (
              <GameController size={12} weight="bold" className="text-amber" />
            ) : (
              <Code size={12} weight="bold" className="text-acid" />
            )}
            <span className={isGame ? "text-amber" : "text-acid"}>{isGame ? "game" : "web"}</span>
          </span>

          <div
            className={cn(
              "absolute inset-x-0 bottom-0 p-4 font-mono text-xs text-ink transition-all duration-300",
              hover ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0",
            )}
          >
            <span className="text-faint">&gt; </span>
            {project.preview}
          </div>
        </div>

        <div className="p-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="text-lg font-bold leading-tight">{project.title}</h3>
              <span className="font-mono text-xs text-muted">{project.short}</span>
            </div>
            <div className="flex flex-none gap-1.5">
              {project.links.github && (
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${project.title} source on GitHub`}
                  className="grid h-8 w-8 place-items-center rounded-md border border-white/10 text-muted transition-colors hover:border-acid/40 hover:text-acid"
                >
                  <GithubLogo size={16} />
                </a>
              )}
              {project.links.demo && (
                <a
                  href={project.links.demo}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${project.title} live demo`}
                  className="grid h-8 w-8 place-items-center rounded-md border border-white/10 text-muted transition-colors hover:border-acid/40 hover:text-acid"
                >
                  <ArrowUpRight size={16} weight="bold" />
                </a>
              )}
            </div>
          </div>
          {project.highlight && (
            <p className="mt-3 border-l-2 border-acid/40 pl-3 font-mono text-[11px] text-acid">
              {project.highlight}
            </p>
          )}
          <ul className="mt-4 flex flex-wrap gap-1.5">
            {project.tech.map((t) => (
              <li
                key={t}
                className="rounded border border-white/10 bg-panel px-2 py-0.5 font-mono text-[11px] text-muted"
              >
                {t}
              </li>
            ))}
          </ul>
        </div>
      </article>
    </TiltCard>
  );
}

export function Projects() {
  const [filter, setFilter] = useState<Filter>("all");
  const visible = filter === "all" ? projects : projects.filter((p) => p.type === filter);

  return (
    <section id="projects" className="border-t border-white/5 px-5 py-24 sm:px-8 lg:py-32">
      <div className="mx-auto max-w-[1200px]">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            cmd="select level"
            title={
              <>
                Things I&apos;ve <span className="text-acid">shipped</span>.
              </>
            }
            sub="Production web platforms and games. Swap the loadout to filter."
          />
          <Reveal>
            <div className="inline-flex rounded-lg border border-white/10 bg-surface p-1 font-mono text-xs">
              {FILTERS.map((f) => (
                <button
                  key={f.v}
                  type="button"
                  onClick={() => setFilter(f.v)}
                  aria-pressed={filter === f.v}
                  className={cn(
                    "relative rounded-md px-4 py-2 uppercase tracking-wider transition-colors",
                    filter === f.v ? "text-void" : "text-muted hover:text-ink",
                  )}
                >
                  {filter === f.v && (
                    <motion.span
                      layoutId="loadout"
                      className="absolute inset-0 rounded-md bg-acid"
                      transition={{ type: "spring", stiffness: 400, damping: 32 }}
                    />
                  )}
                  <span className="relative z-10">{f.label}</span>
                </button>
              ))}
            </div>
          </Reveal>
        </div>

        <motion.div layout className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visible.map((p) => (
              <motion.div
                key={p.id}
                layout
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.3, ease: [0.2, 0, 0, 1] }}
              >
                <Card project={p} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
