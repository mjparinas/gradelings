import { describe, expect, it } from "vitest";
import { allGuidePaths, guidePath } from "@/components/site/guides";
import { FRAMEWORKS, getFramework, UPCOMING_FRAMEWORKS } from "@/content/frameworks";
import { GUIDE_FRAMEWORKS, guidesFor } from "@/content/guides";

// Texas's guides: the hub, grade notes, the TEKS process skills and the STAAR state tests.
describe("Texas parent guides", () => {
  const tx = getFramework("us-tx");
  const g = guidesFor("us-tx");

  it("is offered, so every Texas guide page is built", () => {
    expect(FRAMEWORKS).toContain(tx);
    expect(UPCOMING_FRAMEWORKS).not.toContain(tx);
    expect(GUIDE_FRAMEWORKS).toContain(tx);
    const paths = allGuidePaths().map((p) => p.path);
    for (const p of [guidePath.hub(tx), guidePath.grade(tx, "4"), "/guides/texas/process-skills/", "/guides/texas/state-tests/"]) expect(paths, p).toContain(p);
  });

  it("has a note for every grade and no French guide", () => {
    expect(g.french).toBeUndefined();
    expect(tx.grades).toEqual(["k", "1", "2", "3", "4", "5", "6", "7", "8", "9"]);
    for (const grade of tx.grades) {
      expect(g.gradeNotes[grade]?.overview, grade).toBeTruthy();
      expect(g.gradeNotes[grade]?.lookFor, grade).toBeTruthy();
    }
  });

  it("covers STAAR and the move to three tests a year, and the TEKS process skills", () => {
    expect(guidePath.competencies(tx)).toBe("/guides/texas/process-skills/");
    expect(guidePath.assessment(tx)).toBe("/guides/texas/state-tests/");
    expect(g.assessment.grades).toEqual(["3", "4", "5", "6", "7", "8"]);
    expect(g.assessment.name).toMatch(/STAAR/);
    const tests = JSON.stringify(g.assessment);
    expect(tests).toContain("House Bill 8");
    expect(tests).toContain("2027–28");
    expect(tests).toMatch(/science in grades 5 and 8, social studies in grade 8/);
    expect(tests).not.toMatch(/CAASPP|OSAS|WCAS|Smarter Balanced/);
    expect(g.competencies.items.map((i) => i.id)).toEqual(["math-processes", "science-practices", "reading-inquiry", "social-studies-skills"]);
    for (const item of g.competencies.items) {
      expect(item.parts.length, item.id).toBeGreaterThan(0);
      expect(item.atHome.length, item.id).toBeGreaterThan(0);
    }
  });

  it("is written in US English and never names another state", () => {
    const text = JSON.stringify(g);
    expect(text).not.toMatch(/practis|colour|neighbour|favour|centre|behaviour|Grade \d/);
    expect(text).not.toMatch(/Washington|Oregon|California/);
  });
});
