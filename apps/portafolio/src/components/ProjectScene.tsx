import { useEffect, useRef, useState, type ReactElement } from "react";
import type { MarkId } from "../data/content";
import { cn } from "../lib/cn";

/**
 * Full-bleed animated "logo" scene per project, in the dual-boot palette
 * (acid green + amber on near-black). Pure CSS keyframes (see the `.ps-*` rules
 * in globals.css) so they loop cheaply and freeze to a clean static logo under
 * prefers-reduced-motion. Drawn on a 320x200 canvas, slice-scaled to fill.
 */

const ACID = "#7dfc5a";
const ACID_DIM = "#57c93b";
const AMBER = "#ff9e2c";
const AMBER_DIM = "#d97e18";

function Frame({ children, glow }: { children: React.ReactNode; glow?: string }) {
  return (
    <svg
      className="ps-svg"
      viewBox="0 0 320 200"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id={`psbg-${glow ?? "a"}`} cx="50%" cy="46%" r="70%">
          <stop offset="0" stopColor={glow ?? "#12181a"} stopOpacity="0.5" />
          <stop offset="1" stopColor="#080a0c" />
        </radialGradient>
      </defs>
      <rect width="320" height="200" fill={`url(#psbg-${glow ?? "a"})`} />
      {children}
    </svg>
  );
}

/** Portal Pantry — a portal with green + orange rings and a parcel drifting through. */
function Portal(): ReactElement {
  return (
    <Frame glow="#10240f">
      <g>
        <circle className="ps-tw" cx="46" cy="42" r="1.6" fill={ACID} />
        <circle className="ps-tw ps-d2" cx="280" cy="60" r="1.4" fill={AMBER} />
        <circle className="ps-tw ps-d1" cx="70" cy="150" r="1.5" fill={ACID} />
        <circle className="ps-tw ps-d3" cx="250" cy="150" r="1.3" fill={AMBER} />
      </g>
      <circle className="ps-pulse" cx="160" cy="100" r="34" fill={ACID} opacity="0.16" />
      <circle className="ps-spin" cx="160" cy="100" r="54" fill="none" stroke={ACID} strokeWidth="5" strokeLinecap="round" strokeDasharray="130 44" />
      <circle className="ps-spin-r" cx="160" cy="100" r="38" fill="none" stroke={AMBER} strokeWidth="4.5" strokeLinecap="round" strokeDasharray="72 34" />
      <circle className="ps-spin-f" cx="160" cy="100" r="22" fill="none" stroke={ACID_DIM} strokeWidth="3.4" strokeLinecap="round" strokeDasharray="34 20" />
      <circle cx="160" cy="100" r="6" fill={AMBER} className="ps-pulse" />
      <g className="ps-parcel">
        <rect x="150" y="90" width="20" height="19" rx="3" fill="none" stroke={AMBER} strokeWidth="2" />
        <path d="M160 90v19M150 96.5h20" stroke={AMBER} strokeWidth="1.6" />
      </g>
    </Frame>
  );
}

/** Simmer — a pot on the boil with rising steam and bubbles. */
function Simmer(): ReactElement {
  const s = { fill: "none", stroke: ACID, strokeWidth: 3, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  return (
    <Frame glow="#0e1f12">
      <g className="ps-steamGroup">
        <path className="ps-steam" d="M138 116q-9-15 0-30q9-15 0-30" fill="none" stroke={AMBER} strokeWidth="5" strokeLinecap="round" />
        <path className="ps-steam ps-d2" d="M160 116q9-15 0-30q-9-15 0-30" fill="none" stroke={ACID} strokeWidth="5" strokeLinecap="round" />
        <path className="ps-steam ps-d1" d="M182 116q-9-15 0-30q9-15 0-30" fill="none" stroke={AMBER} strokeWidth="5" strokeLinecap="round" />
      </g>
      <path {...s} d="M112 120h96v14a20 20 0 0 1-20 20h-56a20 20 0 0 1-20-20z" />
      <path {...s} d="M104 120h112" />
      <path {...s} d="M104 128q-14 0 -14 11t14 11" />
      <path {...s} d="M216 128q14 0 14 11t-14 11" />
      <g fill={AMBER}>
        <circle className="ps-bub" cx="146" cy="140" r="2.4" />
        <circle className="ps-bub ps-d1" cx="164" cy="140" r="2" />
        <circle className="ps-bub ps-d2" cx="178" cy="140" r="2.6" />
      </g>
    </Frame>
  );
}

/** Cooking game — a pan over a flickering flame with a bouncing ingredient. */
function Cooking(): ReactElement {
  const s = { fill: "none", stroke: ACID, strokeWidth: 3, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  return (
    <Frame glow="#231603">
      <g className="ps-hat">
        <path d="M110 44c-8 0-13-6-11-12c-6-1-8-9-2-12c1-7 12-9 15-2c5-4 13 0 12 6c6 2 5 10-2 10z" fill="none" stroke={AMBER} strokeWidth="2.4" />
      </g>
      <g className="ps-flame">
        <path d="M160 150c-13 0-21-9-21-20c0-10 9-15 6-26c9 5 10 12 10 16c3-4 2-10-1-16c10 5 18 15 18 27c0 10-8 19-12 19z" fill={AMBER} opacity="0.85" />
        <path d="M160 150c-7 0-12-5-12-12c0-6 5-9 4-16c6 4 7 9 7 12c3-4 1-8 1-11c5 4 8 9 8 15c0 7-5 12-8 12z" fill={ACID} opacity="0.7" />
      </g>
      <ellipse {...s} cx="150" cy="118" rx="46" ry="11" />
      <path {...s} d="M196 118h30" />
      <g className="ps-bounce">
        <circle cx="150" cy="108" r="10" fill="none" stroke={AMBER} strokeWidth="3" />
        <path d="M150 100q4-3 8-1" fill="none" stroke={ACID} strokeWidth="2.4" strokeLinecap="round" />
      </g>
    </Frame>
  );
}

/** Warehouse — pallet racking with an inbound crate stowing into the open slot. */
function Warehouse(): ReactElement {
  const s = { fill: "none", stroke: ACID, strokeWidth: 3, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  /** Settled stock: [x, y, fill]. The top shelf keeps a slot open for the inbound crate. */
  const stock: [number, number, string][] = [
    [99, 56, ACID_DIM], [131, 56, AMBER_DIM],
    [99, 96, ACID_DIM], [131, 96, AMBER_DIM], [163, 96, ACID_DIM],
    [99, 136, AMBER_DIM], [131, 136, ACID_DIM], [163, 136, AMBER_DIM], [195, 136, ACID_DIM],
  ];
  return (
    <Frame glow="#0d1c22">
      {/* inbound flow, pointing at the dock side of the rack */}
      <g fill="none" stroke={AMBER} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <path className="ps-chev" d="M40 112l10 10-10 10" />
        <path className="ps-chev ps-d1" d="M56 112l10 10-10 10" />
        <path className="ps-chev ps-d2" d="M72 112l10 10-10 10" />
      </g>
      {/* racking */}
      <g {...s}>
        <path d="M96 42v120M224 42v120" />
        <path d="M92 82h136M92 122h136M92 162h136" />
      </g>
      {stock.map(([x, y, c], i) => (
        <g key={i} stroke={c}>
          <rect x={x} y={y} width="28" height="26" rx="2" fill={c} fillOpacity="0.16" strokeWidth="2" />
          <path d={`M${x} ${y + 9}h28`} strokeWidth="1.6" strokeOpacity="0.5" />
        </g>
      ))}
      {/* the received crate, resting in its slot so it reads when frozen */}
      <g className="ps-stow">
        <rect x="163" y="56" width="28" height="26" rx="2" fill="#0a1114" stroke={AMBER} strokeWidth="2.6" />
        <path d="M177 56v26M163 65h28" stroke={AMBER} strokeWidth="1.6" />
      </g>
      {/* scanner sweep (hidden at rest) */}
      <rect className="ps-beam" x="95" y="44" width="2.4" height="116" fill={ACID} opacity="0" />
    </Frame>
  );
}

/** Restaurant — a plated place setting with an order ticket printing above. */
function Restaurant(): ReactElement {
  const s = { fill: "none", stroke: ACID, strokeWidth: 3, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  return (
    <Frame glow="#0c1622">
      <g className="ps-ticket">
        <rect x="30" y="34" width="52" height="66" rx="4" fill="none" stroke={AMBER} strokeWidth="2.4" />
        <path d="M40 50h32M40 62h24M40 74h28" stroke={AMBER} strokeWidth="2.4" strokeLinecap="round" opacity="0.7" />
        <path className="ps-check" d="M44 86l6 6 10-12" fill="none" stroke={ACID} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <circle {...s} cx="196" cy="104" r="42" />
      <circle {...s} cx="196" cy="104" r="24" strokeWidth="2" opacity="0.5" />
      <path {...s} d="M150 74v18a7 7 0 0 0 14 0V74M157 74v58" transform="translate(-6 0)" />
      <path {...s} d="M244 96V74a13 13 0 0 0-13 13v7a5 5 0 0 0 5 5h8zm0 0v40" />
    </Frame>
  );
}

/** Flappy Bird AI — a small neural network firing left to right. */
function Neural(): ReactElement {
  const A: [number, number][] = [64, 100, 136].map((y) => [58, y]);
  const B: [number, number][] = [56, 92, 128, 164].map((y) => [160, y]);
  const C: [number, number][] = [84, 116].map((y) => [262, y]);
  const edges: { a: [number, number]; b: [number, number]; layer: number }[] = [];
  A.forEach((a) => B.forEach((b) => edges.push({ a, b, layer: 0 })));
  B.forEach((a) => C.forEach((b) => edges.push({ a, b, layer: 1 })));
  return (
    <Frame glow="#0e1f14">
      {edges.map((e, i) => (
        <line
          key={i}
          className={`ps-edge ${e.layer === 1 ? "ps-d2" : ""}`}
          x1={e.a[0]}
          y1={e.a[1]}
          x2={e.b[0]}
          y2={e.b[1]}
          stroke={e.layer === 1 ? AMBER : ACID}
          strokeWidth="1.2"
        />
      ))}
      {A.map((n, i) => (
        <circle key={`a${i}`} className="ps-node" cx={n[0]} cy={n[1]} r="6" fill="none" stroke={ACID} strokeWidth="2.4" />
      ))}
      {B.map((n, i) => (
        <circle key={`b${i}`} className="ps-node ps-d1" cx={n[0]} cy={n[1]} r="6" fill="none" stroke={ACID} strokeWidth="2.4" />
      ))}
      {C.map((n, i) => (
        <circle key={`c${i}`} className="ps-node ps-d2" cx={n[0]} cy={n[1]} r="7" fill="none" stroke={AMBER} strokeWidth="2.6" />
      ))}
    </Frame>
  );
}

/** Tetris — tetrominoes falling into a stacked well. */
function Tetris(): ReactElement {
  return (
    <Frame glow="#12101f">
      <g stroke="#ffffff" strokeOpacity="0.05" strokeWidth="1">
        <path d="M120 0v200M140 0v200M160 0v200M180 0v200M200 0v200" />
        <path d="M0 60h320M0 80h320M0 100h320M0 120h320M0 140h320M0 160h320" />
      </g>
      {/* falling pieces (base positions on-canvas so they read when frozen) */}
      <g className="ps-fall" fill={ACID}>
        <rect x="120" y="44" width="20" height="20" rx="2" />
        <rect x="140" y="44" width="20" height="20" rx="2" />
        <rect x="160" y="44" width="20" height="20" rx="2" />
        <rect x="140" y="64" width="20" height="20" rx="2" />
      </g>
      <g className="ps-fall ps-d2" fill={AMBER}>
        <rect x="180" y="20" width="20" height="20" rx="2" />
        <rect x="200" y="20" width="20" height="20" rx="2" />
        <rect x="180" y="40" width="20" height="20" rx="2" />
        <rect x="200" y="40" width="20" height="20" rx="2" />
      </g>
      {/* settled stack */}
      <g>
        <rect x="120" y="160" width="20" height="20" rx="2" fill={ACID_DIM} />
        <rect x="120" y="180" width="20" height="20" rx="2" fill={ACID_DIM} />
        <rect x="140" y="180" width="20" height="20" rx="2" fill={AMBER_DIM} />
        <rect x="160" y="180" width="20" height="20" rx="2" fill={ACID_DIM} />
        <rect x="180" y="180" width="20" height="20" rx="2" fill={AMBER_DIM} />
        <rect x="200" y="180" width="20" height="20" rx="2" fill={ACID_DIM} />
        <rect x="200" y="160" width="20" height="20" rx="2" fill={AMBER_DIM} />
      </g>
    </Frame>
  );
}

const SCENES: Record<MarkId, () => ReactElement> = {
  portal: Portal,
  simmer: Simmer,
  cooking: Cooking,
  warehouse: Warehouse,
  restaurant: Restaurant,
  neural: Neural,
  tetris: Tetris,
};

export function ProjectScene({ id }: { id: MarkId }) {
  const Scene = SCENES[id];
  const ref = useRef<HTMLDivElement>(null);
  const [onScreen, setOnScreen] = useState(false);

  // Keyframes run off-screen too, and Firefox rasterises animated SVG on the
  // main thread Lenis scrolls from — ~33 elements across the grid. Not
  // `content-visibility`: TiltCard's preserve-3d context disables it.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setOnScreen(entry.isIntersecting),
      { rootMargin: "200px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={cn("ps absolute inset-0", !onScreen && "ps-idle")}>
      <Scene />
    </div>
  );
}
