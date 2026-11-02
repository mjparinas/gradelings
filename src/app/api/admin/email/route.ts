import { ADMIN_BODY_LIMIT, appOrigin, createAuthToken, error, json, readJson } from "@/server/auth";
import { audit, requireAdmin } from "@/server/admin";
import { familyRecipient, segmentAudience, sendMessage } from "@/server/adminEmail";
import { query } from "@/server/db";
import { sendEmail } from "@/server/email";
import { emailCounts, emailLog } from "@/server/emailLog";
import { verifyEmail } from "@/server/emailTemplates";
import { isSegment, messageProblem, type AdminMessage } from "@/lib/adminEmails";

// Email from the admin panel: the log of what was sent, who a group would reach, and sending.
// A group send needs the count typed back ("SEND 42"), so a click alone never emails a crowd.

const DAY = 86_400_000;
// A group of up to 100 emails, a couple a second.
export const maxDuration = 120;

/** `?segment=` previews who a group send reaches; otherwise the email log (`familyId`, `kind`, `status` filter it). */
export async function GET(req: Request) {
  const gate = await requireAdmin(req);
  if ("response" in gate) return gate.response;
  const url = new URL(req.url);
  const segment = url.searchParams.get("segment");
  if (segment !== null) {
    if (!isSegment(segment)) return error(400, "Unknown group.");
    const a = await segmentAudience(segment);
    return json({ ready: a.ready, batch: a.sendTo.length, total: a.total, skipped: a.skipped, sample: a.sendTo.slice(0, 10).map((r) => ({ familyId: r.familyId, email: r.email })) });
  }
  const pick = (k: string) => url.searchParams.get(k) || undefined;
  const [emails, counts] = await Promise.all([emailLog({ familyId: pick("familyId"), kind: pick("kind"), status: pick("status") }), emailCounts(Date.now() - 30 * DAY)]);
  return json({ emails, counts30: counts, resendWebhook: Boolean(process.env.RESEND_WEBHOOK_SECRET) });
}

interface Body {
  action?: unknown;
  familyId?: unknown;
  segment?: unknown;
  message?: unknown;
  confirm?: unknown;
}

export async function POST(req: Request) {
  const gate = await requireAdmin(req);
  if ("response" in gate) return gate.response;
  const admin = gate.admin.email;
  const body = ((await readJson(req, ADMIN_BODY_LIMIT)) ?? {}) as Body;
  const origin = appOrigin(req);

  if (body.action === "verify") {
    // The real confirmation email, sent again. It's an account email, so it goes even with news and tips turned off.
    const familyId = typeof body.familyId === "string" ? body.familyId : "";
    const parent = (
      await query<{ id: string; email: string; email_verified_at: number | null; role: string }>(
        "SELECT id, email, email_verified_at, role FROM parents WHERE family_id = ? ORDER BY created_at LIMIT 1",
        [familyId],
      )
    )[0];
    if (!parent || parent.role === "student") return error(404, "No such family.");
    if (parent.email_verified_at) return error(400, "This email is already confirmed.");
    const sent = await sendEmail({ ...verifyEmail(parent.email, origin, await createAuthToken(parent.id, "verify", 3 * DAY)), sentBy: admin });
    await audit(admin, "email.verify", familyId);
    return sent.ok ? json({ ok: true }) : error(502, "The email couldn't be sent. Check the email settings.");
  }

  const problem = messageProblem(body.message);
  if (problem) return error(400, problem);
  const m = body.message as AdminMessage;
  const message: AdminMessage = { subject: m.subject, body: m.body, button: m.button ? { label: m.button.label, path: m.button.path } : null };

  if (body.action === "send") {
    const familyId = typeof body.familyId === "string" ? body.familyId : "";
    const r = await familyRecipient(familyId);
    if (!r) return error(404, "No such family.");
    if (r.blocked === "unconfirmed") return error(400, "This account hasn't confirmed its email yet. Send the confirmation email instead.");
    if (r.blocked === "unsubscribed") return error(400, "This account turned off news and tips.");
    if (r.blocked === "bounced") return error(400, "Email to this address bounced or was marked as spam.");
    const res = await sendMessage([r], message, origin, admin);
    await audit(admin, "email.send", familyId, { subject: message.subject });
    return res.sent ? json({ ok: true }) : error(502, "The email couldn't be sent. Check the email settings.");
  }

  if (body.action === "send-segment") {
    if (!isSegment(body.segment)) return error(400, "Unknown group.");
    const a = await segmentAudience(body.segment);
    if (!a.sendTo.length) return error(400, "Nobody in this group can be emailed right now.");
    if (body.confirm !== `SEND ${a.sendTo.length}`) return error(400, `Type SEND ${a.sendTo.length} to confirm.`);
    const res = await sendMessage(a.sendTo, message, origin, admin);
    await audit(admin, "email.send-group", body.segment, { subject: message.subject, ...res });
    return json({ ...res, remaining: Math.max(0, a.ready - a.sendTo.length) });
  }

  return error(400, "Unknown action.");
}
