import { describe, expect, it } from "vitest";
import { allGuidePaths, guidePath } from "@/components/site/guides";
import { FRAMEWORKS, getFramework, UPCOMING_FRAMEWORKS } from "@/content/frameworks";
import { GUIDE_FRAMEWORKS, guidesFor } from "@/content/guides";

// Delaware's guides: the hub, grade notes, the eight Standards for Mathematical Practice and the state tests (DeSSA,
// with Smarter Balanced in grades 3 to 8, and the SAT).
describe("Delaware parent guides", () => {
  const de = getFramework("us-de");
  const g = guidesFor("us-de");

  it("is offered, so every Delaware guide page is built", () => {
    expect(FRAMEWORKS).toContain(de);
    expect(UPCOMING_FRAMEWORKS).not.toContain(de);
    expect(GUIDE_FRAMEWORKS).toContain(de);
    const paths = allGuidePaths().map((p) => p.path);
    for (const p of [guidePath.hub(de), guidePath.grade(de, "5"), "/guides/delaware/math-practices/", "/guides/delaware/state-tests/"]) expect(paths, p).toContain(p);
  });

  it("has a note for every grade and no French guide", () => {
    expect(g.french).toBeUndefined();
    expect(de.grades).toEqual(["k", "1", "2", "3", "4", "5", "6", "7", "8", "9"]);
    for (const grade of de.grades) {
      expect(g.gradeNotes[grade]?.overview, grade).toBeTruthy();
      expect(g.gradeNotes[grade]?.lookFor, grade).toBeTruthy();
    }
  });

  it("covers DeSSA, its four levels and the eight Mathematical Practices, which are not graded on their own", () => {
    expect(guidePath.competencies(de)).toBe("/guides/delaware/math-practices/");
    expect(guidePath.assessment(de)).toBe("/guides/delaware/state-tests/");
    expect(g.assessment.grades).toEqual(["3", "4", "5", "6", "7", "8"]);
    const tests = JSON.stringify(g.assessment);
    expect(tests).toContain("Delaware System of Student Assessments");
    expect(tests).toContain("Smarter Balanced");
    expect(tests).toContain("four performance levels");
    expect(tests).toContain("SAT");
    expect(tests).not.toMatch(/NH SAS|CAASPP|NM-MSSA|NSCAS|STAAR|MCAS|Milestones|TCAP|LEAP|M-STEP|KAP/);
    expect(JSON.stringify(g.competencies)).toMatch(/not graded/);
    expect(g.competencies.items.map((i) => i.name.split(".")[0])).toEqual(["1", "2", "3", "4", "5", "6", "7", "8"]);
  });

  it("is written in US English and never names another state", () => {
    const text = JSON.stringify(g);
    expect(text).not.toMatch(/practis|colour|neighbour|favour|centre|behaviour|Grade \d/);
    expect(text).not.toMatch(/Washington(?!, D)|Oregon(?! Trail)|California|Michigan|Arizona|New Hampshire|Nevada|Nebraska|Iowa|Massachusetts|Maine|Vermont/);
  });
});
