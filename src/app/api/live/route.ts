import { error, getSession, json, sameOrigin } from "@/server/auth";
import { isFlagOn } from "@/server/flags";
import { answerLive, liveForChild } from "@/server/live";
import { timerForChild } from "@/server/classTimer";
import type { LiveForChild, LiveQuestionData } from "@/lib/live";

// Live questions, from a child's device. A class student's narrow session may use this route as well
// as a parent's: it only reads and answers the open question in a class the child is already in, and
// sees nothing about anyone else. Needs a connection; the kids' app hides it while offline.

/**
 * What a device polls: the open question and the class timer for one of this device's children (?profile=),
 * together so each device makes one request, not two. With ?timer=1, only the timer (older app versions).
 */
export async function GET(req: Request) {
  const session = await getSession(req, { student: true });
  if (!session) return json({ live: null, timer: null });
  const params = new URL(req.url).searchParams;
  const profileId = params.get("profile") ?? "";
  const timerOnly = Boolean(params.get("timer"));
  if (!profileId) return json({ live: null, timer: null });
  const [liveOn, timerOn] = await Promise.all([timerOnly ? false : isFlagOn("live-questions", session.familyId), isFlagOn("class-timer", session.familyId)]);
  const [found, foundTimer] = await Promise.all([liveOn ? liveForChild(session.familyId, profileId) : null, timerOn ? timerForChild(session.familyId, profileId) : null]);
  const timer = foundTimer ? { ...foundTimer.timer, className: foundTimer.className } : null;
  if (timerOnly) return json({ timer });
  if (!found) return json({ live: null, timer });
  const { answer, hint, ...question } = JSON.parse(found.row.data) as LiveQuestionData;
  const revealed = found.row.revealed_at != null;
  const live: LiveForChild = { id: found.row.id, className: found.className, question, mine: found.mine, ...(revealed ? { answer, hint } : {}) };
  return json({ live, timer });
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
