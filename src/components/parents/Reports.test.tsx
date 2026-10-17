// @vitest-environment jsdom
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import { allUnitRefs, loadGrade, type UnitRef } from "@/content";
import { defaultChildSettings, type AppEvent, type Profile } from "@/lib/model";
import { TIER_STYLE, TROPHIES } from "@/lib/trophies";

// Real store, real Grade 3 BC lessons and the real report builder: only the device database is faked.
vi.mock("@/lib/localdb", () => ({
  getKV: vi.fn().mockResolvedValue(undefined),
  setKV: vi.fn().mockResolvedValue(undefined),
  putEvents: vi.fn().mockResolvedValue(undefined),
  allEvents: vi.fn().mockResolvedValue([]),
  deleteProfileEvents: vi.fn().mockResolvedValue(undefined),
  clearAll: vi.fn().mockResolvedValue(undefined),
}));

import { useStore } from "@/lib/store";
import { ReportsPage } from "./Reports";

const DAY = 86_400_000;
const kid = (id: string, name: string): Profile => ({ id, name, avatar: "ollie", colour: "#fff", grade: "3", framework: "ca-bc", createdAt: 1, updatedAt: 1 });

let math: UnitRef;
let science: UnitRef;
beforeAll(async () => {
  await loadGrade("3", "ca-bc");
  const refs = allUnitRefs("3", "ca-bc");
  math = refs.find((r) => r.course.subject === "math")!;
  science = refs.find((r) => r.course.subject === "science")!;
});

let n = 0;
const answer = (unit: string, t: number, correct: boolean, over: Partial<AppEvent> = {}): AppEvent =>
  ({ id: `e${n++}`, profileId: "a", t, type: "answer", unit, correct, attempts: correct ? 1 : 2, revealed: false, ms: 30_000, mode: "practice", ...over }) as AppEvent;

function practice(): AppEvent[] {
  const now = Date.now();
  const yesterday = now - DAY;
  return [
    // A strength: 10 first-try right in math.
    ...Array.from({ length: 10 }, (_, i) => answer(math.key, yesterday + i * 1000, true)),
    // Worth practising: 1 of 4 in science, two with a hint opened first.
    ...Array.from({ length: 4 }, (_, i) => answer(science.key, yesterday + 20_000 + i * 1000, i === 0, i > 1 ? { hinted: true } : {})),
    { id: `s${n++}`, profileId: "a", t: yesterday + 60_000, type: "session", mode: "practice", scope: "mix", total: 14, correct: 11 } as AppEvent,
    { id: `t${n++}`, profileId: "a", t: yesterday + 61_000, type: "trophy", trophy: TROPHIES[0].id } as AppEvent,
    // Earlier practice, 20 days ago: inside a 30-day report, before a 14-day one.
    ...Array.from({ length: 6 }, (_, i) => answer(math.key, now - 20 * DAY + i * 1000, i < 3)),
  ];
}

beforeEach(() => {
  useStore.setState({ profiles: [kid("a", "Ava")], settings: {}, events: practice(), activeId: "a", family: { plan: "trial", trialEndsAt: 0, updatedAt: 1 } });
});
afterEach(() => vi.restoreAllMocks());

describe("ReportsPage", () => {
  it("asks for a child first when there are none", () => {
    useStore.setState({ profiles: [], events: [] });
    render(<ReportsPage />);
    expect(screen.getByRole("link", { name: "Add a child" })).toHaveAttribute("href", "#/children");
  });

  it("names the child, grade and curriculum, and defaults to the last 14 days", () => {
    render(<ReportsPage />);
    expect(screen.getByRole("heading", { name: "Ava's report" })).toBeInTheDocument();
    expect(screen.getByText("Grade 3 · BC Curriculum")).toBeInTheDocument();
    expect(screen.getAllByText("Last 14 days").length).toBeGreaterThan(0);
    expect(screen.getByText("Questions answered").nextSibling).toHaveTextContent("14");
    expect(screen.getByText("1 sessions finished")).toBeInTheDocument();
    expect(screen.getByText("1 active day")).toBeInTheDocument();
    // 11 of 14 right on the first try.
    expect(screen.getByText("Right on the first try").nextSibling).toHaveTextContent("79%");
  });

  it("says the levels reflect practice, not a report-card mark", () => {
    render(<ReportsPage />);
    expect(screen.getByText(/They show progress in practice, not a report card mark: your child's teacher decides proficiency\./)).toBeInTheDocument();
    expect(screen.getByText(/Levels use the Provincial Proficiency Scale/)).toBeInTheDocument();
  });

  it("switches the period and compares with the period before", async () => {
    render(<ReportsPage />);
    await userEvent.click(screen.getByRole("button", { name: "30 days" }));
    expect(screen.getAllByText("Last 30 days").length).toBeGreaterThan(0);
    expect(screen.getByText("Questions answered").nextSibling).toHaveTextContent("20");
    await userEvent.click(screen.getByRole("button", { name: "7 days" }));
    expect(screen.getByText("Questions answered").nextSibling).toHaveTextContent("14");
    // The 6 older answers are 20 days back, outside the 7 days before the last 7, so there's nothing to compare.
    expect(screen.queryByText(/points vs before/)).not.toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: "14 days" }));
    // 20 days back is inside the 14 days before the last 14, so there is a comparison.
    expect(screen.getByText(/points vs before/)).toBeInTheDocument();
    expect(screen.getByText(/min vs previous 14 days/)).toBeInTheDocument();
  });

  it("lists strengths and units worth practising with their parent notes", () => {
    render(<ReportsPage />);
    const strengths = screen.getByRole("heading", { name: "🌟 Strengths" }).parentElement!;
    expect(strengths).toHaveTextContent(math.unit.title);
    // "Recent" accuracy reads the unit's latest answers, including ones before this period: 13 of 16.
    expect(strengths).toHaveTextContent("81% recent");
    const needs = screen.getByRole("heading", { name: "🌱 Worth practising" }).parentElement!;
    expect(needs).toHaveTextContent(science.unit.title);
    expect(needs).toHaveTextContent(science.unit.parentNote);
    expect(needs).toHaveTextContent(/units in Grade 3 haven't been started yet/);
  });

  it("explains hints opened before answering, depending on the child's hint setting", () => {
    const { unmount } = render(<ReportsPage />);
    expect(screen.getByText(/Hints opened before answering:/)).toHaveTextContent("2 of 14 questions");
    expect(screen.getByText(/They count like a retry|These count like a retry/)).toBeInTheDocument();
    unmount();
    useStore.setState({ settings: { a: { ...defaultChildSettings("a", false, "3"), freeHints: true } } });
    render(<ReportsPage />);
    expect(screen.getByText(/These still count as first-try answers for this child\./)).toBeInTheDocument();
  });

  it("shows an estimated reading level only after enough passage answers", () => {
    const { unmount } = render(<ReportsPage />);
    expect(screen.queryByText(/Reading level:/)).not.toBeInTheDocument();
    unmount();
    const reading = Array.from({ length: 12 }, (_, i) => answer("3/language/main-idea", Date.now() - DAY + i * 1000, true, { rl: 6.5 } as Partial<AppEvent>));
    useStore.setState({ events: [...practice(), ...reading] });
    render(<ReportsPage />);
    const note = screen.getByText(/Reading level:/);
    expect(note).toHaveTextContent(/Grade [67] level, ahead of grade/);
    expect(note).toHaveTextContent("estimate from 12 recent passage answers, not a report-card mark");
  });

  it("shows encouraging empty states when nothing has been practised", () => {
    useStore.setState({ events: [] });
    render(<ReportsPage />);
    expect(screen.getByText("Strengths show up after a few lessons in a unit.")).toBeInTheDocument();
    expect(screen.getByText(/Nothing stands out as tricky right now/)).toBeInTheDocument();
    expect(screen.getByText("No new trophies in this period.")).toBeInTheDocument();
    expect(screen.getByText("No practice in this period yet.")).toBeInTheDocument();
    expect(screen.getByText("Right on the first try").nextSibling).toHaveTextContent("–");
    expect(screen.queryByText(/Hints opened/)).not.toBeInTheDocument();
  });

  it("lists every unit with its standard and level, and opens the table for short periods only", async () => {
    render(<ReportsPage />);
    const mathToggle = screen.getByRole("button", { name: /Math/, expanded: true });
    const table = document.getElementById(mathToggle.getAttribute("aria-controls")!)!;
    const row = within(table).getByText(new RegExp(math.unit.title)).closest("tr")!;
    expect(row).toHaveTextContent(String(math.unit.standards["ca-bc"]));
    expect(row).toHaveTextContent("81%");
    await userEvent.click(screen.getByRole("button", { name: "90 days" }));
    expect(screen.getByRole("button", { name: /Math/, expanded: false })).toBeInTheDocument();
  });

  it("shows trophies earned in the period", () => {
    render(<ReportsPage />);
    const panel = screen.getByRole("heading", { name: "🏆 Trophies this period" }).parentElement!;
    expect(within(panel).getByRole("listitem")).toHaveTextContent(`${TROPHIES[0].name}${TIER_STYLE[TROPHIES[0].tier].label}`);
  });

  it("prints the report", async () => {
    const print = vi.spyOn(window, "print").mockImplementation(() => {});
    render(<ReportsPage />);
    await userEvent.click(screen.getByRole("button", { name: "🖨️ Print" }));
    expect(print).toHaveBeenCalled();
  });

  it("offers the charts as tables, with a row for every day of the period", async () => {
    render(<ReportsPage />);
    const minutes = screen.getByText("Minutes learning per day").closest("figure")!;
    await userEvent.click(within(minutes).getByRole("button", { name: "Table" }));
    expect(within(minutes).getAllByRole("row")).toHaveLength(15);
    const subjects = screen.getByText("Questions by subject").closest("figure")!;
    await userEvent.click(within(subjects).getByRole("button", { name: "Table" }));
    expect(within(subjects).getByRole("row", { name: /Math 10/ })).toHaveTextContent("100% first try");
    expect(within(subjects).getByRole("row", { name: /Science 4/ })).toHaveTextContent("25% first try");
  });
});
