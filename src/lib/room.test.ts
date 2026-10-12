import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("./localdb", () => ({ setKV: vi.fn(), putEvents: vi.fn(), deleteProfileEvents: vi.fn() }));

import { type AppEvent, type Profile } from "./model";
import { getRoomItem, isRoomOwned, ROOM_ITEMS, ROOM_SLOTS, ROOM_STARTER, roomLayout } from "./room";
import { SHOP } from "./shop";
import { useStore } from "./store";

const profile: Profile = { id: "p1", name: "Maya", avatar: "ollie", colour: "#4f8ef7", grade: "2", framework: "ca-bc", createdAt: 1, updatedAt: 1 };

/** Enough coins for `n`: sessions give 5 coins each. */
const coins = (n: number): AppEvent[] =>
  Array.from({ length: Math.ceil(n / 5) }, (_, i) => ({ id: `s${i}`, profileId: "p1", t: Date.now() - 1000 + i, type: "session", mode: "practice", scope: "mix", total: 1, correct: 0, ms: 1 }) as AppEvent);

beforeEach(() => {
  useStore.setState({ profiles: [profile], activeId: "p1", events: [], settings: {} });
});

describe("room items", () => {
  it("have unique ids that cannot clash with the shop, and every slot is known", () => {
    const ids = ROOM_ITEMS.map((i) => i.id);
    expect(new Set(ids).size).toBe(ids.length);
    expect(ids.every((id) => id.startsWith("room-") && !SHOP.some((s) => s.id === id))).toBe(true);
    const slots = ROOM_SLOTS.map((s) => s.slot);
    expect(ROOM_ITEMS.every((i) => slots.includes(i.slot))).toBe(true);
  });
  it("start with a free wall and floor, and every slot has something to buy", () => {
    for (const id of Object.values(ROOM_STARTER)) expect(getRoomItem(id)?.cost).toBe(0);
    for (const { slot } of ROOM_SLOTS) expect(ROOM_ITEMS.some((i) => i.slot === slot && i.cost > 0), slot).toBe(true);
  });
  it("give every slot a cheap first buy and a level-locked goal for older kids", () => {
    for (const { slot } of ROOM_SLOTS) {
      const paid = ROOM_ITEMS.filter((i) => i.slot === slot && i.cost > 0);
      expect(Math.min(...paid.map((i) => i.cost)), slot).toBeLessThanOrEqual(60);
      expect(paid.some((i) => i.unlock), slot).toBe(true);
    }
    for (const i of ROOM_ITEMS.filter((i) => i.cost > 0)) {
      expect(i.cost, i.id).toBeGreaterThanOrEqual(50);
      expect(i.cost, i.id).toBeLessThanOrEqual(400);
      // Higher levels ask for more coins, so a big goal never costs less than a free-to-buy one.
      if (i.unlock) expect(i.cost, i.id).toBeGreaterThanOrEqual(150);
    }
  });
  it("paint walls and floors, and give every item a name and icon unique in its slot", () => {
    for (const i of ROOM_ITEMS) expect(Boolean(i.paint), i.id).toBe(i.slot === "wall" || i.slot === "floor");
    for (const { slot } of ROOM_SLOTS) {
      const inSlot = ROOM_ITEMS.filter((i) => i.slot === slot);
      expect(new Set(inSlot.map((i) => i.name)).size, slot).toBe(inSlot.length);
      expect(new Set(inSlot.map((i) => i.icon)).size, slot).toBe(inSlot.length);
    }
  });
  it("show the starter room, and only owned items placed in the right slot", () => {
    expect(Object.keys(roomLayout(undefined, []))).toEqual(["wall", "floor"]);
    expect(roomLayout({ plant: "room-plant-cactus" }, [])).not.toHaveProperty("plant");
    expect(roomLayout({ plant: "room-plant-cactus" }, ["room-plant-cactus"]).plant?.name).toBe("Cactus");
    expect(roomLayout({ lamp: "room-plant-cactus" }, ["room-plant-cactus"])).not.toHaveProperty("lamp");
    expect(roomLayout({ wall: "" }, [])).not.toHaveProperty("wall");
    expect(isRoomOwned(getRoomItem("room-floor-wood")!, [])).toBe(true);
  });
});

describe("placing room items", () => {
  it("buys with coins, places it, and doesn't charge twice", () => {
    useStore.setState({ events: coins(100) });
    const cactus = getRoomItem("room-plant-cactus")!;
    expect(useStore.getState().placeRoomItem(cactus.id)).toBe(true);
    const bought = useStore.getState().events.filter((e) => e.type === "buy");
    expect(bought).toHaveLength(1);
    expect(useStore.getState().profiles[0].room?.plant).toBe(cactus.id);
    useStore.getState().updateProfile("p1", { room: { plant: "" } });
    expect(useStore.getState().placeRoomItem(cactus.id)).toBe(true);
    expect(useStore.getState().events.filter((e) => e.type === "buy")).toHaveLength(1);
    expect(useStore.getState().profiles[0].room?.plant).toBe(cactus.id);
  });
  it("refuses when coins are short or the level isn't reached", () => {
    expect(useStore.getState().placeRoomItem("room-plant-cactus")).toBe(false);
    useStore.setState({ events: coins(250) });
    expect(useStore.getState().placeRoomItem("room-wall-sunset")).toBe(false);
    expect(useStore.getState().profiles[0].room).toBeUndefined();
  });
});
