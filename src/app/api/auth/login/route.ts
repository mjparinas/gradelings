import { burnPasswordCheck, appOrigin, clientIp, createSession, deviceLabel, error, json, rateLimited, sameOrigin, sessionCookie, verifyPassword } from "@/server/auth";
import { query } from "@/server/db";
import { sendEmail } from "@/server/email";
import { newSignInEmail } from "@/server/emailTemplates";
import { getFamilyRow, toFamilyInfo } from "@/server/family";
import { checkSecondFactor } from "@/server/twoFactor";

const TOO_MANY = "Too many attempts. Try again in a few minutes.";

export async function POST(req: Request) {
  if (!sameOrigin(req)) return error(403, "Bad origin");
  const ip = clientIp(req);
  if (await rateLimited(`login:${ip}`, 10)) return error(429, TOO_MANY);
  const body = (await req.json().catch(() => null)) as { email?: unknown; password?: unknown; code?: unknown } | null;
  const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
  const password = typeof body?.password === "string" ? body.password : "";
  const code = typeof body?.code === "string" ? body.code : "";
  if (email.length > 200 || password.length > 200) return error(401, "That email and password don't match.");
  if (email) {
    // Per address and device, so a stranger can't lock a parent out; a looser cap on the address
    // alone still stops guessing spread across many devices.
    if (await rateLimited(`login-email-ip:${email}:${ip}`, 10)) return error(429, TOO_MANY);
    if (await rateLimited(`login-email:${email}`, 60, 60 * 60_000)) return error(429, TOO_MANY);
  }
  const rows = await query<{ id: string; family_id: string; password_hash: string; email_verified_at: number | null; totp_enabled_at: number | null }>(
    "SELECT id, family_id, password_hash, email_verified_at, totp_enabled_at FROM parents WHERE email = ?",
    [email],
  );
  const parent = rows[0];
  if (!parent) await burnPasswordCheck(password); // same response time as a wrong password
  if (!parent || !(await verifyPassword(password, parent.password_hash))) {
    return error(401, "That email and password don't match.");
  }
  // Two-step sign-in: the password alone opens nothing on an account that has it on. Asking for the code only
  // after a right password means the answer never says whether an address has an account.
  const twoStep = parent.totp_enabled_at != null;
  if (twoStep) {
    if (!code.trim()) return json({ error: "This account uses two-step sign-in. Sign in at /admin/ and enter the code from your authenticator app.", mfaRequired: true }, { status: 401 });
    const step = await checkSecondFactor(parent.id, code.slice(0, 40));
    if (step === "limited") return error(429, TOO_MANY);
    if (step === "bad") return json({ error: "That code didn't work. Check the code in your authenticator app, or use a recovery code.", mfaRequired: true }, { status: 401 });
  }
  const { token, maxAge } = await createSession(parent.id, parent.family_id, req, { mfa: twoStep });
  const family = toFamilyInfo((await getFamilyRow(parent.family_id))!, email, Boolean(parent.email_verified_at));
  // A heads-up for the parent; a failed email never blocks signing in.
  if (parent.email_verified_at) await sendEmail(newSignInEmail(email, appOrigin(req), deviceLabel(req.headers.get("user-agent") ?? "")));
  return json({ family }, { cookie: sessionCookie(token, maxAge) });
}
