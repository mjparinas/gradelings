import { describe, expect, it } from "vitest";
import { allGuidePaths, guidePath } from "@/components/site/guides";
import { FRAMEWORKS, getFramework, UPCOMING_FRAMEWORKS } from "@/content/frameworks";
import { GUIDE_FRAMEWORKS, guidesFor } from "@/content/guides";

// Georgia's guides: the hub, grade notes, the learning practices and the state tests (Georgia Milestones).
describe("Georgia parent guides", () => {
  const ga = getFramework("us-ga");
  const g = guidesFor("us-ga");

  it("is offered, so every Georgia guide page is built", () => {
    expect(FRAMEWORKS).toContain(ga);
    expect(UPCOMING_FRAMEWORKS).not.toContain(ga);
    expect(GUIDE_FRAMEWORKS).toContain(ga);
    const paths = allGuidePaths().map((p) => p.path);
    for (const p of [guidePath.hub(ga), guidePath.grade(ga, "4"), "/guides/georgia/learning-practices/", "/guides/georgia/state-tests/"]) expect(paths, p).toContain(p);
  });

  it("has a note for every grade and no French guide", () => {
    expect(g.french).toBeUndefined();
    expect(ga.grades).toEqual(["k", "1", "2", "3", "4", "5", "6", "7", "8", "9"]);
    for (const grade of ga.grades) {
      expect(g.gradeNotes[grade]?.overview, grade).toBeTruthy();
      expect(g.gradeNotes[grade]?.lookFor, grade).toBeTruthy();
    }
  });

  it("covers Georgia Milestones and four groups of learning practices", () => {
    expect(guidePath.competencies(ga)).toBe("/guides/georgia/learning-practices/");
    expect(guidePath.assessment(ga)).toBe("/guides/georgia/state-tests/");
    expect(g.assessment.grades).toEqual(["3", "4", "5", "6", "7", "8"]);
    const tests = JSON.stringify(g.assessment);
    expect(tests).toContain("Georgia Milestones");
    expect(tests).toContain("Early Literacy Act");
    expect(tests).toMatch(/social studies in grade 8/);
    expect(tests).not.toMatch(/ATLAS|ACAP|AASA|CAASPP|OSAS|WCAS|Smarter Balanced|MeCAS|STAAR|AK STAR|FAST|PSSA|CMAS|IAR/);
    expect(g.competencies.items).toHaveLength(4);
    for (const item of g.competencies.items) {
      expect(item.parts.length, item.id).toBeGreaterThan(0);
      expect(item.atHome.length, item.id).toBeGreaterThan(0);
    }
  });

  it("is written in US English and never names another state", () => {
    const text = JSON.stringify(g);
    expect(text).not.toMatch(/practis|colour|neighbour|favour|centre|behaviour|Grade \d/);
    // George Washington Carver is in the 1st grade note.
    expect(text.replace(/George Washington( Carver)?/g, "")).not.toMatch(/Washington|Oregon|California|Maine|Texas|Alaska|Alabama|Arizona|Arkansas|Florida|Colorado|Illinois|Pennsylvania|Minnesota/);
  });
});
