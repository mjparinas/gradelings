// @vitest-environment jsdom
import { act, render, screen } from "@testing-library/react";
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

import { useStore } from "@/lib/store";
import { YearReviewCard, YearReviewPage } from "./YearReview";

const at = (y: number, m: number, d: number, h = 12) => new Date(y, m - 1, d, h).getTime();
const ava: Profile = { id: "a", name: "Ava", avatar: "ollie", colour: "#fff", grade: "2", framework: "ca-bc", createdAt: at(2026, 3, 1), updatedAt: 1 };
const leo: Profile = { ...ava, id: "b", name: "Leo" };
// A member: Year in review is for members (flag `members-reports`).
const family: FamilyInfo = { plan: "premium", trialEndsAt: 0, updatedAt: 1 };
let n = 0;
/** Ten right answers on one unit for a child, one a minute from `t`. */
const tens = (profileId: string, t: number): AppEvent[] =>
  Array.from({ length: 10 }, (_, i) => ({ id: `e${++n}`, profileId, type: "answer", t: t + i * 60_000, unit: "2/math/tens-and-ones", correct: true, attempts: 1, revealed: false, ms: 30_000, mode: "practice" }) as AppEvent);

function on(day: number) {
  vi.useFakeTimers({ toFake: ["Date"] });
  vi.setSystemTime(day);
}

beforeAll(() => loadGrade("2", "ca-bc"));
beforeEach(() => {
  localStorage.clear();
  useStore.setState({ profiles: [ava], events: tens("a", at(2026, 10, 5)), settings: {}, family });
});
afterEach(() => vi.useRealTimers());

describe("the year in review page", () => {
  it("shows this school year's practice and the units that grew, with a note that it isn't a mark", () => {
    on(at(2027, 6, 20));
    render(<YearReviewPage childId="a" />);
    expect(screen.getByRole("heading", { name: "Ava's 2026–27 school year" })).toBeInTheDocument();
    expect(screen.getByText("Questions").nextSibling).toHaveTextContent("10");
    expect(screen.getByText("Units grown").nextSibling).toHaveTextContent("1");
    expect(screen.getByText(/Tens & Ones/)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Print or save as PDF/ })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Share “1 topic grown in one school year”" })).toBeInTheDocument();
    expect(document.body.textContent).toContain("not a report-card mark");
  });

  it("says so when the child hasn't practised this school year", () => {
    on(at(2027, 9, 5));
    render(<YearReviewPage childId="a" />);
    expect(screen.getByText(/hasn't practised yet this school year/)).toBeInTheDocument();
  });
});

describe("the year in review card on the Overview", () => {
  it("shows in June for children who practised, and goes away with Got it", async () => {
    useStore.setState({ profiles: [ava, leo] });
    on(at(2027, 6, 10));
    const { unmount } = render(<YearReviewCard />);
    await act(async () => {});
    expect(screen.getByText("The 2026–27 school year in review")).toBeInTheDocument();
    // Leo didn't practise, so only Ava gets a button.
    expect(screen.getByRole("link", { name: "See the year" })).toHaveAttribute("href", "#/year/a");
    vi.useRealTimers();
    await userEvent.click(screen.getByRole("button", { name: "Got it" }));
    expect(screen.queryByText(/school year in review/)).not.toBeInTheDocument();
    unmount();
    on(at(2027, 6, 11));
    render(<YearReviewCard />);
    expect(screen.queryByText(/school year in review/)).not.toBeInTheDocument();
  });

  it("doesn't show outside June and July", () => {
    on(at(2027, 5, 20));
    expect(render(<YearReviewCard />).container).toBeEmptyDOMElement();
  });

  it("shows the free plan what Year in review holds, with the child's days, and no printing", () => {
    on(at(2027, 6, 20));
    useStore.setState({ family: { plan: "trial", trialEndsAt: 0, updatedAt: 1 } });
    render(<YearReviewPage childId="a" />);
    expect(screen.getByRole("heading", { name: /Ava's 2026–27 school year/ })).toBeInTheDocument();
    expect(screen.getByText(/Ava has practised on 1 day since August 1\./)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "See the family plan" })).toHaveAttribute("href", "#/account?next=subscription");
    expect(screen.queryByRole("button", { name: /Print or save as PDF/ })).toBeNull();
    expect(screen.queryByText("Units grown")).toBeNull();
  });
});
