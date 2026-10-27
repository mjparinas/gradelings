import { describe, expect, it } from "vitest";
import { guidesFor } from "@/content/guides";

// Alabama's guides: the hub, grade notes, the learning practices of the Alabama Course of Study and the ACAP state tests.
describe("Alabama parent guides", () => {
  const g = guidesFor("us-al");

  it("covers ACAP in grades 2 to 8, science in grades 4, 6 and 8, the four levels and the 3rd grade reading rule, with no dates", () => {
    expect(g.assessment.grades).toEqual(["2", "3", "4", "5", "6", "7", "8"]);
    const tests = JSON.stringify(g.assessment);
    expect(tests).toContain("Alabama Comprehensive Assessment Program");
    expect(tests).toMatch(/grades 2 to 8/);
    expect(tests).toMatch(/grades 4, 6 and 8/);
    expect(tests).toContain("Levels 3 and 4 count as proficient");
    expect(tests).toContain("ACAP Alternate");
    expect(tests).toContain("Alabama Literacy Act");
    expect(tests).not.toMatch(/STAAR|CAASPP|Smarter Balanced|OSAS|WCAS|OSPI|Regents|NYSED|\bTEA\b|\bCDE\b|\bODE\b/);
    expect(tests).not.toMatch(/\b(January|February|March|April|May|June)\b|20\d\d/);
  });

  it("explains the practices of each subject, with home activities", () => {
    expect(g.competencies.slug).toBe("learning-practices");
    expect(g.competencies.items.map((i) => i.name)).toEqual([
      "Student Mathematical Practices",
      "Science and engineering practices",
      "Recurring English language arts standards",
      "Social studies practices",
    ]);
    for (const item of g.competencies.items) {
      expect(item.parts.length, item.id).toBeGreaterThan(0);
      expect(item.atHome.length, item.id).toBeGreaterThan(0);
    }
  });

  it("follows the 2024 social studies sequence: Alabama history in Grades 3 to 5, world history in 7 to 9", () => {
    const notes = g.gradeNotes;
    expect(notes["3"]?.overview).toContain("Alabama history");
    expect(notes["4"]?.overview).toContain("statehood in 1819");
    expect(notes["5"]?.overview).toContain("Civil Rights Movement");
    expect(notes["6"]?.overview).toContain("Making a New Nation");
    expect(notes["7"]?.overview).toContain("world history");
    expect(notes["9"]?.overview).toContain("Age of Revolution");
    expect(notes["9"]?.overview).toContain("Geometry with Data Analysis");
  });

  it("never names another state's tests or a province", () => {
    const text = JSON.stringify(g);
    expect(text).not.toMatch(/[Pp]rovince/);
    expect(text).not.toMatch(/Washington|Oregon|California|New York|Texas|Minnesota/);
  });
});
