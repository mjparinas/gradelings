import { clientIp, error, json, rateLimited } from "@/server/auth";
import { familyForConsentToken, revokeConsent } from "@/server/consent";

/**
 * Withdraws US parental consent from the link in a consent email (no sign-in needed, like an unsubscribe link):
 * the children's information is deleted from our servers and sync stops uploading it. POST only, from the page
 * the link opens, so a mail scanner that follows links can't trigger it.
 */
export async function POST(req: Request) {
  if (await rateLimited(`consent-withdraw:${clientIp(req)}`, 30)) return error(429, "Too many attempts. Try again later.");
  const familyId = await familyForConsentToken(new URL(req.url).searchParams.get("token") ?? "");
  if (!familyId) return error(400, "This link isn’t valid.");
  await revokeConsent(familyId);
  return json({ ok: true });
}
