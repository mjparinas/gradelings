import { error, getSession, json, sameOrigin } from "@/server/auth";
import { teachingClass } from "@/server/classroom";
import { changeTimer, classTimer, startTimer, stopTimer } from "@/server/classTimer";
import { isFlagOn } from "@/server/flags";
import { timerMinutes } from "@/lib/classTimer";

// The class timer, from the teacher's side. The owner and co-teachers can all start, pause and stop it.

async function teacherClass(classId: unknown, parentId: string) {
  return typeof classId === "string" ? teachingClass(classId, parentId) : undefined;
}

/** The class's timer (?classId=), or null. Polled while the Timer tab is open. */
export async function GET(req: Request) {
  const session = await getSession(req);
  if (!session) return error(401, "Not signed in");
  const found = await teacherClass(new URL(req.url).searchParams.get("classId"), session.parentId);
  if (!found) return error(404, "Class not found");
  return json({ timer: await classTimer(found.cls.id) });
}

/** Starts the timer (`{ classId, minutes, label? }`), replacing any running one. */
export async function POST(req: Request) {
  if (!sameOrigin(req)) return error(403, "Bad origin");
  const session = await getSession(req);
  if (!session) return error(401, "Not signed in");
  const body = (await req.json().catch(() => null)) as { classId?: unknown; minutes?: unknown; label?: unknown } | null;
  const found = await teacherClass(body?.classId, session.parentId);
  if (!found) return error(404, "Class not found");
  if (!(await isFlagOn("class-timer", session.familyId))) return error(503, "The class timer is switched off just now. Practice and homework still work.");
  const minutes = timerMinutes(body?.minutes);
  if (minutes === null) return error(400, "Pick a whole number of minutes from 1 to 120.");
  return json({ timer: await startTimer(found.cls.id, minutes, body?.label) });
}

/** Pauses, resumes or adds a minute (`{ classId, action: "pause" | "resume" | "add" }`). */
export async function PATCH(req: Request) {
  if (!sameOrigin(req)) return error(403, "Bad origin");
  const session = await getSession(req);
  if (!session) return error(401, "Not signed in");
  const body = (await req.json().catch(() => null)) as { classId?: unknown; action?: unknown } | null;
  const found = await teacherClass(body?.classId, session.parentId);
  if (!found) return error(404, "Class not found");
  const action = body?.action;
  if (action !== "pause" && action !== "resume" && action !== "add") return error(400, "Unknown action.");
  return json({ timer: await changeTimer(found.cls.id, action) });
}

/** Stops the timer (?classId=). Students' screens stop showing it. */
export async function DELETE(req: Request) {
  if (!sameOrigin(req)) return error(403, "Bad origin");
  const session = await getSession(req);
  if (!session) return error(401, "Not signed in");
  const found = await teacherClass(new URL(req.url).searchParams.get("classId"), session.parentId);
  if (!found) return error(404, "Class not found");
  await stopTimer(found.cls.id);
  return json({ timer: null });
}
