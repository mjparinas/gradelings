// @vitest-environment jsdom
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { defaultChildSettings, type ChildSettings, type Profile } from "@/lib/model";

// The real store runs; the device database is faked. The voice picker has its own tests.
vi.mock("@/lib/localdb", () => ({
  getKV: vi.fn().mockResolvedValue(undefined),
  setKV: vi.fn().mockResolvedValue(undefined),
  putEvents: vi.fn().mockResolvedValue(undefined),
  allEvents: vi.fn().mockResolvedValue([]),
  deleteProfileEvents: vi.fn().mockResolvedValue(undefined),
  clearAll: vi.fn().mockResolvedValue(undefined),
}));
vi.mock("./VoicePicker", () => ({ VoicePicker: () => null }));

import { useStore } from "@/lib/store";
import { SettingsPage } from "./Settings";

const kid = (id: string, name: string, over: Partial<Profile> = {}): Profile => ({ id, name, avatar: "ollie", colour: "#fff", grade: "3", framework: "ca-bc", createdAt: 1, updatedAt: 1, ...over });
const stored = (id = "a"): ChildSettings => useStore.getState().settings[id];
const sw = (name: string | RegExp) => screen.getByRole("switch", { name });

beforeEach(() => {
  useStore.setState({ profiles: [kid("a", "Ava")], settings: {}, pin: null, sync: { cursor: 0, status: "signed-out", dirtyProfiles: [], dirtyFamily: false } });
});

describe("SettingsPage", () => {
  it("asks for a child first when there are none", () => {
    useStore.setState({ profiles: [] });
    render(<SettingsPage />);
    expect(screen.getByRole("link", { name: "Add a child" })).toBeInTheDocument();
  });

  it("starts from the defaults for the child's grade and saves a changed goal, marked for sync", async () => {
    render(<SettingsPage />);
    const goal = screen.getByRole("slider", { name: /Daily learning goal/ });
    expect(goal).toHaveAttribute("aria-valuenow", "15");
    fireEvent.keyDown(goal, { key: "ArrowRight" });
    expect(stored().dailyGoalMinutes).toBe(20);
    expect(useStore.getState().sync.dirtyProfiles).toContain("a");
    fireEvent.keyDown(goal, { key: "End" });
    expect(stored().dailyGoalMinutes).toBe(60);
    fireEvent.keyDown(goal, { key: "Home" });
    expect(stored().dailyGoalMinutes).toBe(5);
  });

  it("shows the chosen child's settings when there are several", () => {
    useStore.setState({
      profiles: [kid("a", "Ava"), kid("b", "Ben")],
      settings: { b: { ...defaultChildSettings("b", false, "3"), dailyGoalMinutes: 35 } },
    });
    render(<SettingsPage childId="b" />);
    expect(screen.getByRole("heading", { name: "⏱️ Ben's daily goal" })).toBeInTheDocument();
    expect(screen.getByRole("slider", { name: /Daily learning goal/ })).toHaveAttribute("aria-valuenow", "35");
    expect(screen.getByRole("tab", { name: /Ben/ })).toHaveAttribute("aria-selected", "true");
  });

  it("locks the daily goal when the child may not pick a lighter or stretch goal", async () => {
    render(<SettingsPage />);
    const pickGoal = sw(/Let them pick a lighter or stretch goal/);
    expect(pickGoal).toHaveAttribute("aria-checked", "true");
    await userEvent.click(pickGoal);
    expect(stored().lockGoal).toBe(true);
    expect(pickGoal).toHaveAttribute("aria-checked", "false");
  });

  it("turns every calm option on with one button, and off again", async () => {
    render(<SettingsPage />);
    await userEvent.click(screen.getByRole("button", { name: "Turn on all calm options" }));
    expect(stored()).toMatchObject({ calmMotion: true, quietSounds: true, hideTimers: true, quietToasts: true, shortSessions: true });
    expect(screen.getByRole("radio", { name: "Hide all" })).toHaveAttribute("aria-checked", "true");
    // Calm motion also turns vibration off.
    expect(sw(/Vibration/)).toHaveAttribute("aria-checked", "false");
    await userEvent.click(screen.getByRole("button", { name: "Turn all calm options off" }));
    expect(stored()).toMatchObject({ calmMotion: false, quietSounds: false, hideTimers: false, quietToasts: false, shortSessions: false });
  });

  it("calls it 'all on' only when every calm option is on", async () => {
    render(<SettingsPage />);
    await userEvent.click(sw(/Calm motion/));
    await userEvent.click(sw(/Quiet sounds/));
    expect(stored()).toMatchObject({ calmMotion: true, quietSounds: true });
    expect(screen.getByRole("button", { name: "Turn on all calm options" })).toBeInTheDocument();
  });

  it("stores the timer choice in the fields older devices read", async () => {
    render(<SettingsPage />);
    expect(screen.getByRole("radio", { name: "Show all" })).toHaveAttribute("aria-checked", "true");
    await userEvent.click(screen.getByRole("radio", { name: "Countdowns only" }));
    expect(stored()).toMatchObject({ hideTimers: false, showTimer: false });
    expect(screen.getByText(/No clock in normal lessons/)).toBeInTheDocument();
    await userEvent.click(screen.getByRole("radio", { name: "Hide all" }));
    expect(stored().hideTimers).toBe(true);
    expect(screen.getByText(/Speed Run and Challenge show a quiet bar instead/)).toBeInTheDocument();
  });

  it("saves the other per-child switches", async () => {
    render(<SettingsPage />);
    for (const [name, key] of [
      [/Hold trophy pop-ups/, "quietToasts"],
      [/Hints count as first try/, "freeHints"],
      [/Shorter sessions/, "shortSessions"],
      [/Roomy text/, "roomyText"],
      [/High contrast/, "highContrast"],
    ] as const) {
      await userEvent.click(sw(name));
      expect(stored()[key]).toBe(true);
    }
    await userEvent.click(sw(/^Sounds/));
    expect(stored().sound).toBe(false);
    await userEvent.click(sw(/Vibration/));
    expect(stored().haptics).toBe(false);
    // Grade 3 doesn't read aloud by default.
    await userEvent.click(sw(/Read questions out loud/));
    expect(stored().autoRead).toBe(true);
  });

  it("explains the learn-to-play timer and hides it when games are off", async () => {
    render(<SettingsPage />);
    expect(screen.getByText("Every 20 minutes of learning unlocks 5 minutes of games, up to 20 minutes a day.")).toBeInTheDocument();
    fireEvent.keyDown(screen.getByRole("slider", { name: /Game time earned/ }), { key: "ArrowRight" });
    expect(stored().rewardGameMinutes).toBe(6);
    expect(screen.getByText(/unlocks 6 minutes of games/)).toBeInTheDocument();

    await userEvent.click(sw(/Free play/));
    expect(stored().freePlay).toBe(true);
    expect(screen.queryByRole("slider", { name: /Learning needed/ })).not.toBeInTheDocument();
    expect(screen.getByText("Up to 20 minutes of games a day.")).toBeInTheDocument();

    await userEvent.click(sw(/Arcade games/));
    expect(stored().gamesEnabled).toBe(false);
    expect(screen.queryByRole("switch", { name: /Free play/ })).not.toBeInTheDocument();
    expect(screen.queryByRole("slider", { name: /Most game time per day/ })).not.toBeInTheDocument();
  });

  it("lists the province's subjects, turns French on, and never turns the last subject off", async () => {
    render(<SettingsPage />);
    const immersion = screen.getByRole("checkbox", { name: /French Immersion/ });
    expect(immersion).toHaveAttribute("aria-checked", "false");
    expect(screen.getByRole("checkbox", { name: /Math/ })).toHaveAttribute("aria-checked", "true");
    await userEvent.click(immersion);
    expect(stored().enabledSubjects).toContain("immersion");

    useStore.setState({ settings: { a: { ...stored(), enabledSubjects: ["math"] } } });
    await userEvent.click(screen.getByRole("checkbox", { name: /Math/ }));
    expect(stored().enabledSubjects).toEqual(["math"]);
    expect(screen.getByRole("checkbox", { name: /Math/ })).toHaveAttribute("aria-checked", "true");
  });

  it("changes the parent PIN: digits only, 4 to 6 of them", async () => {
    render(<SettingsPage />);
    const box = screen.getByRole("textbox", { name: "New PIN (4–6 digits)" });
    const change = screen.getByRole("button", { name: "Change PIN" });
    fireEvent.change(box, { target: { value: "12a" } });
    expect(box).toHaveValue("12");
    expect(change).toBeDisabled();
    fireEvent.change(box, { target: { value: "12345678" } });
    expect(box).toHaveValue("123456");
    await userEvent.click(change);
    expect(await screen.findByText("Saved ✓")).toBeInTheDocument();
    expect(box).toHaveValue("");
    expect(await useStore.getState().checkPin("123456")).toBe(true);
    expect(await useStore.getState().checkPin("1234")).toBe(false);
    // Typing again hides the old confirmation.
    fireEvent.change(box, { target: { value: "9" } });
    await waitFor(() => expect(screen.queryByText("Saved ✓")).not.toBeInTheDocument());
  });
});
