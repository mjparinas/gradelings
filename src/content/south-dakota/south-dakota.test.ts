import { describe, expect, it } from "vitest";
import { COURSES } from "../all";

// South Dakota's citations, own units, plan and US rules are checked by the framework and country contracts
// (src/content/contract.test.ts, with ./contract.ts). This file keeps what is South Dakota's alone.

/** Every South Dakota unit with its course. */
const southDakota = COURSES.flatMap((c) =>
  c.units.filter((u) => u.standards["us-sd"]).map((u) => ({ c, u, key: `${c.grade}/${c.subject}/${u.id}` })),
);

const social = (grade: string) => southDakota.filter(({ c }) => c.grade === grade && c.subject === "social").map(({ u }) => u.id);

describe("South Dakota", () => {
  it("teaches South Dakota studies and the Oceti Sakowin in its own units", () => {
    const own = southDakota.filter(({ u }) => u.id.startsWith("sd-")).map(({ u }) => u.id);
    expect(own).toEqual(
      expect.arrayContaining([
        "sd-k-our-state",
        "sd-g1-south-dakota",
        "sd-g1-first-peoples",
        "sd-g3-south-dakota-places",
        "sd-g4-corps-of-discovery",
        "sd-g5-dakota-territory",
        "sd-g7-oceti-sakowin",
        "sd-g8-dakota-1800s",
        "sd-g9-governing-south-dakota",
      ]),
    );
  });

  it("moves through history in order: the ancient world in 1st grade, the Middle Ages in 2nd, 1877 to 2008 in 8th", () => {
    expect(social("1")).toEqual(expect.arrayContaining(["sd-g1-ancient-world", "sd-g1-founding-stories"]));
    expect(social("2")).toEqual(expect.arrayContaining(["sd-g2-middle-ages", "sd-g2-growing-nation"]));
    expect(social("4")).toEqual(expect.arrayContaining(["medieval-europe", "ca-g5-revolution"]));
    expect(social("8")).toEqual(expect.arrayContaining(["ny-g8-world-war-ii", "ny-g8-new-era"]));
    expect(social("9")).toEqual(expect.arrayContaining(["sd-g9-governing-south-dakota", "ca-g9-three-branches"]));
  });

  it("cites the South Dakota Social Studies Standards by grade, and high school civics as 9-12.C", () => {
    for (const { c, u, key } of southDakota.filter(({ c }) => c.subject === "social" && c.grade !== "pk")) {
      const code = c.grade === "9" ? /^9-12\.C\.\d/ : new RegExp(`^${c.grade === "k" ? "K" : c.grade}\\.SS\\.\\d`);
      expect(u.standards["us-sd"], key).toMatch(code);
    }
  });
});
