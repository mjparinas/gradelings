import { appOrigin, clientIp, createAuthToken, error, hashPassword, json, newId, newSignupMark, rateLimited, readJson, sameOrigin } from "@/server/auth";
import { batch, query } from "@/server/db";
import { sendEmail } from "@/server/email";
import { accountExistsEmail, verifyEmail } from "@/server/emailTemplates";
import { isFlagOn } from "@/server/flags";
import { normalizeReferralCode, TRIAL_DAYS } from "@/lib/plan";
import { referrerFor } from "@/server/referral";

export async function POST(req: Request) {
  if (!sameOrigin(req)) return error(403, "Bad origin");
  // The admin panel can pause sign-ups (the "signups" flag).
  if (!(await isFlagOn("signups", null))) return error(503, "New accounts are paused for a little while. Please try again later.");
  if (await rateLimited(`signup:${clientIp(req)}`, 5)) return error(429, "Too many attempts. Try again in a few minutes.");
  const body = (await readJson(req)) as { email?: string; password?: string; passwordless?: boolean; trialEndsAt?: number; referralCode?: string; to?: string } | null;
  const email = body?.email?.trim().toLowerCase() ?? "";
  const password = body?.password ?? "";
  // "Send me the reports" at the end of a lesson: an account from an email alone, like one made with Google. The
  // parent signs in elsewhere with a sign-in link or sets a password from a reset link later. They asked for the
  // reports, so the weekly email is on; it only goes once the email is confirmed.
  const passwordless = body?.passwordless === true;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 200) return error(400, "Please enter a valid email.");
  if (!passwordless && (password.length < 8 || password.length > 200)) return error(400, "Use a password of at least 8 characters.");

  // Every valid request gets the same answer, whether or not the address has an account, and nobody is signed in
  // here: the inbox's owner gets the email and opens the account from there. A mark on this browser (a cookie) lets
  // the typed password count if this same browser confirms the email, and not otherwise. See the verify route.
  const mark = newSignupMark();
  const reply = () => json({ ok: true, checkEmail: true }, { cookie: mark.cookie });
  const origin = appOrigin(req);
  const dest = body?.to === "teachers" ? "teachers" : "parents";
  // Counted before looking the address up, so the limit can't tell registered addresses from new ones. It also
  // stops anyone filling an inbox (an existing owner's or a stranger's) with these emails.
  if (await rateLimited(`signup-email:${email}`, 3, 60 * 60_000)) return reply();
  // Hashed for every request, so a registered address doesn't answer faster.
  const hash = passwordless ? null : await hashPassword(password);

  if ((await query("SELECT id FROM parents WHERE email = ?", [email])).length) {
    await sendEmail(accountExistsEmail(email, origin));
    return reply();
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
  try {
    // Both rows or neither, so a duplicate email can't leave an empty family behind. No password yet: '!' never
    // matches one (see verifyPassword), and the typed one waits in pending_password_hash.
    await batch([
      { sql: "INSERT INTO families (id, created_at, trial_ends_at, plan, updated_at, referred_by) VALUES (?, ?, ?, 'trial', ?, ?)", args: [familyId, now, trialEndsAt, now, referrer] },
      {
        sql: "INSERT INTO parents (id, family_id, email, password_hash, pending_password_hash, signup_cookie_hash, created_at, weekly_report, account_type) VALUES (?, ?, ?, '!', ?, ?, ?, ?, ?)",
        args: [parentId, familyId, email, hash, mark.hash, now, passwordless ? 1 : 0, dest === "teachers" ? "teacher" : "parent"],
      },
    ]);
  } catch (e) {
    // A second request for the same new address got there first; it sent the confirmation.
    if (/UNIQUE|constraint/i.test(String((e as Error).message))) return reply();
    throw e;
  }
  // A failed email never blocks signup; the parent can ask for another from the Account page.
  await sendEmail(verifyEmail(email, origin, await createAuthToken(parentId, "verify", 3 * 86_400_000), passwordless, dest));
  return reply();
}
