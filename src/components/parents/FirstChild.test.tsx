// @vitest-environment jsdom
import { act, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

// The real store runs; only the device database and sync are faked.
vi.mock("@/lib/localdb", () => ({
  getKV: vi.fn().mockResolvedValue(undefined),
  setKV: vi.fn().mockResolvedValue(undefined),
  putEvents: vi.fn().mockResolvedValue(undefined),
  allEvents: vi.fn().mockResolvedValue([]),
  unsyncedEvents: vi.fn().mockResolvedValue([]),
  markSynced: vi.fn().mockResolvedValue(undefined),
  deleteProfileEvents: vi.fn().mockResolvedValue(undefined),
  clearAll: vi.fn().mockResolvedValue(undefined),
}));
vi.mock("@/lib/sync", () => ({ syncNow: vi.fn().mockResolvedValue(undefined), startBackgroundSync: vi.fn() }));

import { useStore } from "@/lib/store";
import { FIRST_QUESTION_HREF, FirstChild } from "./FirstChild";

const assign = vi.fn();
beforeEach(() => {
  vi.useFakeTimers({ shouldAdvanceTime: true });
  assign.mockReset();
  Object.defineProperty(window, "location", { configurable: true, value: { ...window.location, assign } });
  useStore.setState({ profiles: [], settings: {}, activeId: null, events: [] });
});
afterEach(() => vi.useRealTimers());

describe("FirstChild", () => {
  it("needs a name, then adds the child, makes them the active player and opens their first question", async () => {
    render(<FirstChild onSkip={() => {}} />);
    const start = screen.getByRole("button", { name: "Start the first question" });
    expect(start).toBeDisabled();
    fireEvent.change(screen.getByRole("textbox"), { target: { value: " Ben " } });
    await userEvent.click(start);
    const kids = useStore.getState().profiles.filter((p) => !p.deleted);
    expect(kids).toHaveLength(1);
    expect(kids[0]).toMatchObject({ name: "Ben", grade: "2", framework: "ca-bc" });
    expect(useStore.getState().activeId).toBe(kids[0].id);
    await act(async () => {
      vi.advanceTimersByTime(400);
    });
    expect(assign).toHaveBeenCalledWith(FIRST_QUESTION_HREF);
    expect(FIRST_QUESTION_HREF).toBe("/play/#/session?mode=adventure&scope=mix");
  });

  it("lets a parent put it off", async () => {
    const onSkip = vi.fn();
    render(<FirstChild onSkip={onSkip} />);
    await userEvent.click(screen.getByRole("button", { name: "I’ll do this later" }));
    expect(onSkip).toHaveBeenCalled();
  });
});
