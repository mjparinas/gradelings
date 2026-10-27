import { describe, expect, it } from "vitest";
import { guidePath } from "@/components/site/guides";
import { getFramework } from "@/content/frameworks";
import { guidesFor } from "@/content/guides";

// Oklahoma's guides: the hub, grade notes, the seven Mathematical Actions and Processes and the state tests (OSTP and
// the Strong Readers Act).
describe("Oklahoma parent guides", () => {
  const ok = getFramework("us-ok");
  const g = guidesFor("us-ok");

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

  it("never names another state", () => {
    const text = JSON.stringify(g);
    expect(text).not.toMatch(/Washington(?! D)|Oregon|California|Texas|Tennessee|Kansas|Arkansas/);
  });
});
