import { describe, expect, it } from "vitest";
import { guidePath } from "@/components/site/guides";
import { getFramework } from "@/content/frameworks";
import { guidesFor } from "@/content/guides";

// Missouri's guides: the hub, grade notes, the four performance goals of the Show-Me Standards and the state tests (the
// Missouri Assessment Program's Grade-Level and End-of-Course assessments, and reading success plans in kindergarten to 3rd grade).
describe("Missouri parent guides", () => {
  const mo = getFramework("us-mo");
  const g = guidesFor("us-mo");

  it("covers the MAP and reading success plans, and the four Show-Me performance goals", () => {
    expect(guidePath.competencies(mo)).toBe("/guides/missouri/show-me-standards/");
    expect(guidePath.assessment(mo)).toBe("/guides/missouri/state-tests/");
    expect(g.assessment.grades).toEqual(["3", "4", "5", "6", "7", "8"]);
    const tests = JSON.stringify(g.assessment);
    for (const name of ["Missouri Assessment Program", "Grade-Level Assessments", "End-of-Course", "reading success plan", "Below Basic", "Advanced"]) expect(tests).toContain(name);
    expect(tests).not.toMatch(/CMAS|READ Act|IAR|ATLAS|ACAP|AASA|CAASPP|OSAS|WCAS|Smarter Balanced|MeCAS|STAAR|AK STAR|FAST|PreACT|CoAlt|Ohio's State Tests|Third Grade Reading Guarantee/);
    expect(g.competencies.items).toHaveLength(4);
    for (const item of g.competencies.items) {
      expect(item.parts.length, item.id).toBeGreaterThan(0);
      expect(item.atHome.length, item.id).toBeGreaterThan(0);
    }
  });

  it("never names another state", () => {
    const text = JSON.stringify(g);
    expect(text).not.toMatch(/Washington|Oregon|California|Maine|Texas|Alaska|Alabama|Arizona|Arkansas|Florida|Illinois|Colorado|Ohio|ISBE|ALSDE|CDE\b/);
  });
});
