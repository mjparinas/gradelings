"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { CritterSvg, type Mood } from "./CritterArt";

export * from "./CritterArt";

const MOOD_MOTION: Record<Mood, string> = {
  happy: "animate-float",
  wave: "animate-float",
  think: "animate-float",
  cheer: "animate-cheer",
  oops: "",
  sleepy: "animate-float",
};

/** A mascot that floats, reacts to answers and watches your finger. */
export function Critter({ id = "ollie", mood = "happy", size = 120, className = "", stage = 1 }: { id?: string; mood?: Mood; size?: number; className?: string; stage?: number }) {
  const ref = useRef<HTMLDivElement>(null);

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
      <CritterSvg id={id} mood={mood} stage={stage} />
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
