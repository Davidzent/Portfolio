import type { ReactElement } from "react";

export type ProjectLogoName =
  | "simmer"
  | "restaurant"
  | "flappy-bird"
  | "tetris"
  | "portal-pantry";

/**
 * Hand-drawn logo badges for individual projects — shown on a project
 * card's cover instead of the generic type icon. Each is a solid brand
 * dot with a white glyph so it reads on any cover gradient and theme.
 */
const logos: Record<ProjectLogoName, ReactElement> = {
  /** Steaming pot — the Simmer recipe site's actual brand mark. */
  simmer: (
    <>
      <circle cx="24" cy="24" r="24" fill="#c9502e" />
      <path
        d="M19.5 9.5c-1.5 1.8 1 3-.6 4.8M28.7 9.5c-1.5 1.8 1 3-.6 4.8"
        fill="none"
        stroke="#fff"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <path d="M13 21h22v7a8 8 0 0 1-8 8h-6a8 8 0 0 1-8-8v-7Z" fill="#fff" />
      <path d="M9.5 21h29" stroke="#fff" strokeWidth="2.8" strokeLinecap="round" />
    </>
  ),
  /** Fork & knife for the restaurant ordering platform. */
  restaurant: (
    <>
      <circle cx="24" cy="24" r="24" fill="#3170d8" />
      <g fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15 11v6.5a3.5 3.5 0 0 0 7 0V11" />
        <path d="M18.5 11v26" />
        <path d="M33 23.5V11a6.5 6.5 0 0 0-6.5 6.5v3.5a2.5 2.5 0 0 0 2.5 2.5H33Zm0 0V37" />
      </g>
    </>
  ),
  /** Round bird plus a tiny neural net for the Flappy Bird AI. */
  "flappy-bird": (
    <>
      <circle cx="24" cy="24" r="24" fill="#59a447" />
      <g stroke="#fff" strokeWidth="1.2" opacity="0.85" fill="none">
        <path d="M12 12.5 17.5 9M12 12.5l5.5 3.5" />
      </g>
      <g fill="#fff" opacity="0.9">
        <circle cx="12" cy="12.5" r="1.7" />
        <circle cx="17.5" cy="9" r="1.7" />
        <circle cx="17.5" cy="16" r="1.7" />
      </g>
      <circle cx="25" cy="26" r="10.5" fill="#fff" />
      <path d="M35 24.5l5.5 2.2-5.2 2.6z" fill="#fff" />
      <ellipse cx="20.5" cy="27.5" rx="4.2" ry="3.2" fill="#59a447" />
      <circle cx="29" cy="22.5" r="2" fill="#59a447" />
    </>
  ),
  /** Swirling green portal — Portal Pantry's brand mark. */
  "portal-pantry": (
    <>
      <circle cx="24" cy="24" r="24" fill="#10200a" />
      <circle
        cx="24"
        cy="24"
        r="17"
        fill="none"
        stroke="#a8f25e"
        strokeWidth="4.5"
        strokeLinecap="round"
        strokeDasharray="90 16.8"
        transform="rotate(-50 24 24)"
      />
      <circle
        cx="24"
        cy="24"
        r="11"
        fill="none"
        stroke="#57c433"
        strokeWidth="4"
        strokeLinecap="round"
        strokeDasharray="55 14.1"
        transform="rotate(120 24 24)"
      />
      <circle
        cx="24"
        cy="24"
        r="5.5"
        fill="none"
        stroke="#d3ff9e"
        strokeWidth="3.4"
        strokeLinecap="round"
        strokeDasharray="26 8.6"
        transform="rotate(260 24 24)"
      />
      <circle cx="24" cy="24" r="1.8" fill="#eaffd0" />
    </>
  ),
  /** T-tetromino for the Tetris game. */
  tetris: (
    <>
      <circle cx="24" cy="24" r="24" fill="#7c4dcc" />
      <g fill="#fff">
        <rect x="10" y="15" width="8" height="8" rx="1.5" />
        <rect x="20" y="15" width="8" height="8" rx="1.5" />
        <rect x="30" y="15" width="8" height="8" rx="1.5" />
        <rect x="20" y="25" width="8" height="8" rx="1.5" />
      </g>
    </>
  ),
};

interface ProjectLogoProps {
  name: ProjectLogoName;
  size?: number;
  className?: string;
}

export function ProjectLogo({ name, size = 56, className }: ProjectLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      className={className}
      aria-hidden="true"
    >
      {logos[name]}
    </svg>
  );
}
