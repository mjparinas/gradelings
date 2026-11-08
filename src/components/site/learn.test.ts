import { describe, expect, it } from "vitest";
import { ARTICLES } from "@/content/articles";
import { EXPLORE_CARDS } from "@/content/explore";
import { LEARN_ITEMS, allLearnPaths, learnDescription, learnTitles, learnItem, learnPath, learnQuestions, relatedItems } from "./learn";

describe("learn pages", () => {
  it("has a page for every Explore card and every article, with no address used twice", () => {
    expect(LEARN_ITEMS).toHaveLength(EXPLORE_CARDS.length + ARTICLES.length);
    expect(new Set(LEARN_ITEMS.map((i) => i.id)).size).toBe(LEARN_ITEMS.length);
    expect(allLearnPaths()).toHaveLength(LEARN_ITEMS.length + 1);
    expect(learnItem(LEARN_ITEMS[0].id)).toBe(LEARN_ITEMS[0]);
    expect(learnItem("nope")).toBeUndefined();
    expect(learnPath.item("the-moon")).toBe("/learn/the-moon/");
  });

  it("asks one question for a card and two for an article, with the answer among the choices", () => {
    for (const i of LEARN_ITEMS) {
      const qs = learnQuestions(i);
      expect(qs, i.id).toHaveLength(i.kind === "card" ? 1 : 2);
      for (const q of qs) {
        expect(q.choices).toContain(q.answer);
        expect(q.why.length).toBeGreaterThan(5);
      }
    }
  });

  it("links to other items on the same subject and age, never itself", () => {
    for (const i of LEARN_ITEMS) {
      const rel = relatedItems(i);
      expect(rel.length, i.id).toBeGreaterThan(0);
      for (const r of rel) {
        expect(r.id).not.toBe(i.id);
        expect(r.band).toBe(i.band);
        expect(r.topic).toBe(i.topic);
      }
    }
  });

  it("describes each page in plain words and names no curriculum, place or money", () => {
    const text = LEARN_ITEMS.map(learnDescription).join(" ");
    expect(text).not.toMatch(/curriculum|province|\bstate\b|canad|america|\$|¢|dollar|christmas|halloween|easter/i);
    for (const i of LEARN_ITEMS) {
      expect(learnDescription(i).length, i.id).toBeGreaterThan(40);
      expect(learnDescription(i).length, i.id).toBeLessThanOrEqual(160);
    }
    expect(new Set(LEARN_ITEMS.map((i) => learnTitles(i)[0])).size).toBe(LEARN_ITEMS.length);
  });
});
