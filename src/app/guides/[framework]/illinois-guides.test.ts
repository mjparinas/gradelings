import { describe, expect, it } from "vitest";
import { guidePath } from "@/components/site/guides";
import { getFramework } from "@/content/frameworks";
import { guidesFor } from "@/content/guides";

// Illinois's guides: the hub, grade notes, the Social and Emotional Learning Standards (revised July 2026) and the
// state tests (the IAR, the Illinois Science Assessment, PreACT and the ACT, and KIDS in kindergarten).
describe("Illinois parent guides", () => {
  const il = getFramework("us-il");
  const g = guidesFor("us-il");

  it("covers the IAR and ISA, and the five SEL goals", () => {
    expect(guidePath.competencies(il)).toBe("/guides/illinois/sel-standards/");
    expect(guidePath.assessment(il)).toBe("/guides/illinois/state-tests/");
    expect(g.assessment.grades).toEqual(["3", "4", "5", "6", "7", "8"]);
    const tests = JSON.stringify(g.assessment);
    for (const name of ["IAR", "Illinois Science Assessment", "PreACT", "KIDS"]) expect(tests).toContain(name);
    expect(tests).not.toMatch(/ATLAS|ACAP|AASA|CAASPP|OSAS|WCAS|Smarter Balanced|MeCAS|STAAR|AK STAR|FAST/);
    expect(g.competencies.items.map((i) => i.name)).toEqual([
      "Self-Awareness",
      "Self-Management",
      "Social Awareness",
      "Relationship Skills",
      "Responsible Decision-Making",
    ]);
    for (const item of g.competencies.items) {
      expect(item.parts.length, item.id).toBeGreaterThan(0);
      expect(item.atHome.length, item.id).toBeGreaterThan(0);
    }
  });

  it("never names another state", () => {
    const text = JSON.stringify(g);
    expect(text).not.toMatch(/Washington|Oregon|California|Maine|Texas|Alaska|Alabama|Arizona|Arkansas|Florida|ALSDE|DESE/);
  });
});
