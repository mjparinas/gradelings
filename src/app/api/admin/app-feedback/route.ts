import { ADMIN_BODY_LIMIT, error, json, readJson } from "@/server/auth";
import { audit, requireAdmin } from "@/server/admin";
import { query, run } from "@/server/db";

/** "How's Gradelings?" feedback, newest first, with the average rating. The sender's email shows only when they ticked "OK to email me back". */
export async function GET(req: Request) {
  const gate = await requireAdmin(req);
  if ("response" in gate) return gate.response;
  const [rows, avg] = await Promise.all([
    query<{ id: string; family_id: string | null; audience: string; rating: number | null; topic: string | null; comment: string; created_at: number; handled_at: number | null; email: string | null }>(
      `SELECT f.id, f.family_id, f.audience, f.rating, f.topic, f.comment, f.created_at, f.handled_at,
              CASE WHEN f.can_reply = 1 THEN (SELECT p.email FROM parents p WHERE p.id = f.parent_id) END AS email
       FROM app_feedback f ORDER BY f.created_at DESC LIMIT 200`,
    ),
    query<{ audience: string; n: number; avg: number | null }>("SELECT audience, COUNT(rating) AS n, AVG(rating) AS avg FROM app_feedback GROUP BY audience"),
  ]);
  return json({
    feedback: rows.map((r) => ({
      id: r.id,
      familyId: r.family_id,
      audience: r.audience,
      rating: r.rating,
      topic: r.topic,
      comment: r.comment,
      at: Number(r.created_at),
      handled: r.handled_at != null,
      email: r.email,
    })),
    averages: avg.map((a) => ({ audience: a.audience, count: Number(a.n), average: a.avg === null ? null : Math.round(Number(a.avg) * 10) / 10 })),
  });
}

/** Marks one piece of feedback as dealt with (`{ id }`), or removes it (`{ id, remove: true }`). */
export async function PATCH(req: Request) {
  const gate = await requireAdmin(req);
  if ("response" in gate) return gate.response;
  const body = (await readJson(req, ADMIN_BODY_LIMIT)) as { id?: unknown; remove?: unknown } | null;
  if (typeof body?.id !== "string") return error(400, "Say which feedback.");
  if (body.remove === true) await run("DELETE FROM app_feedback WHERE id = ?", [body.id]);
  else await run("UPDATE app_feedback SET handled_at = ? WHERE id = ? AND handled_at IS NULL", [Date.now(), body.id]);
  await audit(gate.admin.email, body.remove === true ? "feedback.remove" : "feedback.handle", body.id, {});
  return json({ ok: true });
}
