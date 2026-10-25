import { describe, expect, it } from "vitest";
import { allGuidePaths, guidePath } from "@/components/site/guides";
import { FRAMEWORKS, getFramework, UPCOMING_FRAMEWORKS } from "@/content/frameworks";
import { GUIDE_FRAMEWORKS, guidesFor } from "@/content/guides";

// Virginia's guides: the hub, grade notes, the 5 C's of the Profile of a Virginia Graduate and the state tests (SOL).
describe("Virginia parent guides", () => {
  const va = getFramework("us-va");
  const g = guidesFor("us-va");

  it("is offered, so every Virginia guide page is built", () => {
    expect(FRAMEWORKS).toContain(va);
    expect(UPCOMING_FRAMEWORKS).not.toContain(va);
    expect(GUIDE_FRAMEWORKS).toContain(va);
    const paths = allGuidePaths().map((p) => p.path);
    for (const p of [guidePath.hub(va), guidePath.grade(va, "4"), "/guides/virginia/5-cs/", "/guides/virginia/state-tests/"]) expect(paths, p).toContain(p);
  });

  it("has a note for every grade and no French guide", () => {
    expect(g.french).toBeUndefined();
    expect(va.grades).toEqual(["k", "1", "2", "3", "4", "5", "6", "7", "8", "9"]);
    for (const grade of va.grades) {
      expect(g.gradeNotes[grade]?.overview, grade).toBeTruthy();
      expect(g.gradeNotes[grade]?.lookFor, grade).toBeTruthy();
    }
  });

  it("covers the SOL tests and the 5 C's", () => {
    expect(guidePath.competencies(va)).toBe("/guides/virginia/5-cs/");
    expect(guidePath.assessment(va)).toBe("/guides/virginia/state-tests/");
    expect(g.assessment.grades).toEqual(["3", "4", "5", "6", "7", "8"]);
    const tests = JSON.stringify(g.assessment);
    expect(tests).toContain("Standards of Learning");
    expect(tests).toContain("Literacy Act");
    expect(tests).not.toMatch(/ATLAS|ACAP|AASA|CAASPP|OSAS|WCAS|Smarter Balanced|MeCAS|STAAR|AK STAR|FAST|PSSA|CMAS|IAR|Milestones/);
    expect(g.competencies.items.map((i) => i.id)).toEqual(["critical-thinking", "creative-thinking", "collaboration", "communication", "citizenship"]);
    for (const item of g.competencies.items) {
      expect(item.parts.length, item.id).toBeGreaterThan(0);
      expect(item.atHome.length, item.id).toBeGreaterThan(0);
    }
  });

  it("is written in US English and never names another state", () => {
    const text = JSON.stringify(g);
    expect(text).not.toMatch(/practis|colour|neighbour|favour|centre|behaviour|Grade \d/);
    expect(text.replace(/(George|Booker T\.) Washington|Washington, D\.C\.|West Virginia/g, "")).not.toMatch(/Washington|Oregon|California|Maine|Texas|Alaska|Alabama|Arizona|Arkansas|Florida|Colorado|Illinois|Pennsylvania|Minnesota|Georgia/);
  });
});
