// @vitest-environment jsdom
import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const h = vi.hoisted(() => ({ round: 0, good: true, speak: vi.fn(), boop: vi.fn(), pop: vi.fn() }));
vi.mock("@/content/random", () => ({
  chance: () => h.good,
  pick: <T,>(items: readonly T[]) => items[0],
}));
vi.mock("./content", () => ({
  bubbleRound: () => {
    h.round += 1;
    return { title: `Pop rhymes ${h.round}`, speak: `Pop words that rhyme, round ${h.round}`, good: ["cat"], bad: ["dog"] };
  },
}));
vi.mock("@/lib/juice", () => ({ burstFrom: vi.fn(), floatText: vi.fn() }));
vi.mock("@/lib/sound", () => ({ sounds: { pop: h.pop, boop: h.boop } }));
vi.mock("@/lib/speech", () => ({ speak: h.speak }));

import { Bubbles } from "./Bubbles";

const props = { onScore: vi.fn(), onLevel: vi.fn(), onOver: vi.fn() };
const SPAWN = 1200 - 70;
const wait = (ms: number) => act(() => void vi.advanceTimersByTime(ms));
const lastScore = () => props.onScore.mock.calls.at(-1)?.[0];
const lives = () => screen.getByLabelText(/lives$/).getAttribute("aria-label");
const popNewest = (word: string) => {
  const all = screen.getAllByRole("button", { name: word });
  act(() => void fireEvent.pointerDown(all.at(-1)!));
};
const spawnAndPop = (good = true) => {
  h.good = good;
  wait(SPAWN);
  popNewest(good ? "cat" : "dog");
};

beforeEach(() => {
  vi.useFakeTimers();
  vi.clearAllMocks();
  h.round = 0;
  h.good = true;
});
afterEach(() => vi.useRealTimers());

describe("Bubble Pop", () => {
  it("reads the rule aloud, and again from the speaker button", () => {
    render(<Bubbles grade="2" band="middle" {...props} />);
    expect(h.speak).toHaveBeenCalledWith("Pop words that rhyme, round 1");
    fireEvent.click(screen.getByRole("button", { name: /Pop rhymes 1/ }));
    expect(h.speak).toHaveBeenCalledTimes(2);
  });

  it("popping a matching bubble scores 10, and a bubble only pops once", () => {
    render(<Bubbles grade="2" band="middle" {...props} />);
    wait(SPAWN);
    const bubble = screen.getByRole("button", { name: "cat" });
    act(() => void fireEvent.pointerDown(bubble));
    act(() => void fireEvent.pointerDown(bubble));
    expect(lastScore()).toBe(10);
    expect(h.pop).toHaveBeenCalledTimes(1);
    // The popped bubble fades away.
    wait(400);
    expect(screen.queryByRole("button", { name: "cat" })).not.toBeInTheDocument();
  });

  it("a wrong bubble costs a heart, and the third ends the game", () => {
    render(<Bubbles grade="2" band="middle" {...props} />);
    spawnAndPop(false);
    expect(lives()).toBe("2 lives");
    expect(h.boop).toHaveBeenCalledTimes(1);
    spawnAndPop(false);
    spawnAndPop(false);
    expect(lives()).toBe("0 lives");
    wait(600);
    expect(props.onOver).toHaveBeenCalledTimes(1);
  });

  it("every six pops brings a new rule, and every eight a new level", () => {
    render(<Bubbles grade="2" band="middle" {...props} />);
    for (let i = 0; i < 5; i++) spawnAndPop();
    wait(300);
    expect(screen.getByRole("button", { name: /Pop rhymes 1/ })).toBeInTheDocument();
    spawnAndPop();
    wait(300);
    expect(screen.getByRole("button", { name: /Pop rhymes 2/ })).toBeInTheDocument();
    expect(h.speak).toHaveBeenLastCalledWith("Pop words that rhyme, round 2");
    spawnAndPop();
    spawnAndPop();
    expect(lastScore()).toBe(80);
    expect(props.onLevel).toHaveBeenLastCalledWith(2);
  });

  it("bubbles nobody pops float off the top without costing anything", () => {
    render(<Bubbles grade="2" band="little" {...props} />);
    h.good = false;
    wait(SPAWN / 0.7);
    expect(screen.getByRole("button", { name: "dog" })).toBeInTheDocument();
    // Little kids' bubbles are slow, but nothing stays forever.
    wait(25_000);
    expect(lives()).toBe("3 lives");
    expect(h.boop).not.toHaveBeenCalled();
  });
});
