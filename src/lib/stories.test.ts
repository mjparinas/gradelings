import { describe, expect, it } from "vitest";
import { storyLevel } from "@/content/stories";
import { STORIES } from "@/content/stories/library";
import { MIN_JUST_RIGHT, JUST_RIGHT_SPAN, shelves, storiesFor, storyLearnSeconds, storyTarget } from "./stories";

describe("storyTarget", () => {
  const reading = (rl: number, ok: boolean, n: number) => Array.from({ length: n }, () => ({ rl, ok }));

  it("starts at the child's grade until enough answers are in", () => {
    expect(storyTarget({ reading: [] }, "k", true)).toBe(0);
    expect(storyTarget({ reading: reading(3, true, 7) }, "3", true)).toBe(3);
  });

  it("follows the child's estimated reading level once it is known", () => {
    expect(storyTarget({ reading: reading(5, true, 30) }, "3", true)).toBeGreaterThan(4);
    expect(storyTarget({ reading: reading(1, false, 30) }, "3", true)).toBeLessThan(2);
  });

  it("stays at the grade when reading-level matching is switched off", () => {
    expect(storyTarget({ reading: reading(5, true, 30) }, "3", false)).toBe(3);
  });
});

describe("shelves", () => {
  it("puts every story on exactly one shelf", () => {
    for (const target of [0, 2.5, 4, 6.3, 9]) {
      const { justRight, easier, harder } = shelves(STORIES, target);
      const all = [...justRight, ...easier, ...harder].map((s) => s.id);
      expect(all.sort()).toEqual(STORIES.map((s) => s.id).sort());
    }
  });

  it("fills the just-right shelf with stories near the target, and at least a few", () => {
    for (const target of [0, 1, 3, 5, 7, 9, 12]) {
      const { justRight } = shelves(STORIES, target);
      expect(justRight.length).toBeGreaterThanOrEqual(MIN_JUST_RIGHT);
      const inSpan = STORIES.filter((s) => Math.abs(storyLevel(s) - target) <= JUST_RIGHT_SPAN);
      if (inSpan.length >= MIN_JUST_RIGHT) expect(justRight).toHaveLength(inSpan.length);
    }
  });

  it("lists easier and harder stories nearest first", () => {
    const { easier, harder } = shelves(STORIES, 4.5);
    expect(easier.map(storyLevel)).toEqual([...easier.map(storyLevel)].sort((a, b) => b - a));
    expect(harder.map(storyLevel)).toEqual([...harder.map(storyLevel)].sort((a, b) => a - b));
    expect(easier.every((s) => storyLevel(s) < 4.5)).toBe(true);
    expect(harder.every((s) => storyLevel(s) >= 4.5)).toBe(true);
  });

  it("offers a Kindergarten child the Kindergarten stories first", () => {
    expect(shelves(STORIES, 0).justRight.every((s) => s.tier === "k1" || storyLevel(s) <= 1.2)).toBe(true);
  });
});

describe("storiesFor", () => {
  it("needs the flag and language arts", () => {
    expect(storiesFor({ enabledSubjects: ["math", "language"] }, true)).toBe(true);
    expect(storiesFor({ enabledSubjects: ["math"] }, true)).toBe(false);
    expect(storiesFor({ enabledSubjects: ["language"] }, false)).toBe(false);
    expect(storiesFor(undefined, true)).toBe(true);
  });
});

describe("storyLearnSeconds", () => {
  it("caps time at a minute a page and a minute a question", () => {
    expect(storyLearnSeconds(90_000, 6, 3)).toBe(90);
    expect(storyLearnSeconds(3_600_000, 6, 3)).toBe(540);
  });
});
