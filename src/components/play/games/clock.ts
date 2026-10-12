import { pick, randInt } from "@/content/random";
import type { GradeId } from "@/content/types";

// Clock Catch: which times each grade reads on an analogue clock.

export interface ClockTime {
  hour: number;
  minute: number;
}

export interface ClockRound {
  target: ClockTime;
  title: string;
  speak: string;
}

const G: Partial<Record<GradeId, number>> = { "1": 1, "2": 2, "3": 3, "4": 4 };

/** The minutes a grade works with: o'clock and half past, then quarters, then fives, then any minute. */
export function clockMinutes(grade: GradeId): number[] {
  const g = G[grade] ?? 4;
  if (g <= 1) return [0, 30];
  if (g === 2) return [0, 15, 30, 45];
  if (g === 3) return Array.from({ length: 12 }, (_, i) => i * 5);
  return Array.from({ length: 60 }, (_, i) => i);
}

export function digital({ hour, minute }: ClockTime): string {
  return `${hour}:${String(minute).padStart(2, "0")}`;
}

/** How the time is said aloud and shown in words for younger readers. */
export function inWords({ hour, minute }: ClockTime): string {
  const next = hour === 12 ? 1 : hour + 1;
  if (minute === 0) return `${hour} o'clock`;
  if (minute === 30) return `half past ${hour}`;
  if (minute === 15) return `quarter past ${hour}`;
  if (minute === 45) return `quarter to ${next}`;
  return digital({ hour, minute });
}

export const sameTime = (a: ClockTime, b: ClockTime) => a.hour === b.hour && a.minute === b.minute;

export function randomTime(grade: GradeId): ClockTime {
  return { hour: randInt(1, 12), minute: pick(clockMinutes(grade)) };
}

export function clockRound(grade: GradeId): ClockRound {
  const target = randomTime(grade);
  const g = G[grade] ?? 4;
  const words = inWords(target);
  const title = g <= 2 && words !== digital(target) ? `Catch ${digital(target)} (${words})` : `Catch ${digital(target)}`;
  return { target, title, speak: `Catch the clocks that show ${words}` };
}

/**
 * A wrong time for a falling clock. Often a near miss (the hands swapped, the hour next door,
 * another minute), so reading both hands matters.
 */
export function decoyTime(grade: GradeId, target: ClockTime): ClockTime {
  const minutes = clockMinutes(grade);
  for (let i = 0; i < 50; i++) {
    const kind = randInt(0, 3);
    let t: ClockTime;
    if (kind === 0) t = { hour: (target.hour % 12) + 1, minute: target.minute };
    else if (kind === 1) t = { hour: target.hour, minute: pick(minutes) };
    else if (kind === 2) {
      // Hands swapped: the hour hand where the minute hand was.
      const hour = target.minute === 0 ? 12 : Math.round(target.minute / 5) || 12;
      const minute = (target.hour % 12) * 5;
      t = { hour, minute: minutes.includes(minute) ? minute : pick(minutes) };
    } else t = randomTime(grade);
    if (!sameTime(t, target)) return t;
  }
  return { hour: (target.hour % 12) + 1, minute: target.minute };
}

/** Angles in degrees from 12 o'clock, clockwise. The hour hand moves between the hours. */
export function handAngles({ hour, minute }: ClockTime): { hour: number; minute: number } {
  return { hour: ((hour % 12) + minute / 60) * 30, minute: minute * 6 };
}
