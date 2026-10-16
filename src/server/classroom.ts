import "server-only";
import { randomInt } from "node:crypto";
import { getCourse, loadGrade, parseUnitKey } from "@/content";
import { FRAMEWORKS } from "@/content/frameworks";
import type { FrameworkId, GradeId } from "@/content/types";
import { unitLevel } from "@/lib/proficiency";
import { GRADE_ORDER } from "@/content/subjects";
import { batch, query, run } from "./db";
import { homeworkDone, mostMissed, studentQuestions, type MissedQuestion } from "@/lib/classroom";
import { loadChildData } from "./reportData";

// Classroom mode. A teacher owns a class and shares its join code. A parent chooses to link a
// child with that code (and can unlink at any time). The teacher then sees that child's first name,
// grade and practice results for the units they assigned, and nothing else.

/** One line of plain text: it appears in invitation emails and on printed cards. */
export function cleanClassName(v: unknown): string {
  return typeof v === "string" ? v.replace(/[\u0000-\u001f\u007f]/g, " ").replace(/\s+/g, " ").trim().slice(0, 60) : "";
}

/** The grade after this one, or null after Grade 9. */
export function nextGrade(grade: GradeId): GradeId | null {
  return (GRADE_ORDER[GRADE_ORDER.indexOf(grade) + 1] as GradeId | undefined) ?? null;
}

export const MAX_CLASSES = 10;
export const MAX_STUDENTS = 40;
export const MAX_ASSIGNMENTS = 60;
export const MAX_CO_TEACHERS = 5;
export const MAX_PENDING_INVITES = 10;
/** An invitation stops working after this long. */
export const INVITE_TTL = 14 * 86_400_000;

// No 0/O or 1/I/L, so a code is easy to read off a whiteboard.
const CODE_CHARS = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";

export function newJoinCode(): string {
  return Array.from({ length: 6 }, () => CODE_CHARS[randomInt(CODE_CHARS.length)]).join("");
}

export const normalizeCode = (v: unknown): string => String(v ?? "").toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 6);

export interface ClassRow {
  id: string;
  owner_parent_id: string;
  name: string;
  grade: GradeId;
  /** The second grade of a split class, or null. */
  grade2: GradeId | null;
  framework: FrameworkId;
  join_code: string;
  created_at: number;
  closed_at: number | null;
}

/** The grades a class teaches: one, or two next to each other for a split class. */
export function classGrades(cls: { grade: GradeId; grade2?: GradeId | null }): GradeId[] {
  return cls.grade2 ? [cls.grade, cls.grade2] : [cls.grade];
}

/** A second grade from the browser: next to the class's grade, or null for none. `undefined` means it isn't a valid choice. */
export function cleanSecondGrade(grade: string, v: unknown): GradeId | null | undefined {
  if (v === undefined || v === null || v === "") return null;
  const order = GRADE_ORDER as readonly string[];
  const i = order.indexOf(grade);
  const j = typeof v === "string" ? order.indexOf(v) : -1;
  return j >= 0 && Math.abs(i - j) === 1 ? (v as GradeId) : undefined;
}

/** Whether a unit is for a student: the grade of a split class's student decides, unless the teacher picked students. */
export function unitIsForGrade(unitKey: string, studentGrade: GradeId, cls: { grade2?: GradeId | null }): boolean {
  return !cls.grade2 || unitKey.split("/")[0] === studentGrade;
}

export async function ownedClass(id: string, parentId: string): Promise<ClassRow | undefined> {
  return (await query<ClassRow>("SELECT * FROM classes WHERE id = ? AND owner_parent_id = ? AND closed_at IS NULL", [id, parentId]))[0];
}

export type TeacherRole = "owner" | "co-teacher";

/**
 * A class the signed-in account teaches: as its owner or as an accepted co-teacher. Co-teachers
 * can view the class, add students, print cards, reset a student's code and manage assignments.
 * Everything destructive or about who has access (closing the class, a new join code, removing a
 * student, inviting or removing co-teachers) stays with the owner: use `ownedClass` for those.
 */
export async function teachingClass(id: string, parentId: string): Promise<{ cls: ClassRow; role: TeacherRole } | undefined> {
  const owned = await ownedClass(id, parentId);
  if (owned) return { cls: owned, role: "owner" };
  const rows = await query<ClassRow>(
    `SELECT c.* FROM classes c JOIN class_teachers t ON t.class_id = c.id
     WHERE c.id = ? AND t.parent_id = ? AND c.closed_at IS NULL`,
    [id, parentId],
  );
  return rows[0] ? { cls: rows[0], role: "co-teacher" } : undefined;
}

export interface TeacherEntry {
  /** Account id; opaque to the browser. */
  id: string;
  email: string;
  role: TeacherRole;
}

/** The owner and accepted co-teachers of a class, owner first. */
export async function classTeachers(cls: ClassRow): Promise<TeacherEntry[]> {
  const owner = await query<{ id: string; email: string }>("SELECT id, email FROM parents WHERE id = ?", [cls.owner_parent_id]);
  const others = await query<{ id: string; email: string }>(
    "SELECT p.id, p.email FROM class_teachers t JOIN parents p ON p.id = t.parent_id WHERE t.class_id = ? ORDER BY t.joined_at, p.id",
    [cls.id],
  );
  return [
    ...owner.map((o) => ({ id: o.id, email: o.email, role: "owner" as const })),
    ...others.map((o) => ({ id: o.id, email: o.email, role: "co-teacher" as const })),
  ];
}

export async function pendingInvites(classId: string, now = Date.now()): Promise<{ email: string; createdAt: number }[]> {
  const rows = await query<{ email: string; created_at: number }>("SELECT email, created_at FROM class_invites WHERE class_id = ? AND created_at > ? ORDER BY created_at", [classId, now - INVITE_TTL]);
  return rows.map((r) => ({ email: r.email, createdAt: Number(r.created_at) }));
}

/** Erases every co-teacher link and invitation for a class (closing, deleting or inactivity). */
export async function removeClassTeachers(classId: string): Promise<void> {
  await batch([
    { sql: "DELETE FROM class_teachers WHERE class_id = ?", args: [classId] },
    { sql: "DELETE FROM class_invites WHERE class_id = ?", args: [classId] },
  ]);
}

/**
 * Called before accounts are deleted. Each class they own either moves to its longest-serving
 * co-teacher outside the deleted accounts (who could already see all of it, so access doesn't widen
 * and the class's students keep their work), or, with no co-teacher, loses its student accounts
 * like any class with no teacher. Then the accounts' own co-teaching links and open invitations go.
 */
export async function releaseTeacherAccounts(parentIds: string[]): Promise<void> {
  const gone = new Set(parentIds);
  for (const owner of parentIds) {
    const classes = await query<{ id: string }>("SELECT id FROM classes WHERE owner_parent_id = ?", [owner]);
    for (const c of classes) {
      const heir = (await query<{ parent_id: string }>("SELECT parent_id FROM class_teachers WHERE class_id = ? ORDER BY joined_at, parent_id", [c.id])).find((t) => !gone.has(t.parent_id));
      if (heir) {
        await batch([
          { sql: "UPDATE classes SET owner_parent_id = ? WHERE id = ? AND owner_parent_id = ?", args: [heir.parent_id, c.id, owner] },
          { sql: "DELETE FROM class_teachers WHERE class_id = ? AND parent_id = ?", args: [c.id, heir.parent_id] },
          { sql: "DELETE FROM class_invites WHERE class_id = ? AND invited_by = ?", args: [c.id, owner] },
        ]);
      }
    }
  }
  for (const id of parentIds) {
    // Classes still owned by a deleted account have no heir: the caller removes their students.
    await run("DELETE FROM class_teachers WHERE parent_id = ?", [id]);
    await run("DELETE FROM class_invites WHERE invited_by = ?", [id]);
    await run("DELETE FROM class_invites WHERE email = (SELECT email FROM parents WHERE id = ?)", [id]);
  }
}

export const isFramework = (v: unknown): v is FrameworkId => FRAMEWORKS.some((f) => f.id === v);

/** A unit key that exists in this class's grade and province. */
export async function validUnit(key: string, grades: GradeId | GradeId[], framework: FrameworkId): Promise<boolean> {
  const parsed = parseUnitKey(key);
  if (!parsed || ![grades].flat().includes(parsed.grade)) return false;
  await loadGrade(parsed.grade, framework);
  return !!getCourse(parsed.grade, parsed.subject, framework)?.units.some((u) => u.id === parsed.unitId);
}

export async function assignmentKeys(classId: string): Promise<string[]> {
  const rows = await query<{ unit_key: string }>("SELECT unit_key FROM class_assignments WHERE class_id = ? ORDER BY created_at, unit_key", [classId]);
  return rows.map((r) => r.unit_key);
}

/** The students a unit is for, by unit key. Units for the whole class are not listed. */
export async function assignmentAudience(classId: string): Promise<Record<string, string[]>> {
  const rows = await query<{ unit_key: string; profile_id: string }>("SELECT unit_key, profile_id FROM class_assignment_students WHERE class_id = ? ORDER BY unit_key, profile_id", [classId]);
  const out: Record<string, string[]> = {};
  for (const r of rows) (out[r.unit_key] ??= []).push(r.profile_id);
  return out;
}

/**
 * Students picked from the browser, narrowed to this class's own members. `undefined` means the field was
 * absent or not a list of ids; an empty list means the whole class.
 */
export async function cleanAudience(classId: string, v: unknown): Promise<string[] | undefined> {
  if (v === undefined || v === null) return [];
  if (!Array.isArray(v) || v.length > MAX_STUDENTS || v.some((x) => typeof x !== "string")) return undefined;
  const members = new Set((await query<{ profile_id: string }>("SELECT profile_id FROM class_members WHERE class_id = ?", [classId])).map((r) => r.profile_id));
  const picked = [...new Set(v as string[])];
  return picked.every((id) => members.has(id)) ? picked : undefined;
}

/** Sets who a unit is for. An empty list makes it for the whole class. */
export async function setAudience(classId: string, unitKey: string, profileIds: string[]): Promise<void> {
  await batch([
    { sql: "DELETE FROM class_assignment_students WHERE class_id = ? AND unit_key = ?", args: [classId, unitKey] },
    ...profileIds.map((id) => ({ sql: "INSERT OR IGNORE INTO class_assignment_students (class_id, unit_key, profile_id) VALUES (?, ?, ?)", args: [classId, unitKey, id] })),
  ]);
}

export interface Classwork {
  profileId: string;
  classId: string;
  className: string;
  unitKeys: string[];
  /** Due dates the teacher set (ms since epoch), by unit key. Units without one are not listed. */
  due: Record<string, number>;
  /** Homework question counts, by unit key. Units without one are not listed. */
  goal: Record<string, number>;
  /** When each unit was assigned (ms since epoch), by unit key. */
  since: Record<string, number>;
}

/** Homework question counts a teacher set on this class's assigned units. */
export async function assignmentGoals(classId: string): Promise<Record<string, number>> {
  const rows = await query<{ unit_key: string; goal: number | null }>("SELECT unit_key, goal FROM class_assignments WHERE class_id = ? AND goal IS NOT NULL", [classId]);
  return Object.fromEntries(rows.map((r) => [r.unit_key, Number(r.goal)]));
}

/** A homework question count from the browser: 1 to 50, or null for none (done at Proficient). */
export function cleanGoal(v: unknown): number | null | undefined {
  if (v === null) return null;
  if (typeof v !== "number" || !Number.isInteger(v)) return undefined;
  return v >= 1 && v <= 50 ? v : undefined;
}

/** Due dates a teacher set on this class's assigned units. */
export async function assignmentDue(classId: string): Promise<Record<string, number>> {
  const rows = await query<{ unit_key: string; due_at: number | null }>("SELECT unit_key, due_at FROM class_assignments WHERE class_id = ? AND due_at IS NOT NULL", [classId]);
  return Object.fromEntries(rows.map((r) => [r.unit_key, Number(r.due_at)]));
}

/** A due date from the browser: a time within the next year or the last month, or null for none. */
export function cleanDueAt(v: unknown, now = Date.now()): number | null | undefined {
  if (v === null) return null;
  if (typeof v !== "number" || !Number.isFinite(v)) return undefined;
  return v > now - 30 * 86_400_000 && v < now + 366 * 86_400_000 ? Math.round(v) : undefined;
}

/** What each of a family's linked children has been assigned. Sent only to that family's own devices. */
export async function familyClasswork(familyId: string): Promise<Classwork[]> {
  // A unit reaches a student when the teacher picked them, or, if it has no picks, when it is for their whole class
  // or (in a split class) for their grade.
  const rows = await query<{ profile_id: string; class_id: string; name: string; unit_key: string | null; due_at: number | null; goal: number | null; created_at: number | null }>(
    `SELECT m.profile_id, m.class_id, c.name, a.unit_key, a.due_at, a.goal, a.created_at FROM class_members m
     JOIN classes c ON c.id = m.class_id AND c.closed_at IS NULL
     LEFT JOIN class_assignments a ON a.class_id = m.class_id
       AND (EXISTS (SELECT 1 FROM class_assignment_students t WHERE t.class_id = a.class_id AND t.unit_key = a.unit_key AND t.profile_id = m.profile_id)
            OR (NOT EXISTS (SELECT 1 FROM class_assignment_students t WHERE t.class_id = a.class_id AND t.unit_key = a.unit_key)
                AND (c.grade2 IS NULL OR substr(a.unit_key, 1, instr(a.unit_key, '/') - 1) = COALESCE(m.grade, c.grade))))
     WHERE m.family_id = ? ORDER BY m.joined_at, a.created_at, a.unit_key`,
    [familyId],
  );
  const out = new Map<string, Classwork>();
  for (const r of rows) {
    const k = `${r.profile_id}/${r.class_id}`;
    const entry = out.get(k) ?? { profileId: r.profile_id, classId: r.class_id, className: r.name, unitKeys: [], due: {}, goal: {}, since: {} };
    if (r.unit_key) entry.unitKeys.push(r.unit_key);
    if (r.unit_key && r.due_at != null) entry.due[r.unit_key] = Number(r.due_at);
    if (r.unit_key && r.goal != null) entry.goal[r.unit_key] = Number(r.goal);
    if (r.unit_key && r.created_at != null) entry.since[r.unit_key] = Number(r.created_at);
    out.set(k, entry);
  }
  return [...out.values()];
}

export interface StudentProgress {
  profileId: string;
  name: string;
  avatar: string;
  grade: GradeId;
  lastActive: number | null;
  /** One entry per assigned unit, in assignment order. level -1 = not started. */
  /** `done`: questions answered on the unit since it was assigned (homework). `assigned`: false when the teacher gave the unit to other students only. */
  units: { key: string; level: number; attempts: number; accuracy: number; done: number; assigned: boolean }[];
}

/** Progress for linked students on the assigned units only. Never includes an email or other family details. */
export async function classProgress(classId: string): Promise<StudentProgress[]> {
  return (await classProgressAndMisses(classId)).students;
}

/** `classProgress`, plus the questions several students missed on each assigned unit (only answers that carry the question's text). */
export async function classProgressAndMisses(classId: string): Promise<{ students: StudentProgress[]; missed: Record<string, MissedQuestion[]> }> {
  const members = await query<{ profile_id: string; family_id: string; grade: string | null }>("SELECT profile_id, family_id, grade FROM class_members WHERE class_id = ? ORDER BY joined_at", [classId]);
  const cls = (await query<{ grade: GradeId; grade2: GradeId | null }>("SELECT grade, grade2 FROM classes WHERE id = ?", [classId]))[0];
  const keys = await assignmentKeys(classId);
  const audience = await assignmentAudience(classId);
  const since = Object.fromEntries((await query<{ unit_key: string; created_at: number }>("SELECT unit_key, created_at FROM class_assignments WHERE class_id = ?", [classId])).map((r) => [r.unit_key, Number(r.created_at)]));
  const questions: Record<string, Record<string, boolean>>[] = [];
  const progress = await mapLimit(members, CLASS_LOAD_CONCURRENCY, async (m): Promise<StudentProgress | null> => {
    // One unreadable child record must not take the whole class view down with it.
    const data = await loadChildData(m.family_id, m.profile_id, 90).catch((e) => {
      console.error("[classroom] could not load a member's report", (e as Error).message);
      return null;
    });
    if (!data) return null;
    const byKey = new Map(data.report.units.map((u) => [u.ref.key, u]));
    // Only units the student was given count toward the class's missed questions.
    const given = keys.filter((key) => (audience[key] ? audience[key].includes(m.profile_id) : !cls || unitIsForGrade(key, (m.grade ?? cls.grade) as GradeId, cls)));
    questions.push(studentQuestions(data.events, Object.fromEntries(given.map((k) => [k, since[k] ?? 0]))));
    return {
      profileId: m.profile_id,
      name: data.profile.name,
      avatar: data.profile.avatar,
      grade: data.profile.grade,
      lastActive: data.report.units.reduce<number | null>((t, u) => (u.lastT && (t === null || u.lastT > t) ? u.lastT : t), null),
      units: keys.map((key) => {
        const u = byKey.get(key);
        return { key, level: u ? u.level : unitLevel(undefined), attempts: u?.attempts ?? 0, accuracy: u?.accuracy ?? 0, done: homeworkDone(data.events, key, since[key] ?? 0), assigned: audience[key] ? audience[key].includes(m.profile_id) : !cls || unitIsForGrade(key, (m.grade ?? cls.grade) as GradeId, cls) };
      }),
    };
  });
  return { students: progress.filter((p): p is StudentProgress => p !== null), missed: mostMissed(questions) };
}

/** How many students' histories are read at once: enough to overlap the database round trips without flooding it. */
export const CLASS_LOAD_CONCURRENCY = 6;

/** `fn` over `items` with at most `limit` running at once. Results keep the order of `items`. */
export async function mapLimit<T, R>(items: readonly T[], limit: number, fn: (item: T) => Promise<R>): Promise<R[]> {
  const out: R[] = new Array(items.length);
  let next = 0;
  const worker = async () => {
    while (next < items.length) {
      const i = next++;
      out[i] = await fn(items[i]);
    }
  };
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, worker));
  return out;
}
