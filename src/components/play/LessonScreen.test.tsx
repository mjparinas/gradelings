// @vitest-environment jsdom
import { fireEvent, render, screen, within } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import type { AgeBand } from "@/content/types";
import { BandProvider } from "../band";

const h = vi.hoisted(() => ({
  go: vi.fn(),
  speak: vi.fn(),
  stopSpeaking: vi.fn(),
  settings: {} as Record<string, unknown>,
  lesson: {
    steps: ["Start with the bigger number.", "Count on the smaller one."],
    example: { question: "What is 8 + 3?", work: ["Start at 8.", "Count 9, 10, 11."], answer: "11" },
  } as unknown,
}));

vi.mock("@/lib/router", () => ({ go: h.go }));
vi.mock("@/lib/speech", () => ({ speak: h.speak, stopSpeaking: h.stopSpeaking }));
vi.mock("@/lib/store", () => ({ useChildSettings: () => h.settings, useActiveProfile: () => ({ framework: "ca-bc" }) }));
vi.mock("@/content", () => ({
  getUnitRef: (key: string) => (key === "1/math/count-on" ? { key, course: { subject: "math" }, unit: { title: "Counting on", emoji: "➕", lesson: h.lesson } } : undefined),
}));
vi.mock("../Critter", () => ({ Critter: () => null, SpeechBubble: ({ children }: { children: React.ReactNode }) => <div>{children}</div> }));
vi.mock("../visuals", () => ({ QuestionVisual: () => <p>picture</p> }));

import { lessonSpeech, LessonScreen } from "./LessonScreen";

const SPOKEN = "Start with the bigger number. Count on the smaller one. Let's try one. What is 8 + 3? Start at 8. Count 9, 10, 11. The answer is 11.";
const show = (band: AgeBand = "middle", key = "1/math/count-on") =>
  render(
    <BandProvider value={band}>
      <LessonScreen unitKey={key} />
    </BandProvider>,
  );

beforeEach(() => {
  vi.clearAllMocks();
  h.settings = {};
});

describe("LessonScreen", () => {
  it("shows the steps and a worked example, then goes to practice", () => {
    show();
    expect(screen.getByRole("heading", { name: "➕ Counting on" })).toBeInTheDocument();
    expect(within(screen.getByRole("list", { name: "Steps" })).getAllByRole("listitem").map((li) => li.textContent)).toEqual([
      "1Start with the bigger number.",
      "2Count on the smaller one.",
    ]);
    const example = screen.getByRole("region", { name: "An example" });
    expect(example).toHaveTextContent("What is 8 + 3?");
    expect(example).toHaveTextContent("Answer: 11");
    expect(screen.queryByText("picture")).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /Let's practise!/ }));
    expect(h.go).toHaveBeenCalledWith("/session", { mode: "practice", scope: "1/math/count-on" });
    fireEvent.click(screen.getByRole("button", { name: "Back" }));
    expect(h.go).toHaveBeenCalledWith("/practice/math");
  });

  it("reads itself aloud for little kids, and on request for everyone", () => {
    const { unmount } = show("middle");
    expect(h.speak).not.toHaveBeenCalled();
    fireEvent.click(screen.getByRole("button", { name: /Read to me/ }));
    expect(h.speak).toHaveBeenCalledWith(SPOKEN);
    unmount();
    expect(h.stopSpeaking).toHaveBeenCalled();
    h.speak.mockClear();
    show("little");
    expect(h.speak).toHaveBeenCalledWith(SPOKEN);
  });

  it("reads itself aloud when the parent turned on read-aloud", () => {
    h.settings = { autoRead: true };
    show("big");
    expect(h.speak).toHaveBeenCalledTimes(1);
  });

  it("a unit with no lesson goes straight to practice", () => {
    const { container } = show("middle", "1/math/other");
    expect(container).toBeEmptyDOMElement();
    expect(h.go).toHaveBeenCalledWith("/session", { mode: "practice", scope: "1/math/other" }, true);
  });

  it("lessonSpeech is empty without a lesson", () => {
    expect(lessonSpeech(undefined)).toBe("");
  });

  it("shows the example's picture when it has one", () => {
    h.lesson = { steps: ["Look."], example: { question: "How many?", work: [], answer: "3", visual: { type: "dots", count: 3 } } };
    show();
    expect(screen.getByText("picture")).toBeInTheDocument();
  });
});
