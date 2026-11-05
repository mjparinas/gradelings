import { clientIp, createSession, error, json, rateLimited, readJson, sameOrigin, sessionCookie } from "@/server/auth";
import { acceptAdultInvite, inviteDetails } from "@/server/familyAdults";

/** What an invitation link is for (who invited, which address), without using it. */
export async function GET(req: Request) {
  if (await rateLimited(`adult-join:${clientIp(req)}`, 60, 60 * 60_000)) return error(429, "Too many attempts. Try again later.");
  const details = await inviteDetails(new URL(req.url).searchParams.get("token") ?? "");
  if (!details) return error(404, "This invitation has expired or was already used. Ask for a new one.");
  return json(details);
}

/** Accepts an invitation (body: token, password): makes the account on the family and signs this device in. */
export async function POST(req: Request) {
  if (!sameOrigin(req)) return error(403, "Bad origin");
  if (await rateLimited(`adult-join:${clientIp(req)}`, 20, 60 * 60_000)) return error(429, "Too many attempts. Try again later.");
  const body = (await readJson(req)) as { token?: unknown; password?: unknown } | null;
  const token = typeof body?.token === "string" ? body.token : "";
  const password = typeof body?.password === "string" ? body.password : "";
  if (password.length < 8 || password.length > 200) return error(400, "Use a password of at least 8 characters.");
  const made = await acceptAdultInvite(token, password);
  if ("error" in made) return error(made.status, made.error);
  const session = await createSession(made.parentId, made.familyId, req);
  return json({ ok: true }, { cookie: sessionCookie(session.token, session.maxAge) });
}
