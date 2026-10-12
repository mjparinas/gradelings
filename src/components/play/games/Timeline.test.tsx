// @vitest-environment jsdom
import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const h = vi.hoisted(() => ({ speak: vi.fn(), boop: vi.fn() }));
vi.mock("./timeline", () => ({
  orderSet: () => ({ title: "Smallest to biggest", speak: "Put them in order", items: [{ label: "Ant", emoji: "🐜" }, { label: "Cat", emoji: "🐱" }, { label: "Horse", emoji: "🐴" }] }),
}));
// Deal the cards backwards so they always start out of order.
vi.mock("./content", () => ({ shuffled: <T,>(items: T[]) => [...items].reverse() }));
vi.mock("@/lib/juice", () => ({ burstFrom: vi.fn(), floatText: vi.fn() }));
vi.mock("@/lib/sound", () => ({ sounds: { pop: vi.fn(), boop: h.boop, tap: vi.fn() } }));
vi.mock("@/lib/speech", () => ({ speak: h.speak }));

import { Timeline } from "./Timeline";

const props = { onScore: vi.fn(), onLevel: vi.fn(), onOver: vi.fn() };
const wait = (ms: number) => act(() => void vi.advanceTimersByTime(ms));
const lives = () => screen.getByLabelText(/lives$/).getAttribute("aria-label");
const card = (name: RegExp) => screen.getByRole("button", { name });

beforeEach(() => {
  vi.useFakeTimers();
  vi.clearAllMocks();
});
afterEach(() => vi.useRealTimers());

describe("Timeline Snap", () => {
  it("snaps cards into place in order and scores the finished set", () => {
    render(<Timeline grade="1" band="little" {...props} />);
    expect(h.speak).toHaveBeenCalledWith("Put them in order");
    fireEvent.click(card(/Ant/));
    expect(screen.queryByRole("button", { name: /Ant/ })).not.toBeInTheDocument();
    fireEvent.click(card(/Cat/));
    fireEvent.click(card(/Horse/));
    expect(props.onScore.mock.calls.at(-1)?.[0]).toBeGreaterThanOrEqual(30);
    expect(lives()).toBe("3 lives");
    wait(1000);
    // A fresh set is dealt.
    expect(card(/Ant/)).toBeInTheDocument();
  });

  it("a card out of order costs a heart and says it comes later", () => {
    render(<Timeline grade="1" band="middle" {...props} />);
    fireEvent.click(card(/Horse/));
    expect(lives()).toBe("2 lives");
    expect(screen.getByText("Not yet: “Horse” comes later. Which comes next?")).toBeInTheDocument();
    expect(card(/Horse/)).toHaveAttribute("data-state", "wrong");
  });

  it("number keys pick the cards, as in lessons", () => {
    render(<Timeline grade="1" band="big" {...props} />);
    // Cards are dealt Horse, Cat, Ant: key 3 is Ant.
    act(() => void fireEvent.keyDown(window, { key: "3" }));
    expect(screen.queryByRole("button", { name: /Ant/ })).not.toBeInTheDocument();
  });

  it("runs out of time on a set", () => {
    render(<Timeline grade="1" band="big" {...props} />);
    wait(40_500);
    expect(lives()).toBe("2 lives");
    expect(screen.getByText("Time's up! Here comes a new set.")).toBeInTheDocument();
  });
});
