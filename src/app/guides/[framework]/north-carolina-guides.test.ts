import { describe, expect, it } from "vitest";
import { allGuidePaths, guidePath } from "@/components/site/guides";
import { FRAMEWORKS, getFramework, UPCOMING_FRAMEWORKS } from "@/content/frameworks";
import { GUIDE_FRAMEWORKS, guidesFor } from "@/content/guides";

// North Carolina's guides: the hub, grade notes, the Portrait of a Graduate and the state tests (End-of-Grade and
// End-of-Course).
describe("North Carolina parent guides", () => {
  const nc = getFramework("us-nc");
  const g = guidesFor("us-nc");

  it("is offered, so every North Carolina guide page is built", () => {
    expect(FRAMEWORKS).toContain(nc);
    expect(UPCOMING_FRAMEWORKS).not.toContain(nc);
    expect(GUIDE_FRAMEWORKS).toContain(nc);
    const paths = allGuidePaths().map((p) => p.path);
    for (const p of [guidePath.hub(nc), guidePath.grade(nc, "4"), "/guides/north-carolina/portrait-of-a-graduate/", "/guides/north-carolina/state-tests/"]) expect(paths, p).toContain(p);
  });

  it("has a note for every grade and no French guide", () => {
    expect(g.french).toBeUndefined();
    expect(nc.grades).toEqual(["k", "1", "2", "3", "4", "5", "6", "7", "8", "9"]);
    for (const grade of nc.grades) {
      expect(g.gradeNotes[grade]?.overview, grade).toBeTruthy();
      expect(g.gradeNotes[grade]?.lookFor, grade).toBeTruthy();
    }
  });

  it("covers the End-of-Grade and End-of-Course tests, Read to Achieve and the seven durable skills", () => {
    expect(guidePath.competencies(nc)).toBe("/guides/north-carolina/portrait-of-a-graduate/");
    expect(guidePath.assessment(nc)).toBe("/guides/north-carolina/state-tests/");
    expect(g.assessment.grades).toEqual(["3", "4", "5", "6", "7", "8"]);
    const tests = JSON.stringify(g.assessment);
    expect(tests).toContain("End-of-Grade");
    expect(tests).toContain("End-of-Course");
    expect(tests).toContain("Read to Achieve");
    expect(tests).toMatch(/science in grades 5 and 8/);
    expect(tests).not.toMatch(/Milestones|ATLAS|ACAP|AASA|CAASPP|OSAS|WCAS|Smarter Balanced|MeCAS|STAAR|AK STAR|FAST|PSSA|CMAS|IAR/);
    const portrait = JSON.stringify(g.competencies).toLowerCase();
    for (const skill of ["adaptability", "collaboration", "communication", "critical thinking", "empathy", "learner's mindset", "personal responsibility"]) expect(portrait, skill).toContain(skill);
    for (const item of g.competencies.items) {
      expect(item.parts.length, item.id).toBeGreaterThan(0);
      expect(item.atHome.length, item.id).toBeGreaterThan(0);
    }
  });

  it("is written in US English and never names another state", () => {
    const text = JSON.stringify(g);
    expect(text).not.toMatch(/practis|colour|neighbour|favour|centre|behaviour|Grade \d/);
    expect(text).not.toMatch(/Washington|Oregon|California|Maine|Texas|Alaska|Alabama|Arizona|Arkansas|Florida|Colorado|Illinois|Pennsylvania|Minnesota|Georgia/);
  });
});
