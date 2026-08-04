import { lazy, Suspense } from "react";
import { useLenis } from "./lib/useLenis";
import { Grain } from "./components/fx";
import { BootScreen } from "./components/BootScreen";
import { SpriteBuddy } from "./components/SpriteBuddy";
import { Nav } from "./sections/Nav";
import { Hero } from "./sections/Hero";
import { About } from "./sections/About";
import { Skills } from "./sections/Skills";
import { Projects } from "./sections/Projects";
import { Contact } from "./sections/Contact";
import { Footer } from "./sections/Footer";

// The only section that pulls ScrollTrigger. Loading it lazily keeps GSAP out
// of the entry chunk entirely — it now shares a chunk with the Lenis runtime,
// fetched once, after the hero has painted.
const Journey = lazy(() =>
  import("./sections/Journey").then((m) => ({ default: m.Journey })),
);


export default function App() {
  useLenis();

  return (
    <>
      <BootScreen />
      <SpriteBuddy />
      <Grain />
      <a
        href="#top"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[130] focus:rounded-md focus:bg-acid focus:px-4 focus:py-2 focus:font-mono focus:text-sm focus:font-semibold focus:text-void"
      >
        Skip to content
      </a>
      {/* Sentinel for the nav's scrolled state (see Nav.tsx). */}
      <div
        id="scroll-sentinel"
        className="pointer-events-none absolute left-0 top-4 h-px w-px"
        aria-hidden="true"
      />
      <Nav />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        {/* Placeholder holds the anchor and roughly the section's height so the
            nav link works and nothing below it jumps when the chunk lands. */}
        <Suspense
          fallback={
            <section
              id="journey"
              className="min-h-screen border-t border-white/5 bg-void"
              aria-hidden="true"
            />
          }
        >
          <Journey />
        </Suspense>
        <Contact />
      </main>
      <Footer />
    </>
  );
}
