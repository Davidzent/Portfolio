import { useEffect, useRef, useState } from "react";
import { FlagCheckered, Cube } from "@phosphor-icons/react";
import { journey, type Checkpoint } from "../data/content";
import { SectionHeading } from "../components/SectionHeading";
import { gsap } from "../lib/gsap";
import { cn } from "../lib/cn";

function CheckpointCard({ cp }: { cp: Checkpoint }) {
  const quest = cp.type === "quest";
  return (
    <div className={cn("rounded-2xl border bg-surface p-6", quest ? "border-amber/30" : "border-white/10")}>
      <div className="flex items-center justify-between gap-3">
        <span className={cn("font-mono text-sm font-bold", quest ? "text-amber" : "text-acid")}>
          {cp.year}
        </span>
        <span
          className={cn(
            "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider",
            quest ? "border-amber/30 text-amber" : "border-acid/30 text-acid",
          )}
        >
          {quest ? <Cube size={11} weight="bold" /> : <FlagCheckered size={11} weight="bold" />}
          {quest ? "side quest" : "checkpoint"}
        </span>
      </div>
      <h3 className="mt-3 text-lg font-bold leading-tight">{cp.title}</h3>
      <span className="font-mono text-xs text-muted">{cp.org}</span>
      <ul className="mt-4 space-y-2">
        {cp.points.map((p, i) => (
          <li key={i} className="flex gap-2 text-[13px] leading-snug text-muted">
            <span className={quest ? "text-amber" : "text-acid"}>▸</span>
            {p}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Journey() {
  const wrap = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [wide, setWide] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const on = () => setWide(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!wide || reduce || !wrap.current || !track.current) return;
    const ctx = gsap.context(() => {
      const distance = () => track.current!.scrollWidth - wrap.current!.clientWidth;
      gsap.to(track.current, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: wrap.current,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
    }, wrap);
    return () => ctx.revert();
  }, [wide]);

  return (
    <section id="journey" className="relative border-t border-white/5 bg-void">
      <div className="mx-auto max-w-[1200px] px-5 pt-24 sm:px-8 lg:pt-32">
        <SectionHeading
          cmd="cat journey.log"
          accent="amber"
          title={
            <>
              The run <span className="text-amber">so far</span>.
            </>
          }
          sub="Work checkpoints and self-directed side quests, left to right."
        />
      </div>

      {wide ? (
        <div ref={wrap} className="relative mt-10 h-[100dvh] overflow-hidden">
          <div ref={track} className="absolute inset-y-0 left-0 flex h-full items-center gap-8 pl-[8vw] pr-[12vw]">
            <div className="pointer-events-none absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-acid/50 via-white/12 to-amber/50" />
            {journey.map((cp, i) => (
              <div
                key={i}
                className="relative w-[340px] flex-none"
                style={{ transform: `translateY(${i % 2 ? 34 : -34}px)` }}
              >
                <span
                  className={cn(
                    "absolute left-1/2 h-3 w-3 -translate-x-1/2 rounded-full border-2 border-void",
                    cp.type === "quest" ? "bg-amber" : "bg-acid",
                    i % 2 ? "-top-[46px]" : "-bottom-[46px]",
                  )}
                />
                <CheckpointCard cp={cp} />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="mx-auto mt-10 max-w-xl space-y-5 px-5 pb-24 sm:px-8">
          {journey.map((cp, i) => (
            <CheckpointCard key={i} cp={cp} />
          ))}
        </div>
      )}
    </section>
  );
}
