import type { Course, GradeId, SubjectId } from "../types";
import { planGrade, type OwnUnits, type PlanOptions, type Pool } from "../placement";
import { PLAN } from "./plan";
import { FOCUS } from "./focus";
import { las } from "./cite";

export { las };

// Helpers shared by the Louisiana grade files. A standard cites the Louisiana Student Standards (mathematics 2016,
// English language arts 2026, science 2017 and social studies 2022), then a short plain description. The contract suite
// checks every citation against docs/research/louisiana/outcomes.json.
//
// Most Louisiana units are shared: BC units as they are (`share`), and the other US states' and the provinces' units
// copied with Louisiana standards (`adopt`). Math and English language arts follow Michigan's (and so California's)
// placement, because Louisiana's standards keep the Common Core's grades; science follows Louisiana's own grade
// placement, which sets each middle school expectation in Grade 6, 7 or 8. Social studies follows Louisiana's grade
// themes: home and community (K), Louisiana (1), the United States (2), the American story (3), the ancient world (4),
// the Middle Ages to the early modern world (5), and the United States and Louisiana to 1791 (6), to 1877 (7) and to
// 2008 (8), then civics (9). Units are shown to Louisiana families in US English by src/content/locale.ts. Louisiana's
// own units (`la-` ids) come from the grade's own file in ./units (own-g1.ts and so on).

/** One plan entry: a unit from another framework that Louisiana uses, the standards it practises and what they say. */
export type Entry = readonly [id: string, kind: "share" | "adopt", codes: string, text: string];

/**
 * One Louisiana grade. `pool` is, per subject, the unit files Louisiana copies from in this grade (listed in each grade
 * file, so its download carries only those files). A copy keeps the original's id and questions, so progress carries over.
 */
export function louisianaGrade(grade: GradeId, pool: Pool, own: Partial<Record<SubjectId, OwnUnits>>): Course[] {
  return planGrade(OPTIONS, grade, pool, own);
}

const SUBJECTS = ["math", "language", "science", "social"] as const;

const OPTIONS: PlanOptions = {
  framework: "us-la",
  name: "Louisiana",
  cite: (codes, text) => las(codes, text),
  plan: PLAN,
  focus: (grade, subject) => FOCUS[`${grade}/${subject}`] ?? [],
  subjects: [...SUBJECTS],
};
