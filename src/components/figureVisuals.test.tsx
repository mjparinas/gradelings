// @vitest-environment jsdom
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import type { Visual } from "@/content/types";
import { movePoints } from "./figureVisuals";
import { QuestionVisual } from "./visuals";

const show = (visual: Visual) => render(<QuestionVisual visual={visual} />);

describe("protractor", () => {
  it("draws the baseline, the ticks and one line for each ray, and the outer scale only when asked", () => {
    const { container, rerender } = show({ type: "protractor", from: 0, to: 60 });
    expect(screen.getByRole("img", { name: /protractor/ })).toBeInTheDocument();
    expect(container.querySelectorAll("line[stroke-width='3.5']")).toHaveLength(2);
    const one = container.querySelectorAll("text").length;
    rerender(<QuestionVisual visual={{ type: "protractor", from: 0, to: 60, twoScales: true }} />);
    expect(container.querySelectorAll("text").length).toBe(one * 2);
  });

  it("puts a ray on 0 at the right-hand end of the baseline", () => {
    const { container } = show({ type: "protractor", from: 0, to: 90 });
    const rays = [...container.querySelectorAll("line[stroke-width='3.5']")];
    const first = rays[0];
    expect(Number(first.getAttribute("y2"))).toBeCloseTo(150, 5);
    expect(Number(first.getAttribute("x2"))).toBeGreaterThan(160);
    const second = rays[1];
    expect(Number(second.getAttribute("x2"))).toBeCloseTo(160, 5);
    expect(Number(second.getAttribute("y2"))).toBeLessThan(150);
  });
});

describe("thermometer", () => {
  it("draws one tube for each reading and prints it, with a true minus sign", () => {
    const { container } = show({ type: "thermometer", values: [-15, 5], min: -20, max: 10 });
    expect(screen.getByRole("img", { name: "thermometers" })).toBeInTheDocument();
    expect(container.textContent).toContain("−15 °C");
    expect(container.textContent).toContain("5 °C");
    expect(container.querySelectorAll("rect[rx='8']")).toHaveLength(2);
  });

  it("fills a warmer reading higher than a cooler one", () => {
    const { container } = show({ type: "thermometer", values: [10, 30], min: 0, max: 40 });
    const fills = [...container.querySelectorAll("rect[fill='#e5484d']")];
    expect(Number(fills[1].getAttribute("y"))).toBeLessThan(Number(fills[0].getAttribute("y")));
  });
});

describe("slide, flip and turn", () => {
  const sum = (pts: [number, number][]) => [pts.reduce((a, p) => a + p[0], 0), pts.reduce((a, p) => a + p[1], 0)];

  it("slides every corner by the same amount", () => {
    const g = movePoints({ type: "move", move: "slide", figure: "square", dx: 3, dy: 3 });
    g.after.forEach((p, i) => expect(p).toEqual([g.before[i][0] + 3, g.before[i][1] + 3]));
  });

  it("flips across a line so each corner is the same distance from it, on the other side", () => {
    const g = movePoints({ type: "move", move: "flip", figure: "boot" });
    const at = g.mirror!.at;
    g.after.forEach((p, i) => {
      expect(p[0] - at).toBeCloseTo(-(g.before[i][0] - at), 9);
      expect(p[1]).toBe(g.before[i][1]);
    });
  });

  it("turns around the point and keeps every corner the same distance from it", () => {
    const g = movePoints({ type: "move", move: "turn", figure: "boot", degrees: 90 });
    g.after.forEach((p, i) => expect(Math.hypot(...p)).toBeCloseTo(Math.hypot(...g.before[i]), 9));
    expect(sum(g.after)).not.toEqual(sum(g.before));
    // A half turn sends each corner to the opposite side of the point.
    const half = movePoints({ type: "move", move: "turn", figure: "boot", degrees: 180 });
    half.after.forEach((p, i) => {
      expect(p[0]).toBeCloseTo(-half.before[i][0], 9);
      expect(p[1]).toBeCloseTo(-half.before[i][1], 9);
    });
  });

  it("names the move in its label and draws the before and after shapes", () => {
    for (const [move, name] of [["slide", /slide/], ["flip", /flip/], ["turn", /turn/]] as const) {
      const { container, unmount } = show({ type: "move", move });
      expect(screen.getByRole("img", { name })).toBeInTheDocument();
      expect(container.querySelectorAll("polygon").length).toBeGreaterThanOrEqual(2);
      unmount();
    }
  });
});

describe("compass and outlines", () => {
  it("points the arrow the way the person faces", () => {
    const { container } = show({ type: "compass", facing: "east" });
    expect(screen.getByRole("img", { name: "a compass with someone facing east" })).toBeInTheDocument();
    const arrow = container.querySelector("line[stroke-width='7']")!;
    expect(Number(arrow.getAttribute("x2"))).toBeGreaterThan(Number(arrow.getAttribute("x1")));
    expect(Number(arrow.getAttribute("y2"))).toBeCloseTo(Number(arrow.getAttribute("y1")), 5);
  });

  it("names each outline", () => {
    show({ type: "figure", figure: "isosceles" });
    expect(screen.getByRole("img", { name: "a triangle with two equal sides" })).toBeInTheDocument();
  });
});
