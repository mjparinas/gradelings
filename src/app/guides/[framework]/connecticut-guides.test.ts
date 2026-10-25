import { describe, expect, it } from "vitest";
import { allGuidePaths, guidePath } from "@/components/site/guides";
import { FRAMEWORKS, getFramework, UPCOMING_FRAMEWORKS } from "@/content/frameworks";
import { GUIDE_FRAMEWORKS, guidesFor } from "@/content/guides";

// Connecticut's guides: the hub, grade notes, the eight Standards for Mathematical Practice and the state tests
// (Smarter Balanced and the Next Generation Science Assessment).
describe("Connecticut parent guides", () => {
  const ct = getFramework("us-ct");
  const g = guidesFor("us-ct");

  it("is offered, so every Connecticut guide page is built", () => {
    expect(FRAMEWORKS).toContain(ct);
    expect(UPCOMING_FRAMEWORKS).not.toContain(ct);
    expect(GUIDE_FRAMEWORKS).toContain(ct);
    const paths = allGuidePaths().map((p) => p.path);
    for (const p of [guidePath.hub(ct), guidePath.grade(ct, "5"), "/guides/connecticut/math-practices/", "/guides/connecticut/state-tests/"]) expect(paths, p).toContain(p);
  });

  it("has a note for every grade and no French guide", () => {
    expect(g.french).toBeUndefined();
    expect(ct.grades).toEqual(["k", "1", "2", "3", "4", "5", "6", "7", "8", "9"]);
    for (const grade of ct.grades) {
      expect(g.gradeNotes[grade]?.overview, grade).toBeTruthy();
      expect(g.gradeNotes[grade]?.lookFor, grade).toBeTruthy();
    }
  });

  it("covers Smarter Balanced and the science test, and the eight Mathematical Practices, which are not graded on their own", () => {
    expect(guidePath.competencies(ct)).toBe("/guides/connecticut/math-practices/");
    expect(guidePath.assessment(ct)).toBe("/guides/connecticut/state-tests/");
    expect(g.assessment.grades).toEqual(["3", "4", "5", "6", "7", "8"]);
    const tests = JSON.stringify(g.assessment);
    expect(tests).toContain("Smarter Balanced");
    expect(tests).toMatch(/Level 1 \(Not Met\), Level 2 \(Approaching\), Level 3 \(Met\) and Level 4 \(Exceeded\)/);
    expect(tests).toMatch(/grades 5, 8 and 11/);
    expect(tests).not.toMatch(/CAASPP|OSAS|WCAS|MeCAS|STAAR|AK STAR|Milestones|TCAP|LEAP|IAR/);
    expect(JSON.stringify(g.competencies)).toMatch(/not graded/);
    expect(g.competencies.items.map((i) => i.name.split(".")[0])).toEqual(["1", "2", "3", "4", "5", "6", "7", "8"]);
  });

  it("is written in US English and never names another state", () => {
    const text = JSON.stringify(g);
    expect(text).not.toMatch(/practis|colour|neighbour|favour|centre|behaviour|Grade \d/);
    expect(text).not.toMatch(/Washington(?! D)|Oregon|California|Maine|Texas|Alaska|Arizona|Ohio|Tennessee|Illinois|Louisiana/);
  });
});
