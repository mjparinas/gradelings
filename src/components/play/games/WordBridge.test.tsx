// @vitest-environment jsdom
import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const h = vi.hoisted(() => ({ speak: vi.fn(), subjects: [] as unknown[] }));
vi.mock("./bridge", () => ({
  bridgeQuestion: (_grade: string, subjects: unknown) => {
    h.subjects.push(subjects);
    return { picture: "🐱", prompt: "Quel est le bon mot ?", speak: "Quel est le bon mot ?", speakLang: "fr", answer: "le chat", choices: ["le chien", "le chat", "la vache"] };
  },
}));
vi.mock("@/lib/juice", () => ({ burstFrom: vi.fn(), floatText: vi.fn() }));
vi.mock("@/lib/sound", () => ({ sounds: { pop: vi.fn(), boop: vi.fn(), tap: vi.fn() } }));
vi.mock("@/lib/speech", () => ({ speak: h.speak }));

import { WordBridge } from "./WordBridge";

const props = { onScore: vi.fn(), onLevel: vi.fn(), onOver: vi.fn() };
const wait = (ms: number) => act(() => void vi.advanceTimersByTime(ms));
const lives = () => screen.getByLabelText(/lives$/).getAttribute("aria-label");
const bridge = () => screen.getByRole("img", { name: /^Bridge/ }).getAttribute("aria-label");

beforeEach(() => {
  vi.useFakeTimers();
  vi.clearAllMocks();
  h.subjects = [];
});
afterEach(() => vi.useRealTimers());

describe("Word Bridge", () => {
  it("reads Immersion prompts in French and passes the child's French subjects along", () => {
    render(<WordBridge grade="2" band="middle" subjects={["math", "immersion"]} {...props} />);
    expect(h.speak).toHaveBeenCalledWith("Quel est le bon mot ?", undefined, "fr");
    expect(h.subjects[0]).toEqual(["math", "immersion"]);
    expect(screen.getByRole("button", { name: "le chat" })).toHaveAttribute("lang", "fr");
  });

  it("a right word lays a plank and is said in French", () => {
    render(<WordBridge grade="2" band="middle" subjects={["immersion"]} {...props} />);
    expect(bridge()).toBe("Bridge: 0 of 8 planks");
    fireEvent.click(screen.getByRole("button", { name: "le chat" }));
    expect(h.speak).toHaveBeenCalledWith("le chat", undefined, "fr");
    expect(bridge()).toBe("Bridge: 1 of 8 planks");
    expect(props.onScore.mock.calls.at(-1)?.[0]).toBeGreaterThan(10);
  });

  it("eight right words cross the river for a bonus", () => {
    render(<WordBridge grade="2" band="middle" subjects={["immersion"]} {...props} />);
    for (let i = 0; i < 8; i++) {
      act(() => void fireEvent.keyDown(window, { key: "2" }));
      wait(950);
    }
    expect(props.onScore.mock.calls.at(-1)?.[0]).toBeGreaterThanOrEqual(8 * 10 + 30);
    expect(bridge()).toBe("Bridge: 0 of 8 planks");
  });

  it("a wrong word or the timer costs a heart", () => {
    render(<WordBridge grade="2" band="big" subjects={["core-french"]} {...props} />);
    fireEvent.click(screen.getByRole("button", { name: "le chien" }));
    expect(lives()).toBe("2 lives");
    expect(screen.getByText("Not quite: it's “le chat”.")).toBeInTheDocument();
    wait(1600);
    wait(14_500);
    expect(lives()).toBe("1 lives");
    expect(screen.getByText("Splash! It was “le chat”.")).toBeInTheDocument();
  });
});
