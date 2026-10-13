import { json } from "@/server/auth";
import { requireAdmin } from "@/server/admin";
import { isCheckId, isStatusPageName, runCheck, runStatusPage, systemReport } from "@/server/systemHealth";

/**
 * Health of every part of the stack and the providers' status pages. `?check=database` or `?page=Vercel` answers
 * for one card, so the page can show each as soon as it is ready; with neither, everything at once.
 * `?refresh=1` skips the minute-long cache.
 */
export async function GET(req: Request) {
  const gate = await requireAdmin(req);
  if ("response" in gate) return gate.response;
  const params = new URL(req.url).searchParams;
  const opts = { refresh: params.get("refresh") === "1" };
  const check = params.get("check");
  const page = params.get("page");
  if (check !== null) return isCheckId(check) ? json(await runCheck(check, opts)) : json({ error: "No such check." }, { status: 404 });
  if (page !== null) return isStatusPageName(page) ? json(await runStatusPage(page, opts)) : json({ error: "No such status page." }, { status: 404 });
  return json(await systemReport(opts));
}
