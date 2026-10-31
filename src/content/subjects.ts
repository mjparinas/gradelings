import type { FlagKey } from "@/lib/flags";
import type { AgeBand, GradeId, QuestionLanguage, SubjectId } from "./types";

/** A language a second-language subject is taught in. Read-aloud picks its voice by this. */
export type SubjectLanguage = QuestionLanguage;

/** A language's name in English, for parent-facing copy ("Math · Science · French"). */
export const LANGUAGE_NAME: Record<SubjectLanguage, string> = { fr: "French", es: "Spanish" };

// The subject registry: every subject the app knows, and what sets it apart. A new second-language subject (Spanish,
// say) is its id in SubjectId plus one entry here with `language` set; the rest of the app reads the lists below
// rather than naming subjects. Which grades a framework teaches it in is set in that framework's manifest.
export interface SubjectMeta {
  id: SubjectId;
  /** Subject name as parents search for it, whatever the kids see: "English Language Arts". */
  seoTitle: string;
  /**
   * For a second-language subject, the language it teaches. Such subjects are opt-in (a parent turns them on per child)
   * and never count toward "every unit in your grade" goals; every other subject is a core subject.
   */
  language?: SubjectLanguage;
  /** Names change with age: "Letters & Words" for little kids, "Language Arts" for older ones. */
  title: Record<AgeBand, string>;
  emoji: string;
  colour: string;
  colourDark: string;
  colourSoft: string;
  tagline: Record<AgeBand, string>;
  /** Which mascot guides this subject. */
  mascot: string;
  /**
   * For a subject every province and state offers in the same grades (Spanish), those grades. It is in no framework's
   * `subjects`: one shared course cites each framework's own standards (see ./spanish).
   */
  everywhere?: readonly GradeId[];
  /**
   * A subject still being tried: parents can turn it on only while this feature flag is on for the family, and the
   * public pages leave it out (see `publicSubject`).
   */
  flag?: FlagKey;
}

export const SUBJECTS: SubjectMeta[] = [
  {
    id: "math",
    seoTitle: "Math",
    title: { little: "Numbers", middle: "Math", big: "Math" },
    emoji: "🔢",
    colour: "#4f8ef7",
    colourDark: "#2f6fd6",
    colourSoft: "#e6f0ff",
    tagline: { little: "Count, shapes & patterns", middle: "Numbers, shapes & money", big: "Number sense to algebra" },
    mascot: "hoot",
  },
  {
    id: "language",
    seoTitle: "English Language Arts",
    title: { little: "Letters & Words", middle: "Reading & Writing", big: "Language Arts" },
    emoji: "📚",
    colour: "#e9559a",
    colourDark: "#c43a7c",
    colourSoft: "#ffe8f3",
    tagline: { little: "Sounds, letters & stories", middle: "Sounds, words & stories", big: "Reading, writing & grammar" },
    mascot: "ruby",
  },
  {
    id: "science",
    seoTitle: "Science",
    title: { little: "Science", middle: "Science", big: "Science" },
    emoji: "🔬",
    colour: "#25b47e",
    colourDark: "#16925f",
    colourSoft: "#e2f8ee",
    tagline: { little: "Animals, plants & weather", middle: "Life, matter & energy", big: "Life, matter, energy & space" },
    mascot: "bolt",
  },
  {
    id: "social",
    seoTitle: "Social Studies",
    title: { little: "My World", middle: "Our World", big: "Social Studies" },
    emoji: "🌎",
    colour: "#ff9636",
    colourDark: "#e57a12",
    colourSoft: "#fff1e2",
    tagline: { little: "Me, family & community", middle: "Communities & caring", big: "People, places & history" },
    mascot: "juniper",
  },
  {
    id: "immersion",
    seoTitle: "French Immersion",
    language: "fr",
    title: { little: "En français", middle: "Français", big: "French Immersion" },
    emoji: "🥐",
    colour: "#ef6b6b",
    colourDark: "#cc4a4a",
    colourSoft: "#ffe9e9",
    tagline: { little: "Mots, sons et histoires", middle: "Lire, écrire et parler", big: "Lecture, écriture et grammaire" },
    mascot: "ollie",
  },
  {
    id: "core-french",
    seoTitle: "Core French",
    language: "fr",
    title: { little: "Core French", middle: "Core French", big: "Core French" },
    emoji: "🍁",
    colour: "#1fb5c5",
    colourDark: "#12909e",
    colourSoft: "#e0f7fa",
    tagline: { little: "Bonjour!", middle: "Bonjour!", big: "Speak and read French" },
    mascot: "ollie",
  },
  {
    id: "spanish",
    seoTitle: "Spanish",
    language: "es",
    title: { little: "Spanish", middle: "Spanish", big: "Spanish" },
    emoji: "💬",
    colour: "#f2b631",
    colourDark: "#b8820c",
    colourSoft: "#fff5d9",
    tagline: { little: "¡Hola!", middle: "¡Hola!", big: "Speak and read Spanish" },
    mascot: "ollie",
    everywhere: ["3", "4", "5", "6", "7", "8", "9"],
    flag: "spanish",
  },
];

/** The subjects every child studies. Second languages are opt-in (Settings), so they never count toward "every unit" goals. */
export const CORE_SUBJECTS: SubjectId[] = SUBJECTS.filter((s) => !s.language).map((s) => s.id);

/** The opt-in second-language subjects taught in a language: subjectsIn("fr") is Immersion and Core French. */
export function subjectsIn(language: SubjectLanguage): SubjectId[] {
  return SUBJECTS.filter((s) => s.language === language).map((s) => s.id);
}

/** The second languages among some subjects, each once: ["fr"]. */
export function languagesOf(subjects: readonly (SubjectId | string)[]): SubjectLanguage[] {
  return [...new Set(subjects.map((id) => SUBJECTS.find((s) => s.id === id)?.language).filter((l): l is SubjectLanguage => !!l))];
}

/**
 * The subjects a parent can turn on for a child: the framework's own, plus a subject offered everywhere (Spanish) in the
 * grades it is taught, while its flag is on.
 */
export function subjectsOffered(framework: { subjects: readonly SubjectId[] }, grade: GradeId, isOn: (flag: FlagKey) => boolean): SubjectId[] {
  return SUBJECTS.filter((s) => framework.subjects.includes(s.id) || (s.everywhere?.includes(grade) && (!s.flag || isOn(s.flag)))).map((s) => s.id);
}

/** Whether the public pages show a subject: not while it is still being tried behind a flag. */
export function publicSubject(id: SubjectId | string): boolean {
  return !SUBJECTS.find((s) => s.id === id)?.flag;
}

// Language names and French program names stay capitalized mid-sentence.
const PROPER_SUBJECT_WORDS = new Set(["English", "French", "Français", "Core", "Immersion", "Spanish"]);

/** A subject name for use mid-sentence: "Language Arts" → "language arts", "French Immersion" stays as is. */
export function subjectInSentence(title: string): string {
  return title
    .split(" ")
    .map((word) => (PROPER_SUBJECT_WORDS.has(word) ? word : word.toLowerCase()))
    .join(" ");
}

export function isCoreSubject(id: SubjectId | string): boolean {
  return (CORE_SUBJECTS as string[]).includes(id);
}

export function getSubjectMeta(id: SubjectId | string): SubjectMeta {
  return SUBJECTS.find((s) => s.id === id) ?? SUBJECTS[0];
}

export const GRADE_ORDER: GradeId[] = ["pk", "k", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

export const GRADE_LABEL: Record<GradeId, string> = {
  pk: "Pre-K",
  k: "Kindergarten",
  "1": "Grade 1",
  "2": "Grade 2",
  "3": "Grade 3",
  "4": "Grade 4",
  "5": "Grade 5",
  "6": "Grade 6",
  "7": "Grade 7",
  "8": "Grade 8",
  "9": "Grade 9",
};

export const GRADE_SHORT: Record<GradeId, string> = {
  pk: "PK",
  k: "K",
  "1": "1",
  "2": "2",
  "3": "3",
  "4": "4",
  "5": "5",
  "6": "6",
  "7": "7",
  "8": "8",
  "9": "9",
};

export function gradeSlug(grade: GradeId): string {
  return grade === "pk" ? "pre-k" : grade === "k" ? "kindergarten" : `grade-${grade}`;
}

export function gradeFromSlug(slug: string): GradeId | undefined {
  return GRADE_ORDER.find((g) => gradeSlug(g) === slug);
}

export function ageBandFor(grade: GradeId): AgeBand {
  if (grade === "pk" || grade === "k" || grade === "1") return "little";
  if (grade === "5" || grade === "6" || grade === "7" || grade === "8" || grade === "9") return "big";
  return "middle";
}

/**
 * Typical age at the start of a grade, for suggesting a grade from a child's age (4 is Pre-K, 5 Kindergarten). Pass the
 * curriculum's grades to keep to them: a 4-year-old is suggested Kindergarten where Pre-K isn't offered.
 */
export function gradeForAge(age: number, grades: readonly GradeId[] = GRADE_ORDER): GradeId {
  const g = GRADE_ORDER[Math.max(0, Math.min(GRADE_ORDER.length - 1, Math.round(age) - 4))];
  return grades.includes(g) ? g : (grades.find((x) => GRADE_ORDER.indexOf(x) > GRADE_ORDER.indexOf(g)) ?? grades[grades.length - 1]);
}

/** Pre-K, the year before Kindergarten: age 4, no reading or typing needed, and not offered in every framework yet. */
export function isPreK(grade: GradeId | string): boolean {
  return grade === "pk";
}

/** A grade as a number for comparing and counting: Pre-K is -1, Kindergarten 0, then 1 to 9. */
export function gradeNumber(grade: GradeId): number {
  return grade === "pk" ? -1 : grade === "k" ? 0 : Number(grade);
}
