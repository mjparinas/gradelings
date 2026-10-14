import { pick, randInt, shuffle } from "../../random";
import type { ShapeName } from "../../types";
import { num, pickOne, typed, type Maker } from "../../washington/units/math-kit";
import { mathUnit } from "./math";

// Grade 7: rewriting expressions in context to see what they mean (7.EE.2), and triangles from given conditions and
// slices of solid figures (7.G.2, 7.G.3). The shared helpers are in ./math.ts.

// ---------- Rewriting expressions (7.EE.2) ----------

const PCTS = [5, 8, 10, 15, 20, 25, 30, 40];
const dec = (p: number) => String(p / 100).replace(/^0/, "0");
const times = (p: number) => String(Math.round((1 + p / 100) * 100) / 100);
const less = (p: number) => String(Math.round((1 - p / 100) * 100) / 100);

const increaseForm: Maker = () => {
  const p = pick(PCTS);
  return pickOne(
    `A price p goes up by ${p}%. The new price is p + ${dec(p)}p. Which is the same expression?`,
    `${times(p)}p`,
    [`${dec(p)}p`, `${1 + p}p`, `p + ${p}`],
    `p + ${dec(p)}p = (1 + ${dec(p)})p = ${times(p)}p.`,
  );
};

const discountForm: Maker = () => {
  const p = pick(PCTS);
  return pickOne(
    `A store takes ${p}% off a price p. Which expression gives the sale price?`,
    `${less(p)}p`,
    [`${dec(p)}p`, `p − ${p}`, `${times(p)}p`],
    `p − ${dec(p)}p = ${less(p)}p. You pay ${100 - p}% of the price.`,
  );
};

const meaningOf: Maker = () => {
  const p = pick(PCTS);
  return pickOne(
    `A sale price is written as ${less(p)}p. What does this form tell you?`,
    `You pay ${100 - p}% of the original price`,
    [`You pay ${p}% of the original price`, `The price goes down by $${less(p)}`, `The price goes up by ${100 - p}%`],
    `${less(p)} is ${100 - p}%. Multiplying by ${less(p)} gives ${100 - p}% of p.`,
  );
};

const percentFromForm: Maker = (d) => {
  const p = pick(PCTS);
  const up = pick([true, false]);
  const prompt = up
    ? `A town's population is multiplied by ${times(p)} in one year. By what percent did it grow?`
    : `A jacket's price is multiplied by ${less(p)} on sale. What percent is taken off?`;
  const hint = up ? `${times(p)} = 1 + ${dec(p)}, so it grew by ${p}%.` : `${less(p)} = 1 − ${dec(p)}, so ${p}% is taken off.`;
  if (d === 3) return typed(prompt, p, hint, { suffix: "%" });
  return num(prompt, p, hint, { step: 5, min: 1, max: 99, extra: [100 - p, p + 100].filter((x) => x <= 99), label: (n) => `${n}%` });
};

const perimeterForm: Maker = () => {
  const [l, w] = pick([
    ["l", "w"],
    ["a", "b"],
  ]);
  return pickOne(
    `The perimeter of a rectangle can be written 2${l} + 2${w} or 2(${l} + ${w}). What does 2(${l} + ${w}) show?`,
    "Add one length and one width, then double it",
    ["Multiply the length by the width", "Double only the length", "Add the length and width, then halve it"],
    `2(${l} + ${w}): one trip along a length and a width is half the way around, so double it.`,
  );
};

const groupForm: Maker = () => {
  const k = randInt(3, 6);
  const c = randInt(2, 9);
  return pickOne(
    `${k} friends each buy a ticket for t dollars and a snack for ${c} dollars. Which expression is equivalent to ${k}t + ${k * c}?`,
    `${k}(t + ${c}), the cost for each friend times ${k}`,
    [`${k}t + ${c}, the same total`, `${k * c}t, the cost of the snacks`, `t + ${k * c}, the cost for one friend`],
    `${k}t + ${k * c} = ${k}(t + ${c}): each friend spends t + ${c}, and there are ${k} friends.`,
  );
};

export const REWRITE_7 = mathUnit({
  id: "ca-g7-rewrite-expressions",
  title: "Rewrite to Understand",
  emoji: "🔁",
  blurb: "See what p + 0.05p really means",
  parentNote:
    "Rewriting an expression in a different form to understand a problem, for example seeing that a + 0.05a = 1.05a means 'increase by 5%' and that 0.8p is the price after 20% off.",
  codes: "7.EE.2",
  text: "rewriting expressions in different forms in a problem context to see how the quantities are related",
  makers: [increaseForm, discountForm, meaningOf, percentFromForm, perimeterForm, groupForm],
});

// ---------- Triangles from conditions and slices of solids (7.G.2, 7.G.3) ----------

const canTriangle: Maker = () => {
  const a = randInt(3, 9);
  const b = randInt(3, 9);
  const ok = pick([true, false]);
  const c = ok ? randInt(Math.abs(a - b) + 1, a + b - 1) : a + b + randInt(0, 4);
  return pickOne(
    `Can you build a triangle with side lengths ${a} cm, ${b} cm and ${c} cm?`,
    ok ? "Yes, the two shorter sides add to more than the longest" : "No, the two shorter sides are not longer than the longest",
    [ok ? "No, the two shorter sides are not longer than the longest" : "Yes, the two shorter sides add to more than the longest", "Only if the angles are all 60°"],
    "Any two sides of a triangle must add to more than the third side.",
  );
};

const thirdSide: Maker = () => {
  const a = randInt(4, 9);
  const b = randInt(a + 1, 14);
  const ok = randInt(b - a + 1, a + b - 1);
  const wrong = [b - a, a + b, a + b + randInt(1, 5), Math.max(1, b - a - 1)].filter((x) => x !== ok);
  return pickOne(
    `A triangle has sides of ${a} cm and ${b} cm. Which could be the length of the third side?`,
    `${ok} cm`,
    [...new Set(wrong)].slice(0, 3).map((x) => `${x} cm`),
    `The third side must be longer than ${b} − ${a} = ${b - a} and shorter than ${b} + ${a} = ${a + b}.`,
  );
};

const angleSum: Maker = () => {
  const a = randInt(30, 80);
  const b = randInt(30, 80);
  const good = pick([true, false]);
  const c = good ? 180 - a - b : 180 - a - b + pick([15, 20, 30]);
  return pickOne(
    `Can a triangle have angles of ${a}°, ${b}° and ${c}°?`,
    good ? "Yes, they add to 180°" : `No, they add to ${a + b + c}°, not 180°`,
    [good ? `No, they add to ${a + b + c + 10}°, not 180°` : "Yes, they add to 180°", "Yes, any three angles make a triangle"],
    "The angles of a triangle always add to 180°.",
  );
};

const UNIQUE: { given: string; result: string }[] = [
  { given: "three side lengths: 5 cm, 6 cm and 8 cm", result: "Exactly one triangle" },
  { given: "two angles, 40° and 70°, and the side between them, 6 cm", result: "Exactly one triangle" },
  { given: "two sides, 4 cm and 7 cm, and the angle between them, 50°", result: "Exactly one triangle" },
  { given: "three angles: 50°, 60° and 70°", result: "Many triangles of different sizes" },
  { given: "three angles: 30°, 60° and 90°", result: "Many triangles of different sizes" },
  { given: "three side lengths: 2 cm, 3 cm and 7 cm", result: "No triangle" },
  { given: "three angles: 80°, 70° and 60°", result: "No triangle" },
];

const howManyTriangles: Maker = () => {
  const u = pick(UNIQUE);
  return pickOne(
    `You are told to draw a triangle with ${u.given}. How many different triangles can you draw?`,
    u.result,
    ["Exactly one triangle", "Many triangles of different sizes", "No triangle"].filter((r) => r !== u.result),
    "Three sides, or two angles and the side between them, or two sides and the angle between them fix one triangle. Three angles alone fix only the shape, not the size. Sides must pass the triangle rule and angles must add to 180°.",
  );
};

const SLICES: { solid: string; cut: string; shape: ShapeName }[] = [
  { solid: "rectangular prism (a box)", cut: "parallel to its base", shape: "rectangle" },
  { solid: "cube", cut: "parallel to one face", shape: "square" },
  { solid: "cylinder", cut: "parallel to its base", shape: "circle" },
  { solid: "cylinder", cut: "straight down through its center, perpendicular to the base", shape: "rectangle" },
  { solid: "cone", cut: "parallel to its base", shape: "circle" },
  { solid: "cone", cut: "straight down through its tip, perpendicular to the base", shape: "triangle" },
  { solid: "square pyramid", cut: "parallel to its base", shape: "square" },
  { solid: "square pyramid", cut: "straight down through its top point, perpendicular to the base", shape: "triangle" },
  { solid: "sphere", cut: "anywhere", shape: "circle" },
  { solid: "rectangular prism (a box)", cut: "straight down, perpendicular to its base", shape: "rectangle" },
];

const sliceShape: Maker = () => {
  const s = pick(SLICES);
  const others = shuffle((["rectangle", "circle", "triangle", "square", "hexagon"] as ShapeName[]).filter((x) => x !== s.shape && !(s.shape === "square" && x === "rectangle") && !(s.shape === "rectangle" && x === "square"))).slice(0, 3);
  return pickOne(
    `A ${s.solid} is sliced ${s.cut}. What shape is the flat face of the slice?`,
    { label: s.shape, shape: s.shape },
    others.map((x) => ({ label: x, shape: x })),
    "Picture the knife going through the solid and look at the cut face.",
  );
};

const sliceSize: Maker = () =>
  pick([
    pickOne(
      "A cone is sliced parallel to its base, close to the tip. How does the circle compare with the base?",
      "It is a smaller circle",
      ["It is a bigger circle", "It is the same size as the base", "It is a triangle"],
      "A cone gets narrower toward the tip, so slices near the tip are smaller circles.",
    ),
    pickOne(
      "A cylinder is sliced parallel to its base, halfway up. How does the circle compare with the base?",
      "It is the same size as the base",
      ["It is a smaller circle", "It is a bigger circle", "It is a rectangle"],
      "A cylinder is the same width all the way up, so every slice parallel to the base matches it.",
    ),
    pickOne(
      "A rectangular prism is sliced parallel to its base. How does the slice compare with the base?",
      "It is a rectangle the same size as the base",
      ["It is a smaller rectangle", "It is a triangle", "It is a circle"],
      "A prism has the same cross-section all the way through.",
    ),
  ]);

export const TRIANGLES_SLICES_7 = mathUnit({
  id: "ca-g7-triangles-slices",
  title: "Triangles & Slices",
  emoji: "🔺",
  blurb: "Which triangles exist? What shape is a slice?",
  parentNote:
    "Deciding when given side lengths or angles make one triangle, many triangles or none, and naming the flat shapes you get when you slice solids such as prisms, pyramids, cylinders and cones. At home, try building triangles from straws cut to length.",
  codes: "7.G.2; 7.G.3",
  text: "deciding when conditions determine a unique triangle, more than one triangle or no triangle, and describing the plane sections of solid figures",
  makers: [canTriangle, thirdSide, angleSum, howManyTriangles, sliceShape, sliceSize],
});

export const MATH_7 = [REWRITE_7, TRIANGLES_SLICES_7];
