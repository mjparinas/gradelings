import type { Course, GradeId, SubjectId } from "../types";
import { planGrade, type OwnUnits, type PlanOptions, type Pool } from "../placement";
import { PLAN } from "./plan";
import { FOCUS } from "./focus";
import { nms } from "./cite";

export { nms };

// Helpers shared by the New Mexico grade files. A New Mexico standard cites the New Mexico Content Standards
// (mathematics and English language arts 2010, the Common Core; science 2018, the NM STEM Ready! Science Standards;
// social studies 2022), then a short plain description. The contract suite checks every citation against
// docs/research/new-mexico/outcomes.json.
//
// Most New Mexico units are shared: BC units as they are (`share`), and the other US states' and the provinces' units
// copied with New Mexico standards (`adopt`). Math, English language arts and science follow Michigan's (and so
// California's) placement, because these states teach the Common Core and the Next Generation Science
// Standards with one Grades 6-8 science band. Social studies follows New Mexico's grade themes. Units are shown to New
// Mexico families in US English by src/content/locale.ts. New Mexico's own units (`nm-` ids) come from the grade's own
// file in ./units (own-g4.ts and so on).

/** One plan entry: a unit from another framework that New Mexico uses, the standards it practises and what they say. */
export type Entry = readonly [id: string, kind: "share" | "adopt", codes: string, text: string];

/**
 * One New Mexico grade. `pool` is, per subject, the unit files New Mexico copies from in this grade (listed in each grade
 * file, so its download carries only those files). A copy keeps the original's id and questions, so progress carries over.
 */
export function newMexicoGrade(grade: GradeId, pool: Pool, own: Partial<Record<SubjectId, OwnUnits>>): Course[] {
  return planGrade(OPTIONS, grade, pool, own);
}

const SUBJECTS = ["math", "language", "science", "social"] as const;

const OPTIONS: PlanOptions = {
  framework: "us-nm",
  name: "New Mexico",
  cite: (codes, text) => nms(codes, text),
  plan: PLAN,
  focus: (grade, subject) => FOCUS[`${grade}/${subject}`] ?? [],
  subjects: [...SUBJECTS],
};
