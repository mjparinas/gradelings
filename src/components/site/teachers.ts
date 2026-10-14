import type { Framework } from "@/content/frameworks";
import { gradeSlug } from "@/content/subjects";
import type { GradeId } from "@/content/types";
import { FRAMEWORKS } from "@/content/frameworks";
import { curriculumUpdated, gradeUpdated, latest } from "@/content/updated";
import { gradesWithContent, type SitemapPath } from "./curriculum";

// Public pages for teachers. The classroom area itself (/teachers/) is a private app and stays
// noindex; these pages are what search visitors land on before they create a teacher account.

/**
 * Frameworks the classroom area can assign units from: every offered framework, as the server accepts for a class
 * (isFramework in src/server/classroom.ts). A framework still upcoming gets no teacher pages.
 */
export const TEACHER_FRAMEWORK_IDS: string[] = FRAMEWORKS.map((f) => f.id);

export const TEACHER_FRAMEWORKS: Framework[] = FRAMEWORKS;

/** Where a teacher creates an account and signs in. */
export const TEACHER_SIGNUP = "/teachers/";

export const teacherPath = {
  hub: () => "/for-teachers/",
  framework: (f: Framework) => `/for-teachers/${f.slug}/`,
  grade: (f: Framework, g: GradeId) => `/for-teachers/${f.slug}/${gradeSlug(g)}/`,
};

export function allTeacherPaths(): SitemapPath[] {
  const out: SitemapPath[] = [{ path: teacherPath.hub(), updated: latest(...TEACHER_FRAMEWORKS.map((f) => curriculumUpdated(f.id))) }];
  for (const f of TEACHER_FRAMEWORKS) {
    out.push({ path: teacherPath.framework(f), updated: curriculumUpdated(f.id) });
    for (const g of gradesWithContent(f)) out.push({ path: teacherPath.grade(f, g), updated: gradeUpdated(f.id, g) });
  }
  return out;
}
