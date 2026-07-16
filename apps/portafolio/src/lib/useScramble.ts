import { useEffect, useRef, useState } from "react";

const GLYPHS = "ZNTSNS#@%<>/\\[]=+*01{}·";

/**
 * Returns `target` with the not-yet-resolved characters replaced by random
 * glyphs, advancing left to right while `play` is true. JetBrains Mono is
 * monospace so the width never shifts. Instant final value under reduced motion.
 */
export function useScramble(target: string, play: boolean, speed = 0.5): string {
  const [text, setText] = useState(target);
  const raf = useRef(0);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!play || reduce) {
      // Settle to the final value on the next frame (never sync inside the effect).
      raf.current = requestAnimationFrame(() => setText(target));
      return () => cancelAnimationFrame(raf.current);
    }
    let frame = 0;
    const n = target.length;
    const tick = () => {
      let out = "";
      for (let i = 0; i < n; i++) {
        if (target[i] === " ") {
          out += " ";
        } else {
          out += i < frame ? target[i] : GLYPHS[(Math.random() * GLYPHS.length) | 0];
        }
      }
      setText(out);
      frame += speed;
      if (frame < n) {
        raf.current = requestAnimationFrame(tick);
      } else {
        setText(target);
      }
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [target, play, speed]);

  return text;
}
