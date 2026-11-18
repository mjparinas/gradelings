import { describe, expect, it } from "vitest";
import { drawingFor, withDrawing } from "./drawings";
import type { Unit } from "./types";

const draw = (prompt: string) => drawingFor({ prompt });

describe("drawings made from a question's numbers", () => {
  it("draws a line plot that is described as given", () => {
    expect(draw("A line plot has 2 Xs above 1/4 inch, 3 Xs above 1/2 inch and 5 Xs above 3/4 inch. If you move it to a table, how many measurements are there in all?")).toMatchObject({
      type: "linePlot",
      labels: ["1/4", "1/2", "3/4"],
      counts: [2, 3, 5],
    });
  });

  it("leaves alone a question that asks the child to make the plot", () => {
    expect(draw("The class measured some leaves in centimeters: 6, 6, 6, 7, 8, 5. On a line plot, how many X's go above 7?")).toBeUndefined();
  });

  it("draws a line graph from its values and labels", () => {
    expect(draw("A line graph shows 30 at 1 p.m., 45 at 2 p.m. and 60 at 3 p.m. What is the pattern?")).toMatchObject({
      type: "plot",
      xLabels: ["1 p.m.", "2 p.m.", "3 p.m."],
      series: [{ points: [{ x: 1, y: 30 }, { x: 2, y: 45 }, { x: 3, y: 60 }] }],
    });
    expect(draw("On a line graph, a student reads 36 at 10 a.m. and 24 at noon. By how much did it change?")).toMatchObject({ xLabels: ["10 a.m.", "noon"] });
  });

  it("draws the line through two named points, with both marked", () => {
    const v = draw("What is the slope of the line through (5, 0) and (7, 8)?");
    expect(v).toMatchObject({ type: "plot" });
    if (v?.type === "plot") expect(v.series[1].points).toEqual([{ x: 5, y: 0 }, { x: 7, y: 8 }]);
  });

  it("draws a named line, but not when the picture would be the answer", () => {
    const v = draw("Which ordered pair is on the graph of y = 2x + 6?");
    if (v?.type !== "plot") throw new Error("no plot");
    // y = 2x + 6 passes through (0, 6) and (−3, 0).
    const [a, b] = v.series[0].points;
    expect(a.y + ((b.y - a.y) / (b.x - a.x)) * (0 - a.x)).toBeCloseTo(6);
    expect(draw("Which describes the graph of y = −6?")).toBeUndefined();
  });

  it("draws both lines of a system, in either form", () => {
    for (const p of ["How many solutions does this system have? y = 3x − 5 and y = −x − 5", "Solve the system: 3x + 3y = 15 and x − 2y = 11"]) {
      const v = draw(p);
      expect(v?.type === "plot" && v.series.length).toBe(2);
    }
    const v = draw("Solve the system: 3x + 3y = 15 and x − 2y = 11");
    if (v?.type !== "plot") throw new Error("no plot");
    // The two lines cross at (7, −2): both pass through it.
    const at = (i: number, x: number) => {
      const [a, b] = v.series[i].points;
      return a.y + ((b.y - a.y) / (b.x - a.x)) * (x - a.x);
    };
    expect(at(0, 7)).toBeCloseTo(-2);
    expect(at(1, 7)).toBeCloseTo(-2);
  });

  it("draws spinners, tree diagrams and spin results", () => {
    expect(draw("How likely is this? “You spin a 7 on a spinner numbered 1 to 6.”")).toMatchObject({ type: "spinner", labels: ["1", "2", "3", "4", "5", "6"] });
    expect(draw("A spinner is half red, a quarter blue and a quarter green. It is spun twice.")).toMatchObject({ type: "spinner" });
    expect(draw("How many outcomes are in the sample space for using a coin and a spinner with 4 equal parts once each?")).toMatchObject({
      type: "tree",
      stages: [["H", "T"], ["1", "2", "3", "4"]],
    });
    expect(draw("A tree diagram shows a choice of 2 shirts, then 3 pants, then 2 hats. How many different outfits are there?")).toMatchObject({ type: "tree" });
    expect(draw("Zoe spun a spinner 10 times and got blue 7 times and green 3 times. Which colour does the spinner most likely have more of?")).toMatchObject({
      type: "bars",
      bars: [{ label: "Blue", value: 7 }, { label: "Green", value: 3 }],
    });
    // Spin results that don't add up to the spins are not drawn.
    expect(draw("Zoe spun a spinner 10 times and got blue 7 times and green 2 times. Which colour does the spinner most likely have more of?")).toBeUndefined();
  });

  it("never replaces a picture a question already has, and wraps a unit once", () => {
    expect(drawingFor({ prompt: "A line graph shows 1 at 1 p.m. and 2 at 2 p.m.", visual: { type: "equation", text: "1" } })).toBeUndefined();
    const unit = {
      generate: () => [{ kind: "input", prompt: "A line graph shows 1 at 1 p.m. and 2 at 2 p.m. Which is more?", hint: "h", answer: "2", keypad: "number" }],
    } as unknown as Unit;
    const once = withDrawing(unit);
    expect(withDrawing(once)).toBe(once);
    expect(once.generate()[0].visual?.type).toBe("plot");
  });
});
