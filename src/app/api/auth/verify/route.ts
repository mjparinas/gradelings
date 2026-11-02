import { clientIp, consumeAuthToken, createSession, error, getSession, json, rateLimited, sameOrigin, sessionCookie } from "@/server/auth";
import { query, run } from "@/server/db";
import { rewardReferrer } from "@/server/referral";

export async function POST(req: Request) {
  if (!sameOrigin(req)) return error(403, "Bad origin");
  if (await rateLimited(`verify:${clientIp(req)}`, 20)) return error(429, "Too many attempts. Try again in a few minutes.");
  const body = (await req.json().catch(() => null)) as { token?: string } | null;
  const parentId = await consumeAuthToken(body?.token ?? "", "verify");
  if (!parentId) return error(400, "This link has expired or was already used. You can ask for a new one in the Parent area, under Account.");
  const rows = await query<{ family_id: string; email: string; email_verified_at: number | null }>("SELECT family_id, email, email_verified_at FROM parents WHERE id = ?", [parentId]);
  const parent = rows[0];
  if (!parent) return error(400, "This link has expired or was already used. You can ask for a new one in the Parent area, under Account.");
  let cookie: string | undefined;
  let takenOver = false;
  if (parent.email_verified_at == null) {
    // Nobody had proved this inbox before, so whoever made the account may not be its owner: someone can sign up
    // with another person's address and a password they know, then wait for the owner to confirm. When the
    // confirming browser isn't already signed in to this account, the owner takes it over, as with a sign-in link
    // or Google: the password stops working and every earlier session ends. The owner is signed in instead.
    const here = await getSession(req);
    if (here?.parentId !== parentId) {
      await run("UPDATE parents SET email_verified_at = ?, password_hash = '!' WHERE id = ? AND email_verified_at IS NULL", [Date.now(), parentId]);
      await run("DELETE FROM sessions WHERE parent_id = ?", [parentId]);
      const made = await createSession(parentId, parent.family_id, req);
      cookie = sessionCookie(made.token, made.maxAge);
      takenOver = true;
    }
  }
  if (!takenOver) await run("UPDATE parents SET email_verified_at = COALESCE(email_verified_at, ?) WHERE id = ?", [Date.now(), parentId]);
  // Confirming an email is what thanks the family that shared its code. A failure here never blocks confirmation.
  await rewardReferrer(parent.family_id).catch((e) => console.error("[referral]", (e as Error).message));
  return json({ ok: true, takenOver }, cookie ? { cookie } : undefined);
}
