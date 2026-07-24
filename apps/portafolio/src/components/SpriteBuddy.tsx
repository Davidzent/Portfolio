import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import { X } from "@phosphor-icons/react";
import walkUrl from "../assets/knight_walk.png";
import runUrl from "../assets/knight_run.png";
import idleUrl from "../assets/knight_idle.png";
import atkUrl from "../assets/knight_atk.png";
import stabUrl from "../assets/knight_stab.png";
import heartsUrl from "../assets/hearts.png";

/* Sheets are 128x32 = 4 frames of 32x32, upscaled with pixelated rendering. */
const FRAME = 32;
const SHEET = 128;
const FRAMES = 4;
const SCALE = 2.5;
const DISPLAY = FRAME * SCALE; // 80px on screen
const SHIFT = -SHEET * SCALE;

const MARGIN = 16; // gap from the viewport edge
const SPEED = 82; // px/s while rampaging
const RETURN_SPEED = 300; // px/s dashing back to its corner
const ALARM_MS = 30000; // how long a poke keeps it aggravated
const REACH = 24; // px within the cursor's x before it "arrives" and swings

/* hearts.png is 32x16 = two 16x16 frames: [0] filled (red), [1] empty. */
const MAX_HP = 3;
const HEART = 16;
const HEART_SHEET = 32;
const HEART_SCALE = 1.5;
const HEART_DISP = HEART * HEART_SCALE;

type Mode = "idle" | "walk" | "run" | "atk" | "stab";
const SHEETS: Record<Mode, { src: string; dur: number; loop: boolean }> = {
  idle: { src: idleUrl, dur: 1.0, loop: true },
  walk: { src: walkUrl, dur: 0.7, loop: true },
  run: { src: runUrl, dur: 0.4, loop: true },
  atk: { src: atkUrl, dur: 0.44, loop: false },
  stab: { src: stabUrl, dur: 0.44, loop: false },
};

type Phase = "idle" | "alarm" | "return";
const rand = (a: number, b: number) => a + Math.random() * (b - a);
const homeX = () => Math.max(MARGIN, window.innerWidth - DISPLAY - MARGIN);

/**
 * A knight that stands guard in the bottom-right corner, idle and facing left.
 * Poke it (click) and it goes into a 30s "alarm": it walks the width of the
 * page and swings its sword, then dashes back to its corner and settles down.
 * Each click also costs a heart; three kills it (removed, like the ✕). Revive
 * with the terminal `knight` command. Fixed to the viewport; hidden under
 * reduced motion.
 */
export function SpriteBuddy() {
  const reduce = useReducedMotion();
  const [dismissed, setDismissed] = useState(() => {
    try {
      return sessionStorage.getItem("buddy-dismissed") === "1";
    } catch {
      return false;
    }
  });
  const [mode, setMode] = useState<Mode>("idle");
  const [alarm, setAlarm] = useState(false);
  const [hp, setHp] = useState(MAX_HP);
  const [hidden, setHidden] = useState(
    () => typeof document !== "undefined" && document.body.style.overflow === "hidden",
  );

  const moverRef = useRef<HTMLDivElement>(null);
  const flipRef = useRef<HTMLDivElement>(null);

  const hpRef = useRef(MAX_HP);
  const modeRef = useRef<Mode>("idle");
  const phaseRef = useRef<Phase>("idle");
  const posRef = useRef(0);
  const dirRef = useRef(-1);
  const faceRef = useRef(-1); // -1 faces left, +1 faces right (art faces right)
  const alarmUntilRef = useRef(0);
  const attackUntilRef = useRef(0);
  const nextAttackRef = useRef(0);
  const cursorXRef = useRef(0);
  const rafRef = useRef(0);
  const startAlarmRef = useRef<(now: number) => void>(() => {});

  // Simulation: only runs while alarmed (walking/attacking) or dashing home.
  useEffect(() => {
    if (reduce || dismissed) return;
    const mover = moverRef.current;
    const flip = flipRef.current;
    if (!mover || !flip) return;

    if (phaseRef.current === "idle") {
      posRef.current = homeX();
      faceRef.current = -1;
    }
    let last = performance.now();

    const apply = () => {
      mover.style.transform = `translateX(${posRef.current}px)`;
      flip.style.transform = `scaleX(${faceRef.current})`;
    };
    apply();

    const setModeBoth = (m: Mode) => {
      modeRef.current = m;
      setMode(m);
    };
    const swing = (now: number) => {
      const pick: Mode = Math.random() < 0.5 ? "atk" : "stab";
      setModeBoth(pick);
      attackUntilRef.current = now + SHEETS[pick].dur * 1000;
    };

    const loop = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;

      if (phaseRef.current === "alarm") {
        if (now >= alarmUntilRef.current) {
          phaseRef.current = "return";
        } else if (modeRef.current === "atk" || modeRef.current === "stab") {
          if (now >= attackUntilRef.current) setModeBoth("walk");
        } else {
          // Chase the cursor's horizontal position; swing once arrived.
          const right = window.innerWidth - DISPLAY - MARGIN;
          const target = Math.min(right, Math.max(MARGIN, cursorXRef.current - DISPLAY / 2));
          const dx = target - posRef.current;
          if (Math.abs(dx) <= REACH) {
            const side = cursorXRef.current - (posRef.current + DISPLAY / 2);
            if (Math.abs(side) > 6) faceRef.current = side > 0 ? 1 : -1;
            if (now >= nextAttackRef.current) {
              swing(now);
              nextAttackRef.current = now + SHEETS.atk.dur * 1000 + rand(250, 550);
            } else if (modeRef.current !== "idle") {
              setModeBoth("idle");
            }
          } else {
            if (modeRef.current !== "walk") setModeBoth("walk");
            dirRef.current = dx > 0 ? 1 : -1;
            faceRef.current = dirRef.current;
            posRef.current += SPEED * dirRef.current * dt;
            if (posRef.current < MARGIN) posRef.current = MARGIN;
            else if (posRef.current > right) posRef.current = right;
          }
        }
      }

      if (phaseRef.current === "return") {
        if (modeRef.current !== "run") setModeBoth("run");
        const hx = homeX();
        const d = hx - posRef.current;
        if (Math.abs(d) <= RETURN_SPEED * dt + 1) {
          posRef.current = hx;
          faceRef.current = -1;
          setModeBoth("idle");
          setAlarm(false);
          phaseRef.current = "idle";
          apply();
          rafRef.current = 0;
          return; // settle: stop the loop
        }
        dirRef.current = d > 0 ? 1 : -1;
        faceRef.current = dirRef.current;
        posRef.current += RETURN_SPEED * dirRef.current * dt;
      }

      apply();
      rafRef.current = requestAnimationFrame(loop);
    };

    startAlarmRef.current = (now: number) => {
      alarmUntilRef.current = now + ALARM_MS;
      if (phaseRef.current !== "alarm") nextAttackRef.current = now + rand(400, 1000);
      phaseRef.current = "alarm";
      setAlarm(true);
      if (!rafRef.current) {
        last = now;
        rafRef.current = requestAnimationFrame(loop);
      }
    };

    if (!cursorXRef.current) cursorXRef.current = posRef.current + DISPLAY / 2;
    const onMove = (e: PointerEvent) => {
      cursorXRef.current = e.clientX;
    };
    const onResize = () => {
      if (phaseRef.current === "idle") {
        posRef.current = homeX();
        apply();
      }
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("resize", onResize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = 0;
    };
  }, [reduce, dismissed]);

  // Revive/respawn from the terminal `knight` command.
  useEffect(() => {
    const onRespawn = () => {
      try {
        sessionStorage.removeItem("buddy-dismissed");
      } catch {
        /* ignore */
      }
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = 0;
      }
      hpRef.current = MAX_HP;
      modeRef.current = "idle";
      phaseRef.current = "idle";
      posRef.current = homeX();
      faceRef.current = -1;
      if (moverRef.current) moverRef.current.style.transform = `translateX(${posRef.current}px)`;
      if (flipRef.current) flipRef.current.style.transform = "scaleX(-1)";
      setHp(MAX_HP);
      setMode("idle");
      setAlarm(false);
      setDismissed(false);
    };
    window.addEventListener("buddy:respawn", onRespawn);
    return () => window.removeEventListener("buddy:respawn", onRespawn);
  }, []);

  // Stand down while a modal scroll-locks the body.
  useEffect(() => {
    const mo = new MutationObserver(() =>
      setHidden(document.body.style.overflow === "hidden"),
    );
    mo.observe(document.body, { attributes: true, attributeFilter: ["style"] });
    return () => mo.disconnect();
  }, []);

  const dismiss = () => {
    setDismissed(true);
    try {
      sessionStorage.setItem("buddy-dismissed", "1");
    } catch {
      /* private mode: back next reload, harmless */
    }
  };

  // A click is a hit: costs a heart and provokes/refreshes the 30s alarm. The
  // third hit kills it.
  const hit = (e: React.MouseEvent) => {
    cursorXRef.current = e.clientX;
    const next = hpRef.current - 1;
    hpRef.current = Math.max(0, next);
    setHp(hpRef.current);
    if (next <= 0) {
      dismiss();
      return;
    }
    startAlarmRef.current(performance.now());
  };

  if (reduce || dismissed) return null;
  const sheet = SHEETS[mode];

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-3 z-40 select-none sm:bottom-4">
      <div
        ref={moverRef}
        className="group pointer-events-auto absolute bottom-0 left-0 cursor-pointer transition-opacity duration-300"
        style={{ width: DISPLAY, height: DISPLAY, opacity: hidden ? 0 : 1, willChange: "transform" }}
        onClick={hit}
      >
        <div
          className="pointer-events-none absolute left-1/2 flex -translate-x-1/2 gap-0.5"
          style={{ bottom: DISPLAY + 3 }}
          aria-hidden="true"
        >
          {Array.from({ length: MAX_HP }).map((_, i) => (
            <span
              key={i}
              className="buddy-sprite block"
              style={{
                width: HEART_DISP,
                height: HEART_DISP,
                backgroundImage: `url(${heartsUrl})`,
                backgroundSize: `${HEART_SHEET * HEART_SCALE}px ${HEART * HEART_SCALE}px`,
                backgroundPosition: `${i < hp ? 0 : -HEART * HEART_SCALE}px 0`,
              }}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            dismiss();
          }}
          aria-label="Dismiss the page guardian"
          className="absolute -right-1 -top-1 z-10 grid h-5 w-5 place-items-center rounded-full border border-white/20 bg-void/80 text-faint opacity-50 backdrop-blur transition-opacity hover:text-acid group-hover:opacity-100 focus-visible:opacity-100"
        >
          <X size={11} weight="bold" />
        </button>

        <div ref={flipRef} className="h-full w-full" aria-hidden="true">
          <div
            key={mode}
            className="buddy-sprite h-full w-full"
            style={{
              backgroundImage: `url(${sheet.src})`,
              backgroundSize: `${SHEET * SCALE}px ${FRAME * SCALE}px`,
              ["--sheet-shift" as string]: `${SHIFT}px`,
              animation: `sprite-run ${sheet.dur}s steps(${FRAMES}) ${sheet.loop ? "infinite" : "1"}`,
              filter: alarm ? "drop-shadow(0 0 5px rgba(255,74,42,0.9))" : "none",
            }}
          />
        </div>
      </div>
    </div>
  );
}
