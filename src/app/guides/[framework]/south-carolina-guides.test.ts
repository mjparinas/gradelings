import { describe, expect, it } from "vitest";
import { guidePath } from "@/components/site/guides";
import { getFramework } from "@/content/frameworks";
import { guidesFor } from "@/content/guides";

// South Carolina's guides: the hub, grade notes, the Profile of the South Carolina Graduate and the state tests (SC READY
// and SCPASS).
describe("South Carolina parent guides", () => {
  const sc = getFramework("us-sc");
  const g = guidesFor("us-sc");

  it("covers SC READY and SCPASS and the Profile of the South Carolina Graduate", () => {
    expect(guidePath.competencies(sc)).toBe("/guides/south-carolina/graduate-profile/");
    expect(guidePath.assessment(sc)).toBe("/guides/south-carolina/state-tests/");
    expect(g.assessment.grades).toEqual(["3", "4", "5", "6", "7", "8", "9"]);
    const tests = JSON.stringify(g.assessment);
    expect(tests).toContain("SC READY");
    expect(tests).toContain("SCPASS");
    expect(tests).not.toMatch(/ATLAS|ACAP|AASA|CAASPP|OSAS|WCAS|Smarter Balanced|MeCAS|STAAR|AK STAR|FAST|PSSA|CMAS|IAR|Milestones|ILEARN|NJSLA/);
    expect(g.competencies.items).toHaveLength(3);
    for (const item of g.competencies.items) {
      expect(item.parts.length, item.id).toBeGreaterThan(0);
      expect(item.atHome.length, item.id).toBeGreaterThan(0);
    }
  });

  it("never names another state", () => {
    const text = JSON.stringify(g);
    expect(text.replace(/George Washington/g, "")).not.toMatch(/Washington|Oregon|California|Maine|Texas|Alaska|Alabama|Arizona|Arkansas|Florida|Colorado|Illinois|Pennsylvania|Minnesota|Georgia|Indiana|North Carolina/);
  });
});
