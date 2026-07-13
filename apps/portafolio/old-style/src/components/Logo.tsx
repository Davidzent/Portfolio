import { useId } from "react";

interface LogoProps {
  size?: number;
  className?: string;
}

/**
 * ZNT brand mark — the site's amber accent on a rounded tile with a solid
 * geometric Z in ink. Rendered inline (with a unique gradient id) so it can
 * appear multiple times on the page without id collisions.
 */
export function Logo({ size = 30, className }: LogoProps) {
  const gradientId = `znt-${useId().replace(/[^a-zA-Z0-9-]/g, "")}`;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      role="img"
      aria-label="ZNT logo"
      className={className}
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f0a838" />
          <stop offset="1" stopColor="#d9860f" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="14" fill={`url(#${gradientId})`} />
      <path d="M20 18H44V25L30 39H44V46H20V39L34 25H20Z" fill="#1a160c" />
    </svg>
  );
}
