import { useState } from "react";
import { GithubLogo, LinkedinLogo, EnvelopeSimple, DownloadSimple, Copy, Check, Play } from "@phosphor-icons/react";
import { contact, site } from "../data/content";
import { Reveal } from "../components/Reveal";
import { MagneticButton } from "../components/MagneticButton";

const INVENTORY = [
  { icon: GithubLogo, label: "github", href: site.socials.github, ext: true },
  { icon: LinkedinLogo, label: "linkedin", href: site.socials.linkedin, ext: true },
  { icon: EnvelopeSimple, label: "email", href: `mailto:${site.email}`, ext: false },
  { icon: DownloadSimple, label: "resume", href: site.resumeUrl, ext: true },
];

export function Contact() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard blocked; the Press start button still works */
    }
  };

  return (
    <section id="contact" className="relative border-t border-white/5 px-5 py-16 sm:px-8 lg:py-24">
      <div className="mx-auto max-w-[860px]">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-acid/20 bg-surface p-8 text-center sm:p-12">
            <div className="grid-lines pointer-events-none absolute inset-0 opacity-40" aria-hidden="true" />
            <span className="pointer-events-none absolute left-4 top-4 h-6 w-6 border-l-2 border-t-2 border-acid/60" />
            <span className="pointer-events-none absolute right-4 top-4 h-6 w-6 border-r-2 border-t-2 border-acid/60" />
            <span className="pointer-events-none absolute bottom-4 left-4 h-6 w-6 border-b-2 border-l-2 border-acid/60" />
            <span className="pointer-events-none absolute bottom-4 right-4 h-6 w-6 border-b-2 border-r-2 border-acid/60" />

            <div className="relative">
              <span className="inline-flex items-center gap-2 rounded-full border border-amber/30 bg-amber/10 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.2em] text-amber">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-amber" />
                {contact.kicker}
              </span>
              <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-5xl">{contact.heading}</h2>
              <p className="mx-auto mt-4 max-w-md font-mono text-sm text-muted">{contact.blurb}</p>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <MagneticButton
                  href={`mailto:${site.email}`}
                  className="gap-2 rounded-lg bg-acid px-7 py-4 font-mono text-sm font-bold uppercase tracking-wider text-void"
                >
                  <Play size={16} weight="fill" /> Press start
                </MagneticButton>
                <button
                  type="button"
                  onClick={copy}
                  className="inline-flex items-center gap-2 rounded-lg border border-white/15 px-6 py-4 font-mono text-sm text-muted transition-colors hover:border-acid/40 hover:text-acid"
                >
                  {copied ? <Check size={15} className="text-acid" /> : <Copy size={15} />}
                  {copied ? "copied to clipboard" : site.email}
                </button>
              </div>

              <div className="mt-10">
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-faint">inventory</span>
                <div className="mt-3 flex justify-center gap-3">
                  {INVENTORY.map((it) => {
                    const Icon = it.icon;
                    return (
                      <a
                        key={it.label}
                        href={it.href}
                        target={it.ext ? "_blank" : undefined}
                        rel={it.ext ? "noreferrer" : undefined}
                        aria-label={it.label}
                        className="grid h-14 w-14 place-items-center rounded-xl border border-white/12 bg-void text-muted transition-all hover:-translate-y-1 hover:border-acid/50 hover:text-acid"
                      >
                        <Icon size={22} />
                      </a>
                    );
                  })}
                </div>
              </div>

              <p className="mt-8 font-mono text-xs text-faint">{contact.note}</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
