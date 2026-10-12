// @vitest-environment jsdom
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import { allUnitRefs, loadGrade, type UnitRef } from "@/content";
import { defaultChildSettings, type AppEvent, type Profile } from "@/lib/model";

// The report cards page with its conversation sheet, from real Grade 3 lessons and the real store.
vi.mock("@/lib/localdb", () => ({
  getKV: vi.fn().mockResolvedValue(undefined),
  setKV: vi.fn().mockResolvedValue(undefined),
  putEvents: vi.fn().mockResolvedValue(undefined),
  allEvents: vi.fn().mockResolvedValue([]),
  deleteProfileEvents: vi.fn().mockResolvedValue(undefined),
  clearAll: vi.fn().mockResolvedValue(undefined),
}));

import { APP_NAME } from "@/lib/brand";
import { useStore } from "@/lib/store";
import { ReportCardsPage } from "./ReportCards";

const kid = (id: string, name: string, over: Partial<Profile> = {}): Profile => ({ id, name, avatar: "ollie", colour: "#fff", grade: "3", framework: "ca-bc", createdAt: 1, updatedAt: 1, ...over });
let science: UnitRef;
beforeAll(async () => {
  await Promise.all([loadGrade("3", "ca-bc"), loadGrade("5", "ca-on")]);
  science = allUnitRefs("3", "ca-bc").find((r) => r.course.subject === "science")!;
});

const tricky = (): AppEvent[] =>
  Array.from({ length: 5 }, (_, i) => ({
    id: `e${i}`,
    profileId: "a",
    t: Date.now() - 86_400_000 + i * 1000,
    type: "answer",
    unit: science.key,
    correct: i === 0,
    attempts: 2,
    revealed: false,
    ms: 20_000,
    mode: "practice",
  })) as AppEvent[];

beforeEach(() => {
  useStore.setState({ profiles: [kid("a", "Ava")], events: [], settings: {} });
});
afterEach(() => vi.restoreAllMocks());

const sheet = () => screen.getByRole("heading", { name: "Report card conversation sheet" }).closest("section")!;

describe("ReportCardsPage and the conversation sheet", () => {
  it("frames the sheet as practice in the province's scale, not a report-card mark", () => {
    render(<ReportCardsPage />);
    expect(sheet()).toHaveTextContent("Ava · Grade 3 · BC Curriculum · last 90 days");
    expect(sheet()).toHaveTextContent(`This describes practice in ${APP_NAME} using the language of the Provincial Proficiency Scale. It is not a report-card mark. Ava's teacher decides proficiency.`);
    expect(screen.getByText(/They don't replace your child's teacher's assessment\./)).toBeInTheDocument();
    expect(screen.getByText("Which learning areas should we focus on at home for Grade 3?")).toBeInTheDocument();
  });

  it("builds the two-week plan from the child's own daily goal", () => {
    useStore.setState({ settings: { a: { ...defaultChildSettings("a", false, "3"), dailyGoalMinutes: 25 } } });
    render(<ReportCardsPage />);
    expect(sheet()).toHaveTextContent("About 3 sessions a week of 25 minutes.");
  });

  it("suggests new units over two weeks, two at a time, before any practice", () => {
    render(<ReportCardsPage />);
    for (const week of ["Week 1", "Week 2"]) {
      expect(within(within(sheet()).getByText(week).parentElement!).getAllByRole("listitem")).toHaveLength(2);
    }
    expect(sheet()).toHaveTextContent("How can I tell whether practice at home is helping?");
  });

  it("falls back to free choice when the grade's lessons haven't downloaded", () => {
    useStore.setState({ profiles: [kid("a", "Ava", { grade: "9" })] });
    render(<ReportCardsPage />);
    expect(within(sheet()).getAllByText("Free choice. Anything your child enjoys.")).toHaveLength(2);
  });

  it("turns a tricky unit into a question for the teacher and a plan item", () => {
    useStore.setState({ events: tricky() });
    render(<ReportCardsPage />);
    expect(sheet()).toHaveTextContent(`Ava is finding “${science.unit.title}” tricky in practice. Are you seeing that in class`);
    const week1 = within(sheet()).getByText("Week 1").parentElement!;
    expect(week1).toHaveTextContent(science.unit.title);
    expect(sheet()).toHaveTextContent(/Still growing: .*/);
  });

  it("prints the sheet", async () => {
    const print = vi.spyOn(window, "print").mockImplementation(() => {});
    render(<ReportCardsPage />);
    await userEvent.click(screen.getByRole("button", { name: "🖨️ Print or save as PDF" }));
    expect(print).toHaveBeenCalled();
  });

  it("follows the chosen child's province and grade", () => {
    useStore.setState({ profiles: [kid("a", "Ava"), kid("b", "Ben", { grade: "5", framework: "ca-on" })] });
    render(<ReportCardsPage childId="b" />);
    expect(sheet()).toHaveTextContent("Ben · Grade 5 · Ontario Curriculum");
    expect(screen.getByRole("tab", { name: /Ben/ })).toHaveAttribute("aria-selected", "true");
  });

  it("still shows the report card guide with no children", () => {
    useStore.setState({ profiles: [] });
    render(<ReportCardsPage />);
    expect(screen.queryByRole("heading", { name: "Report card conversation sheet" })).not.toBeInTheDocument();
    expect(screen.getByText("Which learning areas should we focus on at home?")).toBeInTheDocument();
  });
});
