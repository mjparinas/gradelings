import { describe, expect, it } from "vitest";
import { derive } from "./derive";
import type { AppEvent } from "./model";
import { MYSTERY_MIN_ANSWERS, MYSTERY_PER_DAY, mysteryReward, offersMystery, SURPRISE_STICKERS, surpriseStickers } from "./mystery";

const ids = Array.from({ length: 3000 }, (_, i) => `session-${i}`);
const opened = (session: string, t = 1, id = `m-${session}-${t}`): AppEvent => ({ id, profileId: "p", t, type: "mystery", session });

describe("mystery boxes", () => {
  it("decide the same box for the same lesson, on any device", () => {
    for (const id of ids.slice(0, 50)) {
      expect(mysteryReward(id)).toEqual(mysteryReward(id));
      expect(offersMystery(id, 8, 0, 3)).toBe(offersMystery(id, 8, 0, 3));
    }
  });

  it("come with about one lesson in three, always with the first, and never more than 3 a day", () => {
    const share = ids.filter((id) => offersMystery(id, 8, 0, 5)).length / ids.length;
    expect(share).toBeGreaterThan(0.28);
    expect(share).toBeLessThan(0.39);
    expect(ids.slice(0, 20).every((id) => offersMystery(id, 8, 0, 0))).toBe(true);
    expect(ids.some((id) => offersMystery(id, 8, MYSTERY_PER_DAY, 5))).toBe(false);
    expect(ids.some((id) => offersMystery(id, MYSTERY_MIN_ANSWERS - 1, 0, 0))).toBe(false);
  });

  it("hold coins most often, stickers sometimes and rare stickers seldom", () => {
    const rewards = ids.map(mysteryReward);
    const coins = rewards.filter((r) => r.kind === "coins");
    const rare = rewards.filter((r) => r.kind === "sticker" && r.sticker.rare);
    expect(coins.length / ids.length).toBeGreaterThan(0.55);
    expect(coins.length / ids.length).toBeLessThan(0.65);
    expect(rare.length / ids.length).toBeGreaterThan(0.03);
    expect(rare.length / ids.length).toBeLessThan(0.07);
    for (const r of coins) expect([5, 10, 15, 20]).toContain(r.kind === "coins" && r.coins);
    // Every sticker can be found.
    const found = new Set(rewards.flatMap((r) => (r.kind === "sticker" ? [r.sticker.id] : [])));
    expect(found.size).toBe(SURPRISE_STICKERS.length);
  });

  it("count once per lesson however many devices opened it", () => {
    const coinBox = ids.find((id) => mysteryReward(id).kind === "coins")!;
    const reward = mysteryReward(coinBox);
    const d = derive([opened(coinBox, 1), opened(coinBox, 2), opened(coinBox, 3)]);
    expect(d.coins).toBe(reward.kind === "coins" ? reward.coins : 0);
    expect(Object.keys(d.mysteries)).toEqual([coinBox]);
  });

  it("collect stickers, duplicates included, for the Surprises page", () => {
    const sticker = SURPRISE_STICKERS[0];
    const boxes = ids.filter((id) => {
      const r = mysteryReward(id);
      return r.kind === "sticker" && r.sticker.id === sticker.id;
    });
    const d = derive(boxes.slice(0, 2).map((id) => opened(id)));
    expect(d.surprises[sticker.id]).toBe(2);
    expect(d.coins).toBe(0);
    const page = surpriseStickers(d.surprises);
    expect(page).toHaveLength(SURPRISE_STICKERS.length);
    expect(page[0]).toMatchObject({ earned: true, count: 2 });
    expect(page.filter((s) => s.earned)).toHaveLength(1);
    expect(page.find((s) => s.id === "surprise:unicorn")?.hint).toMatch(/rare/);
  });
});
