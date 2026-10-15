import { describe, expect, it } from "vitest";
import { allGuidePaths, guidePath } from "@/components/site/guides";
import { FRAMEWORKS, getFramework, UPCOMING_FRAMEWORKS } from "@/content/frameworks";
import { GUIDE_FRAMEWORKS, guidesFor } from "@/content/guides";

// Arkansas's guides: the hub, grade notes, the learning practices built into the Arkansas Academic Standards and the
// state tests (ATLAS).
describe("Arkansas parent guides", () => {
  const ar = getFramework("us-ar");
  const g = guidesFor("us-ar");

  it("is offered, so every Arkansas guide page is built", () => {
    expect(FRAMEWORKS).toContain(ar);
    expect(UPCOMING_FRAMEWORKS).not.toContain(ar);
    expect(GUIDE_FRAMEWORKS).toContain(ar);
    const paths = allGuidePaths().map((p) => p.path);
    for (const p of [guidePath.hub(ar), guidePath.grade(ar, "4"), "/guides/arkansas/learning-practices/", "/guides/arkansas/state-tests/"]) expect(paths, p).toContain(p);
  });

  it("has a note for every grade and no French guide", () => {
    expect(g.french).toBeUndefined();
    expect(ar.grades).toEqual(["k", "1", "2", "3", "4", "5", "6", "7", "8", "9"]);
    for (const grade of ar.grades) {
      expect(g.gradeNotes[grade]?.overview, grade).toBeTruthy();
      expect(g.gradeNotes[grade]?.lookFor, grade).toBeTruthy();
    }
  });

  it("covers ATLAS and the 3rd grade reading rule, and four learning practices", () => {
    expect(guidePath.competencies(ar)).toBe("/guides/arkansas/learning-practices/");
    expect(guidePath.assessment(ar)).toBe("/guides/arkansas/state-tests/");
    expect(g.assessment.grades).toEqual(["3", "4", "5", "6", "7", "8", "9"]);
    const tests = JSON.stringify(g.assessment);
    expect(tests).toContain("ATLAS");
    expect(tests).toContain("LEARNS Act");
    expect(tests).toMatch(/grades 3 to 10/);
    expect(tests).not.toMatch(/ACAP|AASA|CAASPP|OSAS|WCAS|Smarter Balanced|MeCAS|STAAR|AK STAR/);
    expect(g.competencies.items).toHaveLength(4);
    for (const item of g.competencies.items) {
      expect(item.parts.length, item.id).toBeGreaterThan(0);
      expect(item.atHome.length, item.id).toBeGreaterThan(0);
    }
  });

  it("is written in US English and never names another state", () => {
    const text = JSON.stringify(g);
    expect(text).not.toMatch(/practis|colour|neighbour|favour|centre|behaviour|Grade \d/);
    expect(text).not.toMatch(/Washington|Oregon|California|Maine|Texas|Alaska|Alabama|Arizona|ALSDE/);
  });
});
