// @vitest-environment jsdom
import { act, cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import { allUnitRefs, loadGrade, type UnitRef } from "@/content";
import { defaultChildSettings, type AppEvent, type FamilyInfo, type Profile } from "@/lib/model";

// Real store and Grade 3 lessons; the install prompt has its own tests, so it stays hidden here.
vi.mock("@/lib/localdb", () => ({
  getKV: vi.fn().mockResolvedValue(undefined),
  setKV: vi.fn().mockResolvedValue(undefined),
  putEvents: vi.fn().mockResolvedValue(undefined),
  allEvents: vi.fn().mockResolvedValue([]),
  deleteProfileEvents: vi.fn().mockResolvedValue(undefined),
  clearAll: vi.fn().mockResolvedValue(undefined),
}));
vi.mock("./InstallNudge", () => ({ InstallNudge: () => null }));

import { NUDGE_PRESETS } from "@/lib/familyGoal";
import { useStore } from "@/lib/store";
import { Overview } from "./Overview";

const DAY = 86_400_000;
const kid = (id: string, name: string): Profile => ({ id, name, avatar: "ollie", colour: "#fff", grade: "3", framework: "ca-bc", createdAt: 1, updatedAt: 1 });
const guest: FamilyInfo = { plan: "trial", trialEndsAt: 0, updatedAt: 1 };

let math: UnitRef;
beforeAll(async () => {
  await loadGrade("3", "ca-bc");
  math = allUnitRefs("3", "ca-bc").find((r) => r.course.subject === "math")!;
});

let n = 0;
const answers = (profileId: string, t: number, count: number, right: number): AppEvent[] =>
  Array.from({ length: count }, (_, i) => ({ id: `e${n++}`, profileId, t: t + i * 1000, type: "answer", unit: math.key, correct: i < right, attempts: 1, revealed: false, ms: 60_000, mode: "practice" }) as AppEvent);

beforeEach(() => {
  useStore.setState({ profiles: [kid("a", "Ava")], events: [], settings: {}, family: guest });
});

const card = (name: string) => screen.getByText(name, { selector: "p.text-xl" }).closest("section")!;

describe("Overview", () => {
  it("nudges a parent without an account to back up progress", () => {
    render(<Overview />);
    expect(screen.getByText(/Progress is saved on this device only\./)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Create a free account" })).toHaveAttribute("href", "#/account");
  });

  it("drops the backup nudge once signed in", () => {
    useStore.setState({ family: { ...guest, account: { email: "p@example.com", familyId: "f" } } });
    render(<Overview />);
    expect(screen.queryByText(/Progress is saved on this device only\./)).not.toBeInTheDocument();
  });

  it("lets a parent pick a focus unit with a day, and clear it", async () => {
    render(<Overview />);
    await userEvent.click(within(card("Ava")).getByRole("button", { name: "Pick a unit" }));
    await userEvent.click(screen.getByRole("combobox", { name: "Unit for Ava" }));
    fireEvent.click(screen.getByRole("option", { name: new RegExp(math.unit.title) }));
    const until = new Date(Date.now() + 3 * DAY);
    const day = `${until.getFullYear()}-${String(until.getMonth() + 1).padStart(2, "0")}-${String(until.getDate()).padStart(2, "0")}`;
    fireEvent.change(screen.getByLabelText("Until (optional)"), { target: { value: day } });
    await userEvent.click(screen.getByRole("button", { name: "Set focus" }));
    expect(useStore.getState().settings.a.focus).toMatchObject({ unit: math.key, until: day });
    expect(card("Ava")).toHaveTextContent(`${math.unit.title} comes up more in Ava's Adventure`);
    await userEvent.click(within(card("Ava")).getByRole("button", { name: "Clear focus" }));
    expect(useStore.getState().settings.a.focus).toBeUndefined();
  });

  it("lets a parent set a reward for coins earned, then mark it as given", async () => {
    render(<Overview />);
    await userEvent.click(within(card("Ava")).getByRole("button", { name: "Set a reward" }));
    await userEvent.click(screen.getByRole("button", { name: "Movie night" }));
    await userEvent.click(screen.getByRole("radio", { name: "🪙 100" }));
    await userEvent.click(screen.getByRole("button", { name: "Save reward" }));
    expect(useStore.getState().settings.a.reward).toMatchObject({ name: "Movie night", coins: 100, startCoins: 0 });
    expect(card("Ava")).toHaveTextContent("“Movie night”: 0 of 100 coins earned so far.");
    act(() => useStore.setState({ events: answers("a", Date.now(), 120, 120) }));
    expect(within(card("Ava")).getByRole("button", { name: "Mark as given" })).toBeInTheDocument();
    await userEvent.click(within(card("Ava")).getByRole("button", { name: "Mark as given" }));
    expect(useStore.getState().settings.a.reward).toBeUndefined();
  });

  it("shows the shared family goal only with two or more children", () => {
    render(<Overview />);
    expect(screen.queryByText(/Together this week/)).not.toBeInTheDocument();
    cleanup();
    useStore.setState({ profiles: [kid("a", "Ava"), kid("b", "Ben")] });
    render(<Overview />);
    expect(screen.getByText(/Together this week/)).toBeInTheDocument();
    expect(screen.getByText(/0 of 120 questions answered/)).toBeInTheDocument();
  });

  it("lists the units a child asked a grown-up to help with", () => {
    const help = (id: string, ago: number): AppEvent => ({ id, profileId: "a", t: Date.now() - ago * 1000, type: "help", unit: math.key });
    useStore.setState({ events: [help("h1", 60), help("h2", 30)] });
    render(<Overview />);
    const asked = within(card("Ava")).getByRole("group", { name: "Ava asked for help" });
    expect(asked).toHaveTextContent(math.unit.title);
    expect(asked).toHaveTextContent("2 times");
  });

  it("shows no help list when nothing was asked", () => {
    render(<Overview />);
    expect(screen.queryByRole("group", { name: /asked for help/ })).not.toBeInTheDocument();
  });

  it("asks for a child when there are none", () => {
    useStore.setState({ profiles: [] });
    render(<Overview />);
    expect(screen.getByRole("link", { name: "Add a child" })).toBeInTheDocument();
  });

  it("shows an empty week for a child who hasn't practised", () => {
    render(<Overview />);
    const ava = card("Ava");
    expect(ava).toHaveTextContent("Grade 3 · Level 1 · 🔥 0-day streak");
    expect(ava).toHaveTextContent("This week0 min");
    expect(ava).toHaveTextContent("First-try right–");
    expect(ava).toHaveTextContent("Hasn't practised yet");
    expect(within(ava).getAllByText("Not started yet").length).toBeGreaterThan(0);
    expect(within(ava).getByRole("link", { name: "Full report →" })).toHaveAttribute("href", "#/reports/a");
  });

  it("totals this week's minutes, questions and first-try accuracy, ignoring older practice", () => {
    useStore.setState({ events: [...answers("a", Date.now() - 60_000 * 10, 6, 3), ...answers("a", Date.now() - 20 * DAY, 4, 4)] });
    render(<Overview />);
    const ava = card("Ava");
    expect(ava).toHaveTextContent("This week6 min");
    expect(ava).toHaveTextContent("Questions6");
    expect(ava).toHaveTextContent("First-try right50%");
    expect(ava).toHaveTextContent("Last practised");
    // 3 of 6 right is Developing on the BC scale.
    expect(ava).toHaveTextContent(/Math🌿 mostly Developing · 1\/\d+ units started/);
  });

  it("celebrates a month of learning with a milestone card that says it is practice", () => {
    useStore.setState({ events: [...answers("a", Date.now() - 40 * DAY, 6, 6), ...answers("a", Date.now() - DAY, 6, 6)] });
    render(<Overview />);
    const milestones = screen.getByRole("heading", { name: "Ava's milestones" }).closest("section")!;
    expect(milestones).toHaveTextContent("1 month of learning");
    expect(milestones).toHaveTextContent("These reflect practice in the app, not a report-card mark.");
  });

  it("shares a milestone as a card with no name on it, carrying the parent's invite code", async () => {
    const writeText = vi.fn(async () => {});
    Object.defineProperty(navigator, "clipboard", { value: { writeText }, configurable: true });
    localStorage.setItem("gradelings.myInvite", "ABCD2345");
    useStore.setState({ events: answers("a", Date.now() - DAY, 100, 100) });
    render(<Overview />);
    const milestones = screen.getByRole("heading", { name: "Ava's milestones" }).closest("section")!;
    expect(milestones).toHaveTextContent("never your child's name");
    await userEvent.click(within(milestones).getByRole("button", { name: "Share “100 questions right on the first try”" }));
    expect(writeText).toHaveBeenCalledWith(`${window.location.origin}/milestone/count/right/100/?ref=ABCD2345`);
    expect(within(milestones).getByRole("button", { name: "Share “100 questions right on the first try”" })).toHaveTextContent("Link copied!");
    localStorage.clear();
  });

  it("shows a card for each child with only that child's practice", () => {
    useStore.setState({ profiles: [kid("a", "Ava"), kid("b", "Ben")], events: answers("b", Date.now() - 60_000 * 10, 6, 6) });
    render(<Overview />);
    expect(card("Ava")).toHaveTextContent("Questions0");
    expect(card("Ben")).toHaveTextContent("Questions6");
    expect(within(card("Ben")).getByRole("link", { name: "Full report →" })).toHaveAttribute("href", "#/reports/b");
  });

  it("sets a weekly days goal and shows this week's progress", async () => {
    useStore.setState({ events: answers("a", Date.now() - 60_000 * 10, 6, 6) });
    render(<Overview />);
    await userEvent.click(screen.getByRole("combobox", { name: "Days a week for Ava" }));
    fireEvent.click(screen.getByRole("option", { name: "3 days a week" }));
    expect(useStore.getState().settings.a.weeklyGoalDays).toBe(3);
    expect(screen.getByRole("list", { name: "1 of 3 days practised this week" })).toBeInTheDocument();
    expect(screen.getByText("1 of 3 days so far this week.")).toBeInTheDocument();

    await userEvent.click(screen.getByRole("combobox", { name: "Days a week for Ava" }));
    fireEvent.click(screen.getByRole("option", { name: "No goal" }));
    expect(useStore.getState().settings.a.weeklyGoalDays).toBeUndefined();
    expect(screen.queryByText(/days so far this week/)).not.toBeInTheDocument();
  });

  it("celebrates a weekly goal that has been reached", () => {
    useStore.setState({
      events: answers("a", Date.now() - 60_000 * 10, 6, 6),
      settings: { a: { ...defaultChildSettings("a", false, "3"), weeklyGoalDays: 1 } },
    });
    render(<Overview />);
    expect(screen.getByText("Ava reached the goal this week. 🎉")).toBeInTheDocument();
  });

  it("sends a note picked from the fixed list, never free text", async () => {
    render(<Overview />);
    expect(screen.getByText("The note appears once on their home screen. We never send a push to children.")).toBeInTheDocument();
    expect(screen.queryByRole("textbox")).not.toBeInTheDocument();
    await userEvent.click(screen.getByRole("combobox", { name: "Note for Ava" }));
    fireEvent.click(screen.getByRole("option", { name: NUDGE_PRESETS[11].text }));
    await userEvent.click(screen.getByRole("button", { name: "Send" }));
    expect(useStore.getState().settings.a.nudge).toMatchObject({ preset: NUDGE_PRESETS[11].id });
    expect(screen.getByText(`Sent: "${NUDGE_PRESETS[11].text}" It shows on Ava's home screen the next time they open the app.`)).toBeInTheDocument();
  });

  it("stops showing a sent note once it has expired", () => {
    useStore.setState({ settings: { a: { ...defaultChildSettings("a", false, "3"), nudge: { id: "x", preset: "proud", sentAt: Date.now() - 4 * DAY } } } });
    render(<Overview />);
    expect(screen.queryByText(/^Sent:/)).not.toBeInTheDocument();
  });
});

describe("Homework on the Overview", () => {
  it("shows the teacher's current homework with progress, due date and what's done", () => {
    const now = Date.now();
    const other = allUnitRefs("3", "ca-bc").find((r) => r.course.subject === "math" && r.key !== math.key)!;
    useStore.setState({
      events: answers("a", now - DAY, 4, 4),
      classwork: [
        { profileId: "a", classId: "c", className: "Room 4", unitKeys: [math.key, other.key], due: { [math.key]: now + 2 * DAY, [other.key]: now - DAY }, goal: { [math.key]: 10 }, since: { [math.key]: now - 2 * DAY, [other.key]: now - 3 * DAY } },
        // Another child's homework stays off Ava's card.
        { profileId: "b", classId: "c", className: "Room 9", unitKeys: [math.key], since: { [math.key]: now } },
      ],
    });
    render(<Overview />);
    const hw = within(card("Ava")).getByRole("group", { name: "Homework for Ava" });
    expect(within(hw).getByText("🍎 Homework from Room 4")).toBeInTheDocument();
    expect(within(hw).getByText("0 of 2 done")).toBeInTheDocument();
    expect(within(hw).getByText(/4 of 10 questions · due/)).toBeInTheDocument();
    expect(within(hw).getByText(/Working toward Proficient · was due/)).toBeInTheDocument();
    expect(within(hw).getByText(/not a report-card mark/)).toBeInTheDocument();
    expect(within(hw).queryByText(/Room 9/)).not.toBeInTheDocument();
  });

  it("shows nothing for a child with no class homework", () => {
    useStore.setState({ classwork: [] });
    render(<Overview />);
    expect(within(card("Ava")).queryByRole("group", { name: "Homework for Ava" })).not.toBeInTheDocument();
  });
});
