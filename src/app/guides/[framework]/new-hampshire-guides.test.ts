import { describe, expect, it } from "vitest";
import { guidePath } from "@/components/site/guides";
import { getFramework } from "@/content/frameworks";
import { guidesFor } from "@/content/guides";

// New Hampshire's guides: the hub, grade notes, the eight Standards for Mathematical Practice and the state tests (NH SAS
// and the SAT).
describe("New Hampshire parent guides", () => {
  const nh = getFramework("us-nh");
  const g = guidesFor("us-nh");

  it("covers NH SAS, its four levels and the eight Mathematical Practices, which are not graded on their own", () => {
    expect(guidePath.competencies(nh)).toBe("/guides/new-hampshire/math-practices/");
    expect(guidePath.assessment(nh)).toBe("/guides/new-hampshire/state-tests/");
    expect(g.assessment.grades).toEqual(["3", "4", "5", "6", "7", "8"]);
    const tests = JSON.stringify(g.assessment);
    expect(tests).toContain("New Hampshire Statewide Assessment System");
    expect(tests).toContain("four achievement levels");
    expect(tests).toContain("SAT");
    expect(tests).not.toMatch(/Smarter Balanced|CAASPP|NM-MSSA|NM-ASR|NSCAS|STAAR|MCAS|Milestones|TCAP|LEAP|M-STEP|KAP/);
    expect(JSON.stringify(g.competencies)).toMatch(/not graded/);
    expect(g.competencies.items.map((i) => i.name.split(".")[0])).toEqual(["1", "2", "3", "4", "5", "6", "7", "8"]);
  });

  it("never names another state", () => {
    const text = JSON.stringify(g);
    expect(text).not.toMatch(/Washington(?!, D)|Oregon(?! Trail)|California|Michigan|Arizona|New Mexico|Nevada|Nebraska|Iowa|Massachusetts|Maine|Vermont/);
  });
});
