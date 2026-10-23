import { clientIp, error, getSession, json, newId, rateLimited, sameOrigin } from "@/server/auth";
import { run } from "@/server/db";
import { isFlagOn } from "@/server/flags";
import { checkFeedback } from "@/lib/appFeedback";

/**
 * "How's Gradelings?": a rating and/or a line from a grown-up. Stored apart from everything else, with the family
 * only so it can be deleted with the account and so an admin can reply when the sender ticked the box. Class
 * student sessions are never accepted (getSession returns null for them), so no child can send it.
 */
export async function POST(req: Request) {
  if (!sameOrigin(req)) return error(403, "Bad origin");
  const session = await getSession(req);
  if (!(await isFlagOn("app-feedback", session?.familyId ?? null))) return error(404, "Not found");
  const who = session ? `feedback:p:${session.parentId}` : `feedback:${clientIp(req)}`;
  if (await rateLimited(who, session ? 10 : 3, 60 * 60_000)) return error(429, "Thank you! You’ve sent a few already. Please try again later.");
  if (await rateLimited("feedback:all", 200, 60 * 60_000)) return error(429, "Thank you! We’ve had a lot of feedback just now. Please try again later.");
  const checked = checkFeedback(await req.json().catch(() => null));
  if (!checked.ok) return error(400, checked.error);
  const f = checked.value;
  await run("INSERT INTO app_feedback (id, family_id, parent_id, audience, rating, topic, comment, can_reply, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)", [
    newId(),
    session?.familyId ?? null,
    session?.parentId ?? null,
    f.audience,
    f.rating,
    f.topic,
    f.comment,
    // Only a signed-in sender has an address to reply to.
    session && f.canReply ? 1 : 0,
    Date.now(),
  ]);
  return json({ ok: true });
}
