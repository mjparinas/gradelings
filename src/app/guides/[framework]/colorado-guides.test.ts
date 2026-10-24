import { describe, expect, it } from "vitest";
import { allGuidePaths, guidePath } from "@/components/site/guides";
import { FRAMEWORKS, getFramework, UPCOMING_FRAMEWORKS } from "@/content/frameworks";
import { GUIDE_FRAMEWORKS, guidesFor } from "@/content/guides";

// Colorado's guides: the hub, grade notes, the Colorado Essential Skills and the state tests (CMAS, the PSAT and SAT,
// CoAlt, and the READ Act's reading checks).
describe("Colorado parent guides", () => {
  const co = getFramework("us-co");
  const g = guidesFor("us-co");

  it("is offered, so every Colorado guide page is built", () => {
    expect(FRAMEWORKS).toContain(co);
    expect(UPCOMING_FRAMEWORKS).not.toContain(co);
    expect(GUIDE_FRAMEWORKS).toContain(co);
    const paths = allGuidePaths().map((p) => p.path);
    for (const p of [guidePath.hub(co), guidePath.grade(co, "4"), "/guides/colorado/essential-skills/", "/guides/colorado/state-tests/"]) expect(paths, p).toContain(p);
  });

  it("has a note for every grade and no French guide", () => {
    expect(g.french).toBeUndefined();
    expect(co.grades).toEqual(["k", "1", "2", "3", "4", "5", "6", "7", "8", "9"]);
    for (const grade of co.grades) {
      expect(g.gradeNotes[grade]?.overview, grade).toBeTruthy();
      expect(g.gradeNotes[grade]?.lookFor, grade).toBeTruthy();
    }
  });

  it("covers CMAS and the READ Act, and the four groups of Essential Skills", () => {
    expect(guidePath.competencies(co)).toBe("/guides/colorado/essential-skills/");
    expect(guidePath.assessment(co)).toBe("/guides/colorado/state-tests/");
    expect(g.assessment.grades).toEqual(["3", "4", "5", "6", "7", "8"]);
    const tests = JSON.stringify(g.assessment);
    for (const name of ["CMAS", "READ Act", "PSAT", "SAT", "CoAlt"]) expect(tests).toContain(name);
    expect(tests).not.toMatch(/IAR|ATLAS|ACAP|AASA|CAASPP|OSAS|WCAS|Smarter Balanced|MeCAS|STAAR|AK STAR|FAST|PreACT/);
    expect(g.competencies.items.map((i) => i.name)).toEqual(["Communicators", "Problem Solvers", "Community Members", "Empowered Individuals"]);
    for (const item of g.competencies.items) {
      expect(item.parts.length, item.id).toBeGreaterThan(0);
      expect(item.atHome.length, item.id).toBeGreaterThan(0);
    }
  });

  it("is written in US English and never names another state", () => {
    const text = JSON.stringify(g);
    expect(text).not.toMatch(/practis|colour|neighbour|favour|centre|behaviour|Grade \d/);
    expect(text).not.toMatch(/Washington|Oregon|California|Maine|Texas|Alaska|Alabama|Arizona|Arkansas|Florida|Illinois|ISBE|ALSDE|DESE/);
  });
});
