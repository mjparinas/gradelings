// @vitest-environment jsdom
import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { Question } from "@/content/types";
import type { Stage } from "@/lib/placement";

const h = vi.hoisted(() => ({
  go: vi.fn(),
  log: vi.fn(),
  speakQuestion: vi.fn(),
  loadGrades: vi.fn(),
  nextGrade: vi.fn(),
  summarize: vi.fn(),
  settings: {} as Record<string, unknown>,
  empty: new Set<string>(),
}));

vi.mock("@/lib/router", () => ({ go: h.go }));
vi.mock("@/lib/readaloud", () => ({ speakQuestion: h.speakQuestion }));
vi.mock("@/lib/speech", () => ({ stopSpeaking: vi.fn() }));
vi.mock("@/content", () => ({ AVAILABLE_GRADES: ["k", "1", "2", "3", "4"], loadGrades: h.loadGrades }));
vi.mock("@/lib/store", () => ({
  useStore: (select: (s: unknown) => unknown) => select({ log: h.log }),
  useActiveProfile: () => ({ id: "p1", name: "Ava", grade: "2", framework: "ca-bc", companion: "bao" }),
  useChildSettings: () => h.settings,
}));
// Two questions a stage; the grade is in the prompt so the test can see which stage it is on.
vi.mock("@/lib/placement", () => ({
  STAGE_SIZE: 2,
  MAX_STAGES: 4,
  buildStage: (grade: string) =>
    h.empty.has(grade)
      ? []
      : [1, 2].map((n) => ({
          unitKey: `${grade}/math/u${n}`,
          question: { kind: "choice", prompt: `Grade ${grade} question ${n}`, answer: "a", choices: [], hint: "" },
        })),
  gradesWithSubject: () => ["1", "2", "3"],
  nextGrade: h.nextGrade,
  summarize: h.summarize,
  toEvent: (result: unknown) => ({ type: "placement", result }),
}));
vi.mock("./Session", () => ({
  QuestionBody: ({ q, onAttempt, onSlip }: { q: Question; onAttempt: (ok: boolean) => void; onSlip: () => void }) => (
    <div>
      <span>answers for {q.prompt}</span>
      <button type="button" onClick={() => onAttempt(true)}>
        right
      </button>
      <button type="button" onClick={() => onAttempt(false)}>
        wrong
      </button>
      <button type="button" onClick={onSlip}>
        slip
      </button>
    </div>
  ),
}));
vi.mock("../visuals", () => ({ QuestionVisual: () => null }));
vi.mock("../Critter", () => ({
  Critter: ({ id }: { id: string }) => <span data-testid="critter">{id}</span>,
  SpeechBubble: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

import { PlacementTest } from "./PlacementTest";

const click = (name: string | RegExp) => act(() => void fireEvent.click(screen.getByRole("button", { name })));
/** Answer, then wait out the short pause before the next question (and any loading after). */
const answer = async (name: string | RegExp) => {
  click(name);
  await act(async () => void vi.advanceTimersByTime(220));
};
const begin = async () => {
  click("Let's go!");
  await act(async () => {});
};
const stages = (): Stage[] => h.nextGrade.mock.calls.at(-1)?.[0] ?? [];

beforeEach(() => {
  vi.useFakeTimers();
  vi.clearAllMocks();
  h.settings = {};
  h.empty = new Set();
  h.loadGrades.mockResolvedValue(undefined);
  h.nextGrade.mockReturnValue(undefined);
  h.summarize.mockReturnValue({ placed: "2" });
});
afterEach(() => vi.useRealTimers());

describe("PlacementTest", () => {
  it("explains there are no points or tries, and can be put off", () => {
    render(<PlacementTest subject="math" />);
    expect(screen.getByRole("heading", { name: "Let's find your best place to start in Math!" })).toBeInTheDocument();
    expect(screen.getByText(/no points and no tries/)).toBeInTheDocument();
    click("Not now");
    expect(h.go).toHaveBeenCalledWith("/");
  });

  it("downloads the child's grade and the grades either side before asking", async () => {
    render(<PlacementTest subject="math" />);
    await begin();
    expect(h.loadGrades).toHaveBeenCalledWith([
      { grade: "1", framework: "ca-bc" },
      { grade: "2", framework: "ca-bc" },
      { grade: "3", framework: "ca-bc" },
    ]);
    expect(screen.getByText("Grade 2 question 1")).toBeInTheDocument();
    expect(screen.getByRole("progressbar", { name: "Part 1 of up to 4" })).toBeInTheDocument();
  });

  it("gives no right-or-wrong feedback, records the stage, and saves the result for the parent", async () => {
    render(<PlacementTest subject="math" />);
    await begin();
    await answer("right");
    expect(screen.getByText("Grade 2 question 2")).toBeInTheDocument();
    expect(screen.queryByText(/correct|not quite/i)).not.toBeInTheDocument();
    await answer("I'm not sure");
    expect(stages()).toEqual([{ grade: "2", total: 2, correct: 1, asked: ["2/math/u1", "2/math/u2"], missed: ["2/math/u2"] }]);
    expect(h.summarize).toHaveBeenCalledWith("math", "2", stages(), "ca-bc");
    expect(h.log).toHaveBeenCalledWith([{ type: "placement", result: { placed: "2" } }]);
    expect(screen.getByRole("heading", { name: /All done! Great effort!/ })).toBeInTheDocument();
    expect(screen.getByTestId("critter")).toHaveTextContent("bao");
    click("Back home");
    expect(h.go).toHaveBeenCalledWith("/");
  });

  it("moves on to another grade when the first stage says so", async () => {
    h.nextGrade.mockReturnValueOnce("3");
    render(<PlacementTest subject="math" />);
    await begin();
    await answer("right");
    await answer("right");
    expect(screen.getByText("Grade 3 question 1")).toBeInTheDocument();
    expect(screen.getByRole("progressbar", { name: "Part 2 of up to 4" })).toBeInTheDocument();
    expect(h.log).not.toHaveBeenCalled();
    await answer("wrong");
    await answer("wrong");
    expect(stages().map((s) => [s.grade, s.correct])).toEqual([
      ["2", 2],
      ["3", 0],
    ]);
    expect(h.log).toHaveBeenCalledTimes(1);
  });

  it("a slip before a right answer counts it as missed", async () => {
    render(<PlacementTest subject="math" />);
    await begin();
    click("slip");
    await answer("right");
    await answer("right");
    expect(stages()[0]).toMatchObject({ correct: 1, missed: ["2/math/u1"] });
  });

  it("a double tap only answers once", async () => {
    render(<PlacementTest subject="math" />);
    await begin();
    click("right");
    click("right");
    await act(async () => void vi.advanceTimersByTime(220));
    expect(screen.getByText("Grade 2 question 2")).toBeInTheDocument();
  });

  it("asks for the internet when the questions can't download, and tries again", async () => {
    h.loadGrades.mockRejectedValueOnce(new Error("offline"));
    render(<PlacementTest subject="language" />);
    await begin();
    expect(screen.getByRole("heading", { name: "We need the internet for a moment" })).toBeInTheDocument();
    click("Try again");
    await act(async () => {});
    expect(screen.getByText("Grade 2 question 1")).toBeInTheDocument();
  });

  it("shows the internet message when there are no questions for the grade", async () => {
    h.empty.add("2");
    render(<PlacementTest subject="math" />);
    await begin();
    expect(screen.getByRole("heading", { name: "We need the internet for a moment" })).toBeInTheDocument();
  });

  it("reads each question aloud when read-aloud is on, and on request", async () => {
    h.settings = { autoRead: true };
    render(<PlacementTest subject="math" />);
    await begin();
    expect(h.speakQuestion).toHaveBeenCalledWith(expect.objectContaining({ prompt: "Grade 2 question 1" }));
    click("Read it to me");
    expect(h.speakQuestion).toHaveBeenCalledTimes(2);
  });

  it("stopping asks first, warns nothing is saved, and can carry on", async () => {
    render(<PlacementTest subject="math" />);
    await begin();
    click("Stop");
    expect(screen.getByText(/this test won't be saved/)).toBeInTheDocument();
    click("Keep going");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    click("Stop");
    act(() => void fireEvent.click(screen.getAllByRole("button", { name: "Stop" }).at(-1)!));
    expect(h.go).toHaveBeenCalledWith("/");
    expect(h.log).not.toHaveBeenCalled();
  });
});
