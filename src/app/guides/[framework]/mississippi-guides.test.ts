import { describe, expect, it } from "vitest";
import { allGuidePaths, guidePath } from "@/components/site/guides";
import { FRAMEWORKS, getFramework, UPCOMING_FRAMEWORKS } from "@/content/frameworks";
import { GUIDE_FRAMEWORKS, guidesFor } from "@/content/guides";

// Mississippi's guides: the hub, grade notes, the eight Standards for Mathematical Practice and the MAAP tests (with the
// Literacy-Based Promotion Act's 3rd grade reading requirement).
describe("Mississippi parent guides", () => {
  const ms = getFramework("us-ms");
  const g = guidesFor("us-ms");

  it("is offered, so every Mississippi guide page is built", () => {
    expect(FRAMEWORKS).toContain(ms);
    expect(UPCOMING_FRAMEWORKS).not.toContain(ms);
    expect(GUIDE_FRAMEWORKS).toContain(ms);
    const paths = allGuidePaths().map((p) => p.path);
    for (const p of [guidePath.hub(ms), guidePath.grade(ms, "5"), "/guides/mississippi/math-practices/", "/guides/mississippi/maap-tests/"]) expect(paths, p).toContain(p);
  });

  it("has a note for every grade and no French guide", () => {
    expect(g.french).toBeUndefined();
    expect(ms.grades).toEqual(["k", "1", "2", "3", "4", "5", "6", "7", "8", "9"]);
    for (const grade of ms.grades) {
      expect(g.gradeNotes[grade]?.overview, grade).toBeTruthy();
      expect(g.gradeNotes[grade]?.lookFor, grade).toBeTruthy();
    }
  });

  it("covers MAAP, its five levels and the 3rd grade reading requirement, and the eight Mathematical Practices, which are not graded on their own", () => {
    expect(guidePath.competencies(ms)).toBe("/guides/mississippi/math-practices/");
    expect(guidePath.assessment(ms)).toBe("/guides/mississippi/maap-tests/");
    expect(g.assessment.grades).toEqual(["3", "4", "5", "6", "7", "8"]);
    const tests = JSON.stringify(g.assessment);
    expect(tests).toContain("Mississippi Academic Assessment Program");
    expect(tests).toContain("Literacy-Based Promotion Act");
    expect(tests).toMatch(/Level 1 \(Minimal\), Level 2 \(Basic\), Level 3 \(Passing\), Level 4 \(Proficient\) and Level 5 \(Advanced\)/);
    expect(tests).not.toMatch(/Smarter Balanced|CAASPP|OSAS|WCAS|MeCAS|STAAR|AK STAR|Milestones|TCAP|LEAP|M-STEP|ACAP/);
    expect(JSON.stringify(g.competencies)).toMatch(/not graded/);
    expect(g.competencies.items.map((i) => i.name.split(".")[0])).toEqual(["1", "2", "3", "4", "5", "6", "7", "8"]);
  });

  it("is written in US English and never names another state", () => {
    const text = JSON.stringify(g);
    expect(text).not.toMatch(/practis|colour|neighbour|favour|centre|behaviour|Grade \d/);
    expect(text).not.toMatch(/Washington(?!, D)|Oregon|California|Nevada|Alabama|Louisiana|Tennessee|Arkansas/);
  });
});
