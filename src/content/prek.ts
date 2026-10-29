import type { ScoringScheme } from "./frameworks";
import type { Course, FrameworkId, SubjectId } from "./types";

// Pre-K, the year before Kindergarten. Its units are written once, in the shared grade files (./grades/pk), and every
// province and state that offers Pre-K uses all of them: its own Pre-K file (`<folder>/pk.ts`) only says which of its
// early-learning standards each unit practises, and the overview of each subject. So a framework adds Pre-K with one
// small file, its research folder (docs/research/<folder>/prek/) and three lines in its manifest and framework.

/** The core subjects Pre-K teaches. No French: a second language starts in Kindergarten at the earliest. */
export const PRE_K_SUBJECTS = ["math", "language", "science", "social"] as const;
export type PreKSubject = (typeof PRE_K_SUBJECTS)[number];

/** Every shared Pre-K unit by subject, in the order they are shown. Each framework cites every one of them. */
export const PRE_K_UNITS: Record<PreKSubject, readonly string[]> = {
  math: ["count-to-5", "find-the-number", "more-or-fewer", "shapes", "patterns", "big-and-small", "sort-it"],
  language: ["letter-names", "first-sounds", "rhyme-time", "clap-the-parts", "listen-to-a-story", "word-meanings"],
  science: ["five-senses", "living-or-not", "animals-and-babies", "weather-and-sky", "plants-grow", "sink-or-float"],
  social: ["my-family", "feelings", "community-helpers", "places-around-me", "taking-turns", "first-next-last", "caring-for-our-world"],
};

/** One framework's Pre-K: per subject, its overview lines and the standard ("citation · plain words") for each unit. */
export type PreKPlan = Record<PreKSubject, { bigIdeas: string[]; standards: Record<string, string> }>;

/**
 * A framework's Pre-K courses: the shared units, shared with its standards (so progress is the same unit everywhere),
 * shown in the shared order.
 */
export function preKCourses(framework: FrameworkId, plan: PreKPlan): Course[] {
  return PRE_K_SUBJECTS.map((subject: SubjectId & PreKSubject) => ({
    grade: "pk",
    subject,
    bigIdeas: { [framework]: plan[subject].bigIdeas },
    units: [],
    shares: Object.fromEntries(Object.entries(plan[subject].standards).map(([id, standard]) => [id, { standards: { [framework]: standard } }])),
    order: { [framework]: [...PRE_K_UNITS[subject]] },
  }));
}

/**
 * Pre-K has no report card anywhere, so its levels are practice steps: the framework's own four levels, kept so the app
 * and reports read the same, but never said to be the report card's.
 */
export function preKScale(base: ScoringScheme): ScoringScheme {
  return {
    ...base,
    id: `${base.id}-pre-k`,
    name: "Practice steps",
    source: "Pre-K has no report card. These steps show practice only.",
    practiceSteps: true,
    levels: base.levels.map((level) => ({ ...level, marks: undefined })),
  };
}
