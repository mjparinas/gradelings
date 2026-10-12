import { json } from "@/server/auth";
import { requireAdmin } from "@/server/admin";
import { query } from "@/server/db";

const DAY = 86_400_000;
/** Families that are class student accounts are not customers, so the numbers leave them out. */
const REAL = "NOT EXISTS (SELECT 1 FROM parents p WHERE p.family_id = f.id AND p.role = 'student')";

const count = async (sql: string, args: (string | number)[] = []) => Number((await query<{ n: number }>(sql, args))[0]?.n ?? 0);

/** Headline numbers for the admin overview. Counts only; nothing about any one family. */
export async function GET(req: Request) {
  const gate = await requireAdmin(req);
  if ("response" in gate) return gate.response;
  const now = Date.now();
  const [families, new7, new30, trialing, paid, monthly, yearly, codeAccess, children, active7, active30, classes, students, redemptions, reports] = await Promise.all([
    count(`SELECT COUNT(*) AS n FROM families f WHERE ${REAL}`),
    count(`SELECT COUNT(*) AS n FROM families f WHERE ${REAL} AND f.created_at > ?`, [now - 7 * DAY]),
    count(`SELECT COUNT(*) AS n FROM families f WHERE ${REAL} AND f.created_at > ?`, [now - 30 * DAY]),
    count(`SELECT COUNT(*) AS n FROM families f WHERE ${REAL} AND f.plan = 'trial' AND f.trial_ends_at > ?`, [now]),
    count(`SELECT COUNT(*) AS n FROM families f WHERE ${REAL} AND f.plan = 'premium'`),
    count(`SELECT COUNT(*) AS n FROM families f WHERE ${REAL} AND f.plan = 'premium' AND f.subscription_interval = 'month'`),
    count(`SELECT COUNT(*) AS n FROM families f WHERE ${REAL} AND f.plan = 'premium' AND f.subscription_interval = 'year'`),
    count(`SELECT COUNT(*) AS n FROM families f WHERE ${REAL} AND f.access_until > ?`, [now]),
    count(`SELECT COUNT(*) AS n FROM profiles pr JOIN families f ON f.id = pr.family_id WHERE ${REAL} AND COALESCE(json_extract(pr.data, '$.deleted'), 0) = 0`),
    count("SELECT COUNT(DISTINCT family_id) AS n FROM events WHERE t > ?", [now - 7 * DAY]),
    count("SELECT COUNT(DISTINCT family_id) AS n FROM events WHERE t > ?", [now - 30 * DAY]),
    count("SELECT COUNT(*) AS n FROM classes WHERE closed_at IS NULL"),
    count("SELECT COUNT(*) AS n FROM students"),
    count("SELECT COUNT(*) AS n FROM code_redemptions"),
    count("SELECT COUNT(*) AS n FROM question_reports"),
  ]);
  return json({ families, new7, new30, trialing, paid, monthly, yearly, codeAccess, children, active7, active30, classes, students, redemptions, reports });
}
