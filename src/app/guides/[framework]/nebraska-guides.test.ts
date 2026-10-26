import { describe, expect, it } from "vitest";
import { allGuidePaths, guidePath } from "@/components/site/guides";
import { FRAMEWORKS, getFramework, UPCOMING_FRAMEWORKS } from "@/content/frameworks";
import { GUIDE_FRAMEWORKS, guidesFor } from "@/content/guides";

// Nebraska's guides: the hub, grade notes, the five Nebraska Mathematical Processes and the state tests (NSCAS, with
// the Reading Improvement Act checks in the early grades).
describe("Nebraska parent guides", () => {
  const ne = getFramework("us-ne");
  const g = guidesFor("us-ne");

  it("is offered, so every Nebraska guide page is built", () => {
    expect(FRAMEWORKS).toContain(ne);
    expect(UPCOMING_FRAMEWORKS).not.toContain(ne);
    expect(GUIDE_FRAMEWORKS).toContain(ne);
    const paths = allGuidePaths().map((p) => p.path);
    for (const p of [guidePath.hub(ne), guidePath.grade(ne, "5"), "/guides/nebraska/math-processes/", "/guides/nebraska/state-tests/"]) expect(paths, p).toContain(p);
  });

  it("has a note for every grade and no French guide", () => {
    expect(g.french).toBeUndefined();
    expect(ne.grades).toEqual(["k", "1", "2", "3", "4", "5", "6", "7", "8", "9"]);
    for (const grade of ne.grades) {
      expect(g.gradeNotes[grade]?.overview, grade).toBeTruthy();
      expect(g.gradeNotes[grade]?.lookFor, grade).toBeTruthy();
    }
  });

  it("covers NSCAS, its three levels and the five Mathematical Processes, which are not graded on their own", () => {
    expect(guidePath.competencies(ne)).toBe("/guides/nebraska/math-processes/");
    expect(guidePath.assessment(ne)).toBe("/guides/nebraska/state-tests/");
    expect(g.assessment.grades).toEqual(["3", "4", "5", "6", "7", "8"]);
    const tests = JSON.stringify(g.assessment);
    expect(tests).toContain("Nebraska Student-Centered Assessment System");
    expect(tests).toMatch(/Developing \(.*\), On Track \(.*\) and Advanced \(/);
    expect(tests).toContain("Reading Improvement Act");
    expect(tests).not.toMatch(/Smarter Balanced|CAASPP|OSAS|WCAS|MeCAS|STAAR|AK STAR|Milestones|TCAP|LEAP|M-STEP|KAP|Kansas Assessment Program/);
    expect(JSON.stringify(g.competencies)).toMatch(/not graded/);
    expect(g.competencies.items.map((i) => i.name.split(".")[0])).toEqual(["1", "2", "3", "4", "5"]);
  });

  it("is written in US English and never names another state", () => {
    const text = JSON.stringify(g);
    expect(text).not.toMatch(/practis|colour|neighbour|favour|centre|behaviour|Grade \d/);
    expect(text).not.toMatch(/Washington(?!, D)|Oregon(?! Trail)|California|Michigan|Arizona|Utah|Nevada|Missouri(?! River)|Oklahoma|Kansas(?![–-]Nebraska)|Iowa/);
  });
});
