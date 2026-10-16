import { error, getSession, json, sameOrigin } from "@/server/auth";
import { isFlagOn } from "@/server/flags";
import { answerLive, liveForChild } from "@/server/live";
import { timerForChild } from "@/server/classTimer";
import type { LiveForChild, LiveQuestionData } from "@/lib/live";

// Live questions, from a child's device. A class student's narrow session may use this route as well
// as a parent's: it only reads and answers the open question in a class the child is already in, and
// sees nothing about anyone else. Needs a connection; the kids' app hides it while offline.

/** The open question for one of this device's children (?profile=), or null; with ?timer=1, the class timer instead. */
export async function GET(req: Request) {
  const session = await getSession(req, { student: true });
  if (!session) return json({ live: null });
  const params = new URL(req.url).searchParams;
  const profileId = params.get("profile") ?? "";
  // ?timer=1: only the class timer, which shows on every kids' screen (the question is for the home screen).
  if (params.get("timer")) {
    if (!profileId || !(await isFlagOn("class-timer", session.familyId))) return json({ timer: null });
    const found = await timerForChild(session.familyId, profileId);
    return json({ timer: found ? { ...found.timer, className: found.className } : null });
  }
  if (!profileId || !(await isFlagOn("live-questions", session.familyId))) return json({ live: null });
  const found = await liveForChild(session.familyId, profileId);
  if (!found) return json({ live: null });
  const { answer, hint, ...question } = JSON.parse(found.row.data) as LiveQuestionData;
  const revealed = found.row.revealed_at != null;
  const live: LiveForChild = { id: found.row.id, className: found.className, question, mine: found.mine, ...(revealed ? { answer, hint } : {}) };
  return json({ live });
}

/** Sends a child's answer (`{ questionId, profileId, choice }`). The first answer counts. */
export async function POST(req: Request) {
  if (!sameOrigin(req)) return error(403, "Bad origin");
  const session = await getSession(req, { student: true });
  if (!session) return error(401, "Not signed in");
  const body = (await req.json().catch(() => null)) as { questionId?: unknown; profileId?: unknown; choice?: unknown } | null;
  if (typeof body?.questionId !== "string" || typeof body.profileId !== "string" || typeof body.choice !== "string") return error(400, "Missing answer.");
  const result = await answerLive(session.familyId, body.profileId, body.questionId, body.choice);
  if (result === "invalid") return error(404, "Question not found");
  if (result === "closed") return error(409, "Your teacher already closed this question.");
  return json({ ok: true });
}
