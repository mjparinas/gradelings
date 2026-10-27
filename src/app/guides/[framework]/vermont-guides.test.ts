import { describe, expect, it } from "vitest";
import { guidePath } from "@/components/site/guides";
import { getFramework } from "@/content/frameworks";
import { guidesFor } from "@/content/guides";

// Vermont's guides: the hub, grade notes, the eight Standards for Mathematical Practice and the state tests (VTCAP).
describe("Vermont parent guides", () => {
  const vt = getFramework("us-vt");
  const g = guidesFor("us-vt");

  it("covers VTCAP, its four levels and the eight Mathematical Practices, which are not graded on their own", () => {
    expect(guidePath.competencies(vt)).toBe("/guides/vermont/math-practices/");
    expect(guidePath.assessment(vt)).toBe("/guides/vermont/vtcap-tests/");
    expect(g.assessment.grades).toEqual(["3", "4", "5", "6", "7", "8", "9"]);
    const tests = JSON.stringify(g.assessment);
    expect(tests).toContain("Vermont Comprehensive Assessment Program");
    expect(tests).toContain("four performance levels");
    expect(tests).toContain("1500 to 2000");
    expect(tests).not.toMatch(/Smarter Balanced|CAASPP|NH SAS|NSCAS|STAAR|MCAS|Milestones|TCAP(?!\b)|LEAP|M-STEP|KAP|RICAS|MAST/);
    expect(JSON.stringify(g.competencies)).toMatch(/not graded/);
    expect(g.competencies.items.map((i) => i.name.split(".")[0])).toEqual(["1", "2", "3", "4", "5", "6", "7", "8"]);
  });

  it("never names another state", () => {
    const text = JSON.stringify(g);
    expect(text).not.toMatch(/Washington(?!, D)|Oregon(?! Trail)|California|Michigan|Arizona|New Mexico|Nevada|Nebraska|Iowa|Massachusetts|Maine|New Hampshire|New York/);
  });
});
