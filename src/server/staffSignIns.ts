import "server-only";
import { query, run } from "./db";

// Failed sign-ins to admin and support accounts, kept for the System page's Admin security card and the alert
// for repeated failures (src/server/alerts.ts). Only the owner's own staff addresses are recorded, never a
// visitor's: the login route checks the address is listed before calling `recordStaffFailure`.

/** The alert key for repeated failures (sendAlert stores when it last went out under `alert-sent:<key>`). */
export const STAFF_ALERT_KEY = "staff-login-failures";

const DAY = 86_400_000;
const KEEP = 30 * DAY;

/** Which step failed: the password, the authenticator or recovery code, or too many tries. */
export type StaffStep = "password" | "code" | "limited";

export async function recordStaffFailure(email: string, step: StaffStep, now = Date.now()): Promise<void> {
  try {
    await run("INSERT INTO staff_sign_in_failures (at, email, step) VALUES (?, ?, ?)", [now, email.toLowerCase().slice(0, 200), step]);
    await run("DELETE FROM staff_sign_in_failures WHERE at < ?", [now - KEEP]);
  } catch (e) {
    console.error("[staff] could not record a failed sign-in", (e as Error).message);
  }
}

/** Failed staff sign-ins since a time, in total and by address. */
export async function staffFailuresSince(since: number): Promise<{ total: number; byEmail: { email: string; n: number; lastAt: number }[] }> {
  const rows = await query<{ email: string; n: number; last: number }>(
    "SELECT email, COUNT(*) AS n, MAX(at) AS last FROM staff_sign_in_failures WHERE at >= ? GROUP BY email ORDER BY n DESC",
    [since],
  );
  const byEmail = rows.map((r) => ({ email: String(r.email), n: Number(r.n), lastAt: Number(r.last) }));
  return { total: byEmail.reduce((s, r) => s + r.n, 0), byEmail };
}
