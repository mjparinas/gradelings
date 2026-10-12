// @vitest-environment jsdom
import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { AgeBand } from "@/content/types";

// Pairs are A1/B1, A2/B2, … and the deal is not shuffled, so cards come in pair order.
const h = vi.hoisted(() => ({ deals: 0, boop: vi.fn(), complete: vi.fn() }));
vi.mock("./content", () => ({
  memoryPairs: (_grade: string, count: number) => {
    h.deals += 1;
    return Array.from({ length: count }, (_, i) => ({ a: `A${i + 1}`, b: `B${i + 1}` }));
  },
  shuffled: <T,>(items: T[]) => items,
}));
vi.mock("@/lib/juice", () => ({ burstFrom: vi.fn(), floatText: vi.fn() }));
vi.mock("@/lib/sound", () => ({ sounds: { tap: vi.fn(), pop: vi.fn(), boop: h.boop, complete: h.complete } }));

import { Memory } from "./Memory";

const props = { onScore: vi.fn(), onLevel: vi.fn(), onOver: vi.fn() };
const play = (band: AgeBand = "little") => render(<Memory grade="1" band={band} {...props} />);
const wait = (ms: number) => act(() => void vi.advanceTimersByTime(ms));
const cards = () => screen.getAllByRole("button");
const flip = (i: number) => fireEvent.click(cards()[i]);
const lastScore = () => props.onScore.mock.calls.at(-1)?.[0];

beforeEach(() => {
  vi.useFakeTimers();
  vi.clearAllMocks();
  h.deals = 0;
});
afterEach(() => vi.useRealTimers());

describe("Memory Match", () => {
  it("deals 4 pairs for little kids, 6 for the middle band and 8 for big kids", () => {
    const { unmount } = play("little");
    expect(cards()).toHaveLength(8);
    unmount();
    play("middle");
    expect(cards()).toHaveLength(12);
    cards().forEach((c) => expect(c).toHaveAccessibleName("hidden card"));
  });

  it("a matching pair stays face up and scores 20", () => {
    play("big");
    expect(cards()).toHaveLength(16);
    flip(0);
    flip(1);
    expect(screen.getByText("Moves: 1")).toBeInTheDocument();
    wait(350);
    expect(lastScore()).toBe(20);
    wait(1000);
    expect(cards()[0]).toHaveAccessibleName("A1");
    expect(cards()[1]).toHaveAccessibleName("B1");
  });

  it("a mismatch turns both cards back over", () => {
    play();
    flip(0);
    flip(2);
    expect(cards()[2]).toHaveAccessibleName("A2");
    // A third card can't be turned while two are showing.
    flip(3);
    expect(cards()[3]).toHaveAccessibleName("hidden card");
    wait(850);
    expect(h.boop).toHaveBeenCalledTimes(1);
    expect(cards()[0]).toHaveAccessibleName("hidden card");
    expect(cards()[2]).toHaveAccessibleName("hidden card");
    expect(lastScore()).toBe(0);
  });

  it("tapping the same card twice doesn't count as a move", () => {
    play();
    flip(0);
    flip(0);
    expect(screen.getByText("Moves: 0")).toBeInTheDocument();
    // Matched cards can't be flipped again either.
    flip(1);
    wait(350);
    flip(0);
    expect(screen.getByText("Moves: 1")).toBeInTheDocument();
  });

  it("a perfect board earns a bonus, then a fresh board at the next level", () => {
    play();
    for (let p = 0; p < 4; p++) {
      flip(p * 2);
      flip(p * 2 + 1);
      wait(350);
    }
    // 4 pairs × 20, then 30 for finishing and 5 for each move under 8.
    expect(lastScore()).toBe(80 + 30 + (8 - 4) * 5);
    expect(h.complete).toHaveBeenCalledTimes(1);
    wait(900);
    expect(props.onLevel).toHaveBeenLastCalledWith(2);
    expect(h.deals).toBe(2);
    expect(screen.getByText("Moves: 0")).toBeInTheDocument();
    cards().forEach((c) => expect(c).toHaveAccessibleName("hidden card"));
  });

  it("a slow board still finishes, just without the move bonus", () => {
    play();
    // Four misses first: 4 wasted moves.
    for (let i = 0; i < 4; i++) {
      flip(0);
      flip(3);
      wait(850);
    }
    for (let p = 0; p < 4; p++) {
      flip(p * 2);
      flip(p * 2 + 1);
      wait(350);
    }
    expect(lastScore()).toBe(80 + 30);
  });
});
