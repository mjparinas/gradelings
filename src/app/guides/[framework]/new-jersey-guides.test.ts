import { describe, expect, it } from "vitest";
import { guidePath } from "@/components/site/guides";
import { getFramework } from "@/content/frameworks";
import { guidesFor } from "@/content/guides";

// New Jersey's guides: the hub, grade notes, the Life Literacies and Key Skills standards (NJSLS-CLKS 9.4) and the
// state tests (the NJSLA-Adaptive, NJSLA-Science and the NJGPA-Adaptive graduation test).
describe("New Jersey parent guides", () => {
  const nj = getFramework("us-nj");
  const g = guidesFor("us-nj");

  it("covers the NJSLA and the six Life Literacies and Key Skills", () => {
    expect(guidePath.competencies(nj)).toBe("/guides/new-jersey/life-literacies/");
    expect(guidePath.assessment(nj)).toBe("/guides/new-jersey/state-tests/");
    expect(g.assessment.grades).toEqual(["3", "4", "5", "6", "7", "8", "9"]);
    const tests = JSON.stringify(g.assessment);
    for (const name of ["NJSLA", "adaptive", "NJSLA-Science", "Graduation Proficiency Assessment", "Dynamic Learning Maps"]) expect(tests).toContain(name);
    expect(tests).not.toMatch(/IAR|ATLAS|ACAP|AASA|CAASPP|OSAS|WCAS|Smarter Balanced|MeCAS|STAAR|AK STAR|FAST|PSSA|CMAS|Milestones/);
    expect(g.competencies.items.map((i) => i.name)).toEqual([
      "Creativity and Innovation",
      "Critical Thinking and Problem-Solving",
      "Digital Citizenship",
      "Global and Cultural Awareness",
      "Information and Media Literacy",
      "Technology Literacy",
    ]);
    for (const item of g.competencies.items) {
      expect(item.parts.length, item.id).toBeGreaterThan(0);
      expect(item.atHome.length, item.id).toBeGreaterThan(0);
    }
  });

  it("never names another state", () => {
    const text = JSON.stringify(g);
    expect(text).not.toMatch(/Washington|Oregon|California|Maine|Texas|Alaska|Alabama|Arizona|Arkansas|Florida|Illinois|Colorado|Pennsylvania|Georgia/);
  });
});
