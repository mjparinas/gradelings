import { HOLIDAYS, type HolidayId } from "./holidays";
import { seasonOn } from "./seasons";

// A few drifting emoji behind the page during a holiday or seasonal festival (leaves, snow, hearts, lanterns).
// Decoration only: it is hidden in calm mode and with reduced motion (globals.css), takes no taps and is never stored.

/** The emoji to drift on a day, or none. A holiday wins over a festival. */
export function ambientEmoji(day: string, holiday: HolidayId | null): string | null {
  if (holiday) return HOLIDAYS.find((h) => h.id === holiday)?.emoji ?? null;
  return seasonOn(day)?.season.emoji ?? null;
}

export interface Particle {
  left: string;
  size: number;
  duration: number;
  delay: number;
}

/** Seven particles spread across the width, each at its own speed so they never move in step. */
export const PARTICLES: Particle[] = [8, 22, 35, 50, 64, 78, 91].map((x, i) => ({
  left: `${x}%`,
  size: 22 + ((i * 7) % 5) * 4,
  duration: 16 + ((i * 5) % 7) * 2,
  delay: -((i * 3.7) % 14),
}));
