import type { Course, GradeId, SubjectId } from "../types";
import { planGrade, type OwnUnits, type PlanOptions, type Pool } from "../placement";
import { PLAN } from "./plan";
import { FOCUS } from "./focus";
import { col } from "./cite";

export { col };

// Helpers shared by the Colorado grade files. A Colorado standard cites the Colorado Academic Standards (mathematics,
// reading, writing and communicating, and science adopted 2018 and taught from 2020; social studies adopted 2022), then a
// short plain description. The contract suite checks every citation against docs/research/colorado/outcomes.json.
//
// Most Colorado units are shared: BC units as they are (`share`), and the other US states' and the provinces' units
// copied with Colorado standards (`adopt`). Math, reading and writing, and science follow California's placement,
// because Colorado's standards are built on the Common Core and the Next Generation Science Standards; Colorado's
// citations replace California's. Units are shown to Colorado families in US English by src/content/locale.ts.
// Colorado's own units (`co-` ids) come from the grade's own file in ./units (own-g4.ts and so on).

/** One plan entry: a unit from another framework that Colorado uses, the standards it practises and what they say. */
export type Entry = readonly [id: string, kind: "share" | "adopt", codes: string, text: string];

/**
 * One Colorado grade. `pool` is, per subject, the unit files Colorado copies from in this grade (listed in each grade
 * file, so its download carries only those files). A copy keeps the original's id and questions, so progress carries over.
 */
export function coloradoGrade(grade: GradeId, pool: Pool, own: Partial<Record<SubjectId, OwnUnits>>): Course[] {
  return planGrade(OPTIONS, grade, pool, own);
}

const SUBJECTS = ["math", "language", "science", "social"] as const;

const OPTIONS: PlanOptions = {
  framework: "us-co",
  name: "Colorado",
  cite: (codes, text) => col(codes, text),
  plan: PLAN,
  focus: (grade, subject) => FOCUS[`${grade}/${subject}`] ?? [],
  subjects: [...SUBJECTS],
};
