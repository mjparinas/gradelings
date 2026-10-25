import { describe, expect, it } from "vitest";
import { allGuidePaths, guidePath } from "@/components/site/guides";
import { FRAMEWORKS, getFramework, UPCOMING_FRAMEWORKS } from "@/content/frameworks";
import { GUIDE_FRAMEWORKS, guidesFor } from "@/content/guides";

// Louisiana's guides: the hub, grade notes, the eight Standards for Mathematical Practice and LEAP 2025 (with the
// 3rd grade literacy law, Act 422 of 2023).
describe("Louisiana parent guides", () => {
  const la = getFramework("us-la");
  const g = guidesFor("us-la");

  it("is offered, so every Louisiana guide page is built", () => {
    expect(FRAMEWORKS).toContain(la);
    expect(UPCOMING_FRAMEWORKS).not.toContain(la);
    expect(GUIDE_FRAMEWORKS).toContain(la);
    const paths = allGuidePaths().map((p) => p.path);
    for (const p of [guidePath.hub(la), guidePath.grade(la, "5"), "/guides/louisiana/math-practices/", "/guides/louisiana/leap-tests/"]) expect(paths, p).toContain(p);
  });

  it("has a note for every grade and no French guide", () => {
    expect(g.french).toBeUndefined();
    expect(la.grades).toEqual(["k", "1", "2", "3", "4", "5", "6", "7", "8", "9"]);
    for (const grade of la.grades) {
      expect(g.gradeNotes[grade]?.overview, grade).toBeTruthy();
      expect(g.gradeNotes[grade]?.lookFor, grade).toBeTruthy();
    }
  });

  it("covers LEAP 2025 and the 3rd grade reading law, and the eight Mathematical Practices, which are not graded on their own", () => {
    expect(guidePath.competencies(la)).toBe("/guides/louisiana/math-practices/");
    expect(guidePath.assessment(la)).toBe("/guides/louisiana/leap-tests/");
    expect(g.assessment.grades).toEqual(["3", "4", "5", "6", "7", "8"]);
    const tests = JSON.stringify(g.assessment);
    expect(tests).toContain("LEAP 2025");
    expect(tests).toContain("Act 422");
    expect(tests).toMatch(/Unsatisfactory, Approaching Basic, Basic, Mastery and Advanced/);
    expect(tests).not.toMatch(/CAASPP|OSAS|WCAS|Smarter Balanced|MeCAS|STAAR|AK STAR|Milestones|TCAP/);
    expect(JSON.stringify(g.competencies)).toMatch(/not graded/);
    expect(g.competencies.items.map((i) => i.name.split(".")[0])).toEqual(["1", "2", "3", "4", "5", "6", "7", "8"]);
  });

  it("is written in US English and never names another state", () => {
    const text = JSON.stringify(g);
    expect(text).not.toMatch(/practis|colour|neighbour|favour|centre|behaviour|Grade \d/);
    expect(text).not.toMatch(/Washington(?! D)|Oregon|California|Maine|Texas|Alaska|Arizona|Ohio|Tennessee/);
  });
});
