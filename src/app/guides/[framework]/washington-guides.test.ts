import { describe, expect, it } from "vitest";
import { allGuidePaths, guidePath } from "@/components/site/guides";
import { getFramework } from "@/content/frameworks";
import { GUIDE_FRAMEWORKS, guidesFor } from "@/content/guides";
import { HELP } from "@/app/help/faqs";

// Washington is the first framework with no French and no province-only pages: its guides are the hub, grade notes,
// OSPI's Social Emotional Learning standards and the state tests (Smarter Balanced and WCAS).
describe("Washington parent guides", () => {
  const wa = getFramework("us-wa");
  const g = guidesFor("us-wa");

  it("has guides, with a note for every grade and no French guide", () => {
    expect(GUIDE_FRAMEWORKS).toContain(wa);
    expect(g.french).toBeUndefined();
    for (const grade of wa.grades) expect(g.gradeNotes[grade]?.overview, grade).toBeTruthy();
  });

  it("serves the SEL standards and the state tests at their own URLs, and no French page", () => {
    expect(guidePath.competencies(wa)).toBe("/guides/washington/sel-standards/");
    expect(guidePath.assessment(wa)).toBe("/guides/washington/state-tests/");
    const paths = allGuidePaths().map((p) => p.path);
    expect(paths).toContain("/guides/washington/");
    expect(paths).toContain("/guides/washington/sel-standards/");
    expect(paths).toContain("/guides/washington/state-tests/");
    expect(paths).toContain("/guides/washington/grade-4/math/worksheet/");
    expect(paths).not.toContain("/guides/washington/french/");
  });

  it("covers Smarter Balanced in grades 3 to 8, and OSPI's six SEL standards", () => {
    expect(g.assessment.grades).toEqual(["3", "4", "5", "6", "7", "8"]);
    expect(g.assessment.name).toMatch(/Smarter Balanced/);
    expect(g.assessment.name).toMatch(/WCAS/);
    expect(g.competencies.items.map((i) => i.name)).toEqual(["Self-Awareness", "Self-Management", "Self-Efficacy", "Social Awareness", "Social Management", "Social Engagement"]);
  });

  it("is written in US English", () => {
    const text = JSON.stringify(g);
    expect(text).not.toMatch(/practis|colour|neighbour|favour|centre|Grade \\d/);
  });

  it("tells US families about US dollars and US spelling in the help answers", () => {
    const text = JSON.stringify(HELP);
    expect(text).toContain("US$14.99/month");
    expect(text).toContain("Washington");
  });
});
