import "server-only";
import type { GradeId } from "@/content/types";
import { nextGrade, type ClassRow } from "./classroom";
import { batch, query } from "./db";
import { liveClassStatements } from "./live";

/**
 * Moves a class up a grade for a new school year (both grades of a split class). Assignments, who they were for and any
 * live question are cleared, the students the teacher added move up with the class (same codes, same practice), and
 * children their parents linked are unlinked, because a linked child keeps the grade their family chose. Returns false
 * when the class is already at the last grade.
 */
export async function startNextYear(cls: ClassRow, now = Date.now()): Promise<boolean> {
  const grade = nextGrade(cls.grade);
  const grade2 = cls.grade2 ? nextGrade(cls.grade2) : null;
  if (!grade || (cls.grade2 && !grade2)) return false;
  const rows = await query<{ profile_id: string; family_id: string; data: string }>(
    `SELECT s.profile_id, s.family_id, p.data FROM students s JOIN profiles p ON p.id = s.profile_id AND p.family_id = s.family_id WHERE s.class_id = ?`,
    [cls.id],
  );
  // A split class's students move up one grade each, whichever grade they're in.
  const moves = rows.map((r) => {
    const profile = JSON.parse(r.data) as { grade: GradeId; updatedAt: number };
    const up = nextGrade(profile.grade) ?? profile.grade;
    return { ...r, up, data: JSON.stringify({ ...profile, grade: up, updatedAt: now }) };
  });
  await batch([
    { sql: "UPDATE classes SET grade = ?, grade2 = ?, last_activity_at = ?, inactive_warning_at = NULL WHERE id = ?", args: [grade, grade2, now, cls.id] },
    { sql: "DELETE FROM class_assignments WHERE class_id = ?", args: [cls.id] },
    { sql: "DELETE FROM class_assignment_students WHERE class_id = ?", args: [cls.id] },
    ...liveClassStatements("?", [cls.id]),
    { sql: "DELETE FROM class_members WHERE class_id = ? AND family_id NOT IN (SELECT family_id FROM students WHERE class_id = ?)", args: [cls.id, cls.id] },
    ...moves.flatMap((m) => [
      { sql: "UPDATE profiles SET data = ?, updated_at = ? WHERE id = ? AND family_id = ?", args: [m.data, now, m.profile_id, m.family_id] },
      { sql: "UPDATE class_members SET grade = ? WHERE class_id = ? AND profile_id = ?", args: [m.up, cls.id, m.profile_id] },
    ]),
  ]);
  return true;
}
