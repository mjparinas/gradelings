import type { Framework } from "@/content/frameworks";
import { FRAMEWORKS } from "@/content/frameworks";
import { gradeFromSlug, gradeSlug } from "@/content/subjects";
import { unitKey } from "@/content";
import { hashSeed, withSeed } from "@/content/random";
import type { Course, GradeId, Question, Unit } from "@/content/types";
import { printable } from "@/lib/practiceSheet";
import { unitUpdated } from "@/content/updated";
import { coursesFor, gradeLabel, type SitemapPath } from "./curriculum";

// Printable skill worksheets (/worksheets/): one free sheet with an answer key for each skill in Pre-K and in each
// grade from Kindergarten to Grade 9, for the searches that name a skill ("Grade 3 fractions worksheet") rather than a
// province or state. They are not tied to one: the questions come from the first framework's units, which every other
// framework shares or adapts. Math, English language arts and science are covered in Kindergarten to Grade 9
// (math keeps its first addresses, /worksheets/{grade}/{skill}/), and Pre-K has all four subjects because its picture-only
// library is shared by every region. Social studies, French and Spanish are left out of Kindergarten to Grade 9: what
// they teach differs by region, or (French, Spanish) they are opt-in. Anything that names one country's money, taxes,
// provinces or peoples is left out, so a sheet reads the same for a family anywhere.

/** Questions on a sheet: fewer for Pre-K, which a grown-up reads aloud. */
export const WORKSHEET_QUESTIONS = 10;
export const PREK_WORKSHEET_QUESTIONS = 6;
/** A skill with fewer printable questions than this (pictures, shading and number-line markers need the screen) has no worksheet. */
const MIN_QUESTIONS = 8;
const PREK_MIN_QUESTIONS = 6;

/** Units whose questions use one country's coins, taxes or budgets. */
const COUNTRY_SPECIFIC = /money|coins|tax|budget/;
/** Words that tie a question in science or language arts to one country, province or people (math keeps its unit-level rule). */
const REGIONAL_TEXT = /canad|province|territor|quebec|ontario|\bbc\b|alberta|toonie|loonie|\$|¢|first nations|inuit|métis|metis|indigenous|mountie|maple|prime minister|premier/i;

export type WorksheetSubject = "math" | "language" | "science" | "social";

/** Subjects with worksheets in a grade, in the order pages list them. */
export function worksheetSubjects(grade: GradeId): WorksheetSubject[] {
  return grade === "pk" ? ["math", "language", "science", "social"] : ["math", "language", "science"];
}

const SUBJECT_SLUG: Record<WorksheetSubject, string> = { math: "math", language: "language-arts", science: "science", social: "social-studies" };
const SUBJECT_NAME: Record<WorksheetSubject, string> = { math: "math", language: "language arts", science: "science", social: "social studies" };
const SUBJECT_ABOUT: Record<WorksheetSubject, string> = { math: "Mathematics", language: "English language arts", science: "Science", social: "Social studies" };

export const subjectSlug = (s: WorksheetSubject) => SUBJECT_SLUG[s];
/** Lower-case name for sentences ("language arts"). */
export const subjectWord = (s: WorksheetSubject) => SUBJECT_NAME[s];
export const subjectAbout = (s: WorksheetSubject) => SUBJECT_ABOUT[s];
export const subjectFromSlug = (slug: string): WorksheetSubject | undefined => (Object.keys(SUBJECT_SLUG) as WorksheetSubject[]).find((s) => SUBJECT_SLUG[s] === slug);

/** How many questions a grade's sheet has. */
export const sheetSize = (grade: GradeId) => (grade === "pk" ? PREK_WORKSHEET_QUESTIONS : WORKSHEET_QUESTIONS);
const minQuestions = (grade: GradeId) => (grade === "pk" ? PREK_MIN_QUESTIONS : MIN_QUESTIONS);

/** The framework the questions are taken from. */
export function sourceFramework(): Framework {
  return FRAMEWORKS[0];
}

export interface WorksheetSkill {
  grade: GradeId;
  subject: WorksheetSubject;
  course: Course;
  unit: Unit;
}

/** Math in Kindergarten to Grade 9 keeps its first addresses; every other sheet has its subject in the address. */
const legacyMath = (g: GradeId, subject: WorksheetSubject) => subject === "math" && g !== "pk";

export const worksheetPath = {
  hub: () => "/worksheets/",
  grade: (g: GradeId) => `/worksheets/${gradeSlug(g)}/`,
  /** The grade's sheets for one subject other than math (and every Pre-K subject). */
  subject: (g: GradeId, subject: WorksheetSubject) => `/worksheets/${gradeSlug(g)}/${subjectSlug(subject)}/`,
  skill: (g: GradeId, unitId: string, subject: WorksheetSubject = "math") =>
    legacyMath(g, subject) ? `/worksheets/${gradeSlug(g)}/${unitId}/` : `/worksheets/${gradeSlug(g)}/${subjectSlug(subject)}/${unitId}/`,
};

/** Grades that have worksheets: Pre-K, then Kindergarten to Grade 9. */
export function worksheetGrades(): GradeId[] {
  const f = sourceFramework();
  return f.grades.filter((g) => coursesFor(f, g).some((c) => c.subject === "math"));
}

const sheets = new Map<string, Question[]>();

/** Up to a sheet's worth of printable questions from the skill, seeded so the sheet is identical on every build, with no repeats. */
export function sheetQuestions(s: WorksheetSkill): Question[] {
  const key = unitKey(s.grade, s.subject, s.unit.id);
  const cached = sheets.get(key);
  if (cached) return cached;
  const seen = new Set<string>();
  const out: Question[] = [];
  const max = sheetSize(s.grade);
  for (const difficulty of [2, 1, 3] as const) {
    const qs = withSeed(hashSeed(`worksheet:${key}:${difficulty}`), () => s.unit.generate({ difficulty }));
    for (const q of qs) {
      if (out.length >= max) break;
      if (!printable(q) || seen.has(q.prompt)) continue;
      if (s.subject !== "math" && REGIONAL_TEXT.test(JSON.stringify(q))) continue;
      seen.add(q.prompt);
      out.push(q);
    }
  }
  sheets.set(key, out);
  return out;
}

/** A grade's worksheet skills in one subject (math when none is named). */
export function worksheetSkills(grade: GradeId, subject: WorksheetSubject = "math"): WorksheetSkill[] {
  if (!worksheetSubjects(grade).includes(subject)) return [];
  const f = sourceFramework();
  const course = coursesFor(f, grade).find((c) => c.subject === subject);
  if (!course) return [];
  return course.units
    .filter((u) => !COUNTRY_SPECIFIC.test(u.id) && (subject === "math" || !REGIONAL_TEXT.test(`${u.id} ${u.title}`)))
    .map((unit) => ({ grade, subject, course, unit }))
    .filter((s) => sheetQuestions(s).length >= minQuestions(grade));
}

/** Every skill in a grade, subject by subject. */
export function gradeSkills(grade: GradeId): WorksheetSkill[] {
  return worksheetSubjects(grade).flatMap((s) => worksheetSkills(grade, s));
}

/** Subjects in a grade that have at least one sheet. */
export function subjectsWithSheets(grade: GradeId): WorksheetSubject[] {
  return worksheetSubjects(grade).filter((s) => worksheetSkills(grade, s).length > 0);
}

export function allWorksheetSkills(): WorksheetSkill[] {
  return worksheetGrades().flatMap(gradeSkills);
}

export type WorksheetTarget = WorksheetSkill | { grade: GradeId; subject?: WorksheetSubject };

/**
 * Looks up a page from its URL, or undefined for a 404. `/worksheets/{grade}/{skill}/` is a math skill in
 * Kindergarten to Grade 9 or a subject's page; `/worksheets/{grade}/{subject}/{unit}/` is any other skill.
 */
export function resolveSkill(params: { grade: string; skill?: string; unit?: string }): WorksheetTarget | undefined {
  const grade = gradeFromSlug(params.grade);
  if (!grade || !worksheetGrades().includes(grade)) return undefined;
  if (!params.skill) return { grade };
  const subject = subjectFromSlug(params.skill);
  if (params.unit) {
    if (!subject || legacyMath(grade, subject)) return undefined;
    return worksheetSkills(grade, subject).find((s) => s.unit.id === params.unit);
  }
  if (subject && !legacyMath(grade, subject)) return worksheetSkills(grade, subject).length > 0 ? { grade, subject } : undefined;
  if (grade === "pk") return undefined;
  return worksheetSkills(grade, "math").find((s) => s.unit.id === params.skill);
}

/** The skill a URL names, or undefined for a grade, a subject page or a 404. */
export function resolveWorksheet(params: { grade: string; skill?: string; unit?: string }): WorksheetSkill | undefined {
  const r = resolveSkill(params);
  return r && "unit" in r ? r : undefined;
}

export const worksheetGradeLabel = (g: GradeId) => (g === "pk" ? "Pre-K" : gradeLabel(sourceFramework(), g));

/** Pages that list one subject's sheets in a grade: every subject but Kindergarten to Grade 9 math (the grade's own page). */
export function subjectPages(): { grade: GradeId; subject: WorksheetSubject }[] {
  return worksheetGrades().flatMap((grade) =>
    worksheetSubjects(grade)
      .filter((subject) => !legacyMath(grade, subject) && worksheetSkills(grade, subject).length > 0)
      .map((subject) => ({ grade, subject })),
  );
}

export function allWorksheetPaths(): SitemapPath[] {
  const f = sourceFramework();
  return [
    { path: worksheetPath.hub() },
    ...worksheetGrades().map((g) => ({ path: worksheetPath.grade(g) })),
    ...subjectPages().map((p) => ({ path: worksheetPath.subject(p.grade, p.subject) })),
    ...allWorksheetSkills().map((s) => ({ path: worksheetPath.skill(s.grade, s.unit.id, s.subject), updated: unitUpdated(f.id, s.grade, s.subject, s.unit.id) })),
  ];
}
