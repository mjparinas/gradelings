// @vitest-environment jsdom
import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { AgeBand, Question } from "@/content/types";
import type { Plan } from "./plans";
import { BandProvider } from "../band";

// The modes and summaries around the answer flow (Session.test.tsx covers the flow itself).
const h = vi.hoisted(() => {
  const derived = (over: Record<string, unknown> = {}) => ({
    xp: 0,
    coins: 0,
    units: {},
    speedBest: {},
    days: {},
    goalPicks: {},
    dailyDone: [] as string[],
    level: 1,
    levelXp: 0,
    levelNeed: 80,
    ...over,
  });
  return {
    derived,
    log: vi.fn(),
    go: vi.fn(),
    plan: null as unknown,
    settings: {} as Record<string, unknown>,
    start: derived(),
    now: derived(),
    unit: undefined as unknown,
    speak: vi.fn(),
    speakSegments: vi.fn(),
    speakQuestion: vi.fn(),
    sounds: { tick: vi.fn(), correct: vi.fn(), tryAgain: vi.fn(), boop: vi.fn(), complete: vi.fn(), starLand: vi.fn() },
  };
});

vi.mock("./MysteryBox", () => ({ MysteryBox: () => null }));
vi.mock("@/lib/store", () => {
  const useStore = Object.assign((select: (s: unknown) => unknown) => select({ log: h.log, logSoon: h.log }), { getState: () => ({}) });
  return {
    useStore,
    derivedFor: () => h.start,
    useDerived: () => h.now,
    useActiveProfile: () => ({ id: "p1", name: "Ava", grade: "2", framework: "ca-bc", companion: "ollie", confetti: "classic" }),
    useChildSettings: () => h.settings,
  };
});
vi.mock("./SaveProgress", () => ({ SaveProgress: () => null }));
vi.mock("./plans", () => ({ makePlan: () => h.plan }));
vi.mock("./useAllowed", () => ({ useAllowed: () => () => true }));
vi.mock("@/content", () => ({ getUnitRef: (key: string) => (key === "2/math/add" ? h.unit : undefined) }));
vi.mock("@/lib/router", () => ({ go: h.go }));
vi.mock("@/lib/juice", () => ({ burstFrom: vi.fn(), celebrate: vi.fn(), floatText: vi.fn(), replay: vi.fn() }));
vi.mock("@/lib/speech", () => ({ speak: h.speak, speakSegments: h.speakSegments, stopSpeaking: vi.fn() }));
vi.mock("@/lib/readaloud", () => ({ speakQuestion: h.speakQuestion }));
vi.mock("@/lib/useNow", () => ({ useNow: () => new Date(2026, 9, 12, 10).getTime() }));
vi.mock("@/lib/sound", () => ({ sounds: new Proxy(h.sounds, { get: (t, k: string) => t[k as keyof typeof t] ?? vi.fn() }) }));
vi.mock("../Critter", () => ({
  Critter: ({ id }: { id: string }) => <span data-testid="guide">{id}</span>,
  SpeechBubble: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));
vi.mock("./Companion", () => ({ Companion: () => null }));

import { Session } from "./Session";

const question = (n: number): Question => ({
  kind: "choice",
  prompt: `Question number ${n}`,
  hint: `Hint ${n}`,
  answer: "right",
  choices: [
    { id: "right", label: "Yes" },
    { id: "wrong", label: "No" },
    { id: "wrong2", label: "Nope" },
  ],
});
const makePlan = (over: Partial<Plan> = {}): Plan => ({
  mode: "practice",
  scope: "math",
  title: "Practice",
  icon: "✏️",
  total: 3,
  retries: true,
  feedback: "bar",
  next: ({ index }) => ({ question: question(index + 1), unitKey: "2/math/add", difficulty: 2 }),
  ...over,
});
const start = (band: AgeBand = "middle", mode: Plan["mode"] = "practice") =>
  render(
    <BandProvider value={band}>
      <Session mode={mode} scope="math" />
    </BandProvider>,
  );
const click = (name: string | RegExp) => act(() => void fireEvent.click(screen.getByRole("button", { name })));
const right = () => {
  click("Yes");
  click(/Next|Finish/);
};
const wrong = () => {
  click("No");
  if (screen.queryByRole("button", { name: "OK" })) {
    click("OK");
    click("Nope");
  }
  click(/Next|Finish/);
};
const sessions = () => h.log.mock.calls.flatMap((c) => c[0]).filter((e: { type: string }) => e.type === "session");

beforeEach(() => {
  vi.clearAllMocks();
  h.settings = {};
  h.plan = makePlan();
  h.start = h.derived();
  h.now = h.derived();
  h.unit = undefined;
});
afterEach(() => vi.useRealTimers());

describe("Session edge cases", () => {
  it("a missing lesson offers a way home", () => {
    h.plan = null;
    start();
    expect(screen.getByText("Hmm, that lesson isn't here.")).toBeInTheDocument();
    click("Go home");
    expect(h.go).toHaveBeenCalledWith("/");
  });

  it("says when there's nothing to practise yet", () => {
    h.plan = makePlan({ next: () => undefined });
    start();
    expect(screen.getByText("Nothing to practise here yet. Try a lesson first!")).toBeInTheDocument();
  });

  it("finishes early when the plan runs out of questions", () => {
    h.plan = makePlan({ total: undefined, next: ({ index }) => (index === 0 ? { question: question(1), unitKey: "2/math/add", difficulty: 1 } : undefined) });
    start();
    right();
    expect(screen.getByText("You did it, Ava!")).toBeInTheDocument();
  });
});

describe("Session summary", () => {
  it("shows stars, XP and coins earned, the unit's new level and what's coming up", () => {
    h.unit = { key: "2/math/add", course: { subject: "math" }, unit: { title: "Adding" } };
    h.plan = makePlan({ scope: "2/math/add" });
    h.now = h.derived({ xp: 30, coins: 12, units: { "2/math/add": { attempts: 3, firstTry: 2, recent: [true, true, false], challengePassed: false } }, days: {} });
    start();
    right();
    right();
    wrong();
    expect(screen.getByRole("img", { name: "2 of 3 stars" })).toBeInTheDocument();
    expect(screen.getByText("✅ 2/3 first try")).toBeInTheDocument();
    expect(screen.getByText("+30 XP")).toBeInTheDocument();
    expect(screen.getByText("🪙 +12")).toBeInTheDocument();
    expect(screen.getByText("Adding")).toBeInTheDocument();
    expect(screen.getByText(/^Emerging/)).toBeInTheDocument();
    expect(screen.getByText("⏱ 15 more minutes to reach today's goal")).toBeInTheDocument();
    expect(screen.getByText("⭐ 80 XP to Level 2")).toBeInTheDocument();
    expect(screen.getByText("☀️ Today's Daily Challenge is ready when you are")).toBeInTheDocument();
    click("More lessons →");
    expect(h.go).toHaveBeenCalledWith("/practice/math");
    click("↻ Play again");
    expect(h.go).toHaveBeenCalledWith("/session", expect.objectContaining({ mode: "practice", scope: "2/math/add" }), true);
  });

  it("gives one star for a hard lesson, three for a great one, and Home when it isn't one unit", () => {
    start();
    right();
    wrong();
    wrong();
    expect(screen.getByRole("img", { name: "1 of 3 stars" })).toBeInTheDocument();
    click("Home →");
    expect(h.go).toHaveBeenCalledWith("/");
  });

  it("after a Daily Challenge, points to tomorrow's", () => {
    h.plan = makePlan({ mode: "daily", total: 1 });
    start("middle", "daily");
    right();
    expect(screen.getByText("☀️ A fresh Daily Challenge is waiting tomorrow")).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "3 of 3 stars" })).toBeInTheDocument();
  });

  it("a Challenge is passed with 8 out of 10 and not with 7", () => {
    h.plan = makePlan({ mode: "challenge", total: 10, retries: false });
    const first = start("middle", "challenge");
    for (let i = 0; i < 8; i++) right();
    wrong();
    wrong();
    expect(screen.getByRole("heading", { name: "Challenge passed! 🛡️" })).toBeInTheDocument();
    first.unmount();
    start("middle", "challenge");
    for (let i = 0; i < 7; i++) right();
    for (let i = 0; i < 3; i++) wrong();
    expect(screen.getByRole("heading", { name: "Good effort!" })).toBeInTheDocument();
  });
});

describe("Speed Run", () => {
  const speed = (over: Partial<Plan> = {}) => makePlan({ mode: "speed", feedback: "flash", retries: false, total: undefined, timeLimit: 8, ...over });

  it("counts down, ticks in the last five seconds, and ends with a new best", () => {
    vi.useFakeTimers();
    h.plan = speed();
    start("big", "speed");
    expect(screen.getByLabelText("8 seconds left")).toHaveTextContent("⏱ 0:08");
    click("Yes");
    act(() => void vi.advanceTimersByTime(300));
    expect(screen.getByText("Question number 2")).toBeInTheDocument();
    act(() => void vi.advanceTimersByTime(3_000));
    expect(h.sounds.tick).toHaveBeenCalled();
    act(() => void vi.advanceTimersByTime(5_000));
    expect(screen.getByRole("heading", { name: "New best! 🏆" })).toBeInTheDocument();
    expect(sessions()).toEqual([expect.objectContaining({ mode: "speed", total: 1, correct: 1 })]);
  });

  it("not beating the best says Time's up and shows the best", () => {
    vi.useFakeTimers();
    h.plan = speed({ timeLimit: 2 });
    h.start = h.derived({ speedBest: { math: 5 } });
    start("big", "speed");
    act(() => void vi.advanceTimersByTime(2_500));
    expect(screen.getByRole("heading", { name: "Time's up!" })).toBeInTheDocument();
    expect(screen.getByText("(best: 5)")).toBeInTheDocument();
  });

  it("with timers hidden, shows a quiet bar instead of a countdown and no ticking", () => {
    vi.useFakeTimers();
    h.settings = { hideTimers: true };
    h.plan = speed();
    start("big", "speed");
    expect(screen.queryByLabelText(/seconds left/)).not.toBeInTheDocument();
    expect(screen.getByRole("progressbar", { name: "Time left" })).toBeInTheDocument();
    act(() => void vi.advanceTimersByTime(6_000));
    expect(h.sounds.tick).not.toHaveBeenCalled();
  });
});

describe("Session extras", () => {
  it("shows a running clock when the parent chose to show all timers", () => {
    vi.useFakeTimers(); // a slow runner can tick past 0:00 before the assertion
    h.settings = { showTimer: true };
    start();
    expect(screen.getByLabelText("time")).toHaveTextContent("⏱ 0:00");
    act(() => void vi.advanceTimersByTime(1_000));
    expect(screen.getByLabelText("time")).toHaveTextContent("⏱ 0:01");
  });

  it("reads questions and the feedback bar aloud when read-aloud is on", () => {
    h.settings = { autoRead: true };
    start();
    expect(h.speakQuestion).toHaveBeenCalledWith(expect.objectContaining({ prompt: "Question number 1" }));
    click("No");
    const [segments] = h.speakSegments.mock.calls.at(-1)!;
    expect(segments.at(-1)).toEqual(expect.objectContaining({ text: "Hint 1" }));
    expect(segments[0].text).not.toMatch(/\p{Extended_Pictographic}/u);
    click("Read it to me");
    expect(h.speakQuestion).toHaveBeenCalledTimes(2);
  });

  it("a little kid's hint is read aloud, and their feedback bar has no report flag", () => {
    start("little");
    click(/Need a hint/);
    expect(h.speak).toHaveBeenCalledWith("Hint 1");
    click("Yes");
    expect(screen.queryByRole("button", { name: "Report a problem with this question" })).not.toBeInTheDocument();
  });

  it("older kids can report a question from the feedback bar", () => {
    start("big");
    click("Yes");
    expect(screen.getByRole("button", { name: "Report a problem with this question" })).toBeInTheDocument();
  });

  it("shows a streak badge and cheers three in a row", () => {
    h.plan = makePlan({ total: 5 });
    start();
    right();
    right();
    expect(screen.getByLabelText("2 in a row")).toBeInTheDocument();
    click("Yes");
    expect(screen.getByText("3 in a row! 🔥")).toBeInTheDocument();
  });

  it("each subject's guide hosts mixed modes", () => {
    h.unit = { key: "2/math/add", course: { subject: "math" }, unit: { title: "Adding" } };
    start("middle");
    expect(screen.getAllByTestId("guide")[0]).toHaveTextContent("hoot");
  });

  it("stopping an adventure after a few answers shows the summary instead of leaving", () => {
    h.plan = makePlan({ mode: "adventure", total: undefined, checkpoint: 10 });
    start("middle", "adventure");
    right();
    right();
    right();
    click("Stop");
    expect(screen.getByRole("dialog", { name: "Stop your adventure?" })).toBeInTheDocument();
    click("Keep playing");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    click("Stop");
    act(() => void fireEvent.click(screen.getAllByRole("button", { name: "Stop" }).at(-1)!));
    expect(h.go).not.toHaveBeenCalled();
    expect(screen.getByText("You did it, Ava!")).toBeInTheDocument();
    expect(sessions()).toEqual([expect.objectContaining({ mode: "adventure", total: 3 })]);
  });

  it("I'm done at a checkpoint ends without logging the same answers twice", () => {
    h.plan = makePlan({ mode: "adventure", total: undefined, checkpoint: 2 });
    start("middle", "adventure");
    right();
    right();
    click("I'm done for now");
    expect(screen.getByText("You did it, Ava!")).toBeInTheDocument();
    expect(sessions()).toHaveLength(1);
  });
});

describe("Math Facts", () => {
  const facts = (over: Partial<Plan> = {}) =>
    makePlan({
      mode: "facts",
      scope: "mul",
      title: "Times tables",
      icon: "✖️",
      total: 2,
      quickCorrect: true,
      lesson: { steps: ["Think of groups.", "Turn it around."], example: { question: "2 × 3 = ?", work: ["2 groups of 3."], answer: "6" } },
      next: ({ index }) => ({ question: question(index + 1), unitKey: "2/math/facts", difficulty: 1, fact: `mul:7:${index + 1}` }),
      ...over,
    });
  const answers = () => h.log.mock.calls.flatMap((c) => c[0]).filter((e: { type: string }) => e.type === "answer");

  it("moves straight on after a right answer and logs the fact", () => {
    vi.useFakeTimers();
    h.plan = facts();
    start("middle", "facts");
    click("Yes");
    expect(screen.queryByRole("button", { name: /Next/ })).not.toBeInTheDocument();
    act(() => void vi.advanceTimersByTime(300));
    expect(screen.getByText("Question number 2")).toBeInTheDocument();
    expect(answers()[0]).toMatchObject({ unit: "2/math/facts", mode: "facts", fact: "mul:7:1", correct: true });
    expect(answers()[0].q).toBeUndefined();
    // Hoot, the math guide, asks the facts.
    expect(screen.getAllByTestId("guide")[0]).toHaveTextContent("hoot");
  });

  it("gives a hint and another try after a miss, and offers the set's lesson but not a grown-up's help list", () => {
    h.plan = facts();
    start("middle", "facts");
    click("No");
    expect(screen.getByText("Hint 1")).toBeInTheDocument();
    click("OK");
    click("Nope");
    expect(screen.queryByRole("button", { name: /Ask a grown-up/ })).not.toBeInTheDocument();
    click(/Show me another way/);
    expect(screen.getByRole("heading", { name: "✖️ Times tables: how it works" })).toBeInTheDocument();
    expect(answers()[0]).toMatchObject({ fact: "mul:7:1", correct: false, revealed: true });
  });

  it("says how many facts in the set the child knows at the end", () => {
    vi.useFakeTimers();
    h.plan = facts({ total: 1 });
    h.now = h.derived({ facts: { "mul:7:1": { attempts: 2, recent: [true, true], lastT: 1 } } });
    h.start = h.derived({ facts: {} });
    start("middle", "facts");
    click("Yes");
    act(() => void vi.advanceTimersByTime(300));
    expect(screen.getByText("✖️ You know 1 of 100 times-table facts")).toBeInTheDocument();
    expect(screen.getByText(/1 new fact today!/)).toBeInTheDocument();
    click("More facts →");
    expect(h.go).toHaveBeenCalledWith("/facts");
  });
});
