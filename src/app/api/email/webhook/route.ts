import { error, json, readText } from "@/server/auth";
import { recordResendEvent, verifyResendSignature } from "@/server/emailLog";
import { recordWebhook } from "@/server/monitor";

/**
 * Resend's delivery reports (delivered, delayed, bounced, spam complaint) for the admin panel's email log.
 * Point a Resend webhook at /api/email/webhook/ and set RESEND_WEBHOOK_SECRET to its signing secret.
 */
export async function POST(req: Request) {
  const secret = process.env.RESEND_WEBHOOK_SECRET;
  if (!secret) return error(404, "Not found");
  const body = await readText(req, 100_000);
  if (body == null || !verifyResendSignature(secret, req.headers, body)) {
    await recordWebhook("resend", false, null, "Bad signature");
    return error(400, "Bad signature");
  }
  let event: Parameters<typeof recordResendEvent>[0];
  try {
    event = JSON.parse(body);
  } catch {
    return error(400, "Bad request");
  }
  await recordResendEvent(event);
  await recordWebhook("resend", true, typeof event.type === "string" ? event.type : null);
  return json({ ok: true });
}
