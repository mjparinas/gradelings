// @vitest-environment jsdom
import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const h = vi.hoisted(() => ({ speak: vi.fn() }));
vi.mock("./coins", async (actual) => {
  const real = await actual<typeof import("./coins")>();
  return {
    ...real,
    shopOrder: () => ({ target: 35, item: "🍎", money: real.MONEY.slice(0, 3), prompt: "🍎 costs 35¢. Pay exactly 35¢.", speak: "It costs 35 cents. Pay exactly 35 cents." }),
  };
});
vi.mock("@/lib/juice", () => ({ burstFrom: vi.fn(), floatText: vi.fn() }));
vi.mock("@/lib/sound", () => ({ sounds: { pop: vi.fn(), boop: vi.fn(), tap: vi.fn() } }));
vi.mock("@/lib/speech", () => ({ speak: h.speak }));

import { CoinShop } from "./CoinShop";

const props = { onScore: vi.fn(), onLevel: vi.fn(), onOver: vi.fn() };
const wait = (ms: number) => act(() => void vi.advanceTimersByTime(ms));
const lives = () => screen.getByLabelText(/lives$/).getAttribute("aria-label");
const add = (coin: string) => fireEvent.click(screen.getByRole("button", { name: `Add a ${coin}` }));
const pay = () => fireEvent.click(screen.getByRole("button", { name: "Pay ✓" }));

beforeEach(() => {
  vi.useFakeTimers();
  vi.clearAllMocks();
});
afterEach(() => vi.useRealTimers());

describe("Coin Shop", () => {
  it("pays the exact amount with the fewest coins for a bonus", () => {
    render(<CoinShop grade="2" band="middle" {...props} />);
    expect(h.speak).toHaveBeenCalledWith("It costs 35 cents. Pay exactly 35 cents.");
    expect(screen.getByRole("button", { name: "Pay ✓" })).toBeDisabled();
    add("quarter");
    add("dime");
    pay();
    expect(screen.getByText("Exactly right, with the fewest coins! ⭐")).toBeInTheDocument();
    expect(props.onScore.mock.calls.at(-1)?.[0]).toBeGreaterThanOrEqual(15);
    expect(lives()).toBe("3 lives");
  });

  it("right with more coins is still right, without the bonus", () => {
    render(<CoinShop grade="2" band="middle" {...props} />);
    for (let i = 0; i < 7; i++) add("nickel");
    pay();
    expect(screen.getByText("Exactly right!")).toBeInTheDocument();
  });

  it("says how far off a wrong payment is, and costs a heart", () => {
    render(<CoinShop grade="2" band="middle" {...props} />);
    add("quarter");
    add("quarter");
    pay();
    expect(screen.getByText("You gave 50¢. That's 15¢ too much.")).toBeInTheDocument();
    expect(lives()).toBe("2 lives");
    // The counter is cleared for another go.
    expect(screen.getByText("Tap coins to put them on the counter.")).toBeInTheDocument();
  });

  it("takes a coin back with a tap, and adds coins with number keys", () => {
    render(<CoinShop grade="2" band="middle" {...props} />);
    act(() => void fireEvent.keyDown(window, { key: "3" }));
    act(() => void fireEvent.keyDown(window, { key: "1" }));
    fireEvent.click(screen.getByRole("button", { name: "Take back a nickel" }));
    act(() => void fireEvent.keyDown(window, { key: "2" }));
    pay();
    expect(screen.getByText(/Exactly right/)).toBeInTheDocument();
  });

  it("the customer only waits so long", () => {
    render(<CoinShop grade="2" band="big" {...props} />);
    wait(40_500);
    expect(lives()).toBe("2 lives");
    expect(screen.getByText("Time's up! 35¢ was the amount.")).toBeInTheDocument();
  });
});
