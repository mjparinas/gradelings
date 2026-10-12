import { error, json } from "@/server/auth";
import { audit, requireAdmin } from "@/server/admin";
import { query, run } from "@/server/db";

/** "Report a problem" submissions from the kids' app, grouped by question, most reported first. */
export async function GET(req: Request) {
  const gate = await requireAdmin(req);
  if ("response" in gate) return gate.response;
  const rows = await query<{ unit_key: string; prompt: string; reason: string; n: number; latest: number }>(
    `SELECT unit_key, prompt, reason, COUNT(*) AS n, MAX(created_at) AS latest FROM question_reports
     GROUP BY unit_key, prompt, reason ORDER BY n DESC, latest DESC LIMIT 200`,
  );
  return json({ reports: rows.map((r) => ({ unitKey: r.unit_key, prompt: r.prompt, reason: r.reason, count: Number(r.n), latest: Number(r.latest) })) });
}

/** Clears the reports about one question once it is fixed or checked: `{ unitKey, prompt }`. */
export async function DELETE(req: Request) {
  const gate = await requireAdmin(req);
  if ("response" in gate) return gate.response;
  const body = (await req.json().catch(() => null)) as { unitKey?: unknown; prompt?: unknown } | null;
  if (typeof body?.unitKey !== "string" || typeof body.prompt !== "string") return error(400, "Say which question.");
  const removed = await run("DELETE FROM question_reports WHERE unit_key = ? AND prompt = ?", [body.unitKey, body.prompt]);
  await audit(gate.admin.email, "reports.clear", body.unitKey, { prompt: body.prompt.slice(0, 120), removed });
  return json({ ok: true, removed });
}
