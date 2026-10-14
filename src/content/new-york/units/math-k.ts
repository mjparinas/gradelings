import { pick, randInt, sample } from "../../random";
import type { Unit } from "../../types";
import { type Maker, num, pickOne, someone } from "../../washington/units/math-kit";
import type { Q } from "../own";
import { COIN, COIN_LOOK, bank, cents, mathUnit, usd } from "./math-kit";

// New York's own Kindergarten math units: exploring coins (NY-K.MD.4), and building and drawing shapes (NY-K.G.5, K.G.6). Children meet the penny, nickel, dime and quarter,
// and begin to tell pennies and dimes apart. Counting pennies also practises adding and taking away within 10
// (NY-K.OA.1 names pennies as one way to show addition).

const ALL = [1, 5, 10, 25];

/** What is this coin called? The hard level uses coins that look alike. */
const nameCoin: Maker = (d) => {
  const c = d === 1 ? pick([1, 10]) : pick(ALL);
  const others = d === 3 && c !== 1 ? ALL.filter((x) => x !== c && x !== 1) : sample(ALL.filter((x) => x !== c), 2);
  return usd(pickOne("What is this coin called?", COIN[c], others.map((o) => COIN[o]), COIN_LOOK[c], { type: "coins", coins: [c], currency: "USD" }));
};

/** Pennies or dimes: which coin is worth 1¢, which is worth 10¢. */
const pennyOrDime: Maker = (d) => {
  const c = pick([1, 10]);
  const others = d === 1 ? [c === 1 ? 10 : 1] : sample(ALL.filter((x) => x !== c), 2);
  const opt = (x: number) => ({ label: COIN[x], coin: x });
  return usd(pickOne(`Which coin is worth ${cents(c)}?`, opt(c), others.map(opt), c === 1 ? "A penny is worth 1 cent." : "A dime is worth 10 cents, even though it is small."));
};

/** Size and look: the smallest coin, the biggest coin, the coin that is not silver. */
const lookOfCoins: Maker = () => {
  const kind = pick(["smallest", "biggest", "not silver"] as const);
  const opt = (x: number) => ({ label: COIN[x], coin: x });
  if (kind === "smallest") return usd(pickOne("Which coin is the smallest?", opt(10), sample([1, 5, 25], 2).map(opt), "The dime is the smallest coin."));
  if (kind === "biggest") return usd(pickOne("Which coin is the biggest?", opt(25), sample([1, 5, 10], 2).map(opt), "The quarter is the biggest of these coins."));
  return usd(pickOne("Which coin is not silver?", opt(1), sample([5, 10, 25], 2).map(opt), "The penny is a brown, copper coin. The others are silver."));
};

/** Count a row of pennies. */
const countPennies: Maker = (d) => {
  const n = d === 1 ? randInt(2, 5) : randInt(4, 10);
  return usd(num("Count the pennies. How many cents?", n, "Each penny is 1 cent. Touch each penny as you count.", { min: 1, label: cents, visual: { type: "coins", coins: Array(n).fill(1), currency: "USD" } }));
};

/** Adding or taking away pennies within 10. */
const pennyStory: Maker = (d) => {
  const who = someone();
  if (d > 1 && pick([true, false])) {
    const have = randInt(4, 10);
    const spend = randInt(1, have - 1);
    return usd(num(`${who} has ${have} pennies and gives away ${spend}. How many are left?`, have - spend, `Start with ${have}. Count back ${spend}.`, { min: 0, max: 10, extra: [have + spend, have] }));
  }
  const a = randInt(1, d === 1 ? 4 : 6);
  const b = randInt(1, (d === 1 ? 5 : 10) - a);
  return usd(num(`${who} has ${a} pennies and finds ${b} more. How many now?`, a + b, `Start with ${a}. Count on ${b} more.`, { min: 1, max: 10, extra: [Math.abs(a - b)] }));
};

/** Pennies and a dime: 10 pennies are worth the same as one dime. */
const pennyDime: Maker = (d) => {
  if (d === 1) return usd(num("How many pennies make one dime?", 10, "A dime is worth 10 cents. A penny is 1 cent. So 10 pennies make a dime.", { extra: [1, 5, 2] }));
  const n = pick([2, 3, 4, 5, 6, 7, 8, 9, 10]);
  const hint = "A dime is worth 10 cents. Each penny is 1 cent, so count the pennies and compare with 10.";
  if (n === 10) return usd(pickOne("Which is worth more: 1 dime or 10 pennies?", "they are the same", ["1 dime", "10 pennies"], hint));
  return usd(pickOne(`Which is worth more: 1 dime or ${n} pennies?`, "1 dime", [`${n} pennies`, "they are the same"], hint));
};

// ---------- Building and drawing shapes (NY-K.G.5, K.G.6) ----------

/** Drawing and building things around us with shapes (K.G.5). */
const MODEL: Q[] = [
  ["You draw a door. Which shape do you use?", "a rectangle", ["a circle", "a triangle"], "A door is tall, with 4 straight sides and square corners."],
  ["You draw the sun. Which shape do you start with?", "a circle", ["a square", "a triangle"], "The sun is round."],
  ["You draw a roof on a house. Which shape fits best?", "a triangle", ["a circle", "an oval"], "A roof comes to a point at the top, like a triangle."],
  ["You draw a window with 4 sides all the same. Which shape is it?", "a square", ["a circle", "a triangle"], "A square has 4 sides that are all the same length."],
  ["You draw a wheel. Which shape do you use?", "a circle", ["a square", "a triangle"], "A wheel is round so it can roll."],
  ["You draw a slice of pizza. Which shape is it most like?", "a triangle", ["a circle", "a square"], "A slice comes to a point, with 3 sides."],
  ["You draw a book. Which shape fits best?", "a rectangle", ["a circle", "a triangle"], "A book has 4 straight sides and square corners."],
  ["You draw a snowman. Which shapes do you use?", "circles", ["squares", "triangles"], "A snowman is made of round snowballs."],
  ["You make a ball from clay. Which shape is it?", "a sphere", ["a cube", "a cone"], "A ball is round all over, like a sphere."],
  ["You make a can from clay. Which shape is it?", "a cylinder", ["a cube", "a sphere"], "A can has two flat circles and a curved side."],
  ["You make a party hat from paper. Which shape is it?", "a cone", ["a cube", "a cylinder"], "A party hat has a point on top and a round bottom."],
  ["You make a box from clay. Which shape is it?", "a cube", ["a sphere", "a cone"], "A box with square faces is a cube."],
  ["How many sticks do you need to make a triangle?", "3", ["2", "4", "5"], "A triangle has 3 sides. Use one stick for each side."],
  ["How many sticks do you need to make a square?", "4", ["3", "5", "6"], "A square has 4 sides. Use one stick for each side."],
  ["How many sticks do you need to make a hexagon?", "6", ["4", "5", "8"], "A hexagon has 6 sides.", true],
  ["To draw a square, what do you need?", "4 straight sides", ["1 curved line", "3 straight sides"], "A square has 4 straight sides, all the same length."],
  ["To draw a circle, what do you need?", "1 curved line", ["4 straight sides", "3 straight sides"], "A circle is one round, curved line."],
];

/** Putting simple shapes together to make bigger ones (K.G.6). */
const COMPOSE: Q[] = [
  ["Put 2 squares side by side. Which shape do you make?", "a rectangle", ["a circle", "a triangle"], "Two squares next to each other make a long shape with 4 square corners."],
  ["Put 3 squares in a row. Which shape do you make?", "a long rectangle", ["a circle", "a triangle"], "Squares in a row make a long rectangle."],
  ["Put 2 half circles together. What do you make?", "a circle", ["a square", "a triangle"], "Two halves of a circle make a whole circle."],
  ["Put 2 matching triangles together. Which shape can you make?", "a square", ["a circle", "an oval"], "Two matching triangles can fit together to make a square."],
  ["Which 2 shapes can make a house: a box with a roof?", "a square and a triangle", ["two circles", "a circle and an oval"], "The walls are a square and the roof is a triangle."],
  ["Which shapes can make a bigger rectangle?", "two squares", ["two circles", "a circle and a triangle"], "Squares have straight sides, so they fit together with no gaps."],
  ["Cut a square from corner to corner. What 2 shapes do you get?", "two triangles", ["two circles", "two squares"], "The cut makes two pieces with 3 sides each."],
  ["How many small squares make a big square, 2 wide and 2 tall?", "4", ["2", "3", "6"], "2 squares on the bottom and 2 on top make 4."],
  ["How many small squares make a big square, 3 wide and 3 tall?", "9", ["3", "6", "8"], "3 rows of 3 squares: 3, 6, 9.", true],
  ["6 triangle blocks fit together around a point. What do they make?", "a hexagon", ["a circle", "a square"], "Six triangles fit around a point to make a shape with 6 sides.", true],
  ["2 trapezoid blocks fit together. What can they make?", "a hexagon", ["a circle", "a square"], "Two trapezoid blocks make a shape with 6 sides.", true],
  ["3 triangle blocks fit together in a row. Which block do they match?", "a trapezoid", ["a circle", "a square"], "Three triangles in a row make a trapezoid block.", true],
  ["Which shape can you NOT make with triangles?", "a circle", ["a square", "a rectangle"], "Triangles have straight sides. A circle has no straight sides.", true],
  ["Put 2 rectangles end to end. Which shape do you make?", "a longer rectangle", ["a circle", "a triangle"], "End to end, they make a longer shape with 4 square corners."],
];

/** How many sides, or how many small shapes, make a shape. */
const countParts: Maker = (d) => {
  if (d > 1 && pick([true, false])) {
    const n = pick([2, 3]);
    return num(`How many small squares make a big square ${n} wide and ${n} tall?`, n * n, `Count ${n} rows of ${n} squares.`, { min: 1, extra: [n, 2 * n, n * n + 1] });
  }
  const [shape, sides] = pick([["triangle", 3], ["square", 4], ["rectangle", 4], ["hexagon", 6]] as const);
  return num(`You build a ${shape} from sticks. How many sticks?`, sides, `Count the sides of a ${shape}. Each side needs one stick.`, { min: 2, max: 8, visual: { type: "shape", shape } });
};

export const UNITS: Unit[] = [
  mathUnit({
    id: "ny-k-coins",
    title: "Pennies & Dimes",
    emoji: "🪙",
    blurb: "Meet the coins",
    parentNote: "Meeting US coins: the penny, nickel, dime and quarter, with a focus on telling pennies from dimes, and counting pennies to add and take away within 10. Values come next year.",
    codes: "NY-K.MD.4; NY-K.OA.1",
    text: "exploring coins and beginning to tell pennies and dimes apart, and showing adding and taking away with pennies",
    makers: [nameCoin, pennyOrDime, lookOfCoins, countPennies, pennyStory, pennyDime],
  }),
  mathUnit({
    id: "ny-k-build-shapes",
    title: "Build & Draw Shapes",
    emoji: "🧱",
    blurb: "Make things with shapes",
    parentNote: "Using shapes to draw and build the things around us (a door is a rectangle, a ball is a sphere), and putting small shapes together to make bigger ones, like two squares making a rectangle.",
    codes: "NY-K.G.5; NY-K.G.6",
    text: "modeling objects by building and drawing shapes, and putting simple shapes together to make larger shapes",
    makers: [bank(MODEL), bank(COMPOSE), bank(MODEL), bank(COMPOSE), countParts],
  }),
];
