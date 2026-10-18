import "server-only";
import { cleanGoalTarget, cleanTzOffset, goalWeekStart, type ClassGoal } from "@/lib/classGoal";
import { query, run } from "./db";

// One weekly goal per class. The row holds a target and the teacher's time zone offset (so "this week" starts
// on their Monday); progress is counted from the class members' answers each time it is asked for, so nothing
// about a child is stored here and a student who leaves stops counting at once.

interface GoalRow {
  class_id: string;
  target: number;
  tz_offset: number;
  updated_at: number;
}

const rowOf = async (classId: string): Promise<GoalRow | undefined> => (await query<GoalRow>("SELECT * FROM class_goals WHERE class_id = ?", [classId]))[0];

/** Answers by the class's members since `since`. */
async function answersSince(classId: string, since: number): Promise<number> {
  const r = await query<{ n: number }>(
    `SELECT COUNT(*) AS n FROM events e
     JOIN class_members m ON m.family_id = e.family_id AND m.profile_id = e.profile_id AND m.class_id = ?
     WHERE e.t >= ? AND json_extract(e.data, '$.type') = 'answer'`,
    [classId, since],
  );
  return Number(r[0]?.n ?? 0);
}

export async function classGoal(classId: string, now = Date.now()): Promise<ClassGoal | null> {
  const row = await rowOf(classId);
  if (!row) return null;
  const target = Number(row.target);
  const answers = await answersSince(classId, goalWeekStart(now, Number(row.tz_offset)));
  return { target, answers, met: answers >= target };
}

export async function setClassGoal(classId: string, target: number, tzOffset: unknown, now = Date.now()): Promise<ClassGoal> {
  const t = cleanGoalTarget(target);
  if (t === null) throw new Error("Bad target");
  await run(
    `INSERT INTO class_goals (class_id, target, tz_offset, updated_at) VALUES (?, ?, ?, ?)
     ON CONFLICT(class_id) DO UPDATE SET target = excluded.target, tz_offset = excluded.tz_offset, updated_at = excluded.updated_at`,
    [classId, t, cleanTzOffset(tzOffset), now],
  );
  return (await classGoal(classId, now))!;
}

export async function clearClassGoal(classId: string): Promise<void> {
  await run("DELETE FROM class_goals WHERE class_id = ?", [classId]);
}

/** The goal of a class this child is in (the newest one set, if several classes have one). */
export async function goalForChild(familyId: string, profileId: string, now = Date.now()): Promise<(ClassGoal & { className: string }) | null> {
  const rows = await query<GoalRow & { class_name: string }>(
    `SELECT g.*, c.name AS class_name FROM class_goals g
     JOIN class_members m ON m.class_id = g.class_id AND m.family_id = ? AND m.profile_id = ?
     JOIN classes c ON c.id = g.class_id AND c.closed_at IS NULL
     ORDER BY g.updated_at DESC LIMIT 1`,
    [familyId, profileId],
  );
  const r = rows[0];
  if (!r) return null;
  const goal = await classGoal(r.class_id, now);
  return goal && { ...goal, className: r.class_name };
}
