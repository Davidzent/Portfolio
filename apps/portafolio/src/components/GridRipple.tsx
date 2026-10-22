import { useEffect, useRef } from "react";

const CELL = 44; // matches .grid-lines
const SPEED = 0.9; // wave front, px per ms
const BAND = 70; // wave thickness, px
const MAX_WAVES = 5;

const GLYPHS = "#$%&*+-./:;<=>?@~!\\";

type Wave = { x: number; y: number; t: number; amber: boolean };

/**
 * Fills the parent's background grid: hovering lights the cell under the
 * pointer, and a click on empty space sends a wave through every cell.
 * Draws only while something is lit, so an idle page costs nothing.
 */
export function GridRipple() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const host = canvas?.parentElement;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !host || !ctx) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let w = 0;
    let h = 0;
    let raf = 0;
    let hover: [number, number] | null = null;
    const waves: Wave[] = [];
    let acid = "#7dfc5a";
    let amber = "#ff9e2c";
    // Read on interaction, not per frame: getComputedStyle in a 60fps loop forces a
    // style flush each frame. Interaction-time is still fresh after a theme toggle.
    const readColors = () => {
      const css = getComputedStyle(host);
      acid = css.getPropertyValue("--color-acid").trim() || acid;
      amber = css.getPropertyValue("--color-amber").trim() || amber;
    };

    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(draw);
    };

    function draw(now: number) {
      raf = 0;
      ctx!.clearRect(0, 0, w, h);
      ctx!.font = `600 ${Math.round(CELL * 0.42)}px "JetBrains Mono", monospace`;
      ctx!.textAlign = "center";
      ctx!.textBaseline = "middle";
      const reach = Math.hypot(w, h);
      for (let i = waves.length - 1; i >= 0; i--) {
        if ((now - waves[i].t) * SPEED > reach + BAND) waves.splice(i, 1);
      }
      if (waves.length) {
        for (let cy = 0; cy < h; cy += CELL) {
          for (let cx = 0; cx < w; cx += CELL) {
            let a = 0;
            let isAmber = false;
            for (const wv of waves) {
              const d = Math.hypot(cx + CELL / 2 - wv.x, cy + CELL / 2 - wv.y);
              const off = d - (now - wv.t) * SPEED;
              // Dims with distance but never to zero, so the wave reaches every cell.
              const wa = Math.exp(-(off * off) / (BAND * BAND)) * (0.35 + 0.65 * (1 - d / reach));
              if (wa > a) {
                a = wa;
                isAmber = wv.amber;
              }
            }
            if (a > 0.02) {
              ctx!.fillStyle = isAmber ? amber : acid;
              ctx!.globalAlpha = a * 0.12;
              ctx!.fillRect(cx + 1, cy + 1, CELL - 1, CELL - 1);
              // A fresh glyph each frame, so the front flickers like the band below.
              ctx!.globalAlpha = Math.min(1, a * 0.9);
              ctx!.fillText(GLYPHS[(Math.random() * GLYPHS.length) | 0], cx + CELL / 2, cy + CELL / 2 + 1);
            }
          }
        }
        schedule();
      }
      if (hover) {
        ctx!.fillStyle = (hover[0] + 0.5) * CELL > w / 2 ? amber : acid;
        ctx!.globalAlpha = 0.14;
        ctx!.fillRect(hover[0] * CELL + 1, hover[1] * CELL + 1, CELL - 1, CELL - 1);
      }
      ctx!.globalAlpha = 1;
    }

    const resize = () => {
      w = host.clientWidth;
      h = host.clientHeight;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      schedule();
    };

    const cellAt = (e: MouseEvent): [number, number] => {
      const r = host.getBoundingClientRect();
      return [Math.floor((e.clientX - r.left) / CELL), Math.floor((e.clientY - r.top) / CELL)];
    };
    const onMove = (e: PointerEvent) => {
      const c = cellAt(e);
      if (hover?.[0] === c[0] && hover[1] === c[1]) return;
      hover = c;
      readColors();
      schedule();
    };
    const onLeave = () => {
      hover = null;
      schedule();
    };
    const onClick = (e: MouseEvent) => {
      // Controls and the console keep their own clicks. Scoped to the host: <html>
      // carries data-theme too, so an unscoped match would swallow every click.
      const hit = (e.target as Element).closest("a, button, input, [role='separator'], [data-theme='dark']");
      if (reduce || (hit && host.contains(hit))) return;
      readColors();
      const [col, row] = cellAt(e);
      const x = (col + 0.5) * CELL;
      // Left half is the IDE side (green), right half the engine side (amber).
      waves.push({ x, y: (row + 0.5) * CELL, t: performance.now(), amber: x > w / 2 });
      if (waves.length > MAX_WAVES) waves.shift();
      schedule();
    };

    const ro = new ResizeObserver(resize);
    ro.observe(host);
    host.addEventListener("pointermove", onMove);
    host.addEventListener("pointerleave", onLeave);
    host.addEventListener("click", onClick);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
      host.removeEventListener("click", onClick);
    };
  }, []);

  return <canvas ref={ref} aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full" />;
}
