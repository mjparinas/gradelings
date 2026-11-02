import { error, getSession, json, readJson, sameOrigin } from "@/server/auth";
import { teachingClass } from "@/server/classroom";
import { classGoal, clearClassGoal, setClassGoal } from "@/server/classGoal";
import { isFlagOn } from "@/server/flags";
import { cleanGoalTarget } from "@/lib/classGoal";

// The class's weekly goal, from the teacher's side. The owner and co-teachers can all set and clear it.

async function teacherClass(classId: unknown, parentId: string) {
  return typeof classId === "string" ? teachingClass(classId, parentId) : undefined;
}

/** The class's goal and how far along it is (?classId=), or null. */
export async function GET(req: Request) {
  const session = await getSession(req);
  if (!session) return error(401, "Not signed in");
  const found = await teacherClass(new URL(req.url).searchParams.get("classId"), session.parentId);
  if (!found) return error(404, "Class not found");
  return json({ goal: await classGoal(found.cls.id) });
}

/** Sets or changes the goal (`{ classId, target, tzOffset? }`). */
export async function PUT(req: Request) {
  if (!sameOrigin(req)) return error(403, "Bad origin");
  const session = await getSession(req);
  if (!session) return error(401, "Not signed in");
  const body = (await readJson(req)) as { classId?: unknown; target?: unknown; tzOffset?: unknown } | null;
  const found = await teacherClass(body?.classId, session.parentId);
  if (!found) return error(404, "Class not found");
  if (!(await isFlagOn("class-goal", session.familyId))) return error(503, "The class goal is switched off just now. Practice and homework still work.");
  const target = cleanGoalTarget(body?.target);
  if (target === null) return error(400, "Pick a whole number of questions from 10 to 5000.");
  return json({ goal: await setClassGoal(found.cls.id, target, body?.tzOffset) });
}

/** Removes the goal (?classId=). Students' screens stop showing it. */
export async function DELETE(req: Request) {
  if (!sameOrigin(req)) return error(403, "Bad origin");
  const session = await getSession(req);
  if (!session) return error(401, "Not signed in");
  const found = await teacherClass(new URL(req.url).searchParams.get("classId"), session.parentId);
  if (!found) return error(404, "Class not found");
  await clearClassGoal(found.cls.id);
  return json({ goal: null });
}
