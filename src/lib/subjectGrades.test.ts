import { beforeAll, describe, expect, it } from "vitest";
import { allUnitRefs, coursesForGrade, loadGrade, practiceCourses, practiceUnitRefs } from "@/content";
import { getFramework } from "@/content/frameworks";
import type { GradeId } from "@/content/types";
import { candidates, type PickOptions } from "./adaptive";
import { derive, type Derived } from "./derive";
import { buildReport } from "./reports";
import { canSetSubjectGrade, practiceTargets, setSubjectGrade, shiftSubjectGrades, subjectGradeFor, subjectGradesFor } from "./subjectGrades";

beforeAll(async () => {
  await Promise.all([loadGrade("3"), loadGrade("4"), loadGrade("5")]);
});

const child = { grade: "4" as GradeId, framework: "ca-bc" as const };
const BC_GRADES = getFramework("ca-bc").grades;

describe("subjectGradesFor", () => {
  it("keeps only core subjects set to another grade the curriculum has", () => {
    expect(subjectGradesFor(child, undefined)).toEqual({});
    expect(subjectGradesFor(child, { subjectGrades: { math: "3", language: "4" } })).toEqual({ math: "3" });
    // French is never moved, and a grade the curriculum doesn't have is ignored.
    expect(subjectGradesFor(child, { subjectGrades: { immersion: "3", science: "12" as GradeId } })).toEqual({});
    expect(canSetSubjectGrade("math")).toBe(true);
    expect(canSetSubjectGrade("core-french")).toBe(false);
  });

  it("gives the child's own grade for subjects that aren't set", () => {
    const settings = { subjectGrades: { math: "5" as GradeId } };
    expect(subjectGradeFor(child, settings, "math")).toBe("5");
    expect(subjectGradeFor(child, settings, "language")).toBe("4");
  });
});

describe("setSubjectGrade", () => {
  it("sets one subject, and the child's own grade clears it", () => {
    const set = setSubjectGrade(child, { subjectGrades: { language: "5" } }, "math", "3");
    expect(set).toEqual({ subjectGrades: { language: "5", math: "3" } });
    expect(setSubjectGrade(child, set, "math", "4")).toEqual({ subjectGrades: { language: "5" } });
  });
});

describe("shiftSubjectGrades", () => {
  it("keeps a subject the same distance from the child's grade when the child moves up", () => {
    expect(shiftSubjectGrades({ subjectGrades: { math: "5", language: "3" } }, "4", "5", BC_GRADES)).toEqual({ subjectGrades: { math: "6", language: "4" } });
  });

  it("drops a subject that lands on the new grade or runs off the end", () => {
    expect(shiftSubjectGrades({ subjectGrades: { math: "5" } }, "4", "3", BC_GRADES)).toEqual({ subjectGrades: { math: "4" } });
    expect(shiftSubjectGrades({ subjectGrades: { math: "9" } }, "8", "9", BC_GRADES)).toEqual({ subjectGrades: {} });
    expect(shiftSubjectGrades({ subjectGrades: { math: "3" } }, "4", "5", ["5", "6"] as GradeId[])).toEqual({ subjectGrades: {} });
  });

  it("changes nothing when there is nothing set or the grade stays", () => {
    expect(shiftSubjectGrades(undefined, "4", "5", BC_GRADES)).toBeUndefined();
    expect(shiftSubjectGrades({ subjectGrades: { math: "5" } }, "4", "4", BC_GRADES)).toBeUndefined();
  });
});

describe("practiceTargets", () => {
  it("downloads the child's grade first, then each other grade once", () => {
    expect(practiceTargets(child, { subjectGrades: { math: "5", language: "5", science: "3" } })).toEqual([
      { grade: "4", framework: "ca-bc" },
      { grade: "3", framework: "ca-bc" },
      { grade: "5", framework: "ca-bc" },
    ]);
  });
});

describe("practice courses", () => {
  it("takes a set subject from its grade and the rest from the child's own", () => {
    const courses = practiceCourses("4", "ca-bc", { math: "3" });
    expect(courses.map((c) => c.subject)).toEqual(coursesForGrade("4", "ca-bc").map((c) => c.subject));
    expect(courses.find((c) => c.subject === "math")?.grade).toBe("3");
    expect(courses.find((c) => c.subject === "language")?.grade).toBe("4");
  });

  it("stays on the child's grade while the other grade isn't downloaded", () => {
    expect(practiceCourses("4", "ca-bc", { math: "8" }).find((c) => c.subject === "math")?.grade).toBe("4");
  });

  it("lists units by the grade they come from, so progress counts there", () => {
    const refs = practiceUnitRefs("4", "ca-bc", { math: "5" });
    const math = refs.filter((r) => r.course.subject === "math");
    expect(math.length).toBeGreaterThan(0);
    expect(math.every((r) => r.key.startsWith("5/math/"))).toBe(true);
    expect(refs.filter((r) => r.course.subject === "science").every((r) => r.key.startsWith("4/science/"))).toBe(true);
    expect(practiceUnitRefs("4", "ca-bc")).toEqual(allUnitRefs("4", "ca-bc"));
  });
});

describe("Adventure and reports", () => {
  const derived = { units: {} } as unknown as Derived;

  it("picks a set subject's units from its grade", () => {
    const opts: PickOptions = { grade: "4", framework: "ca-bc", subjectGrades: { math: "3" }, derived, subjects: ["math", "language"], recent: [], mode: "adventure" };
    const keys = candidates(opts).map((r) => r.key);
    expect(keys.some((k) => k.startsWith("3/math/"))).toBe(true);
    expect(keys.some((k) => k.startsWith("4/math/"))).toBe(false);
    expect(keys.some((k) => k.startsWith("4/language/"))).toBe(true);
  });

  it("reports the set grade's units, plus own-grade units already started", () => {
    const own = allUnitRefs("4", "ca-bc").find((r) => r.course.subject === "math")!;
    const empty = derive([], Date.now());
    const started = { ...empty, units: { [own.key]: { attempts: 3, mastery: 0.5, lastT: 1, recent: [true, false, true] } } } as unknown as Derived;
    const keys = buildReport([], started, "4", "ca-bc", 7, Date.now(), { math: "3" }).units.map((u) => u.ref.key);
    expect(keys.some((k) => k.startsWith("3/math/"))).toBe(true);
    expect(keys).toContain(own.key);
    expect(keys.filter((k) => k.startsWith("4/math/"))).toEqual([own.key]);
  });
});
