import { describe, expect, it } from "vitest";
import { guidePath } from "@/components/site/guides";
import { getFramework } from "@/content/frameworks";
import { guidesFor } from "@/content/guides";

// Arizona's guides: the hub, grade notes, the eight Standards for Mathematical Practice and the state tests (AASA, AzSCI
// and ACT Aspire).
describe("Arizona parent guides", () => {
  const az = getFramework("us-az");
  const g = guidesFor("us-az");

  it("covers AASA, AzSCI and ACT Aspire, and the eight Mathematical Practices, which are not graded on their own", () => {
    expect(guidePath.competencies(az)).toBe("/guides/arizona/math-practices/");
    expect(guidePath.assessment(az)).toBe("/guides/arizona/state-tests/");
    expect(g.assessment.grades).toEqual(["3", "4", "5", "6", "7", "8", "9"]);
    const tests = JSON.stringify(g.assessment);
    expect(tests).toContain("AASA");
    expect(tests).toContain("AzSCI");
    expect(tests).toContain("ACT Aspire");
    expect(tests).toMatch(/grades 5, 8 and 11/);
    expect(tests).not.toMatch(/CAASPP|OSAS|WCAS|Smarter Balanced|MeCAS|STAAR|AK STAR/);
    expect(JSON.stringify(g.competencies)).toMatch(/not graded/);
    expect(g.competencies.items.map((i) => i.name.split(".")[0])).toEqual(["1", "2", "3", "4", "5", "6", "7", "8"]);
    for (const item of g.competencies.items) {
      expect(item.parts.length, item.id).toBeGreaterThan(0);
      expect(item.atHome.length, item.id).toBeGreaterThan(0);
    }
  });

  it("never names another state", () => {
    const text = JSON.stringify(g);
    expect(text).not.toMatch(/Washington|Oregon|California|Maine|Texas|Alaska/);
  });
});
