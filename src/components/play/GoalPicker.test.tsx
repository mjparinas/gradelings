// @vitest-environment jsdom
import { fireEvent, render, screen, within } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { dayKey } from "@/lib/model";

const NOW = new Date(2026, 9, 12, 10, 0).getTime();
const TODAY = dayKey(NOW);
const h = vi.hoisted(() => ({
  log: vi.fn(),
  settings: {} as Record<string, unknown>,
  goalPicks: {} as Record<string, { level: string }>,
}));

vi.mock("@/lib/store", () => ({
  useStore: (select: (s: unknown) => unknown) => select({ log: h.log }),
  useActiveProfile: () => ({ id: "p1", name: "Ava" }),
  useChildSettings: () => h.settings,
  useDerived: () => ({ goalPicks: h.goalPicks }),
}));
vi.mock("@/lib/useNow", () => ({ useNow: () => NOW }));

import { GoalChip } from "./GoalPicker";

const open = () => fireEvent.click(screen.getByRole("button", { name: /Today's goal is 15 minutes. Change it$/ }));

beforeEach(() => {
  vi.clearAllMocks();
  h.settings = { dailyGoalMinutes: 15 };
  h.goalPicks = {};
});

describe("GoalChip", () => {
  it("shows the minutes so far and lets the child pick an easier or harder day", () => {
    render(<GoalChip minutes={4} goal={15} />);
    open();
    const dialog = screen.getByRole("dialog", { name: "How much today, Ava?" });
    expect(within(dialog).getByRole("button", { name: /Easy.*10 min/ })).toHaveAttribute("aria-pressed", "false");
    expect(within(dialog).getByRole("button", { name: /Regular.*15 min/ })).toHaveAttribute("aria-pressed", "true");
    fireEvent.click(within(dialog).getByRole("button", { name: /Stretch.*20 min/ }));
    expect(h.log).toHaveBeenCalledWith([{ type: "goal", day: TODAY, level: "stretch", minutes: 20 }]);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("choosing today's current goal again logs nothing", () => {
    h.goalPicks = { [TODAY]: { level: "easy" } };
    render(<GoalChip minutes={4} goal={10} />);
    fireEvent.click(screen.getByRole("button", { name: /Change it/ }));
    fireEvent.click(screen.getByRole("button", { name: /Easy/ }));
    expect(h.log).not.toHaveBeenCalled();
  });

  it("is just a label when a parent has locked the goal", () => {
    h.settings = { dailyGoalMinutes: 15, lockGoal: true };
    render(<GoalChip minutes={7} goal={15} />);
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
    expect(screen.getByText("⏱ 7/15 min")).toBeInTheDocument();
  });
});
