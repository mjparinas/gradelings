import { mergeCourses } from "./index";
import { withLessons } from "./lessons";
import { REGISTRY } from "./registry";
import { GRADE_ORDER } from "./subjects";
import type { Course, GradeId, SubjectId } from "./types";

// Every grade at once, for the statically generated public pages and for tests.
// Never import this from client code (the apps): it would put all content back
// into the first download. ESLint enforces this; the apps use ./index.

// Every framework's grade files, from the registry (British Columbia's first, as the apps load them).
const loaded = await Promise.all(REGISTRY.map((m) => Promise.all(GRADE_ORDER.map((g) => m.grades[g]()))));

// Each grade's lessons live in the shared grade files and apply to every framework's units with the same id (as in ./index).
const more = await Promise.all(loaded[0].map((m) => m.moreLessons?.() ?? {}));
const lessons = Object.fromEntries(GRADE_ORDER.map((g, i) => [g, { ...more[i], ...loaded[0][i].lessons }])) as Record<GradeId, NonNullable<(typeof loaded)[0][0]["lessons"]>>;

/** Every course with at least one unit. */
export const COURSES: Course[] = mergeCourses(loaded.flat().map((m) => m.courses))
  .map((c) => withLessons([c], lessons[c.grade])[0])
  .filter((c) => c.units.length > 0);

export function getCourse(grade: GradeId, subject: SubjectId | string): Course | undefined {
  return COURSES.find((c) => c.grade === grade && c.subject === subject);
}
