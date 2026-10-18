// @vitest-environment jsdom
import { act, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const h = vi.hoisted(() => ({ classwork: [{ profileId: "p1" }] as { profileId: string }[] }));
vi.mock("@/lib/store", () => ({
  useActiveProfile: () => ({ id: "p1" }),
  useStore: (select: (s: unknown) => unknown) => select({ classwork: h.classwork }),
  useChildSettings: () => ({}),
}));
vi.mock("@/lib/say", () => ({ useChildSay: () => (t: string) => t }));

import { ClassGoalCard } from "./ClassGoalCard";

const respond = (body: unknown) => Promise.resolve({ ok: true, status: 200, json: () => Promise.resolve(body) } as Response);
let body: unknown;
beforeEach(() => {
  vi.useFakeTimers();
  h.classwork = [{ profileId: "p1" }];
  body = { live: null, timer: null, goal: { target: 100, answers: 40, met: false, className: "Room 4" } };
  vi.stubGlobal("fetch", vi.fn(() => respond(body)));
  Object.defineProperty(navigator, "onLine", { configurable: true, value: true });
});
afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllGlobals();
});

describe("class goal card", () => {
  it("shows one shared bar with counts only", async () => {
    render(<ClassGoalCard />);
    await act(() => vi.advanceTimersByTimeAsync(0));
    expect(screen.getByText("40 of 100 questions answered by everyone in Room 4.")).toBeTruthy();
    expect(screen.getByRole("progressbar").getAttribute("aria-valuenow")).toBe("40");
  });

  it("celebrates when the class gets there", async () => {
    body = { live: null, timer: null, goal: { target: 100, answers: 120, met: true, className: "Room 4" } };
    render(<ClassGoalCard />);
    await act(() => vi.advanceTimersByTimeAsync(0));
    expect(screen.getByText(/answered 120 questions together/)).toBeTruthy();
  });

  it("shows nothing without a goal or for a child in no class (and never asks the server)", async () => {
    body = { live: null, timer: null, goal: null };
    const { container, rerender } = render(<ClassGoalCard />);
    await act(() => vi.advanceTimersByTimeAsync(0));
    expect(container.textContent).toBe("");
    h.classwork = [];
    rerender(<ClassGoalCard />);
    expect(container.textContent).toBe("");
  });
});
