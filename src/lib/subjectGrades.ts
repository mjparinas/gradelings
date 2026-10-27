import type { ContentTarget, SubjectGrades } from "@/content";
import { getFramework } from "@/content/frameworks";
import { GRADE_ORDER, isCoreSubject } from "@/content/subjects";
import type { GradeId, SubjectId } from "@/content/types";
import type { ChildSettings, Profile } from "./model";

// A level for each subject: a parent can let a child practise one subject above or below their own grade, usually
// after the placement test ("Practise Grade 3 math"). It lives in the child's synced settings (`subjectGrades`).
// Practice, Adventure, Review, Speed Run, the Daily Challenge and the home screen's cards then use that grade's units
// for the subject. Progress is kept by unit key, so nothing is lost when the grade changes back. Grade-wide goals
// (Grade Champion, "every unit in your grade") stay on the child's own grade. Flag `subject-levels` turns it off.

/** Subjects a parent can set a grade for: the core subjects, never a second language. */
export function canSetSubjectGrade(subject: SubjectId): boolean {
  return isCoreSubject(subject);
}

/** The subjects set to another grade than the child's own, keeping only grades their curriculum has. */
export function subjectGradesFor(profile: Pick<Profile, "grade" | "framework">, settings?: Pick<ChildSettings, "subjectGrades">): SubjectGrades {
  const grades = getFramework(profile.framework).grades;
  const out: SubjectGrades = {};
  for (const [subject, grade] of Object.entries(settings?.subjectGrades ?? {}) as [SubjectId, GradeId][]) {
    if (!grade || grade === profile.grade || !canSetSubjectGrade(subject) || !grades.includes(grade)) continue;
    out[subject] = grade;
  }
  return out;
}

/** The grade a child practises a subject at. */
export function subjectGradeFor(profile: Pick<Profile, "grade" | "framework">, settings: Pick<ChildSettings, "subjectGrades"> | undefined, subject: SubjectId): GradeId {
  return subjectGradesFor(profile, settings)[subject] ?? profile.grade;
}

/** The grades a child's practice needs downloaded: their own, then any set for a subject. */
export function practiceTargets(profile: Pick<Profile, "grade" | "framework">, settings?: Pick<ChildSettings, "subjectGrades">): ContentTarget[] {
  const extra = Object.values(subjectGradesFor(profile, settings)) as GradeId[];
  const grades = [profile.grade, ...GRADE_ORDER.filter((g) => extra.includes(g))];
  return [...new Set(grades)].map((grade) => ({ grade, framework: profile.framework }));
}

/** The settings patch that sets one subject's grade; the child's own grade clears it. */
export function setSubjectGrade(profile: Pick<Profile, "grade">, settings: Pick<ChildSettings, "subjectGrades"> | undefined, subject: SubjectId, grade: GradeId): Pick<ChildSettings, "subjectGrades"> {
  const next: Partial<Record<SubjectId, GradeId>> = { ...(settings?.subjectGrades ?? {}) };
  if (grade === profile.grade) delete next[subject];
  else next[subject] = grade;
  return { subjectGrades: next };
}

/**
 * When a child moves from one grade to another, subjects set to another grade move by the same number of grades,
 * so a child a grade ahead in math stays a grade ahead. A subject that lands on the new grade, or off the end of
 * the curriculum, follows the child's grade again.
 */
export function shiftSubjectGrades(settings: Pick<ChildSettings, "subjectGrades"> | undefined, from: GradeId, to: GradeId, available: GradeId[]): Pick<ChildSettings, "subjectGrades"> | undefined {
  const entries = Object.entries(settings?.subjectGrades ?? {}) as [SubjectId, GradeId][];
  if (!entries.length || from === to) return undefined;
  const step = GRADE_ORDER.indexOf(to) - GRADE_ORDER.indexOf(from);
  const next: Partial<Record<SubjectId, GradeId>> = {};
  for (const [subject, grade] of entries) {
    const moved = GRADE_ORDER[GRADE_ORDER.indexOf(grade) + step];
    if (moved && moved !== to && available.includes(moved)) next[subject] = moved;
  }
  return { subjectGrades: next };
}
