// @vitest-environment jsdom
import { act, fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import type { AgeBand } from "@/content/types";
import { PROBLEM_COUNT, storySet } from "@/content/storyProblems";
import { BandProvider } from "../band";

const h = vi.hoisted(() => ({ go: vi.fn(), log: vi.fn() }));
vi.mock("@/lib/router", () => ({ go: h.go }));
vi.mock("@/lib/store", () => ({
  useActiveProfile: () => ({ id: "p1", name: "Leo", grade: "3", framework: "ca-bc" }),
  log: h.log,
}));
vi.mock("@/lib/sound", () => ({ sounds: { correct: vi.fn(), tryAgain: vi.fn(), tap: vi.fn() } }));
vi.mock("@/lib/juice", () => ({ celebrate: vi.fn() }));
vi.mock("./Companion", () => ({ Companion: () => null }));
vi.mock("./BuddySays", () => ({ SayButton: () => null }));
vi.mock("./Treasures", () => ({ TreasureBack: () => <button type="button">Back to treasures</button> }));

import { StoryProblems } from "./StoryProblems";

const show = (band: AgeBand = "middle") => render(<BandProvider value={band}>{<StoryProblems />}</BandProvider>);
const set = (band: AgeBand = "middle") => storySet(band, `p1:${new Date().toISOString().slice(0, 10)}:0`);

beforeEach(() => {
  h.go.mockClear();
  h.log.mockClear();
});

describe("StoryProblems", () => {
  it("asks five problems, forgives a miss, and logs nothing", () => {
    show();
    const problems = set();
    problems.forEach((p, i) => {
      expect(screen.getByText(p.prompt)).toBeInTheDocument();
      if (i === 0) {
        const wrong = p.choices.findIndex((_, j) => j !== p.answer);
        fireEvent.click(screen.getByRole("button", { name: String(p.choices[wrong]) }));
        expect(screen.getByText(/Not quite/)).toBeInTheDocument();
        fireEvent.click(screen.getByRole("button", { name: String(p.choices[p.answer]) }));
        expect(screen.getByText(new RegExp(`You got it! ${p.why.replace(/[.*+?^${}()|[\]\\−×÷]/g, "\\$&")}`))).toBeInTheDocument();
      } else {
        act(() => {
          fireEvent.keyDown(window, { key: String(p.answer + 1) });
        });
        expect(screen.getByText(new RegExp(`^Yes! `))).toBeInTheDocument();
      }
      fireEvent.click(screen.getByRole("button", { name: i + 1 === PROBLEM_COUNT ? "Finish" : "Next" }));
    });
    expect(screen.getByText("All done. Good thinking!")).toBeInTheDocument();
    expect(screen.getByText(/solved 4 on the first try/)).toBeInTheDocument();
    expect(screen.getByText(/don't count toward your practice/)).toBeInTheDocument();
    expect(h.log).not.toHaveBeenCalled();
    fireEvent.click(screen.getByRole("button", { name: "Back to learning" }));
    expect(h.go).toHaveBeenCalledWith("/");
  });

  it("shows the answer and the working after two misses", () => {
    show();
    const p = set()[0];
    const wrongs = p.choices.map((_, i) => i).filter((i) => i !== p.answer);
    fireEvent.click(screen.getByRole("button", { name: String(p.choices[wrongs[0]]) }));
    fireEvent.click(screen.getByRole("button", { name: String(p.choices[wrongs[1]]) }));
    expect(screen.getByText(p.why)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: String(p.choices[p.answer]) })).toHaveAttribute("data-state", "right");
  });

  it("starts a new set with More story problems", () => {
    show();
    for (const p of set()) {
      fireEvent.click(screen.getByRole("button", { name: String(p.choices[p.answer]) }));
      fireEvent.click(screen.getByRole("button", { name: /Next|Finish/ }));
    }
    fireEvent.click(screen.getByRole("button", { name: "More story problems" }));
    const second = storySet("middle", `p1:${new Date().toISOString().slice(0, 10)}:1`);
    expect(screen.getByText(second[0].prompt)).toBeInTheDocument();
  });

  it("draws the little kids' groups as pictures and goes back to the treasure chest", () => {
    show("little");
    expect(screen.getByRole("button", { name: "Back to treasures" })).toBeInTheDocument();
    expect(set("little")[0].scene).toBeTruthy();
  });
});
