import type { Framework } from "@/content/frameworks";
import { gradeSlug } from "@/content/subjects";
import type { GradeId } from "@/content/types";
import { FRAMEWORKS } from "@/content/frameworks";
import { curriculumUpdated, gradeUpdated, latest } from "@/content/updated";
import { gradesWithContent, type SitemapPath } from "./curriculum";

// Public pages for teachers. The classroom area itself (/teachers/) is a private app and stays
// noindex; these pages are what search visitors land on before they create a teacher account.

/**
 * Frameworks the classroom area can assign units from. Classes follow BC, Ontario, Alberta, Saskatchewan, Manitoba,
 * Yukon, the Northwest Territories, Nova Scotia, New Brunswick, Newfoundland and Labrador, Prince Edward Island,
 * Nunavut, Washington, Oregon or California (see TeacherApp). Filtered by FRAMEWORKS, so a framework still upcoming gets no teacher pages.
 */
export const TEACHER_FRAMEWORK_IDS = ["ca-bc", "ca-on", "ca-ab", "ca-sk", "ca-mb", "ca-yt", "ca-nt", "ca-ns", "ca-nb", "ca-nl", "ca-pe", "ca-nu", "us-wa", "us-or", "us-ca"];

export const TEACHER_FRAMEWORKS: Framework[] = FRAMEWORKS.filter((f) => TEACHER_FRAMEWORK_IDS.includes(f.id));

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
