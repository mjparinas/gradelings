import { describe, expect, it } from "vitest";
import { buddyFact, BUDDY_FACTS } from "./buddyFacts";

describe("buddyFact", () => {
  it("has eight to twelve short, different facts for each core subject", () => {
    const all = Object.values(BUDDY_FACTS).flat();
    expect(Object.keys(BUDDY_FACTS).sort()).toEqual(["language", "math", "science", "social"]);
    for (const facts of Object.values(BUDDY_FACTS)) {
      expect(facts!.length).toBeGreaterThanOrEqual(8);
      expect(facts!.length).toBeLessThanOrEqual(12);
    }
    expect(new Set(all).size).toBe(all.length);
    for (const fact of all) expect(fact.length, fact).toBeLessThanOrEqual(80);
  });
  it("names no money, places, holidays or school systems, so it suits every region", () => {
    for (const fact of Object.values(BUDDY_FACTS).flat()) {
      expect(fact, fact).not.toMatch(/[$¢€£]|Canada|Canadian|America|province|state|Christmas|Easter|Halloween|grade/i);
    }
  });
  it("picks the same fact for the same seed, and spreads across the list", () => {
    expect(buddyFact("math", "a")).toBe(buddyFact("math", "a"));
    const seen = new Set(Array.from({ length: 60 }, (_, i) => buddyFact("science", `seed-${i}`)));
    expect(seen.size).toBeGreaterThanOrEqual(5);
  });
  it("has nothing for subjects without facts", () => {
    expect(buddyFact("immersion", "x")).toBeUndefined();
  });
});

describe("factSubjectFor", () => {
  it("only picks subjects that have facts", async () => {
    const { factSubjectFor } = await import("./buddyFacts");
    for (let i = 0; i < 20; i++) expect(["math", "science"]).toContain(factSubjectFor(["math", "immersion", "science"], `s${i}`));
    expect(factSubjectFor(["immersion", "core-french"], "x")).toBeUndefined();
  });
});
