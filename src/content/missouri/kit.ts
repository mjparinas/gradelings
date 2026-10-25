import type { Course, GradeId, SubjectId } from "../types";
import { planGrade, type OwnUnits, type PlanOptions, type Pool } from "../placement";
import { PLAN } from "./plan";
import { FOCUS } from "./focus";
import { mos } from "./cite";

export { mos };

// Helpers shared by the Missouri grade files. A standard cites the Missouri Learning Standards' Grade-Level Expectations
// (adopted by the State Board of Education in 2016, published by the Missouri Department of Elementary and Secondary
// Education), then a short plain description. The contract suite checks every citation against
// docs/research/missouri/outcomes.json.
//
// Most Missouri units are shared: BC units as they are (`share`), and the other US states' and the provinces' units
// copied with Missouri standards (`adopt`). Math and English language arts follow California's placement, because
// Missouri teaches the same ideas in the same grades (DESE's crosswalks map each expectation to the 2010 standards);
// science and social studies follow Missouri's own grade placement. Units are shown to Missouri families in US English
// by src/content/locale.ts. Missouri's own units (`mo-` ids) come from the grade's own file in ./units (own-g3.ts and
// so on).

/** One plan entry: a unit from another framework that Missouri uses, the standards it practises and what they say. */
export type Entry = readonly [id: string, kind: "share" | "adopt", codes: string, text: string];

/**
 * One Missouri grade. `pool` is, per subject, the unit files Missouri copies from in this grade (listed in each grade
 * file, so its download carries only those files). A copy keeps the original's id and questions, so progress carries over.
 */
export function missouriGrade(grade: GradeId, pool: Pool, own: Partial<Record<SubjectId, OwnUnits>>): Course[] {
  return planGrade(OPTIONS, grade, pool, own);
}

const SUBJECTS = ["math", "language", "science", "social"] as const;

const OPTIONS: PlanOptions = {
  framework: "us-mo",
  name: "Missouri",
  cite: (codes, text) => mos(codes, text),
  plan: PLAN,
  focus: (grade, subject) => FOCUS[`${grade}/${subject}`] ?? [],
  subjects: [...SUBJECTS],
};
