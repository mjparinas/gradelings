import { appOrigin, clientIp, createAuthToken, createSession, error, hashPassword, json, newId, rateLimited, readJson, sameOrigin, sessionCookie } from "@/server/auth";
import { batch, query } from "@/server/db";
import { sendEmail } from "@/server/email";
import { verifyEmail } from "@/server/emailTemplates";
import { getFamilyRow, toFamilyInfo } from "@/server/family";
import { isFlagOn } from "@/server/flags";
import { normalizeReferralCode, TRIAL_DAYS } from "@/lib/plan";
import { referrerFor } from "@/server/referral";

export async function POST(req: Request) {
  if (!sameOrigin(req)) return error(403, "Bad origin");
  // The admin panel can pause sign-ups (the "signups" flag).
  if (!(await isFlagOn("signups", null))) return error(503, "New accounts are paused for a little while. Please try again later.");
  if (await rateLimited(`signup:${clientIp(req)}`, 5)) return error(429, "Too many attempts. Try again in a few minutes.");
  const body = (await readJson(req)) as { email?: string; password?: string; passwordless?: boolean; trialEndsAt?: number; referralCode?: string } | null;
  const email = body?.email?.trim().toLowerCase() ?? "";
  const password = body?.password ?? "";
  // "Send me the reports" at the end of a lesson: an account from an email alone, like one made with Google. The
  // parent signs in elsewhere with a sign-in link or sets a password from a reset link later. They asked for the
  // reports, so the weekly email is on; it only goes once the email is confirmed.
  const passwordless = body?.passwordless === true;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 200) return error(400, "Please enter a valid email.");
  if (!passwordless && (password.length < 8 || password.length > 200)) return error(400, "Use a password of at least 8 characters.");
  if ((await query("SELECT id FROM parents WHERE email = ?", [email])).length) {
    return error(409, "That email already has an account. Try signing in.");
  }

  const now = Date.now();
  const maxTrial = now + TRIAL_DAYS * 86_400_000;
  // Keep the trial this device already started, so signing up doesn't restart it.
  const trialEndsAt = Math.min(maxTrial, Math.max(now, Number(body?.trialEndsAt) || maxTrial));
  // A friend's code is remembered so the referrer can be thanked once this email is confirmed. The new family's
  // trial is unchanged. An unknown code is ignored quietly, so codes can't be guessed from the reply.
  const code = normalizeReferralCode(body?.referralCode);
  const referrer = code ? await referrerFor(code) : null;
  const familyId = newId();
  const parentId = newId();
  // No password: '!' never matches one (see verifyPassword).
  const hash = passwordless ? "!" : await hashPassword(password);
  try {
    // Both rows or neither, so a duplicate email can't leave an empty family behind.
    await batch([
      { sql: "INSERT INTO families (id, created_at, trial_ends_at, plan, updated_at, referred_by) VALUES (?, ?, ?, 'trial', ?, ?)", args: [familyId, now, trialEndsAt, now, referrer] },
      { sql: "INSERT INTO parents (id, family_id, email, password_hash, created_at, weekly_report) VALUES (?, ?, ?, ?, ?, ?)", args: [parentId, familyId, email, hash, now, passwordless ? 1 : 0] },
    ]);
  } catch (e) {
    if (/UNIQUE|constraint/i.test(String((e as Error).message))) return error(409, "That email already has an account. Try signing in.");
    throw e;
  }
  const { token, maxAge } = await createSession(parentId, familyId, req);
  const family = toFamilyInfo((await getFamilyRow(familyId))!, email, false);
  // A failed email never blocks signup; the parent can ask for another from the Account page.
  await sendEmail(verifyEmail(email, appOrigin(req), await createAuthToken(parentId, "verify", 3 * 86_400_000), passwordless));
  return json({ family }, { cookie: sessionCookie(token, maxAge) });
}
