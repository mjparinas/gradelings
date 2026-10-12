// @vitest-environment jsdom
import { fireEvent, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { defaultChildSettings, type ChildSettings, type Profile } from "@/lib/model";

// The real store runs; the device database is faked.
vi.mock("@/lib/localdb", () => ({
  getKV: vi.fn().mockResolvedValue(undefined),
  setKV: vi.fn().mockResolvedValue(undefined),
  putEvents: vi.fn().mockResolvedValue(undefined),
  allEvents: vi.fn().mockResolvedValue([]),
  deleteProfileEvents: vi.fn().mockResolvedValue(undefined),
  clearAll: vi.fn().mockResolvedValue(undefined),
}));

import { useStore } from "@/lib/store";
import { SettingsPage } from "./Settings";

const kid = (id: string, name: string, over: Partial<Profile> = {}): Profile => ({ id, name, avatar: "ollie", colour: "#fff", grade: "3", framework: "ca-bc", createdAt: 1, updatedAt: 1, ...over });
const stored = (id = "a"): ChildSettings => useStore.getState().settings[id];
const sw = (name: string | RegExp) => screen.getByRole("switch", { name });
const radio = (name: string) => screen.getByRole("radio", { name });
const choice = (group: string, name: string) => within(screen.getByRole("radiogroup", { name: group })).getByRole("radio", { name });

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

  it("keeps the rarely changed options folded under Advanced options", async () => {
    render(<SettingsPage />);
    const advanced = screen.getByText("🛠️ Advanced options").closest("details")!;
    expect(advanced).not.toHaveAttribute("open");
    expect(advanced).toHaveTextContent("Let them pick a lighter or stretch goal");
    expect(advanced).toHaveTextContent("Hints count as first try");
  });

  it("locks the daily goal when the child may not pick a lighter or stretch goal", async () => {
    render(<SettingsPage />);
    const pickGoal = sw(/Let them pick a lighter or stretch goal/);
    expect(pickGoal).toHaveAttribute("aria-checked", "true");
    await userEvent.click(pickGoal);
    expect(stored().lockGoal).toBe(true);
    expect(pickGoal).toHaveAttribute("aria-checked", "false");
  });

  it("turns every calm option on with one switch, and off again", async () => {
    render(<SettingsPage />);
    const calm = sw(/Calm mode/);
    expect(calm).toHaveAttribute("aria-checked", "false");
    await userEvent.click(calm);
    expect(stored()).toMatchObject({ calmMotion: true, quietSounds: true, hideTimers: true, quietToasts: true, shortSessions: true });
    expect(calm).toHaveAttribute("aria-checked", "true");
    expect(radio("Hide all")).toHaveAttribute("aria-checked", "true");
    // Gentle sounds is one of the calm options, so the Sounds choice shows it.
    expect(radio("Gentle")).toHaveAttribute("aria-checked", "true");
    await userEvent.click(calm);
    expect(stored()).toMatchObject({ calmMotion: false, quietSounds: false, hideTimers: false, quietToasts: false, shortSessions: false });
  });

  it("shows calm mode as on only when every calm option is on", async () => {
    render(<SettingsPage />);
    await userEvent.click(sw(/Calm motion/));
    await userEvent.click(sw(/Hold trophy pop-ups/));
    await userEvent.click(sw(/Shorter sessions/));
    await userEvent.click(radio("Gentle"));
    expect(sw(/Calm mode/)).toHaveAttribute("aria-checked", "false");
    await userEvent.click(radio("Hide all"));
    expect(sw(/Calm mode/)).toHaveAttribute("aria-checked", "true");
  });

  it("stores the timer choice in the fields older devices read", async () => {
    render(<SettingsPage />);
    expect(radio("Show all")).toHaveAttribute("aria-checked", "true");
    await userEvent.click(radio("Countdowns only"));
    expect(stored()).toMatchObject({ hideTimers: false, showTimer: false });
    expect(screen.getByText(/No clock in normal lessons/)).toBeInTheDocument();
    await userEvent.click(radio("Hide all"));
    expect(stored().hideTimers).toBe(true);
    expect(screen.getByText(/Speed Run and Challenge show a quiet bar instead/)).toBeInTheDocument();
  });

  it("stores the sounds choice in the fields older devices read, with vibration following it", async () => {
    render(<SettingsPage />);
    expect(choice("Sounds", "Full")).toHaveAttribute("aria-checked", "true");
    await userEvent.click(choice("Sounds", "Off"));
    expect(stored()).toMatchObject({ sound: false, haptics: false });
    expect(screen.getByText("No sounds or vibration. Read-aloud still works.")).toBeInTheDocument();
    await userEvent.click(radio("Gentle"));
    expect(stored()).toMatchObject({ sound: true, quietSounds: true, haptics: true });
    await userEvent.click(choice("Sounds", "Full"));
    expect(stored()).toMatchObject({ sound: true, quietSounds: false });
    expect(screen.queryByRole("switch", { name: /Vibration/ })).not.toBeInTheDocument();
  });

  it("saves the other per-child switches", async () => {
    render(<SettingsPage />);
    for (const [name, key] of [
      [/Hold trophy pop-ups/, "quietToasts"],
      [/Hints count as first try/, "freeHints"],
      [/Shorter sessions/, "shortSessions"],
      [/Calm motion/, "calmMotion"],
      [/Roomy text/, "roomyText"],
      [/High contrast/, "highContrast"],
    ] as const) {
      await userEvent.click(sw(name));
      expect(stored()[key]).toBe(true);
    }
    // Grade 3 doesn't read aloud by default.
    await userEvent.click(sw(/Read questions out loud/));
    expect(stored().autoRead).toBe(true);
  });

  it("offers games as earn, free play or off, with the ratio under Advanced options", async () => {
    render(<SettingsPage />);
    expect(radio("Earn game time")).toHaveAttribute("aria-checked", "true");
    expect(screen.getByText("Every 20 minutes of learning unlocks 5 minutes of games, up to 20 minutes a day.")).toBeInTheDocument();
    const ratio = screen.getByRole("slider", { name: /Game time earned/ });
    expect(ratio.closest("details")).toHaveTextContent("Advanced options");
    fireEvent.keyDown(ratio, { key: "ArrowRight" });
    expect(stored().rewardGameMinutes).toBe(6);
    expect(screen.getByText(/unlocks 6 minutes of games/)).toBeInTheDocument();

    await userEvent.click(radio("Free play"));
    expect(stored()).toMatchObject({ gamesEnabled: true, freePlay: true });
    expect(screen.queryByRole("slider", { name: /Learning needed/ })).not.toBeInTheDocument();
    expect(screen.getByText("Games are open any time, up to 20 minutes a day.")).toBeInTheDocument();

    await userEvent.click(choice("Games", "Off"));
    expect(stored().gamesEnabled).toBe(false);
    expect(screen.queryByRole("slider", { name: /Most game time per day/ })).not.toBeInTheDocument();
    // Turning games back on keeps free play.
    await userEvent.click(radio("Free play"));
    expect(stored()).toMatchObject({ gamesEnabled: true, freePlay: true });
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

  it("leaves the device-wide voice and PIN to the Account page", () => {
    render(<SettingsPage />);
    expect(screen.queryByRole("button", { name: "Change PIN" })).not.toBeInTheDocument();
    expect(screen.queryByText(/Read-aloud voice/)).not.toBeInTheDocument();
    expect(screen.getByText(/The read-aloud voice and parent PIN are under Account\./)).toBeInTheDocument();
  });
});
