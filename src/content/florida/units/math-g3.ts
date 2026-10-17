import { pick, randInt, shuffle } from "../../random";
import type { Unit } from "../../types";
import { bankUnit, type Q } from "../own";
import { mathUnit, num, pickOne, someone, typed, eq, type Maker } from "./math-kit";

// Florida's own Grade 3 math units (`fl-` ids): even and odd numbers to 1,000 and multiples (MA.3.AR.3.1, MA.3.AR.3.2),
// line symmetry (MA.3.GR.1.3) and the area of composite figures made of rectangles (MA.3.GR.2.4).

const isEven = (n: number) => n % 2 === 0;

const evenOddNumber: Maker = (d) => {
  const n = randInt(d === 1 ? 10 : 100, d === 1 ? 99 : 999);
  const word = isEven(n) ? "even" : "odd";
  return pickOne(`Is ${n} even or odd?`, word, [isEven(n) ? "odd" : "even"], `Look at the ones digit, ${n % 10}. Even numbers end in 0, 2, 4, 6 or 8.`);
};

const pickEven: Maker = (d) => {
  const max = d === 1 ? 99 : 999;
  const right = randInt(10, max) * 1;
  const base = isEven(right) ? right : right + 1;
  const odds = shuffle([base + 1, base + 3, base - 1, base + 7].filter((n) => n > 0 && !isEven(n))).slice(0, 3);
  return pickOne("Which number is even?", String(base), odds.map(String), "An even number ends in 0, 2, 4, 6 or 8.");
};

const whyOdd: Maker = () => {
  const n = pick([37, 125, 283, 459, 611, 777, 903, 995]);
  return pickOne(`Why is ${n} an odd number?`, "when you make pairs, one is left over", ["it can be split into equal pairs", "it ends in 0", "it is a multiple of 2"], "Odd numbers cannot be split into two equal groups.");
};

const FACTORS = [2, 3, 4, 5, 6, 7, 8, 9];

const isMultiple: Maker = (d) => {
  const k = pick(d === 1 ? [2, 5, 10, 3] : FACTORS);
  const m = randInt(2, Math.floor(144 / k));
  const yes = randInt(0, 1) === 1;
  const n = yes ? k * m : k * m + randInt(1, k - 1);
  return pickOne(`Is ${n} a multiple of ${k}?`, yes ? "yes" : "no", [yes ? "no" : "yes"], yes ? `${k} × ${m} = ${n}, so ${n} is a multiple of ${k}.` : `${k} × ${m} = ${k * m}, and ${n} is not on the ${k}s skip-count list.`);
};

const whichMultiple: Maker = (d) => {
  const k = pick(d === 1 ? [2, 5, 10] : FACTORS);
  const m = randInt(2, Math.floor(144 / k));
  const right = k * m;
  const wrong = shuffle([right + 1, right - 1, right + 2, right - 2, right + k + 1].filter((n) => n % k !== 0 && n > 0)).slice(0, 3);
  return pickOne(`Which number is a multiple of ${k}?`, String(right), wrong.map(String), `Skip count by ${k}s: ${k}, ${2 * k}, ${3 * k}, …`);
};

const nextMultiple: Maker = (d) => {
  const k = pick(d === 1 ? [2, 5, 10] : [3, 4, 6, 7, 8, 9]);
  const m = randInt(1, 10);
  return num(`The multiples of ${k} are ${k}, ${2 * k}, ${3 * k}, … What is the ${m}th multiple?`, k * m, `${m} × ${k} = ${k * m}.`, { step: k, min: 1 });
};

const EVEN_ODD = mathUnit({
  id: "fl-g3-even-odd-multiples",
  title: "Even, Odd & Multiples",
  emoji: "🔢",
  blurb: "Sort numbers and skip count",
  parentNote:
    "Practises Florida's B.E.S.T. benchmarks MA.3.AR.3.1 and MA.3.AR.3.2: deciding whether a number up to 1,000 is even or odd and explaining why, and telling whether a number up to 144 is a multiple of a one-digit number. Skip counting aloud is a good warm-up.",
  codes: "MA.3.AR.3.1; MA.3.AR.3.2",
  text: "even and odd numbers to 1,000 and multiples of one-digit numbers",
  makers: [evenOddNumber, pickEven, whyOdd, isMultiple, whichMultiple, nextMultiple, isMultiple],
});

const SYMMETRY: Q[] = [
  ["A shape has a line of symmetry when you can fold it so the two halves…", "match exactly", ["look different", "are not the same size", "are always circles"], "A fold line splits a symmetric shape into mirror-image halves."],
  ["How many lines of symmetry does a square have?", "4", ["1", "2", "0"], "Fold it down, across and corner to corner."],
  ["How many lines of symmetry does a rectangle (not a square) have?", "2", ["4", "1", "0"], "Fold it down the middle either way."],
  ["How many lines of symmetry does a circle have?", "too many to count", ["1", "2", "4"], "Any line through the center works."],
  ["How many lines of symmetry does an equilateral triangle have?", "3", ["1", "2", "0"], "One from each corner to the middle of the opposite side."],
  ["The letter A has a line of symmetry. Which way does it go?", "up and down", ["side to side", "corner to corner", "it has none"], "The two sides of an A match."],
  ["The letter B can be folded side to side so the top and bottom match. True or false?", "True", ["False", "Only sometimes", "Never"], "B has a line of symmetry across the middle."],
  ["Which letter has NO line of symmetry?", "F", ["H", "O", "T"], "Fold an F any way and the halves don't match."],
  ["Which letter has a line of symmetry?", "H", ["F", "G", "R"], "Fold H down the middle."],
  ["Which letter has exactly two lines of symmetry?", "X", ["A", "T", "M"], "Fold X side to side or up and down."],
  ["Which letter has a vertical line of symmetry?", "M", ["F", "G", "R"], "Fold M down the middle."],
  ["Which letter has a line of symmetry across the middle, side to side?", "E", ["A", "M", "W"], "Fold E along the middle and the top matches the bottom."],
  ["Which of these shapes has NO line of symmetry?", "a leaning parallelogram", ["a square", "a rectangle", "a circle"], "A parallelogram that is not a rectangle has no fold line that matches."],
  ["A butterfly's wings are mirror images. Its body is the…", "line of symmetry", ["perimeter", "area", "vertex"], "The two wings match across the body."],
  ["Which has a line of symmetry?", "a heart", ["a lightning bolt", "a spiral", "a leaning parallelogram"], "Fold a heart down the middle."],
  ["A line of symmetry splits a shape into two parts that are…", "exact matches", ["different sizes", "always triangles", "never equal"], "They are mirror images."],
  ["Which shape has 5 lines of symmetry?", "a regular pentagon", ["a square", "a rectangle", "a triangle with 3 different sides"], "A regular pentagon has 5 equal sides and 5 fold lines."],
  ["If you fold a shape on its line of symmetry, the two halves…", "fit exactly on top of each other", ["leave gaps", "overlap and stick out", "turn into circles"], "That is how you check symmetry."],
  ["How many lines of symmetry does the letter O (as an oval) have?", "2", ["1", "4", "0"], "Fold it up and down, or side to side.", true],
  ["How many lines of symmetry does a plus sign (+) have?", "4", ["2", "1", "0"], "Up and down, side to side and both corners.", true],
  ["How many lines of symmetry does a rhombus (diamond, not a square) have?", "2", ["4", "1", "0"], "Fold it corner to corner either way.", true],
  ["How many lines of symmetry does a triangle with all different side lengths have?", "0", ["1", "2", "3"], "No fold makes the halves match.", true],
  ["How many lines of symmetry does an isosceles triangle have?", "1", ["0", "2", "3"], "It folds down the middle between the two equal sides.", true],
  ["How many lines of symmetry does the letter S have?", "0", ["1", "2", "4"], "Fold it any way and the halves don't match.", true],
  ["Which pair of letters both have a line of symmetry?", "T and U", ["F and G", "J and L", "P and R"], "Fold T and U down the middle.", true],
  ["Is every shape line-symmetric?", "no, some have no line of symmetry", ["yes, all shapes", "only triangles", "only circles"], "A scalene triangle is not symmetric.", true],
  ["Which door shape has 2 lines of symmetry?", "a rectangle", ["a leaning parallelogram", "a lightning bolt", "a spiral"], "A rectangle folds both ways.", true],
];

const SYMMETRY_UNIT = bankUnit({
  id: "fl-g3-line-symmetry",
  title: "Line Symmetry",
  emoji: "🦋",
  blurb: "Fold it so the halves match",
  parentNote:
    "Practises Florida's B.E.S.T. benchmark MA.3.GR.1.3: finding the lines of symmetry in two-dimensional figures and telling which figures are line-symmetric. Fold paper shapes or use a small mirror at home.",
  standards: ["MA.3.GR.1.3", "drawing lines of symmetry and identifying line-symmetric figures"],
  items: SYMMETRY,
});

const lShape: Maker = (d) => {
  const a = randInt(3, d === 1 ? 6 : 10);
  const b = randInt(2, d === 1 ? 5 : 8);
  const c = randInt(2, d === 1 ? 4 : 7);
  const e = randInt(2, d === 1 ? 4 : 6);
  const total = a * b + c * e;
  const who = someone();
  const prompt = `${who}'s garden is two rectangles that don't overlap: ${a} ft by ${b} ft, and ${c} ft by ${e} ft. What is the total area?`;
  const hint = `${a} × ${b} = ${a * b} and ${c} × ${e} = ${c * e}. Add: ${a * b} + ${c * e} = ${total}.`;
  return d === 3 ? typed(prompt, total, hint, { suffix: "sq ft" }) : num(prompt, total, hint, { min: 4, extra: [a * b, a * b * c * e > 1000 ? total + 3 : a * b * c * e, a + b + c + e] });
};

const tShape: Maker = (d) => {
  const a = randInt(3, d === 1 ? 7 : 12);
  const b = randInt(2, d === 1 ? 4 : 8);
  const c = randInt(2, d === 1 ? 4 : 8);
  const e = randInt(2, d === 1 ? 4 : 6);
  const total = a * b + c * e;
  return num(`A floor plan is split into a ${a} m by ${b} m room and a ${c} m by ${e} m room. What is the total floor area?`, total, `Find each area, then add: ${a * b} + ${c * e}.`, { min: 4, extra: [a * b, c * e, total + 2], visual: eq(`${a} × ${b} + ${c} × ${e}`) });
};

const cutOut: Maker = (d) => {
  const a = randInt(6, d === 1 ? 9 : 14);
  const b = randInt(5, d === 1 ? 8 : 12);
  const c = randInt(2, 4);
  const e = randInt(2, 4);
  const total = a * b - c * e;
  return num(`A ${a} in by ${b} in sheet has a ${c} in by ${e} in corner cut away. What area is left?`, total, `Whole sheet: ${a} × ${b} = ${a * b}. Cut-out: ${c} × ${e} = ${c * e}. Subtract.`, { min: 4, extra: [a * b, a * b + c * e, c * e] });
};

const missingPart: Maker = () => {
  const a = randInt(3, 9);
  const b = randInt(2, 8);
  const c = randInt(2, 6);
  const e = randInt(2, 6);
  const total = a * b + c * e;
  return num(`A shape made of two rectangles has an area of ${total} sq in. One is ${a} by ${b}. What is the area of the other?`, c * e, `${a} × ${b} = ${a * b}. Subtract from ${total}.`, { min: 2, extra: [a * b, total + a * b] });
};

const COMPOSITE = mathUnit({
  id: "fl-g3-composite-area",
  title: "Area of Joined Rectangles",
  emoji: "🧱",
  blurb: "Add the areas of rectangles",
  parentNote:
    "Practises Florida's B.E.S.T. benchmark MA.3.GR.2.4: finding the area of a figure made of rectangles that do not overlap by finding each area and adding. Draw an L-shaped room on grid paper and split it into two rectangles.",
  codes: "MA.3.GR.2.4",
  text: "solving problems about the area of figures composed of non-overlapping rectangles",
  makers: [lShape, tShape, cutOut, missingPart, lShape],
});

export const UNITS: Unit[] = [EVEN_ODD, SYMMETRY_UNIT, COMPOSITE];
/** Put the own units before the planned ones. */
export const FIRST = false;
