import { error, getSession, json, rateLimited, sameOrigin } from "@/server/auth";
import { classGrades, teachingClass, validUnit } from "@/server/classroom";
import { isFlagOn } from "@/server/flags";
import { endLive, liveAnswers, openLive, revealLive, startLive, type LiveRow } from "@/server/live";
import type { LiveForTeacher, LiveQuestionData } from "@/lib/live";

// Live questions, from the teacher's side. The owner and co-teachers can all ask them.

async function view(row: LiveRow | undefined): Promise<LiveForTeacher | null> {
  if (!row) return null;
  return {
    id: row.id,
    unitKey: row.unit_key,
    question: JSON.parse(row.data) as LiveQuestionData,
    revealed: row.revealed_at != null,
    createdAt: Number(row.created_at),
    answers: await liveAnswers(row.id),
  };
}

/** The class's open question and its answers so far (?classId=). Polled while a question is open. */
export async function GET(req: Request) {
  const session = await getSession(req);
  if (!session) return error(401, "Not signed in");
  const found = await teachingClass(new URL(req.url).searchParams.get("classId") ?? "", session.parentId);
  if (!found) return error(404, "Class not found");
  return json({ live: await view(await openLive(found.cls.id)) });
}

/** Asks a new question from a unit (ending any open one). */
export async function POST(req: Request) {
  if (!sameOrigin(req)) return error(403, "Bad origin");
  const session = await getSession(req);
  if (!session) return error(401, "Not signed in");
  const body = (await req.json().catch(() => null)) as { classId?: unknown; unitKey?: unknown } | null;
  const found = typeof body?.classId === "string" ? await teachingClass(body.classId, session.parentId) : undefined;
  if (!found) return error(404, "Class not found");
  if (!(await isFlagOn("live-questions", session.familyId))) return error(503, "Live questions are switched off just now. Homework and practice still work.");
  if (await rateLimited(`live:${session.parentId}`, 120, 60 * 60_000)) return error(429, "That's a lot of live questions. Try again in a little while.");
  const key = typeof body?.unitKey === "string" ? body.unitKey : "";
  if (!(await validUnit(key, classGrades(found.cls), found.cls.framework))) return error(400, "That unit isn’t part of this class’s grade.");
  const row = await startLive(found.cls, key, session.parentId);
  if (!row) return error(400, "This unit’s questions are typed or built rather than tapped, so pick another unit for a live question.");
  return json({ live: await view(row) });
}

/** Shows the answer to the class (`{ classId, action: "reveal" }`). The question then takes no more answers. */
export async function PATCH(req: Request) {
  if (!sameOrigin(req)) return error(403, "Bad origin");
  const session = await getSession(req);
  if (!session) return error(401, "Not signed in");
  const body = (await req.json().catch(() => null)) as { classId?: unknown; action?: unknown } | null;
  const found = typeof body?.classId === "string" ? await teachingClass(body.classId, session.parentId) : undefined;
  if (!found) return error(404, "Class not found");
  if (body?.action !== "reveal") return error(400, "Unknown action.");
  await revealLive(found.cls.id);
  return json({ live: await view(await openLive(found.cls.id)) });
}

/** Ends the open question (?classId=). Students' screens stop showing it. */
export async function DELETE(req: Request) {
  if (!sameOrigin(req)) return error(403, "Bad origin");
  const session = await getSession(req);
  if (!session) return error(401, "Not signed in");
  const found = await teachingClass(new URL(req.url).searchParams.get("classId") ?? "", session.parentId);
  if (!found) return error(404, "Class not found");
  await endLive(found.cls.id);
  return json({ live: null });
}
