import { error, json } from "@/server/auth";
import { requireAdmin } from "@/server/admin";
import { funnel } from "@/server/adminFunnel";
import { FUNNEL_PERIODS, type FunnelPeriod } from "@/lib/funnel";

/** `?days=30|90|365`: how far families who signed up in that period got. */
export async function GET(req: Request) {
  const gate = await requireAdmin(req);
  if ("response" in gate) return gate.response;
  const days = Number(new URL(req.url).searchParams.get("days") ?? 90);
  if (!FUNNEL_PERIODS.includes(days as FunnelPeriod)) return error(400, "Pick 30, 90 or 365 days.");
  return json({ days, steps: await funnel(days) });
}
