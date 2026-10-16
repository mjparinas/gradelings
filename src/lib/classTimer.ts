// The class timer: a teacher starts a countdown for the class ("Silent reading, 10 minutes") and it shows on
// the teacher's screen and on every student's screen while their device is online. It is a plain countdown:
// it never locks anything, never changes practice, levels or reports, and nothing about a child is stored.

/** Quick choices in minutes. */
export const TIMER_PRESETS = [1, 2, 3, 5, 10, 15, 20, 30] as const;
/** The longest a class timer can run, in minutes. */
export const TIMER_MAX_MINUTES = 120;
/** Longest note on a timer ("Silent reading"). */
export const TIMER_LABEL_MAX = 40;
/** How much "Add a minute" adds. */
export const TIMER_ADD_MS = 60_000;
/** A finished timer keeps saying "Time's up" for this long, then goes away on its own. */
export const TIMER_DONE_SHOW_MS = 5 * 60_000;
/** A paused timer nobody resumed goes away after this long. */
export const TIMER_PAUSED_KEEP_MS = 3 * 3_600_000;
/** How often a child's device asks for the timer while one is showing, and while none is. */
export const TIMER_POLL_OPEN_MS = 5_000;
export const TIMER_POLL_IDLE_MS = 15_000;
/** How often the teacher's screen refreshes it. */
export const TIMER_POLL_TEACHER_MS = 5_000;

/**
 * A timer as sent to a device. `left` is how long was left when the server answered; a device works out its
 * own end time from when the answer arrived, so a wrong clock on the device doesn't matter.
 */
export interface ClassTimer {
  label: string;
  /** What the teacher first set, in milliseconds (the bar's full length). */
  totalMs: number;
  /** Milliseconds left when sent (0 once finished). */
  left: number;
  running: boolean;
}

export const timerMinutes = (m: unknown): number | null => (typeof m === "number" && Number.isInteger(m) && m >= 1 && m <= TIMER_MAX_MINUTES ? m : null);

/** A teacher's note, cleaned: no control characters, one line, short. */
export function cleanTimerLabel(raw: unknown): string {
  return typeof raw === "string" ? raw.replace(/[\u0000-\u001f\u007f]/g, " ").replace(/\s+/g, " ").trim().slice(0, TIMER_LABEL_MAX) : "";
}

/** "4:05", or "1:02:03" past an hour. Rounds up, so the last second shows 0:01 and 0:00 means done. */
export function formatClock(ms: number): string {
  const total = Math.max(0, Math.ceil(ms / 1000));
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  const two = (n: number) => String(n).padStart(2, "0");
  return h > 0 ? `${h}:${two(m)}:${two(s)}` : `${m}:${two(s)}`;
}

/** Milliseconds left now, for a timer received at `receivedAt`. */
export function timeLeft(t: Pick<ClassTimer, "left" | "running">, receivedAt: number, now: number): number {
  return t.running ? Math.max(0, t.left - (now - receivedAt)) : t.left;
}
