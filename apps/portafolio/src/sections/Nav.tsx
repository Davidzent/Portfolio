import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { List, X, DownloadSimple, Sun, MoonStars } from "@phosphor-icons/react";
import { nav, site } from "../data/content";
import { ZntsnsLogo } from "../components/ZntsnsLogo";
import { BrandLogo } from "../components/BrandLogo";
import { MagneticButton } from "../components/MagneticButton";
import { useTheme } from "../lib/useTheme";
import { cn } from "../lib/cn";

export function Nav() {
  const reduce = useReducedMotion();
  const { theme, toggle } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [open, setOpen] = useState(false);

  // Nav background flag via a top-of-page sentinel (no scroll listener):
  // when the sentinel leaves the viewport the page has scrolled.
  useEffect(() => {
    const sentinel = document.getElementById("scroll-sentinel");
    if (!sentinel) return;
    const io = new IntersectionObserver(
      (entries) => setScrolled(!entries.some((e) => e.isIntersecting)),
      { threshold: 0 },
    );
    io.observe(sentinel);
    return () => io.disconnect();
  }, []);

  // Active section via IntersectionObserver (no scroll math).
  useEffect(() => {
    const ids = nav.map((n) => n.id);
    const els = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(e.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        scrolled || open
          ? "border-b border-white/10 bg-void/80 backdrop-blur-xl"
          : "border-b border-transparent",
      )}
    >
      <div className="mx-auto flex h-16 max-w-[1240px] items-center justify-between px-5 sm:px-8">
        <a
          href="#top"
          aria-label="zntsns home"
          onClick={() => setOpen(false)}
          className="flex items-center gap-3"
        >
          <BrandLogo height={30} />
          <ZntsnsLogo height={30} interactive />
        </a>

        <div className="flex items-center gap-2">
          <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
            {nav.map((n) => (
              <a
                key={n.id}
                href={`#${n.id}`}
                aria-current={active === n.id ? "true" : undefined}
                className={cn(
                  "relative px-3.5 py-2 font-mono text-[13px] uppercase tracking-wider transition-colors",
                  active === n.id ? "text-acid" : "text-muted hover:text-ink",
                )}
              >
                {active === n.id && (
                  <span className="mr-1 text-acid" aria-hidden="true">
                    &gt;
                  </span>
                )}
                {n.label}
              </a>
            ))}
            <MagneticButton
              href={site.resumeUrl}
              target="_blank"
              rel="noreferrer"
              className="mx-2 gap-2 rounded-md border border-acid/40 px-4 py-2 font-mono text-[13px] uppercase tracking-wider text-acid transition-colors hover:bg-acid hover:text-void"
            >
              <DownloadSimple size={15} weight="bold" />
              Resume
            </MagneticButton>
          </nav>

          <button
            type="button"
            onClick={toggle}
            aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
            title={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
            className="grid h-10 w-10 place-items-center rounded-md border border-white/10 text-muted transition-colors hover:border-acid/40 hover:text-acid"
          >
            {theme === "dark" ? <Sun size={18} /> : <MoonStars size={18} />}
          </button>

          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-md border border-white/10 text-ink md:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X size={20} /> : <List size={20} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            className="border-t border-white/10 bg-void/95 px-5 pb-6 pt-2 backdrop-blur-xl md:hidden"
            initial={reduce ? false : { opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.2, 0, 0, 1] }}
            aria-label="Primary mobile"
          >
            {nav.map((n) => (
              <a
                key={n.id}
                href={`#${n.id}`}
                onClick={() => setOpen(false)}
                className={cn(
                  "block border-b border-white/5 py-3 font-mono text-sm uppercase tracking-wider",
                  active === n.id ? "text-acid" : "text-muted",
                )}
              >
                {n.label}
              </a>
            ))}
            <a
              href={site.resumeUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-4 flex items-center justify-center gap-2 rounded-md border border-acid/40 py-3 font-mono text-sm uppercase tracking-wider text-acid"
            >
              <DownloadSimple size={16} weight="bold" /> Resume
            </a>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
