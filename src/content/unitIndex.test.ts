import { beforeAll, describe, expect, it } from "vitest";
import { practiceUnitRefs, loadGrade, unitIndexIn } from "@/content";
import { FRAMEWORKS } from "@/content/frameworks";
import { FREE_UNITS_PER_COURSE, unitOpen } from "@/lib/plan";
import { CORE_SUBJECTS } from "@/content/subjects";

const free = { plan: "trial" as const, trialEndsAt: 0, updatedAt: 1 };
// A few frameworks of each kind: BC, ones that adopt and add units, and a US state (localized units).
const sample = ["ca-bc", "ca-on", "ca-ab", "us-ca", "us-tx"].filter((id) => FRAMEWORKS.some((f) => f.id === id)) as (typeof FRAMEWORKS)[number]["id"][];

beforeAll(() => Promise.all(sample.map((f) => loadGrade("3", f))));

describe("the free plan's open units, counted in the child's own curriculum", () => {
  it.each(sample)("opens exactly the first units of each course in %s", (framework) => {
    for (const subject of CORE_SUBJECTS) {
      const refs = practiceUnitRefs("3", framework).filter((r) => r.course.subject === subject);
      if (!refs.length) continue;
      const open = refs.filter((r) => unitOpen(free, unitIndexIn(r, framework)));
      expect(open.map((r) => r.unit.id), `${framework} ${subject}`).toEqual(refs.slice(0, FREE_UNITS_PER_COURSE).map((r) => r.unit.id));
    }
  });
});
