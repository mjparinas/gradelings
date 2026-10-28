import { describe, expect, it } from "vitest";
import { COURSES } from "../all";

// Vermont's citations, own units, plan and US rules are checked by the framework and country contracts
// (src/content/contract.test.ts, with ./contract.ts). This file keeps what is Vermont's alone.

/** Every Vermont unit with its course. */
const vermont = COURSES.flatMap((c) =>
  c.units.filter((u) => u.standards["us-vt"]).map((u) => ({ c, u, key: `${c.grade}/${c.subject}/${u.id}` })),
);

const social = (grade: string) => vermont.filter(({ c }) => c.grade === grade && c.subject === "social").map(({ u }) => u.id);

describe("Vermont", () => {
  it("teaches Vermont studies in its own units", () => {
    const own = vermont.filter(({ u }) => u.id.startsWith("vt-"));
    expect(own.map(({ u }) => u.id)).toEqual(
      expect.arrayContaining([
        "vt-k-flag-and-state",
        "vt-g1-then-and-now",
        "vt-g4-first-peoples",
        "vt-g4-green-mountain-state",
        "vt-g4-governing-vermont",
        "vt-g7-modern-vermont",
        "vt-g8-vermont-in-action",
        "vt-g9-governing-vermont",
      ]),
    );
  });

  it("follows the grade themes of the Vermont Framework for K-8 Social Studies", () => {
    expect(social("2")).toContain("vt-g2-the-americas");
    expect(social("3")).toEqual(expect.arrayContaining(["vt-g3-world-regions", "vt-g3-people-on-the-move"]));
    // Vermont, the early republic and the United States to the Civil War.
    expect(social("4").filter((id) => id.startsWith("vt-")).length).toBeGreaterThanOrEqual(6);
    expect(social("4")).toEqual(expect.arrayContaining(["ca-g5-revolution", "wa-g5-constitution", "ca-g8-civil-war"]));
    // World geography and ancient civilizations: western Asia and Africa in 5th grade, the rest of the world in 6th.
    expect(social("5")).toEqual(expect.arrayContaining(["wa-g6-mesopotamia-egypt", "ga-g7-africa", "ga-g7-southwest-asia"]));
    expect(social("6")).toEqual(expect.arrayContaining(["ga-g6-latin-america", "ga-g6-europe", "ga-g7-southern-eastern-asia"]));
    // From Reconstruction to the civil rights movement, then civics and economics in action.
    expect(social("7")).toEqual(expect.arrayContaining(["or-g8-reconstruction", "ny-g8-civil-rights", "vt-g7-modern-vermont"]));
    expect(social("8")).toContain("vt-g8-vermont-in-action");
    expect(social("9")).toEqual(expect.arrayContaining(["vt-g9-governing-vermont", "vt-g9-us-government", "vt-g9-personal-finance"]));
  });

  it("cites social studies by the C3 Framework's grade band", () => {
    // The C3 Framework sets its indicators for the K-2, 3-5, 6-8 and 9-12 bands, so a grade cites its own band.
    const band: Record<string, string> = { k: "K-2", "1": "K-2", "2": "K-2", "3": "3-5", "4": "3-5", "5": "3-5", "6": "6-8", "7": "6-8", "8": "6-8", "9": "9-12" };
    for (const { c, u, key } of vermont.filter(({ c }) => c.subject === "social")) {
      const codes = (u.standards["us-vt"] ?? "").split(" · ")[0].split("; ");
      for (const code of codes) {
        const m = /^D2\.(?:Civ|Eco|Geo|His)\.\d+\.(K-2|3-5|6-8|9-12)$/.exec(code);
        expect(m?.[1], `${key} cites ${code}`).toBe(band[c.grade]);
      }
    }
  });
});
