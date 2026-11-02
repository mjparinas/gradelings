import { clientIp, consumeAuthToken, createSession, error, json, rateLimited, readJson, sameOrigin, sessionCookie } from "@/server/auth";
import { query, run } from "@/server/db";
import { getFamilyRow, toFamilyInfo } from "@/server/family";
import { magicAccountId } from "@/server/magic";

const BAD = "This link has expired or was already used. Please ask for a new one.";

/** Signs in with a link from the email. A POST from a button, never a GET, so mail scanners that open links can't use it up. */
export async function POST(req: Request) {
  if (!sameOrigin(req)) return error(403, "Bad origin");
  if (await rateLimited(`magic-verify:${clientIp(req)}`, 10)) return error(429, "Too many attempts. Try again in a few minutes.");
  const body = (await readJson(req)) as { token?: unknown } | null;
  const parentId = await consumeAuthToken(typeof body?.token === "string" ? body.token : "", "magic");
  if (!parentId) return error(400, BAD);
  const rows = await query<{ family_id: string; email: string; email_verified_at: number | null }>("SELECT family_id, email, email_verified_at FROM parents WHERE id = ?", [parentId]);
  const parent = rows[0];
  // The account may have turned on two-step sign-in or become staff since the link was sent.
  if (!parent || (await magicAccountId(parent.email.toLowerCase())) !== parentId) return error(400, BAD);
  if (parent.email_verified_at == null) {
    // Nobody had proved this inbox before, so whoever made the account may not be its owner: someone can sign up
    // with another person's address and wait. The owner's first link takes the account over, as joining with
    // Google does: the password set at sign-up stops working and every earlier session is signed out.
    await run("UPDATE parents SET email_verified_at = ?, password_hash = '!' WHERE id = ? AND email_verified_at IS NULL", [Date.now(), parentId]);
    await run("DELETE FROM sessions WHERE parent_id = ?", [parentId]);
  }
  const { token, maxAge } = await createSession(parentId, parent.family_id, req);
  const family = toFamilyInfo((await getFamilyRow(parent.family_id))!, parent.email, true);
  return json({ family }, { cookie: sessionCookie(token, maxAge) });
}
