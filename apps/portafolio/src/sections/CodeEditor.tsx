import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import { heroCode, type TokenKind } from "../data/content";

const COLOR: Record<TokenKind, string> = {
  kw: "text-amber",
  fn: "text-acid",
  type: "text-[#57c93b]",
  str: "text-[#c9e88a]",
  num: "text-[#ffbe6b]",
  com: "text-faint italic",
  var: "text-ink",
  punct: "text-muted",
  plain: "text-[#c7cdc7]",
};

type Tok = [string, TokenKind];
const lineLen = (t: Tok[]) => t.reduce((n, x) => n + x[0].length, 0);

function sliceTokens(tokens: Tok[], count: number): Tok[] {
  const out: Tok[] = [];
  let rem = count;
  for (const [text, kind] of tokens) {
    if (rem <= 0) break;
    if (text.length <= rem) {
      out.push([text, kind]);
      rem -= text.length;
    } else {
      out.push([text.slice(0, rem), kind]);
      rem = 0;
    }
  }
  return out;
}

/** The IDE side of the hero: types `dev.ts` out token by token, once.
 *
 *  It does not loop. The finished file is the point — `shipped` is the only
 *  proof of real work above the fold, so once it is on screen it stays there
 *  instead of erasing itself.
 *
 *  Speed is a constraint, not a decoration: the project names have to finish
 *  typing inside a ~10s first-impression scan. At ~24ms/char the last name
 *  lands around 7.1s and the whole file around 13.2s. Slowing much past
 *  ~30ms/char pushes the third project name outside the scan window. */
export function CodeEditor() {
  const reduce = useReducedMotion();
  const [line, setLine] = useState(0);
  const [ch, setCh] = useState(0);
  const timer = useRef(0);

  useEffect(() => {
    if (reduce) {
      // Show the finished file on the next frame (never sync inside the effect).
      const id = requestAnimationFrame(() => setLine(heroCode.length));
      return () => cancelAnimationFrame(id);
    }
    let l = 0;
    let c = 0;
    let live = true;
    const step = () => {
      if (!live) return;
      const cur = heroCode[l];
      // Past the last line: stop and leave the completed file on screen.
      if (!cur) return;
      const len = lineLen(cur.tokens);
      if (c < len) {
        c += 1;
        setLine(l);
        setCh(c);
        timer.current = window.setTimeout(step, 14 + Math.random() * 20);
      } else {
        l += 1;
        c = 0;
        setLine(l);
        setCh(0);
        timer.current = window.setTimeout(step, len ? 180 : 90);
      }
    };
    timer.current = window.setTimeout(step, 350);
    return () => {
      live = false;
      window.clearTimeout(timer.current);
    };
  }, [reduce]);

  return (
    <div className="flex h-full flex-col bg-void font-mono text-[12.5px] leading-[1.4] sm:text-[13.5px]">
      <div className="flex items-center gap-2 border-b border-white/10 bg-panel px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-acid/40" />
        <span className="ml-2 text-xs text-faint">dev.ts</span>
      </div>
      <div className="flex-1 overflow-hidden px-3 py-4 sm:px-5">
        {heroCode.map((ln, i) => {
          const isPast = reduce || i < line;
          const isCur = !reduce && i === line;
          const toks: Tok[] = isPast ? ln.tokens : isCur ? sliceTokens(ln.tokens, ch) : [];
          // Typing has run past the end (or was skipped): rest the caret on the
          // last line so the finished file still reads as a live editor.
          const last = line >= heroCode.length && i === heroCode.length - 1;
          return (
            <div key={i} className="flex min-h-[1.4em]">
              <span className="w-7 flex-none select-none pr-3 text-right text-faint/60">
                {i + 1}
              </span>
              <code style={{ paddingLeft: `${(ln.indent ?? 0) * 1.4}ch` }} className="whitespace-pre">
                {toks.map((t, j) => (
                  <span key={j} className={COLOR[t[1]]}>
                    {t[0]}
                  </span>
                ))}
                {(isCur || last) && <span className="caret text-acid" />}
              </code>
            </div>
          );
        })}
      </div>
    </div>
  );
}
