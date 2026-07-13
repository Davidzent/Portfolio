import type { ReactNode } from "react";
import { cn } from "../lib/cn";
import { Reveal } from "./Reveal";

interface Props {
  cmd: string;
  title: ReactNode;
  sub?: ReactNode;
  accent?: "acid" | "amber";
  center?: boolean;
}

/** Section header as a terminal command line + display headline. Lowercase mono
 *  (part of the dual-boot language), deliberately not a templated eyebrow. */
export function SectionHeading({ cmd, title, sub, accent = "acid", center }: Props) {
  return (
    <Reveal className={cn(center && "flex flex-col items-center text-center")}>
      <span className="font-mono text-xs sm:text-[13px]">
        <span className="text-faint">$ </span>
        <span className={accent === "amber" ? "text-amber" : "text-acid"}>{cmd}</span>
        <span className="caret ml-0.5 align-middle text-faint" />
      </span>
      <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl lg:text-[2.7rem]">
        {title}
      </h2>
      {sub && <p className="mt-3 max-w-2xl font-mono text-sm text-muted">{sub}</p>}
    </Reveal>
  );
}
