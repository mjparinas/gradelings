import { describe, expect, it } from "vitest";
import { EXPLORE_CARDS, exploreCards, exploreQuestion, findCard } from "./explore";

const BANDS = ["little", "middle", "big"] as const;

describe("explore cards", () => {
  it("has eight unique cards for each age band, four science and four world", () => {
    expect(new Set(EXPLORE_CARDS.map((c) => c.id)).size).toBe(EXPLORE_CARDS.length);
    expect(new Set(EXPLORE_CARDS.map((c) => c.title)).size).toBe(EXPLORE_CARDS.length);
    for (const band of BANDS) {
      const cards = exploreCards(band);
      expect(cards, band).toHaveLength(8);
      expect(cards.filter((c) => c.topic === "science")).toHaveLength(4);
      expect(cards.filter((c) => c.topic === "world")).toHaveLength(4);
    }
    expect(findCard("busy-bees")?.title).toBe("Busy bees");
    expect(findCard("nope")).toBeUndefined();
  });

  it("is short, plain and the same for every province and state", () => {
    const text = EXPLORE_CARDS.flatMap((c) => [c.title, ...c.facts, c.ask.prompt, c.ask.right, ...c.ask.wrong, c.ask.why]).join(" ");
    expect(text).not.toMatch(/curriculum|province|state\b|canad|america|\bU\.?S\b|\$|¢|dollar|christmas|halloween|easter|colour|metre|litre|vapour|centre|favour/i);
    for (const c of EXPLORE_CARDS) {
      for (const f of c.facts) expect(f.length, f).toBeLessThanOrEqual(80);
      expect(c.ask.prompt.length, c.id).toBeLessThanOrEqual(80);
    }
  });

  it("keeps the youngest cards simple", () => {
    for (const c of exploreCards("little")) {
      for (const f of c.facts) expect(f.length, f).toBeLessThanOrEqual(55);
      for (const a of [c.ask.right, ...c.ask.wrong]) expect(a.length, a).toBeLessThanOrEqual(40);
    }
  });

  it("asks a question with the right answer among three different choices, the same for a seed", () => {
    for (const c of EXPLORE_CARDS) {
      expect(new Set([c.ask.right, ...c.ask.wrong]).size, c.id).toBe(3);
      for (const seed of ["a", "b", "c", "d"]) {
        const q = exploreQuestion(c, seed);
        expect(q.choices).toHaveLength(3);
        expect(q.choices[q.answer]).toBe(c.ask.right);
        expect(exploreQuestion(c, seed)).toEqual(q);
      }
    }
  });

  it("moves the right answer around between seeds", () => {
    const positions = new Set(EXPLORE_CARDS.flatMap((c) => ["a", "b", "c"].map((s) => exploreQuestion(c, s).answer)));
    expect(positions.size).toBe(3);
  });
});
