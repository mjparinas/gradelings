import { describe, expect, it } from "vitest";
import { guidePath } from "@/components/site/guides";
import { getFramework } from "@/content/frameworks";
import { guidesFor } from "@/content/guides";

// Connecticut's guides: the hub, grade notes, the eight Standards for Mathematical Practice and the state tests
// (Smarter Balanced and the Next Generation Science Assessment).
describe("Connecticut parent guides", () => {
  const ct = getFramework("us-ct");
  const g = guidesFor("us-ct");

  it("covers Smarter Balanced and the science test, and the eight Mathematical Practices, which are not graded on their own", () => {
    expect(guidePath.competencies(ct)).toBe("/guides/connecticut/math-practices/");
    expect(guidePath.assessment(ct)).toBe("/guides/connecticut/state-tests/");
    expect(g.assessment.grades).toEqual(["3", "4", "5", "6", "7", "8"]);
    const tests = JSON.stringify(g.assessment);
    expect(tests).toContain("Smarter Balanced");
    expect(tests).toMatch(/Level 1 \(Not Met\), Level 2 \(Approaching\), Level 3 \(Met\) and Level 4 \(Exceeded\)/);
    expect(tests).toMatch(/grades 5, 8 and 11/);
    expect(tests).not.toMatch(/CAASPP|OSAS|WCAS|MeCAS|STAAR|AK STAR|Milestones|TCAP|LEAP|IAR/);
    expect(JSON.stringify(g.competencies)).toMatch(/not graded/);
    expect(g.competencies.items.map((i) => i.name.split(".")[0])).toEqual(["1", "2", "3", "4", "5", "6", "7", "8"]);
  });

  it("never names another state", () => {
    const text = JSON.stringify(g);
    expect(text).not.toMatch(/Washington(?! D)|Oregon|California|Maine|Texas|Alaska|Arizona|Ohio|Tennessee|Illinois|Louisiana/);
  });
});
