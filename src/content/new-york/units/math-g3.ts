import { pick, randInt } from "../../random";
import type { Unit } from "../../types";
import { type Maker, frac, fracChoice, num, someone } from "../../washington/units/math-kit";
import type { Q } from "../own";
import { bank, mathUnit } from "./math-kit";

// New York's own Grade 3 math unit (`ny-` ids): splitting shapes into parts with equal areas and naming each part's area
// as a unit fraction of the whole (NY-3.G.2).

const PARTS = [2, 3, 4, 6, 8] as const;

/** A shaded part of a shape split into equal areas, as a unit fraction. */
const shadedPart: Maker = () => {
  const n = pick(PARTS);
  const shape = pick(["bar", "circle"] as const);
  return fracChoice(
    "The shape is split into parts with equal areas. What fraction of the whole area is shaded?",
    [1, n],
    [[1, n + 1], [1, n - 1], [n - 1, n], [2, n]],
    `Count the equal parts: there are ${n}. One part is 1/${n} of the whole.`,
    frac,
    { type: "fraction", numerator: 1, denominator: n, shape },
  );
};

/** The area of each equal part. */
const areaEach: Maker = (d) => {
  const n = pick(d === 1 ? ([2, 3, 4] as const) : PARTS);
  const each = randInt(2, d === 1 ? 5 : 9);
  const whole = n * each;
  if (pick([true, false])) {
    return num(
      `A rectangle has an area of ${whole} square units. It is split into ${n} parts with equal areas. What is the area of each part?`,
      each,
      `Share ${whole} square units into ${n} equal parts: ${whole} ÷ ${n}.`,
      { min: 1, extra: [whole - n, n, each * 2], label: (x) => `${x} square units` },
    );
  }
  return fracChoice(
    `A rectangle of ${whole} square units is split into ${n} parts of ${each} square units each. What fraction of the area is one part?`,
    [1, n],
    [[1, each], [each, whole + 1], [1, whole], [n, whole + 1]],
    `There are ${n} equal parts, so each part is 1/${n} of the whole.`,
  );
};

/** Rows of squares split into equal parts. */
const arrayParts: Maker = () => {
  const n = pick([2, 3, 4] as const);
  const rows = n * randInt(1, 2);
  const cols = randInt(2, 5);
  const total = rows * cols;
  return num(
    `These ${total} squares are split into ${n} parts with equal areas. How many squares are in each part?`,
    total / n,
    `${total} ÷ ${n} = ${total / n}. Each part has the same number of squares, so each is 1/${n} of the area.`,
    { min: 1, extra: [n, total - n], visual: { type: "array", rows, cols, emoji: "🟦" } },
  );
};

const PLACES = [
  ["garden", "beds", "tomatoes"],
  ["poster", "boxes", "a drawing"],
  ["quilt", "squares", "a star"],
  ["field", "sections", "soccer"],
  ["tray of corn bread", "pieces", "a friend"],
] as const;

/** A story about splitting an area into equal parts. */
const story: Maker = () => {
  const [place, parts, use] = pick(PLACES);
  const n = pick(PARTS);
  return fracChoice(
    `${someone()} splits a ${place} into ${n} ${parts} with equal areas. One is for ${use}. What fraction of the ${place} is that?`,
    [1, n],
    [[1, n + 1], [n, 1], [1, n - 1], [n - 1, n]],
    `There are ${n} equal parts. One of them is 1/${n} of the whole area.`,
  );
};

const IDEAS: Q[] = [
  ["A square is cut into 4 parts with equal areas. What is each part called?", "one fourth", ["one third", "one half", "four wholes"], "4 equal parts: each is one fourth."],
  ["A shape is cut into 3 parts: 1 big and 2 small. Is each part 1/3 of the area?", "No, the parts do not have equal areas", ["Yes, there are 3 parts", "Yes, if the big part is shaded", "No, a third needs 4 parts"], "Thirds must be 3 parts with equal areas."],
  ["Two parts of a square have the same area but different shapes. Is each 1/2?", "Yes, equal areas make halves", ["No, halves must look the same", "No, halves must be triangles", "Yes, but only if they are squares"], "What matters for a fraction of area is that the parts have equal areas."],
  ["Which way splits a rectangle into 2 parts with equal areas?", "one line through the middle", ["one line close to one end", "two lines close to one end", "a circle in the corner"], "A line through the middle makes two equal halves."],
  ["A rectangle is split into 6 equal parts. How many parts make the whole?", "6", ["1", "3", "12"], "6 sixths make one whole."],
  ["Which is a bigger part of the same square: 1/2 or 1/4?", "1/2", ["1/4", "they are the same"], "Fewer equal parts means each part has more area."],
  ["A rectangle is split into 8 equal parts. Each part is what fraction of the area?", "1/8", ["1/6", "8/1", "1/4"], "8 equal parts: each is one eighth."],
  ["A pizza is cut into 6 slices of different sizes. Is each slice 1/6 of the pizza?", "No, the slices are not equal", ["Yes, there are 6 slices", "Yes, every slice is a sixth", "No, it needs 8 slices"], "Each slice is 1/6 only if all 6 slices have equal areas.", true],
];

export const UNITS: Unit[] = [
  mathUnit({
    id: "ny-g3-equal-areas",
    title: "Equal Areas",
    emoji: "🟩",
    blurb: "Split shapes into equal parts",
    parentNote: "Splitting rectangles, circles and grids into parts with equal areas, and naming each part's area as a unit fraction of the whole, such as 1/4.",
    codes: "NY-3.G.2",
    text: "splitting shapes into parts with equal areas and naming the area of each part as a unit fraction of the whole",
    makers: [shadedPart, areaEach, areaEach, arrayParts, story, bank(IDEAS)],
  }),
];
