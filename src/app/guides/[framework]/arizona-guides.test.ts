import { describe, expect, it } from "vitest";
import { allGuidePaths, guidePath } from "@/components/site/guides";
import { FRAMEWORKS, getFramework, UPCOMING_FRAMEWORKS } from "@/content/frameworks";
import { GUIDE_FRAMEWORKS, guidesFor } from "@/content/guides";

// Arizona's guides: the hub, grade notes, the eight Standards for Mathematical Practice and the state tests (AASA, AzSCI
// and ACT Aspire).
describe("Arizona parent guides", () => {
  const az = getFramework("us-az");
  const g = guidesFor("us-az");

  it("is offered, so every Arizona guide page is built", () => {
    expect(FRAMEWORKS).toContain(az);
    expect(UPCOMING_FRAMEWORKS).not.toContain(az);
    expect(GUIDE_FRAMEWORKS).toContain(az);
    const paths = allGuidePaths().map((p) => p.path);
    for (const p of [guidePath.hub(az), guidePath.grade(az, "4"), "/guides/arizona/math-practices/", "/guides/arizona/state-tests/"]) expect(paths, p).toContain(p);
  });

  it("has a note for every grade and no French guide", () => {
    expect(g.french).toBeUndefined();
    expect(az.grades).toEqual(["k", "1", "2", "3", "4", "5", "6", "7", "8", "9"]);
    for (const grade of az.grades) {
      expect(g.gradeNotes[grade]?.overview, grade).toBeTruthy();
      expect(g.gradeNotes[grade]?.lookFor, grade).toBeTruthy();
    }
  });

  it("covers AASA, AzSCI and ACT Aspire, and the eight Mathematical Practices, which are not graded on their own", () => {
    expect(guidePath.competencies(az)).toBe("/guides/arizona/math-practices/");
    expect(guidePath.assessment(az)).toBe("/guides/arizona/state-tests/");
    expect(g.assessment.grades).toEqual(["3", "4", "5", "6", "7", "8", "9"]);
    const tests = JSON.stringify(g.assessment);
    expect(tests).toContain("AASA");
    expect(tests).toContain("AzSCI");
    expect(tests).toContain("ACT Aspire");
    expect(tests).toMatch(/grades 5, 8 and 11/);
    expect(tests).not.toMatch(/CAASPP|OSAS|WCAS|Smarter Balanced|MeCAS|STAAR|AK STAR/);
    expect(JSON.stringify(g.competencies)).toMatch(/not graded/);
    expect(g.competencies.items.map((i) => i.name.split(".")[0])).toEqual(["1", "2", "3", "4", "5", "6", "7", "8"]);
    for (const item of g.competencies.items) {
      expect(item.parts.length, item.id).toBeGreaterThan(0);
      expect(item.atHome.length, item.id).toBeGreaterThan(0);
    }
  });

  it("is written in US English and never names another state", () => {
    const text = JSON.stringify(g);
    expect(text).not.toMatch(/practis|colour|neighbour|favour|centre|behaviour|Grade \d/);
    expect(text).not.toMatch(/Washington|Oregon|California|Maine|Texas|Alaska/);
  });
});
