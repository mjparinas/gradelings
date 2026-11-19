// @vitest-environment jsdom
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import type { SolidKind, Visual } from "@/content/types";
import { QuestionVisual } from "./visuals";

const KINDS: SolidKind[] = ["box", "cube", "triangular-prism", "cylinder", "cone", "square-pyramid"];

describe("solid and net pictures", () => {
  // Measurements both the solid and its net have a place for.
  const LABELS: Record<Exclude<SolidKind, "stacked">, Record<string, string>> = {
    box: { length: "8 cm", width: "5 cm", height: "4 cm" },
    cube: { edge: "6 cm" },
    "triangular-prism": { base: "6 cm", height: "4 cm", length: "9 cm" },
    cylinder: { radius: "3 cm", height: "10 cm" },
    cone: { radius: "3 cm", slant: "7 cm" },
    "square-pyramid": { base: "6 cm", slant: "7 cm" },
  };

  it.each(KINDS)("draws a %s and its net, with the measurements written on it", (kind) => {
    const labels = LABELS[kind as keyof typeof LABELS];
    for (const visual of [{ type: "solid", solid: kind, labels }, { type: "net", net: kind, labels }] as Visual[]) {
      const { container, unmount } = render(<QuestionVisual visual={visual} />);
      expect(screen.getByRole("img").getAttribute("aria-label")).toMatch(visual.type === "net" ? /^a net of a / : /^a /);
      for (const text of Object.values(labels)) expect(container.textContent).toContain(text);
      unmount();
    }
  });

  it("tells a screen reader which measurement is unknown", () => {
    render(<QuestionVisual visual={{ type: "solid", solid: "box", labels: { length: "5 cm", width: "4 cm", height: "?" } }} />);
    expect(screen.getByRole("img")).toHaveAttribute("aria-label", "a rectangular prism, length 5 cm, width 4 cm, height unknown");
  });

  it("draws a box with a cube on top", () => {
    const { container } = render(<QuestionVisual visual={{ type: "solid", solid: "stacked", labels: { length: "8 cm", edge: "2 cm" } }} />);
    expect(container.textContent).toContain("2 cm");
    expect(screen.getByRole("img").getAttribute("aria-label")).toMatch(/^a box with a cube on top/);
  });

  it("keeps a box's proportions near its measurements", () => {
    const { container } = render(<QuestionVisual visual={{ type: "solid", solid: "box", labels: { length: "10 cm", width: "2 cm", height: "2 cm" } }} />);
    const front = container.querySelector("rect")!;
    expect(Number(front.getAttribute("width"))).toBeGreaterThan(Number(front.getAttribute("height")) * 1.5);
  });
});

describe("cutting planes", () => {
  it.each(["box", "cube", "cylinder", "cone", "square-pyramid"] as const)("draws a cut through a %s and says so", (kind) => {
    for (const [cut, words] of [["across", /parallel to its base/], ["down", /straight down/]] as const) {
      const { container, unmount } = render(<QuestionVisual visual={{ type: "solid", solid: kind, cut }} />);
      expect(screen.getByRole("img").getAttribute("aria-label")).toMatch(words);
      expect(container.querySelectorAll("svg > polygon[stroke-dasharray], svg > rect[stroke-dasharray]").length).toBe(1);
      unmount();
    }
  });

  it("draws no plane when there is no cut", () => {
    const { container } = render(<QuestionVisual visual={{ type: "solid", solid: "cone" }} />);
    expect(container.querySelectorAll("svg > polygon[stroke-dasharray], svg > rect[stroke-dasharray]").length).toBe(0);
  });
});
