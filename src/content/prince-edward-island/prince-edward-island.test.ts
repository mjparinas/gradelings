import { describe, expect, it } from "vitest";
import { COURSES } from "../all";
import { getFramework } from "../frameworks";
import { GUIDES } from "../guides";
import { GRADE_ORDER as GRADES } from "../subjects";

// Citations, own units, the plan and borrowed units' wording are checked by the framework contract
// (src/content/contract.test.ts, with ./contract.ts). This file keeps what is Prince Edward Island's alone.

describe("Prince Edward Island", () => {
  it("is selectable and reports on four plain practice steps", () => {
    const f = getFramework("prince-edward-island");
    expect(f.id).toBe("ca-pe");
    expect(f.scoringFor("4").levels.map((l) => l.label)).toEqual(["Beginning", "Approaching", "Meeting", "Exceeding"]);
    expect(f.scoringFor("4").source).toMatch(/not a Prince Edward Island/);
    expect(f.scoringFor("9").levels.map((l) => l.kidLabel)).toEqual(["Seedling", "Sprout", "Tree", "Star"]);
  });

  it("adds the Prince Edward Island-only units for Prince Edward Island alone", () => {
    const own = COURSES.flatMap((c) => c.units.filter((u) => u.id.startsWith("pe-")).map((u) => ({ g: c.grade, u })));
    expect(own.length).toBeGreaterThan(10);
    // Nunavut, New York, Minnesota, Alabama, Arizona and Arkansas may copy a unit that names no province (src/content/nunavut/plan.ts,
    // src/content/new-york/plan/); a copy in the same grade merges into one unit carrying both sets of standards.
    for (const { g, u } of own) for (const f of Object.keys(u.standards)) expect(["ca-pe", "ca-nu", "us-ny", "us-mn", "us-al", "us-az", "us-ar", "us-fl"], `${g}/${u.id}`).toContain(f);
    expect(own.filter(({ u }) => u.standards["ca-pe"]).length).toBeGreaterThan(10);
  });

  it("has parent guides for French, the CAMET competencies and the provincial assessments", () => {
    const guides = GUIDES["ca-pe"]!;
    expect(guides.competencies.slug).toBe("camet-competencies");
    expect(guides.competencies.items).toHaveLength(6);
    expect(guides.assessment.grades).toEqual(["3", "6"]);
    expect(guides.french?.browse).toEqual(["4"]);
    for (const g of GRADES) expect(guides.gradeNotes[g], g).toBeDefined();
  });
});
