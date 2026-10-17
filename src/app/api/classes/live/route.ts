import { error, getSession, json, rateLimited, sameOrigin } from "@/server/auth";
import { classGrades, teachingClass, validUnit } from "@/server/classroom";
import { isFlagOn } from "@/server/flags";
import { endLive, liveAnswers, openLive, cachedPreview, recentLive, revealLive, setLiveReadAloud, startLive, swapNextLive, type LiveRow } from "@/server/live";
import type { ClassRow } from "@/server/classroom";
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

/** The open question with a preview of the next one, which only the teacher's side ever gets. */
async function viewWithNext(row: LiveRow | undefined, cls: ClassRow): Promise<LiveForTeacher | null> {
  const live = await view(row);
  if (live && row) live.next = (await cachedPreview(cls, row))?.data ?? null;
  return live;
}

/** The class's open question and its answers so far (?classId=), or the day's questions (?recap=1). Polled while a question is open. */
export async function GET(req: Request) {
  const session = await getSession(req);
  if (!session) return error(401, "Not signed in");
  const found = await teachingClass(new URL(req.url).searchParams.get("classId") ?? "", session.parentId);
  if (!found) return error(404, "Class not found");
  // ?recap=1: the day's questions with their answers, so a teacher can look back before they are deleted.
  if (new URL(req.url).searchParams.get("recap")) {
    const rows = await recentLive(found.cls.id);
    return json({ recap: (await Promise.all(rows.map(view))).filter(Boolean) });
  }
  return json({ live: await viewWithNext(await openLive(found.cls.id), found.cls) });
}

/** Asks a new question from a unit (ending any open one). */
export async function POST(req: Request) {
  if (!sameOrigin(req)) return error(403, "Bad origin");
  const session = await getSession(req);
  if (!session) return error(401, "Not signed in");
  const body = (await req.json().catch(() => null)) as { classId?: unknown; unitKey?: unknown; readAloud?: unknown } | null;
  const found = typeof body?.classId === "string" ? await teachingClass(body.classId, session.parentId) : undefined;
  if (!found) return error(404, "Class not found");
  if (!(await isFlagOn("live-questions", session.familyId))) return error(503, "Live questions are switched off just now. Homework and practice still work.");
  if (await rateLimited(`live:${session.parentId}`, 120, 60 * 60_000)) return error(429, "That's a lot of live questions. Try again in a little while.");
  const key = typeof body?.unitKey === "string" ? body.unitKey : "";
  if (!(await validUnit(key, classGrades(found.cls), found.cls.framework))) return error(400, "That unit isn’t part of this class’s grade.");
  const row = await startLive(found.cls, key, session.parentId, Date.now(), { readAloud: body?.readAloud !== false });
  if (!row) return error(400, "This unit’s questions are typed or built rather than tapped, so pick another unit for a live question.");
  return json({ live: await viewWithNext(row, found.cls) });
}

/**
 * `{ classId, action: "reveal" }` shows the answer to the class (the question then takes no more answers);
 * `{ classId, action: "swap-next" }` swaps the previewed next question for a different one;
 * `{ classId, action: "read-aloud", on }` lets students hear the open question read aloud, or not.
 */
export async function PATCH(req: Request) {
  if (!sameOrigin(req)) return error(403, "Bad origin");
  const session = await getSession(req);
  if (!session) return error(401, "Not signed in");
  const body = (await req.json().catch(() => null)) as { classId?: unknown; action?: unknown; on?: unknown } | null;
  const found = typeof body?.classId === "string" ? await teachingClass(body.classId, session.parentId) : undefined;
  if (!found) return error(404, "Class not found");
  if (body?.action === "read-aloud") {
    if (typeof body.on !== "boolean") return error(400, "Say whether to read the question aloud.");
    await setLiveReadAloud(found.cls.id, body.on);
    return json({ live: await viewWithNext(await openLive(found.cls.id), found.cls) });
  }
  if (body?.action !== "reveal" && body?.action !== "swap-next") return error(400, "Unknown action.");
  if (body.action === "reveal") await revealLive(found.cls.id);
  else if (!(await swapNextLive(found.cls))) return error(409, "There's no other question to show from this unit just now.");
  return json({ live: await viewWithNext(await openLive(found.cls.id), found.cls) });
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
