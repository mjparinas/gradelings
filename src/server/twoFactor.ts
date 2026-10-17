import "server-only";
import { rateLimited, refundRateLimit } from "./auth";
import { batch, query, run } from "./db";
import { APP_NAME } from "@/lib/brand";
import { hashBackupCode, looksLikeBackupCode, newBackupCodes, newSecret, openSecret, otpauthUri, sealSecret, verifyTotp } from "./totp";

// Two-step sign-in with an authenticator app. The account's password is step one; a 6-digit code (or a
// one-time recovery code) is step two. Used for admin accounts, which can refund, delete families and
// email everyone (src/server/admin.ts), but the login route asks for the code of any account that has it on.

export interface TwoFactorState {
  enabled: boolean;
  enabledAt: number | null;
  backupCodesLeft: number;
}

export async function twoFactorState(parentId: string): Promise<TwoFactorState> {
  const rows = await query<{ totp_enabled_at: number | null }>("SELECT totp_enabled_at FROM parents WHERE id = ?", [parentId]);
  const enabledAt = rows[0]?.totp_enabled_at == null ? null : Number(rows[0].totp_enabled_at);
  if (enabledAt == null) return { enabled: false, enabledAt: null, backupCodesLeft: 0 };
  const left = await query<{ n: number }>("SELECT COUNT(*) AS n FROM totp_backup_codes WHERE parent_id = ? AND used_at IS NULL", [parentId]);
  return { enabled: true, enabledAt, backupCodesLeft: Number(left[0]?.n ?? 0) };
}

/** Starts (or restarts) setup: a fresh secret that only counts once a code from it is confirmed. */
export async function startEnrolment(parentId: string, email: string): Promise<{ secret: string; uri: string }> {
  const secret = newSecret();
  await run("UPDATE parents SET totp_pending = ? WHERE id = ? AND totp_enabled_at IS NULL", [sealSecret(secret), parentId]);
  return { secret, uri: otpauthUri(secret, email, APP_NAME) };
}

async function insertBackupCodes(parentId: string): Promise<{ codes: string[]; statements: { sql: string; args: string[] }[] }> {
  const codes = newBackupCodes();
  return {
    codes,
    statements: [
      { sql: "DELETE FROM totp_backup_codes WHERE parent_id = ?", args: [parentId] },
      ...codes.map((c) => ({ sql: "INSERT INTO totp_backup_codes (parent_id, code_hash) VALUES (?, ?)", args: [parentId, hashBackupCode(c)] })),
    ],
  };
}

export type StepResult = "ok" | "bad" | "limited";

/**
 * Finishes setup with a code from the new secret. Turns two-step on, makes the recovery codes, signs every
 * other session out (anything signed in before this has not passed the second step) and marks this one as
 * having passed it. Returns the recovery codes, shown once.
 */
export async function confirmEnrolment(parentId: string, code: string, sessionHash: string): Promise<{ result: StepResult; codes?: string[] }> {
  if (await rateLimited(`mfa:${parentId}`, 8, 10 * 60_000)) return { result: "limited" };
  const rows = await query<{ totp_pending: string | null; totp_enabled_at: number | null }>("SELECT totp_pending, totp_enabled_at FROM parents WHERE id = ?", [parentId]);
  const row = rows[0];
  if (!row?.totp_pending || row.totp_enabled_at != null) return { result: "bad" };
  const step = verifyTotp(openSecret(row.totp_pending), code, null);
  if (step == null) return { result: "bad" };
  const now = Date.now();
  const backup = await insertBackupCodes(parentId);
  await batch([
    { sql: "UPDATE parents SET totp_secret = totp_pending, totp_pending = NULL, totp_enabled_at = ?, totp_last_step = ? WHERE id = ?", args: [now, step, parentId] },
    ...backup.statements,
    { sql: "DELETE FROM sessions WHERE parent_id = ? AND token_hash != ?", args: [parentId, sessionHash] },
    { sql: "UPDATE sessions SET mfa_at = ? WHERE token_hash = ?", args: [now, sessionHash] },
  ]);
  await refundRateLimit(`mfa:${parentId}`);
  return { result: "ok", codes: backup.codes };
}

/**
 * Checks the second step at sign-in: a code from the app, or a recovery code (which is then used up).
 * Wrong tries are limited per account, not per address, so guessing from many places is limited too.
 */
export async function checkSecondFactor(parentId: string, input: string): Promise<StepResult> {
  if (await rateLimited(`mfa:${parentId}`, 8, 10 * 60_000)) return "limited";
  const rows = await query<{ totp_secret: string | null; totp_last_step: number | null }>("SELECT totp_secret, totp_last_step FROM parents WHERE id = ? AND totp_enabled_at IS NOT NULL", [parentId]);
  const row = rows[0];
  if (!row?.totp_secret) return "bad";
  const text = input.trim();
  let ok = false;
  if (looksLikeBackupCode(text)) {
    ok = (await run("UPDATE totp_backup_codes SET used_at = ? WHERE parent_id = ? AND code_hash = ? AND used_at IS NULL", [Date.now(), parentId, hashBackupCode(text)])) > 0;
  } else {
    const step = verifyTotp(openSecret(row.totp_secret), text, row.totp_last_step == null ? null : Number(row.totp_last_step));
    // Claim the step in the update itself, so two requests with the same code can't both pass.
    if (step != null) ok = (await run("UPDATE parents SET totp_last_step = ? WHERE id = ? AND (totp_last_step IS NULL OR totp_last_step < ?)", [step, parentId, step])) > 0;
  }
  if (ok) await refundRateLimit(`mfa:${parentId}`);
  return ok ? "ok" : "bad";
}

/** New recovery codes, replacing the old ones. The caller has already checked a code. */
export async function regenerateBackupCodes(parentId: string): Promise<string[]> {
  const backup = await insertBackupCodes(parentId);
  await batch(backup.statements);
  return backup.codes;
}

/** Turns two-step off. Every other session is signed out. */
export async function disableTwoFactor(parentId: string, sessionHash: string): Promise<void> {
  await batch([
    { sql: "UPDATE parents SET totp_secret = NULL, totp_pending = NULL, totp_enabled_at = NULL, totp_last_step = NULL WHERE id = ?", args: [parentId] },
    { sql: "DELETE FROM totp_backup_codes WHERE parent_id = ?", args: [parentId] },
    { sql: "DELETE FROM sessions WHERE parent_id = ? AND token_hash != ?", args: [parentId, sessionHash] },
    { sql: "UPDATE sessions SET mfa_at = NULL WHERE token_hash = ?", args: [sessionHash] },
  ]);
}
