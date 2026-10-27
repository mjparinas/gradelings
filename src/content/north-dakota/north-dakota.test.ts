import { describe, expect, it } from "vitest";
import { COURSES } from "../all";
import { FRAMEWORKS, getFramework, UPCOMING_FRAMEWORKS } from "../frameworks";
import { localeOf } from "../locale";

// North Dakota's citations, own units, plan, other states' places and borrowed Tribal units are checked by the
// framework and country contracts (src/content/contract.test.ts, with ./contract.ts). This file keeps what is North
// Dakota's alone.

/** Every North Dakota unit with its course. */
const northDakota = COURSES.flatMap((c) =>
  c.units.filter((u) => u.standards["us-nd"]).map((u) => ({ c, u, key: `${c.grade}/${c.subject}/${u.id}` })),
);
const codesOf = (s: string) => s.split(" · ")[0].split("; ");
const social = (grade: string) => northDakota.filter(({ c }) => c.grade === grade && c.subject === "social").map(({ u }) => u.id);

describe("North Dakota", () => {
  it("is a US framework in US English, offered to families", () => {
    const nd = getFramework("north-dakota");
    expect(nd.id).toBe("us-nd");
    expect(nd.country).toBe("US");
    expect(localeOf(nd)).toBe("en-US");
    expect(nd.scoringFor("4").levels.map((l) => l.label)).toEqual(["Beginning", "Approaching", "Meeting", "Exceeding"]);
    expect(FRAMEWORKS).toContain(nd);
    expect(UPCOMING_FRAMEWORKS).not.toContain(nd);
  });

  it("teaches North Dakota studies in 4th and 8th grade, as state law (NDCC 15.1-21-01) requires", () => {
    expect(social("4").filter((id) => id.startsWith("nd-")).length).toBeGreaterThanOrEqual(8);
    expect(social("8").filter((id) => id.startsWith("nd-")).length).toBeGreaterThanOrEqual(5);
    // Every North Dakota studies benchmark of the 6-12 band is practised by a Grade 8 North Dakota unit.
    const cited = new Set(northDakota.filter(({ c, u }) => c.grade === "8" && u.id.startsWith("nd-")).flatMap(({ u }) => codesOf(u.standards["us-nd"]!)));
    for (const code of ["ND.6_12.1.1", "ND.6_12.1.2", "ND.6_12.1.3", "ND.6_12.2.1", "ND.6_12.2.2", "ND.6_12.2.3", "ND.6_12.3.1", "ND.6_12.3.2", "ND.6_12.4.1", "ND.6_12.4.2", "ND.6_12.4.3", "ND.6_12.4.4", "ND.6_12.4.5"]) {
      expect(cited.has(code), code).toBe(true);
    }
  });

  it("practises the North Dakota Native American Essential Understandings and tribal governments in its own units", () => {
    const own = (code: string) => northDakota.some(({ u }) => u.id.startsWith("nd-") && codesOf(u.standards["us-nd"]!).includes(code));
    for (const code of ["H.3_5.3", "ND.6_12.2.1", "ND.6_12.4.4", "C.6_12.2.5"]) expect(own(code), code).toBe(true);
  });

  it("follows the grade themes of the North Dakota Social Studies Standards", () => {
    expect(social("5")).toEqual(expect.arrayContaining(["nd-g5-explorers", "wa-g5-thirteen-colonies", "ca-g5-revolution", "wa-g5-constitution"]));
    expect(social("6")).toEqual(expect.arrayContaining(["first-farmers", "wa-g6-greece-rome", "medieval-europe", "renaissance-and-reformation"]));
    expect(social("7")).toEqual(expect.arrayContaining(["or-g6-world-maps", "ga-g7-africa", "ga-g7-population"]));
    expect(social("8")).toEqual(expect.arrayContaining(["ca-g8-revolutionary-ideas", "ca-g8-civil-war", "or-g8-reconstruction"]));
    expect(social("9")).toEqual(expect.arrayContaining(["nd-g9-governing-north-dakota", "nd-g9-personal-finance", "ca-g9-three-branches"]));
  });

  it("cites North Dakota's 2023 math and English language arts codes, not the Common Core's", () => {
    for (const { c, u, key } of northDakota.filter(({ c }) => c.subject === "math" || c.subject === "language")) {
      for (const code of codesOf(u.standards["us-nd"]!)) {
        expect(code, key).not.toMatch(/^(RL|RI|RF|SL)\.|^[K1-8]\.(OA|NBT|NF|MD|RP|NS|EE|SP)\./);
      }
      expect(c.subject).toMatch(/math|language/);
    }
  });

  it("cites science with North Dakota's ET codes and without the performance expectations North Dakota left out", () => {
    const science = northDakota.filter(({ c }) => c.subject === "science").flatMap(({ u }) => codesOf(u.standards["us-nd"]!));
    expect(science.some((code) => /ETS/.test(code))).toBe(false);
    for (const code of ["4-PS4-2", "MS-LS1-8", "HS-PS4-5", "HS-LS2-6", "3-LS4-4"]) expect(science).not.toContain(code);
  });
});
