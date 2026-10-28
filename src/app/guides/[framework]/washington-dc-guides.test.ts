import { describe, expect, it } from "vitest";
import { guidePath } from "@/components/site/guides";
import { getFramework } from "@/content/frameworks";
import { guidesFor } from "@/content/guides";

// Washington, DC's guides: the hub, grade notes, the eight Standards for Mathematical Practice and the District's
// statewide tests (DC CAPE).
describe("Washington, DC parent guides", () => {
  const dc = getFramework("us-dc");
  const g = guidesFor("us-dc");

  it("covers DC CAPE, its five levels and the eight Mathematical Practices, which are not graded on their own", () => {
    expect(guidePath.competencies(dc)).toBe("/guides/washington-dc/math-practices/");
    expect(guidePath.assessment(dc)).toBe("/guides/washington-dc/dc-cape-tests/");
    expect(g.assessment.grades).toEqual(["3", "4", "5", "6", "7", "8", "9"]);
    const tests = JSON.stringify(g.assessment);
    expect(tests).toContain("DC Comprehensive Assessments of Progress in Education");
    expect(tests).toContain("five performance levels");
    expect(tests).toContain("650 to 850");
    expect(tests).not.toMatch(/Smarter Balanced|CAASPP|VTCAP|NSCAS|STAAR|MCAS|Milestones|LEAP|M-STEP|RICAS|MCAP/);
    expect(JSON.stringify(g.competencies)).toMatch(/not graded/);
    expect(g.competencies.items.map((i) => i.name.split(".")[0])).toEqual(["1", "2", "3", "4", "5", "6", "7", "8"]);
  });

  it("never names a state as if the District were one", () => {
    const text = JSON.stringify(g);
    expect(text).not.toMatch(/Vermont|Oregon(?! Trail)|California|Michigan|Arizona|Maryland|Virginia|New York|our state|the state's/);
  });
});
