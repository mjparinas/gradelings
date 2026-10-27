import { describe, expect, it } from "vitest";
import { guidePath } from "@/components/site/guides";
import { getFramework } from "@/content/frameworks";
import { guidesFor } from "@/content/guides";

// Mississippi's guides: the hub, grade notes, the eight Standards for Mathematical Practice and the MAAP tests (with the
// Literacy-Based Promotion Act's 3rd grade reading requirement).
describe("Mississippi parent guides", () => {
  const ms = getFramework("us-ms");
  const g = guidesFor("us-ms");

  it("covers MAAP, its five levels and the 3rd grade reading requirement, and the eight Mathematical Practices, which are not graded on their own", () => {
    expect(guidePath.competencies(ms)).toBe("/guides/mississippi/math-practices/");
    expect(guidePath.assessment(ms)).toBe("/guides/mississippi/maap-tests/");
    expect(g.assessment.grades).toEqual(["3", "4", "5", "6", "7", "8"]);
    const tests = JSON.stringify(g.assessment);
    expect(tests).toContain("Mississippi Academic Assessment Program");
    expect(tests).toContain("Literacy-Based Promotion Act");
    expect(tests).toMatch(/Level 1 \(Minimal\), Level 2 \(Basic\), Level 3 \(Passing\), Level 4 \(Proficient\) and Level 5 \(Advanced\)/);
    expect(tests).not.toMatch(/Smarter Balanced|CAASPP|OSAS|WCAS|MeCAS|STAAR|AK STAR|Milestones|TCAP|LEAP|M-STEP|ACAP/);
    expect(JSON.stringify(g.competencies)).toMatch(/not graded/);
    expect(g.competencies.items.map((i) => i.name.split(".")[0])).toEqual(["1", "2", "3", "4", "5", "6", "7", "8"]);
  });

  it("never names another state", () => {
    const text = JSON.stringify(g);
    expect(text).not.toMatch(/Washington(?!, D)|Oregon|California|Nevada|Alabama|Louisiana|Tennessee|Arkansas/);
  });
});
