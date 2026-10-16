import { countryOf, type CountryCode } from "./country";

// Browser calls for classroom mode (teachers and parents). All need a connection and a signed-in account.

/**
 * Shown to a teacher with a class on a US curriculum. In the US a school can consent for an educational service on
 * parents' behalf (a school official under FERPA, school authorization under COPPA), so student accounts skip the
 * parent consent step.
 */
export const US_CLASS_CONSENT =
  "In the US, your school gives consent for this classroom use on parents' behalf: we act as a school official under FERPA, and your school authorizes student accounts under COPPA.";

/** Whether a class follows a US curriculum, so the school-consent line applies. */
export const isUsClass = (framework: { country: CountryCode }) => countryOf(framework).parentalConsent;

export interface ClassSummary {
  id: string;
  name: string;
  grade: string;
  framework: string;
  joinCode: string;
  students: number;
  /** Owner of the class, or a co-teacher the owner invited. Older responses omit it (owner). */
  role?: "owner" | "co-teacher";
}

export interface TeacherEntry {
  id: string;
  email: string;
  role: "owner" | "co-teacher";
}

export interface ClassInvite {
  classId: string;
  name: string;
  grade: string;
  framework: string;
  from: string;
  createdAt: number;
}

export interface StudentRow {
  profileId: string;
  name: string;
  avatar: string;
  grade: string;
  lastActive: number | null;
  /** `done`: questions answered on the unit since it was assigned (homework). Older servers omit it. */
  units: { key: string; level: number; attempts: number; accuracy: number; done?: number; assigned?: boolean }[];
}

export interface RosterEntry {
  id: string;
  profileId: string;
  loginCode: string;
}

export interface ClassLink {
  classId: string;
  profileId: string;
  className: string;
  grade: string;
}

/** Units a teacher assigned to one child, as sent down by sync and kept on the device for offline use. */
export interface Classwork {
  profileId: string;
  classId: string;
  className: string;
  unitKeys: string[];
  /** Due dates (ms since epoch) by unit key, for the units that have one. */
  due?: Record<string, number>;
  /** Homework: how many questions the teacher asked for, by unit key. Units without one are done at Proficient. */
  goal?: Record<string, number>;
  /** When each unit was assigned (ms since epoch), so homework counts only questions answered since. */
  since?: Record<string, number>;
}

/** The question counts a teacher can ask for on a homework unit. */
export const HOMEWORK_GOALS = [5, 10, 15, 20, 30] as const;

/**
 * Questions answered on a unit since it was assigned, in any mode, right or not: homework asks for
 * practice, not a score. Read from events, so a child's device counts it offline and the server
 * counts the same events once they sync.
 */
export function homeworkDone(events: readonly { type: string; unit?: string; t: number }[], unitKey: string, since: number): number {
  let n = 0;
  for (const e of events) if (e.type === "answer" && e.unit === unitKey && e.t >= since) n++;
  return n;
}

export async function call<T>(url: string, method = "GET", body?: unknown): Promise<T> {
  let res: Response;
  try {
    res = await fetch(url, {
      method,
      credentials: "same-origin",
      headers: body === undefined ? undefined : { "content-type": "application/json" },
      body: body === undefined ? undefined : JSON.stringify(body),
    });
  } catch {
    throw new Error("You’re offline. Connect to the internet and try again.");
  }
  const data = (await res.json().catch(() => ({}))) as T & { error?: string };
  if (!res.ok) throw new Error(data.error ?? `Something went wrong (${res.status}).`);
  return data;
}

// ---------- What a teacher should look at next ----------

/** Fewer attempts than this say too little to call a unit tricky for a student. */
export const MIN_ATTEMPTS = 4;
/** First-try accuracy under this on a unit means the student may want a hand with it. */
export const NEEDS_HAND_BELOW = 0.6;
const WEEK = 7 * 86_400_000;

export interface UnitInsight {
  key: string;
  /** Students with any practice on this unit. */
  started: number;
  notStarted: number;
  /** Students who reached Proficient or higher (level 2+). */
  proficient: number;
  /** Students with enough attempts and low first-try accuracy. */
  needHand: string[];
  /** First-try accuracy across everyone's attempts, or null when nobody has started. */
  accuracy: number | null;
}

export interface StudentInsight {
  profileId: string;
  name: string;
  /** Plain-language reasons, ready to show. */
  reasons: string[];
}

export interface ClassInsights {
  units: UnitInsight[];
  /** Units where a good share of the students who tried it are finding it tricky, trickiest first. */
  focusUnits: UnitInsight[];
  /** Students to check in with: tricky units, or no practice for a week. */
  checkIn: StudentInsight[];
}

/** Turns the class table into "reteach this" and "check in with these students". Practice only, never a mark. */
export function classInsights(students: StudentRow[], assignments: string[], unitName: (key: string) => string, now = Date.now()): ClassInsights {
  const units: UnitInsight[] = assignments.map((key) => {
    let attempts = 0;
    let right = 0;
    const row: UnitInsight = { key, started: 0, notStarted: 0, proficient: 0, needHand: [], accuracy: null };
    for (const s of students) {
      const u = s.units.find((x) => x.key === key);
      // A unit the teacher gave to other students says nothing about this one.
      if (u?.assigned === false) continue;
      if (!u || u.attempts === 0) {
        row.notStarted++;
        continue;
      }
      row.started++;
      attempts += u.attempts;
      right += u.accuracy * u.attempts;
      if (u.level >= 2) row.proficient++;
      if (u.attempts >= MIN_ATTEMPTS && u.accuracy < NEEDS_HAND_BELOW) row.needHand.push(s.profileId);
    }
    row.accuracy = attempts ? right / attempts : null;
    return row;
  });
  const focusUnits = units
    .filter((u) => u.needHand.length > 0 && u.needHand.length / u.started >= 0.3)
    .sort((a, b) => b.needHand.length / b.started - a.needHand.length / a.started || b.needHand.length - a.needHand.length);
  const checkIn: StudentInsight[] = [];
  for (const s of students) {
    const reasons: string[] = [];
    const tricky = units.filter((u) => u.needHand.includes(s.profileId)).map((u) => unitName(u.key));
    if (tricky.length) reasons.push(`Finding ${tricky.slice(0, 2).join(" and ")}${tricky.length > 2 ? ` and ${tricky.length - 2} more` : ""} tricky`);
    const hasWork = assignments.length > 0 && (s.units.length === 0 || s.units.some((u) => u.assigned !== false));
    if (hasWork && (s.lastActive === null || now - s.lastActive > WEEK)) reasons.push(s.lastActive === null ? "Hasn’t started yet" : "No practice this week");
    if (reasons.length) checkIn.push({ profileId: s.profileId, name: s.name, reasons });
  }
  return { units, focusUnits, checkIn };
}
