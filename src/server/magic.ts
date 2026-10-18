import { staffEmails } from "./admin";
import { query } from "./db";
import { isFlagOn } from "./flags";

export const MAGIC_TTL_MS = 15 * 60_000;

/**
 * The parent or teacher account a sign-in link may be sent to. Never admin or support accounts, accounts with
 * two-step sign-in (a link would skip the second step) or class students, who have no email.
 */
export async function magicAccountId(email: string): Promise<string | null> {
  if (!(await isFlagOn("magic-link", null))) return null;
  if (staffEmails().has(email)) return null;
  const rows = await query<{ id: string; role: string | null; totp_enabled_at: number | null }>("SELECT id, role, totp_enabled_at FROM parents WHERE email = ?", [email]);
  const parent = rows[0];
  if (!parent || (parent.role ?? "parent") !== "parent" || parent.totp_enabled_at != null) return null;
  return parent.id;
}
