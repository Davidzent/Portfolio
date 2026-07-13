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
    if (boot) {
      const id = requestAnimationFrame(() => setPlay(true));
      return () => cancelAnimationFrame(id);
    }
    setPlay(true);
  }, [boot]);

  const znt = useScramble("znt", boot ? play : false, 0.28);
  const sns = useScramble("sns", boot ? play : false, 0.28);
  const RATIO = 176 / 40;

  return (
    <svg
      className={cn("zlogo", interactive && "zlogo-i", className)}
      width={Math.round(height * RATIO)}
      height={height}
      viewBox="0 0 176 40"
      role="img"
      aria-label={title}
    >
      <text
        x="4"
        y="30"
        fontFamily="var(--font-mono)"
        fontSize="27"
        fontWeight="700"
        letterSpacing="0.5"
      >
        <tspan fill="#59635c">[</tspan>
        <tspan fill="#7dfc5a" dx="7">{boot ? znt : "znt"}</tspan>
        <tspan fill="#ff9e2c">{boot ? sns : "sns"}</tspan>
        <tspan fill="#59635c" dx="7">]</tspan>
      </text>
    </svg>
  );
}
