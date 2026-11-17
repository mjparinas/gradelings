// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { Profile } from "@/lib/model";

const state = vi.hoisted(() => ({ events: [] as unknown[], flags: { "recent-problems": true, "worked-solutions": true } as Record<string, boolean> }));
vi.mock("@/lib/remoteFlags", () => ({ useFlag: (k: string) => state.flags[k] ?? false }));
vi.mock("@/lib/store", () => ({ useStore: (sel: (s: { events: unknown[] }) => unknown) => sel({ events: state.events }) }));
vi.mock("@/lib/useNow", () => ({ useNow: () => Date.now() }));
vi.mock("@/lib/say", () => ({ useSay: () => (t: string) => t }));

import { RecentProblems } from "./RecentProblems";

const p = { id: "p1", name: "Maya", grade: "3", framework: "bc", avatar: "ollie", colour: "#fff", updatedAt: 1 } as unknown as Profile;
const miss = (extra: Record<string, unknown>) => ({ id: `e${Math.random()}`, profileId: "p1", type: "answer", unit: "3/math/addition-subtraction", t: Date.now() - 1000, correct: false, attempts: 2, revealed: false, ms: 1, mode: "practice", q: "What is 47 + 38?", g: "75", a: "85", ...extra });

beforeEach(() => {
  state.events = [miss({})];
  state.flags = { "recent-problems": true, "worked-solutions": true };
});
afterEach(cleanup);

describe("RecentProblems", () => {
  it("shows the missed question with the wrong and right answer, and opens the steps", () => {
    render(<RecentProblems p={p} />);
    expect(screen.getByText("What is 47 + 38?")).toBeTruthy();
    expect(screen.getByText("75")).toBeTruthy();
    expect(screen.getByText("85")).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: /show me how/i }));
    expect(screen.getByRole("dialog")).toBeTruthy();
  });

  it("has no steps button when step-by-step solutions are off", () => {
    state.flags["worked-solutions"] = false;
    render(<RecentProblems p={p} />);
    expect(screen.queryByRole("button", { name: /show me how/i })).toBeNull();
  });

  it("renders nothing when the flag is off or nothing was missed", () => {
    state.flags["recent-problems"] = false;
    const { container } = render(<RecentProblems p={p} />);
    expect(container.innerHTML).toBe("");
    cleanup();
    state.flags["recent-problems"] = true;
    state.events = [];
    expect(render(<RecentProblems p={p} />).container.innerHTML).toBe("");
  });
});
