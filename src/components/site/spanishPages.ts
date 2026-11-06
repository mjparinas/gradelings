import { unitKey } from "@/content";
import { COURSES } from "@/content/all";
import { GRADE_ORDER, GRADE_LABEL, gradeFromSlug, gradeSlug } from "@/content/subjects";
import type { Course, GradeId, Unit } from "@/content/types";

// Public Spanish pages: /spanish/ (the hub), /spanish/{grade}/ and /spanish/{grade}/{unit}/. Spanish is one shared
// beginner course for Grades 3 to 9 in every province and state (see src/content/spanish.ts), so these pages are not
// repeated per curriculum: one set serves everyone, and each unit page names the standards that apply in the places
// that have their own Spanish curriculum (British Columbia, Alberta, Manitoba) and the World-Readiness Standards
// everywhere else. Built from the course itself, so a new unit appears by itself.

export const spanishPath = {
  hub: () => "/spanish/",
  grade: (g: GradeId) => `/spanish/${gradeSlug(g)}/`,
  unit: (g: GradeId, u: string) => `/spanish/${gradeSlug(g)}/${u}/`,
};

/** The Spanish course of each grade it is taught in, in grade order. */
export function spanishCourses(): Course[] {
  return COURSES.filter((c) => c.subject === "spanish").sort((a, b) => GRADE_ORDER.indexOf(a.grade) - GRADE_ORDER.indexOf(b.grade));
}

export function spanishGrade(slug: string): { grade: GradeId; course: Course } | undefined {
  const grade = gradeFromSlug(slug);
  const course = spanishCourses().find((c) => c.grade === grade);
  return grade && course ? { grade, course } : undefined;
}

export function spanishUnit(gradeSlugText: string, unitId: string): { grade: GradeId; course: Course; unit: Unit } | undefined {
  const g = spanishGrade(gradeSlugText);
  const unit = g?.course.units.find((u) => u.id === unitId);
  return g && unit ? { ...g, unit } : undefined;
}

export const spanishGradeLabel = (g: GradeId): string => GRADE_LABEL[g];

/** The key a unit's progress is stored under, for seeding its sample questions. */
export const spanishSampleSeed = (grade: GradeId, unit: string): string => `spanish:${unitKey(grade, "spanish", unit)}`;

/** Where a grade starts on the proficiency scale the course aims for, in plain words for parents. */
export const SPANISH_LEVEL_WORDS: Partial<Record<GradeId, string>> = {
  "3": "first words and phrases",
  "4": "first words and phrases",
  "5": "short, familiar sentences",
  "6": "short, familiar sentences",
  "7": "a few connected sentences about familiar topics",
  "8": "a few connected sentences about familiar topics",
  "9": "simple conversations and short texts in the past and future",
};

/** The standards a unit practises in the three places with their own Spanish curriculum, and for everywhere else. */
export function spanishStandardLines(unit: Unit): { label: string; text: string }[] {
  const lines: { label: string; text: string }[] = [];
  const own: [string, string][] = [
    ["British Columbia", "ca-bc"],
    ["Alberta", "ca-ab"],
    ["Manitoba", "ca-mb"],
  ];
  for (const [label, id] of own) {
    const text = (unit.standards as Record<string, string | undefined>)[id];
    // mergeCourses copies the World-Readiness line to every framework without its own, so only a different line is theirs.
    if (text && text !== unit.standardElsewhere) lines.push({ label, text });
  }
  if (unit.standardElsewhere) lines.push({ label: "Everywhere else (World-Readiness Standards)", text: unit.standardElsewhere });
  return lines;
}
