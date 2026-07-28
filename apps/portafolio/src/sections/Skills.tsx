import { motion, useReducedMotion } from "motion/react";
import { Code, GameController } from "@phosphor-icons/react";
import { skillTree, type SkillBranch, type SkillState } from "../data/content";
import { SectionHeading } from "../components/SectionHeading";
import { Reveal } from "../components/Reveal";
import { cn } from "../lib/cn";

const BRANCH_ICON = { fullstack: Code, gamedev: GameController } as const;

function dotClass(state: SkillState) {
  if (state === "core") return "bg-acid shadow-[var(--glow-acid-sm)]";
  if (state === "strong") return "border-2 border-acid bg-void";
  return "border-2 border-dashed border-amber/60 bg-void";
}
function nodeClass(state: SkillState) {
  if (state === "learning") return "border-dashed border-amber/30 text-muted";
  return "border-white/10 bg-panel text-ink";
}

function Branch({ branch }: { branch: SkillBranch }) {
  const reduce = useReducedMotion();
  const Icon = BRANCH_ICON[branch.id];
  return (
    <Reveal className="h-full">
      <div className="h-full rounded-2xl border border-white/10 bg-void p-6 sm:p-8">
        <div className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-xl border border-acid/30 bg-acid/10 text-acid">
            <Icon size={22} weight="bold" />
          </span>
          <div>
            <h3 className="text-xl font-bold">{branch.title}</h3>
            <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-faint">
              {branch.subtitle}
            </span>
          </div>
        </div>

        <ol className="relative mt-8 space-y-3 pl-8">
          <motion.span
            className="absolute bottom-2 left-[13px] top-2 w-px origin-top bg-white/10"
            initial={reduce ? false : { scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.2, 0, 0, 1] }}
            aria-hidden="true"
          />
          {branch.nodes.map((node, i) => (
            <motion.li
              key={node.id}
              className="relative"
              initial={reduce ? false : { opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.4, delay: i * 0.05, ease: [0.2, 0, 0, 1] }}
            >
              <span
                className={cn(
                  "absolute -left-[27px] top-1/2 h-3 w-3 -translate-y-1/2 rounded-full",
                  dotClass(node.state),
                )}
              />
              <div
                className={cn(
                  "flex items-center justify-between rounded-lg border px-4 py-2.5",
                  nodeClass(node.state),
                )}
              >
                <span className="font-mono text-[13px]">{node.label}</span>
                {node.state === "learning" ? (
                  <span className="font-mono text-[10px] uppercase tracking-wider text-amber">
                    learning
                  </span>
                ) : node.state === "core" ? (
                  <span className="font-mono text-[10px] uppercase tracking-wider text-acid">
                    core
                  </span>
                ) : (
                  <span className="font-mono text-[11px] text-faint">✓</span>
                )}
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </Reveal>
  );
}

export function Skills() {
  return (
    <section id="skills" className="relative border-t border-white/5 bg-surface px-5 py-16 sm:px-8 lg:py-24">
      <div className="mx-auto max-w-[1140px]">
        <SectionHeading
          cmd="load skills.tree"
          accent="amber"
          title={
            <>
              Two branches, <span className="text-amber">one build</span>.
            </>
          }
          sub="Solid nodes are shipped in production. Dashed nodes are what I'm leveling next."
        />
        <div className="mt-10 grid gap-6 lg:mt-12 lg:grid-cols-2">
          {skillTree.map((b) => (
            <Branch key={b.id} branch={b} />
          ))}
        </div>
      </div>
    </section>
  );
}
