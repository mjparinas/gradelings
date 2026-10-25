import { describe, expect, it } from "vitest";
import { allGuidePaths, guidePath } from "@/components/site/guides";
import { FRAMEWORKS, getFramework, UPCOMING_FRAMEWORKS } from "@/content/frameworks";
import { GUIDE_FRAMEWORKS, guidesFor } from "@/content/guides";

// Kansas's guides: the hub, grade notes, the eight Standards for Mathematical Practice and the state tests (the Kansas
// Assessment Program, with the social studies classroom-based assessments).
describe("Kansas parent guides", () => {
  const ks = getFramework("us-ks");
  const g = guidesFor("us-ks");

  it("is offered, so every Kansas guide page is built", () => {
    expect(FRAMEWORKS).toContain(ks);
    expect(UPCOMING_FRAMEWORKS).not.toContain(ks);
    expect(GUIDE_FRAMEWORKS).toContain(ks);
    const paths = allGuidePaths().map((p) => p.path);
    for (const p of [guidePath.hub(ks), guidePath.grade(ks, "5"), "/guides/kansas/math-practices/", "/guides/kansas/state-tests/"]) expect(paths, p).toContain(p);
  });

  it("has a note for every grade and no French guide", () => {
    expect(g.french).toBeUndefined();
    expect(ks.grades).toEqual(["k", "1", "2", "3", "4", "5", "6", "7", "8", "9"]);
    for (const grade of ks.grades) {
      expect(g.gradeNotes[grade]?.overview, grade).toBeTruthy();
      expect(g.gradeNotes[grade]?.lookFor, grade).toBeTruthy();
    }
  });

  it("covers KAP, its scale and four levels, and the eight Mathematical Practices, which are not graded on their own", () => {
    expect(guidePath.competencies(ks)).toBe("/guides/kansas/math-practices/");
    expect(guidePath.assessment(ks)).toBe("/guides/kansas/state-tests/");
    expect(g.assessment.grades).toEqual(["3", "4", "5", "6", "7", "8"]);
    const tests = JSON.stringify(g.assessment);
    expect(tests).toContain("Kansas Assessment Program");
    expect(tests).toContain("400 to 700");
    expect(tests).toMatch(/Level 1 \(limited\), Level 2 \(basic\), Level 3 \(proficient\) and Level 4 \(advanced\)/);
    expect(tests).toContain("classroom-based assessments");
    expect(tests).not.toMatch(/Smarter Balanced|CAASPP|OSAS|WCAS|MeCAS|STAAR|AK STAR|Milestones|TCAP|LEAP|M-STEP/);
    expect(JSON.stringify(g.competencies)).toMatch(/not graded/);
    expect(g.competencies.items.map((i) => i.name.split(".")[0])).toEqual(["1", "2", "3", "4", "5", "6", "7", "8"]);
  });

  it("is written in US English and never names another state", () => {
    const text = JSON.stringify(g);
    expect(text).not.toMatch(/practis|colour|neighbour|favour|centre|behaviour|Grade \d/);
    expect(text).not.toMatch(/Washington(?!, D)|Oregon(?! Trail)|California|Michigan|Arizona|Utah|Nevada|Missouri|Oklahoma/);
  });
});
