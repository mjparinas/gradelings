import { pick, randInt, sample } from "../../random";
import type { Unit } from "../../types";
import { type Maker, fmt, num, pickOne, someone, typed } from "../../washington/units/math-kit";
import type { Q } from "../own";
import { bank, mathUnit } from "./math-kit";

// New York's own Grade 7 math units (`ny-` ids): rewriting expressions to show how quantities are related
// (NY-7.EE.2), when given sides and angles make one triangle, many or none (NY-7.G.2), the shapes made by slicing solids
// (NY-7.G.3), and the area of shapes made of rectangles, triangles and trapezoids (NY-7.G.6).

// ---------- Rewriting expressions (NY-7.EE.2) ----------

const RATES = [3, 4, 5, 6, 8, 10, 12, 15, 20, 25, 30, 40] as const;
const dec = (n: number): string => fmt(Math.round(n * 1000) / 1000);

/** A percent increase written two ways. */
const increase: Maker = () => {
  const r = pick(RATES);
  const what = pick(["price", "population", "salary", "rent"]);
  return pickOne(
    `A ${what} p goes up by ${r}%. The new ${what} is p + ${dec(r / 100)}p. Which expression is the same?`,
    `${dec(1 + r / 100)}p`,
    [`${dec(r / 100)}p`, `p + ${r}`, `${dec(1 + r / 10)}p`],
    `p is 1p. Add the coefficients: 1 + ${dec(r / 100)} = ${dec(1 + r / 100)}.`,
  );
};

/** A discount written two ways. */
const discount: Maker = () => {
  const r = pick(RATES);
  return pickOne(
    `A jacket costs p dollars and is ${r}% off. Which expression gives the sale price?`,
    `${dec(1 - r / 100)}p`,
    [`${dec(r / 100)}p`, `p − ${r}`, `${dec(1 + r / 100)}p`],
    `p − ${dec(r / 100)}p = ${dec(1 - r / 100)}p: paying ${100 - r}% of the price.`,
  );
};

/** What a rewritten expression reveals. */
const meaning: Maker = () => {
  const r = pick(RATES);
  if (pick([true, false])) {
    return pickOne(
      `A sale price is written as ${dec(1 - r / 100)}p. What does this tell you?`,
      `The price is ${r}% off`,
      [`The price is ${100 - r}% off`, `The price went up by ${r}%`, `The price is ${dec(1 - r / 100)} dollars off`],
      `${dec(1 - r / 100)}p means paying ${100 - r}% of the price, so ${r}% is taken off.`,
    );
  }
  return pickOne(
    `With tax, a bill of b dollars costs ${dec(1 + r / 100)}b. What does this tell you?`,
    `The tax rate is ${r}%`,
    [`The tax rate is ${dec(1 + r / 100)}%`, `The tax is ${r} dollars`, `The bill is ${r}% off`],
    `${dec(1 + r / 100)}b = b + ${dec(r / 100)}b: the bill plus ${r}% of it.`,
  );
};

/** Grouping: n people each buy two things. */
const grouping: Maker = () => {
  const n = randInt(3, 9);
  if (pick([true, false])) {
    return pickOne(
      `${n} friends each buy a ticket for t dollars and a snack for s dollars. The total is ${n}t + ${n}s. Which expression is the same?`,
      `${n}(t + s)`,
      [`${n}t + s`, `${n}ts`, `t + ${n}s`],
      `Factor out the ${n}: ${n}t + ${n}s = ${n}(t + s).`,
    );
  }
  return pickOne(
    `${n} friends each buy a ticket and a snack. The total cost is ${n}(t + s). What does t + s stand for?`,
    "what one friend spends",
    ["what all the friends spend", "the number of friends", "the cost of all the tickets"],
    `${n}(t + s) is ${n} groups of t + s: one group for each friend.`,
  );
};

/** Perimeter of a rectangle whose length is w + k. */
const perimeter: Maker = (d) => {
  const k = randInt(2, 9);
  const prompt = `A rectangle is w feet wide and w + ${k} feet long. Its perimeter is 2w + 2(w + ${k}). Which expression is the same?`;
  if (d === 3 && pick([true, false])) {
    return num(`A rectangle is w feet wide and w + ${k} feet long. Its perimeter is 4w + ?. What number goes in the box?`, 2 * k, `2w + 2(w + ${k}) = 2w + 2w + ${2 * k}.`, { min: 1, extra: [k, 4 * k] });
  }
  return pickOne(prompt, `4w + ${2 * k}`, [`4w + ${k}`, `2w + ${2 * k}`, `3w + ${2 * k}`], `2(w + ${k}) = 2w + ${2 * k}. Then 2w + 2w = 4w.`);
};

const REWRITE: Q[] = [
  ["Why might a store write a 25% discount as 0.75p instead of p − 0.25p?", "It shows in one step that you pay 75% of the price", ["It gives a different price", "It shows the discount is 75%", "It is the only correct way"], "Both expressions are equal; 0.75p shows what you pay."],
  ["Which shows “a 10% raise” on a salary s in one term?", "1.1s", ["0.1s", "s + 10", "1.01s"], "s + 0.1s = 1.1s."],
  ["a + a + a + a is the same as 4a. What does 4a show more clearly?", "that there are 4 equal amounts", ["that a is 4", "that the total is a", "that there are 4 different amounts"], "4a means 4 groups of a."],
  ["Which is the same as 3(x + 2)?", "3x + 6", ["3x + 2", "x + 6", "3x + 5"], "Multiply both terms by 3."],
  ["Which is the same as 0.5x + 0.5x?", "x", ["0.25x", "x²", "1.5x"], "0.5 + 0.5 = 1, and 1x = x."],
  ["Doubling a recipe that uses c cups of flour and m cups of milk uses 2c + 2m. Which is the same?", "2(c + m)", ["2c + m", "c + 2m", "4cm"], "Factor out the 2.", true],
];

// ---------- Triangles from given conditions (NY-7.G.2) ----------

const ONE = "exactly one triangle";
const NONE = "no triangle";
const MANY = "more than one triangle";
const CHOICES = [ONE, NONE, MANY];
const others = (right: string) => CHOICES.filter((c) => c !== right);

/** Three side lengths: one triangle, or none. */
const threeSides: Maker = () => {
  const [a, b] = [randInt(2, 10), randInt(2, 10)];
  const c = pick([a + b, a + b + randInt(1, 4), randInt(Math.abs(a - b) + 1, a + b - 1)]);
  const ok = a + b > c && a + c > b && b + c > a;
  return pickOne(
    `How many triangles can you draw with sides of ${a} cm, ${b} cm and ${c} cm?`,
    ok ? ONE : NONE,
    others(ok ? ONE : NONE),
    ok ? "The two shorter sides add to more than the longest, so they meet. Three sides fix one triangle." : "The two shorter sides must add to more than the longest side, or they cannot meet.",
  );
};

/** Three angles: many triangles (same shape, any size), or none. */
const threeAngles: Maker = () => {
  const a = randInt(3, 12) * 5;
  const b = randInt(3, 12) * 5;
  const c = pick([180 - a - b, 180 - a - b + pick([-10, 10, 20])]);
  const ok = a + b + c === 180;
  return pickOne(
    `How many triangles can you draw with angles of ${a}°, ${b}° and ${c}°?`,
    ok ? MANY : NONE,
    others(ok ? MANY : NONE),
    ok ? "The angles add to 180°, so they fit. But the triangle can be drawn small or large." : `A triangle's angles always add to 180°. These add to ${a + b + c}°.`,
  );
};

/** Two sides and the angle between them, or two angles and the side between them. */
const included: Maker = () => {
  if (pick([true, false])) {
    const [a, b] = [randInt(3, 12), randInt(3, 12)];
    const g = randInt(3, 30) * 5;
    return pickOne(`How many triangles have sides of ${a} cm and ${b} cm with a ${g}° angle between them?`, ONE, others(ONE), "Draw the angle, measure the two sides along its rays, and join their ends. There is only one way.");
  }
  const a = randInt(4, 14) * 5;
  const b = randInt(4, 16) * 5;
  const side = randInt(4, 12);
  const ok = a + b < 180;
  return pickOne(
    `How many triangles have angles of ${a}° and ${b}° at the two ends of a ${side} cm side?`,
    ok ? ONE : NONE,
    others(ok ? ONE : NONE),
    ok ? "Draw the side, then the two angles at its ends. Their rays meet at one point." : `Two angles that add to ${a + b}° leave nothing for the third angle, so the rays never meet.`,
  );
};

/** Which length could be the third side? */
const thirdSide: Maker = (d) => {
  const a = randInt(3, 12);
  let b = randInt(3, 12);
  while (b === a) b = randInt(3, 12);
  const lo = Math.abs(a - b);
  const hi = a + b;
  const right = randInt(lo + 1, hi - 1);
  if (d === 3) return pickOne(`Two sides of a triangle are ${a} m and ${b} m. Which could be the third side?`, `${right} m`, [`${hi} m`, `${lo} m`, `${hi + 3} m`], `The third side must be between ${b > a ? b : a} − ${b > a ? a : b} = ${lo} and ${a} + ${b} = ${hi}.`);
  return pickOne(`Two sides of a triangle are ${a} m and ${b} m. Which could be the third side?`, `${right} m`, [`${hi + 1} m`, `${hi + 5} m`, `${Math.max(1, lo - 1)} m`].filter((x) => x !== `${right} m`), `The third side must be longer than ${lo} m and shorter than ${hi} m.`);
};

const DRAW: Q[] = [
  ["What tools help you draw a triangle with given angles and sides?", "a ruler and a protractor", ["a calculator only", "a compass only", "graph paper only"], "Measure sides with a ruler and angles with a protractor."],
  ["Triangles with angles 60°, 60° and 60° can be drawn in…", "many sizes, all the same shape", ["exactly one size", "no way at all", "only with 3 cm sides"], "Angles fix the shape but not the size."],
  ["Why can't sides of 2 cm, 3 cm and 8 cm make a triangle?", "2 + 3 is less than 8, so the short sides cannot meet", ["8 is an even number", "all sides must be equal", "the angles would add to more than 180°"], "The two shorter sides must add to more than the longest side."],
  ["Can a triangle have two right angles?", "No: two 90° angles already make 180°", ["Yes, if it is big", "Yes, any triangle can", "No: right angles are not allowed"], "The three angles of a triangle add to 180°."],
  ["You know all three side lengths of a triangle. How many triangles fit?", "exactly one", ["none ever", "many sizes", "exactly two"], "Three sides that can meet fix one triangle (it can be turned or flipped, but it is the same triangle)."],
  ["Can a triangle have angles of 100° and 90°?", "No: they already add to more than 180°", ["Yes, the third angle is −10°", "Yes, if the sides are long", "No: 100° is too small"], "There must be some angle left for the third corner.", true],
];

// ---------- Slicing solids (NY-7.G.3) ----------

const SLICES: Q[] = [
  ["A rectangular prism is sliced parallel to its base. What shape is the slice?", "a rectangle the same size as the base", ["a triangle", "a circle", "a smaller rectangle that shrinks as you go up"], "A prism has the same cross-section all the way up."],
  ["A cube is sliced parallel to one face. What shape is the slice?", "a square", ["a triangle", "a circle", "a hexagon"], "Every slice parallel to a face of a cube is a square the same size as the face."],
  ["A cylinder is sliced parallel to its base. What shape is the slice?", "a circle", ["a rectangle", "a triangle", "an oval with a point"], "The slice matches the circular base."],
  ["A cylinder standing up is sliced straight down through its center. What shape is the slice?", "a rectangle", ["a circle", "a triangle", "a square pyramid"], "Straight down through a cylinder cuts a rectangle: its height by its diameter."],
  ["A cone is sliced parallel to its base. What shape is the slice?", "a circle smaller than the base", ["a triangle", "a rectangle", "a circle bigger than the base"], "Slices of a cone get smaller toward the point."],
  ["A cone standing up is sliced straight down through its point. What shape is the slice?", "a triangle", ["a circle", "a rectangle", "a square"], "Straight down through the tip cuts a triangle."],
  ["A square pyramid is sliced parallel to its base. What shape is the slice?", "a square smaller than the base", ["a triangle", "a circle", "a rectangle bigger than the base"], "The slice has the shape of the base but shrinks toward the top."],
  ["A square pyramid is sliced straight down through its top point. What shape is the slice?", "a triangle", ["a square", "a circle", "a rectangle"], "Straight down through the apex cuts a triangle."],
  ["A triangular prism is sliced parallel to its triangle base. What shape is the slice?", "a triangle", ["a rectangle", "a circle", "a square pyramid"], "A prism's slices parallel to its base match the base."],
  ["A triangular prism lying on a rectangle face is sliced straight down, parallel to its length. What shape is the slice?", "a rectangle", ["a triangle", "a circle", "a hexagon"], "Cutting along the length of a prism gives a rectangle.", true],
  ["A sphere is sliced by a flat cut. What shape is the slice?", "a circle", ["a square", "a triangle", "an oval with corners"], "Any flat slice of a sphere is a circle."],
  ["Which solid gives a circle when sliced parallel to its base and a rectangle when sliced straight down?", "a cylinder", ["a cone", "a cube", "a square pyramid"], "Circles across, rectangles down: a cylinder."],
  ["Which solid gives a circle when sliced parallel to its base and a triangle when sliced down through its top?", "a cone", ["a cylinder", "a cube", "a sphere"], "Circles across, triangles through the tip: a cone."],
  ["Which solid gives a square when sliced parallel to its base and a triangle when sliced down through its top?", "a square pyramid", ["a cube", "a cylinder", "a cone"], "A square base and a point on top: a square pyramid."],
  ["A hexagonal prism is sliced parallel to its base. What shape is the slice?", "a hexagon", ["a rectangle", "a triangle", "a circle"], "The slice matches the hexagon base."],
  ["As you slice a pyramid parallel to its base, moving up, the slices…", "keep the same shape and get smaller", ["get bigger", "change shape at each cut", "stay exactly the same size"], "A pyramid narrows to a point."],
  ["As you slice a prism parallel to its base, moving up, the slices…", "stay the same shape and size", ["get smaller", "get bigger", "turn into triangles"], "A prism is the same all the way up."],
  ["A loaf of bread shaped like a rectangular prism is cut into slices. Each slice is a…", "rectangle", ["circle", "triangle", "pentagon"], "Slicing straight across a rectangular prism gives rectangles."],
  ["A rectangular prism stands on its base and is sliced straight down, parallel to its front face. What is the slice?", "a rectangle the size of the front face", ["a triangle", "a circle", "a trapezoid"], "A slice parallel to a face matches that face.", true],
  ["A cube is sliced straight down from one top edge to the opposite bottom edge. What is the slice?", "a rectangle", ["a triangle", "a circle", "a square smaller than a face"], "The cut runs along two parallel edges, so it is a rectangle longer than a face.", true],
];

/** The size of a slice of a rectangular prism. */
const prismSlice: Maker = () => {
  const [l, w, h] = sample([3, 4, 5, 6, 8, 9, 10, 12], 3);
  if (pick([true, false])) {
    return pickOne(
      `A box is ${l} in long, ${w} in wide and ${h} in tall. It is sliced parallel to its base. What is the slice?`,
      `a ${l} in by ${w} in rectangle`,
      [`a ${l} in by ${h} in rectangle`, `a ${w} in by ${h} in rectangle`, `a triangle with sides ${l}, ${w} and ${h} in`],
      "The base is length by width. A slice parallel to the base matches it.",
    );
  }
  return num(
    `A box is ${l} cm long, ${w} cm wide and ${h} cm tall. It is sliced straight down, parallel to its ${l} cm by ${h} cm front face. What is the area of the slice, in cm²?`,
    l * h,
    `The slice matches the front face: ${l} × ${h}.`,
    { min: 1, extra: [l * w, w * h, l * w * h] },
  );
};

// ---------- Area of composite shapes (NY-7.G.6) ----------

/** An L shape made of two rectangles. */
const lShape: Maker = (d) => {
  const [a, b] = [randInt(6, 14), randInt(4, 10)];
  const [c, e] = [randInt(2, a - 2), randInt(2, 8)];
  const area = a * b + c * e;
  const prompt = `${someone()}'s patio is an L shape: a ${a} ft by ${b} ft rectangle joined to a ${c} ft by ${e} ft rectangle. What is its area, in square feet?`;
  const hint = `Add the two rectangles: ${a} × ${b} + ${c} × ${e}.`;
  if (d === 3) return typed(prompt, area, hint);
  return num(prompt, area, hint, { min: 1, extra: [2 * (a + b + c + e), a * b, (a + c) * (b + e)] });
};

/** A house shape: a rectangle with a triangle on top. */
const houseShape: Maker = (d) => {
  const w = randInt(3, 10) * 2;
  const h = randInt(4, 12);
  const t = randInt(2, 8);
  const area = w * h + (w * t) / 2;
  const prompt = `A wall is a ${w} ft by ${h} ft rectangle with a triangle on top. The triangle's base is ${w} ft and its height is ${t} ft. What is the wall's area, in square feet?`;
  const hint = `Rectangle: ${w} × ${h} = ${w * h}. Triangle: ½ × ${w} × ${t} = ${(w * t) / 2}. Add them.`;
  if (d === 3) return typed(prompt, area, hint);
  return num(prompt, area, hint, { min: 1, extra: [w * h + w * t, w * (h + t), w * h] });
};

/** A trapezoid, or a trapezoid split into a rectangle and triangles. */
const trapezoid: Maker = (d) => {
  const b1 = randInt(3, 10) * 2;
  const b2 = b1 + randInt(1, 6) * 2;
  const h = randInt(3, 12);
  const area = ((b1 + b2) / 2) * h;
  const prompt = `A garden bed is a trapezoid with parallel sides of ${b1} m and ${b2} m, ${h} m apart. What is its area, in m²?`;
  const hint = `Area = ½ × (${b1} + ${b2}) × ${h}.`;
  if (d === 3) return typed(prompt, area, hint, { keypad: "decimal" });
  return num(prompt, area, hint, { min: 1, extra: [(b1 + b2) * h, b1 * h, b2 * h] });
};

/** A rectangle with a triangle cut out. */
const cutOut: Maker = () => {
  const [a, b] = [randInt(8, 16), randInt(6, 12)];
  const base = randInt(2, 3) * 2;
  const t = randInt(2, b - 2);
  const area = a * b - (base * t) / 2;
  return num(
    `A ${a} in by ${b} in sign has a triangle cut out of one edge. The triangle's base is ${base} in and its height is ${t} in. What area is left, in square inches?`,
    area,
    `Rectangle minus triangle: ${a} × ${b} − ½ × ${base} × ${t}.`,
    { min: 1, extra: [a * b - base * t, a * b, a * b + (base * t) / 2] },
  );
};

/** Cost of covering a composite floor. */
const coverCost: Maker = () => {
  const [a, b] = [randInt(3, 8), randInt(3, 8)];
  const [c, e] = [randInt(2, 5), randInt(2, 5)];
  const area = a * b + c * e;
  const price = pick([2, 3, 4, 5]);
  return num(
    `A floor is a ${a} m by ${b} m rectangle plus a ${c} m by ${e} m rectangle. Tile costs $${price} per square meter. What does the tile cost, in dollars?`,
    area * price,
    `Area: ${a * b} + ${c * e} = ${area} m². Then multiply by $${price}.`,
    { min: 1, extra: [area, (a + b + c + e) * 2 * price, a * b * price] },
  );
};

const AREA_IDEAS: Q[] = [
  ["How can you find the area of a shape made of a rectangle and a triangle?", "find each area and add them", ["multiply all the side lengths", "add all the side lengths", "use only the rectangle"], "Split the shape into parts you know, then add."],
  ["A trapezoid is split into a rectangle and two triangles. How do you find its area?", "add the areas of the rectangle and both triangles", ["multiply the three areas", "use only the rectangle", "subtract the triangles from the rectangle"], "The parts together make the whole shape."],
  ["Why is a triangle's area ½ × base × height?", "it is half of a rectangle with the same base and height", ["it has 3 sides", "it is half of a circle", "the height is always half the base"], "Two copies of a triangle make a parallelogram."],
  ["A shape is a rectangle with a square hole. How do you find its area?", "subtract the hole's area from the rectangle's area", ["add the two areas", "multiply the two areas", "ignore the hole"], "Take away the part that is not there."],
];

export const UNITS: Unit[] = [
  mathUnit({
    id: "ny-g7-rewrite-expressions",
    title: "Rewriting Expressions",
    emoji: "🔁",
    blurb: "Same value, clearer meaning",
    parentNote: "Writing the same expression in a different form to see what it means: a 6% increase as 1.06p, 20% off as 0.8p, and 4t + 4s as 4(t + s), what each friend spends times 4.",
    codes: "NY-7.EE.2",
    text: "rewriting expressions in different forms to show how the quantities in a problem are related",
    makers: [increase, discount, meaning, meaning, grouping, perimeter, bank(REWRITE)],
  }),
  mathUnit({
    id: "ny-g7-triangles",
    title: "One Triangle, Many or None?",
    emoji: "🔺",
    blurb: "Sides and angles that make triangles",
    parentNote: "Deciding whether given sides and angles make exactly one triangle, more than one, or none: the two shorter sides must add to more than the longest, the angles must add to 180°, and three angles fix the shape but not the size.",
    codes: "NY-7.G.2",
    text: "drawing triangles from given angles and sides, and noticing when the conditions make one triangle, more than one, or none",
    makers: [threeSides, threeSides, threeAngles, included, thirdSide, bank(DRAW)],
  }),
  mathUnit({
    id: "ny-g7-slices",
    title: "Slicing Solids",
    emoji: "🍞",
    blurb: "What shape is the cut?",
    parentNote: "Picturing the flat shape you get when you slice a prism, pyramid, cylinder, cone or sphere parallel or perpendicular to its base, like slicing a loaf of bread or a block of cheese.",
    codes: "NY-7.G.3",
    text: "describing the two-dimensional shapes made by slicing three-dimensional solids parallel or perpendicular to the base",
    makers: [bank(SLICES), bank(SLICES), bank(SLICES), prismSlice],
  }),
  mathUnit({
    id: "ny-g7-composite-area",
    title: "Area of Composite Shapes",
    emoji: "🏠",
    blurb: "Split it, find each area, add",
    parentNote: "Finding the area of floors, walls, signs and gardens made of rectangles, triangles and trapezoids by splitting them into parts, adding the areas, or subtracting a cut-out part.",
    codes: "NY-7.G.6",
    text: "solving real-world problems with the area of shapes made of rectangles, triangles and trapezoids",
    makers: [lShape, houseShape, trapezoid, cutOut, coverCost, bank(AREA_IDEAS)],
  }),
];
