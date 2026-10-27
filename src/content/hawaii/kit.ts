import type { Course, GradeId, SubjectId } from "../types";
import { planGrade, type OwnUnits, type PlanOptions, type Pool } from "../placement";
import { PLAN } from "./plan";
import { FOCUS } from "./focus";
import { his } from "./cite";

export { his };

// Helpers shared by the Hawaiʻi grade files. A Hawaiʻi standard cites the Hawaiʻi State Department of Education's
// content standards (mathematics 2026, the Hawaiʻi Common Core; English language arts 2024, the Hawaiʻi Common Core;
// science, the Next Generation Science Standards; social studies 2018, the Hawaiʻi Core Standards for Social Studies),
// then a short plain description. The contract suite checks every citation against docs/research/hawaii/outcomes.json.
//
// Most Hawaiʻi units are shared: BC units as they are (`share`), and the other US states' and the provinces' units
// copied with Hawaiʻi standards (`adopt`). Math, English language arts and science follow Michigan's (and so
// California's) placement, because these states teach the Common Core and the Next Generation Science Standards with
// one Grades 6-8 science band; where Hawaiʻi's 2026 math standards moved a topic, the unit moves with it. Social studies
// follows Hawaiʻi's grade themes. Units are shown to Hawaiʻi families in US English by src/content/locale.ts. Hawaiʻi's
// own units (`hi-` ids) come from the grade's own file in ./units (own-g4.ts and so on).

/** One plan entry: a unit from another framework that Hawaiʻi uses, the standards it practises and what they say. */
export type Entry = readonly [id: string, kind: "share" | "adopt", codes: string, text: string];

/**
 * One Hawaiʻi grade. `pool` is, per subject, the unit files Hawaiʻi copies from in this grade (listed in each grade
 * file, so its download carries only those files). A copy keeps the original's id and questions, so progress carries over.
 */
export function hawaiiGrade(grade: GradeId, pool: Pool, own: Partial<Record<SubjectId, OwnUnits>>): Course[] {
  return planGrade(OPTIONS, grade, pool, own);
}

const SUBJECTS = ["math", "language", "science", "social"] as const;

const OPTIONS: PlanOptions = {
  framework: "us-hi",
  name: "Hawaiʻi",
  cite: (codes, text) => his(codes, text),
  plan: PLAN,
  focus: (grade, subject) => FOCUS[`${grade}/${subject}`] ?? [],
  subjects: [...SUBJECTS],
};
