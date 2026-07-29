import { useEffect, useRef, useState } from "react";
import { ArrowUp } from "@phosphor-icons/react";
import { projects, site, terminal } from "../data/content";

type Line = { kind: "in" | "out" | "sys"; text: string };

const PROMPT = "visitor@zntsns:~$";

function run(raw: string): { lines: Line[]; clear?: boolean; open?: string; respawn?: boolean } {
  const cmd = raw.trim().toLowerCase();
  if (!cmd) return { lines: [] };
  if (cmd === "clear") return { lines: [], clear: true };
  if (cmd === "help")
    return {
      lines: [
        { kind: "out", text: "commands: whoami · skills · projects · social · resume · github · knight · clear" },
      ],
    };
  if (cmd === "knight")
    return {
      lines: [
        { kind: "out", text: "reviving guardian... hp restored." },
        { kind: "out", text: "the knight respawns at the bottom of the page. ⚔" },
      ],
      respawn: true,
    };
  if (cmd === "whoami" || cmd === "whoami --full")
    return { lines: terminal.output.map((t) => ({ kind: "out", text: t })) };
  if (cmd === "skills")
    return {
      lines: [
        { kind: "out", text: "full-stack: react · typescript · node · java/spring · postgres · docker/gcp" },
        { kind: "out", text: "gamedev:    unity · c# · blender · gameplay systems · game ai" },
      ],
    };
  if (cmd === "projects")
    return {
      lines: [
        { kind: "out", text: `${projects.length} shipped. scroll up to the level select, or run \`github\`.` },
      ],
    };
  if (cmd === "social")
    return {
      lines: [
        { kind: "out", text: "github:   github.com/Davidzent" },
        { kind: "out", text: "linkedin: linkedin.com/in/davidguijosa" },
      ],
    };
  if (cmd === "github") return { lines: [{ kind: "out", text: "opening github..." }], open: site.socials.github };
  if (cmd === "resume") return { lines: [{ kind: "out", text: "opening resume.pdf..." }], open: site.resumeUrl };
  if (cmd.startsWith("sudo")) return { lines: [{ kind: "out", text: "no root here. you already have full access." }] };
  if (cmd === "ls")
    return { lines: [{ kind: "out", text: "about  skills  projects  journey  contact  resume.pdf" }] };
  return { lines: [{ kind: "sys", text: `command not found: ${cmd}. try \`help\`.` }] };
}

export function Footer() {
  const [history, setHistory] = useState<Line[]>([]);
  const [value, setValue] = useState("");
  const [booted, setBooted] = useState(false);
  const bodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const rootRef = useRef<HTMLElement>(null);

  // Auto-run the easter-egg command once when the terminal scrolls into view.
  useEffect(() => {
    const el = rootRef.current;
    if (!el || booted) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting) || booted) return;
        setBooted(true);
        io.disconnect();
        const cmd = terminal.command;
        const out = run(cmd).lines;
        if (reduce) {
          setHistory([{ kind: "in", text: cmd }, ...out]);
          return;
        }
        let i = 0;
        const type = () => {
          i += 1;
          setHistory([{ kind: "in", text: cmd.slice(0, i) }]);
          if (i < cmd.length) {
            window.setTimeout(type, 55);
          } else {
            window.setTimeout(() => setHistory([{ kind: "in", text: cmd }, ...out]), 260);
          }
        };
        window.setTimeout(type, 350);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [booted]);

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight });
  }, [history]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const entry: Line = { kind: "in", text: value };
    const res = run(value);
    if (res.open) window.open(res.open, "_blank", "noopener");
    if (res.respawn) window.dispatchEvent(new CustomEvent("buddy:respawn"));
    setHistory((h) => (res.clear ? [] : [...h, entry, ...res.lines]));
    setValue("");
  };

  return (
    <footer ref={rootRef} id="footer" className="border-t border-white/10 bg-surface px-5 py-16 sm:px-8">
      <div className="mx-auto max-w-[1100px]">
        <div data-theme="dark" className="overflow-hidden rounded-xl border border-white/10 bg-void">
          <div className="flex items-center gap-2 border-b border-white/10 bg-panel px-4 py-2.5">
            <span className="h-3 w-3 rounded-full bg-white/15" />
            <span className="h-3 w-3 rounded-full bg-white/15" />
            <span className="h-3 w-3 rounded-full bg-acid/40" />
            <span className="ml-2 font-mono text-xs text-faint">{PROMPT.replace("$", "")} — bash</span>
          </div>

          <div
            ref={bodyRef}
            className="max-h-64 min-h-[168px] overflow-y-auto p-4 font-mono text-[13px] leading-relaxed"
            onClick={() => inputRef.current?.focus()}
          >
            {history.map((l, i) => (
              <div
                key={i}
                className={
                  l.kind === "in" ? "text-ink" : l.kind === "sys" ? "text-amber" : "text-muted"
                }
              >
                {l.kind === "in" && <span className="text-acid">{PROMPT} </span>}
                {l.text}
              </div>
            ))}
            <form onSubmit={submit} className="flex items-center">
              <label htmlFor="term-input" className="sr-only">
                Terminal command input
              </label>
              <span className="text-acid">{PROMPT}&nbsp;</span>
              <input
                id="term-input"
                ref={inputRef}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                spellCheck={false}
                autoComplete="off"
                aria-label="Terminal command input"
                className="flex-1 bg-transparent text-ink caret-acid outline-none"
                placeholder={history.length ? "" : terminal.hint}
              />
            </form>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-4 font-mono text-xs text-faint sm:flex-row">
          <span>
            © {new Date().getFullYear()} {site.fullName} · {site.domain}
          </span>
          <span className="hidden sm:inline">built with React · Tailwind · Motion · GSAP · three</span>
          <a
            href="#top"
            className="flex items-center gap-2 rounded-md border border-white/10 px-3 py-1.5 text-muted transition-colors hover:border-acid/40 hover:text-acid"
          >
            <ArrowUp size={13} weight="bold" /> top
          </a>
        </div>
      </div>
    </footer>
  );
}
