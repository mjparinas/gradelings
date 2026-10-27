import { describe, expect, it } from "vitest";
import { COURSES } from "../all";

// Arizona's citations, own units, plan and US rules are checked by the framework and country contracts
// (src/content/contract.test.ts, with ./contract.ts). This file keeps what is Arizona's alone.

/** Every Arizona unit with its course. */
const arizona = COURSES.flatMap((c) =>
  c.units.filter((u) => u.standards["us-az"]).map((u) => ({ c, u, key: `${c.grade}/${c.subject}/${u.id}` })),
);

describe("Arizona", () => {
  it("never borrows a unit built around another state", () => {
    // A borrowed unit may name another state in passing (New York in the Revolution, a Texas coast in a tides question),
    // but not be written around one: units whose description names another state are copied as az- units without it.
    const states = /Texas|New York|Minnesota|Maine\b|Alaska|Alabama|Washington State|Oregon(?! Trail)|California(?! Gold Rush)/;
    const framed = arizona
      .filter(({ u }) => !u.id.startsWith("az-") && !u.standards["ca-bc"])
      .filter(({ u }) => states.test([u.title, u.blurb, u.parentNote ?? ""].join(" ")))
      .map(({ key }) => key);
    expect(framed).toEqual([]);
  });

  it("teaches Arizona studies and Arizona government in its own units", () => {
    const own = arizona.filter(({ u }) => u.id.startsWith("az-"));
    const ids = own.map(({ u }) => u.id);
    expect(ids).toEqual(
      expect.arrayContaining(["az-g3-indian-nations", "az-g3-governing-arizona", "az-g9-arizona-constitution", "az-g9-civics-test"]),
    );
  });
});
