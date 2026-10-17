import "server-only";
import { releaseTeacherAccounts } from "./classroom";
import { batch, query } from "./db";
import { liveClassStatements } from "./live";
import { removeStudentsOfOwner } from "./students";

/**
 * Deletes everything the server holds about a family's children (profiles, settings, practice, class links and
 * shared report links) and nothing about the parent. Used when a US parent withdraws consent; `deleteFamilyData`
 * runs the same statements, so the two stay complete together.
 */
export function childDataStatements(f: string): { sql: string; args: string[] }[] {
  return [
    { sql: "DELETE FROM report_shares WHERE family_id = ?", args: [f] },
    { sql: "DELETE FROM class_assignment_students WHERE profile_id IN (SELECT profile_id FROM class_members WHERE family_id = ?)", args: [f] },
    { sql: "DELETE FROM class_members WHERE family_id = ?", args: [f] },
    { sql: "DELETE FROM live_answers WHERE family_id = ?", args: [f] },
    { sql: "DELETE FROM events WHERE family_id = ?", args: [f] },
    { sql: "DELETE FROM child_settings WHERE family_id = ?", args: [f] },
    { sql: "DELETE FROM profiles WHERE family_id = ?", args: [f] },
  ];
}

export async function deleteChildData(f: string): Promise<void> {
  await batch(childDataStatements(f));
}

/**
 * Deletes a family and every piece of data the server holds about it. Used when a parent deletes their
 * account and when an admin deletes one; the caller stops any Stripe subscription first.
 */
export async function deleteFamilyData(f: string): Promise<void> {
  // Teacher accounts: a class with a co-teacher passes to the longest-serving one (who could already
  // see everything in it). Any class left without one loses its student accounts along with the class.
  const accountIds = (await query<{ id: string }>("SELECT id FROM parents WHERE family_id = ?", [f])).map((p) => p.id);
  await releaseTeacherAccounts(accountIds);
  await removeStudentsOfOwner(accountIds);
  await batch([
    { sql: "DELETE FROM auth_tokens WHERE parent_id IN (SELECT id FROM parents WHERE family_id = ?)", args: [f] },
    { sql: "DELETE FROM totp_backup_codes WHERE parent_id IN (SELECT id FROM parents WHERE family_id = ?)", args: [f] },
    ...childDataStatements(f),
    // Classroom mode: remove any classes this account's teachers owned.
    { sql: "DELETE FROM class_members WHERE class_id IN (SELECT id FROM classes WHERE owner_parent_id IN (SELECT id FROM parents WHERE family_id = ?))", args: [f] },
    { sql: "DELETE FROM class_teachers WHERE class_id IN (SELECT id FROM classes WHERE owner_parent_id IN (SELECT id FROM parents WHERE family_id = ?))", args: [f] },
    { sql: "DELETE FROM class_invites WHERE class_id IN (SELECT id FROM classes WHERE owner_parent_id IN (SELECT id FROM parents WHERE family_id = ?))", args: [f] },
    { sql: "DELETE FROM class_assignments WHERE class_id IN (SELECT id FROM classes WHERE owner_parent_id IN (SELECT id FROM parents WHERE family_id = ?))", args: [f] },
    { sql: "DELETE FROM class_assignment_students WHERE class_id IN (SELECT id FROM classes WHERE owner_parent_id IN (SELECT id FROM parents WHERE family_id = ?))", args: [f] },
    ...liveClassStatements("SELECT id FROM classes WHERE owner_parent_id IN (SELECT id FROM parents WHERE family_id = ?)", [f]),
    { sql: "DELETE FROM classes WHERE owner_parent_id IN (SELECT id FROM parents WHERE family_id = ?)", args: [f] },
    { sql: "DELETE FROM roster_imports WHERE parent_id IN (SELECT id FROM parents WHERE family_id = ?)", args: [f] },
    { sql: "DELETE FROM question_reports WHERE family_id = ?", args: [f] },
    { sql: "DELETE FROM email_log WHERE family_id = ?", args: [f] },
    { sql: "DELETE FROM code_redemptions WHERE family_id = ?", args: [f] },
    { sql: "DELETE FROM flag_overrides WHERE family_id = ?", args: [f] },
    { sql: "DELETE FROM experiment_assignments WHERE family_id = ?", args: [f] },
    // Payments stay in the revenue totals but no longer point at anyone.
    { sql: "UPDATE payments SET family_id = NULL WHERE family_id = ?", args: [f] },
    { sql: "UPDATE cancellations SET family_id = NULL WHERE family_id = ?", args: [f] },
    { sql: "DELETE FROM sessions WHERE family_id = ?", args: [f] },
    { sql: "DELETE FROM parents WHERE family_id = ?", args: [f] },
    { sql: "DELETE FROM families WHERE id = ?", args: [f] },
  ]);
}
