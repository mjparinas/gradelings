// @vitest-environment jsdom
import { act, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const h = vi.hoisted(() => ({ classwork: [] as { profileId: string }[] }));
vi.mock("@/lib/store", () => ({
  useActiveProfile: () => ({ id: "p1" }),
  useStore: (select: (s: unknown) => unknown) => select({ classwork: h.classwork }),
}));
vi.mock("@/lib/say", () => ({ useChildSay: () => (t: string) => t }));

import { ClassTimerChip } from "./ClassTimer";

const respond = (body: unknown) => Promise.resolve({ ok: true, status: 200, json: () => Promise.resolve(body) } as Response);
let fetchMock: ReturnType<typeof vi.fn>;
beforeEach(() => {
  vi.useFakeTimers();
  fetchMock = vi.fn();
  vi.stubGlobal("fetch", fetchMock);
  Object.defineProperty(navigator, "onLine", { configurable: true, value: true });
});
afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllGlobals();
  h.classwork = [];
});

describe("ClassTimerChip", () => {
  it("never asks the server for a child who isn't in a class", async () => {
    render(<ClassTimerChip />);
    await act(() => vi.advanceTimersByTimeAsync(60_000));
    expect(fetchMock).not.toHaveBeenCalled();
    expect(screen.queryByTestId("class-timer")).toBeNull();
  });

  it("counts down on its own between answers, then says time's up, and goes when the teacher stops it", async () => {
    h.classwork = [{ profileId: "p1" }];
    let timer: unknown = { label: "Silent reading", totalMs: 60_000, left: 10_000, running: true, className: "Room 4" };
    fetchMock.mockImplementation(() => respond({ timer }));
    render(<ClassTimerChip />);
    await act(() => vi.advanceTimersByTimeAsync(0));
    expect(fetchMock).toHaveBeenCalledWith("/api/live/?profile=p1&timer=1", expect.objectContaining({ cache: "no-store" }));
    expect(screen.getByText("Silent reading")).toBeInTheDocument();
    expect(screen.getByRole("timer")).toHaveTextContent("0:10");
    // It takes no taps, so it can never sit on top of a button.
    expect(screen.getByTestId("class-timer").className).toContain("pointer-events-none");

    timer = { label: "Silent reading", totalMs: 60_000, left: 0, running: false, className: "Room 4" };
    await act(() => vi.advanceTimersByTimeAsync(5_000));
    expect(screen.getByRole("timer")).toHaveTextContent("Time's up!");

    timer = null;
    await act(() => vi.advanceTimersByTimeAsync(5_000));
    expect(screen.queryByTestId("class-timer")).toBeNull();
  });

  it("shows a paused timer frozen", async () => {
    h.classwork = [{ profileId: "p1" }];
    fetchMock.mockImplementation(() => respond({ timer: { label: "", totalMs: 60_000, left: 42_000, running: false, className: "Room 4" } }));
    render(<ClassTimerChip />);
    await act(() => vi.advanceTimersByTimeAsync(10_000));
    expect(screen.getByRole("timer")).toHaveTextContent("0:42 · paused");
  });
});
