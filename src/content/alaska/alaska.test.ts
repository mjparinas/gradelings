import { describe, expect, it } from "vitest";
import outcomes from "../../../docs/research/alaska/outcomes.json";
import { adoptersOf } from "../adopters";
import { COURSES } from "../all";

// Alaska's citations, own units, plan and US rules are checked by the framework and country contracts
// (src/content/contract.test.ts, with ./contract.ts). This file keeps what is Alaska's alone.

/** Every Alaska unit with its course. */
const alaska = COURSES.flatMap((c) =>
  c.units.filter((u) => u.standards["us-ak"]).map((u) => ({ c, u, key: `${c.grade}/${c.subject}/${u.id}` })),
);

describe("Alaska", () => {
  it("teaches Alaska studies in its own units", () => {
    const own = alaska.filter(({ u }) => u.id.startsWith("ak-"));
    const ids = own.map(({ u }) => u.id);
    expect(ids).toEqual(
      expect.arrayContaining(["ak-g3-alaska-native-cultures", "ak-g6-alaska-governments", "ak-g9-alaska-constitution", "ak-g9-land-and-statehood"]),
    );
    for (const { u, key } of own) {
      // Frameworks that copy Alaska's units (their contract's adoptsFrom) carry their own standards beside Alaska's.
      expect(Object.keys(u.standards).filter((f) => !adoptersOf("us-ak").includes(f)), `${key} carries only Alaska standards`).toEqual(["us-ak"]);
      expect(["social", "science"], `${key} is a social studies or science unit`).toContain(key.split("/")[1]);
    }
  });

  it("has a unit for every science standard and every ELA standard that can be practised", () => {
    // Writing, speaking and listening, fluency (RF.n.4) and "read a range of texts" (RL/RI.n.10) need free text or a
    // voice, and RL.n.8 is "not applicable to literature". Middle school science is one 6-8 span.
    const skip = /^(W|SL)\.|^RF\.\w+\.4$|^R[LI]\.[\w-]+\.10$|^RL\.[\w-]+\.8$/;
    const span = (key: string) => (/^[678]\/science$/.test(key) ? "ms/science" : key);
    const cited = new Map<string, Set<string>>();
    for (const { c, u } of alaska) {
      const key = span(`${c.grade}/${c.subject}`);
      const codes = (u.standards["us-ak"] ?? "").split(" · ")[0].split(/;\s*/);
      for (const code of codes) (cited.get(key) ?? cited.set(key, new Set()).get(key)!).add(code.trim());
    }
    const missing = Object.entries(outcomes as Record<string, { idx: string }[]>)
      .filter(([key]) => /\/(language|science)$/.test(key))
      .flatMap(([key, list]) => list.filter((o) => !skip.test(o.idx) && !cited.get(span(key))?.has(o.idx)).map((o) => `${key} ${o.idx}`));
    expect(missing).toEqual([]);
  });
});
