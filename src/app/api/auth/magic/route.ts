import { appOrigin, clientIp, createAuthToken, error, json, rateLimited, readJson, sameOrigin } from "@/server/auth";
import { sendEmail } from "@/server/email";
import { magicLinkEmail, magicLinkUnavailableEmail } from "@/server/emailTemplates";
import { MAGIC_TTL_MS, magicAccount } from "@/server/magic";

/** Emails a one-time sign-in link. Always answers the same way, so it can't be used to find out which emails have accounts. */
export async function POST(req: Request) {
  if (!sameOrigin(req)) return error(403, "Bad origin");
  if (await rateLimited(`magic-ip:${clientIp(req)}`, 5, 60 * 60_000)) return error(429, "Too many requests. Try again later.");
  const body = (await readJson(req)) as { email?: unknown; to?: unknown } | null;
  const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
  const reply = json({ ok: true, message: "If that email has an account, we've sent a link that signs you in. It works for 15 minutes." });
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 200) return reply;
  if (await rateLimited(`magic-email:${email}`, 3, 60 * 60_000)) return reply;
  const account = await magicAccount(email);
  if (!account) return reply;
  const origin = appOrigin(req);
  if (account.eligible) await sendEmail(magicLinkEmail(email, origin, await createAuthToken(account.id, "magic", MAGIC_TTL_MS), body?.to === "teachers" ? "teachers" : "parents"));
  else await sendEmail(magicLinkUnavailableEmail(email, origin));
  return reply;
}
