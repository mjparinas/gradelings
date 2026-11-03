import type { Framework } from "@/content/frameworks";
import { FRAMEWORKS } from "@/content/frameworks";
import { gradeFromSlug, gradeSlug } from "@/content/subjects";
import { unitKey } from "@/content";
import { hashSeed, withSeed } from "@/content/random";
import type { Course, GradeId, Question, Unit } from "@/content/types";
import { printable } from "@/lib/practiceSheet";
import { unitUpdated } from "@/content/updated";
import { coursesFor, gradeLabel, type SitemapPath } from "./curriculum";

// Printable skill worksheets (/worksheets/): one free sheet with an answer key for each math skill in each grade from
// Kindergarten to Grade 9, for the searches that name a skill ("Grade 3 fractions worksheet") rather than a province
// or state. They are not tied to one: the questions come from the first framework's units, which every other
// framework shares or adapts, and money and tax units are left out because their coins and rules differ by country.
// Pre-K is left out (its questions are picture-only), and so is every subject but math for now.

export const WORKSHEET_QUESTIONS = 10;
/** A skill with fewer printable questions than this (pictures, shading and number-line markers need the screen) has no worksheet. */
const MIN_QUESTIONS = 8;

/** Units whose questions use one country's coins, taxes or budgets. */
const COUNTRY_SPECIFIC = /money|coins|tax|budget/;

/** The framework the questions are taken from. */
export function sourceFramework(): Framework {
  return FRAMEWORKS[0];
}

export interface WorksheetSkill {
  grade: GradeId;
  course: Course;
  unit: Unit;
}

export const worksheetPath = {
  hub: () => "/worksheets/",
  grade: (g: GradeId) => `/worksheets/${gradeSlug(g)}/`,
  skill: (g: GradeId, unitId: string) => `/worksheets/${gradeSlug(g)}/${unitId}/`,
};

/** Grades that have worksheets: Kindergarten to Grade 9. */
export function worksheetGrades(): GradeId[] {
  const f = sourceFramework();
  return f.grades.filter((g) => g !== "pk" && coursesFor(f, g).some((c) => c.subject === "math"));
}

const sheets = new Map<string, Question[]>();

/** Up to ten printable questions from the skill, seeded so the sheet is identical on every build, with no repeats. */
export function sheetQuestions(s: WorksheetSkill): Question[] {
  const key = unitKey(s.grade, "math", s.unit.id);
  const cached = sheets.get(key);
  if (cached) return cached;
  const seen = new Set<string>();
  const out: Question[] = [];
  for (const difficulty of [2, 1, 3] as const) {
    const qs = withSeed(hashSeed(`worksheet:${key}:${difficulty}`), () => s.unit.generate({ difficulty }));
    for (const q of qs) {
      if (out.length >= WORKSHEET_QUESTIONS) break;
      if (!printable(q) || seen.has(q.prompt)) continue;
      seen.add(q.prompt);
      out.push(q);
    }
  }
  sheets.set(key, out);
  return out;
}

export function worksheetSkills(grade: GradeId): WorksheetSkill[] {
  const f = sourceFramework();
  const course = coursesFor(f, grade).find((c) => c.subject === "math");
  if (!course || grade === "pk") return [];
  return course.units
    .filter((u) => !COUNTRY_SPECIFIC.test(u.id))
    .map((unit) => ({ grade, course, unit }))
    .filter((s) => sheetQuestions(s).length >= MIN_QUESTIONS);
}

export function allWorksheetSkills(): WorksheetSkill[] {
  return worksheetGrades().flatMap(worksheetSkills);
}

/** Looks up a page's skill from its URL, or undefined for a 404. */
export function resolveSkill(params: { grade: string; skill?: string }): WorksheetSkill | { grade: GradeId } | undefined {
  const grade = gradeFromSlug(params.grade);
  if (!grade || !worksheetGrades().includes(grade)) return undefined;
  if (!params.skill) return { grade };
  return worksheetSkills(grade).find((s) => s.unit.id === params.skill);
}

export const worksheetGradeLabel = (g: GradeId) => gradeLabel(sourceFramework(), g);

export function allWorksheetPaths(): SitemapPath[] {
  return [
    { path: worksheetPath.hub() },
    ...worksheetGrades().map((g) => ({ path: worksheetPath.grade(g) })),
    ...allWorksheetSkills().map((s) => ({ path: worksheetPath.skill(s.grade, s.unit.id), updated: unitUpdated(sourceFramework().id, s.grade, "math", s.unit.id) })),
  ];
}
