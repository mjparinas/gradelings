import { error, getSession, json, sameOrigin } from "@/server/auth";
import { classGrades, cleanAudience, cleanDueAt, cleanGoal, MAX_ASSIGNMENTS, setAudience, teachingClass, validUnit } from "@/server/classroom";
import { query, run } from "@/server/db";

/**
 * Assigns a unit from the class’s province to a class, as homework: an optional due date, an optional
 * number of questions to do and, if the teacher picks, only some of the class's students (`students`, profile ids). The owner and co-teachers can all manage assignments.
 */
export async function POST(req: Request) {
  if (!sameOrigin(req)) return error(403, "Bad origin");
  const session = await getSession(req);
  if (!session) return error(401, "Not signed in");
  const body = (await req.json().catch(() => null)) as { classId?: unknown; unitKey?: unknown; dueAt?: unknown; goal?: unknown; students?: unknown; since?: unknown } | null;
  const cls = typeof body?.classId === "string" ? (await teachingClass(body.classId, session.parentId))?.cls : undefined;
  if (!cls) return error(404, "Class not found");
  const students = await cleanAudience(cls.id, body?.students);
  if (!students) return error(400, "Choose students from this class.");
  const key = typeof body?.unitKey === "string" ? body.unitKey : "";
  if (!(await validUnit(key, classGrades(cls), cls.framework))) return error(400, "That unit isn’t part of this class’s grade.");
  const have = await query<{ n: number }>("SELECT COUNT(*) AS n FROM class_assignments WHERE class_id = ?", [cls.id]);
  if (Number(have[0].n) >= MAX_ASSIGNMENTS) return error(409, "That’s a lot of assigned units. Remove some first.");
  const dueAt = cleanDueAt(body?.dueAt);
  const goal = cleanGoal(body?.goal);
  // `since`: when the unit was first assigned. Undoing a removal passes it back, so the answers already given still count as homework.
  const now = Date.now();
  const since = typeof body?.since === "number" && Number.isInteger(body.since) && body.since <= now && body.since > now - 120 * 86_400_000 ? body.since : now;
  const added = await run("INSERT OR IGNORE INTO class_assignments (class_id, unit_key, created_at, due_at, goal) VALUES (?, ?, ?, ?, ?)", [cls.id, key, since, dueAt ?? null, goal ?? null]);
  if (added) await setAudience(cls.id, key, students);
  return json({ ok: true });
}

/** Sets or clears the due date (`dueAt`), the number of questions (`goal`) or the students (`students`; none means everyone) on an assigned unit. */
export async function PATCH(req: Request) {
  if (!sameOrigin(req)) return error(403, "Bad origin");
  const session = await getSession(req);
  if (!session) return error(401, "Not signed in");
  const body = (await req.json().catch(() => null)) as { classId?: unknown; unitKey?: unknown; dueAt?: unknown; goal?: unknown; students?: unknown } | null;
  const cls = typeof body?.classId === "string" ? (await teachingClass(body.classId, session.parentId))?.cls : undefined;
  if (!cls) return error(404, "Class not found");
  const unitKey = typeof body?.unitKey === "string" ? body.unitKey : "";
  let changed: number;
  if (body && "students" in body) {
    const students = await cleanAudience(cls.id, body.students);
    if (!students) return error(400, "Choose students from this class.");
    const assigned = (await query<{ n: number }>("SELECT COUNT(*) AS n FROM class_assignments WHERE class_id = ? AND unit_key = ?", [cls.id, unitKey]))[0];
    changed = Number(assigned.n);
    if (changed) await setAudience(cls.id, unitKey, students);
  } else if (body && "goal" in body) {
    const goal = cleanGoal(body.goal);
    if (goal === undefined) return error(400, "Choose between 1 and 50 questions.");
    changed = await run("UPDATE class_assignments SET goal = ? WHERE class_id = ? AND unit_key = ?", [goal, cls.id, unitKey]);
  } else {
    const dueAt = cleanDueAt(body?.dueAt);
    if (dueAt === undefined) return error(400, "Choose a due date within the next year.");
    changed = await run("UPDATE class_assignments SET due_at = ? WHERE class_id = ? AND unit_key = ?", [dueAt, cls.id, unitKey]);
  }
  return changed ? json({ ok: true }) : error(404, "That unit isn’t assigned.");
}

export async function DELETE(req: Request) {
  if (!sameOrigin(req)) return error(403, "Bad origin");
  const session = await getSession(req);
  if (!session) return error(401, "Not signed in");
  const params = new URL(req.url).searchParams;
  const cls = (await teachingClass(params.get("classId") ?? "", session.parentId))?.cls;
  if (!cls) return error(404, "Class not found");
  const unitKey = params.get("unitKey") ?? "";
  await run("DELETE FROM class_assignments WHERE class_id = ? AND unit_key = ?", [cls.id, unitKey]);
  await run("DELETE FROM class_assignment_students WHERE class_id = ? AND unit_key = ?", [cls.id, unitKey]);
  return json({ ok: true });
}
