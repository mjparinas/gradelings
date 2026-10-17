import { audit, getAdminSetup, twoFactorMode } from "@/server/admin";
import { error, json, rateLimited, readCookieToken, sameOrigin, verifyPassword } from "@/server/auth";
import { query } from "@/server/db";
import { checkSecondFactor, confirmEnrolment, disableTwoFactor, regenerateBackupCodes, startEnrolment, twoFactorState } from "@/server/twoFactor";

// Setting up, checking and turning off two-step sign-in for the signed-in admin. Reachable before the second
// step has been passed (an admin who hasn't set it up has no code yet); everything else in the panel is not.

const TOO_MANY = "Too many attempts. Try again in a few minutes.";

export async function GET(req: Request) {
  const found = await getAdminSetup(req);
  if (!found) return error(404, "Not found");
  const state = await twoFactorState(found.admin.parentId);
  return json({ ...state, required: twoFactorMode() === "required" });
}

export async function POST(req: Request) {
  if (!sameOrigin(req)) return error(403, "Bad origin");
  const found = await getAdminSetup(req);
  if (!found) return error(404, "Not found");
  const { admin, ready } = found;
  const body = (await req.json().catch(() => null)) as { action?: unknown; code?: unknown; password?: unknown } | null;
  const code = typeof body?.code === "string" ? body.code.slice(0, 40) : "";
  const state = await twoFactorState(admin.parentId);
  const sessionHash = readCookieToken(req);

  if (body?.action === "start") {
    if (state.enabled) return error(409, "Two-step sign-in is already on.");
    return json(await startEnrolment(admin.parentId, admin.email));
  }

  if (body?.action === "confirm") {
    if (state.enabled) return error(409, "Two-step sign-in is already on.");
    const done = await confirmEnrolment(admin.parentId, code, sessionHash);
    if (done.result === "limited") return error(429, TOO_MANY);
    if (done.result === "bad" || !done.codes) return error(400, "That code didn't match. Check the code in your authenticator app and try again, or start over for a new QR code.");
    await audit(admin.email, "2fa.enable", admin.email);
    return json({ codes: done.codes });
  }

  // Changing an existing setup needs the second step on this session first, and a fresh code.
  if (!state.enabled || !ready) return error(409, "Sign in with your authenticator code first.");

  if (body?.action === "regenerate") {
    const step = await checkSecondFactor(admin.parentId, code);
    if (step === "limited") return error(429, TOO_MANY);
    if (step === "bad") return error(400, "That code didn't match.");
    await audit(admin.email, "2fa.backup-codes", admin.email);
    return json({ codes: await regenerateBackupCodes(admin.parentId) });
  }

  if (body?.action === "disable") {
    // The password as well, so a left-open laptop can't switch it off with one code.
    if (await rateLimited(`mfa-off:${admin.parentId}`, 5, 10 * 60_000)) return error(429, TOO_MANY);
    const password = typeof body.password === "string" ? body.password.slice(0, 200) : "";
    const rows = await query<{ password_hash: string }>("SELECT password_hash FROM parents WHERE id = ?", [admin.parentId]);
    if (!rows[0] || !(await verifyPassword(password, rows[0].password_hash))) return error(400, "That password doesn't match.");
    const step = await checkSecondFactor(admin.parentId, code);
    if (step === "limited") return error(429, TOO_MANY);
    if (step === "bad") return error(400, "That code didn't match.");
    await disableTwoFactor(admin.parentId, sessionHash);
    await audit(admin.email, "2fa.disable", admin.email);
    return json({ ok: true });
  }

  return error(400, "Unknown action");
}
