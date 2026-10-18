import { appOrigin, clientIp, createAuthToken, error, json, rateLimited, sameOrigin } from "@/server/auth";
import { sendEmail } from "@/server/email";
import { magicLinkEmail } from "@/server/emailTemplates";
import { MAGIC_TTL_MS, magicAccountId } from "@/server/magic";

/** Emails a one-time sign-in link. Always answers the same way, so it can't be used to find out which emails have accounts. */
export async function POST(req: Request) {
  if (!sameOrigin(req)) return error(403, "Bad origin");
  if (await rateLimited(`magic-ip:${clientIp(req)}`, 5, 60 * 60_000)) return error(429, "Too many requests. Try again later.");
  const body = (await req.json().catch(() => null)) as { email?: unknown; to?: unknown } | null;
  const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
  const reply = json({ ok: true, message: "If that email has an account, we've sent a link that signs you in. It works for 15 minutes." });
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 200) return reply;
  if (await rateLimited(`magic-email:${email}`, 3, 60 * 60_000)) return reply;
  const id = await magicAccountId(email);
  if (id) await sendEmail(magicLinkEmail(email, appOrigin(req), await createAuthToken(id, "magic", MAGIC_TTL_MS), body?.to === "teachers" ? "teachers" : "parents"));
  return reply;
}
