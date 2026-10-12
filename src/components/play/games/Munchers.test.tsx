// @vitest-environment jsdom
import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { AgeBand } from "@/content/types";

// A fixed rule and no randomness: the first 8 cells of every board fit the rule ("G1"…), the rest don't ("B9"…).
// Grumbles spawn in the first free corner and always try to step up first, then down.
const h = vi.hoisted(() => ({ n: 0, round: 0, boop: vi.fn(), complete: vi.fn(), speak: vi.fn() }));
vi.mock("@/content/random", () => ({
  pick: <T,>(items: readonly T[]) => items[0],
  randInt: (min: number) => min,
  shuffle: <T,>(items: readonly T[]) => [...items],
}));
vi.mock("./content", () => ({
  muncherRules: () => [
    {
      title: "Munch the G numbers",
      speak: `Munch the G numbers, round ${++h.round}`,
      cell: (good: boolean) => ({ text: `${good ? "G" : "B"}${++h.n}`, good }),
      why: (text: string) => `${text} is not a G number.`,
    },
  ],
}));
vi.mock("@/lib/juice", () => ({ burstFrom: vi.fn(), floatText: vi.fn() }));
vi.mock("@/lib/sound", () => ({ sounds: { boop: h.boop, complete: h.complete, pop: vi.fn(), tap: vi.fn() } }));
vi.mock("@/lib/speech", () => ({ speak: h.speak }));
vi.mock("../../Critter", () => ({ CritterSvg: () => <svg data-testid="muncher" /> }));

import { Munchers } from "./Munchers";

const props = { onScore: vi.fn(), onLevel: vi.fn(), onOver: vi.fn() };
const play = (band: AgeBand = "middle") => render(<Munchers grade="3" band={band} {...props} />);
const key = (k: string) => act(() => void fireEvent.keyDown(window, { key: k }));
const wait = (ms: number) => act(() => void vi.advanceTimersByTime(ms));
const lastScore = () => props.onScore.mock.calls.at(-1)?.[0];
const lives = () => screen.getByLabelText(/lives$/).getAttribute("aria-label");

/** Munch all 8 good cells (0–5 on the top row, 6–7 on the second) with the keyboard. */
const clearBoard = () => {
  for (let i = 0; i < 6; i++) {
    key(" ");
    if (i < 5) key("ArrowRight");
  }
  key("ArrowDown");
  for (let i = 0; i < 5; i++) key("ArrowLeft");
  key(" ");
  key("ArrowRight");
  key(" ");
};

beforeEach(() => {
  vi.useFakeTimers();
  h.n = 0;
  h.round = 0;
  vi.clearAllMocks();
});
afterEach(() => vi.useRealTimers());

describe("Number Munchers", () => {
  it("munching a number that fits the rule scores 10 and empties the square", () => {
    play();
    expect(screen.getByRole("button", { name: /Munch the G numbers/ })).toBeInTheDocument();
    expect(lives()).toBe("3 lives");
    fireEvent.click(screen.getByRole("button", { name: "G1" }));
    expect(lastScore()).toBe(10);
    expect(screen.queryByRole("button", { name: "G1" })).not.toBeInTheDocument();
    expect(screen.getAllByRole("button", { name: "empty" })).toHaveLength(1);
    // Munching an empty square again does nothing.
    key(" ");
    expect(lastScore()).toBe(10);
  });

  it("tapping a far square walks there one step at a time, then munches it", () => {
    play();
    // B9 is the third square of the second row: two steps right, one down.
    fireEvent.click(screen.getByRole("button", { name: "B9" }));
    wait(110 * 3);
    expect(screen.getByRole("button", { name: "B9" })).toContainElement(screen.getByTestId("muncher"));
    expect(lives()).toBe("3 lives");
    wait(110);
    expect(screen.getByText("B9 is not a G number.")).toBeInTheDocument();
    expect(lives()).toBe("2 lives");
    expect(h.boop).toHaveBeenCalled();
  });

  it("explains a wrong munch and ends the game after the third heart", () => {
    play();
    key("ArrowDown");
    key("ArrowDown");
    key("Enter");
    expect(screen.getByText(/is not a G number/)).toBeInTheDocument();
    key("ArrowRight");
    key("Enter");
    key("ArrowRight");
    expect(props.onOver).not.toHaveBeenCalled();
    key("Enter");
    expect(lives()).toBe("0 lives");
    wait(700);
    expect(props.onOver).toHaveBeenCalledTimes(1);
  });

  it("reads the goal aloud at the start, from the speaker button, and again on each new board", () => {
    play("little");
    expect(h.speak).toHaveBeenCalledTimes(1);
    expect(h.speak).toHaveBeenLastCalledWith("Munch the G numbers, round 1");
    fireEvent.click(screen.getByRole("button", { name: /Munch the G numbers/ }));
    expect(h.speak).toHaveBeenCalledTimes(2);
    clearBoard();
    wait(700);
    expect(h.speak).toHaveBeenLastCalledWith("Munch the G numbers, round 2");
  });

  it("the arrow keys never move the muncher off the board", () => {
    play();
    key("ArrowLeft");
    key("ArrowUp");
    expect(screen.getByRole("button", { name: "G1" })).toContainElement(screen.getByTestId("muncher"));
  });

  it("clearing the board gives a 50-point bonus and a new board at the next level", () => {
    play();
    clearBoard();
    expect(lastScore()).toBe(80 + 50);
    expect(h.complete).toHaveBeenCalledTimes(1);
    expect(screen.queryAllByRole("button", { name: /^G/ })).toHaveLength(0);
    wait(700);
    expect(props.onLevel).toHaveBeenLastCalledWith(2);
    expect(screen.getAllByRole("button", { name: /^G/ })).toHaveLength(8);
  });

  it("from level 2 a Grumble appears, and walking into it costs a heart and sends it home", () => {
    play("big");
    clearBoard();
    wait(700);
    expect(screen.queryByText("👾")).not.toBeInTheDocument();
    wait(1500);
    // The Grumble waits in the top-left corner; the muncher is at square 7.
    expect(screen.getByText("👾")).toBeInTheDocument();
    key("ArrowLeft");
    key("ArrowUp");
    expect(screen.getByText("A Grumble got you!")).toBeInTheDocument();
    expect(lives()).toBe("2 lives");
    // Sent to the far corner, out of the muncher's way.
    const squares = screen.getAllByRole("button").filter((b) => !/Munch/.test(b.textContent ?? ""));
    expect(squares[29]).toHaveTextContent("👾");
  });

  it("little kids never meet a Grumble and get the simpler instructions", () => {
    play("little");
    expect(screen.getByText("Tap a square to move there and munch!")).toBeInTheDocument();
    clearBoard();
    wait(700 + 5000);
    expect(screen.queryByText("👾")).not.toBeInTheDocument();
  });
});
