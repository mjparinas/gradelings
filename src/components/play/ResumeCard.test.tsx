// @vitest-environment jsdom
import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

const h = vi.hoisted(() => ({
  premium: true,
  allowed: true,
  unit: { course: { subject: "math" } } as unknown,
}));
vi.mock("@/lib/plan", () => ({ canUse: () => h.premium }));
vi.mock("@/content", () => ({ getUnitRef: () => h.unit }));
vi.mock("./useAllowed", () => ({ useAllowed: () => () => h.allowed }));
vi.mock("@/lib/store", () => ({
  useActiveProfile: () => ({ id: "p1", name: "Leo", grade: "4", framework: "ca-bc" }),
  useChildSettings: () => ({ enabledSubjects: ["math", "language"] }),
  useStore: (select: (s: unknown) => unknown) => select({ family: {} }),
}));

import { ResumeCard, useUnfinished } from "./ResumeCard";

function Home({ dailyDone = false }: { dailyDone?: boolean }) {
  const u = useUnfinished(dailyDone);
  return u ? <ResumeCard lesson={u.lesson} onDismiss={u.dismiss} little={false} /> : <p>No card</p>;
}

const save = (over: Record<string, unknown> = {}) =>
  localStorage.setItem(
    "grademap.resume.p1",
    JSON.stringify({ mode: "practice", scope: "4/math/add", title: "Adding big numbers", icon: "➕", results: [true, true, false], total: 8, ms: 1000, at: Date.now() - 1000, ...over }),
  );

beforeEach(() => {
  localStorage.clear();
  h.premium = true;
  h.allowed = true;
  h.unit = { course: { subject: "math" } };
});

describe("Finish your lesson card", () => {
  it("shows the lesson left partway and links back into it", () => {
    save();
    render(<Home />);
    expect(screen.getByText("Finish your lesson?")).toBeInTheDocument();
    expect(screen.getByText("Adding big numbers")).toBeInTheDocument();
    expect(screen.getByRole("progressbar", { name: "3 of 8 questions done" })).toBeInTheDocument();
    expect(screen.getByRole("link")).toHaveAttribute("href", "#/session?mode=practice&scope=4%2Fmath%2Fadd&resume=1");
  });

  it("goes away for good with Not now", () => {
    save();
    render(<Home />);
    fireEvent.click(screen.getByRole("button", { name: "Not now" }));
    expect(screen.getByText("No card")).toBeInTheDocument();
    expect(localStorage.getItem("grademap.resume.p1")).toBeNull();
  });

  it("shows nothing when there is no lesson to finish", () => {
    render(<Home />);
    expect(screen.getByText("No card")).toBeInTheDocument();
  });

  it("hides a lesson the child can't open any more", () => {
    save();
    h.allowed = false;
    render(<Home />);
    expect(screen.getByText("No card")).toBeInTheDocument();
  });

  it("hides a unit from a subject a grown-up switched off", () => {
    save();
    h.unit = { course: { subject: "science" } };
    render(<Home />);
    expect(screen.getByText("No card")).toBeInTheDocument();
  });

  it("hides a Daily Challenge already finished on another device", () => {
    save({ mode: "daily", scope: "mix", title: "Daily Challenge" });
    render(<Home dailyDone />);
    expect(screen.getByText("No card")).toBeInTheDocument();
  });

  it("hides Review and Math Facts without the family plan", () => {
    h.premium = false;
    save({ mode: "review", scope: "mix" });
    const { unmount } = render(<Home />);
    expect(screen.getByText("No card")).toBeInTheDocument();
    unmount();
    save({ mode: "facts", scope: "mul" });
    render(<Home />);
    expect(screen.getByText("No card")).toBeInTheDocument();
  });
});
