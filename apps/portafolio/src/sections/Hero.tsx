import { lazy, Suspense, useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useMotionTemplate,
  useTransform,
  useReducedMotion,
} from "motion/react";
import { ArrowRight, GameController, ArrowsHorizontal } from "@phosphor-icons/react";
import { hero, site } from "../data/content";
import { useScramble } from "../lib/useScramble";
import { MagneticButton } from "../components/MagneticButton";
import { ErrorBoundary } from "../components/ErrorBoundary";
import { Scanlines } from "../components/fx";
import { CodeEditor } from "./CodeEditor";
import { cn } from "../lib/cn";
import { BrandLogo } from "../components/BrandLogo";
import { GridRipple } from "../components/GridRipple";

const EngineViewport = lazy(() => import("./EngineViewport"));

/** The role word in "… Developer." cycles, decoding through the scramble glyphs each time. */
function RoleWord({ play }: { play: boolean }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (!play) return;
    const id = window.setInterval(() => setI((n) => (n + 1) % hero.roles.length), 2600);
    return () => window.clearInterval(id);
  }, [play]);
  const text = useScramble(hero.roles[i], play, 0.35);
  return (
    <span aria-hidden="true" className={i % 2 ? "text-amber text-glow-amber" : "text-acid text-glow-acid"}>
      {text}
    </span>
  );
}

const GLYPHS = "#$%&*+-./:;<=>?@~!\\";
const COLS = 420; // ~2,800px of 11px mono, past ultrawide; the pre clips the rest
const ROWS = 9;

/** Heaps of glyphs along the bottom edge: column heights drift, characters flicker. */
function glyphField(heights: number[]): string {
  const pick = () => GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
  return Array.from({ length: ROWS }, (_, r) =>
    heights.map((h) => (r >= ROWS - h ? pick() : " ")).join(""),
  ).join("\n");
}

/**
 * Column heights at tick `t`: two sine swells, a long one and a short chop. Phase
 * grows with t, so every crest travels toward column 0 — right to left, like surf.
 */
function swell(t: number): number[] {
  return Array.from({ length: COLS }, (_, c) => {
    const y = 0.45 + 0.3 * Math.sin(c * 0.09 + t * 0.25) + 0.15 * Math.sin(c * 0.23 + t * 0.4);
    return Math.max(0, Math.min(ROWS, Math.round(ROWS * y)));
  });
}

function GlyphBand({ animate }: { animate: boolean }) {
  const [text, setText] = useState("");
  useEffect(() => {
    let t = 0;
    const tick = () => {
      t += 1;
      setText(glyphField(swell(t)));
    };
    tick();
    if (!animate) return;
    const id = window.setInterval(tick, 90);
    return () => window.clearInterval(id);
  }, [animate]);

  return (
    <pre
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 bottom-0 select-none overflow-hidden whitespace-pre bg-gradient-to-r from-acid/30 via-white/10 to-amber/30 bg-clip-text font-mono text-[11px] leading-[1.25] text-transparent [mask-image:linear-gradient(to_top,black,transparent)]"
    >
      {text}
    </pre>
  );
}

export function Hero() {
  const reduce = useReducedMotion();
  const [wide, setWide] = useState(false);
  const [inView, setInView] = useState(true);
  const machineRef = useRef<HTMLDivElement>(null);
  const split = useMotionValue(0.52);
  const dragging = useRef(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const on = () => setWide(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);

  // Stop the WebGL loop entirely while the machine is scrolled off-screen.
  useEffect(() => {
    const el = machineRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => setInView(entries.some((e) => e.isIntersecting)),
      { threshold: 0 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const rightInset = useTransform(split, (s) => `${(1 - s) * 100}%`);
  const clip = useMotionTemplate`inset(0 ${rightInset} 0 0)`;
  const handleLeft = useTransform(split, (s) => `${s * 100}%`);
  const acidGlow = useTransform(split, [0.2, 0.9], [0.1, 0.34]);
  const amberGlow = useTransform(split, [0.1, 0.8], [0.34, 0.1]);

  // A focusable separator is a widget, so aria-valuenow is required and has to
  // agree with these bounds — a splitter that reports a range it cannot reach
  // is worse than one that reports none.
  const SPLIT_MIN = 0.08;
  const SPLIT_MAX = 0.92;

  // React state only so the value can be rendered; the drag itself stays on the
  // motion value, and committing on release keeps pointer moves re-render free.
  const [splitPct, setSplitPct] = useState(() => Math.round(split.get() * 100));
  const commitSplit = () => setSplitPct(Math.round(split.get() * 100));

  const setFromX = (clientX: number) => {
    const r = machineRef.current?.getBoundingClientRect();
    if (!r) return;
    split.set(Math.min(SPLIT_MAX, Math.max(SPLIT_MIN, (clientX - r.left) / r.width)));
  };
  const onDown = (e: React.PointerEvent) => {
    dragging.current = true;
    (e.target as Element).setPointerCapture?.(e.pointerId);
    setFromX(e.clientX);
  };
  const onMove = (e: React.PointerEvent) => dragging.current && setFromX(e.clientX);
  const onUp = () => {
    dragging.current = false;
    commitSplit();
  };
  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") split.set(Math.max(SPLIT_MIN, split.get() - 0.05));
    if (e.key === "ArrowRight") split.set(Math.min(SPLIT_MAX, split.get() + 0.05));
    commitSplit();
  };

  const engine = (
    <div className="relative h-full w-full overflow-hidden bg-gradient-to-br from-[#1c1004] to-void">
      {!reduce && <Scanlines />}
      <Suspense fallback={<div className="h-full w-full bg-gradient-to-br from-amber/10 to-void" />}>
        <ErrorBoundary
          fallback={
            <div className="grid h-full place-items-center font-mono text-xs text-amber/40">
              engine://offline
            </div>
          }
        >
          <EngineViewport spin={!reduce && inView} />
        </ErrorBoundary>
      </Suspense>
      <span className="pointer-events-none absolute bottom-3 right-4 font-mono text-[10px] uppercase tracking-[0.2em] text-amber/60">
        engine://viewport
      </span>
    </div>
  );

  return (
    <section id="top" className="relative min-h-[100dvh] overflow-hidden">
      <div className="grid-lines pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />
      <GridRipple />
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <motion.div
          className="absolute -left-40 top-1/3 h-96 w-96 rounded-full bg-[var(--orb-acid)] blur-[130px]"
          style={{ opacity: reduce ? 0.16 : acidGlow }}
        />
        <motion.div
          className="absolute -right-32 top-1/4 h-96 w-96 rounded-full bg-[var(--orb-amber)] blur-[130px]"
          style={{ opacity: reduce ? 0.16 : amberGlow }}
        />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[100dvh] max-w-[1240px] flex-col items-center px-5 pb-40 pt-28 sm:px-8 lg:h-[100dvh] lg:min-h-[640px] lg:pb-10 lg:pt-[4.5rem]">
        {/* Copy */}
        <div className="flex max-w-4xl flex-col items-center text-center">
          {/* The h1 carries the full name: this page ranks for a person, not a slogan. */}
          <h1 className="flex flex-col items-center whitespace-nowrap text-[min(7.4vw,3.6rem)] font-bold leading-[1.04] tracking-tight lg:text-[clamp(3rem,8.5vh,5rem)] lg:leading-[1.02]">
            <span className="flex items-center gap-3 sm:gap-4">
              <BrandLogo height={52} className="h-[1em] w-auto" />
              Hi, I&apos;m {site.name}.
            </span>
            <span>
              <RoleWord play={!reduce && inView} /> Developer.
            </span>
            <span className="sr-only">{site.fullName}, {hero.roles.join(", ")} developer</span>
          </h1>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 lg:mt-6">
            <MagneticButton
              href={hero.primaryCta.href}
              className="gap-2 rounded-lg bg-acid px-6 py-3.5 font-mono text-sm font-semibold uppercase tracking-wider text-void"
            >
              {hero.primaryCta.label} <ArrowRight size={16} weight="bold" />
            </MagneticButton>
            <MagneticButton
              href={hero.secondaryCta.href}
              className="gap-2 rounded-lg border border-amber/40 px-6 py-3.5 font-mono text-sm font-semibold uppercase tracking-wider text-amber transition-colors hover:bg-amber hover:text-void"
            >
              <GameController size={17} weight="bold" /> {hero.secondaryCta.label}
            </MagneticButton>
          </div>
        </div>

        {/* Machine: the console under the headline. On desktop it takes the height left
            over, so the whole hero fits the first screen. */}
        <div className="mt-14 w-full max-w-[1100px] lg:mt-6 lg:min-h-0 lg:flex-1">
          <div
            ref={machineRef}
            data-theme="dark"
            className={cn(
              "relative overflow-hidden rounded-xl border border-white/15 bg-void shadow-2xl",
              wide ? "h-full" : "grid",
            )}
          >
            <div className={wide ? "absolute inset-0" : "relative h-[37vh] overflow-hidden border-b border-white/10"}>
              {engine}
            </div>
            {/* Stacked, the editor takes its full height and leaves a strip for boot://ide. */}
            <motion.div
              className={wide ? "absolute inset-0" : "relative overflow-hidden pb-8"}
              style={wide ? { clipPath: clip } : undefined}
            >
              <CodeEditor />
            </motion.div>

            {wide && (
              <motion.div
                className="absolute bottom-0 top-0 z-20 -ml-3 flex w-6 cursor-ew-resize touch-none items-center justify-center"
                style={{ left: handleLeft }}
                onPointerDown={onDown}
                onPointerMove={onMove}
                onPointerUp={onUp}
                role="separator"
                aria-orientation="vertical"
                aria-label="Drag to shift between IDE and game engine"
                aria-valuenow={splitPct}
                aria-valuemin={Math.round(SPLIT_MIN * 100)}
                aria-valuemax={Math.round(SPLIT_MAX * 100)}
                tabIndex={0}
                onKeyDown={onKey}
              >
                <div className="absolute bottom-0 top-0 left-1/2 w-px -translate-x-1/2 bg-acid/70" />
                <div className="relative grid h-9 w-9 place-items-center rounded-full border border-acid/60 bg-void text-acid shadow-[0_0_20px_-4px_rgba(125,252,90,0.6)]">
                  <ArrowsHorizontal size={16} weight="bold" />
                </div>
              </motion.div>
            )}

            {/* Bottom-left, mirroring engine://viewport: the editor's own tab bar
                owns the top of this panel, so a top-3 overlay lands on `dev.ts`. */}
            <div className="pointer-events-none absolute bottom-3 left-3 z-10 font-mono text-[10px] uppercase tracking-[0.2em] text-acid/70">
              boot://ide
            </div>
            {wide && (
              <div className="pointer-events-none absolute bottom-3 left-1/2 z-10 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                &larr; {hero.engineHint} &rarr;
              </div>
            )}
          </div>
        </div>
      </div>
      <GlyphBand animate={!reduce && inView} />
    </section>
  );
}
