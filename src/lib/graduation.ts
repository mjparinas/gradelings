import { gradeNumber } from "@/content/subjects";
import type { GradeId } from "@/content/types";

// When a parent moves a child up a grade, the child's next visit starts with a small graduation. It is read from
// the grade the child had the last time this device looked, kept per device in localStorage, so nothing is
// synced or stored on the server. A device that has never seen the child just records the grade and says nothing.

const key = (profileId: string) => `gradelings.grad.${profileId}`;

function read(profileId: string): string | null {
  try {
    return localStorage.getItem(key(profileId));
  } catch {
    return null;
  }
}

/** Remember the grade the child is in now. */
export function rememberGrade(profileId: string, grade: GradeId): void {
  try {
    localStorage.setItem(key(profileId), grade);
  } catch {}
}

/** The grade the child just finished, when they have moved up since this device last looked. */
export function graduatedFrom(profileId: string, grade: GradeId): GradeId | null {
  const before = read(profileId);
  if (before === null) {
    rememberGrade(profileId, grade);
    return null;
  }
  if (before === grade) return null;
  const prev = before as GradeId;
  // Moving down, or an unknown grade, is not a graduation.
  if (!Number.isFinite(gradeNumber(prev)) || gradeNumber(prev) >= gradeNumber(grade)) {
    rememberGrade(profileId, grade);
    return null;
  }
  return prev;
}
