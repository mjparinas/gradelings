// @vitest-environment jsdom
import { act, fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/lib/localdb", () => ({ putEvents: vi.fn(), setKV: vi.fn(), getKV: vi.fn(), allEvents: vi.fn(async () => []), deleteProfileEvents: vi.fn(), clearAll: vi.fn() }));
vi.mock("@/lib/router", () => ({ go: vi.fn() }));
vi.mock("@/lib/sound", () => ({ sounds: { pop: vi.fn(), clink: vi.fn() }, setQuietCheck: vi.fn(), setSoundCheck: vi.fn() }));
vi.mock("./BuddySays", () => ({ SayButton: () => null }));

import type { AppEvent, Profile } from "@/lib/model";
import { derive } from "@/lib/derive";
import { mysteryReward } from "@/lib/mystery";
import { setRemoteFlags } from "@/lib/remoteFlags";
import { go } from "@/lib/router";
import { derivedFor, useStore } from "@/lib/store";
import { MysteryBox } from "./MysteryBox";

const profile: Profile = { id: "p1", name: "Ava", avatar: "ollie", colour: "#fff", grade: "2", framework: "ca-bc", createdAt: 1, updatedAt: 1 };
const lesson = (id: string, t = Date.now() - 1000): AppEvent => ({ id, profileId: "p1", t, type: "session", mode: "practice", scope: "mix", total: 8, correct: 7, ms: 60_000 });
const opened = (session: string, t = Date.now() - 5000): AppEvent => ({ id: `m-${session}`, profileId: "p1", t, type: "mystery", session });

/** A lesson id whose box holds this kind of reward. */
const lessonWith = (kind: "coins" | "sticker") => Array.from({ length: 200 }, (_, i) => `lesson-${i}`).find((id) => mysteryReward(id).kind === kind)!;

beforeEach(() => {
  setRemoteFlags({ flags: {}, variants: {} });
  useStore.setState({ profiles: [profile], activeId: "p1", events: [], toasts: [], settings: {} });
  window.matchMedia = vi.fn().mockReturnValue({ matches: true }) as unknown as typeof window.matchMedia;
});

describe("MysteryBox", () => {
  it("always comes with the first lesson, and opening it adds the coins once", () => {
    const id = lessonWith("coins");
    const reward = mysteryReward(id);
    useStore.setState({ events: [lesson(id)] });
    render(<MysteryBox answers={8} />);
    const before = derivedFor(useStore.getState(), "p1").coins;
    fireEvent.click(screen.getByRole("button", { name: "Open the mystery box" }));
    expect(screen.getByRole("status")).toHaveTextContent(`${reward.kind === "coins" ? reward.coins : 0} coins!`);
    // Trophies (Surprise! among them) add their own coins; the box adds its coins once.
    const events = useStore.getState().events;
    expect(derive(events.filter((e) => e.type !== "trophy")).coins - before).toBe(reward.kind === "coins" ? reward.coins : 0);
    expect(events.some((e) => e.type === "trophy" && e.trophy === "mystery-1")).toBe(true);
    expect(useStore.getState().events.filter((e) => e.type === "mystery")).toEqual([expect.objectContaining({ session: id })]);
  });

  it("shows a sticker with a link to the sticker book", () => {
    const id = lessonWith("sticker");
    useStore.setState({ events: [lesson(id)] });
    render(<MysteryBox answers={8} />);
    fireEvent.click(screen.getByRole("button", { name: "Open the mystery box" }));
    expect(screen.getByRole("status")).toHaveTextContent(/sticker/);
    fireEvent.click(screen.getByRole("button", { name: /See your stickers/ }));
    expect(go).toHaveBeenCalledWith("/stickers", { page: "surprises" });
  });

  it("waits for the box to wiggle open when motion is on", () => {
    vi.useFakeTimers();
    try {
      window.matchMedia = vi.fn().mockReturnValue({ matches: false }) as unknown as typeof window.matchMedia;
      useStore.setState({ events: [lesson("first")] });
      render(<MysteryBox answers={8} />);
      fireEvent.click(screen.getByRole("button", { name: "Open the mystery box" }));
      expect(screen.queryByRole("status")).not.toBeInTheDocument();
      act(() => void vi.advanceTimersByTime(700));
      expect(screen.getByRole("status")).toBeInTheDocument();
    } finally {
      vi.useRealTimers();
    }
  });

  it("needs a real lesson: enough answers, not already opened, and not switched off", () => {
    useStore.setState({ events: [lesson("short")] });
    const { unmount } = render(<MysteryBox answers={4} />);
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
    unmount();

    useStore.setState({ events: [lesson("done"), opened("done")] });
    const second = render(<MysteryBox answers={8} />);
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
    second.unmount();

    useStore.setState({ events: [lesson("old", Date.now() - 2 * 3600_000)] });
    const third = render(<MysteryBox answers={8} />);
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
    third.unmount();

    setRemoteFlags({ flags: { "mystery-rewards": false }, variants: {} });
    useStore.setState({ events: [lesson("off")] });
    render(<MysteryBox answers={8} />);
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("stops after 3 boxes in a day", () => {
    const today = ["a", "b", "c"].flatMap((id) => [lesson(id, Date.now() - 60_000), opened(id)]);
    useStore.setState({ events: [...today, lesson("fourth")] });
    render(<MysteryBox answers={8} />);
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });
});
