import { GRADE_LABEL, GRADE_ORDER, gradeFromSlug, gradeSlug } from "@/content/subjects";
import type { GradeId } from "@/content/types";
import { HOME_TIPS, TIP_SUBJECTS, type SubjectTips, type TipSubject } from "./homeTips";

// Public "Help at home" pages (/help-at-home/ and one page per grade, Pre-K to Grade 9): short coaching tips for
// parents, by subject. They are the same for every province and state (see homeTips.ts), so nothing here reads a
// framework.

export const helpAtHomePath = {
  hub: () => "/help-at-home/",
  grade: (g: GradeId) => `/help-at-home/${gradeSlug(g)}/`,
};

export function helpGradeFromSlug(slug: string): GradeId | undefined {
  return gradeFromSlug(slug);
}

export const HELP_GRADES: readonly GradeId[] = GRADE_ORDER;

export const gradeName = (g: GradeId): string => GRADE_LABEL[g];

export const SUBJECT_TITLE: Record<TipSubject, string> = {
  math: "Math",
  language: "Reading and writing",
  science: "Science",
  social: "Social studies",
};

export function tipsFor(grade: GradeId): { subject: TipSubject; title: string; tips: SubjectTips }[] {
  return TIP_SUBJECTS.map((subject) => ({ subject, title: SUBJECT_TITLE[subject], tips: HOME_TIPS[grade][subject] }));
}

export const HELP_FAQS = (grade: GradeId): { q: string; a: string }[] => [
  {
    q: `How much time should my child spend on ${gradeName(grade)} work at home?`,
    a: "A few focused minutes a day beats a long session. Pick one idea from this page, keep it light, and stop while it is still fun.",
  },
  {
    q: "What if my child finds it hard or says they don't want to?",
    a: "Make it smaller, not longer. Try one question instead of three, take turns, or let your child be the teacher. A calm, short try is worth more than a finished page.",
  },
];

export function allHelpAtHomePaths(): { path: string }[] {
  return [{ path: helpAtHomePath.hub() }, ...HELP_GRADES.map((g) => ({ path: helpAtHomePath.grade(g) }))];
}
