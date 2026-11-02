import { clientIp, consumeAuthToken, createSession, error, getSession, isSignupBrowser, json, rateLimited, readJson, sameOrigin, sessionCookie } from "@/server/auth";
import { query, run } from "@/server/db";
import { rewardReferrer } from "@/server/referral";

export async function POST(req: Request) {
  if (!sameOrigin(req)) return error(403, "Bad origin");
  if (await rateLimited(`verify:${clientIp(req)}`, 20)) return error(429, "Too many attempts. Try again in a few minutes.");
  const body = (await readJson(req)) as { token?: string } | null;
  const parentId = await consumeAuthToken(body?.token ?? "", "verify");
  if (!parentId) return error(400, "This link has expired or was already used. You can ask for a new one in the Parent area, under Account.");
  const rows = await query<{ family_id: string; email_verified_at: number | null; pending_password_hash: string | null; signup_cookie_hash: string | null }>(
    "SELECT family_id, email_verified_at, pending_password_hash, signup_cookie_hash FROM parents WHERE id = ?",
    [parentId],
  );
  const parent = rows[0];
  if (!parent) return error(400, "This link has expired or was already used. You can ask for a new one in the Parent area, under Account.");
  let cookie: string | undefined;
  let signedIn = false;
  let passwordSet = false;
  if (parent.email_verified_at == null) {
    // Nobody had proved this inbox before, so whoever made the account may not be its owner: someone can sign up
    // with another person's address and a password they know, then wait for the owner to confirm. So the owner
    // who opens this link is signed in (sign-up signs nobody in) and every earlier session ends. The typed password
    // is kept only when this is the browser that signed up; from any other, it is dropped and the account has none
    // (as with a sign-in link or Google), and the owner can set one from a reset link.
    const here = await getSession(req);
    if (here?.parentId !== parentId) {
      passwordSet = !!parent.pending_password_hash && isSignupBrowser(req, parent.signup_cookie_hash);
      await run(
        "UPDATE parents SET email_verified_at = ?, password_hash = ?, pending_password_hash = NULL, signup_cookie_hash = NULL WHERE id = ? AND email_verified_at IS NULL",
        [Date.now(), passwordSet ? parent.pending_password_hash : "!", parentId],
      );
      await run("DELETE FROM sessions WHERE parent_id = ?", [parentId]);
      const made = await createSession(parentId, parent.family_id, req);
      cookie = sessionCookie(made.token, made.maxAge);
      signedIn = true;
    }
  }
  if (!signedIn) await run("UPDATE parents SET email_verified_at = COALESCE(email_verified_at, ?), pending_password_hash = NULL, signup_cookie_hash = NULL WHERE id = ?", [Date.now(), parentId]);
  // Confirming an email is what thanks the family that shared its code. A failure here never blocks confirmation.
  await rewardReferrer(parent.family_id).catch((e) => console.error("[referral]", (e as Error).message));
  return json({ ok: true, signedIn, takenOver: signedIn, passwordSet }, cookie ? { cookie } : undefined);
}
