// @vitest-environment jsdom
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { FamilyInfo, Profile } from "@/lib/model";

vi.mock("@/lib/localdb", () => ({
  getKV: vi.fn().mockResolvedValue(undefined),
  setKV: vi.fn().mockResolvedValue(undefined),
  putEvents: vi.fn().mockResolvedValue(undefined),
  allEvents: vi.fn().mockResolvedValue([]),
  deleteProfileEvents: vi.fn().mockResolvedValue(undefined),
  clearAll: vi.fn().mockResolvedValue(undefined),
}));

import { useStore } from "@/lib/store";
import { SchoolYearCards } from "./SchoolYear";

const at = (y: number, m: number, d: number) => new Date(y, m - 1, d, 12).getTime();
const ava: Profile = { id: "a", name: "Ava", avatar: "ollie", colour: "#fff", grade: "4", framework: "ca-bc", createdAt: at(2026, 3, 1), updatedAt: 1 };
const sam: Profile = { ...ava, id: "b", name: "Sam", grade: "9", framework: "us-wa" };
const family: FamilyInfo = { plan: "trial", trialEndsAt: 0, updatedAt: 1 };

function on(day: number) {
  vi.useFakeTimers({ toFake: ["Date"] });
  vi.setSystemTime(day);
}

beforeEach(() => {
  localStorage.clear();
  useStore.setState({ profiles: [ava], events: [], settings: {}, family });
});
afterEach(() => vi.useRealTimers());

describe("school-year cards on the Overview", () => {
  it("asks whether a child moved up when school starts, and moves them up in one tap", async () => {
    on(at(2026, 8, 25));
    render(<SchoolYearCards />);
    expect(screen.getByText("Is Ava starting Grade 5?")).toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: "Move up to Grade 5" }));
    const p = useStore.getState().profiles[0];
    expect(p.grade).toBe("5");
    expect(p.gradeYear).toBe(2026);
    expect(screen.queryByText(/starting Grade/)).not.toBeInTheDocument();
  });

  it("keeps the grade when the parent says it's right, and stops asking", async () => {
    on(at(2026, 9, 3));
    render(<SchoolYearCards />);
    await userEvent.click(screen.getByRole("button", { name: "Grade 4 is right" }));
    expect(useStore.getState().profiles[0]).toMatchObject({ grade: "4", gradeYear: 2026 });
    expect(screen.queryByText(/starting Grade/)).not.toBeInTheDocument();
  });

  it("doesn't ask for a child in the last grade, or outside the window", () => {
    useStore.setState({ profiles: [sam] });
    on(at(2026, 8, 25));
    expect(render(<SchoolYearCards />).container).toBeEmptyDOMElement();
    useStore.setState({ profiles: [ava] });
    on(at(2026, 10, 23));
    expect(render(<SchoolYearCards />).container).toBeEmptyDOMElement();
  });

  it("offers the summer sneak peek until Got it", async () => {
    on(at(2026, 7, 10));
    const { unmount } = render(<SchoolYearCards />);
    expect(screen.getByText("Summer sneak peek")).toBeInTheDocument();
    expect(screen.getByText(/Ava can try Grade 5 lessons/)).toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: "Got it" }));
    expect(screen.queryByText("Summer sneak peek")).not.toBeInTheDocument();
    unmount();
    expect(render(<SchoolYearCards />).container).toBeEmptyDOMElement();
  });

  it("points to each child's conversation sheet in report-card season", async () => {
    useStore.setState({ profiles: [ava, { ...ava, id: "c", name: "Noor" }] });
    on(at(2026, 11, 20));
    render(<SchoolYearCards />);
    expect(screen.getByText("Report cards often come home around now")).toBeInTheDocument();
    expect(screen.getByText(/not a report-card mark/)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Ava's sheet" })).toHaveAttribute("href", "#/report-cards/a");
    expect(screen.getByRole("link", { name: "Noor's sheet" })).toHaveAttribute("href", "#/report-cards/c");
    await userEvent.click(screen.getByRole("button", { name: "Got it" }));
    expect(screen.queryByText("Report cards often come home around now")).not.toBeInTheDocument();
  });

  it("speaks US English to a US family", () => {
    useStore.setState({ profiles: [{ ...ava, framework: "us-wa" }], family: { ...family, country: "US" } as FamilyInfo });
    on(at(2026, 8, 25));
    render(<SchoolYearCards />);
    expect(screen.getByText("Is Ava starting 5th grade?")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "4th grade is right" })).toBeInTheDocument();
    expect(screen.getByText(/everything practiced so far/)).toBeInTheDocument();
  });

  it("shows nothing to a class student account", () => {
    useStore.setState({ family: { ...family, account: { student: true } } as unknown as FamilyInfo });
    on(at(2026, 8, 25));
    expect(render(<SchoolYearCards />).container).toBeEmptyDOMElement();
  });
});
