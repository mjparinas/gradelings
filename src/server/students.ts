import "server-only";
import type { InValue } from "@libsql/client";
import { randomInt } from "node:crypto";
import { ageBandFor } from "@/content/subjects";
import { defaultChildSettings, type Profile } from "@/lib/model";
import { STARTER } from "@/lib/shop";
import { newId } from "./auth";
import { batch, query, run } from "./db";
import { MAX_STUDENTS, type ClassRow } from "./classroom";

// Students a teacher adds to a class. The school is the one that knows who they are: we store a
// first name or nickname, a grade (the class's), an avatar and practice results, and nothing else.
// Each student has a login code instead of an email and password. Everything about a student lives
// in a hidden family record that is deleted when the student is removed or the class is closed.

const CODE_CHARS = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";
/**
 * Ten characters from 31 (about 8.2 × 10^14 codes), unique across every class, so a student signs in
 * with this one code alone. Even with a million students and a thousand networks each guessing at the
 * sign-in limit all day, finding any account would take years. Printed as two groups of five.
 */
export const STUDENT_CODE_LENGTH = 10;
/** Codes made before one-code sign-in: eight characters, unique only within their class, so they still need the class code. */
export const CLASS_STUDENT_CODE_LENGTH = 8;

export function newStudentCode(): string {
  return Array.from({ length: STUDENT_CODE_LENGTH }, () => CODE_CHARS[randomInt(CODE_CHARS.length)]).join("");
}

export const normalizeStudentCode = (v: unknown): string => String(v ?? "").toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, STUDENT_CODE_LENGTH);

/** `count` new codes that no student anywhere has. */
async function freshCodes(count: number): Promise<string[]> {
  const codes = new Set<string>();
  while (codes.size < count) {
    const batchOf = Array.from({ length: count - codes.size }, newStudentCode).filter((c) => !codes.has(c));
    const taken = new Set(
      (await query<{ login_code: string }>(`SELECT login_code FROM students WHERE login_code IN (${batchOf.map(() => "?").join(",")})`, batchOf)).map((r) => r.login_code),
    );
    for (const c of batchOf) if (!taken.has(c)) codes.add(c);
  }
  return [...codes];
}

/** A first name or nickname, with no markup and no stray spaces. */
export function cleanStudentName(v: unknown): string {
  return String(v ?? "")
    .replace(/[<>&"\\]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 20);
}

const AVATARS = ["ollie", "hoot", "ruby", "bolt", "juniper", "clover", "poppy", "rocco", "maple", "shelly"];
const COLOURS = ["#ff9636", "#4f8ef7", "#25b47e", "#e9559a", "#8b5cf6", "#06b6d4", "#f5b301", "#ef4444"];

export interface StudentCode {
  id: string;
  profileId: string;
  name: string;
  loginCode: string;
}

/** Adds students to a class. Returns the ones created, each with the code they sign in with. */
export async function addStudents(cls: ClassRow, names: string[], grade: Profile["grade"] = cls.grade, externalIds: (string | null)[] = []): Promise<StudentCode[]> {
  const have = Number((await query<{ n: number }>("SELECT COUNT(*) AS n FROM class_members WHERE class_id = ?", [cls.id]))[0].n);
  const room = Math.max(0, MAX_STUDENTS - have);
  const take = names.slice(0, room);
  const codes = take.length ? await freshCodes(take.length) : [];
  const now = Date.now();
  const created: StudentCode[] = [];
  const statements: Parameters<typeof batch>[0] = [];
  take.forEach((name, i) => {
    const code = codes[i];
    const id = newId();
    const familyId = newId();
    const parentId = newId();
    const profileId = newId();
    const profile: Profile = {
      id: profileId,
      name,
      avatar: AVATARS[(have + i) % AVATARS.length],
      colour: COLOURS[(have + i) % COLOURS.length],
      grade,
      framework: cls.framework,
      companion: STARTER.companion,
      title: STARTER.title,
      confetti: STARTER.confetti,
      createdAt: now,
      updatedAt: now,
    };
    const settings = { ...defaultChildSettings(profileId, ageBandFor(grade) === "little", grade), updatedAt: now };
    statements.push(
      // The school covers the plan: a student never meets a paywall.
      { sql: "INSERT INTO families (id, created_at, trial_ends_at, plan, updated_at) VALUES (?, ?, ?, 'premium', ?)", args: [familyId, now, now, now] },
      // No usable password and no real email: this account can only sign in with its class and student codes.
      { sql: "INSERT INTO parents (id, family_id, email, password_hash, created_at, role) VALUES (?, ?, ?, '!', ?, 'student')", args: [parentId, familyId, `student-${id}@students.invalid`, now] },
      { sql: "INSERT INTO profiles (id, family_id, data, updated_at) VALUES (?, ?, ?, ?)", args: [profileId, familyId, JSON.stringify(profile), now] },
      { sql: "INSERT INTO child_settings (profile_id, family_id, data, updated_at) VALUES (?, ?, ?, ?)", args: [profileId, familyId, JSON.stringify(settings), now] },
      { sql: "INSERT INTO class_members (class_id, profile_id, family_id, joined_at, grade) VALUES (?, ?, ?, ?, ?)", args: [cls.id, profileId, familyId, now, grade] },
      { sql: "INSERT INTO students (id, class_id, family_id, parent_id, profile_id, login_code, created_at, external_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)", args: [id, cls.id, familyId, parentId, profileId, code, now, externalIds[i] ?? null] },
    );
    created.push({ id, profileId, name, loginCode: code });
  });
  await batch(statements);
  return created;
}

interface StudentRecord {
  id: string;
  family_id: string;
  parent_id: string;
  profile_id: string;
}

/** SQL that erases one student and everything stored about them. */
function eraseStatements(s: StudentRecord) {
  return [
    { sql: "DELETE FROM events WHERE family_id = ?", args: [s.family_id] },
    { sql: "DELETE FROM child_settings WHERE family_id = ?", args: [s.family_id] },
    { sql: "DELETE FROM profiles WHERE family_id = ?", args: [s.family_id] },
    { sql: "DELETE FROM report_shares WHERE family_id = ?", args: [s.family_id] },
    { sql: "DELETE FROM class_members WHERE family_id = ?", args: [s.family_id] },
    { sql: "DELETE FROM class_assignment_students WHERE profile_id = ?", args: [s.profile_id] },
    { sql: "DELETE FROM live_answers WHERE family_id = ?", args: [s.family_id] },
    { sql: "DELETE FROM sessions WHERE family_id = ?", args: [s.family_id] },
    { sql: "DELETE FROM parents WHERE id = ?", args: [s.parent_id] },
    { sql: "DELETE FROM families WHERE id = ?", args: [s.family_id] },
    { sql: "DELETE FROM students WHERE id = ?", args: [s.id] },
  ];
}

/** Removes one student from a class and deletes all of their data. */
export async function removeStudent(classId: string, studentId: string): Promise<boolean> {
  const rows = await query<StudentRecord>("SELECT id, family_id, parent_id, profile_id FROM students WHERE id = ? AND class_id = ?", [studentId, classId]);
  if (!rows[0]) return false;
  await batch(eraseStatements(rows[0]));
  return true;
}

/** Deletes every student account in a class. Used when the class is closed or its teacher deletes their account. */
export async function removeClassStudents(classId: string): Promise<number> {
  const rows = await query<StudentRecord>("SELECT id, family_id, parent_id, profile_id FROM students WHERE class_id = ?", [classId]);
  for (const s of rows) await batch(eraseStatements(s));
  return rows.length;
}

/** Erases a class and its class-owned student accounts after the inactivity retention period. */
export async function deleteInactiveClass(classId: string, cutoff: number, warningCutoff: number): Promise<{ deleted: boolean; students: number }> {
  const predicate = "EXISTS (SELECT 1 FROM classes WHERE id = ? AND closed_at IS NULL AND inactive_warning_at <= ? AND last_activity_at <= ?)";
  const args = (extra: InValue[] = []): InValue[] => [...extra, classId, warningCutoff, cutoff];
  const students = await query<{ n: number }>(
    `SELECT COUNT(*) AS n FROM students WHERE class_id = ? AND ${predicate}`,
    [classId, classId, warningCutoff, cutoff],
  );
  const familyIds = "family_id IN (SELECT family_id FROM students WHERE class_id = ?)";
  const guarded = (table: string) => `DELETE FROM ${table} WHERE ${familyIds} AND ${predicate}`;
  await batch([
    { sql: guarded("events"), args: args([classId]) },
    { sql: guarded("child_settings"), args: args([classId]) },
    { sql: guarded("profiles"), args: args([classId]) },
    { sql: guarded("report_shares"), args: args([classId]) },
    { sql: guarded("live_answers"), args: args([classId]) },
    { sql: guarded("sessions"), args: args([classId]) },
    { sql: "DELETE FROM parents WHERE id IN (SELECT parent_id FROM students WHERE class_id = ?) AND " + predicate, args: args([classId]) },
    { sql: "DELETE FROM families WHERE id IN (SELECT family_id FROM students WHERE class_id = ?) AND " + predicate, args: args([classId]) },
    { sql: "DELETE FROM students WHERE class_id = ? AND " + predicate, args: args([classId]) },
    { sql: "DELETE FROM class_members WHERE class_id = ? AND " + predicate, args: args([classId]) },
    { sql: "DELETE FROM class_assignments WHERE class_id = ? AND " + predicate, args: args([classId]) },
    { sql: "DELETE FROM class_assignment_students WHERE class_id = ? AND " + predicate, args: args([classId]) },
    { sql: "DELETE FROM live_answers WHERE question_id IN (SELECT id FROM live_questions WHERE class_id = ?) AND " + predicate, args: args([classId]) },
    { sql: "DELETE FROM live_questions WHERE class_id = ? AND " + predicate, args: args([classId]) },
    { sql: "DELETE FROM class_teachers WHERE class_id = ? AND " + predicate, args: args([classId]) },
    { sql: "DELETE FROM class_invites WHERE class_id = ? AND " + predicate, args: args([classId]) },
    { sql: "DELETE FROM classes WHERE id = ? AND closed_at IS NULL AND inactive_warning_at <= ? AND last_activity_at <= ?", args: [classId, warningCutoff, cutoff] },
  ]);
  const remains = await query<{ id: string }>("SELECT id FROM classes WHERE id = ?", [classId]);
  return remains.length ? { deleted: false, students: 0 } : { deleted: true, students: Number(students[0]?.n ?? 0) };
}

/** Every student account in the classes a teacher owns (by account id). */
export async function removeStudentsOfOwner(ownerParentIds: string[]): Promise<void> {
  for (const owner of ownerParentIds) {
    const classes = await query<{ id: string }>("SELECT id FROM classes WHERE owner_parent_id = ?", [owner]);
    for (const c of classes) await removeClassStudents(c.id);
  }
}

/** A student's login code, to print again, or a new one when it was lost or shared. */
export async function resetStudentCode(classId: string, studentId: string, now = Date.now()): Promise<string | null> {
  const rows = await query<{ id: string; login_code: string }>("SELECT id, login_code FROM students WHERE id = ? AND class_id = ?", [studentId, classId]);
  if (!rows[0]) return null;
  const [code] = await freshCodes(1);
  await batch([
    // The old code is kept for a few minutes so the teacher can undo (see restoreStudentCode).
    { sql: "UPDATE students SET login_code = ?, prev_login_code = ?, prev_code_at = ? WHERE id = ?", args: [code, rows[0].login_code, now, studentId] },
    // Signing in again is needed on every device.
    { sql: "DELETE FROM sessions WHERE parent_id = (SELECT parent_id FROM students WHERE id = ?)", args: [studentId] },
  ]);
  return code;
}

/** How long after a new login code the teacher can still undo it. */
export const CODE_UNDO_MS = 10 * 60_000;

/**
 * Undoes a new login code: the student's previous code works again and the new one stops. Only the code they had just
 * before, and only for a few minutes. Null when there is nothing to restore (too late, or the code was taken since).
 */
export async function restoreStudentCode(classId: string, studentId: string, now = Date.now()): Promise<string | null> {
  const row = (await query<{ prev_login_code: string | null; prev_code_at: number | null }>("SELECT prev_login_code, prev_code_at FROM students WHERE id = ? AND class_id = ?", [studentId, classId]))[0];
  const prev = row?.prev_login_code;
  if (!prev || row.prev_code_at == null || now - Number(row.prev_code_at) > CODE_UNDO_MS) return null;
  const taken = await query<{ id: string }>("SELECT id FROM students WHERE class_id = ? AND login_code = ? AND id != ?", [classId, prev, studentId]);
  if (taken[0]) return null;
  await batch([
    { sql: "UPDATE students SET login_code = ?, prev_login_code = NULL, prev_code_at = NULL WHERE id = ?", args: [prev, studentId] },
    { sql: "DELETE FROM sessions WHERE parent_id = (SELECT parent_id FROM students WHERE id = ?)", args: [studentId] },
  ]);
  return prev;
}

/** Forgets previous login codes once their undo time has passed, so old credentials aren't kept. */
export async function pruneOldCodes(now = Date.now()): Promise<void> {
  await run("UPDATE students SET prev_login_code = NULL, prev_code_at = NULL WHERE prev_code_at IS NOT NULL AND prev_code_at < ?", [now - CODE_UNDO_MS]);
}

/**
 * Moves every student in a class who still has a two-code login to a one-code login, and signs them
 * out everywhere. Returns how many changed. Old cards stop working, so the teacher reprints them.
 */
export async function upgradeClassCodes(classId: string): Promise<number> {
  const rows = await query<{ id: string }>("SELECT id FROM students WHERE class_id = ? AND length(login_code) <> ?", [classId, STUDENT_CODE_LENGTH]);
  if (!rows.length) return 0;
  const codes = await freshCodes(rows.length);
  await batch(
    rows.flatMap((r, i) => [
      { sql: "UPDATE students SET login_code = ? WHERE id = ?", args: [codes[i], r.id] },
      { sql: "DELETE FROM sessions WHERE parent_id = (SELECT parent_id FROM students WHERE id = ?)", args: [r.id] },
    ]),
  );
  return rows.length;
}

export interface RosterEntry {
  id: string;
  profileId: string;
  loginCode: string;
}

export async function classRoster(classId: string): Promise<RosterEntry[]> {
  const rows = await query<{ id: string; profile_id: string; login_code: string }>("SELECT id, profile_id, login_code FROM students WHERE class_id = ? ORDER BY created_at, id", [classId]);
  return rows.map((r) => ({ id: r.id, profileId: r.profile_id, loginCode: r.login_code }));
}

/**
 * Fixes a student's name or, in a split class, moves them to the class's other grade. Their codes and practice stay.
 * Returns false when the student isn't in this class.
 */
export async function updateStudent(classId: string, studentId: string, change: { name?: string; grade?: Profile["grade"] }, now = Date.now()): Promise<boolean> {
  const rows = await query<{ profile_id: string; family_id: string; data: string }>(
    "SELECT s.profile_id, s.family_id, p.data FROM students s JOIN profiles p ON p.id = s.profile_id AND p.family_id = s.family_id WHERE s.id = ? AND s.class_id = ?",
    [studentId, classId],
  );
  const row = rows[0];
  if (!row) return false;
  const profile = JSON.parse(row.data) as Profile;
  const next: Profile = { ...profile, name: change.name ?? profile.name, grade: change.grade ?? profile.grade, updatedAt: now };
  await batch([
    { sql: "UPDATE profiles SET data = ?, updated_at = ? WHERE id = ? AND family_id = ?", args: [JSON.stringify(next), now, row.profile_id, row.family_id] },
    { sql: "UPDATE class_members SET grade = ? WHERE class_id = ? AND profile_id = ?", args: [next.grade, classId, row.profile_id] },
  ]);
  return true;
}
