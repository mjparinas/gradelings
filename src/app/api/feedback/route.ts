import { appOrigin, clientIp, error, getSession, json, newId, rateLimited, sameOrigin } from "@/server/auth";
import { run } from "@/server/db";
import { sendEmail } from "@/server/email";
import { questionReportEmail } from "@/server/emailTemplates";
import { CONTACT_EMAIL } from "@/lib/brand";
import { REPORT_REASONS } from "@/lib/reportReasons";
import { cleanReportDetails } from "@/lib/questionReport";
import { FRAMEWORKS, getFramework } from "@/content/frameworks";

const UNIT_KEY = /^[\w.-]{1,12}\/[\w-]{1,24}\/[\w-]{1,80}$/;

/** "Report a problem with this question": a unit, the question text, one fixed reason, the curriculum and what was on screen. Nothing about the child. */
export async function POST(req: Request) {
  if (!sameOrigin(req)) return error(403, "Bad origin");
  const session = await getSession(req);
  // Signed-in families get a higher limit than anonymous callers, and one cap covers everyone so the inbox can't be flooded.
  const who = session ? `report:p:${session.parentId}` : `report:${clientIp(req)}`;
  if (await rateLimited(who, session ? 20 : 5, 60 * 60_000)) return error(429, "Thanks! You’ve sent a lot of reports. Please try again later.");
  if (await rateLimited("report:all", 200, 60 * 60_000)) return error(429, "Thanks! We’ve had a lot of reports just now. Please try again later.");
  const body = (await req.json().catch(() => null)) as { unitKey?: unknown; prompt?: unknown; reason?: unknown; framework?: unknown; details?: unknown } | null;
  const reason = REPORT_REASONS.find((r) => r.id === body?.reason);
  if (typeof body?.unitKey !== "string" || !UNIT_KEY.test(body.unitKey) || typeof body.prompt !== "string" || !reason) return error(400, "Bad report");
  const prompt = body.prompt.replace(/\s+/g, " ").trim().slice(0, 300);
  const framework = FRAMEWORKS.find((f) => f.id === body.framework)?.id ?? null;
  const details = cleanReportDetails(body.details);
  await run("INSERT INTO question_reports (id, family_id, unit_key, prompt, reason, created_at, framework, details) VALUES (?, ?, ?, ?, ?, ?, ?, ?)", [
    newId(),
    session?.familyId ?? null,
    body.unitKey,
    prompt,
    reason.id,
    Date.now(),
    framework,
    details ? JSON.stringify(details) : null,
  ]);
  await sendEmail(questionReportEmail(CONTACT_EMAIL, { unitKey: body.unitKey, prompt, reason: reason.label, curriculum: framework ? getFramework(framework).name : undefined, details }, appOrigin(req)));
  return json({ ok: true });
}
