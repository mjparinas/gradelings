import { describe, expect, it } from "vitest";
import { FRAMEWORKS, getFramework, type Framework } from "@/content/frameworks";
import type { GradeId, SubjectId } from "@/content/types";
import { byCountry, kidPracticeSteps, offersUsd, provinceCoverage, regionList, regionSummary, regionWord, subjectList } from "./provinces";

describe("homepage province coverage", () => {
  it("names shared subjects once and keeps proper nouns", () => {
    expect(subjectList(["math", "language", "science", "social"])).toBe("math, English language arts, science and social studies");
    expect(subjectList(["immersion", "core-french"])).toBe("French Immersion and Core French");
    expect(subjectList(["math"])).toBe("math");
  });

  it("states the subjects every province shares, and which provinces are without French Immersion", () => {
    const coverage = provinceCoverage(FRAMEWORKS.filter((f) => f.country === "CA"));
    // Every province has Core French; Newfoundland and Labrador, Prince Edward Island and Nunavut have no French Immersion.
    expect(coverage.sharedSubjects).toEqual(["math", "language", "science", "social", "core-french"]);
    expect(coverage.range).toEqual({ from: "k", to: "9" });
    expect(coverage.gaps).toHaveLength(1);
    const [immersion] = coverage.gaps;
    expect(immersion.subjects).toEqual(["immersion"]);
    expect(immersion.style).toBe("except");
    expect(immersion.missing.map((f) => f.id)).toEqual(["ca-nl", "ca-pe", "ca-nu"]);
    expect(immersion.included.map((f) => f.id)).toEqual(FRAMEWORKS.filter((f) => f.country === "CA" && !["ca-nl", "ca-pe", "ca-nu"].includes(f.id)).map((f) => f.id));
  });

  it("keeps the shared grade range and core subjects once a US state is offered, and French as a gap", () => {
    const coverage = provinceCoverage(FRAMEWORKS);
    expect(coverage.range).toEqual({ from: "k", to: "9" });
    expect(coverage.sharedSubjects).toEqual(["math", "language", "science", "social"]);
    for (const gap of coverage.gaps) expect(gap.missing.map((f) => f.id)).toContain("us-wa");
  });

  it("names the province that has a subject when most provinces do not", () => {
    const bc = getFramework("ca-bc");
    const sk = withSubjects(getFramework("ca-sk"), ["math", "language", "science", "social"]);
    const ab = withSubjects(getFramework("ca-ab"), ["math", "language", "science", "social"]);
    const coverage = provinceCoverage([bc, sk, ab]);
    expect(coverage.gaps).toEqual([
      expect.objectContaining({
        subjects: ["immersion", "core-french"],
        style: "only",
        included: [bc],
        missing: [sk, ab],
      }),
    ]);
  });

  it("names every province, with 'the' before the Northwest Territories", () => {
    const list = regionList(FRAMEWORKS);
    expect(list).toBe(`${FRAMEWORKS.slice(0, -1).map((f) => (f.id === "ca-nt" ? "the " : "") + f.region).join(", ")} and ${FRAMEWORKS[FRAMEWORKS.length - 1].region}`);
    expect(list).toContain("the Northwest Territories");
  });

  it("shows the kid steps every province shares, not one province's report-card words", () => {
    const steps = kidPracticeSteps(FRAMEWORKS);
    expect(steps.map((s) => s.kidLabel)).toEqual(["Seedling", "Sprout", "Tree", "Star"]);
    expect(steps.map((s) => s.icon)).toEqual(["🌱", "🌿", "🌳", "⭐"]);
    for (const step of steps) expect(step.atHome).not.toMatch(/Level \d|Emerging|Proficient|Extending|Meeting|British Columbia/);
    expect(steps[2]?.atHome).toMatch(/Mixed review/);
    for (const f of FRAMEWORKS) {
      expect(f.scoringFor("3").levels.map((l) => l.kidLabel)).toEqual(steps.map((s) => s.kidLabel));
    }
  });

  it("starts the shared range at Kindergarten until every province teaches Pre-K", () => {
    const bc = withGrades(getFramework("ca-bc"), ["pk", "k", "1", "2"]);
    const on = withGrades(getFramework("ca-on"), ["k", "1", "2"]);
    expect(provinceCoverage([bc, on]).range).toEqual({ from: "k", to: "2" });
    expect(provinceCoverage([bc, withGrades(on, ["pk", "k", "1", "2"])]).range).toEqual({ from: "pk", to: "2" });
  });

  it("leaves the grade range unset when provinces don't share one", () => {
    const bc = withGrades(getFramework("ca-bc"), ["k", "1"]);
    const on = withGrades(getFramework("ca-on"), ["1", "2", "3"]);
    expect(provinceCoverage([bc, on]).range).toBeNull();
  });
});

function withSubjects(framework: Framework, subjects: SubjectId[]): Framework {
  return { ...framework, subjects };
}

function withGrades(framework: Framework, grades: GradeId[]): Framework {
  return { ...framework, grades };
}

describe("provinces and states in marketing copy", () => {
  const ca = FRAMEWORKS.filter((f) => f.country === "CA");
  const wa = getFramework("us-wa");

  it("groups Canadian provinces first, then US states, and leaves out empty groups", () => {
    expect(byCountry(ca).map((g) => g.heading)).toEqual(["Canada"]);
    const groups = byCountry([wa, ...ca]);
    expect(groups.map((g) => g.heading)).toEqual(["Canada", "United States"]);
    expect(groups[1].frameworks).toEqual([wa]);
    expect(groups[0].frameworks).toEqual(ca);
  });

  it("names the regions, adding states once one is offered", () => {
    expect(regionSummary(ca)).toBe(`${ca.length} provinces and territories`);
    expect(regionSummary([...ca, wa])).toBe(`${ca.length} Canadian provinces and territories and Washington State`);
    const or = getFramework("us-or");
    expect(regionSummary([...ca, wa, or])).toBe(`${ca.length} Canadian provinces and territories, plus Washington and Oregon`);
    expect(regionSummary([wa, or])).toBe("Washington and Oregon");
    expect(regionSummary([...ca, wa, or, wa, or, wa])).toBe(`${ca.length} Canadian provinces and territories and 5 US states`);
    // Washington, DC is a district, so it is named after the states, not counted as one.
    const dc = getFramework("us-dc");
    expect(regionSummary([...ca, wa, or, wa, or, dc])).toBe(`${ca.length} Canadian provinces and territories, 4 US states and Washington, DC`);
    expect(regionWord(ca)).toBe("province");
    expect(regionWord([...ca, wa])).toBe("province or state");
    expect(offersUsd(ca)).toBe(false);
    expect(offersUsd([...ca, wa])).toBe(true);
  });

  it("offers every US state on the public site, grouped after the provinces", () => {
    const us = FRAMEWORKS.filter((f) => f.country === "US");
    const states = us.filter((f) => f.regionKind !== "district");
    const districts = us.filter((f) => f.regionKind === "district").map((f) => f.region);
    expect(states.length).toBeGreaterThan(0);
    expect(byCountry(FRAMEWORKS).map((g) => g.country)).toEqual(["CA", "US"]);
    const named = [`${states.length} US states`, ...districts];
    expect(regionSummary(FRAMEWORKS)).toBe(
      districts.length
        ? `${FRAMEWORKS.length - us.length} Canadian provinces and territories, ${named.slice(0, -1).join(", ")} and ${named.at(-1)}`
        : `${FRAMEWORKS.length - us.length} Canadian provinces and territories and ${named[0]}`,
    );
  });
});
