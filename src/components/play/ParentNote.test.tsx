// @vitest-environment jsdom
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

const NOW = new Date(2026, 9, 12, 10, 0).getTime();
const DAY = 86_400_000;
const h = vi.hoisted(() => ({ settings: {} as Record<string, unknown> }));

vi.mock("@/lib/store", () => ({
  useActiveProfile: () => ({ id: "p1", name: "Ava" }),
  useChildSettings: () => h.settings,
}));
vi.mock("@/lib/useNow", () => ({ useNow: () => NOW }));

import { ParentNote } from "./ParentNote";

const note = () => screen.queryByRole("region", { name: "A note from your grown-up" });

beforeEach(() => {
  localStorage.clear();
  h.settings = { nudge: { id: "n1", preset: "proud", sentAt: NOW - DAY } };
});

describe("ParentNote", () => {
  it("shows a parent's note until the child says thanks, and not again after", async () => {
    const { unmount } = render(<ParentNote />);
    expect(note()).toHaveTextContent("I'm proud of you! 🌟");
    await userEvent.click(screen.getByRole("button", { name: "Thanks!" }));
    expect(note()).toBeNull();
    unmount();
    render(<ParentNote />);
    expect(note()).toBeNull();
  });

  it("a newer note shows even after an older one was closed", () => {
    localStorage.setItem("grademap.note.seen.p1", "n0");
    render(<ParentNote />);
    expect(note()).not.toBeNull();
  });

  it("an old note or an unknown preset isn't shown", () => {
    h.settings = { nudge: { id: "n1", preset: "proud", sentAt: NOW - 10 * DAY } };
    const { unmount } = render(<ParentNote />);
    expect(note()).toBeNull();
    unmount();
    h.settings = { nudge: { id: "n2", preset: "free text", sentAt: NOW } };
    render(<ParentNote />);
    expect(note()).toBeNull();
  });

  it("still works when storage is blocked", async () => {
    const get = vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
      throw new Error("blocked");
    });
    const setItem = vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new Error("blocked");
    });
    render(<ParentNote />);
    await userEvent.click(screen.getByRole("button", { name: "Thanks!" }));
    expect(note()).toBeNull();
    get.mockRestore();
    setItem.mockRestore();
  });
});
