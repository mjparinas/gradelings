import { describe, expect, it } from "vitest";
import { allGuidePaths, guidePath } from "@/components/site/guides";
import { FRAMEWORKS, getFramework, UPCOMING_FRAMEWORKS } from "@/content/frameworks";
import { GUIDE_FRAMEWORKS, guidesFor } from "@/content/guides";

// Indiana's guides: the hub, grade notes, the process standards and the state tests (ILEARN and IREAD).
describe("Indiana parent guides", () => {
  const ind = getFramework("us-in");
  const g = guidesFor("us-in");

  it("is offered, so every Indiana guide page is built", () => {
    expect(FRAMEWORKS).toContain(ind);
    expect(UPCOMING_FRAMEWORKS).not.toContain(ind);
    expect(GUIDE_FRAMEWORKS).toContain(ind);
    const paths = allGuidePaths().map((p) => p.path);
    for (const p of [guidePath.hub(ind), guidePath.grade(ind, "4"), "/guides/indiana/process-standards/", "/guides/indiana/state-tests/"]) expect(paths, p).toContain(p);
  });

  it("has a note for every grade and no French guide", () => {
    expect(g.french).toBeUndefined();
    expect(ind.grades).toEqual(["k", "1", "2", "3", "4", "5", "6", "7", "8", "9"]);
    for (const grade of ind.grades) {
      expect(g.gradeNotes[grade]?.overview, grade).toBeTruthy();
      expect(g.gradeNotes[grade]?.lookFor, grade).toBeTruthy();
    }
  });

  it("covers ILEARN and IREAD and the process standards", () => {
    expect(guidePath.competencies(ind)).toBe("/guides/indiana/process-standards/");
    expect(guidePath.assessment(ind)).toBe("/guides/indiana/state-tests/");
    expect(g.assessment.grades).toEqual(["2", "3", "4", "5", "6", "7", "8"]);
    const tests = JSON.stringify(g.assessment);
    expect(tests).toContain("ILEARN");
    expect(tests).toContain("IREAD");
    expect(tests).toMatch(/social studies in grade 5/);
    expect(tests).not.toMatch(/ATLAS|ACAP|AASA|CAASPP|OSAS|WCAS|Smarter Balanced|MeCAS|STAAR|AK STAR|FAST|PSSA|CMAS|IAR|Milestones/);
    expect(g.competencies.items).toHaveLength(4);
    for (const item of g.competencies.items) {
      expect(item.parts.length, item.id).toBeGreaterThan(0);
      expect(item.atHome.length, item.id).toBeGreaterThan(0);
    }
  });

  it("is written in US English and never names another state", () => {
    const text = JSON.stringify(g);
    expect(text).not.toMatch(/practis|colour|neighbour|favour|centre|behaviour|Grade \d/);
    expect(text.replace(/George Washington/g, "")).not.toMatch(/Washington|Oregon|California|Maine|Texas|Alaska|Alabama|Arizona|Arkansas|Florida|Colorado|Illinois|Pennsylvania|Minnesota|Georgia/);
  });
});
