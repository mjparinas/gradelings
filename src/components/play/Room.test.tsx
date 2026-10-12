// @vitest-environment jsdom
import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { ROOM_ITEMS } from "@/lib/room";

const h = vi.hoisted(() => ({
  place: vi.fn(() => true),
  updateProfile: vi.fn(),
  pop: vi.fn(),
  room: {} as Record<string, string>,
  d: { coins: 0, level: 1, owned: [] as string[] },
}));

vi.mock("@/lib/store", () => ({
  useStore: (select: (s: unknown) => unknown) => select({ placeRoomItem: h.place, updateProfile: h.updateProfile }),
  useActiveProfile: () => ({ id: "p1", name: "Ava", companion: "ollie", room: h.room }),
  useDerived: () => h.d,
}));
vi.mock("@/lib/sound", () => ({ sounds: { pop: h.pop } }));
vi.mock("@/lib/router", () => ({ go: vi.fn() }));
vi.mock("../Critter", () => ({ CritterSvg: () => null }));

import { Room } from "./Room";

const item = (name: RegExp) => screen.getByRole("button", { name });
const tab = (name: string) => fireEvent.click(screen.getByRole("tab", { name }));
const paid = ROOM_ITEMS.filter((i) => i.cost > 0).length;

beforeEach(() => {
  vi.clearAllMocks();
  h.room = {};
  h.d = { coins: 0, level: 1, owned: [] };
});

describe("My Room", () => {
  it("starts with the plain wall and wood floor, and invites the child to spend coins", () => {
    h.d.coins = 30;
    render(<Room />);
    expect(screen.getByText("🪙 30")).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "Your room: Plain blue, Wood" })).toBeInTheDocument();
    expect(screen.getByText("Spend coins to make this room yours.")).toBeInTheDocument();
    expect(item(/^Plain blue, in your room$/)).toHaveAttribute("aria-pressed", "true");
  });

  it("items the child can't afford yet are disabled", () => {
    h.d.coins = 59;
    render(<Room />);
    expect(item(/^Sunshine, 60 coins$/)).toBeDisabled();
    h.d.coins = 60;
    render(<Room />);
    expect(screen.getAllByRole("button", { name: /^Sunshine, 60 coins$/ })[1]).toBeEnabled();
  });

  it("buying or placing an item goes through the store", () => {
    h.d.coins = 100;
    render(<Room />);
    fireEvent.click(item(/^Mint, 60 coins$/));
    expect(h.place).toHaveBeenCalledWith("room-wall-mint");
    expect(h.pop).toHaveBeenCalled();
  });

  it("no sound when the store refuses", () => {
    h.place.mockReturnValueOnce(false);
    h.d.coins = 100;
    render(<Room />);
    fireEvent.click(item(/^Mint/));
    expect(h.pop).not.toHaveBeenCalled();
  });

  it("level-locked items stay locked whatever the coins", () => {
    h.d.coins = 1000;
    h.d.level = 7;
    render(<Room />);
    expect(item(/^Sunset, locked: Reach level 8$/)).toBeDisabled();
    expect(item(/^Sunset/)).toHaveTextContent("🔒 Reach level 8");
  });

  it("shows owned things, what's placed, and counts how much of the room is collected", () => {
    h.d.owned = ["room-plant-cactus", "room-plant-tulips"];
    h.room = { plant: "room-plant-cactus" };
    render(<Room />);
    expect(screen.getByText(`You have 2 of ${paid} things for your room.`)).toBeInTheDocument();
    expect(screen.getByRole("img")).toHaveAccessibleName("Your room: Plain blue, Wood, Cactus");
    tab("Plants");
    expect(item(/^Cactus, in your room$/)).toHaveTextContent("In your room ✓");
    expect(item(/^Tulips, owned$/)).toHaveTextContent("Owned · Use");
    // Walls and floors always have something; other spots can be emptied.
    expect(screen.getByRole("button", { name: /Empty/ })).toHaveAttribute("aria-pressed", "false");
    fireEvent.click(screen.getByRole("button", { name: /Empty/ }));
    expect(h.updateProfile).toHaveBeenCalledWith("p1", { room: { plant: "" } });
  });

  it("walls can't be emptied", () => {
    render(<Room />);
    expect(screen.queryByRole("button", { name: /Empty/ })).not.toBeInTheDocument();
    tab("Toys");
    expect(screen.getByRole("button", { name: /Empty/ })).toHaveAttribute("aria-pressed", "true");
  });

  it("an item the child doesn't own isn't shown in the room even if it was placed", () => {
    h.room = { toy: "room-toy-kite" };
    render(<Room />);
    expect(screen.getByRole("img")).toHaveAccessibleName("Your room: Plain blue, Wood");
  });
});
