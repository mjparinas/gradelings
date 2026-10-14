import { coursesInFramework, unitKey } from "@/content";
import { COURSES } from "@/content/all";
import { FRAMEWORKS, getFramework, type Framework } from "@/content/frameworks";
import { ageBandFor, getSubjectMeta, gradeFromSlug, gradeSlug } from "@/content/subjects";
import { gradeName, localeOf, localizeText } from "@/content/locale";
import type { Course, GradeId, SubjectId, Unit } from "@/content/types";
import { courseUpdated, curriculumUpdated, gradeUpdated, latest, unitUpdated } from "@/content/updated";

// Shared lookups for the public curriculum pages. URLs look like
// /curriculum/bc/grade-3/math/multiplication/ and never change with content.

export function frameworkBySlug(slug: string): Framework | undefined {
  return FRAMEWORKS.find((f) => f.slug === slug);
}

export function coursesFor(framework: Framework, grade: GradeId): Course[] {
  // Units carry standards per framework; each framework sees only the units it has standards for.
  return coursesInFramework(
    COURSES.filter((c) => c.grade === grade && framework.grades.includes(grade)),
    framework.id,
  );
}

export function gradesWithContent(framework: Framework): GradeId[] {
  return framework.grades.filter((g) => coursesFor(framework, g).length > 0);
}

export function subjectTitle(subject: SubjectId, grade: GradeId): string {
  return getSubjectMeta(subject).title[ageBandFor(grade)];
}

/** Subject name as parents search for it, whatever the kids see. */
export function subjectSeoTitle(subject: SubjectId): string {
  return { math: "Math", language: "English Language Arts", science: "Science", social: "Social Studies", immersion: "French Immersion", "core-french": "Core French" }[subject];
}

export const curriculumPath = {
  index: () => "/curriculum/",
  framework: (f: Framework) => `/curriculum/${f.slug}/`,
  grade: (f: Framework, g: GradeId) => `/curriculum/${f.slug}/${gradeSlug(g)}/`,
  subject: (f: Framework, g: GradeId, s: SubjectId) => `/curriculum/${f.slug}/${gradeSlug(g)}/${s}/`,
  unit: (f: Framework, g: GradeId, s: SubjectId, u: string) => `/curriculum/${f.slug}/${gradeSlug(g)}/${s}/${u}/`,
};

export interface Resolved {
  framework: Framework;
  grade: GradeId;
  course?: Course;
  unit?: Unit;
}

/** Resolve URL params, or undefined for a 404. */
export function resolve(params: { framework: string; grade?: string; subject?: string; unit?: string }): Resolved | undefined {
  const framework = frameworkBySlug(params.framework);
  if (!framework) return undefined;
  if (!params.grade) return { framework, grade: framework.grades[0] };
  const grade = gradeFromSlug(params.grade);
  if (!grade || !framework.grades.includes(grade)) return undefined;
  if (!params.subject) return { framework, grade };
  const course = coursesFor(framework, grade).find((c) => c.subject === params.subject);
  if (!course) return undefined;
  if (!params.unit) return { framework, grade, course };
  const unit = course.units.find((u) => u.id === params.unit);
  if (!unit) return undefined;
  return { framework, grade, course, unit };
}

/** A public page for the sitemap, with the day its content last changed when that is known. */
export interface SitemapPath {
  path: string;
  updated?: string;
}

export function allCurriculumPaths(): SitemapPath[] {
  const paths: SitemapPath[] = [{ path: curriculumPath.index(), updated: latest(...FRAMEWORKS.map((f) => curriculumUpdated(f.id))) }];
  for (const f of FRAMEWORKS) {
    paths.push({ path: curriculumPath.framework(f), updated: curriculumUpdated(f.id) });
    for (const g of gradesWithContent(f)) {
      paths.push({ path: curriculumPath.grade(f, g), updated: gradeUpdated(f.id, g) });
      for (const c of coursesFor(f, g)) {
        paths.push({ path: curriculumPath.subject(f, g, c.subject), updated: courseUpdated(f.id, g, c.subject) });
        for (const u of c.units) if (u.standards[f.id]) paths.push({ path: curriculumPath.unit(f, g, c.subject, u.id), updated: unitUpdated(f.id, g, c.subject, u.id) });
      }
    }
  }
  return paths;
}

/** A grade as the framework's country says it: "Grade 4" in Canada, "4th grade" in the US. */
export function gradeLabel(framework: Pick<Framework, "country">, grade: GradeId): string {
  return gradeName(grade, localeOf(framework));
}

/**
 * The framework's grade range in a sentence: "Kindergarten to Grade 9" in Canada, "kindergarten through 9th grade"
 * in the US. Pass `start` for the start of a sentence or a title.
 */
export function gradeSpan(framework: Pick<Framework, "country" | "grades">, start = false): string {
  const first = framework.grades[0];
  const last = framework.grades[framework.grades.length - 1];
  if (localeOf(framework) !== "en-US") return `${gradeLabel(framework, first)} to ${gradeLabel(framework, last)}`;
  const text = `${first === "k" ? "kindergarten" : gradeLabel(framework, first)} through ${gradeLabel(framework, last)}`;
  return start ? text[0].toUpperCase() + text.slice(1) : text;
}

/** Page copy in the framework's English: US spelling ("practice", "color") on a state's pages. */
export function say(framework: Pick<Framework, "country">, text: string): string {
  return localizeText(text, localeOf(framework));
}

export function gradeHeading(framework: Framework, grade: GradeId): string {
  return `${gradeLabel(framework, grade)} ${framework.shortName}`;
}

export { getFramework, unitKey };

/**
 * Seed text for a unit's public sample questions. It includes the framework, so a unit that several provinces and
 * states share shows a different set on each one's page: search engines drop pages that repeat another page.
 */
export function sampleSeed(framework: Pick<Framework, "id">, key: string): string {
  return `${framework.id}:${key}`;
}
