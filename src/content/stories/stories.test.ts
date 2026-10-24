import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { CRITTERS } from "@/components/CritterArt";
import { canadianWords } from "../locale";
import { FREE_STORIES_PER_TIER, isFreeStory, localizeStory, splitSentences, storyLevel, storyQuestions, storyText, TIER_LEVELS, TIERS } from "./index";
import { STORIES } from "./library";

describe("the story library", () => {
  it("has six stories in every tier, Kindergarten to Grade 9, with unique ids", () => {
    expect(new Set(STORIES.map((s) => s.id)).size).toBe(STORIES.length);
    for (const tier of TIERS) expect(STORIES.filter((s) => s.tier === tier), tier).toHaveLength(6);
  });

  it("levels every story from its text, inside its tier's range", () => {
    for (const s of STORIES) {
      const [lo, hi] = TIER_LEVELS[s.tier];
      const level = storyLevel(s);
      expect(level, `${s.id} reads at ${level}`).toBeGreaterThanOrEqual(lo);
      expect(level, `${s.id} reads at ${level}`).toBeLessThanOrEqual(hi);
    }
  });

  it("gets harder from tier to tier on average", () => {
    const mean = (tier: string) => {
      const list = STORIES.filter((s) => s.tier === tier).map(storyLevel);
      return list.reduce((a, b) => a + b, 0) / list.length;
    };
    for (let i = 1; i < TIERS.length; i++) expect(mean(TIERS[i]), TIERS[i]).toBeGreaterThan(mean(TIERS[i - 1]));
  });

  it("keeps pages short enough for each tier", () => {
    const limit = { k1: 60, "23": 110, "45": 170, "67": 220, "89": 260 };
    for (const s of STORIES) {
      expect(s.pages.length, s.id).toBeGreaterThanOrEqual(5);
      expect(s.pages.length, s.id).toBeLessThanOrEqual(8);
      for (const p of s.pages) {
        expect(p.text.length, `${s.id}: "${p.text}"`).toBeLessThanOrEqual(limit[s.tier]);
        expect(p.art.trim(), s.id).not.toBe("");
      }
    }
  });

  it("draws only critters from the cast", () => {
    const ids = new Set(CRITTERS.map((c) => c.id));
    for (const s of STORIES) for (const p of s.pages) if (p.critter) expect(ids.has(p.critter.id), `${s.id}: ${p.critter.id}`).toBe(true);
  });

  it("names nothing that ties it to Canada, so US children can read every story", () => {
    for (const s of STORIES) {
      const all = [s.title, storyText(s), ...s.quiz.flatMap((q) => [q.q, q.a, ...q.wrong])].join("\n");
      expect(canadianWords(all), s.id).toEqual([]);
    }
  });

  it("is written with Canadian spelling and shown in US spelling to US children", () => {
    const ruby = STORIES.find((s) => s.id === "ruby-hat")!;
    expect(ruby.quiz[0].q).toContain("colour");
    expect(localizeStory(ruby, "en-US").quiz[0].q).toBe("What color is Ruby's hat?");
    expect(localizeStory(ruby, "en-CA")).toBe(ruby);
    const whales = localizeStory(STORIES.find((s) => s.id === "whale-song")!, "en-US");
    expect(whales.pages[0].text).toContain("gray");
  });

  it("never uses Math.random", () => {
    for (const file of ["./library.ts", "./index.ts"]) expect(readFileSync(new URL(file, import.meta.url), "utf8")).not.toMatch(/Math\.random/);
  });

  it("opens the first stories of each tier on the free plan", () => {
    for (const tier of TIERS) expect(STORIES.filter((s) => s.tier === tier && isFreeStory(s, STORIES))).toHaveLength(FREE_STORIES_PER_TIER);
  });
});

describe("story questions", () => {
  it("are fair: the answer is a choice, no two choices look alike, and each points at a real page", () => {
    for (const s of STORIES) {
      const little = s.tier === "k1";
      expect(s.quiz.length, s.id).toBeGreaterThanOrEqual(little ? 2 : 3);
      const questions = storyQuestions(s);
      questions.forEach((q, i) => {
        const item = s.quiz[i];
        expect(item.page, `${s.id} question ${i + 1}`).toBeGreaterThanOrEqual(1);
        expect(item.page, `${s.id} question ${i + 1}`).toBeLessThanOrEqual(s.pages.length);
        expect(q.choices.map((c) => c.id)).toContain(q.answer);
        expect(q.choices.find((c) => c.id === q.answer)!.label).toBe(item.a);
        expect(new Set(q.choices.map((c) => c.label.toLowerCase())).size, `duplicate choices in "${q.prompt}"`).toBe(q.choices.length);
        expect(q.choices.length).toBeGreaterThanOrEqual(2);
        expect(q.choices.length).toBeLessThanOrEqual(little ? 4 : 5);
        if (little) expect(q.prompt.length, `prompt too long for K/1: "${q.prompt}"`).toBeLessThanOrEqual(80);
        expect(q.hint).toContain(s.pages[item.page - 1].text);
      });
    }
  });

  it("asks the same way every time, with the right answer not always first", () => {
    const first = STORIES.flatMap((s) => storyQuestions(s));
    expect(STORIES.flatMap((s) => storyQuestions(s))).toEqual(first);
    const atStart = first.filter((q) => q.choices[0].id === q.answer).length;
    expect(atStart).toBeLessThan(first.length * 0.6);
  });
});

describe("splitSentences", () => {
  it("splits a page into the sentences read-along lights up", () => {
    expect(splitSentences("Ollie is an otter. Ollie likes to swim.")).toEqual(["Ollie is an otter.", "Ollie likes to swim."]);
    expect(splitSentences("So many stars! Hoot can not count them all.")).toEqual(["So many stars!", "Hoot can not count them all."]);
  });

  it("keeps speech and its speaker together", () => {
    expect(splitSentences('Ziggy laughed. "You are the slowest one here!" he said.')).toEqual(["Ziggy laughed.", '"You are the slowest one here!" he said.']);
    expect(splitSentences('"Seeds take time," said Grandma.')).toEqual(['"Seeds take time," said Grandma.']);
  });

  it("keeps a sentence with no full stop", () => {
    expect(splitSentences("Up, up, up")).toEqual(["Up, up, up"]);
  });

  it("joins back to the page's words", () => {
    for (const s of STORIES) for (const p of s.pages) expect(splitSentences(p.text).join(" ").replace(/\s+/g, " ")).toBe(p.text.replace(/\s+/g, " "));
  });
});
