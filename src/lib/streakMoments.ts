// Big streak days get their own little celebration. Read from the derived streak, so nothing is stored.

export const STREAK_MILESTONES = [7, 14, 30, 50, 100, 200, 365] as const;

export interface StreakMoment {
  days: number;
  title: string;
  line: string;
}

/** The biggest milestone passed when a streak grew from `before` to `after` days, if any. */
export function streakMoment(before: number, after: number): StreakMoment | undefined {
  if (after <= before) return undefined;
  const hit = [...STREAK_MILESTONES].reverse().find((m) => before < m && after >= m);
  if (!hit) return undefined;
  const line =
    hit >= 100
      ? "That's a real habit. Your buddy is so proud!"
      : hit >= 30
        ? "A whole month of showing up. Wow!"
        : "A whole week of learning. Keep it going!";
  return { days: hit, title: `${hit}-day streak! 🔥`, line };
}

const BACK_SOON = [
  "Welcome back, {name}! I saved your spot.",
  "{name}! I'm so happy you're here.",
  "Hi, {name}! Ready for a new adventure?",
];

/** A greeting for a child who has been away `daysAway` whole days. Always warm, never about what was lost. */
export function welcomeBack(name: string, daysAway: number, roll = Math.random()): string | undefined {
  if (daysAway < 2) return undefined;
  const pool =
    daysAway >= 14
      ? ["{name}! I missed you so much! 🎉", "You're back, {name}! Let's catch up!"]
      : daysAway >= 5
        ? ["I missed you, {name}! Let's play.", "{name}! It's been a few days. Hooray!"]
        : BACK_SOON;
  return pool[Math.min(pool.length - 1, Math.floor(roll * pool.length))].replace("{name}", name);
}
