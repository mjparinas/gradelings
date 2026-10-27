// @vitest-environment jsdom
import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import type { AgeBand } from "@/content/types";
import type { UnitStat } from "@/lib/derive";
import { BandProvider } from "../band";

const h = vi.hoisted(() => {
  const unit = (id: string, title: string) => ({ id, title, emoji: "⭐", blurb: "" });
  return {
    courses: [
      { grade: "3", subject: "math", units: [unit("add", "Adding"), unit("sub", "Subtracting"), unit("mul", "Multiplying")] },
      { grade: "3", subject: "science", units: [unit("rocks", "Rocks"), unit("water", "Water")] },
    ],
    go: vi.fn(),
    units: {} as Record<string, unknown>,
    settings: { enabledSubjects: ["math", "science"] } as Record<string, unknown>,
    open: new Set(["add", "sub", "mul", "rocks", "water"]),
  };
});

vi.mock("@/lib/router", () => ({ go: h.go, href: (p: string) => `#${p}` }));
vi.mock("@/content", () => ({
  coursesForGrade: () => h.courses,
  practiceCourses: () => h.courses,
  unitKey: (grade: string, subject: string, id: string) => `${grade}/${subject}/${id}`,
  getUnitRef: (key: string) => {
    const [, subject, id] = key.split("/");
    const course = h.courses.find((c) => c.subject === subject)!;
    return { key, course, unit: course.units.find((u) => u.id === id)! };
  },
}));
vi.mock("./useAllowed", () => ({ useAllowed: () => (ref: { unit: { id: string } }) => h.open.has(ref.unit.id) }));
vi.mock("@/lib/store", () => ({
  useStore: (select: (s: unknown) => unknown) => select({ family: { plan: "premium", trialEndsAt: 0, updatedAt: 0 } }),
  useActiveProfile: () => ({ id: "p1", name: "Ava", grade: "3", framework: "ca-bc", avatar: "ollie" }),
  useChildSettings: () => h.settings,
  useSubjectGrades: () => ({}),
  useDerived: () => ({ units: h.units, level: 1 }),
}));
vi.mock("../Critter", () => ({
  Critter: () => null,
  CritterSvg: () => null,
  SpeechBubble: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));
vi.mock("./Companion", () => ({ Companion: () => null }));

import { TrailMap } from "./TrailMap";

const grown = { attempts: 10, firstTry: 9, recent: Array(10).fill(true), challengePassed: false } as unknown as UnitStat;
const trying = { attempts: 2, firstTry: 1, recent: [true, false], challengePassed: false } as unknown as UnitStat;
const show = (band: AgeBand = "middle") => render(<BandProvider value={band}><TrailMap /></BandProvider>);
const stop = (name: RegExp) => screen.getByRole("button", { name });

beforeEach(() => {
  vi.clearAllMocks();
  h.units = {};
  h.settings = { enabledSubjects: ["math", "science"] };
  h.open = new Set(["add", "sub", "mul", "rocks", "water"]);
});

describe("TrailMap", () => {
  it("asks for a grown-up when no subject is turned on", () => {
    h.settings = { enabledSubjects: [] };
    show();
    expect(screen.getByText("Ask a grown-up to turn on a subject to see your trail.")).toBeInTheDocument();
  });

  it("marks the first lesson not yet grown as the next stop", () => {
    h.units = { "3/math/add": grown, "3/math/sub": trying };
    show();
    expect(screen.getByText("Next stop: “Subtracting”")).toBeInTheDocument();
    expect(stop(/^Subtracting\. Emerging\. Next stop$/)).toBeInTheDocument();
    expect(stop(/^Adding\. Proficient$/)).toBeInTheDocument();
    expect(stop(/^Multiplying\. Not started yet$/)).toBeInTheDocument();
    expect(screen.getByRole("progressbar", { name: "Math lessons grown to a tree" })).toHaveAttribute("aria-valuenow", "1");
    expect(screen.getByText("🌳 1/3")).toBeInTheDocument();
    expect(screen.getByText("Finish line")).toBeInTheDocument();
  });

  it("celebrates a finished trail", () => {
    h.units = { "3/science/rocks": grown, "3/science/water": grown };
    show();
    fireEvent.click(screen.getByRole("tab", { name: "Science" }));
    expect(screen.getByRole("tab", { name: "Science" })).toHaveAttribute("aria-selected", "true");
    expect(screen.getByText("You've grown a tree in every lesson here. Amazing!")).toBeInTheDocument();
    expect(screen.getByText("You finished this trail!")).toBeInTheDocument();
  });

  it("older kids open the unit dialog from a stop", () => {
    show("big");
    fireEvent.click(stop(/^Adding/));
    expect(screen.getByRole("dialog", { name: /Adding/ })).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "▶ Practice" }));
    expect(h.go).toHaveBeenCalledWith("/session", { mode: "practice", scope: "3/math/add" });
  });

  it("little kids go straight to practice", () => {
    show("little");
    fireEvent.click(stop(/^Multiplying/));
    expect(h.go).toHaveBeenCalledWith("/session", { mode: "practice", scope: "3/math/mul" });
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("a stop the plan doesn't open asks for a grown-up", () => {
    h.open = new Set(["add"]);
    show("little");
    fireEvent.click(stop(/^Multiplying/));
    expect(h.go).not.toHaveBeenCalled();
    expect(screen.getByRole("dialog", { name: "Ask a grown-up" })).toBeInTheDocument();
  });
});
