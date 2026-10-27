import { describe, expect, it } from "vitest";
import { guidePath } from "@/components/site/guides";
import { getFramework } from "@/content/frameworks";
import { guidesFor } from "@/content/guides";

// Florida's guides: the hub, grade notes, the thinking and reasoning standards built into B.E.S.T. and the Next
// Generation Sunshine State Standards, and the state tests (FAST, the science test and end-of-course exams).
describe("Florida parent guides", () => {
  const fl = getFramework("us-fl");
  const g = guidesFor("us-fl");

  it("covers FAST and the 3rd grade reading rule, and four thinking standards", () => {
    expect(guidePath.competencies(fl)).toBe("/guides/florida/thinking-standards/");
    expect(guidePath.assessment(fl)).toBe("/guides/florida/state-tests/");
    expect(g.assessment.grades).toEqual(["3", "4", "5", "6", "7", "8", "9"]);
    const tests = JSON.stringify(g.assessment);
    expect(tests).toContain("FAST");
    expect(tests).toContain("1008.25");
    expect(tests).toMatch(/end-of-course/);
    expect(tests).not.toMatch(/ATLAS|ACAP|AASA|CAASPP|OSAS|WCAS|Smarter Balanced|MeCAS|STAAR|AK STAR/);
    expect(g.competencies.items).toHaveLength(4);
    for (const item of g.competencies.items) {
      expect(item.parts.length, item.id).toBeGreaterThan(0);
      expect(item.atHome.length, item.id).toBeGreaterThan(0);
    }
  });

  it("never names another state", () => {
    const text = JSON.stringify(g);
    expect(text).not.toMatch(/Washington|Oregon|California|Maine|Texas|Alaska|Alabama|Arizona|Arkansas|ALSDE|DESE/);
  });
});
