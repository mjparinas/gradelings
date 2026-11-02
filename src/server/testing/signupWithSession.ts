import "server-only";
import { POST as realSignup } from "@/app/api/auth/signup/route";
import { createSession, json, sessionCookie } from "@/server/auth";
import { query, run } from "@/server/db";
import { getFamilyRow, toFamilyInfo } from "@/server/family";

/**
 * Tests only. The real sign-up route signs nobody in (the owner opens the account from the emailed link), but most
 * tests just need a family with a session. This runs the real route, then, for a new address, signs it in the way
 * sign-up used to: the account stays unconfirmed and has the typed password's hash, and the reply carries the family
 * and a session cookie. Tests of sign-up itself import the route directly.
 */
export async function POST(req: Request): Promise<Response> {
  const body = (await req.clone().json().catch(() => null)) as { email?: string; password?: string; passwordless?: boolean } | null;
  const email = body?.email?.trim().toLowerCase() ?? "";
  const existed = (await query("SELECT id FROM parents WHERE email = ?", [email])).length > 0;
  const res = await realSignup(req);
  if (res.status !== 200) return res;
  if (existed) return json({ error: "That email already has an account. Try signing in." }, { status: 409 });
  const rows = await query<{ id: string; family_id: string; pending_password_hash: string | null; email_verified_at: number | null }>(
    "SELECT id, family_id, pending_password_hash FROM parents WHERE email = ?",
    [email],
  );
  const parent = rows[0];
  // Not made: the address was over its hourly sign-up limit.
  if (!parent) return json({ error: "That email already has an account. Try signing in." }, { status: 409 });
  if (parent.pending_password_hash) await run("UPDATE parents SET password_hash = pending_password_hash, pending_password_hash = NULL, signup_cookie_hash = NULL WHERE id = ?", [parent.id]);
  const { token, maxAge } = await createSession(parent.id, parent.family_id, req);
  const family = toFamilyInfo((await getFamilyRow(parent.family_id))!, email, false);
  return json({ family }, { cookie: sessionCookie(token, maxAge) });
}
