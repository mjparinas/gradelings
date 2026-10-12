import type { ChildSettings } from "./model";

/**
 * The one "Timers in lessons" setting, stored in the two fields older devices already sync:
 * `hideTimers` (nothing shown) wins over `showTimer` (the elapsed clock), so every saved
 * combination keeps working without a migration.
 *
 * - `clock`: elapsed time in untimed modes and countdown numbers in Speed Run and Challenge.
 * - `countdown`: only the countdown numbers in Speed Run and Challenge (the little-kid default).
 * - `hidden`: no clocks, numbers, ticks or streak counter; timed modes show a quiet bar.
 */
export type TimerChoice = "clock" | "countdown" | "hidden";

export function timerChoice(s: Pick<ChildSettings, "showTimer" | "hideTimers"> | undefined): TimerChoice {
  if (s?.hideTimers) return "hidden";
  return s?.showTimer ? "clock" : "countdown";
}

export function timerPatch(choice: TimerChoice): Partial<Pick<ChildSettings, "showTimer" | "hideTimers">> {
  // Leave the clock choice alone so turning the calm options off brings it back.
  if (choice === "hidden") return { hideTimers: true };
  return { hideTimers: false, showTimer: choice === "clock" };
}
