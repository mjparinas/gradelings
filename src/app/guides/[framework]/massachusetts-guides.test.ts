import { describe, expect, it } from "vitest";
import { guidePath } from "@/components/site/guides";
import { getFramework } from "@/content/frameworks";
import { guidesFor } from "@/content/guides";

// Massachusetts's guides: the hub, grade notes, the learning practices built into the curriculum frameworks (math, literacy,
// science and engineering, history and social science) and MCAS.
describe("Massachusetts parent guides", () => {
  const ma = getFramework("us-ma");
  const g = guidesFor("us-ma");

  it("covers MCAS, its four achievement levels and the 2024 graduation change, and four sets of practices", () => {
    expect(guidePath.competencies(ma)).toBe("/guides/massachusetts/learning-practices/");
    expect(guidePath.assessment(ma)).toBe("/guides/massachusetts/state-tests/");
    expect(g.assessment.grades).toEqual(["3", "4", "5", "6", "7", "8"]);
    const tests = JSON.stringify(g.assessment);
    for (const name of ["MCAS", "MCAS-Alt", "Question 2", "Exceeding Expectations", "Not Meeting Expectations"]) expect(tests).toContain(name);
    expect(tests).not.toMatch(/CMAS|READ Act|IAR|ATLAS|ACAP|AASA|CAASPP|OSAS|WCAS|Smarter Balanced|MeCAS|STAAR|AK STAR|FAST|PreACT|CoAlt|PSSA|Milestones/);
    expect(g.competencies.items).toHaveLength(4);
    for (const item of g.competencies.items) {
      expect(item.parts.length, item.id).toBeGreaterThan(0);
      expect(item.atHome.length, item.id).toBeGreaterThan(0);
    }
  });

  it("never names another state", () => {
    const text = JSON.stringify(g);
    expect(text).not.toMatch(/Washington(?!, D\.C\.)|Oregon|California|Texas|Alaska|Alabama|Arizona|Arkansas|Florida|Illinois|Colorado|Ohio|Georgia|Pennsylvania|ISBE|ALSDE|CDE\b/);
  });
});
