// @vitest-environment jsdom
import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const h = vi.hoisted(() => ({ speak: vi.fn() }));
vi.mock("./tower", async (actual) => ({
  ...(await actual<typeof import("./tower")>()),
  equation: () => ({ left: "3x + 4", right: "19", speak: "3 x plus 4 equals 19", unknown: "x", answer: 5, choices: [4, 5, 6, 15] }),
}));
vi.mock("@/lib/juice", () => ({ burstFrom: vi.fn(), floatText: vi.fn() }));
vi.mock("@/lib/sound", () => ({ sounds: { pop: vi.fn(), boop: vi.fn(), tap: vi.fn() } }));
vi.mock("@/lib/speech", () => ({ speak: h.speak }));

import { Tower } from "./Tower";

const props = { onScore: vi.fn(), onLevel: vi.fn(), onOver: vi.fn() };
const wait = (ms: number) => act(() => void vi.advanceTimersByTime(ms));
const lives = () => screen.getByLabelText(/lives$/).getAttribute("aria-label");

beforeEach(() => {
  vi.useFakeTimers();
  vi.clearAllMocks();
});
afterEach(() => vi.useRealTimers());

describe("Equation Tower", () => {
  it("shows the equation on the scale and builds the tower on a right block", () => {
    render(<Tower grade="7" band="big" {...props} />);
    expect(screen.getByText("3x + 4")).toBeInTheDocument();
    expect(screen.getByText("19")).toBeInTheDocument();
    expect(h.speak).toHaveBeenCalledWith("3 x plus 4 equals 19");
    fireEvent.click(screen.getByRole("button", { name: "x = 5" }));
    expect(props.onScore.mock.calls.at(-1)?.[0]).toBeGreaterThan(10);
    expect(screen.getByRole("img", { name: "Your tower: 1 blocks" })).toBeInTheDocument();
  });

  it("a wrong block costs a heart and shows the one that balances", () => {
    render(<Tower grade="7" band="big" {...props} />);
    act(() => void fireEvent.keyDown(window, { key: "4" }));
    expect(lives()).toBe("2 lives");
    expect(screen.getByText("Not quite: x = 5 balances it.")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "x = 5" })).toHaveAttribute("data-state", "right");
    expect(screen.getByRole("button", { name: "x = 15" })).toHaveAttribute("data-state", "wrong");
  });

  it("gives older kids less time as the level climbs, and ends after three misses", () => {
    render(<Tower grade="7" band="big" {...props} />);
    wait(20_500);
    expect(lives()).toBe("2 lives");
    wait(1600);
    wait(20_500);
    wait(1600);
    wait(20_500);
    expect(lives()).toBe("0 lives");
    wait(800);
    expect(props.onOver).toHaveBeenCalled();
  });
});
