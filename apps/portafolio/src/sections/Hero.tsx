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
import { ZntsnsLogo } from "../components/ZntsnsLogo";
import { MagneticButton } from "../components/MagneticButton";
import { ErrorBoundary } from "../components/ErrorBoundary";
import { Scanlines } from "../components/fx";
import { CodeEditor } from "./CodeEditor";
import { cn } from "../lib/cn";
import { BrandLogo } from "../components/BrandLogo";

const EngineViewport = lazy(() => import("./EngineViewport"));

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

  const setFromX = (clientX: number) => {
    const r = machineRef.current?.getBoundingClientRect();
    if (!r) return;
    split.set(Math.min(0.92, Math.max(0.08, (clientX - r.left) / r.width)));
  };
  const onDown = (e: React.PointerEvent) => {
    dragging.current = true;
    (e.target as Element).setPointerCapture?.(e.pointerId);
    setFromX(e.clientX);
  };
  const onMove = (e: React.PointerEvent) => dragging.current && setFromX(e.clientX);
  const onUp = () => (dragging.current = false);
  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") split.set(Math.max(0.08, split.get() - 0.05));
    if (e.key === "ArrowRight") split.set(Math.min(0.92, split.get() + 0.05));
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

      <div className="relative mx-auto grid min-h-[100dvh] max-w-[1240px] items-center gap-8 px-5 pb-12 pt-24 sm:px-8 lg:grid-cols-[minmax(0,43%)_1fr] lg:gap-10 lg:pt-20">
        {/* Copy */}
        <div className="max-w-xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-surface/60 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-acid" /> dual-boot // one maker
          </div>
          <div className="mb-4 flex items-center gap-3">
            <BrandLogo height={40} />
            <ZntsnsLogo height={40} boot />
          </div>
          {/* The name is the h1, not the tagline below it: this page ranks for a
              person, and a heading naming someone else's slogan spends that signal. */}
          <div className="mb-4 flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <h1 className="text-xl font-semibold tracking-tight text-ink sm:text-2xl">
              {site.fullName}
            </h1>
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-acid">
              {site.experience}
            </span>
          </div>
          <p className="text-[2rem] font-bold tracking-tight sm:text-[2.5rem] lg:text-[2.5rem] lg:leading-[1.05] xl:text-[2.9rem] xl:leading-[1.03]">
            <span className="block">
              Full-stack <span className="text-acid text-glow-acid">systems</span>,
            </span>
            <span className="block">
              <span className="text-amber text-glow-amber">game-world</span> imagination.
            </span>
          </p>
          <p className="mt-6 max-w-md font-mono text-sm text-muted sm:text-[15px]">{hero.tagline}</p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
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

        {/* Machine */}
        <div className="w-full">
          <div
            ref={machineRef}
            data-theme="dark"
            className={cn(
              "relative overflow-hidden rounded-xl border border-white/15 bg-void shadow-2xl",
              wide ? "h-[62vh] max-h-[560px]" : "grid h-[74vh] grid-rows-2",
            )}
          >
            <div className={wide ? "absolute inset-0" : "relative overflow-hidden border-b border-white/10"}>
              {engine}
            </div>
            <motion.div
              className={wide ? "absolute inset-0" : "relative overflow-hidden"}
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
                tabIndex={0}
                onKeyDown={onKey}
              >
                <div className="absolute bottom-0 top-0 left-1/2 w-px -translate-x-1/2 bg-acid/70" />
                <div className="relative grid h-9 w-9 place-items-center rounded-full border border-acid/60 bg-void text-acid shadow-[0_0_20px_-4px_rgba(125,252,90,0.6)]">
                  <ArrowsHorizontal size={16} weight="bold" />
                </div>
              </motion.div>
            )}

            <div className="pointer-events-none absolute left-3 top-3 z-10 font-mono text-[10px] uppercase tracking-[0.2em] text-acid/70">
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
    </section>
  );
}
