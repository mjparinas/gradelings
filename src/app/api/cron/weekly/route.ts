import { secretsMatch } from "@/server/auth";
import { sendAlert } from "@/server/alerts";
import { dailyFinished, runDaily, STUCK_AFTER_RUNS } from "@/server/dailyJob";
import { trackJob } from "@/server/monitor";

// Runs once a day at 15:00 UTC, and again every hour until 21:00 with `?resume=1` (see vercel.json). Vercel sends
// `Authorization: Bearer $CRON_SECRET`. The work is in src/server/dailyJob.ts:
// Every day: a one-time trial recap 4 to 10 days before the trial ends, and a "trial ends soon" notice to confirmed parents, once. On Sundays: the weekly report
// to parents who opted in (with a month summary on the first Sunday of the month). Every day: a gentle practice reminder, to opted-in parents only, at most once a week,
// from June 15 to June 30 the year in review, once per school year, to parents with progress emails on; on Mondays the class email to teachers who turned it on;
// and the delayed confirmation of US parental consent (src/server/consent.ts), once, a day or more after it was given.
//
// A run that is running out of time stops cleanly and says what is left (`complete: false`, `remaining`). The hourly
// `?resume=1` calls carry on from there, start the day's work if the first call never ran, and do nothing (and leave no
// trace in the System page) once everything is done. A call without `resume` always starts the day's work over, as before.

export const maxDuration = 300;

export async function GET(req: Request) {
  const secret = process.env.CRON_SECRET;
  if (!secret || !secretsMatch(req.headers.get("authorization") ?? "", `Bearer ${secret}`)) return new Response("Unauthorized", { status: 401 });
  const url = new URL(req.url);
  const origin = (process.env.NEXT_PUBLIC_SITE_URL ?? "").replace(/\/$/, "") || url.origin;
  const resume = url.searchParams.get("resume") === "1";
  // Nothing left to do: a resume call that only checked isn't a run worth recording on the System page.
  if (resume && (await dailyFinished())) return Response.json({ complete: true, remaining: [], skipped: true });
  // Each run is recorded for the admin panel's System page, and a failed run alerts the admins.
  try {
    const res = await trackJob("daily", async () => {
      const result = await runDaily({ origin, resume });
      if (result.stuck) {
        await sendAlert("job-stuck", {
          subject: "The daily email job isn't finishing",
          lines: [`It has run ${STUCK_AFTER_RUNS} times today and still has ${result.remaining.join(", ")} to do.`],
          path: "/admin/?tab=System",
        });
      }
      return Response.json(result);
    });
    if (!res.ok) await sendAlert("job-failed", { subject: "The daily email job failed", lines: [`It answered ${res.status}.`], path: "/admin/?tab=System" });
    return res;
  } catch (e) {
    await sendAlert("job-failed", { subject: "The daily email job failed", lines: [(e as Error).message.slice(0, 300)], path: "/admin/?tab=System" });
    throw e;
  }
}
