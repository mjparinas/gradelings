import { describe, expect, it } from "vitest";
import { COURSES } from "../all";

// Iowa's citations, own units, plan and US rules are checked by the framework and country contracts
// (src/content/contract.test.ts, with ./contract.ts). This file keeps what is Iowa's alone.

/** Every Iowa unit with its course. */
const iowa = COURSES.flatMap((c) =>
  c.units.filter((u) => u.standards["us-ia"]).map((u) => ({ c, u, key: `${c.grade}/${c.subject}/${u.id}` })),
);

describe("Iowa", () => {
  it("teaches Iowa studies in its own units", () => {
    const own = iowa.filter(({ u }) => u.id.startsWith("ia-"));
    expect(own.map(({ u }) => u.id)).toEqual(
      expect.arrayContaining([
        "ia-k-rules-here-and-there",
        "ia-g1-iowa-places",
        "ia-g2-native-nations",
        "ia-g2-iowa-unique",
        "ia-g4-settling-iowa",
        "ia-g4-immigrants",
        "ia-g5-iowa-and-change",
        "ia-g7-iowa-in-the-world",
        "ia-g8-iowa-and-the-nation",
        "ia-g9-governing-iowa",
      ]),
    );
  });

  it("teaches Iowa as our state in 2nd grade, settling Iowa in 4th and governing Iowa in 9th", () => {
    const social = (grade: string) => iowa.filter(({ c }) => c.grade === grade && c.subject === "social").map(({ u }) => u.id);
    expect(social("2")).toEqual(expect.arrayContaining(["ia-g2-native-nations", "ia-g2-iowa-communities", "ia-g2-iowa-unique"]));
    expect(social("4")).toEqual(expect.arrayContaining(["ia-g4-settling-iowa", "ia-g4-immigrants"]));
    expect(social("8")).toContain("ia-g8-iowa-and-the-nation");
    expect(social("9")).toEqual(expect.arrayContaining(["ia-g9-governing-iowa", "ia-g9-us-government", "ia-g9-personal-finance"]));
  });

  it("places each middle school science unit in the grade its Iowa code names", () => {
    for (const { c, u, key } of iowa.filter(({ c }) => c.subject === "science" && ["6", "7", "8"].includes(c.grade))) {
      const codes = (u.standards["us-ia"] ?? "").split(" · ")[0].split("; ");
      for (const code of codes) expect(code.startsWith(`${c.grade}-`), `${key} cites ${code}`).toBe(true);
    }
  });
});
