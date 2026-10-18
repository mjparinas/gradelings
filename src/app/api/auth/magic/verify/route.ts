import { clientIp, consumeAuthToken, createSession, error, json, rateLimited, sameOrigin, sessionCookie } from "@/server/auth";
import { query, run } from "@/server/db";
import { getFamilyRow, toFamilyInfo } from "@/server/family";
import { magicAccountId } from "@/server/magic";

const BAD = "This link has expired or was already used. Please ask for a new one.";

/** Signs in with a link from the email. A POST from a button, never a GET, so mail scanners that open links can't use it up. */
export async function POST(req: Request) {
  if (!sameOrigin(req)) return error(403, "Bad origin");
  if (await rateLimited(`magic-verify:${clientIp(req)}`, 10)) return error(429, "Too many attempts. Try again in a few minutes.");
  const body = (await req.json().catch(() => null)) as { token?: unknown } | null;
  const parentId = await consumeAuthToken(typeof body?.token === "string" ? body.token : "", "magic");
  if (!parentId) return error(400, BAD);
  const rows = await query<{ family_id: string; email: string }>("SELECT family_id, email FROM parents WHERE id = ?", [parentId]);
  const parent = rows[0];
  // The account may have turned on two-step sign-in or become staff since the link was sent.
  if (!parent || (await magicAccountId(parent.email.toLowerCase())) !== parentId) return error(400, BAD);
  // Opening the link proves the inbox is theirs, which is what email confirmation asks.
  await run("UPDATE parents SET email_verified_at = COALESCE(email_verified_at, ?) WHERE id = ?", [Date.now(), parentId]);
  const { token, maxAge } = await createSession(parentId, parent.family_id, req);
  const family = toFamilyInfo((await getFamilyRow(parent.family_id))!, parent.email, true);
  return json({ family }, { cookie: sessionCookie(token, maxAge) });
}
