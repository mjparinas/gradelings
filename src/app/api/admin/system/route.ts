import { ADMIN_BODY_LIMIT, error, json, readJson } from "@/server/auth";
import { requireAdmin } from "@/server/admin";
import { isCheckId, isStatusPageName, recordRestoreDrill, runCheck, runStatusPage, systemReport } from "@/server/systemHealth";

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

/** Writes down that a restore was practised: `{ restoreDrill: "2026-10-23" }` (a day, UTC). Shown on the Backups card. */
export async function POST(req: Request) {
  const gate = await requireAdmin(req);
  if ("response" in gate) return gate.response;
  const body = (await readJson(req, ADMIN_BODY_LIMIT)) as { restoreDrill?: unknown } | null;
  const day = typeof body?.restoreDrill === "string" && /^\d{4}-\d{2}-\d{2}$/.test(body.restoreDrill) ? body.restoreDrill : "";
  const at = day ? Date.parse(`${day}T12:00:00Z`) : NaN;
  if (!Number.isFinite(at)) return error(400, "Pick the day the restore was practised.");
  try {
    return json(await recordRestoreDrill(gate.admin.email, at));
  } catch (e) {
    return error(400, (e as Error).message);
  }
}
