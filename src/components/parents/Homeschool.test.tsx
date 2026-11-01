// @vitest-environment jsdom
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
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
const store = vi.hoisted(() => ({ app: false }));
vi.mock("@/lib/twa", () => ({ isStoreApp: () => store.app, isIosApp: () => false }));

import { useStore } from "@/lib/store";
import { ReportTabs } from "./common";
import { HoursLogPage, PortfolioPage } from "./Homeschool";

const at = (y: number, m: number, d: number, h = 12) => new Date(y, m - 1, d, h).getTime();
const ava: Profile = { id: "a", name: "Ava", avatar: "ollie", colour: "#fff", grade: "2", framework: "ca-bc", createdAt: at(2026, 3, 1), updatedAt: 1 };
const member: FamilyInfo = { plan: "premium", trialEndsAt: 0, updatedAt: 1 };
const free: FamilyInfo = { plan: "free", trialEndsAt: 0, updatedAt: 1 };
let n = 0;
const events = (): AppEvent[] =>
  Array.from({ length: 10 }, (_, i) => ({ id: `e${++n}`, profileId: "a", type: "answer", t: at(2026, 10, 5) + i * 60_000, unit: "2/math/tens-and-ones", correct: true, attempts: 1, revealed: false, ms: 30_000, mode: "practice", q: `Question ${i}` }) as AppEvent);

beforeAll(() => loadGrade("2", "ca-bc"));
beforeEach(() => {
  store.app = false;
  vi.useFakeTimers({ toFake: ["Date"] });
  vi.setSystemTime(at(2026, 10, 20));
  useStore.setState({ profiles: [ava], events: events(), settings: {}, family: member });
});
afterEach(() => vi.useRealTimers());

describe("the hours log", () => {
  it("shows this school year's learning time per day and subject, with a spreadsheet and print", () => {
    render(<HoursLogPage childId="a" />);
    expect(screen.getByRole("heading", { name: "Ava's hours log" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "This school year" })).toHaveAttribute("aria-pressed", "true");
    const table = screen.getByRole("table");
    expect(table).toHaveTextContent("Math");
    expect(table).toHaveTextContent("5 min");
    expect(screen.getByText("Days of learning").nextSibling).toHaveTextContent("1");
    expect(screen.getByRole("button", { name: /Download spreadsheet/ })).toBeEnabled();
    expect(screen.getByRole("button", { name: /Print or save as PDF/ })).toBeInTheDocument();
    expect(document.body.textContent).toContain("not a report-card mark");
  });

  it("narrows to this week, where there is nothing yet", async () => {
    vi.useRealTimers();
    render(<HoursLogPage childId="a" />);
    await userEvent.click(screen.getByRole("button", { name: "This week" }));
    expect(screen.getByText(/No learning time between these days yet/)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Download spreadsheet/ })).toBeDisabled();
  });

  it("is for members: the free plan sees what it is and where to get it, but not in the store apps", () => {
    useStore.setState({ family: free });
    const { unmount } = render(<HoursLogPage childId="a" />);
    expect(screen.queryByRole("table")).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: "See the family plan" })).toHaveAttribute("href", "/parents/#/subscription");
    unmount();
    store.app = true;
    render(<HoursLogPage childId="a" />);
    expect(screen.getByText(/Part of the homeschool tools/)).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "See the family plan" })).not.toBeInTheDocument();
  });
});

describe("the portfolio", () => {
  it("lists the units practised with levels and sample questions", () => {
    render(<PortfolioPage childId="a" />);
    expect(screen.getByRole("heading", { name: "Ava's learning portfolio" })).toBeInTheDocument();
    expect(screen.getByText(/Tens & Ones/)).toBeInTheDocument();
    expect(screen.getByText("✓ Question 9")).toBeInTheDocument();
    expect(screen.getByText("Questions").nextSibling).toHaveTextContent("10");
    expect(document.body.textContent).toContain("not a report-card mark");
  });
});

describe("the report views", () => {
  it("include the hours log and portfolio", () => {
    render(<ReportTabs current="hours" childId="a" />);
    expect(screen.getByRole("link", { name: "Hours log" })).toHaveAttribute("aria-current", "page");
    expect(screen.getByRole("link", { name: "Portfolio" })).toHaveAttribute("href", "#/portfolio/a");
  });
});
