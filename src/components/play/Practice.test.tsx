// @vitest-environment jsdom
import { fireEvent, render, screen, within } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import type { AgeBand } from "@/content/types";
import type { UnitStat } from "@/lib/derive";
import { BandProvider } from "../band";

const h = vi.hoisted(() => {
  const unit = (id: string, title: string, lesson = false) => ({
    id,
    title,
    emoji: "🔢",
    blurb: `About ${title}`,
    lesson: lesson ? { steps: ["Look"], example: { question: "Q", work: [], answer: "A" } } : undefined,
  });
  const courses = [
    { grade: "2", subject: "math", units: [unit("add", "Adding", true), unit("sub", "Subtracting"), unit("time", "Telling time")] },
    { grade: "2", subject: "language", units: [unit("rhyme", "Rhymes")] },
    { grade: "2", subject: "science", units: [unit("plants", "Plants")] },
  ];
  return {
    courses,
    go: vi.fn(),
    units: {} as Record<string, unknown>,
    speedBest: {} as Record<string, number>,
    settings: { enabledSubjects: ["math", "language"] } as Record<string, unknown>,
    premium: true,
    /** Unit ids the plan opens. */
    open: new Set(["add", "sub", "time", "rhyme"]),
    assigned: [] as string[],
    dailyDone: [] as string[],
    off: new Set<string>(),
    speak: vi.fn(),
    query: new URLSearchParams(),
    now: 0,
  };
});

vi.mock("@/lib/router", () => ({ go: h.go, href: (path: string) => `#${path}`, useRoute: () => ({ path: [], query: h.query }) }));
vi.mock("@/content", () => ({
  coursesForGrade: (grade: string) => h.courses.map((c) => ({ ...c, grade })),
  unitKey: (grade: string, subject: string, id: string) => `${grade}/${subject}/${id}`,
  getUnitRef: (key: string) => {
    const [, subject, id] = key.split("/");
    const course = h.courses.find((c) => c.subject === subject);
    const unit = course?.units.find((u) => u.id === id);
    return course && unit ? { key, course, unit } : undefined;
  },
}));
vi.mock("@/lib/plan", async (orig) => ({ ...(await orig<typeof import("@/lib/plan")>()), canUse: () => h.premium }));
vi.mock("./useAllowed", () => ({ useAllowed: () => (ref: { unit: { id: string } }) => h.open.has(ref.unit.id) }));
vi.mock("./useClasswork", () => ({ useClasswork: () => h.assigned.map((key) => ({ ref: { key }, className: "Room 4" })) }));
vi.mock("@/lib/store", () => ({
  useStore: (select: (s: unknown) => unknown) => select({ family: {} }),
  useActiveProfile: () => ({ id: "p1", name: "Ava", grade: "2", framework: "ca-bc", companion: "ollie" }),
  useChildSettings: () => h.settings,
  useDerived: () => ({ units: h.units, speedBest: h.speedBest, level: 1, dailyDone: h.dailyDone }),
}));
vi.mock("@/lib/remoteFlags", () => ({ useIsOn: () => (key: string) => !h.off.has(key), useFlag: (key: string) => !h.off.has(key) }));
vi.mock("@/lib/useNow", () => ({ useNow: () => h.now }));
vi.mock("../Critter", () => ({
  Critter: () => null,
  SpeechBubble: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));
vi.mock("./Companion", () => ({ Companion: () => null }));
vi.mock("@/lib/speech", () => ({ speak: h.speak, stopSpeaking: () => {} }));

import { SpeedPicker, SubjectPicker, UnitList } from "./Practice";
import { SneakPeek } from "./SneakPeek";

const stat = (attempts: number, right: number, over: Partial<UnitStat> = {}): UnitStat =>
  ({ attempts, firstTry: right, recent: Array.from({ length: attempts }, (_, i) => i < right), challengePassed: false, ...over }) as UnitStat;
const inBand = (band: AgeBand, ui: React.ReactElement) => render(<BandProvider value={band}>{ui}</BandProvider>);
const click = (name: string | RegExp) => fireEvent.click(screen.getByRole("button", { name }));
const tile = (title: string) => screen.getByText(title).closest("button")!;

beforeEach(() => {
  vi.clearAllMocks();
  h.units = {};
  h.speedBest = {};
  h.settings = { enabledSubjects: ["math", "language"] };
  h.premium = true;
  h.open = new Set(["add", "sub", "time", "rhyme"]);
  h.query = new URLSearchParams();
  h.assigned = [];
  h.dailyDone = [];
  h.off = new Set();
  h.now = new Date(2026, 9, 12, 9, 0).getTime();
});

describe("SubjectPicker", () => {
  it("lists only the subjects a parent turned on, with how many units have grown", () => {
    h.units = { "2/math/add": stat(10, 9), "2/math/sub": stat(2, 1) };
    inBand("middle", <SubjectPicker />);
    expect(screen.getByRole("heading", { name: "Practice" })).toBeInTheDocument();
    const math = screen.getByRole("link", { name: /Math/ });
    expect(math).toHaveAttribute("href", "#/practice/math");
    expect(math).toHaveTextContent("🌳 1/3 · 1 growing");
    expect(screen.getByRole("link", { name: /Reading & Writing/ })).toHaveTextContent("🌳 0/1");
    expect(screen.queryByRole("link", { name: /Science/ })).not.toBeInTheDocument();
  });

  it('calls it "Lessons" for little kids, with their subject names', () => {
    inBand("little", <SubjectPicker />);
    expect(screen.getByRole("heading", { name: "Lessons" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Numbers/ })).toBeInTheDocument();
  });

  it("gives little kids the Daily Challenge here, since their home screen has no tile for it", () => {
    const first = inBand("little", <SubjectPicker />);
    const daily = screen.getByRole("link", { name: /Daily Challenge/ });
    expect(daily).toHaveAttribute("href", "#/session");
    expect(daily).not.toHaveTextContent("✓");
    first.unmount();
    h.dailyDone = ["2026-10-12"];
    const second = inBand("little", <SubjectPicker />);
    expect(screen.getByRole("link", { name: /Daily Challenge/ })).toHaveTextContent("✓");
    second.unmount();
    // Not for older kids, who have their own tile.
    inBand("middle", <SubjectPicker />);
    expect(screen.queryByRole("link", { name: /Daily Challenge/ })).not.toBeInTheDocument();
  });

  it("hides the little kids' Daily Challenge when the admin switched it off", () => {
    h.off = new Set(["daily-challenge"]);
    inBand("little", <SubjectPicker />);
    expect(screen.queryByRole("link", { name: /Daily Challenge/ })).not.toBeInTheDocument();
  });
});

describe("UnitList", () => {
  it("suggests the first unit not yet tried and marks it Up next", () => {
    h.units = { "2/math/add": stat(3, 3) };
    inBand("middle", <UnitList subject="math" />);
    expect(screen.getByText("Pick a lesson! I think “Subtracting” would be fun.")).toBeInTheDocument();
    expect(within(tile("Subtracting")).getByText("Up next!")).toBeInTheDocument();
    expect(within(tile("Telling time")).getByText("New")).toBeInTheDocument();
  });

  it("reads the buddy's suggestion aloud when read-aloud is on, and has a button to hear it again", () => {
    h.units = { "2/math/add": stat(3, 3) };
    h.settings = { ...h.settings, autoRead: true };
    inBand("middle", <UnitList subject="math" />);
    expect(h.speak).toHaveBeenCalledWith("Pick a lesson! I think “Subtracting” would be fun.");
    h.speak.mockClear();
    click("Read it to me");
    expect(h.speak).toHaveBeenCalledWith("Pick a lesson! I think “Subtracting” would be fun.");
  });

  it("keeps the suggestion quiet when read-aloud is off", () => {
    inBand("middle", <UnitList subject="math" />);
    expect(h.speak).not.toHaveBeenCalled();
    expect(screen.getByRole("button", { name: "Read it to me" })).toBeInTheDocument();
  });

  it("cheers when every unit has been tried", () => {
    h.units = { "2/math/add": stat(1, 1), "2/math/sub": stat(1, 0), "2/math/time": stat(1, 1) };
    inBand("middle", <UnitList subject="math" />);
    expect(screen.getByText("You've tried them all! Keep growing every one.")).toBeInTheDocument();
  });

  it("renders nothing for a subject the grade doesn't have", () => {
    const { container } = inBand("middle", <UnitList subject="social" />);
    expect(container).toBeEmptyDOMElement();
  });

  it("older kids see their level and how to grow before choosing Practice", () => {
    h.units = { "2/math/sub": stat(10, 8) };
    inBand("big", <UnitList subject="math" />);
    fireEvent.click(tile("Subtracting"));
    const dialog = screen.getByRole("dialog", { name: /Subtracting/ });
    expect(within(dialog).getByText(/Proficient/)).toBeInTheDocument();
    expect(within(dialog).getByText("Get 9 out of 10 right to reach the next level.")).toBeInTheDocument();
    expect(within(dialog).getByText("8 of 10 right on the first try")).toBeInTheDocument();
    // No lesson for this unit, so no "How it works".
    expect(within(dialog).queryByRole("button", { name: /How it works/ })).not.toBeInTheDocument();
    click("▶ Practice");
    expect(h.go).toHaveBeenCalledWith("/session", { mode: "practice", scope: "2/math/sub" });
  });

  it("the unit dialog opens the lesson and the Challenge", () => {
    inBand("big", <UnitList subject="math" />);
    fireEvent.click(tile("Adding"));
    expect(screen.getByText("Play a lesson to get started!")).toBeInTheDocument();
    click(/How it works/);
    expect(h.go).toHaveBeenCalledWith("/lesson", { scope: "2/math/add" });
    click(/Challenge/);
    expect(h.go).toHaveBeenCalledWith("/session", { mode: "challenge", scope: "2/math/add" });
    fireEvent.click(screen.getByRole("dialog"));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("on the free plan, the Challenge asks for a grown-up instead", () => {
    h.premium = false;
    inBand("big", <UnitList subject="math" />);
    fireEvent.click(tile("Adding"));
    click(/Challenge/);
    expect(h.go).not.toHaveBeenCalled();
    expect(screen.getByRole("dialog", { name: "Ask a grown-up" })).toBeInTheDocument();
  });

  it("little kids go straight in: to the lesson first time, to practice after that", () => {
    h.units = { "2/math/sub": stat(1, 1) };
    inBand("little", <UnitList subject="math" />);
    fireEvent.click(tile("Adding"));
    expect(h.go).toHaveBeenLastCalledWith("/lesson", { scope: "2/math/add" });
    fireEvent.click(tile("Subtracting"));
    expect(h.go).toHaveBeenLastCalledWith("/session", { mode: "practice", scope: "2/math/sub" });
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("little kids who already started a lesson unit skip the lesson", () => {
    h.units = { "2/math/add": stat(2, 2) };
    inBand("little", <UnitList subject="math" />);
    fireEvent.click(tile("Adding"));
    expect(h.go).toHaveBeenLastCalledWith("/session", { mode: "practice", scope: "2/math/add" });
  });

  it("a link from the unit's public page starts that unit's practice once, in place of the link", () => {
    h.query = new URLSearchParams("unit=sub");
    const { rerender } = inBand("big", <UnitList subject="math" />);
    expect(h.go).toHaveBeenCalledWith("/session", { mode: "practice", scope: "2/math/sub" }, true);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    rerender(
      <BandProvider value="big">
        <UnitList subject="math" />
      </BandProvider>,
    );
    expect(h.go).toHaveBeenCalledTimes(1);
  });

  it("a link sends little kids straight into the unit, and ignores a unit the course doesn't have", () => {
    h.query = new URLSearchParams("unit=add");
    const { unmount } = inBand("little", <UnitList subject="math" />);
    expect(h.go).toHaveBeenCalledWith("/lesson", { scope: "2/math/add" });
    unmount();
    h.go.mockClear();
    h.query = new URLSearchParams("unit=plants");
    inBand("big", <UnitList subject="math" />);
    expect(h.go).not.toHaveBeenCalled();
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("a unit the plan doesn't open is locked and asks for a grown-up", () => {
    h.open = new Set(["add"]);
    inBand("big", <UnitList subject="math" />);
    expect(within(tile("Telling time")).getByText("🔒")).toBeInTheDocument();
    expect(within(tile("Adding")).queryByText("🔒")).not.toBeInTheDocument();
    fireEvent.click(tile("Telling time"));
    expect(screen.getByRole("dialog", { name: "Ask a grown-up" })).toBeInTheDocument();
    click("OK");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("a unit the teacher assigned opens even when the plan would lock it", () => {
    h.open = new Set(["add"]);
    h.assigned = ["2/math/time"];
    h.units = { "2/math/sub": stat(1, 1) };
    inBand("little", <UnitList subject="math" />);
    expect(within(tile("Telling time")).getByText("🍎 From your teacher")).toBeInTheDocument();
    expect(within(tile("Telling time")).queryByText("🔒")).not.toBeInTheDocument();
    fireEvent.click(tile("Telling time"));
    expect(h.go).toHaveBeenCalledWith("/session", { mode: "practice", scope: "2/math/time" });
  });

  it("Back goes to the subject list", () => {
    inBand("middle", <UnitList subject="math" />);
    click("Back");
    expect(h.go).toHaveBeenCalledWith("/practice");
  });
});

describe("SpeedPicker", () => {
  it("offers a mix and each turned-on subject, with the best score for each", () => {
    h.speedBest = { mix: 14, math: 9 };
    inBand("big", <SpeedPicker />);
    expect(screen.getByRole("button", { name: /Mix it up/ })).toHaveTextContent("Best: 14");
    expect(screen.getByRole("button", { name: /Math/ })).toHaveTextContent("Best: 9");
    expect(screen.getByRole("button", { name: /Language Arts/ })).toHaveTextContent("Best: 0");
    expect(screen.queryByRole("button", { name: /Science/ })).not.toBeInTheDocument();
    click(/Mix it up/);
    expect(h.go).toHaveBeenCalledWith("/session", { mode: "speed", scope: "mix" });
    click(/Math/);
    expect(h.go).toHaveBeenCalledWith("/session", { mode: "speed", scope: "math" });
  });
});

describe("summer sneak peek", () => {
  it("offers next grade's lessons on the Lessons screen in summer only", () => {
    const october = inBand("middle", <SubjectPicker />);
    expect(screen.queryByText("Summer sneak peek")).not.toBeInTheDocument();
    october.unmount();
    h.now = new Date(2026, 6, 10, 9, 0).getTime();
    const july = inBand("middle", <SubjectPicker />);
    expect(screen.getByRole("link", { name: /Summer sneak peek/ })).toHaveAttribute("href", "#/peek");
    expect(screen.getByText("Try some Grade 3 lessons before school starts.")).toBeInTheDocument();
    july.unmount();
    inBand("little", <SubjectPicker />);
    expect(screen.getByRole("link", { name: /Peek at Grade 3!/ })).toBeInTheDocument();
  });

  it("can be switched off", () => {
    h.now = new Date(2026, 6, 10, 9, 0).getTime();
    h.off = new Set(["school-year"]);
    inBand("middle", <SubjectPicker />);
    expect(screen.queryByText("Summer sneak peek")).not.toBeInTheDocument();
  });

  it("lists next grade's subjects the child has turned on", () => {
    inBand("middle", <SneakPeek />);
    expect(screen.getByRole("heading", { name: /Grade 3 sneak peek/ })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Math/ })).toHaveAttribute("href", "#/practice/math");
    expect(screen.queryByRole("link", { name: /Science/ })).not.toBeInTheDocument();
  });

  it("practises next grade's units under their own grade, so they count after moving up", () => {
    inBand("little", <UnitList subject="math" grade="3" />);
    click(/Subtracting/);
    expect(h.go).toHaveBeenCalledWith("/session", { mode: "practice", scope: "3/math/sub" });
  });
});
