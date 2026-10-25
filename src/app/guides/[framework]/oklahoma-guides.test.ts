import { describe, expect, it } from "vitest";
import { allGuidePaths, guidePath } from "@/components/site/guides";
import { FRAMEWORKS, getFramework, UPCOMING_FRAMEWORKS } from "@/content/frameworks";
import { GUIDE_FRAMEWORKS, guidesFor } from "@/content/guides";

// Oklahoma's guides: the hub, grade notes, the seven Mathematical Actions and Processes and the state tests (OSTP and
// the Strong Readers Act).
describe("Oklahoma parent guides", () => {
  const ok = getFramework("us-ok");
  const g = guidesFor("us-ok");

  it("is offered, so every Oklahoma guide page is built", () => {
    expect(FRAMEWORKS).toContain(ok);
    expect(UPCOMING_FRAMEWORKS).not.toContain(ok);
    expect(GUIDE_FRAMEWORKS).toContain(ok);
    const paths = allGuidePaths().map((p) => p.path);
    for (const p of [guidePath.hub(ok), guidePath.grade(ok, "5"), "/guides/oklahoma/math-actions/", "/guides/oklahoma/state-tests/"]) expect(paths, p).toContain(p);
  });

  it("has a note for every grade and no French guide", () => {
    expect(g.french).toBeUndefined();
    expect(ok.grades).toEqual(["k", "1", "2", "3", "4", "5", "6", "7", "8", "9"]);
    for (const grade of ok.grades) {
      expect(g.gradeNotes[grade]?.overview, grade).toBeTruthy();
      expect(g.gradeNotes[grade]?.lookFor, grade).toBeTruthy();
    }
  });

  it("covers OSTP and the Strong Readers Act, and the seven Mathematical Actions and Processes, which are not graded on their own", () => {
    expect(guidePath.competencies(ok)).toBe("/guides/oklahoma/math-actions/");
    expect(guidePath.assessment(ok)).toBe("/guides/oklahoma/state-tests/");
    expect(g.assessment.grades).toEqual(["3", "4", "5", "6", "7", "8"]);
    const tests = JSON.stringify(g.assessment);
    expect(tests).toContain("OSTP");
    expect(tests).toContain("Strong Readers Act");
    expect(tests).toMatch(/science in grades 5 and 8/);
    expect(tests).not.toMatch(/TCAP|CAASPP|OSAS|STAAR|Milestones|M-STEP/);
    expect(JSON.stringify(g.competencies)).toMatch(/not graded/);
    expect(g.competencies.items.map((i) => i.name.split(".")[0])).toEqual(["1", "2", "3", "4", "5", "6", "7"]);
  });

  it("is written in US English and never names another state", () => {
    const text = JSON.stringify(g);
    expect(text).not.toMatch(/practis|colour|neighbour|favour|centre|behaviour|Grade \d/);
    expect(text).not.toMatch(/Washington(?! D)|Oregon|California|Texas|Tennessee|Kansas|Arkansas/);
  });
});
