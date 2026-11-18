// @vitest-environment jsdom
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import type { Diagram } from "@/content/diagrams/types";
import { QuestionVisual } from "./visuals";

const show = (diagram: Diagram, label: string) => render(<QuestionVisual visual={{ type: "diagram", diagram, label }} />);

describe("science diagrams", () => {
  it("draw a circuit with its switch and bulbs, and name it for screen readers", () => {
    const { container } = show({ kind: "circuit", parallel: true, bulbs: 3, switch: "open", out: 2 }, "A parallel circuit.");
    expect(screen.getByRole("img", { name: "A parallel circuit." })).toBeTruthy();
    expect(container.querySelectorAll("circle[r='16']")).toHaveLength(3);
    expect(container.textContent).toContain("burnt out");
  });

  it("draw each marked cell part with its letter", () => {
    const { container } = show({ kind: "cell", cell: "plant", marks: [{ part: "vacuole", letter: "B" }, { part: "wall", letter: "C" }] }, "A plant cell.");
    expect(container.textContent).toBe("BC");
  });

  it("draw the Moon's orbit with its lettered spots", () => {
    const { container } = show({ kind: "orbit", spots: [{ index: 0, letter: "A" }, { index: 4, letter: "B" }] }, "The Moon's orbit.");
    expect(container.textContent).toContain("Sun");
    expect(container.textContent).toContain("Earth");
    expect(container.textContent).toContain("A");
    expect(container.textContent).toContain("B");
  });

  it("draw Earth four times with its tilt, and Earth with lettered places for day and night", () => {
    const seasons = show({ kind: "seasons", letters: ["A", "B", "C", "D"] }, "Seasons.").container;
    expect(seasons.textContent?.match(/N/g)).toHaveLength(4);
    const day = show({ kind: "daynight", dots: [{ letter: "A", angle: 180 }, { letter: "B", angle: 0 }] }, "Day and night.").container;
    expect(day.textContent).toContain("AB");
  });
});
