import { describe, expect, it } from "vitest";
import { guidePath } from "@/components/site/guides";
import { getFramework } from "@/content/frameworks";
import { guidesFor } from "@/content/guides";

// Colorado's guides: the hub, grade notes, the Colorado Essential Skills and the state tests (CMAS, the PSAT and SAT,
// CoAlt, and the READ Act's reading checks).
describe("Colorado parent guides", () => {
  const co = getFramework("us-co");
  const g = guidesFor("us-co");

  it("covers CMAS and the READ Act, and the four groups of Essential Skills", () => {
    expect(guidePath.competencies(co)).toBe("/guides/colorado/essential-skills/");
    expect(guidePath.assessment(co)).toBe("/guides/colorado/state-tests/");
    expect(g.assessment.grades).toEqual(["3", "4", "5", "6", "7", "8"]);
    const tests = JSON.stringify(g.assessment);
    for (const name of ["CMAS", "READ Act", "PSAT", "SAT", "CoAlt"]) expect(tests).toContain(name);
    expect(tests).not.toMatch(/IAR|ATLAS|ACAP|AASA|CAASPP|OSAS|WCAS|Smarter Balanced|MeCAS|STAAR|AK STAR|FAST|PreACT/);
    expect(g.competencies.items.map((i) => i.name)).toEqual(["Communicators", "Problem Solvers", "Community Members", "Empowered Individuals"]);
    for (const item of g.competencies.items) {
      expect(item.parts.length, item.id).toBeGreaterThan(0);
      expect(item.atHome.length, item.id).toBeGreaterThan(0);
    }
  });

  it("never names another state", () => {
    const text = JSON.stringify(g);
    expect(text).not.toMatch(/Washington|Oregon|California|Maine|Texas|Alaska|Alabama|Arizona|Arkansas|Florida|Illinois|ISBE|ALSDE|DESE/);
  });
});
