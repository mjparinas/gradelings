import { describe, expect, it } from "vitest";
import { guidePath } from "@/components/site/guides";
import { getFramework } from "@/content/frameworks";
import { guidesFor } from "@/content/guides";

// Pennsylvania's guides: the hub, grade notes, the Career Ready Skills and the state tests (the PSSA and the Keystone Exams).
describe("Pennsylvania parent guides", () => {
  const pa = getFramework("us-pa");
  const g = guidesFor("us-pa");

  it("covers the PSSA and the Keystone Exams, and three Career Ready Skills", () => {
    expect(guidePath.competencies(pa)).toBe("/guides/pennsylvania/career-ready-skills/");
    expect(guidePath.assessment(pa)).toBe("/guides/pennsylvania/state-tests/");
    expect(g.assessment.grades).toEqual(["3", "4", "5", "6", "7", "8", "9"]);
    const tests = JSON.stringify(g.assessment);
    expect(tests).toContain("PSSA");
    expect(tests).toContain("Keystone");
    expect(tests).toMatch(/grades 5 and 8/);
    expect(tests).not.toMatch(/ATLAS|ACAP|AASA|CAASPP|OSAS|WCAS|Smarter Balanced|MeCAS|STAAR|AK STAR|FAST/);
    expect(g.competencies.items).toHaveLength(3);
    for (const item of g.competencies.items) {
      expect(item.parts.length, item.id).toBeGreaterThan(0);
      expect(item.atHome.length, item.id).toBeGreaterThan(0);
    }
  });

  it("never names another state", () => {
    const text = JSON.stringify(g);
    expect(text).not.toMatch(/Washington|Oregon|California|Maine|Texas|Alaska|Alabama|Arizona|Arkansas|Florida|ALSDE|DESE|FLDOE/);
  });
});
