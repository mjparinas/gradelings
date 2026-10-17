import { pick, randInt, shuffle } from "../../random";
import type { Unit } from "../../types";
import { bankUnit, type Q } from "../own";
import { mathUnit, num, pickOne, someone, typed, eq, type Maker } from "./math-kit";

// Florida's own Grade 2 math units (`fl-` ids): perimeter (MA.2.GR.2.1, MA.2.GR.2.2) and equal parts of a rectangle,
// including the same whole split in two different ways (MA.2.FR.1.2).

const SHAPES: { name: string; sides: number }[] = [
  { name: "triangle", sides: 3 },
  { name: "square", sides: 4 },
  { name: "rectangle", sides: 4 },
  { name: "pentagon", sides: 5 },
];

/** The perimeter of a rectangle with sides a and b, as a sum. */
const rectangle: Maker = (d) => {
  const a = randInt(2, d === 1 ? 6 : 12);
  const b = randInt(2, d === 1 ? 6 : 9);
  const total = 2 * (a + b);
  const prompt = `A rectangle is ${a} inches long and ${b} inches wide. What is its perimeter?`;
  const hint = `Add all four sides: ${a} + ${b} + ${a} + ${b} = ${total}.`;
  return d === 3 ? typed(prompt, total, hint, { suffix: "in" }) : num(prompt, total, hint, { min: 4, extra: [a + b, a * b === total ? total + 2 : a * b], step: 2 });
};

const square: Maker = (d) => {
  const a = randInt(2, d === 1 ? 6 : 12);
  return num(`A square has sides that are ${a} feet long. What is its perimeter?`, 4 * a, `A square has 4 equal sides: ${a} + ${a} + ${a} + ${a}.`, { min: 4, step: 4, extra: [2 * a, a * a === 4 * a ? 4 * a + 4 : a * a] });
};

const triangle: Maker = () => {
  const a = randInt(2, 9);
  const b = randInt(2, 9);
  const c = randInt(Math.abs(a - b) + 1, Math.min(a + b - 1, 12));
  const total = a + b + c;
  return num(`A triangle has sides of ${a} cm, ${b} cm and ${c} cm. What is its perimeter?`, total, `Add the three sides: ${a} + ${b} + ${c} = ${total}.`, { min: 3, extra: [a + b, b + c] });
};

const pentagon: Maker = () => {
  const s = randInt(2, 8);
  return num(`A pentagon has 5 sides that are each ${s} inches long. What is its perimeter?`, 5 * s, `Add 5 sides: ${s} + ${s} + ${s} + ${s} + ${s} = ${5 * s}.`, { min: 5, step: 5 });
};

const countUnits: Maker = (d) => {
  const w = randInt(2, d === 1 ? 4 : 6);
  const h = randInt(1, d === 1 ? 3 : 5);
  const total = 2 * (w + h);
  return num(`A rectangle is ${w} unit segments wide and ${h} tall. How many segments go around it?`, total, `Count the segments on the boundary: ${w} + ${h} + ${w} + ${h} = ${total}.`, { min: 4, extra: [w + h, w * h], visual: eq(`${w} wide, ${h} tall`) });
};

const whichSide: Maker = () => {
  const s = pick(SHAPES);
  return pickOne(`How many sides do you add to find the perimeter of a ${s.name}?`, String(s.sides), shuffle(["3", "4", "5", "6"].filter((x) => x !== String(s.sides))).slice(0, 3), "Perimeter is the distance around, so you add every side.");
};

const missingSide: Maker = () => {
  const a = randInt(3, 9);
  const b = randInt(3, 9);
  const who = someone();
  return num(`${who} walks around a rectangle. Two sides are ${a} feet and ${b} feet. The rest of the sides match. How far is the walk?`, 2 * (a + b), `A rectangle has two sides of ${a} and two of ${b}.`, { min: 4, step: 2, extra: [a + b] });
};

const PERIMETER = mathUnit({
  id: "fl-g2-perimeter",
  title: "Perimeter",
  emoji: "🟦",
  blurb: "How far around a shape?",
  parentNote:
    "Practises Florida's B.E.S.T. benchmarks MA.2.GR.2.1 and MA.2.GR.2.2: finding the perimeter of triangles, rectangles, squares and pentagons by adding their side lengths. Measure around a book or a placemat with a ruler and add up the sides.",
  codes: "MA.2.GR.2.1; MA.2.GR.2.2",
  text: "finding the perimeter of a polygon by adding its whole-number side lengths",
  makers: [rectangle, square, triangle, pentagon, countUnits, whichSide, missingSide],
});

const PARTS: Q[] = [
  ["A rectangle is split into 2 equal parts. Each part is called a…", "half", ["third", "fourth", "whole"], "Two equal parts are halves."],
  ["A rectangle is split into 3 equal parts. Each part is called a…", "third", ["half", "fourth", "whole"], "Three equal parts are thirds."],
  ["A rectangle is split into 4 equal parts. Each part is called a…", "fourth", ["half", "third", "whole"], "Four equal parts are fourths (or quarters)."],
  ["How many thirds make one whole?", "3", ["2", "4", "1"], "Three thirds make a whole."],
  ["How many halves make one whole?", "2", ["3", "4", "1"], "Two halves make a whole."],
  ["How many fourths make one whole?", "4", ["2", "3", "1"], "Four fourths make a whole."],
  ["Two friends share a sandwich so each gets the same amount. Each gets…", "a half", ["a third", "a fourth", "the whole"], "Equal shares of 2 are halves."],
  ["Four friends share a pizza fairly. Each gets…", "a fourth", ["a half", "a third", "the whole"], "Equal shares of 4 are fourths."],
  ["A rectangle can be split into 2 equal parts in more than one way. True or false?", "True", ["False", "Only one way", "Never"], "You can cut it down the middle or across the middle."],
  ["Two rectangles are both cut into halves, one up and down and one side to side. Are the halves the same size?", "yes, each half is the same size", ["no, one has bigger halves", "no, they are quarters", "you can't tell"], "Both cuts make two equal parts of the same whole."],
  ["Two halves of the same whole can look different. Are they still equal in size?", "yes", ["no", "only sometimes", "never"], "Equal means the same amount of space.", true],
  ["Which cut makes 2 equal parts of a rectangle?", "straight down the middle", ["close to one edge", "a tiny corner", "a zig-zag with one big and one small piece"], "Equal parts must be the same size."],
  ["A rectangle is cut into 2 parts but one part is bigger. Are these halves?", "no", ["yes", "they are thirds", "they are fourths"], "Halves must be equal."],
  ["A circle is split into 4 equal parts. How many fourths are there?", "4", ["2", "3", "6"], "Four equal parts."],
  ["A rectangle has 3 equal parts. Two parts are shaded. How many thirds are shaded?", "2", ["1", "3", "4"], "Count the shaded parts."],
  ["A rectangle has 4 equal parts. One part is shaded. What fraction is shaded?", "one fourth", ["one half", "one third", "four"], "One of four equal parts."],
  ["A rectangle has 2 equal parts. One part is shaded. What fraction is shaded?", "one half", ["one third", "one fourth", "two"], "One of two equal parts."],
  ["A rectangle has 3 equal parts and all 3 are shaded. What is shaded?", "the whole", ["one half", "one third", "one fourth"], "Three thirds make the whole."],
  ["Which has equal parts?", "a rectangle cut into 4 same-size pieces", ["a rectangle cut into 2 big pieces and 2 tiny ones", "a rectangle cut into 3 different sizes", "a rectangle with one small corner cut off"], "Equal parts are the same size."],
  ["How many equal parts are in thirds?", "3", ["2", "4", "5"], "The name says how many."],
  ["Can you make fourths of a rectangle in two different ways?", "yes, with lines in different directions", ["no, only one way", "only with a circle", "only with triangles"], "You can cut into 4 strips or into a 2-by-2 grid.", true],
  ["A rectangle is cut into 4 equal parts as a 2-by-2 grid. A second is cut into 4 strips. Do the parts match in area?", "yes, each part is a fourth of the same whole", ["no, strips are bigger", "no, the grid is bigger", "there is no way to tell"], "Both give 4 equal parts of one whole.", true],
  ["Half of a pizza plus the other half is…", "one whole pizza", ["one half", "one third", "two pizzas"], "Two halves make a whole."],
  ["A square is cut into 2 equal triangles. Each triangle is a…", "half", ["third", "fourth", "whole"], "Two equal parts."],
  ["A bar is cut into 3 equal parts. Each part is…", "one third", ["one half", "one fourth", "one whole"], "Three equal parts are thirds."],
  ["The bigger the number of equal parts, the…", "smaller each part is", ["bigger each part is", "the same size", "the whole is bigger"], "Cutting a whole into more pieces makes smaller pieces.", true],
  ["Is a third of a pizza bigger or smaller than a half of the same pizza?", "smaller", ["bigger", "the same", "can't tell"], "Three pieces are smaller than two.", true],
  ["Which is bigger: one fourth of a cake or one half of the same cake?", "one half", ["one fourth", "they are the same", "can't tell"], "Fewer equal parts means each is bigger.", true],
];

const EQUAL_PARTS = bankUnit({
  id: "fl-g2-equal-parts",
  title: "Equal Parts",
  emoji: "🍰",
  blurb: "Halves, thirds and fourths",
  parentNote:
    "Practises Florida's B.E.S.T. benchmark MA.2.FR.1.2: splitting rectangles into two, three or four equal parts in different ways and seeing that equal parts of the same whole can look different. Cut paper rectangles two different ways at home.",
  standards: ["MA.2.FR.1.2", "partitioning rectangles into equal parts in two different ways"],
  items: PARTS,
});

export const UNITS: Unit[] = [PERIMETER, EQUAL_PARTS];
/** Put the own units before the planned ones. */
export const FIRST = false;
