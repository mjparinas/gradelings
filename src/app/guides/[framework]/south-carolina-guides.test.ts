import { describe, expect, it } from "vitest";
import { allGuidePaths, guidePath } from "@/components/site/guides";
import { FRAMEWORKS, getFramework, UPCOMING_FRAMEWORKS } from "@/content/frameworks";
import { GUIDE_FRAMEWORKS, guidesFor } from "@/content/guides";

// South Carolina's guides: the hub, grade notes, the Profile of the South Carolina Graduate and the state tests (SC READY
// and SCPASS).
describe("South Carolina parent guides", () => {
  const sc = getFramework("us-sc");
  const g = guidesFor("us-sc");

  it("is offered, so every South Carolina guide page is built", () => {
    expect(FRAMEWORKS).toContain(sc);
    expect(UPCOMING_FRAMEWORKS).not.toContain(sc);
    expect(GUIDE_FRAMEWORKS).toContain(sc);
    const paths = allGuidePaths().map((p) => p.path);
    for (const p of [guidePath.hub(sc), guidePath.grade(sc, "4"), "/guides/south-carolina/graduate-profile/", "/guides/south-carolina/state-tests/"]) expect(paths, p).toContain(p);
  });

  it("has a note for every grade and no French guide", () => {
    expect(g.french).toBeUndefined();
    expect(sc.grades).toEqual(["k", "1", "2", "3", "4", "5", "6", "7", "8", "9"]);
    for (const grade of sc.grades) {
      expect(g.gradeNotes[grade]?.overview, grade).toBeTruthy();
      expect(g.gradeNotes[grade]?.lookFor, grade).toBeTruthy();
    }
  });

  it("covers SC READY and SCPASS and the Profile of the South Carolina Graduate", () => {
    expect(guidePath.competencies(sc)).toBe("/guides/south-carolina/graduate-profile/");
    expect(guidePath.assessment(sc)).toBe("/guides/south-carolina/state-tests/");
    expect(g.assessment.grades).toEqual(["3", "4", "5", "6", "7", "8", "9"]);
    const tests = JSON.stringify(g.assessment);
    expect(tests).toContain("SC READY");
    expect(tests).toContain("SCPASS");
    expect(tests).not.toMatch(/ATLAS|ACAP|AASA|CAASPP|OSAS|WCAS|Smarter Balanced|MeCAS|STAAR|AK STAR|FAST|PSSA|CMAS|IAR|Milestones|ILEARN|NJSLA/);
    expect(g.competencies.items).toHaveLength(3);
    for (const item of g.competencies.items) {
      expect(item.parts.length, item.id).toBeGreaterThan(0);
      expect(item.atHome.length, item.id).toBeGreaterThan(0);
    }
  });

  it("is written in US English and never names another state", () => {
    const text = JSON.stringify(g);
    expect(text).not.toMatch(/practis|colour|neighbour|favour|centre|behaviour|Grade \d/);
    expect(text.replace(/George Washington/g, "")).not.toMatch(/Washington|Oregon|California|Maine|Texas|Alaska|Alabama|Arizona|Arkansas|Florida|Colorado|Illinois|Pennsylvania|Minnesota|Georgia|Indiana|North Carolina/);
  });
});
