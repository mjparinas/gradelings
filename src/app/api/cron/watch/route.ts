import { secretsMatch } from "@/server/auth";
import { watchSystem } from "@/server/alerts";

// Called by any scheduler with `Authorization: Bearer $CRON_SECRET` (none calls it on a schedule
// today; UptimeRobot watches /api/health/ instead). Runs the admin panel's System checks and emails the admins when one
// goes down, and again when it's working.
export const maxDuration = 60;

export async function GET(req: Request) {
  const secret = process.env.CRON_SECRET;
  if (!secret || !secretsMatch(req.headers.get("authorization") ?? "", `Bearer ${secret}`)) return new Response("Unauthorized", { status: 401 });
  const origin = (process.env.NEXT_PUBLIC_SITE_URL ?? "").replace(/\/$/, "") || new URL(req.url).origin;
  return Response.json(await watchSystem(Date.now(), origin));
}
