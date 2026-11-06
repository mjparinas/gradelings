import { describe, expect, it } from "vitest";
import { ARTICLES, articleLevel, articleQuestion, articlesFor, findArticle } from "./articles";

describe("articles", () => {
  it("has four articles for Grades 2 to 4 and four for Grades 5 to 9, none for little kids", () => {
    expect(articlesFor("middle")).toHaveLength(4);
    expect(articlesFor("big")).toHaveLength(4);
    expect(articlesFor("little")).toHaveLength(0);
    expect(new Set(ARTICLES.map((a) => a.id)).size).toBe(ARTICLES.length);
    expect(findArticle(ARTICLES[0].id)).toBe(ARTICLES[0]);
    expect(findArticle("nope")).toBeUndefined();
  });

  it("has a mix of science and world in each band", () => {
    for (const band of ["middle", "big"] as const) {
      expect(new Set(articlesFor(band).map((a) => a.topic))).toEqual(new Set(["science", "world"]));
    }
  });

  it("is short: three or four paragraphs of at most 60 words", () => {
    for (const a of ARTICLES) {
      expect(a.paragraphs.length, a.id).toBeGreaterThanOrEqual(3);
      expect(a.paragraphs.length, a.id).toBeLessThanOrEqual(4);
      for (const p of a.paragraphs) expect(p.split(/\s+/).length, a.id).toBeLessThanOrEqual(60);
    }
  });

  it("reads easier in the younger band than in the older one (computed, not tagged)", () => {
    const avg = (xs: number[]) => xs.reduce((s, n) => s + n, 0) / xs.length;
    const mid = articlesFor("middle").map(articleLevel);
    const big = articlesFor("big").map(articleLevel);
    for (const l of mid) expect(l).toBeLessThanOrEqual(5);
    for (const l of big) expect(l).toBeGreaterThanOrEqual(4);
    expect(avg(big)).toBeGreaterThan(avg(mid));
  });

  it("asks two questions with the answer among three different choices, the same for a seed", () => {
    for (const a of ARTICLES) {
      expect(a.asks, a.id).toHaveLength(2);
      for (let n = 0; n < 2; n++) {
        expect(new Set([a.asks[n].right, ...a.asks[n].wrong]).size, a.id).toBe(3);
        for (const seed of ["a", "b", "c"]) {
          const q = articleQuestion(a, n, seed);
          expect(q.choices[q.answer]).toBe(a.asks[n].right);
          expect(articleQuestion(a, n, seed)).toEqual(q);
        }
      }
    }
  });

  it("is region-free: no curriculum, place, money, holiday or Canada/US spelling differences", () => {
    const text = ARTICLES.map((a) => [a.title, ...a.paragraphs, ...a.asks.flatMap((k) => [k.prompt, k.right, ...k.wrong, k.why])].join(" ")).join(" ");
    expect(text).not.toMatch(/curriculum|province|state\b|canad|america|\$|¢|dollar|christmas|halloween|easter|colour|metre|litre|vapour|centre|favour/i);
    expect(text).not.toMatch(/\bU\.?S\.?\b/);
  });
});
