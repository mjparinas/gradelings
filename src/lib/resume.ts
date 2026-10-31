import { dayKey, type Mode } from "./model";

// A lesson left partway (the app closed, the tab went away, another player took over) can be finished
// later from the home screen. Every answer is already an event, so this only keeps the lesson's place:
// which lesson, how many questions were answered and which were right the first time. It lives on this
// device, per child, and goes when the lesson ends or the child taps Stop.

/** Modes with a fixed number of questions and no clock. Adventure is endless; Speed Run and Challenge are timed. */
export const RESUMABLE: readonly Mode[] = ["practice", "daily", "review", "facts"];

/** How long a lesson waits to be finished. */
export const RESUME_HOURS = 48;

export interface Unfinished {
  mode: Mode;
  scope: string;
  title: string;
  icon: string;
  /** First-try result of each question answered so far, in order. */
  results: boolean[];
  total: number;
  /** Time spent so far, so the lesson's minutes carry on from there. */
  ms: number;
  /** When it was last saved. */
  at: number;
}

const key = (profileId: string) => `grademap.resume.${profileId}`;

export function isResumable(mode: Mode): boolean {
  return RESUMABLE.includes(mode);
}

/** The saved lesson, if it is still worth finishing. */
export function validUnfinished(u: Unfinished | null | undefined, now: number): Unfinished | null {
  if (!u || !isResumable(u.mode) || !Array.isArray(u.results) || typeof u.total !== "number") return null;
  if (u.results.length === 0 || u.results.length >= u.total) return null;
  if (!(now - u.at >= 0 && now - u.at < RESUME_HOURS * 3600_000)) return null;
  // The Daily Challenge is a new set of questions tomorrow.
  if (u.mode === "daily" && dayKey(u.at) !== dayKey(now)) return null;
  return u;
}

export function loadUnfinished(profileId: string, now = Date.now()): Unfinished | null {
  try {
    const raw = localStorage.getItem(key(profileId));
    return raw ? validUnfinished(JSON.parse(raw) as Unfinished, now) : null;
  } catch {
    return null;
  }
}

export function saveUnfinished(profileId: string, u: Unfinished): void {
  try {
    localStorage.setItem(key(profileId), JSON.stringify(u));
  } catch {
    // Private mode or full storage: the lesson just can't be picked up later.
  }
}

export function clearUnfinished(profileId: string): void {
  try {
    localStorage.removeItem(key(profileId));
  } catch {
    // Nothing to clear.
  }
}

/** The saved lesson for this mode and scope, or null when the child is starting a different one. */
export function unfinishedFor(profileId: string, mode: Mode, scope: string, now = Date.now()): Unfinished | null {
  const u = loadUnfinished(profileId, now);
  return u && u.mode === mode && u.scope === scope ? u : null;
}

/** The session link that picks the lesson up again. */
export function resumeHref(u: Pick<Unfinished, "mode" | "scope">): string {
  return `#/session?mode=${u.mode}&scope=${encodeURIComponent(u.scope)}&resume=1`;
}
