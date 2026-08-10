import { useEffect, useState } from "react";
import { useScramble } from "../lib/useScramble";
import { cn } from "../lib/cn";

interface Props {
  height?: number;
  className?: string;
  /** Scramble-decode on mount (hero). */
  boot?: boolean;
  /** Hover glitch + pointer cursor (nav). */
  interactive?: boolean;
  title?: string;
}

/**
 * The zntsns wordmark as inline SVG so it stays crisp and animatable.
 * The mark splits `znt` (acid, the IDE half) + `sns` (amber, the engine half),
 * and boots up by scramble-decoding. JetBrains Mono keeps the width stable.
 */
export function ZntsnsLogo({ height = 34, className, boot = false, interactive = false, title = "zntsns" }: Props) {
  const [play, setPlay] = useState(false);
  useEffect(() => {
    // Kick the boot one frame after mount so the scramble is visible.
    // (`play` is only consumed while `boot` is set, so no else branch needed.)
    if (!boot) return;
    const id = requestAnimationFrame(() => setPlay(true));
    return () => cancelAnimationFrame(id);
  }, [boot]);

  const znt = useScramble("znt", boot ? play : false, 0.28);
  const sns = useScramble("sns", boot ? play : false, 0.28);
  const RATIO = 176 / 40;

  // xmlns is redundant inline — the HTML parser supplies it — but anything that
  // serialises this mark and reloads it as a standalone image parses it as XML,
  // where a missing namespace is a hard failure rather than a warning.
  return (
    <svg
      className={cn("zlogo", interactive && "zlogo-i", className)}
      width={Math.round(height * RATIO)}
      height={height}
      viewBox="0 0 176 40"
      role="img"
      aria-label={title}
      xmlns="http://www.w3.org/2000/svg"
    >
      <text
        x="4"
        y="30"
        fontFamily="var(--font-mono)"
        fontSize="27"
        fontWeight="700"
        letterSpacing="0.5"
      >
        <tspan fill="var(--color-faint)">[</tspan>
        <tspan fill="var(--color-acid)" dx="7">{boot ? znt : "znt"}</tspan>
        <tspan fill="var(--color-amber)">{boot ? sns : "sns"}</tspan>
        <tspan fill="var(--color-faint)" dx="7">]</tspan>
      </text>
    </svg>
  );
}
