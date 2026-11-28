import type { HomeworkItem } from "./homework";
import type { PushMessage } from "@/server/push";

// What a notification says. Short, kind and about practice: no child's results, no pressure, no "you missed".
// Parents' messages name the child by first name (like the emails); a child's own message never names anyone.

const DAY = 86_400_000;

/** At most one notification this often, per kind of device. */
export const PUSH_GAP_DAYS = { weekly: 6, reminder: 6, child: 3 } as const;

/** Whole UTC days between two YYYY-MM-DD days (Infinity when there was none). */
export function daysBetween(from: string | null | undefined, to: string): number {
  if (!from) return Infinity;
  return Math.round((Date.parse(`${to}T00:00:00Z`) - Date.parse(`${from}T00:00:00Z`)) / DAY);
}

export function weeklyMessage(names: readonly string[]): PushMessage {
  const who = names.length === 1 ? `${names[0]}'s week` : "This week";
  return { title: "Your weekly summary is ready", body: `${who} in Gradelings, at a glance.`, url: "/parents/#/reports", tag: "weekly", badge: 0 };
}

export function reminderMessage(quiet: readonly { name: string; daysQuiet: number }[]): PushMessage {
  const names = quiet.map((q) => q.name);
  const list = names.length <= 2 ? names.join(" and ") : `${names[0]} and ${names.length - 1} more`;
  return { title: "A little practice today?", body: `${list} ${names.length === 1 ? "hasn't" : "haven't"} practised for a few days. Even 10 minutes helps.`, url: "/parents/", tag: "reminder", badge: 0 };
}

/** The unfinished homework worth a nudge: past due, or due in the next two days, or with no date at all. */
export function homeworkWaiting(items: readonly HomeworkItem[], now: number): HomeworkItem[] {
  return items.filter((h) => !h.done && (h.dueAt === undefined || h.dueAt - now <= 2 * DAY));
}

export function childMessage(waiting: number, unitTitle: string | undefined): PushMessage {
  const body = waiting === 1 && unitTitle ? `Your teacher has ${unitTitle} waiting. Try it when you're ready!` : `Your teacher has ${waiting} things waiting. Try one when you're ready!`;
  return { title: "Homework is waiting", body, url: "/play/", tag: "homework", badge: waiting };
}

/** Streak lengths a parent hears about. Rare on purpose: a note on a day, never a drumbeat. */
export const CHEER_STREAKS = [3, 7, 14, 30, 50, 100] as const;

/** The streak to cheer for a child today: exactly a milestone, and practised today (so it is a "well done", never a "keep it up"). */
export function cheerStreak(streak: { current: number; activeToday: boolean }): number | undefined {
  return streak.activeToday && (CHEER_STREAKS as readonly number[]).includes(streak.current) ? streak.current : undefined;
}

/** One kind line to a parent about the child with the longest milestone streak today. */
export function cheerMessage(cheers: readonly { name: string; days: number }[]): PushMessage | undefined {
  const top = [...cheers].sort((a, b) => b.days - a.days)[0];
  if (!top) return undefined;
  return { title: `${top.name} is on a ${top.days}-day streak 🎉`, body: "A high-five or a kind word goes a long way.", url: "/parents/", tag: "cheer", badge: 0 };
}
