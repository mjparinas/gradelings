import type { Course, GradeId, SubjectId } from "../types";
import { planGrade, type OwnUnits, type PlanOptions, type Pool } from "../placement";
import { PLAN } from "./plan";
import { FOCUS } from "./focus";
import { uts } from "./cite";

export { uts };

// Helpers shared by the Utah grade files. A standard cites the Utah Core Standards (mathematics, English language arts
// 2023, SEEd science and social studies), then a short plain description. The contract suite checks every citation
// against docs/research/utah/outcomes.json.
//
// Most Utah units are shared: BC units as they are (`share`), and the other US states' and the provinces' units copied
// with Utah standards (`adopt`). Math and English language arts follow Michigan's (and so California's) placement,
// because Utah's standards keep the Common Core's grades; science follows SEEd's own grade placement, which sets each
// middle school standard in Grade 6, 7 or 8, and Grade 9 cites Biology and Earth and Space Science. Social studies
// follows Utah's grade themes: family and community (K to 2), government and communities (3), Utah (4), United States
// history (5), world history (6), Utah Studies (7), United States History I (8) and World Geography (9). Units are shown
// to Utah families in US English by src/content/locale.ts. Utah's own units (`ut-` ids) come from the grade's own file in
// ./units (own-g4.ts and so on).

/** One plan entry: a unit from another framework that Utah uses, the standards it practises and what they say. */
export type Entry = readonly [id: string, kind: "share" | "adopt", codes: string, text: string];

/**
 * One Utah grade. `pool` is, per subject, the unit files Utah copies from in this grade (listed in each grade
 * file, so its download carries only those files). A copy keeps the original's id and questions, so progress carries over.
 */
export function utahGrade(grade: GradeId, pool: Pool, own: Partial<Record<SubjectId, OwnUnits>>): Course[] {
  return planGrade(OPTIONS, grade, pool, own);
}

const SUBJECTS = ["math", "language", "science", "social"] as const;

const OPTIONS: PlanOptions = {
  framework: "us-ut",
  name: "Utah",
  cite: (codes, text) => uts(codes, text),
  plan: PLAN,
  focus: (grade, subject) => FOCUS[`${grade}/${subject}`] ?? [],
  subjects: [...SUBJECTS],
};
