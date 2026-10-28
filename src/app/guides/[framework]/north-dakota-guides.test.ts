import { describe, expect, it } from "vitest";
import { allGuidePaths, guidePath } from "@/components/site/guides";
import { FRAMEWORKS, getFramework, UPCOMING_FRAMEWORKS } from "@/content/frameworks";
import { GUIDE_FRAMEWORKS, guidesFor } from "@/content/guides";

// North Dakota's guides: the hub, grade notes, the three Math Attributes and the state tests (the ND A+ Summative).
describe("North Dakota parent guides", () => {
  const nd = getFramework("us-nd");
  const g = guidesFor("us-nd");

  it("is offered, so every North Dakota guide page is built", () => {
    expect(FRAMEWORKS).toContain(nd);
    expect(UPCOMING_FRAMEWORKS).not.toContain(nd);
    expect(GUIDE_FRAMEWORKS).toContain(nd);
    const paths = allGuidePaths().map((p) => p.path);
    for (const p of [guidePath.hub(nd), guidePath.grade(nd, "4"), "/guides/north-dakota/math-attributes/", "/guides/north-dakota/state-tests/"]) expect(paths, p).toContain(p);
  });

  it("has a note for every grade and no French guide", () => {
    expect(g.french).toBeUndefined();
    for (const grade of nd.grades) {
      expect(g.gradeNotes[grade]?.overview, grade).toBeTruthy();
      expect(g.gradeNotes[grade]?.lookFor, grade).toBeTruthy();
    }
  });

  it("covers the ND A+ Summative and the three Math Attributes, which are not graded on their own", () => {
    expect(g.assessment.grades).toEqual(["3", "4", "5", "6", "7", "8"]);
    const tests = JSON.stringify(g.assessment);
    expect(tests).toContain("ND A+ Summative");
    expect(tests).toMatch(/grades 4, 8 and 10/);
    expect(tests).not.toMatch(/RICAS|NGSA|MCAS|Smarter Balanced|MAST|STAAR/);
    expect(JSON.stringify(g.competencies)).toMatch(/not graded/);
    expect(g.competencies.items.map((i) => i.id)).toEqual(["problem-solving", "connections", "reasoning"]);
  });

  it("teaches North Dakota studies in 4th and 8th grade", () => {
    expect(g.gradeNotes["4"]?.overview).toMatch(/North Dakota studies/);
    expect(g.gradeNotes["8"]?.overview).toMatch(/North Dakota studies/);
  });

  it("is written in US English and never names another state", () => {
    const text = JSON.stringify(g);
    expect(text).not.toMatch(/practis|colour|neighbour|favour|centre|behaviour|Grade \d/);
    expect(text).not.toMatch(/Rhode Island|Narragansett|Providence|Washington(?! D)|Oregon|California|Montana|Minnesota|South Dakota/);
  });
});
