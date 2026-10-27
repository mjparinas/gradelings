import { describe, expect, it } from "vitest";
import { COURSES } from "../all";

// Idaho's citations, own units, plan and US rules are checked by the framework and country contracts
// (src/content/contract.test.ts, with ./contract.ts). This file keeps what is Idaho's alone.

/** Every Idaho unit with its course. */
const idaho = COURSES.flatMap((c) =>
  c.units.filter((u) => u.standards["us-id"]).map((u) => ({ c, u, key: `${c.grade}/${c.subject}/${u.id}` })),
);

describe("Idaho", () => {
  it("teaches Idaho studies in its own units", () => {
    const own = idaho.filter(({ u }) => u.id.startsWith("id-"));
    expect(own.map(({ u }) => u.id)).toEqual(
      expect.arrayContaining([
        "id-k-symbols-holidays",
        "id-g1-idaho-places",
        "id-g2-idaho-tribes",
        "id-g3-idaho-home",
        "id-g4-settling-idaho",
        "id-g5-public-lands",
        "id-g7-idaho-in-the-world",
        "id-g8-idaho-territory",
        "id-g9-governing-idaho",
      ]),
    );
  });

  it("teaches the five tribes in 2nd and 4th grade, Idaho's story in 4th and governing Idaho in 9th", () => {
    const social = (grade: string) => idaho.filter(({ c }) => c.grade === grade && c.subject === "social").map(({ u }) => u.id);
    expect(social("2")).toEqual(expect.arrayContaining(["id-g2-idaho-tribes", "id-g2-idaho-land", "id-g2-who-runs-idaho"]));
    // 4th grade social studies is Idaho history and government, so every unit is Idaho's own.
    expect(social("4").length).toBeGreaterThanOrEqual(5);
    expect(social("4").every((id) => id.startsWith("id-")), social("4").join(", ")).toBe(true);
    expect(social("4")).toEqual(expect.arrayContaining(["id-g4-idaho-tribes", "id-g4-settling-idaho", "id-g4-land-conflicts"]));
    expect(social("8")).toContain("id-g8-idaho-territory");
    expect(social("9")).toEqual(expect.arrayContaining(["id-g9-governing-idaho", "id-g9-us-government", "id-g9-personal-finance"]));
  });

  it("cites Idaho's middle school band in Grades 6 to 8 science and the high school one in Grade 9", () => {
    // Idaho writes one middle school band (MS-LS-2.1), not grade-by-grade standards.
    for (const { c, u, key } of idaho.filter(({ c }) => c.subject === "science" && ["6", "7", "8", "9"].includes(c.grade))) {
      const codes = (u.standards["us-id"] ?? "").split(" · ")[0].split("; ");
      const band = c.grade === "9" ? "HS-" : "MS-";
      for (const code of codes) expect(code.startsWith(band), `${key} cites ${code}`).toBe(true);
    }
  });
});
