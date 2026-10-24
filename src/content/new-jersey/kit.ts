import type { Course, GradeId, SubjectId } from "../types";
import { planGrade, type OwnUnits, type PlanOptions, type Pool } from "../placement";
import { PLAN } from "./plan";
import { FOCUS } from "./focus";
import { njs } from "./cite";

export { njs };

// Helpers shared by the New Jersey grade files. A New Jersey standard cites the New Jersey Student Learning Standards
// (mathematics and English language arts adopted 2023, science readopted 2026, social studies 2020, and personal
// financial literacy from the 2020 Career Readiness, Life Literacies, and Key Skills standards), then a short plain
// description. The contract suite checks every citation against docs/research/new-jersey/outcomes.json.
//
// Most New Jersey units are shared: BC units as they are (`share`), and the other US states' and the provinces' units
// copied with New Jersey standards (`adopt`). Math, English language arts and science follow California's placement,
// because New Jersey's standards are built on the Common Core and the Next Generation Science Standards; New Jersey's
// citations replace California's. Units are shown to New Jersey families in US English by src/content/locale.ts.
// New Jersey's own units (`nj-` ids) come from the grade's own file in ./units (own-g4.ts and so on).

/** One plan entry: a unit from another framework that New Jersey uses, the standards it practises and what they say. */
export type Entry = readonly [id: string, kind: "share" | "adopt", codes: string, text: string];

/**
 * One New Jersey grade. `pool` is, per subject, the unit files New Jersey copies from in this grade (listed in each grade
 * file, so its download carries only those files). A copy keeps the original's id and questions, so progress carries over.
 */
export function newJerseyGrade(grade: GradeId, pool: Pool, own: Partial<Record<SubjectId, OwnUnits>>): Course[] {
  return planGrade(OPTIONS, grade, pool, own);
}

const SUBJECTS = ["math", "language", "science", "social"] as const;

const OPTIONS: PlanOptions = {
  framework: "us-nj",
  name: "New Jersey",
  cite: (codes, text) => njs(codes, text),
  plan: PLAN,
  focus: (grade, subject) => FOCUS[`${grade}/${subject}`] ?? [],
  subjects: [...SUBJECTS],
};
