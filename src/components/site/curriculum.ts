import { coursesInFramework, unitKey } from "@/content";
import { COURSES } from "@/content/all";
import { FRAMEWORKS, getFramework, type Framework } from "@/content/frameworks";
import { ageBandFor, getSubjectMeta, gradeFromSlug, gradeSlug } from "@/content/subjects";
import { gradeName, localeOf, localizeText } from "@/content/locale";
import type { Course, GradeId, SubjectId, Unit } from "@/content/types";

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
  return getSubjectMeta(subject).seoTitle;
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

export function allCurriculumPaths(): string[] {
  const paths: string[] = [curriculumPath.index()];
  for (const f of FRAMEWORKS) {
    paths.push(curriculumPath.framework(f));
    for (const g of gradesWithContent(f)) {
      paths.push(curriculumPath.grade(f, g));
      for (const c of coursesFor(f, g)) {
        paths.push(curriculumPath.subject(f, g, c.subject));
        for (const u of c.units) if (u.standards[f.id]) paths.push(curriculumPath.unit(f, g, c.subject, u.id));
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
