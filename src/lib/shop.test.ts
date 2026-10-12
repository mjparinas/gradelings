import { describe, expect, it } from "vitest";
import { getItem, isOwned, isUnlocked, SHOP, STARTER, type ShopItem } from "./shop";
import { getTrophy } from "./trophies";

describe("shop", () => {
  it("gives every child the free starter buddy, confetti and title", () => {
    for (const [kind, id] of Object.entries(STARTER)) {
      expect(getItem(id)).toMatchObject({ kind, cost: 0 });
      expect(isOwned(id, [])).toBe(true);
    }
    expect(SHOP.filter((i) => i.cost === 0).map((i) => i.id).sort()).toEqual(Object.values(STARTER).sort());
  });

  it("only counts a paid item as owned once it's bought, and never an unknown one", () => {
    expect(isOwned("hoot", [])).toBe(false);
    expect(isOwned("hoot", ["hoot"])).toBe(true);
    expect(isOwned("nope", ["nope"])).toBe(false);
    expect(getItem(undefined)).toBeUndefined();
    expect(getItem("hoot")?.name).toBe("Hoot the Owl");
  });

  it("needs both the level and the trophy when an item asks for both", () => {
    const item: ShopItem = { id: "x", kind: "title", name: "X", cost: 1, icon: "x", unlock: { level: 5, trophy: "streak-7", label: "x" } };
    expect(isUnlocked(item, 5, { "streak-7": 1 })).toBe(true);
    expect(isUnlocked(item, 4, { "streak-7": 1 })).toBe(false);
    expect(isUnlocked(item, 5, {})).toBe(false);
    expect(isUnlocked(item, 5, { "streak-7": 0 })).toBe(false);
    expect(isUnlocked(getItem("hoot")!, 1, {})).toBe(true);
  });

  it("gives companions a critter and confetti its pieces", () => {
    for (const item of SHOP) {
      if (item.kind === "companion") expect(item.critter, item.id).toBe(item.id);
      if (item.kind === "confetti") expect(Array.isArray(item.confetti), item.id).toBe(true);
      if (item.kind !== "companion") expect(item.critter, item.id).toBeUndefined();
    }
  });
});

describe("shop items", () => {
  it("throws real pieces for every paid confetti style, and leaves the free one to the default burst", () => {
    for (const item of SHOP.filter((i) => i.kind === "confetti")) {
      if (item.cost === 0) expect(item.confetti, item.id).toEqual([]);
      else expect(item.confetti!.length, item.id).toBeGreaterThan(0);
    }
  });

  it("labels every locked item with exactly what unlocks it, and only asks for trophies that exist", () => {
    const locked = SHOP.filter((i) => i.unlock);
    expect(locked.length).toBeGreaterThan(0);
    for (const item of locked) {
      const u = item.unlock!;
      expect(u.level !== undefined || u.trophy !== undefined, item.id).toBe(true);
      if (u.level !== undefined) expect(u.label, item.id).toBe(`Reach level ${u.level}`);
      if (u.trophy !== undefined) {
        const trophy = getTrophy(u.trophy);
        expect(trophy, `${item.id} needs ${u.trophy}`).toBeDefined();
        expect(u.label, item.id).toBe(`Win ${trophy!.name}`);
      }
    }
  });

  it("keeps the rarest buddies behind a level", () => {
    for (const id of ["marlo", "willow", "frost"]) expect(isUnlocked(getItem(id)!, 1, {}), id).toBe(false);
    expect(isUnlocked(getItem("frost")!, 30, {})).toBe(true);
  });
});
