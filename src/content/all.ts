import { mergeCourses } from "./index";
import { withLessons } from "./lessons";
import { REGISTRY } from "./registry";
import { GRADE_ORDER } from "./subjects";
import type { Course, GradeId, SubjectId } from "./types";

// Every grade at once, for the statically generated public pages and for tests.
// Never import this from client code (the apps): it would put all content back
// into the first download. ESLint enforces this; the apps use ./index.

// Every framework's grade files, from the registry (British Columbia's first, as the apps load them). A framework that
// doesn't offer Pre-K yet has no loader for it.
const loaded = await Promise.all(REGISTRY.map((m) => Promise.all(GRADE_ORDER.flatMap((g) => m.grades[g] ?? []).map((load) => load()))));

// Each grade's lessons live in the shared grade files and apply to every framework's units with the same id (as in ./index).
const shared = await Promise.all(GRADE_ORDER.map(async (g) => {
  const mod = await REGISTRY[0].grades[g]?.();
  return [g, { ...(await mod?.moreLessons?.()), ...mod?.lessons }] as const;
}));
const lessons = Object.fromEntries(shared) as Record<GradeId, NonNullable<(typeof loaded)[0][0]["lessons"]>>;

/** Every course with at least one unit. */
export const COURSES: Course[] = mergeCourses(loaded.flat().map((m) => m.courses))
  .map((c) => withLessons([c], lessons[c.grade])[0])
  .filter((c) => c.units.length > 0);

export function getCourse(grade: GradeId, subject: SubjectId | string): Course | undefined {
  return COURSES.find((c) => c.grade === grade && c.subject === subject);
}
