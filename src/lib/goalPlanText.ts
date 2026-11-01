import { getUnitRef } from "@/content";
import { getFramework } from "@/content/frameworks";
import { getSubjectMeta } from "@/content/subjects";
import type { FrameworkId } from "@/content/types";
import { gradeLabel } from "./gradeLabel";
import { goalTitle, type GoalPlan } from "./goalPlan";
import { nextGrade } from "./schoolYear";

/** The goal's name ("Ready for Grade 5 Math", "Catch up on Fractions and 2 more"), in the family's grade wording. */
export function goalName(goal: GoalPlan, framework: FrameworkId): string {
  const next = nextGrade(goal.grade);
  const offered = next && getFramework(framework).grades.includes(next);
  return goalTitle(goal, {
    subject: getSubjectMeta(goal.subject).title.big,
    grade: gradeLabel(goal.grade, framework),
    nextGrade: offered ? gradeLabel(next, framework) : undefined,
    unit: (key) => getUnitRef(key, framework)?.unit.title,
  });
}
