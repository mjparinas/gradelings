import { describe, expect, it } from "vitest";
import { guidePath } from "@/components/site/guides";
import { getFramework } from "@/content/frameworks";
import { guidesFor } from "@/content/guides";

// Indiana's guides: the hub, grade notes, the process standards and the state tests (ILEARN and IREAD).
describe("Indiana parent guides", () => {
  const ind = getFramework("us-in");
  const g = guidesFor("us-in");

  it("covers ILEARN and IREAD and the process standards", () => {
    expect(guidePath.competencies(ind)).toBe("/guides/indiana/process-standards/");
    expect(guidePath.assessment(ind)).toBe("/guides/indiana/state-tests/");
    expect(g.assessment.grades).toEqual(["2", "3", "4", "5", "6", "7", "8"]);
    const tests = JSON.stringify(g.assessment);
    expect(tests).toContain("ILEARN");
    expect(tests).toContain("IREAD");
    expect(tests).toMatch(/social studies in grade 5/);
    expect(tests).not.toMatch(/ATLAS|ACAP|AASA|CAASPP|OSAS|WCAS|Smarter Balanced|MeCAS|STAAR|AK STAR|FAST|PSSA|CMAS|IAR|Milestones/);
    expect(g.competencies.items).toHaveLength(4);
    for (const item of g.competencies.items) {
      expect(item.parts.length, item.id).toBeGreaterThan(0);
      expect(item.atHome.length, item.id).toBeGreaterThan(0);
    }
  });

  it("never names another state", () => {
    const text = JSON.stringify(g);
    expect(text.replace(/George Washington/g, "")).not.toMatch(/Washington|Oregon|California|Maine|Texas|Alaska|Alabama|Arizona|Arkansas|Florida|Colorado|Illinois|Pennsylvania|Minnesota|Georgia/);
  });
});
