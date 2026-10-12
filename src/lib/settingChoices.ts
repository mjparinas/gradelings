import type { ChildSettings } from "./model";

/**
 * The parent Settings page shows one choice where older versions had several switches. Each choice
 * reads and writes the fields devices already sync, so saved settings keep working without a migration
 * (the same approach as `timers.ts`).
 */

/** Sounds: everything, only the gentle ones (no fanfares, chimes or ticks), or none. Vibration follows. */
export type SoundChoice = "full" | "gentle" | "off";

export function soundChoice(s: Pick<ChildSettings, "sound" | "quietSounds">): SoundChoice {
  if (!s.sound) return "off";
  return s.quietSounds ? "gentle" : "full";
}

export function soundPatch(choice: SoundChoice): Partial<Pick<ChildSettings, "sound" | "quietSounds" | "haptics">> {
  if (choice === "off") return { sound: false, haptics: false };
  return { sound: true, quietSounds: choice === "gentle", haptics: true };
}

/** Arcade games: earned by learning, open any time (still capped per day), or off. */
export type GamesChoice = "earn" | "free" | "off";

export function gamesChoice(s: Pick<ChildSettings, "gamesEnabled" | "freePlay">): GamesChoice {
  if (!s.gamesEnabled) return "off";
  return s.freePlay ? "free" : "earn";
}

export function gamesPatch(choice: GamesChoice): Partial<Pick<ChildSettings, "gamesEnabled" | "freePlay">> {
  // Turning games off leaves free play alone, so turning them back on restores the earlier choice.
  if (choice === "off") return { gamesEnabled: false };
  return { gamesEnabled: true, freePlay: choice === "free" };
}

/** The options "Calm mode" turns on together. Each can still be changed under "Customize". */
const CALM_FIELDS = ["calmMotion", "quietSounds", "hideTimers", "quietToasts", "shortSessions"] as const;
type CalmField = (typeof CALM_FIELDS)[number];

export function calmOn(s: Partial<Pick<ChildSettings, CalmField>>): boolean {
  return CALM_FIELDS.every((f) => Boolean(s[f]));
}

export function calmPatch(on: boolean): Pick<ChildSettings, CalmField> {
  return Object.fromEntries(CALM_FIELDS.map((f) => [f, on])) as Pick<ChildSettings, CalmField>;
}

/** Vibration needs sound on (and motion not calmed). Older devices could turn it off separately. */
export function vibrationOn(s: Partial<Pick<ChildSettings, "sound" | "haptics" | "calmMotion">> | undefined): boolean {
  return s?.sound !== false && s?.haptics !== false && !s?.calmMotion;
}

/** Parent emails (account-level, not per child): the weekly summary, plus practice reminders if wanted. */
export type EmailChoice = "weekly" | "both" | "none";
export interface EmailPrefs {
  weeklyReport: boolean;
  practiceReminders: boolean;
}

/** `null` for reminders without the weekly summary, which only older versions could set; no option is shown as picked. */
export function emailChoice(p: EmailPrefs): EmailChoice | null {
  if (p.weeklyReport) return p.practiceReminders ? "both" : "weekly";
  return p.practiceReminders ? null : "none";
}

export function emailPatch(choice: EmailChoice): EmailPrefs {
  return { weeklyReport: choice !== "none", practiceReminders: choice === "both" };
}
