import { error, getSession, json, readJson, sameOrigin } from "@/server/auth";
import { isFlagOn } from "@/server/flags";
import { answerLive, liveForChild, recordPresence } from "@/server/live";
import { childWatch, waitForChange } from "@/server/liveWatch";
import { timerForChild } from "@/server/classTimer";
import { goalForChild } from "@/server/classGoal";
import type { LiveForChild, LiveQuestionData } from "@/lib/live";

// Live questions, from a child's device. A class student's narrow session may use this route as well
// as a parent's: it only reads and answers the open question in a class the child is already in, and
// sees nothing about anyone else. Needs a connection; the kids' app hides it while offline.

/**
 * What a device polls: the open question and the class timer for one of this device's children (?profile=),
 * together so each device makes one request, not two. With ?timer=1, only the timer (older app versions).
 * With ?watch=1 the answer also carries `v` (a signature of what a child's classes could send) and `hot` (a
 * question, timer or teacher is around, so look often); sending that back as ?v= holds the request until
 * something changes or a few seconds pass (see liveWatch.ts). Without ?watch it answers at once, as before.
 */
export const maxDuration = 30;

export async function GET(req: Request) {
  const session = await getSession(req, { student: true });
  if (!session) return json({ live: null, timer: null, goal: null });
  const params = new URL(req.url).searchParams;
  const profileId = params.get("profile") ?? "";
  const timerOnly = Boolean(params.get("timer"));
  if (!profileId) return json({ live: null, timer: null, goal: null });
  const [liveOn, timerOn, goalOn, awayOn] = await Promise.all([timerOnly ? false : isFlagOn("live-questions", session.familyId), isFlagOn("class-timer", session.familyId), timerOnly ? false : isFlagOn("class-goal", session.familyId), timerOnly ? false : isFlagOn("live-away", session.familyId)]);
  // A visible device just asked: the teacher's desks can show this student as here (recorded before a held request waits).
  if (awayOn) await recordPresence(session.familyId, profileId, false);
  // The signature is read before the answer is, so a change in between makes the next request return at once.
  const watching = Boolean(params.get("watch")) && !timerOnly;
  const watch = !watching ? null : params.has("v") ? await waitForChange(session.familyId, profileId, params.get("v") ?? "") : await childWatch(session.familyId, profileId);
  const extra = watch ? { v: watch.sig, hot: watch.hot } : {};
  const [found, foundTimer, goal] = await Promise.all([liveOn ? liveForChild(session.familyId, profileId) : null, timerOn ? timerForChild(session.familyId, profileId) : null, goalOn ? goalForChild(session.familyId, profileId) : null]);
  const timer = foundTimer ? { ...foundTimer.timer, className: foundTimer.className } : null;
  if (timerOnly) return json({ timer });
  if (!found) return json({ live: null, timer, goal, ...extra });
  const { answer, hint, ...question } = JSON.parse(found.row.data) as LiveQuestionData;
  const revealed = found.row.revealed_at != null;
  const live: LiveForChild = { id: found.row.id, className: found.className, question, mine: found.mine, ...(revealed ? { answer, hint } : {}) };
  return json({ live, timer, goal, ...extra });
}

/** Sends a child's answer (`{ questionId, profileId, choice }`). The first answer counts. */
export async function POST(req: Request) {
  if (!sameOrigin(req)) return error(403, "Bad origin");
  const session = await getSession(req, { student: true });
  if (!session) return error(401, "Not signed in");
  const body = (await readJson(req)) as { questionId?: unknown; profileId?: unknown; choice?: unknown; leaving?: unknown } | null;
  // `{ profileId, leaving: true }`: the device's tab was hidden or is closing (sent with sendBeacon).
  if (body?.leaving === true) {
    if (typeof body.profileId === "string" && (await isFlagOn("live-away", session.familyId))) await recordPresence(session.familyId, body.profileId, true);
    return json({ ok: true });
  }
  if (typeof body?.questionId !== "string" || typeof body.profileId !== "string" || typeof body.choice !== "string") return error(400, "Missing answer.");
  const result = await answerLive(session.familyId, body.profileId, body.questionId, body.choice);
  if (result === "invalid") return error(404, "Question not found");
  if (result === "closed") return error(409, "Your teacher already closed this question.");
  return json({ ok: true });
}
