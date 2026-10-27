import { describe, expect, it } from "vitest";
import { guidePath } from "@/components/site/guides";
import { getFramework } from "@/content/frameworks";
import { guidesFor } from "@/content/guides";

// Maryland's guides: the hub, grade notes, the learning practices and the state tests (MCAP).
describe("Maryland parent guides", () => {
  const md = getFramework("us-md");
  const g = guidesFor("us-md");

  it("covers MCAP and the learning practices", () => {
    expect(guidePath.competencies(md)).toBe("/guides/maryland/learning-practices/");
    expect(guidePath.assessment(md)).toBe("/guides/maryland/state-tests/");
    expect(g.assessment.grades).toEqual(["3", "4", "5", "6", "7", "8"]);
    const tests = JSON.stringify(g.assessment);
    expect(tests).toContain("MCAP");
    expect(tests).toContain("Kindergarten Readiness Assessment");
    expect(tests).toMatch(/social studies in grade 8/);
    expect(tests).not.toMatch(/ATLAS|ACAP|AASA|CAASPP|OSAS|WCAS|Smarter Balanced|MeCAS|STAAR|AK STAR|FAST|PSSA|CMAS|IAR|Milestones|ILEARN|NJSLA/);
    expect(g.competencies.items).toHaveLength(4);
    for (const item of g.competencies.items) {
      expect(item.parts.length, item.id).toBeGreaterThan(0);
      expect(item.atHome.length, item.id).toBeGreaterThan(0);
    }
  });

  it("never names another state", () => {
    const text = JSON.stringify(g);
    expect(text.replace(/George Washington|Washington, D\.C\./g, "")).not.toMatch(
      /Washington|Oregon|California|Maine|Texas|Alaska|Alabama|Arizona|Arkansas|Florida|Colorado|Illinois|Pennsylvania|Minnesota|Georgia|Ohio|New Jersey|Indiana/,
    );
  });
});
