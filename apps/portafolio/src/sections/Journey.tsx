import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  ArrowUpRight,
  CastleTurret,
  Code,
  Cube,
  FlagCheckered,
  GameController,
  GithubLogo,
} from "@phosphor-icons/react";
import { journey, projects, type Checkpoint } from "../data/content";
import { SectionHeading } from "../components/SectionHeading";
import { cn } from "../lib/cn";
import walkUrl from "../assets/knight_walk.png";
import idleUrl from "../assets/knight_idle.png";

type Pt = [number, number];

const COLS = 21;
const ROWS = 7;
const CELL = 52;
const NODE = 34;
const START: Pt = [0, 3];
const KNIGHT = 48; // 32px sprite frames at 1.5x
const STEP_S = 0.13; // seconds per cell walked
const PANEL_ID = "journey-briefing";

const tabId = (cp: Checkpoint) => `stage-${cp.id}`;
const center = ([c, r]: Pt): Pt => [c * CELL + CELL / 2, r * CELL + CELL / 2];
const steps = (p: Pt, q: Pt) => Math.abs(p[0] - q[0]) + Math.abs(p[1] - q[1]);
const byId = new Map(journey.map((cp) => [cp.id, cp]));
const parentOf = (cp: Checkpoint) => (cp.from ? byId.get(cp.from) : undefined);
const projectOf = (cp: Checkpoint) => projects.find((p) => p.id === cp.project);

/** Paths turn at most once: branches going up leave vertically, the rest follow the road first. */
const corner = (from: Pt, to: Pt): Pt => (to[1] < from[1] ? [from[0], to[1]] : [to[0], from[1]]);

/** The cells the knight walks from a to b: back up the paths to where they meet, then out. */
function route(a: Checkpoint, b: Checkpoint): Pt[] {
  const up: Checkpoint[] = [];
  for (let cp: Checkpoint | undefined = a; cp; cp = parentOf(cp)) up.push(cp);
  const down: Checkpoint[] = [];
  let meet: Checkpoint | undefined = b;
  while (meet && !up.includes(meet)) {
    down.push(meet);
    meet = parentOf(meet);
  }
  const pts: Pt[] = [];
  for (const cp of up.slice(0, up.indexOf(meet!))) pts.push(cp.at, corner(parentOf(cp)!.at, cp.at));
  pts.push(meet!.at);
  for (const cp of down.reverse()) pts.push(corner(parentOf(cp)!.at, cp.at), cp.at);
  // A straight path's corner repeats an end, and repeated keyframe offsets stall the walk.
  return pts.filter((p, i) => i === 0 || steps(pts[i - 1], p) > 0);
}

/** Each year's stretch of map, shaded behind its nodes. */
const worlds = [...new Set(journey.map((cp) => cp.year))].map((year) => {
  const cols = journey.filter((cp) => cp.year === year).map((cp) => cp.at[0]);
  return { year, from: Math.min(...cols) - 1, to: Math.min(COLS - 1, Math.max(...cols) + 1) };
});

function NodeIcon({ cp, n }: { cp: Checkpoint; n: number }) {
  if (cp.type === "castle") return <CastleTurret size={20} weight="fill" />;
  if (cp.type === "work") return <span className="font-mono text-sm font-bold">{n}</span>;
  return projectOf(cp)?.type === "game" ? (
    <GameController size={17} weight="bold" />
  ) : (
    <Code size={17} weight="bold" />
  );
}

function Knight({ path, walking, onWalk }: { path: Pt[]; walking: boolean; onWalk: (w: boolean) => void }) {
  const reduce = useReducedMotion();
  const px = path.map(center);
  const legs = path.map((p, i) => (i ? steps(path[i - 1], p) : 0));
  const total = legs.reduce((a, b) => a + b, 0);
  let walked = 0;
  const times = legs.map((l) => (walked += l) / (total || 1));
  const face = path[path.length - 1][0] < path[0][0] ? -1 : 1;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none absolute left-0 top-0 z-20"
      style={{ width: KNIGHT, height: KNIGHT }}
      initial={false}
      animate={{ x: px.map(([x]) => x - KNIGHT / 2), y: px.map(([, y]) => y - KNIGHT + 12) }}
      transition={reduce ? { duration: 0 } : { duration: total * STEP_S, times, ease: "linear" }}
      onAnimationStart={() => onWalk(total > 0 && !reduce)}
      onAnimationComplete={() => onWalk(false)}
    >
      <div
        key={walking ? "walk" : "idle"}
        className="buddy-sprite h-full w-full"
        style={{
          transform: `scaleX(${face})`,
          backgroundImage: `url(${walking ? walkUrl : idleUrl})`,
          backgroundSize: `${KNIGHT * 4}px ${KNIGHT}px`,
          ["--sheet-shift" as string]: `${-KNIGHT * 4}px`,
          animation: reduce ? "none" : `sprite-run ${walking ? 0.7 : 1}s steps(4) infinite`,
        }}
      />
    </motion.div>
  );
}

function Briefing({ cp }: { cp: Checkpoint }) {
  const work = cp.type === "work";
  const project = projectOf(cp);
  const Icon = cp.type === "castle" ? CastleTurret : work ? FlagCheckered : Cube;
  return (
    <div
      id={PANEL_ID}
      role="tabpanel"
      aria-labelledby={tabId(cp)}
      className={cn("mt-4 rounded-2xl border bg-surface p-6 sm:p-8", work ? "border-white/10" : "border-amber/30")}
    >
      <div className="flex items-center gap-3">
        <span className={cn("font-mono text-sm font-bold", work ? "text-acid" : "text-amber")}>{cp.year}</span>
        <span
          className={cn(
            "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider",
            work ? "border-acid/30 text-acid" : "border-amber/30 text-amber",
          )}
        >
          <Icon size={11} weight="bold" />
          {{ work: "checkpoint", quest: "side quest", castle: "in progress" }[cp.type]}
        </span>
      </div>
      <h3 className="mt-3 text-xl font-bold leading-tight sm:text-2xl">{cp.title}</h3>
      <span className="font-mono text-xs text-muted">{cp.org}</span>
      <ul className="mt-4 grid gap-x-8 gap-y-2 md:grid-cols-2">
        {cp.points.map((p, i) => (
          <li key={i} className="flex gap-2 text-[14px] leading-snug text-muted">
            <span className={work ? "text-acid" : "text-amber"}>▸</span>
            {p}
          </li>
        ))}
      </ul>
      {(project?.links.demo || project?.links.github) && (
        <div className="mt-6 flex flex-wrap gap-3">
          {project.links.demo && (
            <a
              href={project.links.demo}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-acid px-5 py-2.5 font-mono text-xs font-bold uppercase tracking-wider text-void transition-transform hover:-translate-y-0.5"
            >
              Launch demo <ArrowUpRight size={14} weight="bold" />
            </a>
          )}
          {project.links.github && (
            <a
              href={project.links.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-white/15 px-5 py-2.5 font-mono text-xs text-muted transition-colors hover:border-acid/40 hover:text-acid"
            >
              <GithubLogo size={14} /> Source code
            </a>
          )}
        </div>
      )}
    </div>
  );
}

/**
 * The run so far as an overworld map: work runs along the main road, and each
 * year's side projects branch off it. Pick a stage and the knight walks there.
 * It's an ARIA tablist, so the arrow keys step through the stages in order.
 */
export function Journey() {
  const reduce = useReducedMotion();
  const frame = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [path, setPath] = useState<Pt[]>([journey[0].at]);
  const [walking, setWalking] = useState(false);
  const selected = journey[index];

  const select = (i: number) => {
    if (i === index) return;
    setPath(route(selected, journey[i]));
    setIndex(i);
  };

  // On a narrow screen the map scrolls sideways; keep the selected stage in view.
  useEffect(() => {
    const f = frame.current;
    if (!f) return;
    f.scrollTo({ left: center(selected.at)[0] - f.clientWidth / 2, behavior: reduce ? "auto" : "smooth" });
  }, [selected, reduce]);

  const onKeyDown = (e: KeyboardEvent) => {
    const n = journey.length;
    const next = {
      ArrowRight: (index + 1) % n,
      ArrowDown: (index + 1) % n,
      ArrowLeft: (index - 1 + n) % n,
      ArrowUp: (index - 1 + n) % n,
      Home: 0,
      End: n - 1,
    }[e.key];
    if (next === undefined) return;
    e.preventDefault();
    select(next);
    document.getElementById(tabId(journey[next]))?.focus({ preventScroll: true });
  };

  let stage = 0;

  return (
    <section id="journey" className="border-t border-white/5 bg-void px-5 py-16 sm:px-8 lg:py-24">
      <div className="mx-auto max-w-[1200px]">
        <SectionHeading
          cmd="cat journey.log"
          accent="amber"
          title={
            <>
              The run <span className="text-amber">so far</span>.
            </>
          }
          sub="Work on the main road, side projects branching off each year. Pick a stage to walk there."
        />

        {/* A game screen, so it stays dark in both themes like the hero machine. */}
        <div
          ref={frame}
          data-theme="dark"
          className="mt-10 overflow-x-auto rounded-2xl border border-white/10 bg-surface [scrollbar-width:thin]"
        >
          <div
            role="tablist"
            aria-label="Journey map"
            onKeyDown={onKeyDown}
            className="grid-lines relative mx-auto"
            style={{ width: COLS * CELL, height: ROWS * CELL, backgroundSize: `${CELL}px ${CELL}px` }}
          >
            {worlds.map((w, i) => (
              <div
                key={w.year}
                aria-hidden="true"
                className={cn("absolute inset-y-0 border-x border-dashed border-white/5", i % 2 ? "bg-white/[0.02]" : "bg-acid/[0.025]")}
                style={{ left: w.from * CELL, width: (w.to - w.from + 1) * CELL }}
              >
                <span className="absolute left-2 top-2 font-mono text-[10px] uppercase tracking-[0.25em] text-faint">
                  {w.year === "Now" ? "now" : `world ${w.year}`}
                </span>
              </div>
            ))}

            <svg aria-hidden="true" className="absolute inset-0" width={COLS * CELL} height={ROWS * CELL}>
              {journey.map((cp) => {
                const from = parentOf(cp)?.at ?? START;
                const pts = [from, corner(from, cp.at), cp.at].map(center);
                return (
                  <polyline
                    key={cp.id}
                    points={pts.map((p) => p.join(",")).join(" ")}
                    fill="none"
                    strokeWidth={5}
                    strokeLinecap="round"
                    strokeDasharray="0 11"
                    className={cp.type === "quest" ? "stroke-amber/60" : "stroke-acid/60"}
                  />
                );
              })}
            </svg>

            <span
              aria-hidden="true"
              className="absolute grid place-items-center rounded-md border-2 border-acid/50 bg-void font-mono text-[9px] font-bold tracking-wider text-acid"
              style={{ left: center(START)[0] - 22, top: center(START)[1] - 13, width: 44, height: 26 }}
            >
              START
            </span>

            {journey.map((cp, i) => {
              const active = i === index;
              const work = cp.type === "work";
              if (work) stage++;
              const [x, y] = center(cp.at);
              return (
                <button
                  key={cp.id}
                  type="button"
                  role="tab"
                  id={tabId(cp)}
                  aria-selected={active}
                  aria-controls={PANEL_ID}
                  aria-label={`${cp.year}: ${cp.title}, ${cp.org}`}
                  tabIndex={active ? 0 : -1}
                  onClick={() => select(i)}
                  className={cn(
                    "group absolute z-10 grid place-items-center rounded-md border-2 bg-void transition-[border-color,box-shadow,color] duration-300",
                    work ? "text-acid" : "text-amber",
                    active
                      ? work
                        ? "box-glow-acid border-acid"
                        : "border-amber shadow-[0_0_30px_-6px_rgba(255,158,44,0.55)]"
                      : work
                        ? "border-acid/40 hover:border-acid"
                        : "border-amber/40 hover:border-amber",
                  )}
                  style={{ left: x - NODE / 2, top: y - NODE / 2, width: NODE, height: NODE }}
                >
                  <NodeIcon cp={cp} n={stage} />
                  <span
                    className={cn(
                      "absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap rounded bg-void/85 px-1.5 py-0.5 font-mono text-[10px] transition-colors",
                      active ? (work ? "text-acid" : "text-amber") : "text-muted group-hover:text-ink",
                    )}
                  >
                    {cp.label}
                  </span>
                </button>
              );
            })}

            <Knight path={path} walking={walking} onWalk={setWalking} />
          </div>
        </div>

        <Briefing cp={selected} />
      </div>
    </section>
  );
}
