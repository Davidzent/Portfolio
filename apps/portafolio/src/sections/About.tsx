import { about } from "../data/content";
import { SectionHeading } from "../components/SectionHeading";
import { StatBar } from "../components/StatBar";
import { Reveal } from "../components/Reveal";
import { PortraitCarousel } from "../components/PortraitCarousel";

export function About() {
  return (
    <section id="about" className="relative border-t border-white/5 px-5 py-16 sm:px-8 lg:py-24">
      <div className="mx-auto max-w-[1140px]">
        <SectionHeading
          cmd="cat ./player.card"
          title={
            <>
              One maker, <span className="text-acid">two boots</span>.
            </>
          }
          sub="Full-stack engineer by trade, game developer by obsession."
        />

        <div className="mt-10 grid gap-8 lg:mt-12 lg:grid-cols-[360px_1fr] lg:gap-12">
          {/* Player card */}
          <Reveal className="lg:sticky lg:top-24 lg:self-start">
            <div className="overflow-hidden rounded-2xl border border-white/12 bg-surface">
              <PortraitCarousel slides={about.gallery} classLabel={about.class} />
              <dl className="grid grid-cols-2 gap-px bg-white/5">
                {about.facts.map((f) => (
                  <div key={f.k} className="bg-surface p-3.5">
                    <dt className="font-mono text-[10px] uppercase tracking-[0.15em] text-faint">
                      {f.k}
                    </dt>
                    <dd className="mt-0.5 text-sm text-ink">{f.v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>

          {/* Bio + stats */}
          <div>
            <div className="space-y-5">
              {about.bio.map((p, i) => (
                <Reveal key={i} delay={i * 0.08}>
                  <p className="text-[15px] leading-relaxed text-muted sm:text-base">{p}</p>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.1} className="mt-10">
              <div className="mb-4 flex items-center justify-between">
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-acid">
                  ./stats
                </span>
                <span className="font-mono text-[11px] text-faint">// self-assessed</span>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {about.stats.map((s) => (
                  <StatBar key={s.label} label={s.label} value={s.value} />
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
