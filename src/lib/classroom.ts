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
  /** The second grade of a split class. */
  grade2?: string | null;
  framework: string;
  joinCode: string;
  students: number;
  /** Owner of the class, or a co-teacher the owner invited. Older responses omit it (owner). */
  role?: "owner" | "co-teacher";
  /** Hidden from this teacher's class list (saved on their account). */
  hidden?: boolean;
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

/** Ten-character login codes sign in on their own; older eight-character ones need the class code too. */
export const isOneCode = (code: string): boolean => code.length === 10;

/** A one-code login as printed: two groups of five, easier for a child to copy ("KM7PQ-R3XTA"). */
export const showLoginCode = (code: string): string => (isOneCode(code) ? `${code.slice(0, 5)}-${code.slice(5)}` : code);

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

/** One question a class missed: how many students got it wrong on the first try, out of how many saw it. */
export interface MissedQuestion {
  q: string;
  missed: number;
  tried: number;
}

/** What one student did with each labelled question on the assigned units: true when they missed it on the first try at least once. */
export function studentQuestions(
  events: readonly { type: string; unit?: string; t: number; q?: string; correct?: boolean | number }[],
  since: Record<string, number>,
): Record<string, Record<string, boolean>> {
  const out: Record<string, Record<string, boolean>> = {};
  for (const e of events) {
    if (e.type !== "answer" || !e.unit || typeof e.q !== "string" || !e.q || !(e.unit in since) || e.t < since[e.unit]) continue;
    const q = e.q.slice(0, 80);
    const unit = (out[e.unit] ??= {});
    unit[q] = (unit[q] ?? false) || e.correct === false;
  }
  return out;
}

/**
 * Per unit, the questions the most students missed on the first try (at least `minStudents` of them),
 * worst first. Built from each student's `studentQuestions`; a question counts once per student.
 */
export function mostMissed(perStudent: readonly Record<string, Record<string, boolean>>[], limit = 3, minStudents = 2): Record<string, MissedQuestion[]> {
  const tally = new Map<string, Map<string, MissedQuestion>>();
  for (const student of perStudent) {
    for (const [unit, qs] of Object.entries(student)) {
      const byQ = tally.get(unit) ?? new Map<string, MissedQuestion>();
      tally.set(unit, byQ);
      for (const [q, missed] of Object.entries(qs)) {
        const row = byQ.get(q) ?? { q, missed: 0, tried: 0 };
        row.tried++;
        if (missed) row.missed++;
        byQ.set(q, row);
      }
    }
  }
  const out: Record<string, MissedQuestion[]> = {};
  for (const [unit, byQ] of tally) {
    const top = [...byQ.values()].filter((r) => r.missed >= minStudents).sort((a, b) => b.missed - a.missed || b.missed / b.tried - a.missed / a.tried || a.q.localeCompare(b.q)).slice(0, limit);
    if (top.length) out[unit] = top;
  }
  return out;
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
  if (!res.ok) throw Object.assign(new Error(data.error ?? `Something went wrong (${res.status}).`), { data });
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

// ---------- Homework overview ----------

/** A student counts as done with a unit once they've answered the number of questions asked, or, with none asked, reached Proficient (level 2). */
export function isHomeworkDone(unit: StudentRow["units"][number], goal?: number): boolean {
  return goal ? (unit.done ?? 0) >= goal : unit.level >= 2;
}

export interface HomeworkStatus {
  key: string;
  /** Students the unit is for. */
  assigned: number;
  done: number;
  /** Names of students it is for who haven't finished it. */
  behind: string[];
  /** Past the due date with some students still to finish. */
  overdue: boolean;
}

/** For each assigned unit: how many students are done, who isn't, and whether it is past due. Practice only, never a mark. */
export function homeworkOverview(students: StudentRow[], assignments: string[], due: Record<string, number>, goal: Record<string, number>, now = Date.now()): HomeworkStatus[] {
  return assignments.map((key) => {
    const mine = students.filter((s) => s.units.find((u) => u.key === key)?.assigned !== false);
    const behind = mine.filter((s) => {
      const u = s.units.find((x) => x.key === key);
      return !u || !isHomeworkDone(u, goal[key]);
    });
    return { key, assigned: mine.length, done: mine.length - behind.length, behind: behind.map((s) => s.name), overdue: Boolean(due[key] && due[key] < now && behind.length > 0) };
  });
}

// ---------- Typing in a class list ----------

export interface NameCheck {
  /** The names to add, in order. */
  names: string[];
  /** Plain-language things worth a second look before adding. Adding is still allowed. */
  warnings: string[];
}

/**
 * Reads the names a teacher typed or pasted: one per line. A single line with commas ("Maya, Sam, Alex") is a list of
 * names; but when there are several lines, a comma inside one is most likely "Last, First" from a spreadsheet, which
 * would make a student called "Smith, Maya", so it gets a warning. Two students with the same name, or the same as one
 * already in the class, get one too, because their login cards would look alike.
 */
export function checkNameList(text: string, existing: readonly string[] = []): NameCheck {
  const lines = text.split(/\r?\n/).map((n) => n.trim()).filter(Boolean);
  const names = lines.length === 1 ? lines[0].split(",").map((n) => n.trim()).filter(Boolean) : lines;
  const warnings: string[] = [];
  if (lines.length > 1) {
    for (const line of lines.filter((l) => l.includes(",")).slice(0, 2)) {
      warnings.push(`“${line}” has a comma, so it would be added as one student. Use first names only, one per line.`);
    }
  }
  const seen = new Map<string, number>();
  for (const n of existing) seen.set(n.toLowerCase(), 1);
  const repeated = new Set<string>();
  for (const n of names) {
    const key = n.toLowerCase();
    if (seen.has(key)) repeated.add(n);
    seen.set(key, (seen.get(key) ?? 0) + 1);
  }
  if (repeated.size) {
    const list = [...repeated].slice(0, 3).map((n) => `“${n}”`).join(", ");
    warnings.push(`More than one student would be called ${list}. Add an initial, like “Maya P.”, so their cards are easy to tell apart.`);
  }
  return { names, warnings };
}

/** What to say after adding students: how many were added and, if the class filled up, how many were left out. */
export function addedMessage(added: number, skipped: number, limit: number): string {
  const base = `Added ${added} ${added === 1 ? "student" : "students"}.`;
  return skipped > 0 ? `${base} ${skipped} ${skipped === 1 ? "wasn’t" : "weren’t"} added because a class holds up to ${limit} students.` : base;
}

// ---------- Class list badges ----------

/** What a teacher would want to know about a class before opening it. Practice only, never a mark. */
export interface ClassBadge {
  /** Students worth a check-in (finding a unit tricky, or no practice this week). */
  checkIn: number;
  /** Assigned units past their due date with students still to finish. */
  pastDue: number;
  /** When any student last practised, or null for no practice yet. */
  lastPractice: number | null;
}

export function classBadge(students: StudentRow[], assignments: string[], due: Record<string, number>, goal: Record<string, number>, now = Date.now()): ClassBadge {
  return {
    checkIn: classInsights(students, assignments, (k) => k, now).checkIn.length,
    pastDue: homeworkOverview(students, assignments, due, goal, now).filter((o) => o.overdue).length,
    lastPractice: students.reduce<number | null>((t, s) => (s.lastActive !== null && (t === null || s.lastActive > t) ? s.lastActive : t), null),
  };
}

/** "just now", "5 minutes ago", "2 hours ago", "3 days ago": how long ago something happened, in a few words. */
export function agoText(then: number, now = Date.now()): string {
  const s = Math.max(0, Math.round((now - then) / 1000));
  if (s < 45) return "just now";
  const unit = (n: number, word: string) => `${n} ${word}${n === 1 ? "" : "s"} ago`;
  if (s < 3600) return unit(Math.max(1, Math.round(s / 60)), "minute");
  if (s < 86_400) return unit(Math.round(s / 3600), "hour");
  if (s < 30 * 86_400) return unit(Math.round(s / 86_400), "day");
  return unit(Math.round(s / (30 * 86_400)), "month");
}

// ---------- Due-date shortcuts ----------

const localDate = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

/** Quick picks for a due date: tomorrow, the coming Friday and the coming Monday, as date-input values (local time). Picks that land on the same day are shown once. */
export function dueChips(now: Date = new Date()): { label: string; value: string }[] {
  const ahead = (days: number) => localDate(new Date(now.getFullYear(), now.getMonth(), now.getDate() + days));
  const until = (weekday: number) => ((weekday - now.getDay() + 7) % 7) || 7;
  const chips = [
    { label: "Tomorrow", value: ahead(1) },
    { label: "Friday", value: ahead(until(5)) },
    { label: "Next Monday", value: ahead(until(1)) },
  ];
  return chips.filter((c, i) => chips.findIndex((x) => x.value === c.value) === i);
}
