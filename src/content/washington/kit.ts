import type { Course, GradeId, SubjectId, Unit } from "../types";
import { PLAN } from "./plan";
import { OWN } from "./units";
import { FOCUS } from "./focus";
import { wa } from "./cite";

export { wa };

// Helpers shared by the Washington grade files. A Washington standard cites the official codes from the Washington
// State K–12 Learning Standards ("M.4.Q.NBT.2; M.4.Q.NBT.3", "ELA.4.R.4", "4-PS3-2", "H1.4.2"), then a short plain
// description. washington.test.ts checks every code against docs/research/washington/outcomes.json.
//
// Units are written in the app's house style (Canadian spelling, 10 000) and shown to Washington families in US English
// by src/content/locale.ts, so one unit can serve both countries. Spelling lessons are the exception: Washington writes
// its own, in US spelling.

/** One plan entry: a unit from another framework that Washington uses, the codes it practises and what they say. */
export type Entry = readonly [id: string, kind: "share" | "adopt", codes: string, text: string];

/**
 * One Washington grade. `pool` is the grade's courses from the provinces whose units Washington copies. The plan in
 * ./plan lists, for each course, the units Washington uses: BC units are shared as they are (`share`, which adds the
 * Washington standards to the BC unit), and other provinces' units are copied with Washington standards only (`adopt`),
 * so they never show up for another framework by accident. A copy keeps the original's id and questions, so progress
 * carries over. Washington's own units (`wa-` ids) come from ./units.
 */
export function washingtonGrade(grade: GradeId, pool: Course[][]): Course[] {
  const subjects: SubjectId[] = ["math", "language", "science", "social"];
  return subjects.map((subject) => {
    const entries = PLAN[`${grade}/${subject}`] ?? [];
    const available = pool.flatMap((courses) => courses.filter((c) => c.subject === subject).flatMap((c) => c.units));
    const shares: NonNullable<Course["shares"]> = {};
    const units: Unit[] = [];
    for (const [id, kind, codes, text] of entries) {
      if (kind === "share") {
        shares[id] = { standards: wa(codes, text) };
        continue;
      }
      const unit = available.find((u) => u.id === id);
      if (!unit) throw new Error(`Washington: no unit "${id}" to adopt in ${grade}/${subject}`);
      units.push({ ...unit, standards: wa(codes, text) });
    }
    const own = OWN[subject]?.[grade] ?? [];
    units.push(...own);
    return {
      grade,
      subject,
      bigIdeas: { "us-wa": FOCUS[`${grade}/${subject}`] ?? [] },
      units,
      shares,
      order: { "us-wa": [...entries.map((e) => e[0]), ...own.map((u) => u.id)] },
    };
  });
}
