import { describe, expect, it } from "vitest";
import { allGuidePaths, guidePath } from "@/components/site/guides";
import { FRAMEWORKS, getFramework, UPCOMING_FRAMEWORKS } from "@/content/frameworks";
import { GUIDE_FRAMEWORKS, guidesFor } from "@/content/guides";

// Illinois's guides: the hub, grade notes, the Social and Emotional Learning Standards (revised July 2026) and the
// state tests (the IAR, the Illinois Science Assessment, PreACT and the ACT, and KIDS in kindergarten).
describe("Illinois parent guides", () => {
  const il = getFramework("us-il");
  const g = guidesFor("us-il");

  it("is offered, so every Illinois guide page is built", () => {
    expect(FRAMEWORKS).toContain(il);
    expect(UPCOMING_FRAMEWORKS).not.toContain(il);
    expect(GUIDE_FRAMEWORKS).toContain(il);
    const paths = allGuidePaths().map((p) => p.path);
    for (const p of [guidePath.hub(il), guidePath.grade(il, "4"), "/guides/illinois/sel-standards/", "/guides/illinois/state-tests/"]) expect(paths, p).toContain(p);
  });

  it("has a note for every grade and no French guide", () => {
    expect(g.french).toBeUndefined();
    expect(il.grades).toEqual(["k", "1", "2", "3", "4", "5", "6", "7", "8", "9"]);
    for (const grade of il.grades) {
      expect(g.gradeNotes[grade]?.overview, grade).toBeTruthy();
      expect(g.gradeNotes[grade]?.lookFor, grade).toBeTruthy();
    }
  });

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

  it("is written in US English and never names another state", () => {
    const text = JSON.stringify(g);
    expect(text).not.toMatch(/practis|colour|neighbour|favour|centre|behaviour|Grade \d/);
    expect(text).not.toMatch(/Washington|Oregon|California|Maine|Texas|Alaska|Alabama|Arizona|Arkansas|Florida|ALSDE|DESE/);
  });
});
