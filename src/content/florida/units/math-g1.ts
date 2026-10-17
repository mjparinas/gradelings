import { pick, randInt, sample, shuffle } from "../../random";
import type { ChoiceQuestion, Unit } from "../../types";
import { bankUnit, type Q } from "../own";
import { mathUnit, num, pickOne, type Maker } from "./math-kit";

// Florida's own Grade 1 math units (`fl-` ids): counting coins together with dollar bills (MA.1.M.2.2, MA.1.M.2.3) and
// sketching and finding shapes (MA.1.GR.1.2, MA.1.GR.1.4).

const usd = <T extends ChoiceQuestion>(q: T): T => ({ ...q, currency: "USD" });
const cents = (n: number) => `${n}¢`;
const dollars = (n: number) => `$${n}`;

const COIN_NAME: Record<number, string> = { 1: "penny", 5: "nickel", 10: "dime" };

/** Pennies, nickels and dimes that total at most 100¢. */
function coinMix(d: 1 | 2 | 3): number[] {
  const dimes = randInt(1, d === 1 ? 3 : 6);
  const nickels = randInt(0, d === 1 ? 1 : 3);
  const pennies = randInt(0, d === 1 ? 4 : 4);
  return shuffle([...Array(dimes).fill(10), ...Array(nickels).fill(5), ...Array(pennies).fill(1)]);
}

const countCoins: Maker = (d) => {
  const coins = coinMix(d);
  const total = coins.reduce((a, b) => a + b, 0);
  return usd(num("How much money is this?", total, "Count the dimes by tens, then the nickels by fives, then the pennies by ones.", { step: 5, min: 1, max: 100, extra: [total + 1, total - 1], label: cents, visual: { type: "coins", coins, currency: "USD" } }));
};

const countBills: Maker = (d) => {
  const ones = randInt(0, d === 1 ? 3 : 5);
  const fives = randInt(0, d === 1 ? 2 : 4);
  const tens = randInt(1, d === 1 ? 2 : 6);
  const bills = shuffle([...Array(ones).fill(100), ...Array(fives).fill(500), ...Array(tens).fill(1000)]);
  const total = ones + fives * 5 + tens * 10;
  return usd(num("How many dollars is this?", total, "Count the tens first, then the fives, then the ones.", { step: 5, min: 1, max: 100, extra: [total + 1, total - 1], label: dollars, visual: { type: "coins", coins: bills, currency: "USD" } }));
};

const FOR_A_DOLLAR: [string, number][] = [["pennies", 100], ["nickels", 20], ["dimes", 10], ["quarters", 4]];

const toDollar: Maker = () => {
  const [name, n] = pick(FOR_A_DOLLAR);
  return usd(num(`How many ${name} make one dollar?`, n, `One dollar is 100¢. Each ${name.replace(/ies$/, "y").replace(/s$/, "")} is worth ${100 / n}¢.`, { step: n >= 20 ? 10 : 1, min: 2, max: 120, label: String }));
};

const worthMore: Maker = (d) => {
  const [a, b] = sample([5, 10, 25].slice(0, d === 1 ? 2 : 3), 2);
  const na = randInt(2, 4);
  const nb = randInt(2, 4);
  const ta = a * na;
  const tb = b * nb;
  const names = (c: number, n: number) => `${n} ${c === 5 ? "nickels" : c === 10 ? "dimes" : "quarters"}`;
  const A = names(a, na);
  const B = names(b, nb);
  if (ta === tb) return worthMore(d);
  return usd(pickOne(`Which is worth more: ${A} or ${B}?`, ta > tb ? A : B, [ta > tb ? B : A, "they are the same"], `${A} is ${cents(ta)}. ${B} is ${cents(tb)}.`));
};

const signs: Maker = () => {
  const n = randInt(2, 95);
  const m = randInt(2, 40);
  return randInt(0, 1)
    ? pickOne(`Which shows ${n} cents?`, cents(n), [dollars(n), `${n} dollars`, cents(n + 1)].slice(0, 3), "The ¢ sign means cents. The $ sign means dollars.")
    : pickOne(`Which shows ${m} dollars?`, dollars(m), [cents(m), `${m} cents`, dollars(m + 1)], "The $ sign goes in front of dollars.");
};

const nameThat: Maker = () => {
  const c = pick([1, 5, 10]);
  return pickOne(`How much is a ${COIN_NAME[c]} worth?`, cents(c), [1, 5, 10, 25].filter((x) => x !== c).slice(0, 3).map(cents), `A ${COIN_NAME[c]} is worth ${c}¢.`);
};

const COINS_BILLS = mathUnit({
  id: "fl-g1-coins-and-bills",
  title: "Coins & Dollar Bills",
  emoji: "💵",
  blurb: "Count coins and dollars",
  parentNote:
    "Practises Florida's B.E.S.T. benchmarks MA.1.M.2.2 and MA.1.M.2.3: knowing the value of pennies, nickels, dimes and quarters, how many of each make a dollar, and counting mixed coins up to one dollar and one-, five- and ten-dollar bills up to $100. Counting real coins at the kitchen table is the best practice.",
  codes: "MA.1.M.2.2; MA.1.M.2.3",
  text: "the value of coins, how many of each make a dollar, and the value of mixed coins and dollar bills",
  makers: [countCoins, countBills, toDollar, worthMore, signs, nameThat],
});

const SKETCH: Q[] = [
  ["I have 3 sides and 3 corners. What shape am I?", "triangle", ["square", "circle", "rectangle"], "Count the sides: 1, 2, 3."],
  ["I have 4 equal sides and 4 square corners. What shape am I?", "square", ["triangle", "circle", "hexagon"], "Equal sides and square corners make a square."],
  ["I have 4 sides: 2 long and 2 short. All my corners are square. What am I?", "rectangle", ["triangle", "circle", "square"], "A rectangle has 2 long sides and 2 short sides."],
  ["I have 6 sides. What shape am I?", "hexagon", ["triangle", "square", "circle"], "Hex means six."],
  ["I have no corners and no straight sides. What shape am I?", "circle", ["triangle", "square", "rectangle"], "A circle is round."],
  ["I am half of a circle. What shape am I?", "semi-circle", ["triangle", "square", "hexagon"], "Cut a circle in half."],
  ["To sketch a triangle, how many straight lines do you draw?", "3", ["2", "4", "5"], "A triangle has 3 sides."],
  ["To sketch a square, how many equal sides do you draw?", "4", ["3", "5", "6"], "A square has 4 equal sides."],
  ["To sketch a hexagon, how many sides do you draw?", "6", ["4", "5", "3"], "Hexagons have 6 sides."],
  ["A slice of pizza looks like which shape?", "triangle", ["circle", "square", "hexagon"], "It has three straight sides."],
  ["A clock face looks like which shape?", "circle", ["square", "triangle", "rectangle"], "It is round."],
  ["A door looks like which shape?", "rectangle", ["circle", "triangle", "hexagon"], "It has 2 long and 2 short sides."],
  ["A slice of toast usually looks like which shape?", "square", ["circle", "triangle", "hexagon"], "It has 4 equal sides."],
  ["A ball looks like which solid shape?", "sphere", ["cube", "cone", "cylinder"], "A sphere is round all the way around."],
  ["A game die looks like which solid shape?", "cube", ["sphere", "cone", "cylinder"], "A cube has 6 square faces."],
  ["A party hat looks like which solid shape?", "cone", ["cube", "sphere", "cylinder"], "A cone has a point at the top."],
  ["A can of soup looks like which solid shape?", "cylinder", ["cube", "sphere", "cone"], "A cylinder has two round ends."],
  ["A cereal box looks like which solid shape?", "rectangular prism", ["sphere", "cone", "cylinder"], "It has rectangle faces."],
  ["The face of a die is a…", "square", ["circle", "triangle", "hexagon"], "Each face of a cube is a square."],
  ["The flat top of a can is a…", "circle", ["square", "triangle", "rectangle"], "Look at the top of a can."],
  ["A honeycomb cell is a…", "hexagon", ["triangle", "square", "circle"], "It has six sides."],
  ["Which shape has the most sides?", "hexagon", ["triangle", "square", "rectangle"], "Count the sides of each."],
  ["Two triangles joined along a side can make a…", "square", ["circle", "sphere", "cone"], "Fit the long sides together.", true],
  ["A shape has 3 corners. How many sides does it have?", "3", ["2", "4", "6"], "A closed shape has as many sides as corners.", true],
  ["Which shape can you NOT sketch with only straight lines?", "circle", ["triangle", "square", "hexagon"], "A circle is curved.", true],
  ["A sandwich cut corner to corner makes two…", "triangles", ["circles", "hexagons", "spheres"], "Cutting a square corner to corner gives 3-sided pieces.", true],
  ["A shape has 4 sides, all the same length. It could be a…", "square", ["triangle", "hexagon", "semi-circle"], "Equal sides, 4 of them.", true],
  ["Which solid shape can roll AND slide?", "cylinder", ["cube", "rectangular prism", "pyramid"], "Its curved side rolls and its flat end slides.", true],
];

const SKETCH_UNIT = bankUnit({
  id: "fl-g1-sketch-and-find",
  title: "Sketch & Find Shapes",
  emoji: "✏️",
  blurb: "Draw shapes and spot them around you",
  parentNote:
    "Practises Florida's B.E.S.T. benchmarks MA.1.GR.1.2 and MA.1.GR.1.4: drawing triangles, rectangles, squares and hexagons from their defining attributes, and spotting flat and solid shapes in real objects. Go on a shape hunt around the house.",
  standards: ["MA.1.GR.1.2; MA.1.GR.1.4", "sketching shapes from their attributes and finding shapes in real objects"],
  items: SKETCH,
});

export const UNITS: Unit[] = [COINS_BILLS, SKETCH_UNIT];
/** Put the own units before the planned ones. */
export const FIRST = false;
