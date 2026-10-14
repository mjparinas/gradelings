import { appOrigin, clientIp, error, json, rateLimited, sameOrigin } from "@/server/auth";
import { sendEmail } from "@/server/email";
import { contactMessageEmail } from "@/server/emailTemplates";
import { CONTACT_EMAIL } from "@/lib/brand";
import { checkContact, topicLabel } from "@/lib/contact";

/**
 * The contact form. The message is emailed to our own inbox (where the admin panel's Inbox reads it) with the
 * sender as Reply-To; nothing is stored here. No copy goes back to the sender, so the form can't be used to
 * send mail to someone else's address.
 */
export async function POST(req: Request) {
  if (!sameOrigin(req)) return error(403, "Bad origin");
  const body = (await req.json().catch(() => null)) as Record<string, unknown> | null;
  // A field people never see: bots fill it in. They get the same answer as a real send.
  if (typeof body?.website === "string" && body.website.trim()) return json({ ok: true });
  const checked = checkContact(body);
  if (!checked.ok) return error(400, checked.error);
  if (await rateLimited(`contact:${clientIp(req)}`, 5, 60 * 60_000)) return error(429, `You’ve sent a few messages already. Please try again later, or email ${CONTACT_EMAIL}.`);
  if (await rateLimited("contact:all", 100, 60 * 60_000)) return error(429, `We’ve had a lot of messages just now. Please try again later, or email ${CONTACT_EMAIL}.`);
  const m = checked.value;
  const sent = await sendEmail(contactMessageEmail(CONTACT_EMAIL, { ...m, topic: topicLabel(m.topic) }, appOrigin(req)));
  if (!sent.ok) return error(503, `We couldn’t send that just now. Please email us at ${CONTACT_EMAIL}.`);
  return json({ ok: true });
}
