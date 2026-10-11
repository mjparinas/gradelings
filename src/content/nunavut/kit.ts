import type { Course, GradeId, SubjectId, Unit } from "../types";
import { PLAN } from "./plan";
import { overall } from "./overall";

// Helpers shared by the Nunavut grade files. Nunavut has no outcome codes of its own: its approved curriculum is a mix of
// guides adopted from Alberta and the NWT plus Nunavut-made resources. A standard cites the approved guide and its strand
// ("Alberta Mathematics K–9 (2007), Number"), which content.test.ts checks against docs/research/nunavut/approved.json.

/** Standards text for a unit: the approved guide and strand, then a short plain description. */
export function nu(citation: string, text: string): Unit["standards"] {
  return { "ca-nu": `${citation} · ${text}` };
}

/** Units written for Nunavut, with the order they sit in (own units are listed after the adopted ones unless `order` says otherwise). */
export interface OwnUnits {
  units: Unit[];
  order?: string[];
}

/**
 * One Nunavut grade. `pool` is the grade's courses from the provinces whose units Nunavut adopts (Manitoba, Alberta, Ontario
 * and Saskatchewan). The plan in ./plan.ts lists, for each course, the units Nunavut uses and the guide each one practises:
 * BC units are shared as they are, and the rest are copied with Nunavut standards only, so they never show up for another
 * province by accident. A copy keeps the original's id and questions.
 */
export function nunavutGrade(grade: GradeId, pool: Course[][], own: Partial<Record<SubjectId, OwnUnits>> = {}): Course[] {
  const subjects = new Set<string>([...Object.keys(PLAN).filter((k) => k.startsWith(`${grade}/`)).map((k) => k.split("/")[1]), ...Object.keys(own)]);
  return [...subjects].map((subject) => {
    const entries = PLAN[`${grade}/${subject}`] ?? [];
    const available = pool.flatMap((courses) => courses.find((c) => c.subject === subject)?.units ?? []);
    const shares: NonNullable<Course["shares"]> = {};
    const units: Unit[] = [];
    for (const [id, kind, citation, text] of entries) {
      if (kind === "share") {
        shares[id] = { standards: nu(citation, text) };
        continue;
      }
      const unit = available.find((u) => u.id === id);
      if (!unit) throw new Error(`Nunavut: no unit "${id}" to adopt in ${grade}/${subject}`);
      units.push({ ...unit, standards: nu(citation, text) });
    }
    const mine = own[subject as SubjectId];
    units.push(...(mine?.units ?? []));
    return {
      grade,
      subject: subject as SubjectId,
      bigIdeas: { "ca-nu": overall(grade, subject as SubjectId) },
      units,
      shares,
      order: { "ca-nu": mine?.order ?? [...(mine?.units ?? []).map((u) => u.id), ...entries.map((e) => e[0])] },
    };
  });
}
