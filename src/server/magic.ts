import { staffEmails } from "./admin";
import { query } from "./db";
import { isFlagOn } from "./flags";

export const MAGIC_TTL_MS = 15 * 60_000;

/**
 * The parent or teacher account a sign-in link may be sent to. Never admin or support accounts, accounts with
 * two-step sign-in (a link would skip the second step) or class students, who have no email.
 */
export async function magicAccountId(email: string): Promise<string | null> {
  const found = await magicAccount(email);
  return found?.eligible ? found.id : null;
}

/**
 * The account behind an address, and whether it may use a sign-in link. An account that may not (admin, support,
 * two-step) is told so by email, so its owner isn't left waiting for a link that will never come; the person who asked
 * still gets the same answer either way.
 */
export async function magicAccount(email: string): Promise<{ id: string; eligible: boolean } | null> {
  if (!(await isFlagOn("magic-link", null))) return null;
  const rows = await query<{ id: string; role: string | null; totp_enabled_at: number | null }>("SELECT id, role, totp_enabled_at FROM parents WHERE email = ?", [email]);
  const parent = rows[0];
  if (!parent || (parent.role ?? "parent") !== "parent") return null;
  return { id: parent.id, eligible: !staffEmails().has(email) && parent.totp_enabled_at == null };
}
