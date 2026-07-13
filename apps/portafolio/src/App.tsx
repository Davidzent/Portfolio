import { useLenis } from "./lib/useLenis";
import { Grain } from "./components/fx";
import { BootScreen } from "./components/BootScreen";
import { Nav } from "./sections/Nav";
import { Hero } from "./sections/Hero";
import { About } from "./sections/About";
import { Skills } from "./sections/Skills";
import { Projects } from "./sections/Projects";
import { Journey } from "./sections/Journey";
import { Contact } from "./sections/Contact";
import { Footer } from "./sections/Footer";

export default function App() {
  useLenis();

  return (
    <>
      <BootScreen />
      <Grain />
      <a
        href="#top"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[130] focus:rounded-md focus:bg-acid focus:px-4 focus:py-2 focus:font-mono focus:text-sm focus:font-semibold focus:text-void"
      >
        Skip to content
      </a>
      <Nav />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Journey />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
