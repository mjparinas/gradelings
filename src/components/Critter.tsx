"use client";

import { useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from "react";
import { currentHoliday, type HolidayId } from "@/lib/holidays";
import { CritterDrawing, type Mood } from "./CritterArt";

export * from "./CritterArt";

const noSubscribe = () => () => {};

/**
 * A character wearing the current holiday's hat. The theme is set from the device's date in the browser, so the hat
 * is chosen after hydration (the server snapshot is "no hat") to match the prerendered page. Pass `holiday`
 * (or null) to choose one outright.
 */
export function CritterSvg({ holiday, ...rest }: { id: string; mood?: Mood; stage?: number; holiday?: HolidayId | null }) {
  const live = useSyncExternalStore(noSubscribe, currentHoliday, () => null);
  return <CritterDrawing {...rest} holiday={holiday === undefined ? live : holiday} />;
}

const MOOD_MOTION: Record<Mood, string> = {
  happy: "animate-float",
  wave: "animate-float",
  think: "animate-float",
  cheer: "animate-cheer",
  oops: "",
  sleepy: "animate-float",
};

/** Things a buddy does now and then when idle. */
export const IDLE_MOVES = ["animate-idle-hop", "animate-idle-tilt", "animate-idle-stretch", "animate-idle-spin"] as const;

/** Whether idle motion is allowed right now (not reduced motion, not calm mode). */
function motionAllowed(): boolean {
  if (typeof window === "undefined") return false;
  if (document.documentElement.classList.contains("calm")) return false;
  return !window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
}

/** The next idle move after `last`, and how long to wait before it (6 to 14 s). */
export function nextIdle(last: number, roll: () => number = Math.random): { move: number; wait: number } {
  const move = (last + 1 + Math.floor(roll() * (IDLE_MOVES.length - 1))) % IDLE_MOVES.length;
  return { move, wait: 6000 + Math.floor(roll() * 8000) };
}

/** A mascot that floats, reacts to answers and watches your finger. */
export function Critter({ id = "ollie", mood = "happy", size = 120, className = "", stage = 1 }: { id?: string; mood?: Mood; size?: number; className?: string; stage?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [idle, setIdle] = useState<string>("");
  const resting = mood === "happy" || mood === "think";

  // Now and then a resting buddy hops, tilts, stretches or spins.
  useEffect(() => {
    if (!resting) return;
    let last = -1;
    let timer = 0;
    const schedule = () => {
      const { move, wait } = nextIdle(last);
      timer = window.setTimeout(() => {
        if (motionAllowed() && !document.hidden) {
          last = move;
          setIdle(IDLE_MOVES[move]);
          timer = window.setTimeout(() => { setIdle(""); schedule(); }, 1300);
        } else schedule();
      }, wait);
    };
    schedule();
    return () => window.clearTimeout(timer);
  }, [resting]);

  useEffect(() => {
    let frame = 0;
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2);
        const dy = e.clientY - (r.top + r.height * 0.42);
        const dist = Math.max(1, Math.hypot(dx, dy));
        const pull = Math.min(1, dist / 160);
        el.style.setProperty("--look-x", ((dx / dist) * pull).toFixed(2));
        el.style.setProperty("--look-y", ((dy / dist) * pull).toFixed(2));
      });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onMove);
    };
  }, []);

  return (
    <div ref={ref} key={mood} className={`shrink-0 ${MOOD_MOTION[mood]} ${className}`} style={{ width: size, height: size }}>
      <div className={`h-full w-full ${resting ? idle : ""}`}>
        <CritterSvg id={id} mood={mood} stage={stage} />
      </div>
    </div>
  );
}

export function SpeechBubble({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`relative card px-5 py-4 ${className}`}>
      <span
        aria-hidden="true"
        className="absolute -left-[13px] top-8 h-5 w-5 rotate-45 bg-white"
        style={{ borderLeft: "3px solid var(--color-line)", borderBottom: "3px solid var(--color-line)" }}
      />
      {children}
    </div>
  );
}
