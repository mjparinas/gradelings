import { describe, expect, it } from "vitest";
import { guidePath } from "@/components/site/guides";
import { getFramework } from "@/content/frameworks";
import { guidesFor } from "@/content/guides";

// Nevada's guides: the hub, grade notes, the eight Standards for Mathematical Practice and the state tests (Smarter
// Balanced, the Nevada Science Assessment and the ACT, with the Read by Grade 3 law).
describe("Nevada parent guides", () => {
  const nv = getFramework("us-nv");
  const g = guidesFor("us-nv");

  it("covers Smarter Balanced, its four levels and the 3rd grade reading law, and the eight Mathematical Practices, which are not graded on their own", () => {
    expect(guidePath.competencies(nv)).toBe("/guides/nevada/math-practices/");
    expect(guidePath.assessment(nv)).toBe("/guides/nevada/state-tests/");
    expect(g.assessment.grades).toEqual(["3", "4", "5", "6", "7", "8"]);
    const tests = JSON.stringify(g.assessment);
    expect(tests).toContain("Smarter Balanced");
    expect(tests).toContain("Nevada Science Assessment");
    expect(tests).toContain("July 1, 2028");
    expect(tests).toMatch(/Level 1 \(Minimal Understanding\), Level 2 \(Partial Understanding\), Level 3 \(Proficient\) and Level 4 \(Advanced\)/);
    expect(tests).not.toMatch(/CAASPP|OSAS|WCAS|MeCAS|STAAR|AK STAR|Milestones|TCAP|LEAP|M-STEP/);
    expect(JSON.stringify(g.competencies)).toMatch(/not graded/);
    expect(g.competencies.items.map((i) => i.name.split(".")[0])).toEqual(["1", "2", "3", "4", "5", "6", "7", "8"]);
  });

  it("never names another state", () => {
    const text = JSON.stringify(g);
    expect(text).not.toMatch(/Washington(?!, D)|Oregon|California|Michigan|Arizona|Utah|Idaho/);
  });
});
