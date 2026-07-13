import { useEffect, useState } from "react";

type Line = { text: string; kind?: "prompt" | "ok" | "dim" };

/** A real-ish ship sequence: build, containerize, deploy, push. On-brand for
 *  someone who runs Docker + CI/CD on Google Cloud. */
const SCRIPT: Line[] = [
  { text: "whoami", kind: "prompt" },
  { text: "david: full-stack & game developer", kind: "dim" },
  { text: "" },
  { text: "npm run build", kind: "prompt" },
  { text: "vite v8.1  building for production", kind: "dim" },
  { text: "> 312 modules transformed  ok", kind: "ok" },
  { text: "> built in 1.24s", kind: "ok" },
  { text: "" },
  { text: "docker build -t zntsns/app .", kind: "prompt" },
  { text: "> exporting layers ........ done", kind: "dim" },
  { text: "" },
  { text: "gcloud run deploy --region us-west1", kind: "prompt" },
  { text: "> routing traffic ........ 100%", kind: "dim" },
  { text: "> service is live  ok", kind: "ok" },
  { text: "" },
  { text: 'git commit -m "ship it" && git push', kind: "prompt" },
];

function TermLine({
  line,
  text,
  cursor,
}: {
  line: Line;
  text?: string;
  cursor?: boolean;
}) {
  const content = text ?? line.text;
  return (
    <div className={line.kind === "ok" ? "tok" : undefined}>
      {line.kind === "prompt" && <span className="tprompt">$ </span>}
      {content === "" ? " " : content}
      {cursor && <span className="term-cursor">▋</span>}
    </div>
  );
}

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function TerminalBackdrop() {
  const [pos, setPos] = useState<{ idx: number; text: string }>(() =>
    prefersReducedMotion()
      ? { idx: SCRIPT.length, text: "" }
      : { idx: 0, text: "" },
  );

  useEffect(() => {
    if (prefersReducedMotion()) return;

    let idx = 0;
    let ch = 0;
    let timer = 0;

    const loop = () => {
      const line = SCRIPT[idx];
      if (!line) {
        // Finished the run: hold, then restart from the top.
        timer = window.setTimeout(() => {
          idx = 0;
          ch = 0;
          setPos({ idx: 0, text: "" });
          timer = window.setTimeout(loop, 500);
        }, 2800);
        return;
      }
      ch += 1;
      setPos({ idx, text: line.text.slice(0, ch) });
      if (ch >= line.text.length) {
        idx += 1;
        ch = 0;
        timer = window.setTimeout(loop, line.text ? 360 : 90);
      } else {
        timer = window.setTimeout(loop, 24 + Math.random() * 30);
      }
    };

    timer = window.setTimeout(loop, 400);
    return () => window.clearTimeout(timer);
  }, []);

  const done = pos.idx >= SCRIPT.length;
  const committed = SCRIPT.slice(0, pos.idx);
  const current = done ? null : SCRIPT[pos.idx];

  return (
    <pre className="term-bg" aria-hidden="true">
      {done
        ? SCRIPT.map((l, i) => <TermLine key={i} line={l} />)
        : committed.map((l, i) => <TermLine key={i} line={l} />)}
      {current && <TermLine line={current} text={pos.text} cursor />}
    </pre>
  );
}
