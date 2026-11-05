import "server-only";
import { createHash, randomBytes } from "node:crypto";
import { batch, query, run } from "./db";
import { hashPassword, newId } from "./auth";
import { releaseTeacherAccounts } from "./classroom";
import { removeStudentsOfOwner } from "./students";

// A second adult on a family: another sign-in (same email-and-password rules as any parent) that shares the family's
// children, reports and settings. The owner (the account that made the family and pays) invites by email, can see and
// remove adults, and keeps billing, codes and deleting the family. An adult can leave at any time.

export const MAX_ADULTS = 2;
export const ADULT_INVITE_TTL = 7 * 86_400_000;

const sha = (s: string) => createHash("sha256").update(s).digest("hex");

export interface AdultRow {
  id: string;
  email: string;
  since: number;
}
export interface PendingInvite {
  email: string;
  createdAt: number;
}

export async function listAdults(familyId: string): Promise<{ adults: AdultRow[]; invites: PendingInvite[] }> {
  const adults = await query<{ id: string; email: string; created_at: number }>(
    "SELECT id, email, created_at FROM parents WHERE family_id = ? AND family_role = 'adult' AND role = 'parent' ORDER BY created_at",
    [familyId],
  );
  const invites = await query<{ email: string; created_at: number }>("SELECT email, created_at FROM family_invites WHERE family_id = ? AND expires_at > ? ORDER BY created_at", [familyId, Date.now()]);
  return {
    adults: adults.map((a) => ({ id: a.id, email: a.email, since: Number(a.created_at) })),
    invites: invites.map((i) => ({ email: i.email, createdAt: Number(i.created_at) })),
  };
}

/** Makes an invitation and returns its one-time token (the caller emails it). Null when the family already has all the adults it can. */
export async function createAdultInvite(familyId: string, invitedBy: string, email: string): Promise<{ token: string } | { error: string }> {
  const { adults, invites } = await listAdults(familyId);
  const others = invites.filter((i) => i.email !== email);
  if (adults.length + others.length >= MAX_ADULTS) return { error: `A family can have up to ${MAX_ADULTS} other adults.` };
  const token = randomBytes(32).toString("base64url");
  const now = Date.now();
  // One open invitation per address: asking again replaces the earlier link.
  await batch([
    { sql: "DELETE FROM family_invites WHERE family_id = ? AND email = ?", args: [familyId, email] },
    { sql: "INSERT INTO family_invites (token_hash, family_id, email, invited_by, created_at, expires_at) VALUES (?, ?, ?, ?, ?, ?)", args: [sha(token), familyId, email, invitedBy, now, now + ADULT_INVITE_TTL] },
  ]);
  return { token };
}

export async function cancelAdultInvite(familyId: string, email: string): Promise<void> {
  await run("DELETE FROM family_invites WHERE family_id = ? AND email = ?", [familyId, email]);
}

/** What an invitation link is for, without using it (so the join page can say who invited them). Null when the link is wrong or expired. */
export async function inviteDetails(token: string): Promise<{ email: string; from: string } | null> {
  if (!token || token.length > 200) return null;
  const row = (await query<{ email: string; invited_by: string }>("SELECT email, invited_by FROM family_invites WHERE token_hash = ? AND expires_at > ?", [sha(token), Date.now()]))[0];
  if (!row) return null;
  const owner = (await query<{ email: string }>("SELECT email FROM parents WHERE id = ?", [row.invited_by]))[0];
  return { email: row.email, from: owner?.email ?? "" };
}

/** Uses an invitation: makes the second adult's account on the family (confirmed, since the link came to their inbox). */
export async function acceptAdultInvite(token: string, password: string): Promise<{ parentId: string; familyId: string } | { error: string; status: number }> {
  if (!token || token.length > 200) return { error: "This invitation has expired or was already used.", status: 400 };
  const hash = sha(token);
  const invite = (await query<{ family_id: string; email: string }>("SELECT family_id, email FROM family_invites WHERE token_hash = ? AND expires_at > ?", [hash, Date.now()]))[0];
  if (!invite) return { error: "This invitation has expired or was already used. Ask for a new one.", status: 400 };
  if ((await query("SELECT id FROM parents WHERE email = ?", [invite.email])).length) {
    return { error: "That email already has a Gradelings account, and an account can belong to one family. Ask to be invited with a different email address.", status: 409 };
  }
  const { adults } = await listAdults(invite.family_id);
  if (adults.length >= MAX_ADULTS) return { error: `This family already has ${MAX_ADULTS} other adults.`, status: 409 };
  const passwordHash = await hashPassword(password);
  const parentId = newId();
  const now = Date.now();
  try {
    await batch([
      { sql: "DELETE FROM family_invites WHERE token_hash = ?", args: [hash] },
      {
        sql: "INSERT INTO parents (id, family_id, email, password_hash, created_at, email_verified_at, family_role, admin_mail) VALUES (?, ?, ?, ?, ?, ?, 'adult', 0)",
        args: [parentId, invite.family_id, invite.email, passwordHash, now, now],
      },
    ]);
  } catch (e) {
    if (/UNIQUE|constraint/i.test(String((e as Error).message))) return { error: "This invitation was already used.", status: 409 };
    throw e;
  }
  return { parentId, familyId: invite.family_id };
}

/** Removes one adult's sign-in. The family and its children stay; nothing about the children is deleted. */
export async function removeAdult(familyId: string, parentId: string): Promise<boolean> {
  const row = (await query<{ id: string }>("SELECT id FROM parents WHERE id = ? AND family_id = ? AND family_role = 'adult'", [parentId, familyId]))[0];
  if (!row) return false;
  await releaseTeacherAccounts([parentId]);
  await removeStudentsOfOwner([parentId]);
  await batch([
    { sql: "DELETE FROM sessions WHERE parent_id = ?", args: [parentId] },
    { sql: "DELETE FROM auth_tokens WHERE parent_id = ?", args: [parentId] },
    { sql: "DELETE FROM unsub_tokens WHERE parent_id = ?", args: [parentId] },
    { sql: "DELETE FROM totp_backup_codes WHERE parent_id = ?", args: [parentId] },
    { sql: "DELETE FROM roster_imports WHERE parent_id = ?", args: [parentId] },
    { sql: "DELETE FROM class_teachers WHERE parent_id = ?", args: [parentId] },
    { sql: "DELETE FROM parents WHERE id = ?", args: [parentId] },
  ]);
  return true;
}
