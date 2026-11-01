// @vitest-environment jsdom
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import { loadGrade } from "@/content";
import type { AppEvent, FamilyInfo, Profile } from "@/lib/model";

vi.mock("@/lib/localdb", () => ({
  getKV: vi.fn().mockResolvedValue(undefined),
  setKV: vi.fn().mockResolvedValue(undefined),
  putEvents: vi.fn().mockResolvedValue(undefined),
  allEvents: vi.fn().mockResolvedValue([]),
  deleteProfileEvents: vi.fn().mockResolvedValue(undefined),
  clearAll: vi.fn().mockResolvedValue(undefined),
}));

import { useStore } from "@/lib/store";
import { PracticeSheetPage } from "./PracticeSheet";
import { ReportTabs } from "./common";

const ava: Profile = { id: "a", name: "Ava", avatar: "ollie", colour: "#fff", grade: "2", framework: "ca-bc", createdAt: 1, updatedAt: 1 };
const trial: FamilyInfo = { plan: "trial", trialEndsAt: Date.now() + 10 * 86_400_000, updatedAt: 1 };
const free: FamilyInfo = { plan: "trial", trialEndsAt: 0, updatedAt: 1, account: { email: "p@example.com" } as FamilyInfo["account"] };
let n = 0;
/** Mostly-wrong first tries on one unit, so it counts as tricky. */
const misses = (unit: string): AppEvent[] =>
  Array.from({ length: 6 }, (_, i) => ({ id: `e${++n}`, profileId: "a", type: "answer", t: Date.now() - 86_400_000 + i * 60_000, unit, correct: i === 0, attempts: 1, revealed: false, ms: 20_000, mode: "practice" }) as AppEvent);

beforeAll(() => loadGrade("2", "ca-bc"));
beforeEach(() => {
  useStore.setState({ profiles: [ava], events: [...misses("2/math/coins"), ...misses("2/math/tens-and-ones")], settings: {}, family: trial });
});

describe("the practice sheet", () => {
  it("prints questions from the child's tricky units with an answer key, and makes a new set on request", async () => {
    render(<PracticeSheetPage childId="a" />);
    expect(screen.getByRole("heading", { name: "Ava's practice sheet" })).toBeInTheDocument();
    expect(document.body.textContent).toMatch(/finding trickiest in .*: (Coins|Tens & Ones) and (Coins|Tens & Ones)\./);
    expect(screen.getByText("Question 10")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Answer key" })).toBeInTheDocument();
    // Answers are only in the key, not behind "Show answer" on each question.
    expect(screen.queryByText("Show answer")).not.toBeInTheDocument();
    expect(document.body.textContent).toContain("not a report-card mark");
    const before = screen.getAllByText(/^Question \d+$/).map((q) => q.nextSibling?.textContent).join("|");
    await userEvent.click(screen.getByRole("button", { name: /New questions/ }));
    const after = screen.getAllByText(/^Question \d+$/).map((q) => q.nextSibling?.textContent).join("|");
    expect(after).not.toBe(before);
  });

  it("says what's coming before any practice", () => {
    useStore.setState({ events: [] });
    render(<PracticeSheetPage childId="a" />);
    expect(screen.getByText(/Once Ava has practised a few lessons/)).toBeInTheDocument();
  });

  it("is part of the family plan once the trial is over", () => {
    useStore.setState({ family: free });
    render(<PracticeSheetPage childId="a" />);
    expect(screen.queryByText("Question 1")).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: "See the family plan" })).toHaveAttribute("href", "#/subscription");
  });

  it("has its own tab under Reports", () => {
    render(<ReportTabs current="sheet" childId="a" />);
    expect(screen.getByRole("link", { name: "Practice sheet" })).toHaveAttribute("href", "#/sheet/a");
  });
});
