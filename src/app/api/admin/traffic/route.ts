import { error, json } from "@/server/auth";
import { requireAdmin } from "@/server/admin";
import { trafficReport } from "@/server/traffic";
import { isPeriod } from "@/lib/traffic";

/** Search Console and Vercel Web Analytics for the last `days` (7, 28 or 90). `?refresh=1` skips the 10-minute cache. */
export async function GET(req: Request) {
  const gate = await requireAdmin(req);
  if ("response" in gate) return gate.response;
  const q = new URL(req.url).searchParams;
  const days = Number(q.get("days") ?? 28);
  if (!isPeriod(days)) return error(400, "Pick 7, 28 or 90 days.");
  return json(await trafficReport(days, { refresh: q.get("refresh") === "1" }));
}
