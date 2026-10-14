import type { FrameworkId, GradeId, SubjectId } from "./types";
import DATES from "./locks/dates.json";

// The day each part of a framework's content last changed, recorded by `npm run curriculum:lock` (see lock.test.ts).
// Public pages give these to search engines in the sitemap and in their structured data. Server-side only: the file is
// large, so never import this from the kids' app or the parent area.

interface Dates {
  /** "YYYY-MM-DD hash" */
  guides?: string;
  courses: Record<string, string>;
  units: Record<string, string>;
}

const ALL = DATES as Partial<Record<FrameworkId, Dates>>;

/** The latest of some ISO dates, or undefined when there are none. */
export function latest(...dates: (string | undefined)[]): string | undefined {
  return dates.reduce<string | undefined>((a, b) => (b && (!a || b > a) ? b : a), undefined);
}

export function unitUpdated(framework: FrameworkId, grade: GradeId, subject: SubjectId, unit: string): string | undefined {
  return ALL[framework]?.units[`${grade}/${subject}/${unit}`];
}

/** A course's date moves whenever its overview, its unit list or any of its units changes. */
export function courseUpdated(framework: FrameworkId, grade: GradeId, subject: SubjectId): string | undefined {
  return ALL[framework]?.courses[`${grade}/${subject}`];
}

export function gradeUpdated(framework: FrameworkId, grade: GradeId): string | undefined {
  const courses = ALL[framework]?.courses ?? {};
  return latest(...Object.entries(courses).filter(([key]) => key.startsWith(`${grade}/`)).map(([, date]) => date));
}

/** Every course in the framework. */
export function curriculumUpdated(framework: FrameworkId): string | undefined {
  return latest(...Object.values(ALL[framework]?.courses ?? {}));
}

/** The framework's guide copy and report-card page. */
export function guidesUpdated(framework: FrameworkId): string | undefined {
  return ALL[framework]?.guides?.split(" ")[0];
}
