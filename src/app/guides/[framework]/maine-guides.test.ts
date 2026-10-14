import { describe, expect, it } from "vitest";
import { allGuidePaths, guidePath } from "@/components/site/guides";
import { FRAMEWORKS, getFramework, UPCOMING_FRAMEWORKS } from "@/content/frameworks";
import { GUIDE_FRAMEWORKS, guidesFor } from "@/content/guides";

// Maine's guides: the hub, grade notes, the five Guiding Principles of the Maine Learning Results and the MeCAS state
// tests (the Maine Through Year Assessment and the Maine Science Assessment).
describe("Maine parent guides", () => {
  const me = getFramework("us-me");
  const g = guidesFor("us-me");

  it("is offered, so every Maine guide page is built", () => {
    expect(FRAMEWORKS).toContain(me);
    expect(UPCOMING_FRAMEWORKS).not.toContain(me);
    expect(GUIDE_FRAMEWORKS).toContain(me);
    const paths = allGuidePaths().map((p) => p.path);
    for (const p of [guidePath.hub(me), guidePath.grade(me, "4"), "/guides/maine/guiding-principles/", "/guides/maine/state-tests/"]) expect(paths, p).toContain(p);
  });

  it("has a note for every grade and no French guide", () => {
    expect(g.french).toBeUndefined();
    expect(me.grades).toEqual(["k", "1", "2", "3", "4", "5", "6", "7", "8", "9"]);
    for (const grade of me.grades) {
      expect(g.gradeNotes[grade]?.overview, grade).toBeTruthy();
      expect(g.gradeNotes[grade]?.lookFor, grade).toBeTruthy();
    }
  });

  it("covers the Through Year and science assessments, and the five Guiding Principles, not graded on their own", () => {
    expect(guidePath.competencies(me)).toBe("/guides/maine/guiding-principles/");
    expect(guidePath.assessment(me)).toBe("/guides/maine/state-tests/");
    expect(g.assessment.grades).toEqual(["3", "4", "5", "6", "7", "8"]);
    const tests = JSON.stringify(g.assessment);
    expect(tests).toContain("Maine Through Year Assessment");
    expect(tests).toContain("Maine Science Assessment");
    expect(tests).toMatch(/grades 5 and 8/);
    expect(tests).not.toMatch(/CAASPP|OSAS|WCAS|Smarter Balanced/);
    expect(JSON.stringify(g.competencies)).toMatch(/not usually graded/);
    expect(g.competencies.items.map((i) => i.name)).toEqual([
      "Clear and Effective Communicator",
      "Self-Directed and Lifelong Learner",
      "Creative and Practical Problem Solver",
      "Responsible and Involved Citizen",
      "Integrative and Informed Thinker",
    ]);
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
