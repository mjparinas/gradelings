import { describe, expect, it } from "vitest";
import { COURSES } from "../all";
import { getFramework } from "../frameworks";
import { GUIDES } from "../guides";
import { GRADE_ORDER as GRADES } from "../subjects";

// Citations, own units, the plan and borrowed units' wording are checked by the framework contract
// (src/content/contract.test.ts, with ./contract.ts). This file keeps what is Newfoundland and Labrador's alone.

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

  it("adds the Newfoundland and Labrador-only units for Newfoundland and Labrador alone", () => {
    const own = COURSES.flatMap((c) => c.units.filter((u) => u.id.startsWith("nl-")).map((u) => ({ g: c.grade, u })));
    expect(own.map((o) => o.u.id).sort()).toEqual(
      ["nl-agreements-9", "nl-confederation-8", "nl-economy-8", "nl-erosion-4", "nl-exploration-4", "nl-exploration-tools-4", "nl-explorers-4", "nl-explorers-5", "nl-fishery-5", "nl-government-6", "nl-peoples-4", "nl-province-3", "nl-resources-7", "nl-rocks-minerals-4"].sort(),
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
