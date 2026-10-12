import { error } from "@/server/auth";
import { audit, requireAdmin } from "@/server/admin";
import { query } from "@/server/db";
import { isoTime, toCsv, type Cell } from "@/lib/csv";

// CSV downloads for accounting and spreadsheets: accounts, payments and the email log. Account emails and
// counts only: never children's names or results. Class student accounts are left out. Each download is logged.

const REAL = "NOT EXISTS (SELECT 1 FROM parents s WHERE s.family_id = f.id AND s.role = 'student')";
const EXPORTS = ["users", "payments", "emails"] as const;
type Kind = (typeof EXPORTS)[number];

const n = (v: unknown) => (v == null ? null : Number(v));

async function build(kind: Kind): Promise<{ header: string[]; rows: Cell[][] }> {
  if (kind === "users") {
    const rows = await query<Record<string, unknown>>(
      `SELECT f.id, p.email, f.created_at, p.email_verified_at, f.plan, f.subscription_status, f.subscription_interval, f.trial_ends_at, f.access_until, p.last_login_at, p.admin_mail,
         (SELECT MAX(e.t) FROM events e WHERE e.family_id = f.id) AS last_practice,
         (SELECT COUNT(*) FROM profiles pr WHERE pr.family_id = f.id AND COALESCE(json_extract(pr.data, '$.deleted'), 0) = 0) AS children,
         (SELECT COALESCE(SUM(amount - refunded), 0) FROM payments pay WHERE pay.family_id = f.id) AS paid
       FROM families f JOIN parents p ON p.id = (SELECT p2.id FROM parents p2 WHERE p2.family_id = f.id ORDER BY p2.created_at LIMIT 1)
       WHERE ${REAL} ORDER BY f.created_at`,
    );
    return {
      header: ["family_id", "email", "signed_up", "email_confirmed", "plan", "subscription_status", "interval", "trial_ends", "access_until", "last_sign_in", "last_practice", "children", "paid_total", "news_and_tips"],
      rows: rows.map((r) => [
        String(r.id),
        String(r.email),
        isoTime(n(r.created_at)),
        r.email_verified_at != null ? "yes" : "no",
        String(r.plan),
        (r.subscription_status as string | null) ?? "",
        (r.subscription_interval as string | null) ?? "",
        isoTime(n(r.trial_ends_at)),
        isoTime(n(r.access_until)),
        isoTime(n(r.last_login_at)),
        isoTime(n(r.last_practice)),
        Number(r.children ?? 0),
        (Number(r.paid ?? 0) / 100).toFixed(2),
        Number(r.admin_mail) ? "yes" : "no",
      ]),
    };
  }
  if (kind === "payments") {
    const rows = await query<Record<string, unknown>>(
      `SELECT pay.id, pay.family_id, pay.amount, pay.refunded, pay.currency, pay.interval, pay.paid_at,
         (SELECT p.email FROM parents p WHERE p.family_id = pay.family_id ORDER BY p.created_at LIMIT 1) AS email
       FROM payments pay ORDER BY pay.paid_at`,
    );
    return {
      header: ["paid_at", "invoice", "family_id", "email", "amount", "refunded", "net", "currency", "interval"],
      rows: rows.map((r) => {
        const amount = Number(r.amount);
        const refunded = Number(r.refunded ?? 0);
        return [isoTime(n(r.paid_at)), String(r.id), (r.family_id as string | null) ?? "", (r.email as string | null) ?? "", (amount / 100).toFixed(2), (refunded / 100).toFixed(2), ((amount - refunded) / 100).toFixed(2), String(r.currency), (r.interval as string | null) ?? ""];
      }),
    };
  }
  const rows = await query<Record<string, unknown>>(
    `SELECT l.sent_at, l.family_id, p.email, l.kind, l.label, l.status, l.sent_by FROM email_log l LEFT JOIN parents p ON p.id = l.parent_id ORDER BY l.sent_at DESC LIMIT 50000`,
  );
  return {
    header: ["sent_at", "family_id", "to", "kind", "subject", "status", "sent_by"],
    rows: rows.map((r) => [isoTime(n(r.sent_at)), String(r.family_id), (r.email as string | null) ?? "", String(r.kind), (r.label as string | null) ?? "", String(r.status), (r.sent_by as string | null) ?? ""]),
  };
}

/** `?type=users|payments|emails` downloads a CSV. */
export async function GET(req: Request) {
  const gate = await requireAdmin(req);
  if ("response" in gate) return gate.response;
  const kind = new URL(req.url).searchParams.get("type") as Kind;
  if (!EXPORTS.includes(kind)) return error(400, "Pick users, payments or emails.");
  const { header, rows } = await build(kind);
  await audit(gate.admin.email, "export", kind, { rows: rows.length });
  const date = new Date().toISOString().slice(0, 10);
  return new Response(toCsv(header, rows), {
    headers: {
      "content-type": "text/csv; charset=utf-8",
      "content-disposition": `attachment; filename="${kind}-${date}.csv"`,
      "cache-control": "no-store",
    },
  });
}
