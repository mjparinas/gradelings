// @vitest-environment jsdom
import { render, screen } from "@testing-library/react";
import { beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import { allUnitRefs, loadGrade, type UnitRef } from "@/content";
import type { AppEvent, Profile } from "@/lib/model";
import { FREE_UNITS_PER_COURSE } from "@/lib/plan";

vi.mock("@/lib/localdb", () => ({
  getKV: vi.fn().mockResolvedValue(undefined),
  setKV: vi.fn().mockResolvedValue(undefined),
  putEvents: vi.fn().mockResolvedValue(undefined),
  allEvents: vi.fn().mockResolvedValue([]),
  deleteProfileEvents: vi.fn().mockResolvedValue(undefined),
  clearAll: vi.fn().mockResolvedValue(undefined),
}));

import { useStore } from "@/lib/store";
import { ReportCardsPage } from "./ReportCards";
import { StakeLines } from "./MembersOnly";

const DAY = 86_400_000;
const kid = (id: string, name: string): Profile => ({ id, name, avatar: "ollie", colour: "#fff", grade: "3", framework: "ca-bc", createdAt: 1, updatedAt: 1 });
let math: UnitRef[];
let n = 0;
const answers = (profileId: string, ref: UnitRef, count: number): AppEvent[] =>
  Array.from({ length: count }, () => ({ id: `e${n++}`, profileId, t: Date.now() - DAY, type: "answer", unit: ref.key, correct: true, attempts: 1, revealed: false, ms: 20_000, mode: "practice" }) as AppEvent);

beforeAll(async () => {
  await loadGrade("3", "ca-bc");
  math = allUnitRefs("3", "ca-bc").filter((r) => r.course.subject === "math");
});
beforeEach(() => {
  useStore.setState({
    profiles: [kid("a", "Ava"), kid("b", "Ben")],
    settings: {},
    activeId: "a",
    events: [...answers("a", math[0], 4), ...answers("a", math[FREE_UNITS_PER_COURSE], 6), ...answers("b", math[0], 3)],
    family: { plan: "trial", trialEndsAt: Date.now() + 5 * DAY, updatedAt: 1 },
  });
});

describe("StakeLines", () => {
  it("names each child's started units that lock when the trial ends, and skips a child with none", () => {
    render(<StakeLines />);
    expect(screen.getByText(`Ava has started 2 units. 1 of them lock when the trial ends: ${math[FREE_UNITS_PER_COURSE].unit.title}.`, { exact: false })).toBeInTheDocument();
    expect(screen.queryByText(/Ben has/)).toBeNull();
  });

  it("says the units are waiting once the trial has ended", () => {
    useStore.setState({ family: { plan: "trial", trialEndsAt: 0, updatedAt: 1 } });
    render(<StakeLines />);
    expect(screen.getByText(/Ava has 1 started unit waiting for the family plan/)).toBeInTheDocument();
  });

  it("shows nothing to members", () => {
    useStore.setState({ family: { plan: "premium", trialEndsAt: 0, updatedAt: 1 } });
    const { container } = render(<StakeLines />);
    expect(container).toBeEmptyDOMElement();
  });
});

describe("the report-card view on the free plan", () => {
  it("keeps the report card guide and shows what the conversation sheet holds", () => {
    useStore.setState({ family: { plan: "trial", trialEndsAt: 0, updatedAt: 1 } });
    render(<ReportCardsPage childId="a" />);
    expect(screen.getByRole("heading", { name: /Report-card conversation sheet/ })).toBeInTheDocument();
    expect(screen.getByText(/A printable page for parent-teacher conferences about Ava/)).toBeInTheDocument();
    expect(screen.getByText("Talking with your child's teacher")).toBeInTheDocument();
  });
});
