import type { FrameworkId, GradeId, SubjectId } from "./types";

// The day each part of a framework's content last changed, recorded by `npm run curriculum:lock` (see lock.test.ts) in
// locks/dates/<id>.json, one file per framework so a new framework adds a file and edits none. Public pages give these
// to search engines in the sitemap and in their structured data. Server-side only: the files are large and read from
// disk, so never import this from the kids' app or the parent area.

interface Dates {
  /** "YYYY-MM-DD hash" */
  guides?: string;
  courses: Record<string, string>;
  units: Record<string, string>;
}

// Read with process.getBuiltinModule rather than an import, so the bundler doesn't try to put node:fs in a client chunk
// when a client component imports a module that reaches this one (the functions below only run on the server).
const DIR = ["src", "content", "locks", "dates"];
const loaded = new Map<string, Dates | undefined>();

/** A framework's recorded dates, read once. */
function datesOf(framework: FrameworkId): Dates | undefined {
  if (!loaded.has(framework)) {
    const fs = process.getBuiltinModule("node:fs");
    const path = process.getBuiltinModule("node:path");
    const file = path.join(process.cwd(), ...DIR, `${framework}.json`);
    loaded.set(framework, fs.existsSync(file) ? (JSON.parse(fs.readFileSync(file, "utf8")) as Dates) : undefined);
  }
  return loaded.get(framework);
}

/** The latest of some ISO dates, or undefined when there are none. */
export function latest(...dates: (string | undefined)[]): string | undefined {
  return dates.reduce<string | undefined>((a, b) => (b && (!a || b > a) ? b : a), undefined);
}

export function unitUpdated(framework: FrameworkId, grade: GradeId, subject: SubjectId, unit: string): string | undefined {
  return datesOf(framework)?.units[`${grade}/${subject}/${unit}`];
}

/** A course's date moves whenever its overview, its unit list or any of its units changes. */
export function courseUpdated(framework: FrameworkId, grade: GradeId, subject: SubjectId): string | undefined {
  return datesOf(framework)?.courses[`${grade}/${subject}`];
}

export function gradeUpdated(framework: FrameworkId, grade: GradeId): string | undefined {
  const courses = datesOf(framework)?.courses ?? {};
  return latest(...Object.entries(courses).filter(([key]) => key.startsWith(`${grade}/`)).map(([, date]) => date));
}

/** Every course in the framework. */
export function curriculumUpdated(framework: FrameworkId): string | undefined {
  return latest(...Object.values(datesOf(framework)?.courses ?? {}));
}

/** The framework's guide copy and report-card page. */
export function guidesUpdated(framework: FrameworkId): string | undefined {
  return datesOf(framework)?.guides?.split(" ")[0];
}
