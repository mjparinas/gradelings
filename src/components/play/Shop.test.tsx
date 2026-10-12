// @vitest-environment jsdom
import { fireEvent, render, screen, within } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

const h = vi.hoisted(() => ({
  buy: vi.fn(() => true),
  celebrate: vi.fn(),
  reduced: false,
  d: { coins: 0, level: 1, owned: [] as string[], trophies: {} as Record<string, number> },
}));

vi.mock("@/lib/store", () => ({
  useStore: (select: (s: unknown) => unknown) => select({ buy: h.buy }),
  useActiveProfile: () => ({ id: "p1", name: "Ava", companion: "ollie", confetti: "classic", title: "rookie" }),
  useDerived: () => h.d,
}));
vi.mock("@/lib/juice", () => ({ celebrate: h.celebrate, prefersReducedMotion: () => h.reduced }));
vi.mock("@/lib/sound", () => ({ sounds: { pop: vi.fn(), complete: vi.fn() } }));
vi.mock("@/lib/router", () => ({ go: vi.fn() }));
vi.mock("../Critter", () => ({ Critter: () => null, CritterSvg: () => null }));

import { Shop } from "./Shop";

const item = (name: RegExp) => screen.getByRole("button", { name });
const dialog = () => screen.getByRole("dialog");

beforeEach(() => {
  vi.clearAllMocks();
  h.reduced = false;
  h.d = { coins: 0, level: 1, owned: [], trophies: {} };
});

describe("Shop", () => {
  it("shows the coin balance and the buddy currently in use", () => {
    h.d.coins = 75;
    render(<Shop />);
    expect(screen.getByText("🪙 75")).toBeInTheDocument();
    expect(item(/^Ollie the Otter, equipped$/)).toHaveTextContent("Using ✓");
    expect(item(/^Hoot the Owl, 120 coins$/)).toHaveTextContent("🪙 120");
  });

  it("buying something affordable asks first, then spends and celebrates", () => {
    h.d.coins = 200;
    render(<Shop />);
    fireEvent.click(item(/^Hoot the Owl/));
    expect(within(dialog()).getByText(/It costs/)).toHaveTextContent("It costs 🪙 120. You have 🪙 200.");
    fireEvent.click(within(dialog()).getByRole("button", { name: "Buy it!" }));
    expect(h.buy).toHaveBeenCalledWith("hoot");
    expect(h.celebrate).toHaveBeenCalledWith([], "cannons");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it('"Not now" closes without buying', () => {
    h.d.coins = 200;
    render(<Shop />);
    fireEvent.click(item(/^Hoot the Owl/));
    fireEvent.click(within(dialog()).getByRole("button", { name: "Not now" }));
    expect(h.buy).not.toHaveBeenCalled();
  });

  it("says how many more coins are needed when the child can't afford it", () => {
    h.d.coins = 100;
    render(<Shop />);
    fireEvent.click(item(/^Nori the Narwhal/));
    expect(dialog()).toHaveTextContent("You need 🪙 400 more coins. Keep learning to earn them!");
    expect(within(dialog()).queryByRole("button", { name: "Buy it!" })).not.toBeInTheDocument();
    fireEvent.click(within(dialog()).getByRole("button", { name: "OK" }));
    expect(h.buy).not.toHaveBeenCalled();
  });

  it("level-locked items stay locked even with plenty of coins", () => {
    h.d.coins = 5000;
    h.d.level = 11;
    render(<Shop />);
    expect(item(/^Marlo the Marmot, locked: Reach level 12$/)).toHaveTextContent("🔒 Reach level 12 · 🪙 350");
    fireEvent.click(item(/^Marlo the Marmot/));
    expect(dialog()).toHaveTextContent("This one is locked. Reach level 12 to unlock it!");
    expect(h.buy).not.toHaveBeenCalled();
  });

  it("trophy-locked celebrations open once the trophy is won", () => {
    h.d.coins = 500;
    render(<Shop />);
    fireEvent.click(screen.getByRole("tab", { name: /Celebrations/ }));
    expect(item(/^Pancake stack, locked: Win Week Warrior$/)).toBeInTheDocument();
    expect(item(/^Classic confetti, equipped$/)).toBeInTheDocument();
  });

  it("an owned item is used straight away without spending", () => {
    h.d.coins = 0;
    h.d.owned = ["math-whiz"];
    render(<Shop />);
    fireEvent.click(screen.getByRole("tab", { name: /Titles/ }));
    expect(item(/^Rookie, equipped$/)).toBeInTheDocument();
    fireEvent.click(item(/^Math Whiz, owned$/));
    expect(h.buy).toHaveBeenCalledWith("math-whiz");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("buying a celebration plays it with its own pieces and movement", () => {
    h.d.coins = 200;
    render(<Shop />);
    fireEvent.click(screen.getByRole("tab", { name: /Celebrations/ }));
    fireEvent.click(item(/^Balloons, 150 coins$/));
    fireEvent.click(within(dialog()).getByRole("button", { name: "Buy it!" }));
    expect(h.buy).toHaveBeenCalledWith("balloons");
    expect(h.celebrate).toHaveBeenCalledWith(["🎈", "🎈", "🎀"], "float");
  });

  it("lets a child peek at a celebration before buying, even one they can't afford yet", () => {
    h.d.coins = 0;
    render(<Shop />);
    fireEvent.click(screen.getByRole("tab", { name: /Celebrations/ }));
    fireEvent.click(item(/^Snowflakes, 150 coins$/));
    fireEvent.click(within(dialog()).getByRole("button", { name: /Peek at it/ }));
    expect(h.celebrate).toHaveBeenCalledWith(["❄️", "⛄"], "fall");
    expect(h.buy).not.toHaveBeenCalled();
    expect(dialog()).toBeInTheDocument();
  });

  it("has no peek button with reduced or calm motion, and none for buddies", () => {
    h.d.coins = 500;
    render(<Shop />);
    fireEvent.click(item(/^Hoot the Owl/));
    expect(within(dialog()).queryByRole("button", { name: /Peek/ })).not.toBeInTheDocument();
    fireEvent.click(within(dialog()).getByRole("button", { name: "Not now" }));
    h.reduced = true;
    fireEvent.click(screen.getByRole("tab", { name: /Celebrations/ }));
    fireEvent.click(item(/^Fireworks/));
    expect(within(dialog()).queryByRole("button", { name: /Peek/ })).not.toBeInTheDocument();
  });

  it("switching to an owned celebration plays it, and tapping the one in use doesn't", () => {
    h.d.owned = ["fireworks"];
    h.d.level = 15;
    render(<Shop />);
    fireEvent.click(screen.getByRole("tab", { name: /Celebrations/ }));
    fireEvent.click(item(/^Classic confetti, equipped$/));
    expect(h.celebrate).not.toHaveBeenCalled();
    fireEvent.click(item(/^Fireworks, owned$/));
    expect(h.buy).toHaveBeenCalledWith("fireworks");
    expect(h.celebrate).toHaveBeenCalledWith(["🎆", "🎇", "✨"], "fireworks");
  });

  it("a failed purchase doesn't celebrate", () => {
    h.buy.mockReturnValueOnce(false);
    h.d.coins = 200;
    render(<Shop />);
    fireEvent.click(item(/^Hoot the Owl/));
    fireEvent.click(within(dialog()).getByRole("button", { name: "Buy it!" }));
    expect(h.celebrate).not.toHaveBeenCalled();
  });

  it("shows how the buddy grows with level", () => {
    h.d.level = 3;
    const { unmount } = render(<Shop />);
    const growing = screen.getByRole("region", { name: "Your buddy is growing" });
    expect(growing).toHaveTextContent("Cub · level 3");
    expect(growing).toHaveTextContent("Reach level 5 to become Explorer: a bow tie.");
    unmount();
    h.d.level = 52;
    render(<Shop />);
    expect(screen.getByRole("region", { name: "Your buddy is growing" })).toHaveTextContent("Legend · level 52");
    expect(screen.getByText("All grown up! There is nothing left to unlock.")).toBeInTheDocument();
  });
});
