"use client";

import { useEffect, useEffectEvent, useState } from "react";
import { burstFrom, floatText } from "@/lib/juice";
import { sounds } from "@/lib/sound";
import type { GameProps } from "./types";

// Shared pieces for the tap-to-answer games (Map Dash, Timeline Snap, Coin Shop, Equation Tower,
// Word Bridge): score, lives and level, a per-question timer, number keys and the hearts row.

export const START_LIVES = 3;

/** Score, lives and level for one game, reported up to the arcade screen. */
export function useRun({ onScore, onLevel, onOver }: Pick<GameProps, "onScore" | "onLevel" | "onOver">, perLevel = 8) {
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(START_LIVES);
  const [right, setRight] = useState(0);
  const level = 1 + Math.floor(right / perLevel);

  useEffect(() => onScore(score), [score, onScore]);
  useEffect(() => onLevel(level), [level, onLevel]);
  useEffect(() => {
    if (lives > 0) return;
    const t = setTimeout(onOver, 700);
    return () => clearTimeout(t);
  }, [lives, onOver]);

  return {
    score,
    lives,
    level,
    right,
    over: lives <= 0,
    /** A right answer: points, a burst and a floating "+n". */
    win(points: number, from?: HTMLElement | null) {
      sounds.pop(4);
      if (from) {
        burstFrom(from, 12);
        floatText(from, `+${points}`);
      }
      setScore((s) => s + points);
      setRight((r) => r + 1);
    },
    /** A wrong answer or a timeout: a soft sound and one heart. */
    miss(from?: HTMLElement | null, text?: string) {
      sounds.boop();
      if (from && text) floatText(from, text, "#e57a12");
      setLives((l) => l - 1);
    },
    /** Bonus points with no "right answer" counted (a finished set, few coins). */
    bonus(points: number) {
      setScore((s) => s + points);
    },
  };
}

/**
 * Seconds left on the current question. `key` restarts it; `onEnd` runs once when it reaches 0.
 * Paused while the page is hidden, so switching apps doesn't cost a heart.
 */
export function useCountdown(seconds: number, key: string | number, onEnd: () => void, paused = false): number {
  const [left, setLeft] = useState({ key, value: seconds });
  const value = left.key === key ? left.value : seconds;
  const end = useEffectEvent(onEnd);
  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => {
      if (typeof document !== "undefined" && document.visibilityState === "hidden") return;
      setLeft((l) => {
        const v = (l.key === key ? l.value : seconds) - 0.1;
        return { key, value: Math.max(0, Math.round(v * 10) / 10) };
      });
    }, 100);
    return () => clearInterval(t);
  }, [key, seconds, paused]);
  useEffect(() => {
    if (!paused && left.key === key && left.value <= 0) end();
  }, [left, key, paused]);
  return value;
}

/** Number keys 1–9 pick a choice, as they do in lessons. */
export function useNumberKeys(count: number, onPick: (index: number) => void, enabled = true) {
  const pick = useEffectEvent(onPick);
  useEffect(() => {
    if (!enabled) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.altKey || e.ctrlKey || e.metaKey) return;
      const n = Number(e.key);
      if (Number.isInteger(n) && n >= 1 && n <= count) {
        e.preventDefault();
        pick(n - 1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [count, enabled]);
}

export function Hearts({ lives }: { lives: number }) {
  return (
    <p className="text-2xl" aria-label={`${Math.max(0, lives)} lives`}>
      {"❤️".repeat(Math.max(0, lives))}
      <span className="opacity-30">{"🤍".repeat(Math.max(0, START_LIVES - lives))}</span>
    </p>
  );
}

/** A thin bar showing the time left on a question. */
export function TimerBar({ left, total }: { left: number; total: number }) {
  const pct = Math.max(0, Math.min(100, (left / total) * 100));
  return (
    <div className="progress-track h-3 w-full overflow-hidden rounded-full bg-white/70" role="progressbar" aria-label="Time left" aria-valuemin={0} aria-valuemax={Math.round(total)} aria-valuenow={Math.ceil(left)}>
      <div className={`progress-fill h-full rounded-full ${pct < 30 ? "bg-nudge" : "bg-[#2a78d6]"}`} style={{ width: `${pct}%` }} />
    </div>
  );
}

/** Seconds per question: more for little kids, fewer as the level climbs (never under a floor). */
export function questionSeconds(band: GameProps["band"], level: number, base = 12, floor = 5): number {
  const start = band === "little" ? base * 1.5 : band === "middle" ? base * 1.2 : base;
  return Math.max(floor, Math.round(start - (level - 1) * 1.5));
}
