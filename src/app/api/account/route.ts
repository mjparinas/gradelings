import { appOrigin, clearCookie, clientIp, error, getSession, json, rateLimited, sameOrigin, verifyPassword } from "@/server/auth";
import { query } from "@/server/db";
import { deleteFamilyData } from "@/server/deleteFamily";
import { sendEmail } from "@/server/email";
import { accountDeletedEmail } from "@/server/emailTemplates";
import { getFamilyRow } from "@/server/family";
import { cancelSubscriptions, stripeCancellationConfigured } from "@/server/stripe";

/** Deletes the family's account and every piece of data stored on the server. */
export async function DELETE(req: Request) {
  if (!sameOrigin(req)) return error(403, "Bad origin");
  const session = await getSession(req);
  if (!session) return error(401, "Not signed in");
  const f = session.familyId;
  // Deleting is permanent, so it asks for the password again.
  if (await rateLimited(`delete:${session.parentId}:${clientIp(req)}`, 5, 60 * 60_000)) return error(429, "Too many attempts. Try again later.");
  const body = (await req.json().catch(() => null)) as { password?: unknown } | null;
  const password = typeof body?.password === "string" ? body.password : "";
  const stored = await query<{ password_hash: string }>("SELECT password_hash FROM parents WHERE id = ?", [session.parentId]);
  if (!stored[0] || password.length > 200 || !(await verifyPassword(password, stored[0].password_hash))) return error(403, "Please type your password to confirm.");
  // Stop billing first. If Stripe can't be reached, keep the account so the parent can try again.
  const family = await getFamilyRow(f);
  if (family?.stripe_customer && stripeCancellationConfigured()) {
    try {
      await cancelSubscriptions(family.stripe_customer);
    } catch {
      return error(502, "We couldn't cancel your subscription just now, so your account was not deleted. Please try again in a moment.");
    }
  }
  await deleteFamilyData(f);
  if (session.verified) await sendEmail(accountDeletedEmail(session.email, appOrigin(req)));
  return json({ ok: true }, { cookie: clearCookie() });
}
