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
}));

vi.mock("@/lib/store", () => {
  const derived = { xp: 0, coins: 0, units: {}, speedBest: {}, days: {}, goalPicks: {}, dailyDone: [] as string[], level: 1, levelXp: 0, levelNeed: 80 };
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

vi.mock("@/lib/remoteFlags", () => ({ useFlag: (k: string) => (k === "video-help" ? h.flag : false) }));
vi.mock("@/lib/videoHelp", () => ({ helpVideoFor: (k: string) => (k === "math-1:u1" ? { id: "vid", title: "A video", seconds: 40, src: "/v.mp4", captions: "/v.vtt" } : undefined) }));
vi.mock("./lazyScreens", () => ({
  HelpVideoPlayer: ({ onWatched, onNext }: { onWatched: (s: number, d: boolean) => void; onNext: () => void }) => (
    <button type="button" onClick={() => { onWatched(30, true); onNext(); }}>Try one more</button>
  ),
}));

import { Session } from "./Session";

const question = (n: number): Question => ({
  kind: "choice", prompt: `Question number ${n}`, hint: `Hint ${n}`, answer: "right",
  choices: [{ id: "right", label: "Yes" }, { id: "wrong", label: "No" }, { id: "wrong2", label: "Nope" }],
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
  h.family = { plan: "premium", trialEndsAt: 0 };
  h.plan = makePlan();
});

const reveal = async () => {
  render(<Session mode="practice" scope="math-1" />);
  await click("No");
  await click("OK");
  await click("Nope");
};

describe("help video after a second miss", () => {
  it("offers it to members, logs the watch and moves on with 'Try one more'", async () => {
    await reveal();
    await click(/watch a short video/i);
    await click(/try one more/i);
    expect(events().filter((e) => e.type === "video")).toEqual([{ type: "video", unit: "math-1:u1", video: "vid", watched: 30, done: true }]);
    expect(screen.getByText("Question number 2")).toBeInTheDocument();
  });

  it("is not offered on the free plan, with the flag off, or before the answer is revealed", async () => {
    h.family = { plan: "free", trialEndsAt: 0 };
    await reveal();
    expect(screen.queryByRole("button", { name: /watch a short video/i })).not.toBeInTheDocument();
    cleanup();
    h.family = { plan: "premium", trialEndsAt: 0 };
    h.flag = false;
    await reveal();
    expect(screen.queryByRole("button", { name: /watch a short video/i })).not.toBeInTheDocument();
    cleanup();
    h.flag = true;
    render(<Session mode="practice" scope="math-1" />);
    await click("No");
    expect(screen.queryByRole("button", { name: /watch a short video/i })).not.toBeInTheDocument();
  });
});
