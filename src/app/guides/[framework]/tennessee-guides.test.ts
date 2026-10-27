import { describe, expect, it } from "vitest";
import { guidePath } from "@/components/site/guides";
import { getFramework } from "@/content/frameworks";
import { guidesFor } from "@/content/guides";

// Tennessee's guides: the hub, grade notes, the eight Standards for Mathematical Practice and the state tests (TCAP and
// the 3rd grade promotion law).
describe("Tennessee parent guides", () => {
  const tn = getFramework("us-tn");
  const g = guidesFor("us-tn");

  it("covers TCAP and the 3rd grade law, and the eight Mathematical Practices, which are not graded on their own", () => {
    expect(guidePath.competencies(tn)).toBe("/guides/tennessee/math-practices/");
    expect(guidePath.assessment(tn)).toBe("/guides/tennessee/state-tests/");
    expect(g.assessment.grades).toEqual(["3", "4", "5", "6", "7", "8"]);
    const tests = JSON.stringify(g.assessment);
    expect(tests).toContain("TCAP");
    expect(tests).toContain("49-6-3115");
    expect(tests).toMatch(/social studies in grades 6 to 8/);
    expect(tests).not.toMatch(/CAASPP|OSAS|WCAS|Smarter Balanced|MeCAS|STAAR|AK STAR|Milestones/);
    expect(JSON.stringify(g.competencies)).toMatch(/not graded/);
    expect(g.competencies.items.map((i) => i.name.split(".")[0])).toEqual(["1", "2", "3", "4", "5", "6", "7", "8"]);
  });

  it("never names another state", () => {
    const text = JSON.stringify(g);
    expect(text).not.toMatch(/Washington(?! D)|Oregon|California|Maine|Texas|Alaska|Arizona|Ohio/);
  });
});
