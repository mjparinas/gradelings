import { describe, expect, it } from "vitest";
import { allGuidePaths, guidePath } from "@/components/site/guides";
import { FRAMEWORKS, getFramework, UPCOMING_FRAMEWORKS } from "@/content/frameworks";
import { GUIDE_FRAMEWORKS, guidesFor } from "@/content/guides";

// Nevada's guides: the hub, grade notes, the eight Standards for Mathematical Practice and the state tests (Smarter
// Balanced, the Nevada Science Assessment and the ACT, with the Read by Grade 3 law).
describe("Nevada parent guides", () => {
  const nv = getFramework("us-nv");
  const g = guidesFor("us-nv");

  it("is offered, so every Nevada guide page is built", () => {
    expect(FRAMEWORKS).toContain(nv);
    expect(UPCOMING_FRAMEWORKS).not.toContain(nv);
    expect(GUIDE_FRAMEWORKS).toContain(nv);
    const paths = allGuidePaths().map((p) => p.path);
    for (const p of [guidePath.hub(nv), guidePath.grade(nv, "5"), "/guides/nevada/math-practices/", "/guides/nevada/state-tests/"]) expect(paths, p).toContain(p);
  });

  it("has a note for every grade and no French guide", () => {
    expect(g.french).toBeUndefined();
    expect(nv.grades).toEqual(["k", "1", "2", "3", "4", "5", "6", "7", "8", "9"]);
    for (const grade of nv.grades) {
      expect(g.gradeNotes[grade]?.overview, grade).toBeTruthy();
      expect(g.gradeNotes[grade]?.lookFor, grade).toBeTruthy();
    }
  });

  it("covers Smarter Balanced, its four levels and the 3rd grade reading law, and the eight Mathematical Practices, which are not graded on their own", () => {
    expect(guidePath.competencies(nv)).toBe("/guides/nevada/math-practices/");
    expect(guidePath.assessment(nv)).toBe("/guides/nevada/state-tests/");
    expect(g.assessment.grades).toEqual(["3", "4", "5", "6", "7", "8"]);
    const tests = JSON.stringify(g.assessment);
    expect(tests).toContain("Smarter Balanced");
    expect(tests).toContain("Nevada Science Assessment");
    expect(tests).toContain("July 1, 2028");
    expect(tests).toMatch(/Level 1 \(Minimal Understanding\), Level 2 \(Partial Understanding\), Level 3 \(Proficient\) and Level 4 \(Advanced\)/);
    expect(tests).not.toMatch(/CAASPP|OSAS|WCAS|MeCAS|STAAR|AK STAR|Milestones|TCAP|LEAP|M-STEP/);
    expect(JSON.stringify(g.competencies)).toMatch(/not graded/);
    expect(g.competencies.items.map((i) => i.name.split(".")[0])).toEqual(["1", "2", "3", "4", "5", "6", "7", "8"]);
  });

  it("is written in US English and never names another state", () => {
    // "Read by Grade 3" is the name of Nevada's reading law and program, so it keeps its capital G.
    const text = JSON.stringify(g).replaceAll("Read by Grade 3", "");
    expect(text).not.toMatch(/practis|colour|neighbour|favour|centre|behaviour|Grade \d/);
    expect(text).not.toMatch(/Washington(?!, D)|Oregon|California|Michigan|Arizona|Utah|Idaho/);
  });
});
