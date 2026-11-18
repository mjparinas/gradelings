import { describe, expect, it } from "vitest";
import { COURSES } from "./all";
import { anglesFromSides, diagramFor } from "./diagrams";
import type { Question, Visual } from "./types";

const GEOMETRY = ["lineAngles", "angleSplit", "triangleFigure", "figurePair", "polygon"];

describe("diagramFor", () => {
  it("draws two crossing lines with the given angle and the one asked for", () => {
    expect(diagramFor("Two lines cross. One angle is 68°. What is the angle vertically opposite to it?")).toEqual({
      type: "lineAngles",
      layout: "cross",
      at: "top-above-right",
      degrees: 68,
      marks: [
        { pos: "top-above-right", label: "68°" },
        { pos: "top-below-left", label: "?" },
      ],
    });
    const next = diagramFor("Two lines cross. One angle is 98°. What is the angle next to it on the same line?");
    expect(next).toMatchObject({ marks: [{ label: "98°" }, { pos: "top-above-left", label: "?" }] });
  });

  it("puts each transversal relation in the right place", () => {
    const where = (relation: string) => (diagramFor(`A transversal crosses two parallel lines. One angle is 50°. What is its ${relation} angle?`) as Extract<Visual, { type: "lineAngles" }>).marks.map((m) => m.pos);
    expect(where("corresponding")).toEqual(["top-above-right", "bottom-above-right"]);
    expect(where("alternate interior")).toEqual(["top-below-right", "bottom-above-left"]);
    expect(where("alternate exterior")).toEqual(["top-above-right", "bottom-below-left"]);
    expect(where("co-interior")).toEqual(["top-below-right", "bottom-above-right"]);
  });

  it("sizes an unknown angle so the parts fill the whole", () => {
    expect(diagramFor("Three angles sit side by side on a straight line. Two of them are 59° and 43°. What is the third?")).toMatchObject({ whole: "straight", parts: [{ degrees: 59 }, { degrees: 43 }, { label: "?", degrees: 78 }] });
    expect(diagramFor("Two angles are supplementary. One is x and the other is 4x. What is x?")).toMatchObject({ parts: [{ label: "x", degrees: 36 }, { label: "4x", degrees: 144 }] });
    expect(diagramFor("An angle is split into two parts: 20° and 45°. How big is the whole angle?")).toMatchObject({ whole: "angle", totalLabel: "?" });
  });

  it("labels the sides of a right triangle with the legs and a ? for the hypotenuse", () => {
    const v = diagramFor("The legs of a right triangle are 9 cm and 3 cm. What is the hypotenuse, rounded to 1 decimal place?") as Extract<Visual, { type: "triangleFigure" }>;
    expect(v.angles[0]).toBe(90);
    // Side i is the one opposite corner i: the hypotenuse is across from the right angle.
    expect(v.sideLabels).toEqual(["?", "3 cm", "9 cm"]);
    expect(Math.tan((v.angles[1] * Math.PI) / 180)).toBeCloseTo(3 / 9);
  });

  it("draws a triangle from its angles", () => {
    expect(diagramFor("An isosceles triangle has a top angle of 66°. What is each base angle?")).toMatchObject({ angles: [57, 57, 66], angleLabels: ["?", "?", "66°"], ticks: [0, 1] });
  });

  it("draws the regular polygon a question names", () => {
    expect(diagramFor("What is the sum of the interior angles of a hexagon?")).toEqual({ type: "polygon", sides: 6 });
    expect(diagramFor("What is the measure of each interior angle of a regular polygon with 12 sides?")).toEqual({ type: "polygon", sides: 12, label: "?" });
  });

  it("draws nothing for a question that isn't about a figure it knows", () => {
    expect(diagramFor("What is a right angle?")).toBeUndefined();
    expect(diagramFor("Two lines cross. One angle is 68°. What is the sum of the two angles?")).toBeUndefined();
    // The angles of that "triangle" don't leave room for a third.
    expect(diagramFor("Two angles of a triangle are 100° and 90°. What is the third angle?")).toBeUndefined();
  });
});

describe("anglesFromSides", () => {
  it("finds a right angle in a 3-4-5 triangle and rejects impossible sides", () => {
    const [a, b, c] = anglesFromSides(3, 4, 5)!;
    expect(c).toBeCloseTo(90);
    expect(a + b + c).toBeCloseTo(180);
    expect(anglesFromSides(1, 2, 5)).toBeUndefined();
  });
});

function numbersIn(text: string): string[] {
  return text.match(/\d+(?:\.\d+)?/g) ?? [];
}

describe("drawings added to generated questions", () => {
  const drawn: { grade: string; unit: string; q: Question }[] = [];
  for (const c of COURSES) {
    if (c.subject !== "math") continue;
    for (const u of c.units) for (const difficulty of [1, 2, 3] as const) for (const q of u.generate({ difficulty })) if (q.visual && GEOMETRY.includes(q.visual.type)) drawn.push({ grade: c.grade, unit: u.id, q });
  }

  it("reaches questions in Grades 3 to 9 only", () => {
    expect(drawn.length).toBeGreaterThan(50);
    for (const d of drawn) expect(["3", "4", "5", "6", "7", "8", "9"]).toContain(d.grade);
  });

  it("only shows numbers the question itself gives", () => {
    for (const { unit, q } of drawn) {
      const v = q.visual as Visual;
      const given = new Set(numbersIn(q.prompt));
      const labels: string[] = [];
      if (v.type === "lineAngles") labels.push(...v.marks.map((m) => m.label));
      if (v.type === "angleSplit") labels.push(...v.parts.map((p) => p.label), v.totalLabel ?? "");
      if (v.type === "triangleFigure") labels.push(...(v.angleLabels ?? []), ...(v.sideLabels ?? []), v.height ?? "");
      if (v.type === "figurePair") labels.push(...v.a, ...v.b);
      if (v.type === "polygon") labels.push(v.label ?? "");
      for (const label of labels) for (const num of numbersIn(label)) expect(given.has(num), `${unit}: "${label}" is not in "${q.prompt}"`).toBe(true);
    }
  });

  it("never prints the answer in the picture", () => {
    for (const { unit, q } of drawn) {
      const answer = q.kind === "choice" ? q.choices.find((c) => c.id === q.answer)?.label : "answer" in q ? String((q as { answer: unknown }).answer) : undefined;
      if (!answer) continue;
      const v = JSON.stringify((q.visual as Visual) && { ...(q.visual as object), degrees: undefined, angles: undefined, ratio: undefined, parts: undefined });
      const labelText = (v.match(/"(?:label|angleLabels|sideLabels|a|b|height|totalLabel|marks)":[^}\]]*/g) ?? []).join(" ");
      expect(numbersIn(labelText).includes(answer.replace(/[^\d.]/g, "")) && answer.replace(/[^\d.]/g, "") !== "" && !numbersIn(q.prompt).includes(answer.replace(/[^\d.]/g, "")), `${unit}: picture shows the answer to "${q.prompt}"`).toBe(false);
    }
  });
});
