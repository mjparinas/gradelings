// @vitest-environment jsdom
import { fireEvent, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import { allUnitRefs, loadGrade, type UnitRef } from "@/content";
import type { AppEvent, Profile } from "@/lib/model";

vi.mock("@/lib/localdb", () => ({
  getKV: vi.fn().mockResolvedValue(undefined),
  setKV: vi.fn().mockResolvedValue(undefined),
  putEvents: vi.fn().mockResolvedValue(undefined),
  allEvents: vi.fn().mockResolvedValue([]),
  deleteProfileEvents: vi.fn().mockResolvedValue(undefined),
  clearAll: vi.fn().mockResolvedValue(undefined),
}));
vi.mock("next/link", () => ({
  default: ({ href, children, onClick, className }: { href: string; children: React.ReactNode; onClick?: () => void; className?: string }) => (
    <a
      href={href}
      className={className}
      onClick={(e) => {
        e.preventDefault();
        onClick?.();
      }}
    >
      {children}
    </a>
  ),
}));

import { setRemoteFlags } from "@/lib/remoteFlags";
import { useStore } from "@/lib/store";
import { PlacementPage } from "./Placement";

const kid = (id: string, name: string): Profile => ({ id, name, avatar: "ollie", colour: "#fff", grade: "3", framework: "ca-bc", createdAt: 1, updatedAt: 1 });
let start4: UnitRef;
let review2: UnitRef;
beforeAll(async () => {
  await Promise.all([loadGrade("2", "ca-bc"), loadGrade("3", "ca-bc"), loadGrade("4", "ca-bc")]);
  start4 = allUnitRefs("4", "ca-bc").find((r) => r.course.subject === "math")!;
  review2 = allUnitRefs("2", "ca-bc").find((r) => r.course.subject === "language")!;
});

const when = Date.UTC(2026, 8, 15, 12);
const mathAbove = {
  id: "p1",
  profileId: "a",
  t: when,
  type: "placement",
  subject: "math",
  startGrade: "3",
  stages: [
    { grade: "3", total: 4, correct: 4 },
    { grade: "4", total: 4, correct: 3 },
  ],
  placedGrade: "4",
  startUnits: [] as string[],
  reviewUnits: [] as string[],
  confidence: "ok",
};

beforeEach(() => {
  useStore.setState({ profiles: [kid("a", "Ava"), kid("b", "Ben")], activeId: "b", events: [], settings: {} });
  setRemoteFlags({ flags: {}, variants: {} });
});

const panelFor = (heading: RegExp) => screen.getByRole("heading", { name: heading }).closest("section")!;

describe("PlacementPage", () => {
  it("asks for a child first when there are none", () => {
    useStore.setState({ profiles: [] });
    render(<PlacementPage />);
    expect(screen.getByRole("link", { name: "Add a child" })).toBeInTheDocument();
  });

  it("invites a first test in math and language, and says it is not a report-card mark", () => {
    render(<PlacementPage />);
    const math = panelFor(/Math/);
    expect(math).toHaveTextContent("Not taken yet. Ava answers about 8 to 16 questions, starting at Grade 3");
    expect(within(math).getByRole("link", { name: "Start the test →" })).toHaveAttribute("href", "/play/#/placement/math");
    expect(panelFor(/Language Arts/)).toHaveTextContent("Not taken yet.");
    expect(screen.getByText(/It is not a report-card mark, and it does not change Ava's stars, XP or levels\. Only a teacher decides proficiency\./)).toBeInTheDocument();
    expect(screen.getByText(/same BC Curriculum questions/)).toBeInTheDocument();
  });

  it("makes the child the active player when a parent starts the test for them", async () => {
    render(<PlacementPage />);
    await userEvent.click(within(panelFor(/Math/)).getByRole("link", { name: "Start the test →" }));
    expect(useStore.getState().activeId).toBe("a");
  });

  it("shows the latest result per grade, where to start, and offers to switch to a higher grade", async () => {
    const older = { ...mathAbove, id: "p0", t: when - 86_400_000, placedGrade: "2", stages: [{ grade: "3", total: 4, correct: 0 }] };
    useStore.setState({ events: [older, { ...mathAbove, startUnits: [start4.key] }] as AppEvent[] });
    render(<PlacementPage />);
    const math = panelFor(/Math/);
    expect(math).toHaveTextContent("Ava handled Grade 4 work, which is ahead of Grade 3.");
    expect(math).toHaveTextContent("Taken Sep 15, 2026");
    expect(math).not.toHaveTextContent("A close call");
    const byGrade = within(math).getByRole("list", { name: "Results by grade" });
    expect(within(byGrade).getAllByRole("listitem").map((li) => li.textContent)).toEqual(["Grade 34 of 4 right", "Grade 43 of 4 right"]);
    expect(math).toHaveTextContent(`Good places to start (Grade 4)${start4.unit.emoji} ${start4.unit.title}`);
    expect(math).not.toHaveTextContent("Worth a quick revisit");
    expect(within(math).getByRole("link", { name: "Retake →" })).toBeInTheDocument();

    // Only math moves up: the child's grade, and so their other subjects, stay at Grade 3.
    expect(math).toHaveTextContent("Ava practises Grade 3 math, like the rest of their lessons.");
    fireEvent.click(within(math).getByRole("button", { name: "Practise Grade 4 math" }));
    expect(useStore.getState().profiles.find((p) => p.id === "a")!.grade).toBe("3");
    expect(useStore.getState().settings.a?.subjectGrades).toEqual({ math: "4" });
    expect(math).toHaveTextContent("Ava practises Grade 4 math. Their other subjects stay at Grade 3.");
    expect(within(math).queryByRole("button", { name: "Practise Grade 4 math" })).not.toBeInTheDocument();
    expect(panelFor(/Language Arts/)).toHaveTextContent("Ava practises Grade 3 language arts");
  });

  it("goes back to the child's own grade for one subject", () => {
    useStore.setState({ events: [{ ...mathAbove, placedGrade: "2" }] as AppEvent[], settings: { a: { subjectGrades: { math: "4" } } } as never });
    render(<PlacementPage />);
    const math = panelFor(/Math/);
    expect(math).toHaveTextContent("Ava practises Grade 4 math.");
    fireEvent.click(within(math).getByRole("button", { name: "Practise Grade 2 math" }));
    expect(useStore.getState().settings.a?.subjectGrades).toEqual({ math: "2" });
    fireEvent.click(within(math).getByRole("button", { name: "Back to Grade 3 math" }));
    expect(useStore.getState().settings.a?.subjectGrades).toEqual({});
  });

  it("switches the whole grade when a level for each subject is turned off", () => {
    setRemoteFlags({ flags: { "subject-levels": false }, variants: {} });
    useStore.setState({ events: [mathAbove] as AppEvent[] });
    render(<PlacementPage />);
    fireEvent.click(within(panelFor(/Math/)).getByRole("button", { name: "Practise Grade 4" }));
    expect(useStore.getState().profiles.find((p) => p.id === "a")!.grade).toBe("4");
  });

  it("flags a close call, lists units to revisit and keeps the grade when the child is at level", () => {
    const language = {
      ...mathAbove,
      id: "p2",
      subject: "language",
      placedGrade: "3",
      stages: [{ grade: "3", total: 4, correct: 2 }],
      startUnits: [],
      reviewUnits: [review2.key, "2/language/retired-unit"],
      confidence: "low",
    };
    useStore.setState({ events: [language] as AppEvent[] });
    render(<PlacementPage />);
    const panel = panelFor(/Language Arts/);
    expect(panel).toHaveTextContent("Ava is working at a Grade 3 level in this subject.");
    expect(panel).toHaveTextContent("A close call: answers were mixed, so treat this as a starting point.");
    const revisit = within(panel).getByRole("heading", { name: "Worth a quick revisit" }).parentElement!;
    expect(revisit).toHaveTextContent(`${review2.unit.emoji} ${review2.unit.title}`);
    // A unit that no longer exists still shows its grade and id rather than vanishing.
    expect(revisit).toHaveTextContent("Grade 2 · retired-unit");
    expect(within(panel).queryByRole("button", { name: /Practise/ })).not.toBeInTheDocument();
  });

  it("shows the chosen child's results", () => {
    useStore.setState({ events: [{ ...mathAbove, profileId: "b" }] as AppEvent[] });
    render(<PlacementPage childId="b" />);
    expect(panelFor(/Math/)).toHaveTextContent("Ben handled Grade 4 work");
    expect(screen.getByRole("tab", { name: /Ben/ })).toHaveAttribute("aria-selected", "true");
  });
});
