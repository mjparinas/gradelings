import { describe, expect, it } from "vitest";
import { CRITTERS } from "@/components/CritterArt";
import { canadianWords } from "../locale";
import { FREE_STORIES_PER_TIER, isFreeStory, loadStories, localizeStory, splitSentences, storyLevel, storyQuestions, TIER_LEVELS } from "./index";
import { STORIES } from "./library";
import { SPANISH_STORIES } from "./spanish";

describe("the Spanish stories", () => {
  it("have unique ids that start with es-, three in each of two tiers, all marked Spanish", () => {
    const ids = [...STORIES, ...SPANISH_STORIES].map((s) => s.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const s of SPANISH_STORIES) {
      expect(s.id.startsWith("es-"), s.id).toBe(true);
      expect(s.lang, s.id).toBe("es");
    }
    expect(SPANISH_STORIES.filter((s) => s.tier === "45")).toHaveLength(3);
    expect(SPANISH_STORIES.filter((s) => s.tier === "89")).toHaveLength(3);
  });

  it("give every page its English, a picture and a short length", () => {
    for (const s of SPANISH_STORIES) {
      expect(s.pages.length, s.id).toBeGreaterThanOrEqual(5);
      expect(s.pages.length, s.id).toBeLessThanOrEqual(8);
      for (const p of s.pages) {
        expect(p.en?.trim(), `${s.id}: "${p.text}" has no English`).toBeTruthy();
        expect(p.art.trim(), s.id).not.toBe("");
        expect(p.text.length, `${s.id}: "${p.text}"`).toBeLessThanOrEqual(s.tier === "45" ? 70 : 110);
        // « » would make read-aloud switch language inside the page.
        expect(p.text, s.id).not.toMatch(/[«»]/);
        expect(splitSentences(p.text).join(" ").replace(/\s+/g, " "), s.id).toBe(p.text.replace(/\s+/g, " "));
      }
    }
  });

  it("read at their tier's middle, since the English reading formula doesn't apply", () => {
    for (const s of SPANISH_STORIES) {
      const [lo, hi] = TIER_LEVELS[s.tier];
      expect(storyLevel(s), s.id).toBe((lo + hi) / 2);
    }
  });

  it("draw only critters from the cast", () => {
    const ids = new Set(CRITTERS.map((c) => c.id));
    for (const s of SPANISH_STORIES) for (const p of s.pages) if (p.critter) expect(ids.has(p.critter.id), `${s.id}: ${p.critter.id}`).toBe(true);
  });

  it("name nothing Canadian, so every province and state can read them", () => {
    for (const s of SPANISH_STORIES) {
      const all = [s.title, ...s.pages.flatMap((p) => [p.text, p.en ?? ""]), ...s.quiz.flatMap((q) => [q.q, q.a, ...q.wrong])].join("\n");
      expect(canadianWords(all), s.id).toEqual([]);
    }
  });

  it("use Latin American Spanish: ustedes, never vosotros", () => {
    for (const s of SPANISH_STORIES) expect(s.pages.map((p) => p.text).join(" "), s.id).not.toMatch(/vosotros|vosotras|\bos\s/i);
  });

  it("ask three fair questions in English, each pointing at a real page, with the Spanish and its English in the hint", () => {
    for (const s of SPANISH_STORIES) {
      expect(s.quiz, s.id).toHaveLength(3);
      storyQuestions(s).forEach((q, i) => {
        const item = s.quiz[i];
        const page = s.pages[item.page - 1];
        expect(page, `${s.id} question ${i + 1}`).toBeTruthy();
        expect(q.choices.map((c) => c.id)).toContain(q.answer);
        expect(q.choices.find((c) => c.id === q.answer)!.label).toBe(item.a);
        expect(new Set(q.choices.map((c) => c.label.toLowerCase())).size).toBe(q.choices.length);
        expect(q.hint).toContain(page.text);
        expect(q.hint).toContain(page.en!);
        expect(q.lang).toBeUndefined();
      });
    }
  });

  it("open the first stories of each tier on the free plan, counted apart from the English ones", () => {
    const all = [...STORIES, ...SPANISH_STORIES];
    for (const tier of ["45", "89"] as const) {
      expect(SPANISH_STORIES.filter((s) => s.tier === tier && isFreeStory(s, all))).toHaveLength(FREE_STORIES_PER_TIER);
    }
  });

  it("keep their own words when shown to a US child, and change only the English spelling", () => {
    const bike = SPANISH_STORIES.find((s) => s.id === "es-bicicleta")!;
    const us = localizeStory(bike, "en-US");
    expect(us.pages.map((p) => p.text)).toEqual(bike.pages.map((p) => p.text));
    expect(us.quiz[0].q).toBe("What color was the bicycle?");
  });

  it("download only for a child with Spanish on", async () => {
    expect((await loadStories()).some((s) => s.lang)).toBe(false);
    expect((await loadStories(true)).filter((s) => s.lang === "es")).toHaveLength(SPANISH_STORIES.length);
  });
});
