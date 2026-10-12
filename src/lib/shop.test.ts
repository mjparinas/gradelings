import { describe, expect, it } from "vitest";
import { celebrationOf, getItem, isOwned, isUnlocked, SHOP, STARTER, type ShopItem } from "./shop";
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

  it("gives every item its own id, and every celebration its own name and icon", () => {
    expect(new Set(SHOP.map((i) => i.id)).size).toBe(SHOP.length);
    const styles = SHOP.filter((i) => i.kind === "confetti");
    expect(new Set(styles.map((i) => i.name)).size).toBe(styles.length);
    expect(new Set(styles.map((i) => i.icon)).size).toBe(styles.length);
    expect(styles.length).toBeGreaterThanOrEqual(29);
  });

  it("only sets a movement pattern on celebrations, and uses every pattern somewhere", () => {
    for (const item of SHOP) if (item.kind !== "confetti") expect(item.pattern, item.id).toBeUndefined();
    const used = new Set(SHOP.filter((i) => i.kind === "confetti").map((i) => i.pattern ?? "cannons"));
    expect([...used].sort()).toEqual(["cannons", "fall", "fireworks", "float"]);
  });

  it("has celebrations at every price, from first coins to the long goals", () => {
    const styles = SHOP.filter((i) => i.kind === "confetti" && i.cost > 0);
    expect(styles.filter((i) => i.cost <= 150 && !i.unlock).length).toBeGreaterThanOrEqual(4);
    expect(styles.filter((i) => i.unlock).length).toBeGreaterThanOrEqual(10);
    // Coins are only earned by learning, so prices stay inside the shop's range.
    for (const i of styles) expect(i.cost, i.id).toBeLessThanOrEqual(600);
  });

  it("looks up a child's celebration, falling back to classic for anything that isn't one", () => {
    expect(celebrationOf("balloons")).toEqual({ emoji: ["🎈", "🎈", "🎀"], pattern: "float" });
    expect(celebrationOf("hearts")).toEqual({ emoji: ["💖", "💜", "💛"], pattern: "cannons" });
    expect(celebrationOf("classic")).toEqual({ emoji: [], pattern: "cannons" });
    expect(celebrationOf("hoot")).toEqual({ emoji: [], pattern: "cannons" });
    expect(celebrationOf("gone")).toEqual({ emoji: [], pattern: "cannons" });
    expect(celebrationOf(undefined)).toEqual({ emoji: [], pattern: "cannons" });
  });

  it("keeps the rarest buddies behind a level", () => {
    for (const id of ["marlo", "willow", "frost"]) expect(isUnlocked(getItem(id)!, 1, {}), id).toBe(false);
    expect(isUnlocked(getItem("frost")!, 30, {})).toBe(true);
  });
});
