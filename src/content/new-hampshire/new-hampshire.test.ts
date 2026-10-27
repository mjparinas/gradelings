import { describe, expect, it } from "vitest";
import { COURSES } from "../all";

// New Hampshire's citations, own units, plan and US rules are checked by the framework and country contracts
// (src/content/contract.test.ts, with ./contract.ts). This file keeps what is New Hampshire's alone.

/** Every New Hampshire unit with its course. */
const newHampshire = COURSES.flatMap((c) =>
  c.units.filter((u) => u.standards["us-nh"]).map((u) => ({ c, u, key: `${c.grade}/${c.subject}/${u.id}` })),
);

describe("New Hampshire", () => {
  it("teaches New Hampshire studies in its own units", () => {
    const own = newHampshire.filter(({ u }) => u.id.startsWith("nh-"));
    expect(own.map(({ u }) => u.id)).toEqual(
      expect.arrayContaining([
        "nh-k-flag-and-state",
        "nh-g1-then-and-now",
        "nh-g3-regions",
        "nh-g4-first-peoples",
        "nh-g4-granite-state",
        "nh-g4-governing-new-hampshire",
        "nh-g8-new-hampshire-and-the-nation",
        "nh-g9-governing-new-hampshire",
      ]),
    );
  });

  it("teaches New Hampshire's regions in 3rd grade, its history in 4th and its government in 9th", () => {
    const social = (grade: string) => newHampshire.filter(({ c }) => c.grade === grade && c.subject === "social").map(({ u }) => u.id);
    expect(social("3")).toEqual(expect.arrayContaining(["nh-g3-regions", "nh-g3-people-on-the-move"]));
    expect(social("4").filter((id) => id.startsWith("nh-")).length).toBeGreaterThanOrEqual(6);
    expect(social("8")).toContain("nh-g8-new-hampshire-and-the-nation");
    expect(social("9")).toEqual(expect.arrayContaining(["nh-g9-governing-new-hampshire", "nh-g9-us-government", "nh-g9-personal-finance"]));
  });

  it("cites social studies by the curriculum framework's grade span", () => {
    // The 2006 framework sets expectations for K-2, 3-4, 5-6, 7-8 and 9-12, so a grade cites its own span.
    const span: Record<string, string> = { k: "2", "1": "2", "2": "2", "3": "4", "4": "4", "5": "6", "6": "6", "7": "8", "8": "8", "9": "12" };
    for (const { c, u, key } of newHampshire.filter(({ c }) => c.subject === "social")) {
      const codes = (u.standards["us-nh"] ?? "").split(" · ")[0].split("; ");
      for (const code of codes) {
        const m = /^SS:(CV|EC|GE|HI|WH):(\d+):\d+\.\d+$/.exec(code);
        expect(m?.[2], `${key} cites ${code}`).toBe(span[c.grade]);
      }
    }
  });
});
