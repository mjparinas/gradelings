// @vitest-environment jsdom
import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

// A fixed 2 × 1 town: the store is right, the school is wrong.
const h = vi.hoisted(() => ({ speak: vi.fn(), boop: vi.fn() }));
vi.mock("./map", () => ({
  mapQuestion: () => ({
    board: {
      kind: "town",
      cols: 2,
      rows: 1,
      tiles: [
        { id: "school", label: "school", name: "school", emoji: "🏫", col: 0, row: 0 },
        { id: "store", label: "store", name: "store", emoji: "🏪", col: 1, row: 0 },
      ],
    },
    prompt: "Tap the place to the right of the 🏫 school",
    speak: "Tap the place to the right of the school",
    answers: ["store"],
    why: "The store is to the right of the school.",
  }),
}));
vi.mock("@/lib/juice", () => ({ burstFrom: vi.fn(), floatText: vi.fn() }));
vi.mock("@/lib/sound", () => ({ sounds: { pop: vi.fn(), boop: h.boop, tap: vi.fn() } }));
vi.mock("@/lib/speech", () => ({ speak: h.speak }));

import { MapDash } from "./MapDash";

const props = { onScore: vi.fn(), onLevel: vi.fn(), onOver: vi.fn() };
const wait = (ms: number) => act(() => void vi.advanceTimersByTime(ms));
const lives = () => screen.getByLabelText(/lives$/).getAttribute("aria-label");

beforeEach(() => {
  vi.useFakeTimers();
  vi.clearAllMocks();
});
afterEach(() => vi.useRealTimers());

describe("Map Dash", () => {
  it("reads the question and scores a right tap, with a bonus for speed", () => {
    render(<MapDash grade="1" band="little" {...props} />);
    expect(h.speak).toHaveBeenCalledWith("Tap the place to the right of the school");
    fireEvent.click(screen.getByRole("button", { name: "store" }));
    const score = props.onScore.mock.calls.at(-1)?.[0];
    expect(score).toBeGreaterThan(10);
    expect(screen.getByRole("button", { name: "store" })).toHaveAttribute("data-state", "right");
    expect(lives()).toBe("3 lives");
  });

  it("a wrong tap costs a heart and says why", () => {
    render(<MapDash grade="1" band="middle" {...props} />);
    fireEvent.click(screen.getByRole("button", { name: "school" }));
    expect(lives()).toBe("2 lives");
    expect(h.boop).toHaveBeenCalled();
    expect(screen.getByText("The store is to the right of the school.")).toBeInTheDocument();
    // Taps are ignored until the next question.
    fireEvent.click(screen.getByRole("button", { name: "store" }));
    expect(props.onScore.mock.calls.at(-1)?.[0]).toBe(0);
  });

  it("running out of time costs a heart, and three misses end the game", () => {
    render(<MapDash grade="1" band="big" {...props} />);
    wait(12_500);
    expect(lives()).toBe("2 lives");
    expect(screen.getByText(/Time's up/)).toBeInTheDocument();
    wait(1500);
    fireEvent.click(screen.getByRole("button", { name: "school" }));
    wait(1500);
    fireEvent.click(screen.getByRole("button", { name: "school" }));
    expect(lives()).toBe("0 lives");
    wait(800);
    expect(props.onOver).toHaveBeenCalled();
  });

  it("doesn't run the clock while the app is in the background", () => {
    render(<MapDash grade="1" band="big" {...props} />);
    const hidden = vi.spyOn(document, "visibilityState", "get").mockReturnValue("hidden");
    wait(30_000);
    expect(lives()).toBe("3 lives");
    hidden.mockRestore();
  });
});
