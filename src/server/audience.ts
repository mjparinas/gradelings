import "server-only";
import { run } from "./db";

// Who an account is for: parents get emails about their children, teachers about their classes. The type is stored on
// the account (`parents.account_type`) because a teacher has nothing to show until they make a class, so it can't be
// worked out from classes alone. It decides email content only; it grants and removes nothing.

/** A child profile that hasn't been deleted (deleted ones stay as tombstones for sync). `pr` is the profiles table's alias. */
export const LIVE_PROFILE = "COALESCE(json_extract(pr.data, '$.deleted'), 0) = 0";

/**
 * An account that is a teacher and has no child of its own. Parent emails (trial notices, weekly reports, practice reminders,
 * "add your child") skip it: classes are free and they have no trial to run out. A teacher who also added a child is a parent
 * too and keeps getting those. `p` is the parents table's alias.
 */
export const teacherOnly = (p = "p") =>
  `(${p}.account_type = 'teacher' AND NOT EXISTS (SELECT 1 FROM profiles pr WHERE pr.family_id = ${p}.family_id AND ${LIVE_PROFILE}))`;

/** Marks an account as a teacher (a no-op for class student accounts and for accounts already marked). */
export async function markTeacher(parentId: string): Promise<void> {
  await run("UPDATE parents SET account_type = 'teacher' WHERE id = ? AND role = 'parent' AND account_type != 'teacher'", [parentId]);
}
