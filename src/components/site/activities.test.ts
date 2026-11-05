import { describe, expect, it } from "vitest";
import { allActivitiesPaths } from "./activities";
import { BANDS, BAND_SLUG, CALENDAR_DAYS, MATH_GAMES, TALK_CARDS, bandFromSlug } from "./activitiesData";

describe("printable activities", () => {
  it("finds each age group from its address and lists every page once", () => {
    for (const b of BANDS) expect(bandFromSlug(BAND_SLUG[b])).toBe(b);
    expect(bandFromSlug("grade-12")).toBeUndefined();
    const paths = allActivitiesPaths().map((p) => p.path);
    expect(paths).toHaveLength(2 + 1 + BANDS.length * 2);
    expect(new Set(paths).size).toBe(paths.length);
  });

  it("gives every age group 30 different daily challenges and four complete games", () => {
    for (const b of BANDS) {
      expect(CALENDAR_DAYS[b]).toHaveLength(30);
      expect(new Set(CALENDAR_DAYS[b]).size).toBe(30);
      expect(MATH_GAMES[b]).toHaveLength(4);
      for (const g of MATH_GAMES[b]) {
        expect(g.how.length).toBeGreaterThanOrEqual(3);
        expect(g.need.length).toBeGreaterThan(5);
      }
    }
  });

  it("has distinct conversation cards in all four subjects", () => {
    expect(new Set(TALK_CARDS.map((c) => c.q)).size).toBe(TALK_CARDS.length);
    expect(new Set(TALK_CARDS.map((c) => c.subject)).size).toBe(4);
  });

  it("names no curriculum, place, money or holiday, so it suits every region", () => {
    const text = JSON.stringify([CALENDAR_DAYS, MATH_GAMES, TALK_CARDS]);
    expect(text).not.toMatch(/curriculum|province|\bstate\b|canad|america|\$|¢|dollar|money|price|christmas|halloween|easter/i);
  });
});
