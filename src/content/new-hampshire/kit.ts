import type { Course, GradeId, SubjectId } from "../types";
import { planGrade, type OwnUnits, type PlanOptions, type Pool } from "../placement";
import { PLAN } from "./plan";
import { FOCUS } from "./focus";
import { nhs } from "./cite";

export { nhs };

// Helpers shared by the New Hampshire grade files. A New Hampshire standard cites New Hampshire's standards
// (mathematics and English language arts 2010, the College and Career Ready Standards, which are the Common Core;
// science 2016, the College and Career Ready Science Standards, which are the NGSS; social studies, the K-12 Social
// Studies New Hampshire Curriculum Framework of 2006), then a short plain description. The contract suite checks every
// citation against docs/research/new-hampshire/outcomes.json.
//
// Most New Hampshire units are shared: BC units as they are (`share`), and the other US states' and the provinces'
// units copied with New Hampshire standards (`adopt`). Math, English language arts and science follow Michigan's (and
// so California's) placement, because these states teach the Common Core and the Next Generation Science Standards with
// one Grades 6-8 science band. Social studies follows the order of New Hampshire's grade spans. Units are shown to New
// Hampshire families in US English by src/content/locale.ts. New Hampshire's own units (`nh-` ids) come from the grade's
// own file in ./units (own-g4.ts and so on).

/** One plan entry: a unit from another framework that New Hampshire uses, the standards it practises and what they say. */
export type Entry = readonly [id: string, kind: "share" | "adopt", codes: string, text: string];

/**
 * One New Hampshire grade. `pool` is, per subject, the unit files New Hampshire copies from in this grade (listed in each grade
 * file, so its download carries only those files). A copy keeps the original's id and questions, so progress carries over.
 */
export function newHampshireGrade(grade: GradeId, pool: Pool, own: Partial<Record<SubjectId, OwnUnits>>): Course[] {
  return planGrade(OPTIONS, grade, pool, own);
}

const SUBJECTS = ["math", "language", "science", "social"] as const;

const OPTIONS: PlanOptions = {
  framework: "us-nh",
  name: "New Hampshire",
  cite: (codes, text) => nhs(codes, text),
  plan: PLAN,
  focus: (grade, subject) => FOCUS[`${grade}/${subject}`] ?? [],
  subjects: [...SUBJECTS],
};
