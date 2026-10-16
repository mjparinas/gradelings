import { error, getSession, json, sameOrigin } from "@/server/auth";
import { cleanDueAt, cleanGoal, MAX_ASSIGNMENTS, teachingClass, validUnit } from "@/server/classroom";
import { query, run } from "@/server/db";

/**
 * Assigns a unit from the class’s province to a class, as homework: an optional due date and an optional
 * number of questions to do. The owner and co-teachers can all manage assignments.
 */
export async function POST(req: Request) {
  if (!sameOrigin(req)) return error(403, "Bad origin");
  const session = await getSession(req);
  if (!session) return error(401, "Not signed in");
  const body = (await req.json().catch(() => null)) as { classId?: unknown; unitKey?: unknown; dueAt?: unknown; goal?: unknown } | null;
  const cls = typeof body?.classId === "string" ? (await teachingClass(body.classId, session.parentId))?.cls : undefined;
  if (!cls) return error(404, "Class not found");
  const key = typeof body?.unitKey === "string" ? body.unitKey : "";
  if (!(await validUnit(key, cls.grade, cls.framework))) return error(400, "That unit isn’t part of this class’s grade.");
  const have = await query<{ n: number }>("SELECT COUNT(*) AS n FROM class_assignments WHERE class_id = ?", [cls.id]);
  if (Number(have[0].n) >= MAX_ASSIGNMENTS) return error(409, "That’s a lot of assigned units. Remove some first.");
  const dueAt = cleanDueAt(body?.dueAt);
  const goal = cleanGoal(body?.goal);
  await run("INSERT OR IGNORE INTO class_assignments (class_id, unit_key, created_at, due_at, goal) VALUES (?, ?, ?, ?, ?)", [cls.id, key, Date.now(), dueAt ?? null, goal ?? null]);
  return json({ ok: true });
}

/** Sets or clears the due date (`dueAt`) or the number of questions (`goal`) on an assigned unit. */
export async function PATCH(req: Request) {
  if (!sameOrigin(req)) return error(403, "Bad origin");
  const session = await getSession(req);
  if (!session) return error(401, "Not signed in");
  const body = (await req.json().catch(() => null)) as { classId?: unknown; unitKey?: unknown; dueAt?: unknown; goal?: unknown } | null;
  const cls = typeof body?.classId === "string" ? (await teachingClass(body.classId, session.parentId))?.cls : undefined;
  if (!cls) return error(404, "Class not found");
  const unitKey = typeof body?.unitKey === "string" ? body.unitKey : "";
  let changed: number;
  if (body && "goal" in body) {
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
  await run("DELETE FROM class_assignments WHERE class_id = ? AND unit_key = ?", [cls.id, params.get("unitKey") ?? ""]);
  return json({ ok: true });
}
