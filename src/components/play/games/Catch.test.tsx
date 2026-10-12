// @vitest-environment jsdom
import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

// Two fixed rounds. `good` decides whether the next thing to fall fits the round.
const h = vi.hoisted(() => ({ good: true, speak: vi.fn(), floatText: vi.fn(), boop: vi.fn() }));
vi.mock("@/content/random", () => ({
  chance: () => h.good,
  pick: <T,>(items: readonly T[]) => items[0],
}));
vi.mock("./content", () => ({
  catchRounds: () => [
    { title: "Catch living things", speak: "Catch the living things", good: [{ emoji: "🐶", label: "dog" }], bad: [{ emoji: "🪨", label: "rock" }] },
    { title: "Catch the solids", speak: "Catch the solids", good: [{ emoji: "🧊", label: "ice" }], bad: [{ emoji: "🥛", label: "milk" }] },
  ],
}));
vi.mock("@/lib/juice", () => ({ burstFrom: vi.fn(), floatText: h.floatText }));
vi.mock("@/lib/sound", () => ({ sounds: { pop: vi.fn(), boop: h.boop } }));
vi.mock("@/lib/speech", () => ({ speak: h.speak }));

import { Catch } from "./Catch";

const props = { onScore: vi.fn(), onLevel: vi.fn(), onOver: vi.fn() };
const wait = (ms: number) => act(() => void vi.advanceTimersByTime(ms));
const lastScore = () => props.onScore.mock.calls.at(-1)?.[0];
const lives = () => screen.getByLabelText(/lives$/).getAttribute("aria-label");
const basket = () => screen.getByText("🧺");
const basketAt = () => Math.round(parseFloat(basket().style.left));
const SPAWN = 1250 - 80;
// From y = -60 to the basket line (600 - 70) at (140 + 22 + 30) px/s, plus a little slack.
const FALL = 3200;

const size = (prop: "clientHeight" | "clientWidth", value: number) =>
  Object.defineProperty(HTMLElement.prototype, prop, { configurable: true, get: () => value });

beforeEach(() => {
  vi.useFakeTimers();
  vi.clearAllMocks();
  h.good = true;
  size("clientHeight", 600);
  size("clientWidth", 800);
  // Everything falls straight down the middle, where the basket starts.
  vi.spyOn(Math, "random").mockReturnValue(0.5);
});
afterEach(() => {
  vi.useRealTimers();
  vi.restoreAllMocks();
  Reflect.deleteProperty(HTMLElement.prototype, "clientHeight");
  Reflect.deleteProperty(HTMLElement.prototype, "clientWidth");
});

describe("Critter Catch", () => {
  it("reads the round aloud and shows what to catch", () => {
    render(<Catch grade="1" band="little" {...props} />);
    expect(h.speak).toHaveBeenCalledWith("Catch the living things");
    fireEvent.click(screen.getByRole("button", { name: /Catch living things/ }));
    expect(h.speak).toHaveBeenCalledTimes(2);
  });

  it("catching the right thing scores 10", () => {
    render(<Catch grade="3" band="middle" {...props} />);
    wait(SPAWN + 20);
    expect(screen.getByText("dog")).toBeInTheDocument();
    wait(FALL);
    expect(lastScore()).toBe(10);
    expect(h.floatText).toHaveBeenCalledWith(expect.anything(), "+10 🐶");
    expect(lives()).toBe("3 lives");
  });

  it("catching the wrong thing costs a heart and says what it was; three ends the game", () => {
    h.good = false;
    render(<Catch grade="3" band="middle" {...props} />);
    wait(SPAWN + FALL);
    expect(lives()).toBe("2 lives");
    expect(h.floatText).toHaveBeenCalledWith(expect.anything(), "✗ rock", "#e57a12");
    wait(SPAWN * 2);
    expect(lives()).toBe("0 lives");
    expect(lastScore()).toBe(0);
    wait(600);
    expect(props.onOver).toHaveBeenCalled();
  });

  it("things that miss the basket just fall away", () => {
    h.good = false;
    render(<Catch grade="3" band="middle" {...props} />);
    for (let i = 0; i < 8; i++) fireEvent.keyDown(window, { key: "ArrowLeft" });
    expect(basketAt()).toBe(5);
    wait(SPAWN + FALL + 1000);
    expect(lives()).toBe("3 lives");
    expect(h.boop).not.toHaveBeenCalled();
  });

  it("the arrow keys and a finger both move the basket, and it stays on the board", () => {
    render(<Catch grade="3" band="middle" {...props} />);
    fireEvent.keyDown(window, { key: "ArrowRight" });
    expect(basketAt()).toBe(58);
    for (let i = 0; i < 10; i++) fireEvent.keyDown(window, { key: "ArrowRight" });
    expect(basketAt()).toBe(95);
    const board = screen.getByTestId("game-board");
    board.getBoundingClientRect = () => ({ left: 0, width: 800, top: 0, height: 600, right: 800, bottom: 600, x: 0, y: 0, toJSON: () => ({}) });
    fireEvent.pointerDown(board, { clientX: 200 });
    expect(basketAt()).toBe(25);
    fireEvent.pointerMove(board, { clientX: -50 });
    expect(basketAt()).toBe(5);
  });

  it("ten catches bring a new thing to catch, and eight is the next level", () => {
    render(<Catch grade="3" band="middle" {...props} />);
    wait(SPAWN + FALL);
    for (let i = 1; i < 10; i++) wait(SPAWN);
    // Once the level goes up, things come a little faster; let any in the air land.
    wait(FALL);
    expect(lastScore()).toBeGreaterThanOrEqual(100);
    expect(props.onLevel).toHaveBeenCalledWith(2);
    expect(screen.getByRole("button", { name: /Catch the solids/ })).toBeInTheDocument();
    expect(h.speak).toHaveBeenLastCalledWith("Catch the solids");
  });
});
