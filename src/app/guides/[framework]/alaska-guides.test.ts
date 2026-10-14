import { describe, expect, it } from "vitest";
import { allGuidePaths, guidePath } from "@/components/site/guides";
import { FRAMEWORKS, getFramework, UPCOMING_FRAMEWORKS } from "@/content/frameworks";
import { GUIDE_FRAMEWORKS, guidesFor } from "@/content/guides";

// Alaska's guides: the hub, grade notes, the Cultural Standards for Students (A to E) and the state tests (AK STAR and the
// Alaska Science Assessment).
describe("Alaska parent guides", () => {
  const ak = getFramework("us-ak");
  const g = guidesFor("us-ak");

  it("is offered, so every Alaska guide page is built", () => {
    expect(FRAMEWORKS).toContain(ak);
    expect(UPCOMING_FRAMEWORKS).not.toContain(ak);
    expect(GUIDE_FRAMEWORKS).toContain(ak);
    const paths = allGuidePaths().map((p) => p.path);
    for (const p of [guidePath.hub(ak), guidePath.grade(ak, "4"), "/guides/alaska/cultural-standards/", "/guides/alaska/state-tests/"]) expect(paths, p).toContain(p);
  });

  it("has a note for every grade and no French guide", () => {
    expect(g.french).toBeUndefined();
    expect(ak.grades).toEqual(["k", "1", "2", "3", "4", "5", "6", "7", "8", "9"]);
    for (const grade of ak.grades) {
      expect(g.gradeNotes[grade]?.overview, grade).toBeTruthy();
      expect(g.gradeNotes[grade]?.lookFor, grade).toBeTruthy();
    }
  });

  it("covers AK STAR and the science test, and the five Cultural Standards, which are not graded", () => {
    expect(guidePath.competencies(ak)).toBe("/guides/alaska/cultural-standards/");
    expect(guidePath.assessment(ak)).toBe("/guides/alaska/state-tests/");
    expect(g.assessment.grades).toEqual(["3", "4", "5", "6", "7", "8", "9"]);
    const tests = JSON.stringify(g.assessment);
    expect(tests).toContain("AK STAR");
    expect(tests).toContain("Alaska Science Assessment");
    expect(tests).toMatch(/grades 5, 8 and 10/);
    expect(tests).not.toMatch(/CAASPP|OSAS|WCAS|Smarter Balanced|MeCAS|STAAR/);
    expect(JSON.stringify(g.competencies)).toMatch(/not graded/);
    expect(g.competencies.items.map((i) => i.name.slice(0, 2))).toEqual(["A.", "B.", "C.", "D.", "E."]);
    for (const item of g.competencies.items) {
      expect(item.parts.length, item.id).toBeGreaterThan(0);
      expect(item.atHome.length, item.id).toBeGreaterThan(0);
    }
  });

  it("is written in US English and never names another state", () => {
    const text = JSON.stringify(g);
    expect(text).not.toMatch(/practis|colour|neighbour|favour|centre|behaviour|Grade \d/);
    expect(text).not.toMatch(/Washington|Oregon|California|Maine|Texas/);
  });
});
