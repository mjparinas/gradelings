// @vitest-environment jsdom
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import type { Question } from "@/content/types";
import type { Plan } from "./plans";

// Session talks to the store, the plan builder and a lot of sensory effects.
// Fake all of them so these tests are only about the answer flow.
const h = vi.hoisted(() => ({
  log: vi.fn(),
  go: vi.fn(),
  plan: null as unknown,
  settings: {} as Record<string, unknown>,
  unitRef: undefined as unknown,
  family: { plan: "free", trialEndsAt: 0 } as unknown,
  flag: true,
  seen: true,
}));

vi.mock("@/lib/store", () => {
  const derived = { xp: 0, coins: 0, get units() { return h.seen ? { "math-1:u1": { attempts: 5 } } : {}; }, speedBest: {}, days: {}, goalPicks: {}, dailyDone: [] as string[], level: 1, levelXp: 0, levelNeed: 80 };
  const useStore = Object.assign((select: (s: unknown) => unknown) => select({ log: h.log, logSoon: h.log, family: h.family }), { getState: () => ({}) });
  return {
    useStore,
    derivedFor: () => derived,
    useDerived: () => derived,
    useActiveProfile: () => ({ id: "p1", name: "Ava", grade: "2", framework: "bc", companion: "ollie", confetti: "classic" }),
    useChildSettings: () => h.settings,
    useSubjectGrades: () => ({}),
  };
});
vi.mock("./SaveProgress", () => ({ SaveProgress: () => null }));
vi.mock("./plans", () => ({ makePlan: () => h.plan }));
vi.mock("./useAllowed", () => ({ useAllowed: () => () => true }));
vi.mock("@/content", () => ({ getUnitRef: () => h.unitRef }));
vi.mock("@/lib/router", () => ({ go: h.go }));
vi.mock("@/lib/juice", () => ({ burstFrom: vi.fn(), celebrate: vi.fn(), floatText: vi.fn(), replay: vi.fn() }));
vi.mock("@/lib/speech", () => ({ speak: vi.fn(), stopSpeaking: vi.fn() }));
vi.mock("@/lib/sound", () => {
  const noop = vi.fn();
  return { sounds: new Proxy({}, { get: () => noop }) };
});
vi.mock("../Critter", () => ({ Critter: () => null, SpeechBubble: ({ children }: { children: React.ReactNode }) => <div>{children}</div> }));
vi.mock("./ReportQuestion", () => ({ ReportQuestion: () => null }));

vi.mock("@/lib/remoteFlags", () => ({ useFlag: (k: string) => (k === "worked-solutions" ? h.flag : false) }));
vi.mock("@/lib/videoHelp", () => ({ helpVideoFor: () => undefined }));
vi.mock("./lazyScreens", () => ({ HelpVideoPlayer: () => null }));

import { Session } from "./Session";

const question = (n: number, prompt = "What is 709 + 281?"): Question => ({
  kind: "choice", prompt: n === 1 ? prompt : `Question number ${n}`, hint: `Hint ${n}`, answer: "right",
  choices: [{ id: "right", label: "990" }, { id: "wrong", label: "980" }, { id: "wrong2", label: "1000" }],
});
const makePlan = (): Plan => ({ mode: "practice", scope: "math-1", title: "Practice", icon: "✏️", total: 2, retries: true, feedback: "bar",
  next: ({ index }) => ({ question: question(index + 1), unitKey: "math-1:u1", difficulty: 2 }) });
const click = (name: string | RegExp) => userEvent.click(screen.getByRole("button", { name }));
const events = () => h.log.mock.calls.flatMap((c) => c[0]) as { type: string }[];

beforeEach(() => {
  cleanup();
  localStorage.clear();
  h.log.mockClear();
  h.flag = true;
  h.seen = true;
  h.plan = makePlan();
});

const reveal = async () => {
  render(<Session mode="practice" scope="math-1" />);
  await click("980");
  await click("OK");
  await click("1000");
};

describe("step-by-step solutions after a second miss", () => {
  it("draws the working one step at a time, logs nothing and returns to the question", async () => {
    await reveal();
    const before = events().length;
    await click(/show me step by step/i);
    expect(screen.getByRole("dialog", { name: /adding step by step/i })).toBeInTheDocument();
    expect(screen.getByText(/Step 1 of/)).toBeInTheDocument();
    await click(/next step/i);
    expect(screen.getByText(/Ones: 9 \+ 1 = 10/)).toBeInTheDocument();
    await click(/back/i);
    expect(screen.getByText(/Step 1 of/)).toBeInTheDocument();
    while (screen.queryByRole("button", { name: /next step/i })) await click(/next step/i);
    await click("Got it");
    expect(screen.queryByRole("dialog", { name: /adding step by step/i })).not.toBeInTheDocument();
    expect(events().length).toBe(before);
  });

  it("is not offered with the flag off, before the reveal, or for a question that isn't plain arithmetic", async () => {
    h.flag = false;
    await reveal();
    expect(screen.queryByRole("button", { name: /show me step by step/i })).not.toBeInTheDocument();
    cleanup();
    h.flag = true;
    render(<Session mode="practice" scope="math-1" />);
    await click("980");
    expect(screen.queryByRole("button", { name: /show me step by step/i })).not.toBeInTheDocument();
    cleanup();
    h.plan = { ...makePlan(), next: ({ index }: { index: number }) => ({ question: question(index + 1, "Which shape has 3 sides?"), unitKey: "math-1:u1", difficulty: 2 }) };
    await reveal();
    expect(screen.queryByRole("button", { name: /show me step by step/i })).not.toBeInTheDocument();
  });
});
