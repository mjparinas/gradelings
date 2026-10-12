import "server-only";
import { funnelSteps, type FunnelStep } from "@/lib/funnel";
import { LIVE_PROFILE, PRACTICE_DAYS } from "./adminEmail";
import { query } from "./db";

const DAY = 86_400_000;
const REAL = "NOT EXISTS (SELECT 1 FROM parents s WHERE s.family_id = f.id AND s.role = 'student')";

/** How far families who signed up in the last `days` days got. Counts only; class student accounts are left out. */
export async function funnel(days: number, now = Date.now()): Promise<FunnelStep[]> {
  const rows = await query<Record<string, number | null>>(
    `SELECT COUNT(*) AS signed_up,
       SUM(CASE WHEN EXISTS (SELECT 1 FROM parents p WHERE p.family_id = f.id AND p.email_verified_at IS NOT NULL) THEN 1 ELSE 0 END) AS confirmed,
       SUM(CASE WHEN EXISTS (SELECT 1 FROM profiles pr WHERE pr.family_id = f.id AND ${LIVE_PROFILE}) THEN 1 ELSE 0 END) AS child,
       SUM(CASE WHEN EXISTS (SELECT 1 FROM events e WHERE e.family_id = f.id) THEN 1 ELSE 0 END) AS practised,
       SUM(CASE WHEN ${PRACTICE_DAYS} >= 3 THEN 1 ELSE 0 END) AS regular,
       SUM(CASE WHEN f.plan = 'premium' OR EXISTS (SELECT 1 FROM payments pay WHERE pay.family_id = f.id) THEN 1 ELSE 0 END) AS paying
     FROM families f WHERE ${REAL} AND f.created_at > ?`,
    [now - days * DAY],
  );
  const r = rows[0] ?? {};
  return funnelSteps(["signed_up", "confirmed", "child", "practised", "regular", "paying"].map((k) => Number(r[k] ?? 0)));
}
