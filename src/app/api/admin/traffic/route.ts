import { error, json } from "@/server/auth";
import { requireAdmin } from "@/server/admin";
import { isTrafficPart, trafficPart, trafficReport } from "@/server/traffic";
import { isPeriod } from "@/lib/traffic";

/**
 * Search Console and Vercel Web Analytics for the last `days` (7, 28 or 90). `?part=search` or `?part=visits`
 * answers for one part, so the tab can show each as soon as it is ready. `?refresh=1` skips the 10-minute cache.
 */
export async function GET(req: Request) {
  const gate = await requireAdmin(req);
  if ("response" in gate) return gate.response;
  const q = new URL(req.url).searchParams;
  const days = Number(q.get("days") ?? 28);
  if (!isPeriod(days)) return error(400, "Pick 7, 28 or 90 days.");
  const opts = { refresh: q.get("refresh") === "1" };
  const part = q.get("part");
  if (part !== null) return isTrafficPart(part) ? json(await trafficPart(part, days, opts)) : error(400, "Pick search or visits.");
  return json(await trafficReport(days, opts));
}
