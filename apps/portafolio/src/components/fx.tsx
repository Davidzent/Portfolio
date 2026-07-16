import { cn } from "../lib/cn";

/** Fixed film-grain overlay for the whole page. */
export function Grain() {
  return <div className="fx-grain" aria-hidden="true" />;
}

/** CRT scanlines, scoped to game-side surfaces (position the parent relative). */
export function Scanlines({ className }: { className?: string }) {
  return <div className={cn("fx-scan", className)} aria-hidden="true" />;
}
