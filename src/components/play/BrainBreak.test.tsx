// @vitest-environment jsdom
import { act, fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import type { AgeBand } from "@/content/types";
import { breakSet } from "@/content/breaks";
import { BandProvider } from "../band";

const h = vi.hoisted(() => ({ go: vi.fn(), log: vi.fn() }));
vi.mock("@/lib/router", () => ({ go: h.go }));
vi.mock("@/lib/store", () => ({
  useActiveProfile: () => ({ id: "p1", name: "Leo", grade: "3", framework: "ca-bc" }),
  useDerived: () => ({ level: 1 }),
  log: h.log,
}));
vi.mock("@/lib/sound", () => ({ sounds: { correct: vi.fn(), tryAgain: vi.fn(), tap: vi.fn() } }));
vi.mock("@/lib/juice", () => ({ celebrate: vi.fn() }));
vi.mock("./BuddySays", () => ({ SayButton: () => null }));
vi.mock("./Companion", () => ({ Companion: () => null }));

import { BrainBreak } from "./BrainBreak";

const show = (band: AgeBand = "middle") => render(<BandProvider value={band}>{<BrainBreak />}</BandProvider>);
const set = (band: AgeBand) => breakSet(band, `p1:${new Date().toISOString().slice(0, 10)}:0`);
const choice = (text: string) => screen.getByRole("button", { name: text });

beforeEach(() => {
  h.go.mockClear();
  h.log.mockClear();
});

describe("BrainBreak", () => {
  it("shows the first puzzle with its choices and a progress count", () => {
    show();
    const first = set("middle")[0];
    expect(screen.getByText(first.prompt)).toBeInTheDocument();
    for (const c of first.choices) expect(choice(c)).toBeEnabled();
    expect(screen.getByText("1 / 5")).toBeInTheDocument();
  });

  it("answers a wrong pick softly, then lets the right one through", () => {
    show();
    const first = set("middle")[0];
    fireEvent.click(choice(first.choices[(first.answer + 1) % first.choices.length]));
    expect(screen.getByText(/Not quite/)).toBeInTheDocument();
    fireEvent.click(choice(first.choices[first.answer]));
    expect(screen.getByText(new RegExp(first.why.slice(0, 12)))).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Next" })).toBeInTheDocument();
  });

  it("shows the answer after a second miss", () => {
    show();
    const first = set("middle")[0];
    const wrong = first.choices.map((_, i) => i).filter((i) => i !== first.answer);
    fireEvent.click(choice(first.choices[wrong[0]]));
    fireEvent.click(choice(first.choices[wrong[1]]));
    expect(screen.getByText(new RegExp(first.why.slice(0, 12)))).toBeInTheDocument();
    expect(choice(first.choices[first.answer])).toHaveAttribute("data-state", "right");
    expect(screen.getByRole("button", { name: "Next" })).toBeInTheDocument();
  });

  it("takes a number key as a pick", () => {
    show();
    const first = set("middle")[0];
    act(() => {
      fireEvent.keyDown(window, { key: String(first.answer + 1) });
    });
    expect(screen.getByRole("button", { name: "Next" })).toBeInTheDocument();
  });

  it("finishes after five puzzles, saves nothing, and offers another break or home", () => {
    show("little");
    const puzzles = set("little");
    for (let i = 0; i < puzzles.length; i++) {
      fireEvent.click(choice(puzzles[i].choices[puzzles[i].answer]));
      fireEvent.click(screen.getByRole("button", { name: i === puzzles.length - 1 ? "Finish" : "Next" }));
    }
    expect(screen.getByText(/Nice stretch/)).toBeInTheDocument();
    expect(screen.getByText(/every one on the first try/)).toBeInTheDocument();
    expect(screen.getByText(/doesn't count toward your practice/)).toBeInTheDocument();
    expect(h.log).not.toHaveBeenCalled();
    fireEvent.click(screen.getByRole("button", { name: "Back to learning" }));
    expect(h.go).toHaveBeenCalledWith("/");
    fireEvent.click(screen.getByRole("button", { name: "Another break" }));
    expect(screen.getByText("1 / 5")).toBeInTheDocument();
  });
});
