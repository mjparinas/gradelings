import { describe, expect, it } from "vitest";
import { guidePath } from "@/components/site/guides";
import { getFramework } from "@/content/frameworks";
import { guidesFor } from "@/content/guides";

// New York's guides: the hub, grade notes, NYSED's Social Emotional Learning Benchmarks and the grades 3-8 state tests.
describe("New York parent guides", () => {
  const ny = getFramework("us-ny");
  const g = guidesFor("us-ny");

  it("uses route folders that already exist, so launching needs no new route", () => {
    expect(guidePath.competencies(ny)).toBe("/guides/new-york/sel-standards/");
    expect(guidePath.assessment(ny)).toBe("/guides/new-york/state-tests/");
    const wa = guidesFor("us-wa");
    expect(g.competencies.slug).toBe(wa.competencies.slug);
    expect(g.assessment.slug).toBe(wa.assessment.slug);
  });

  it("covers the grades 3-8 tests, science in grades 5 and 8, Levels 1 to 4 and Regents, with no dates or opt-out claims", () => {
    expect(g.assessment.grades).toEqual(["3", "4", "5", "6", "7", "8"]);
    const tests = JSON.stringify(g.assessment);
    expect(tests).toMatch(/grades 3 to 8/);
    expect(tests).toMatch(/grades 5 and 8/);
    expect(tests).toMatch(/Level 3 means proficient/);
    expect(tests).toContain("Regents");
    expect(tests).toContain("Algebra I");
    expect(tests).toContain("WIDA ACCESS");
    expect(tests).toContain("www.nysed.gov/state-assessment");
    expect(tests).not.toMatch(/opt[- ]out|refus|exempt|CAASPP|Smarter Balanced|OSAS|WCAS|OSPI|\bCDE\b|\bODE\b/);
    expect(tests).not.toMatch(/\b(January|February|March|April|May|June)\b|20\d\d/);
  });

  it("explains NYSED's three SEL goals by grade band, not graded", () => {
    expect(g.competencies.slug).toBe("sel-standards");
    expect(JSON.stringify(g.competencies)).toMatch(/not graded/);
    expect(g.competencies.items.map((i) => i.name)).toEqual([
      "Self-awareness and self-management",
      "Social awareness and interpersonal skills",
      "Decision-making and responsible behavior",
    ]);
    for (const item of g.competencies.items) {
      expect(item.parts.length, item.id).toBeGreaterThan(0);
      expect(item.atHome.length, item.id).toBeGreaterThan(0);
    }
  });

  it("follows the New York social studies framework's grade themes and Algebra I", () => {
    const notes = g.gradeNotes;
    expect(notes.k?.overview).toContain("Self and Others");
    expect(notes["1"]?.overview).toContain("My Family and Other Families, Now and Long Ago");
    expect(notes["2"]?.overview).toContain("My Community and Other United States Communities");
    expect(notes["3"]?.overview).toContain("Communities around the World");
    expect(notes["4"]?.overview).toContain("Local History and Local Government");
    expect(notes["5"]?.overview).toContain("The Western Hemisphere");
    expect(notes["6"]?.overview).toContain("The Eastern Hemisphere");
    expect(notes["7"]?.overview).toContain("History of the United States and New York");
    expect(notes["9"]?.overview).toContain("Global History and Geography I");
    expect(notes["9"]?.overview).toContain("Algebra I");
  });

  it("never names another state's tests or a province", () => {
    const text = JSON.stringify(g);
    expect(text).not.toMatch(/[Pp]rovince/);
    expect(text).not.toMatch(/Washington|Oregon|California/);
  });
});
