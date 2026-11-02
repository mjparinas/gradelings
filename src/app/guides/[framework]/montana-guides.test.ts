import { describe, expect, it } from "vitest";
import { allGuidePaths, guidePath } from "@/components/site/guides";
import { FRAMEWORKS, getFramework, UPCOMING_FRAMEWORKS } from "@/content/frameworks";
import { GUIDE_FRAMEWORKS, guidesFor } from "@/content/guides";

// Montana's guides: the hub, grade notes, the seven Montana Mathematical Practices and the state tests (MAST and the
// Montana Science Assessment).
describe("Montana parent guides", () => {
  const mt = getFramework("us-mt");
  const g = guidesFor("us-mt");

  it("is offered, so every Montana guide page is built", () => {
    expect(FRAMEWORKS).toContain(mt);
    expect(UPCOMING_FRAMEWORKS).not.toContain(mt);
    expect(GUIDE_FRAMEWORKS).toContain(mt);
    const paths = allGuidePaths().map((p) => p.path);
    for (const p of [guidePath.hub(mt), guidePath.grade(mt, "5"), "/guides/montana/math-practices/", "/guides/montana/mast-tests/"]) expect(paths, p).toContain(p);
  });

  it("has a note for every grade and no French guide", () => {
    expect(g.french).toBeUndefined();
    expect(mt.grades).toEqual(["pk", "k", "1", "2", "3", "4", "5", "6", "7", "8", "9"]);
    for (const grade of mt.grades) {
      expect(g.gradeNotes[grade]?.overview, grade).toBeTruthy();
      expect(g.gradeNotes[grade]?.lookFor, grade).toBeTruthy();
    }
  });

  it("covers MAST and the science test, and the seven Mathematical Practices, which are not graded on their own", () => {
    expect(guidePath.competencies(mt)).toBe("/guides/montana/math-practices/");
    expect(guidePath.assessment(mt)).toBe("/guides/montana/mast-tests/");
    expect(g.assessment.grades).toEqual(["3", "4", "5", "6", "7", "8"]);
    const tests = JSON.stringify(g.assessment);
    expect(tests).toContain("Montana Aligned to Standards Through-Year");
    expect(tests).toMatch(/Novice, Nearing Proficient, Proficient and Advanced/);
    expect(tests).toMatch(/grades 5 and 8/);
    expect(tests).not.toMatch(/Smarter Balanced|CAASPP|OSAS|WCAS|MeCAS|STAAR|AK STAR|Milestones|TCAP|LEAP|IAR/);
    expect(JSON.stringify(g.competencies)).toMatch(/not graded/);
    expect(g.competencies.items.map((i) => i.name.split(".")[0])).toEqual(["1", "2", "3", "4", "5", "6", "7"]);
    expect(g.competencies.items.at(-1)?.name).toMatch(/Culturally connect/);
  });

  it("is written in US English and never names another state", () => {
    const text = JSON.stringify(g);
    expect(text).not.toMatch(/practis|colour|neighbour|favour|centre|behaviour|Grade \d/);
    expect(text).not.toMatch(/Washington(?! D)|Oregon|California|Maine|Texas|Alaska|Arizona|Ohio|Tennessee|Illinois|Louisiana|Connecticut|Idaho|Wyoming/);
  });
});
