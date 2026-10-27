import { describe, expect, it } from "vitest";
import { guidePath } from "@/components/site/guides";
import { getFramework } from "@/content/frameworks";
import { guidesFor } from "@/content/guides";

// Ohio's guides: the hub, grade notes, Ohio's K-12 Social and Emotional Learning Standards and the state tests (Ohio's
// State Tests, the end-of-course exams, the Kindergarten Readiness Assessment and the Third Grade Reading Guarantee).
describe("Ohio parent guides", () => {
  const oh = getFramework("us-oh");
  const g = guidesFor("us-oh");

  it("covers Ohio's State Tests and the Third Grade Reading Guarantee, and the five SEL competencies", () => {
    expect(guidePath.competencies(oh)).toBe("/guides/ohio/sel-standards/");
    expect(guidePath.assessment(oh)).toBe("/guides/ohio/state-tests/");
    expect(g.assessment.grades).toEqual(["3", "4", "5", "6", "7", "8"]);
    const tests = JSON.stringify(g.assessment);
    for (const name of ["Ohio's State Tests", "Third Grade Reading Guarantee", "end-of-course", "Kindergarten Readiness Assessment", "Limited", "Accomplished"]) expect(tests).toContain(name);
    expect(tests).not.toMatch(/CMAS|READ Act|IAR|ATLAS|ACAP|AASA|CAASPP|OSAS|WCAS|Smarter Balanced|MeCAS|STAAR|AK STAR|FAST|PreACT|CoAlt/);
    expect(g.competencies.items).toHaveLength(5);
    for (const item of g.competencies.items) {
      expect(item.parts.length, item.id).toBeGreaterThan(0);
      expect(item.atHome.length, item.id).toBeGreaterThan(0);
    }
  });

  it("never names another state", () => {
    const text = JSON.stringify(g);
    expect(text).not.toMatch(/Washington|Oregon|California|Maine|Texas|Alaska|Alabama|Arizona|Arkansas|Florida|Illinois|Colorado|ISBE|ALSDE|DESE|CDE\b/);
  });
});
