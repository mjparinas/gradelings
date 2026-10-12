// @vitest-environment jsdom
import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

// Rounds come from a counter so each new round is visibly new. `good` decides whether the next word to
// fly is a target or a decoy; one word flies at a time.
const h = vi.hoisted(() => ({
  round: 0,
  good: true,
  sightWords: true,
  speak: vi.fn(),
  floatText: vi.fn(),
  pop: vi.fn(),
  boop: vi.fn(),
}));
vi.mock("@/content/random", () => ({
  chance: (p: number) => (p === 0.45 ? h.good : false),
  pick: <T,>(items: readonly T[]) => items[0],
}));
vi.mock("./content", () => ({
  ninjaRound: () => {
    h.round += 1;
    return h.sightWords
      ? { title: `word${h.round}`, speak: `Slice the word word${h.round}`, targets: [`word${h.round}`], decoys: ["decoy"] }
      : { title: "Slice the verbs", speak: "Slice the action words", targets: ["run", "jump"], decoys: ["decoy"] };
  },
}));
vi.mock("@/lib/juice", () => ({ burstFrom: vi.fn(), floatText: h.floatText }));
vi.mock("@/lib/sound", () => ({ sounds: { pop: h.pop, boop: h.boop } }));
vi.mock("@/lib/speech", () => ({ speak: h.speak }));

import { Ninja } from "./Ninja";

const props = { onScore: vi.fn(), onLevel: vi.fn(), onOver: vi.fn() };
const SPAWN = 1300 - 90;
const wait = (ms: number) => act(() => void vi.advanceTimersByTime(ms));
const lastScore = () => props.onScore.mock.calls.at(-1)?.[0];
const lives = () => screen.getByLabelText(/lives$/).getAttribute("aria-label");
/** A swipe that passes over every word on screen. */
const swipe = () => act(() => void fireEvent.pointerDown(screen.getByTestId("game-board"), { clientX: 10, clientY: 10 }));
/** Launch one word and slice it straight away. */
const launchAndSlice = (good = true) => {
  h.good = good;
  wait(SPAWN);
  swipe();
};

const size = (prop: "clientHeight" | "clientWidth", value: number) =>
  Object.defineProperty(HTMLElement.prototype, prop, { configurable: true, get: () => value });
let elementsFromPoint: typeof document.elementsFromPoint;

beforeEach(() => {
  vi.useFakeTimers();
  vi.clearAllMocks();
  h.round = 0;
  h.good = true;
  h.sightWords = true;
  size("clientHeight", 600);
  size("clientWidth", 800);
  elementsFromPoint = document.elementsFromPoint;
  document.elementsFromPoint = () => Array.from(document.querySelectorAll("[data-flyer]"));
});
afterEach(() => {
  vi.useRealTimers();
  document.elementsFromPoint = elementsFromPoint;
  Reflect.deleteProperty(HTMLElement.prototype, "clientHeight");
  Reflect.deleteProperty(HTMLElement.prototype, "clientWidth");
});

describe("Word Ninja", () => {
  it("reads the sight word aloud at the start, and again from the speaker button", () => {
    render(<Ninja grade="1" band="little" {...props} />);
    expect(h.speak).toHaveBeenCalledWith("Slice the word word1");
    fireEvent.click(screen.getByRole("button", { name: /Slice: word1/ }));
    expect(h.speak).toHaveBeenCalledTimes(2);
  });

  it("slicing the right word scores 10, then a new sight word is read out", () => {
    render(<Ninja grade="1" band="middle" {...props} />);
    wait(SPAWN);
    expect(screen.getByText("word1")).toBeInTheDocument();
    swipe();
    expect(lastScore()).toBe(10);
    expect(h.pop).toHaveBeenCalled();
    wait(350);
    expect(screen.getByRole("button", { name: /Slice: word2/ })).toBeInTheDocument();
    expect(h.speak).toHaveBeenLastCalledWith("Slice the word word2");
  });

  it("a word can only be sliced once", () => {
    render(<Ninja grade="1" band="middle" {...props} />);
    wait(SPAWN);
    swipe();
    swipe();
    expect(lastScore()).toBe(10);
  });

  it("a wrong word costs a heart, and losing all three ends the game", () => {
    render(<Ninja grade="1" band="middle" {...props} />);
    launchAndSlice(false);
    expect(lives()).toBe("2 lives");
    expect(h.boop).toHaveBeenCalledTimes(1);
    expect(h.floatText).toHaveBeenLastCalledWith(expect.anything(), "✗", "#e57a12");
    launchAndSlice(false);
    launchAndSlice(false);
    expect(lives()).toBe("0 lives");
    expect(lastScore()).toBe(0);
    wait(600);
    expect(props.onOver).toHaveBeenCalledTimes(1);
  });

  it("right words in a row build a combo worth more each time, and a miss resets it", () => {
    h.sightWords = false;
    render(<Ninja grade="4" band="big" {...props} />);
    launchAndSlice();
    launchAndSlice();
    expect(screen.queryByText(/Combo/)).not.toBeInTheDocument();
    launchAndSlice();
    expect(lastScore()).toBe(10 + 20 + 30);
    expect(screen.getByText("Combo ×3!")).toBeInTheDocument();
    expect(h.floatText).toHaveBeenLastCalledWith(expect.anything(), "+30 ×3");
    launchAndSlice(false);
    expect(screen.queryByText(/Combo/)).not.toBeInTheDocument();
    launchAndSlice();
    expect(lastScore()).toBe(60 + 10);
  });

  it("category rounds last six hits before a new category, and every 8 hits is a new level", () => {
    h.sightWords = false;
    render(<Ninja grade="4" band="big" {...props} />);
    for (let i = 0; i < 5; i++) launchAndSlice();
    wait(350);
    expect(h.round).toBe(1);
    launchAndSlice();
    wait(350);
    expect(h.round).toBe(2);
    launchAndSlice();
    expect(props.onLevel).toHaveBeenLastCalledWith(1);
    launchAndSlice();
    expect(props.onLevel).toHaveBeenLastCalledWith(2);
  });

  it("words that aren't sliced fall away on their own", () => {
    render(<Ninja grade="1" band="middle" {...props} />);
    wait(SPAWN);
    expect(screen.getByText("word1")).toBeInTheDocument();
    h.good = false;
    // Long enough to rise and fall back below the board, but not long enough for many new words.
    wait(SPAWN - 10);
    wait(1200);
    expect(screen.queryByText("word1")).not.toBeInTheDocument();
    expect(lives()).toBe("3 lives");
  });

  it("dragging with a finger draws a slice trail", () => {
    render(<Ninja grade="1" band="middle" {...props} />);
    const board = screen.getByTestId("game-board");
    fireEvent.pointerDown(board, { clientX: 10, clientY: 10 });
    fireEvent.pointerMove(board, { clientX: 40, clientY: 40, pointerType: "touch" });
    expect(board.querySelector("polyline")).not.toBeNull();
    fireEvent.pointerUp(board);
  });
});
