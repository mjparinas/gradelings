import { describe, expect, it } from "vitest";
import { COURSES } from "../all";

// Maine's citations, own units, plan and US rules are checked by the framework and country contracts
// (src/content/contract.test.ts, with ./contract.ts). This file keeps what is Maine's alone.

/** Every Maine unit with its course. */
const maine = COURSES.flatMap((c) =>
  c.units.filter((u) => u.standards["us-me"]).map((u) => ({ c, u, key: `${c.grade}/${c.subject}/${u.id}` })),
);

describe("Maine", () => {
  it("teaches Maine studies and the Wabanaki Nations in its own units", () => {
    const own = maine.filter(({ u }) => u.id.startsWith("me-"));
    const ids = own.map(({ u }) => u.id);
    expect(ids).toEqual(expect.arrayContaining(["me-g1-wabanaki-traditions", "me-g4-wabanaki-nations", "me-g4-governing-maine"]));
    for (const { u, key } of own) {
      // Alaska adopts a few of Maine's general units, so a Maine unit may also carry another US state's standards.
      expect(Object.keys(u.standards), `${key} carries Maine standards`).toContain("us-me");
      expect(Object.keys(u.standards).filter((f) => !f.startsWith("us-")), `${key} carries only US standards`).toEqual([]);
      expect(key.split("/")[1], `${key} is a social studies unit`).toBe("social");
    }
  });
});
