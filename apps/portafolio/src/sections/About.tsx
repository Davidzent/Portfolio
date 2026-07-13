import { User } from "@phosphor-icons/react";
import { about } from "../data/content";
import { SectionHeading } from "../components/SectionHeading";
import { StatBar } from "../components/StatBar";
import { Reveal } from "../components/Reveal";

export function About() {
  return (
    <section id="about" className="relative border-t border-white/5 px-5 py-24 sm:px-8 lg:py-32">
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

        <div className="mt-12 grid gap-8 lg:mt-16 lg:grid-cols-[360px_1fr] lg:gap-14">
          {/* Player card */}
          <Reveal className="lg:sticky lg:top-24 lg:self-start">
            <div className="overflow-hidden rounded-2xl border border-white/12 bg-surface">
              <div className="relative aspect-[4/5] bg-panel">
                {about.photo ? (
                  <>
                    <img
                      src={about.photo}
                      alt={about.photoAlt}
                      loading="lazy"
                      decoding="async"
                      width={640}
                      height={800}
                      // className="h-full w-full object-cover opacity-90 grayscale contrast-[1.05]"
                      className="h-full w-full object-cover opacity-90"

                    />
                    <div className="absolute inset-0 bg-acid/20 mix-blend-color" aria-hidden="true" />
                  </>
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
                <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent" aria-hidden="true" />
                {/* corner ticks */}
                <span className="absolute left-3 top-3 h-4 w-4 border-l-2 border-t-2 border-acid/70" />
                <span className="absolute right-3 top-3 h-4 w-4 border-r-2 border-t-2 border-acid/70" />
                <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
                  <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-acid">
                    {about.class}
                  </span>
                </div>
              </div>
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
