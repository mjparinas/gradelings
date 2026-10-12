import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { COURSES } from "../all";
import { getFramework } from "../frameworks";
import { GUIDES } from "../guides";
import type { GradeId } from "../types";

// The key-stage outcomes of the Atlantic Canada foundation documents (docs/research/newfoundland-and-labrador/README.md).
const OUTCOMES = JSON.parse(readFileSync(join(__dirname, "../../../docs/research/newfoundland-and-labrador/outcomes.json"), "utf8")) as Record<
  string,
  { idx: string; stage: number; outcomes: string[] }[]
>;

const KEY_STAGE: Record<GradeId, number> = { k: 3, "1": 3, "2": 3, "3": 3, "4": 6, "5": 6, "6": 6, "7": 9, "8": 9, "9": 9 };
const GRADES: GradeId[] = ["k", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const nl = (grade: GradeId, subject: string) => COURSES.find((c) => c.grade === grade && c.subject === subject)?.units.filter((u) => u.standards["ca-nl"]) ?? [];

describe("Newfoundland and Labrador", () => {
  it("is selectable and reports on the provincial ratings in Kindergarten to Grade 6, then on percentage marks", () => {
    const f = getFramework("newfoundland-and-labrador");
    expect(f.id).toBe("ca-nl");
    expect(f.scoringFor("3").levels.map((l) => l.label)).toEqual(["Not Yet Achieving", "Approaching", "Good", "Excellent"]);
    expect(f.scoringFor("3").levels.map((l) => l.marks)).toEqual(["1", "2", "3", "4"]);
    expect(f.scoringFor("k").id).toBe("nl-k6");
    expect(f.scoringFor("7").id).toBe("nl-79");
    expect(f.scoringFor("9").levels.map((l) => l.kidLabel)).toEqual(["Seedling", "Sprout", "Tree", "Star"]);
  });

  it("covers every grade in math, language, science and social studies", () => {
    for (const g of GRADES) for (const s of ["math", "language", "science", "social"]) expect(nl(g, s).length, `${g}/${s}`).toBeGreaterThanOrEqual(3);
  });

  it("offers Core French in Grades 4 to 9 and no French Immersion", () => {
    for (const g of GRADES) {
      expect(nl(g, "core-french").length > 0, `core-french ${g}`).toBe(Number(g) >= 4);
      expect(nl(g, "immersion").length, `immersion ${g}`).toBe(0);
    }
  });

  it("cites the key stage the grade belongs to, and only real strands", () => {
    for (const c of COURSES) {
      for (const u of c.units) {
        const standard = u.standards["ca-nl"];
        if (!standard) continue;
        const rows = OUTCOMES[`${c.grade}/${c.subject}`];
        expect(rows, `${c.grade}/${c.subject}`).toBeDefined();
        for (const label of standard.split(" · ")[0].split("; ")) {
          const row = rows.find((r) => r.idx === label);
          expect(row, `${u.id} cites "${label}"`).toBeDefined();
          expect(row!.stage, `${u.id} in Grade ${c.grade}`).toBe(KEY_STAGE[c.grade]);
          expect(row!.outcomes.length).toBeGreaterThan(0);
        }
      }
    }
  });

  it("has a learning focus (a list of strands) for every course", () => {
    for (const g of GRADES) {
      for (const s of ["math", "language", "science", "social"]) {
        const course = COURSES.find((c) => c.grade === g && c.subject === s)!;
        expect(course.bigIdeas["ca-nl"]?.length, `${g}/${s}`).toBeGreaterThan(0);
      }
    }
  });

  it("adds the Newfoundland and Labrador-only units for Newfoundland and Labrador alone", () => {
    const own = COURSES.flatMap((c) => c.units.filter((u) => u.id.startsWith("nl-")).map((u) => ({ g: c.grade, u })));
    expect(own.map((o) => o.u.id).sort()).toEqual(
      ["nl-agreements-9", "nl-confederation-8", "nl-explorers-5", "nl-fishery-5", "nl-government-6", "nl-peoples-4", "nl-province-3", "nl-resources-7"].sort(),
    );
    for (const { g, u } of own) expect(Object.keys(u.standards), `${g}/${u.id}`).toEqual(["ca-nl"]);
  });

  it("has parent guides for French, the Essential Graduation Learnings and the provincial assessments", () => {
    const guides = GUIDES["ca-nl"]!;
    expect(guides.competencies.slug).toBe("graduation-learnings");
    expect(guides.competencies.items.map((i) => i.id)).toHaveLength(6);
    expect(guides.assessment.grades).toEqual(["3", "6"]);
    expect(guides.french?.browse).toEqual(["4"]);
    for (const g of GRADES) expect(guides.gradeNotes[g], g).toBeDefined();
  });
});
