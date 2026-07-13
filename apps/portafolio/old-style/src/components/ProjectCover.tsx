import type { ReactElement } from "react";
import { ProjectLogo, type ProjectLogoName } from "./ProjectLogos";

export type CoverName =
  | "portal"
  | "simmer"
  | "cooking"
  | "restaurant"
  | "neural"
  | "tetris";

/**
 * Themed, animated cover art for each project — one hand-built SVG scene per
 * project that echoes its description and brand. All motion is CSS-driven
 * (see the `.pc-*` rules in index.css) so it pauses under prefers-reduced-motion
 * and needs no JavaScript. Scenes are drawn on a fixed 320×180 (16:9) canvas
 * and slice-scaled to fill the cover.
 */

/** Portal Pantry — swirling interdimensional portal delivering a parcel. */
function PortalScene(): ReactElement {
  return (
    <svg
      className="pc-svg"
      viewBox="0 0 320 180"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="pc-portal-bg" cx="50%" cy="50%" r="75%">
          <stop offset="0" stopColor="#173a1c" />
          <stop offset="1" stopColor="#0a1407" />
        </radialGradient>
        <radialGradient id="pc-portal-core" cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#f2ffdc" />
          <stop offset="0.55" stopColor="#a8f25e" />
          <stop offset="1" stopColor="#57c433" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="320" height="180" fill="url(#pc-portal-bg)" />
      <g fill="#d3ff9e">
        <circle className="pc-twinkle" cx="46" cy="42" r="1.6" />
        <circle className="pc-twinkle pc-d1" cx="276" cy="58" r="1.3" />
        <circle className="pc-twinkle pc-d2" cx="66" cy="130" r="1.5" />
        <circle className="pc-twinkle pc-d3" cx="250" cy="132" r="1.2" />
        <circle className="pc-twinkle pc-d1" cx="120" cy="34" r="1.1" />
      </g>
      <circle className="pc-core" cx="160" cy="90" r="34" fill="url(#pc-portal-core)" />
      <circle
        className="pc-ring pc-spin-a"
        cx="160"
        cy="90"
        r="54"
        fill="none"
        stroke="#a8f25e"
        strokeWidth="5"
        strokeLinecap="round"
        strokeDasharray="128 46"
      />
      <circle
        className="pc-ring pc-spin-b"
        cx="160"
        cy="90"
        r="38"
        fill="none"
        stroke="#57c433"
        strokeWidth="4.5"
        strokeLinecap="round"
        strokeDasharray="74 34"
      />
      <circle
        className="pc-ring pc-spin-c"
        cx="160"
        cy="90"
        r="22"
        fill="none"
        stroke="#e7ffc4"
        strokeWidth="3.4"
        strokeLinecap="round"
        strokeDasharray="34 20"
      />
      <g className="pc-parcel">
        <rect x="150" y="80" width="20" height="19" rx="3" fill="#d8b078" />
        <rect x="150" y="80" width="20" height="19" rx="3" fill="none" stroke="#a97c3f" strokeWidth="1.4" />
        <path d="M160 80v19M150 86.5h20" stroke="#a97c3f" strokeWidth="1.6" />
      </g>
    </svg>
  );
}

/** Simmer — a pot on the boil with rising steam. */
function SimmerScene(): ReactElement {
  return (
    <svg
      className="pc-svg"
      viewBox="0 0 320 180"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="pc-simmer-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f4d7a8" />
          <stop offset="1" stopColor="#e7a86a" />
        </linearGradient>
      </defs>
      <rect width="320" height="180" fill="url(#pc-simmer-bg)" />
      <g fill="none" stroke="#fff" strokeWidth="6" strokeLinecap="round" opacity="0.72">
        <path className="pc-steam" d="M138 96q-9-15 0-30q9-15 0-30" />
        <path className="pc-steam pc-d2" d="M160 96q9-15 0-30q-9-15 0-30" />
        <path className="pc-steam pc-d1" d="M182 96q-9-15 0-30q9-15 0-30" />
      </g>
      <path
        d="M108 104h104v18a24 24 0 0 1-24 24h-56a24 24 0 0 1-24-24z"
        fill="#c9502e"
      />
      <path d="M108 116h104" stroke="#a53d1f" strokeWidth="3" />
      <rect x="100" y="96" width="120" height="12" rx="6" fill="#e0663f" />
      <path
        d="M100 110q-14 0 -14 12t14 12"
        fill="none"
        stroke="#e0663f"
        strokeWidth="6"
        strokeLinecap="round"
      />
      <path
        d="M220 110q14 0 14 12t-14 12"
        fill="none"
        stroke="#e0663f"
        strokeWidth="6"
        strokeLinecap="round"
      />
      <rect x="150" y="150" width="20" height="24" rx="4" fill="#b23b20" />
    </svg>
  );
}

/** Multiplayer Cooking Game — a frying pan over a live flame, ingredient
 *  bouncing, twin chef's toques for the co-op angle. */
function CookingScene(): ReactElement {
  return (
    <svg
      className="pc-svg"
      viewBox="0 0 320 180"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="pc-cook-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2a2030" />
          <stop offset="1" stopColor="#17121c" />
        </linearGradient>
      </defs>
      <rect width="320" height="180" fill="url(#pc-cook-bg)" />
      {/* twin chef toques */}
      <g className="pc-hat" fill="#f3f0ea">
        <path d="M64 52c-10 0-16-7-13-15c-8-1-11-11-3-15c1-9 15-11 19-3c6-5 17 0 15 8c8 2 6 13-3 13z" />
        <rect x="52" y="52" width="34" height="12" rx="3" />
      </g>
      <g className="pc-hat pc-d2" fill="#f3f0ea">
        <path d="M256 52c-10 0-16-7-13-15c-8-1-11-11-3-15c1-9 15-11 19-3c6-5 17 0 15 8c8 2 6 13-3 13z" />
        <rect x="244" y="52" width="34" height="12" rx="3" />
      </g>
      {/* flame */}
      <g className="pc-flame">
        <path d="M150 150c-16 0-26-11-26-25c0-13 11-19 8-32c11 6 12 14 12 20c3-5 2-13-1-20c12 5 23 18 23 33c0 13-9 24-16 24z" fill="#ff8a2c" />
        <path d="M150 150c-9 0-15-7-15-16c0-8 7-12 5-21c8 5 9 11 9 15c4-6 2-11 1-14c7 5 11 12 11 20c0 9-6 16-11 16z" fill="#ffd23c" />
      </g>
      {/* pan */}
      <ellipse cx="150" cy="120" rx="58" ry="15" fill="#3a3a44" />
      <path d="M92 120a58 15 0 0 0 116 0v3a58 15 0 0 1-116 0z" fill="#26262e" />
      <ellipse cx="150" cy="118" rx="46" ry="10" fill="#4a4a55" />
      <rect x="204" y="114" width="74" height="9" rx="4.5" fill="#4a4a55" />
      <rect x="270" y="112" width="16" height="13" rx="4" fill="#6b4a2c" />
      {/* bouncing ingredient */}
      <g className="pc-ingredient">
        <circle cx="150" cy="110" r="12" fill="#ff5a4d" />
        <ellipse cx="145" cy="105" rx="3.4" ry="4.4" fill="#ff9186" opacity="0.7" />
        <path d="M150 98q4-4 8-2" fill="none" stroke="#4caf50" strokeWidth="2.4" strokeLinecap="round" />
      </g>
    </svg>
  );
}

/** Restaurant ordering platform — an order ticket printing above a plated
 *  place setting. */
function RestaurantScene(): ReactElement {
  return (
    <svg
      className="pc-svg"
      viewBox="0 0 320 180"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="pc-rest-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#1e3560" />
          <stop offset="1" stopColor="#101c34" />
        </linearGradient>
      </defs>
      <rect width="320" height="180" fill="url(#pc-rest-bg)" />
      {/* plate + place setting */}
      <circle cx="182" cy="94" r="56" fill="#eef2f8" />
      <circle cx="182" cy="94" r="42" fill="none" stroke="#c6d1e2" strokeWidth="2.4" />
      <circle cx="182" cy="94" r="30" fill="#f7f9fc" />
      <g fill="none" stroke="#3170d8" strokeWidth="4.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M120 60v20a8 8 0 0 0 16 0V60" />
        <path d="M128 60v72" />
        <path d="M250 88V60a15 15 0 0 0-15 15v9a6 6 0 0 0 6 6h9zm0 0v44" />
      </g>
      {/* printing order ticket */}
      <g className="pc-ticket">
        <rect x="30" y="26" width="58" height="74" rx="4" fill="#fbfbf7" />
        <path d="M30 100l6-5 6 5 6-5 6 5 6-5 6 5 6-5 6 5 4-4v-4H30z" fill="#fbfbf7" />
        <g stroke="#9aa6b8" strokeWidth="3" strokeLinecap="round">
          <path d="M40 40h38" />
          <path d="M40 52h28" />
          <path d="M40 64h32" />
          <path d="M40 76h22" />
        </g>
        <circle cx="72" cy="40" r="7" fill="#2fae5f" />
        <path d="M69 40l2.4 2.4 4-4.4" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </svg>
  );
}

/** Neural Network Flappy Bird AI — a small net firing on the left, the bird
 *  flapping through scrolling pipes on the right. */
function NeuralScene(): ReactElement {
  return (
    <svg
      className="pc-svg"
      viewBox="0 0 320 180"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="pc-nn-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#8fd3e8" />
          <stop offset="1" stopColor="#cdeeb0" />
        </linearGradient>
      </defs>
      <rect width="320" height="180" fill="url(#pc-nn-bg)" />
      {/* scrolling pipes */}
      <g className="pc-pipes" fill="#5aa63f" stroke="#3f7d2b" strokeWidth="2">
        <rect x="150" y="-10" width="30" height="66" rx="3" />
        <rect x="146" y="50" width="38" height="12" rx="3" />
        <rect x="150" y="120" width="30" height="70" rx="3" />
        <rect x="146" y="116" width="38" height="12" rx="3" />
        <rect x="250" y="-10" width="30" height="42" rx="3" />
        <rect x="246" y="26" width="38" height="12" rx="3" />
        <rect x="250" y="96" width="30" height="94" rx="3" />
        <rect x="246" y="92" width="38" height="12" rx="3" />
      </g>
      {/* neural net */}
      <g className="pc-net">
        <g fill="none" stroke="#2f6b46" strokeWidth="1.4">
          <path className="pc-syn" d="M40 56 84 44M40 56 84 90M40 56 84 136" />
          <path className="pc-syn pc-d1" d="M40 90 84 44M40 90 84 90M40 90 84 136" />
          <path className="pc-syn pc-d2" d="M40 124 84 44M40 124 84 90M40 124 84 136" />
          <path className="pc-syn pc-d3" d="M84 44 120 90M84 90 120 90M84 136 120 90" />
        </g>
        <g fill="#f5f9ef" stroke="#2f6b46" strokeWidth="1.8">
          <circle className="pc-neuron" cx="40" cy="56" r="6" />
          <circle className="pc-neuron pc-d1" cx="40" cy="90" r="6" />
          <circle className="pc-neuron pc-d2" cx="40" cy="124" r="6" />
          <circle className="pc-neuron pc-d1" cx="84" cy="44" r="6" />
          <circle className="pc-neuron pc-d3" cx="84" cy="90" r="6" />
          <circle className="pc-neuron pc-d2" cx="84" cy="136" r="6" />
          <circle className="pc-neuron pc-d3" cx="120" cy="90" r="7" />
        </g>
      </g>
      {/* bird */}
      <g className="pc-bird">
        <circle cx="210" cy="90" r="15" fill="#f6c945" stroke="#c9971f" strokeWidth="2" />
        <path className="pc-wing" d="M204 90q-12-6-18 2q8 5 18 3z" fill="#fff2c4" stroke="#c9971f" strokeWidth="1.6" />
        <circle cx="216" cy="85" r="3.4" fill="#fff" stroke="#333" strokeWidth="1" />
        <circle cx="217" cy="85" r="1.5" fill="#222" />
        <path d="M224 90l10 3-10 4z" fill="#f0872a" />
      </g>
    </svg>
  );
}

/** Tetris — tetrominoes falling into a stacked well. */
function TetrisScene(): ReactElement {
  return (
    <svg
      className="pc-svg"
      viewBox="0 0 320 180"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="pc-tetris-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1c1830" />
          <stop offset="1" stopColor="#0f0c1c" />
        </linearGradient>
      </defs>
      <rect width="320" height="180" fill="url(#pc-tetris-bg)" />
      <g stroke="#ffffff" strokeOpacity="0.06" strokeWidth="1">
        <path d="M130 0v180M150 0v180M170 0v180M190 0v180M110 0v180M210 0v180" />
        <path d="M0 40h320M0 60h320M0 80h320M0 100h320M0 120h320M0 140h320M0 160h320" />
      </g>
      {/* falling pieces (base positions are on-canvas so they read when frozen) */}
      <g className="pc-piece pc-fall-a" fill="#7c4dcc">
        <rect x="110" y="52" width="20" height="20" rx="3" />
        <rect x="130" y="52" width="20" height="20" rx="3" />
        <rect x="150" y="52" width="20" height="20" rx="3" />
        <rect x="130" y="72" width="20" height="20" rx="3" />
      </g>
      <g className="pc-piece pc-fall-b" fill="#e0a92e">
        <rect x="200" y="30" width="20" height="20" rx="3" />
        <rect x="220" y="30" width="20" height="20" rx="3" />
        <rect x="200" y="50" width="20" height="20" rx="3" />
        <rect x="220" y="50" width="20" height="20" rx="3" />
      </g>
      {/* settled stack */}
      <g>
        <rect x="110" y="140" width="20" height="20" rx="3" fill="#5aa1e0" />
        <rect x="110" y="160" width="20" height="20" rx="3" fill="#5aa1e0" />
        <rect x="130" y="160" width="20" height="20" rx="3" fill="#5aa1e0" />
        <rect x="150" y="160" width="20" height="20" rx="3" fill="#4bbf7a" />
        <rect x="170" y="160" width="20" height="20" rx="3" fill="#4bbf7a" />
        <rect x="170" y="140" width="20" height="20" rx="3" fill="#4bbf7a" />
        <rect x="190" y="160" width="20" height="20" rx="3" fill="#d1544b" />
        <rect x="210" y="160" width="20" height="20" rx="3" fill="#e0a92e" />
      </g>
    </svg>
  );
}

const SCENES: Record<CoverName, () => ReactElement> = {
  portal: PortalScene,
  simmer: SimmerScene,
  cooking: CookingScene,
  restaurant: RestaurantScene,
  neural: NeuralScene,
  tetris: TetrisScene,
};

interface ProjectCoverProps {
  cover: CoverName;
  /** Brand logo badge shown in the corner, if the project has one. */
  logo?: ProjectLogoName;
}

export function ProjectCover({ cover, logo }: ProjectCoverProps): ReactElement {
  const Scene = SCENES[cover];
  return (
    <div className="pc">
      <Scene />
      {logo && (
        <span className="pc-badge">
          <ProjectLogo name={logo} size={30} />
        </span>
      )}
    </div>
  );
}
