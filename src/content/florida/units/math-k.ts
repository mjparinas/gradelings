import { pick, randInt, shuffle } from "../../random";
import type { Unit } from "../../types";
import { bankUnit, type Q } from "../own";
import { mathUnit, num, pickOne, someone, type Maker } from "./math-kit";

// Florida's own Kindergarten math units (`fl-` ids), for the B.E.S.T. benchmarks no shared unit practises: ordinal
// positions (MA.K.NSO.1.3), the number line to 20 (MA.K.NSO.2.3), measuring length with objects laid end to end
// (MA.K.M.1.3) and combining shapes into a bigger shape (MA.K.GR.1.5).

const ANIMALS = ["🐶", "🐱", "🐸", "🐟", "🐥", "🐰", "🐻", "🐼"];
const PLACES = ["first", "second", "third", "fourth", "fifth"];

const line = (n: number) => shuffle(ANIMALS).slice(0, n);

const whichIs: Maker = (d) => {
  const items = line(d === 1 ? 3 : d === 2 ? 4 : 5);
  const at = randInt(0, items.length - 1);
  return pickOne(`Which one is ${PLACES[at]} in the line?`, items[at], items.filter((_, i) => i !== at).slice(0, 3), "Count from the left: first, second, third…", { type: "emojiRow", items });
};

const whatPlace: Maker = (d) => {
  const items = line(d === 1 ? 3 : d === 2 ? 4 : 5);
  const at = randInt(0, items.length - 1);
  return pickOne(`What place is the ${items[at]} in?`, PLACES[at], shuffle(PLACES.filter((_, i) => i !== at)).slice(0, 3), "Count from the left until you reach it.", { type: "emojiRow", items });
};

const inFront: Maker = (d) => {
  const at = randInt(2, d === 1 ? 3 : 5);
  const who = someone();
  return num(`${who} is ${PLACES[at - 1]} in line. How many kids are in front?`, at - 1, `${PLACES[at - 1]} means place ${at}. The kids before ${who} are in front.`, { min: 0, max: 5 });
};

const nextPlace: Maker = (d) => {
  const at = randInt(1, d === 1 ? 2 : 4);
  return randInt(0, 1)
    ? pickOne(`Which place comes right before ${PLACES[at]}?`, PLACES[at - 1], shuffle(PLACES.filter((_, i) => i !== at - 1 && i !== at)).slice(0, 3), "Say the places in order: first, second, third…")
    : pickOne(`Which place comes right after ${PLACES[at - 1]}?`, PLACES[at], shuffle(PLACES.filter((_, i) => i !== at - 1 && i !== at)).slice(0, 3), "Say the places in order: first, second, third…");
};

const ORDINALS = mathUnit({
  id: "fl-k-first-to-fifth",
  title: "First, Second, Third",
  emoji: "🥇",
  blurb: "Tell the place in a line",
  parentNote:
    "Practises Florida's B.E.S.T. benchmark MA.K.NSO.1.3: using the words first, second, third, fourth and fifth to say where something is in a line. Say them while standing in line at the store or lining up toys.",
  codes: "MA.K.NSO.1.3",
  text: "naming positions in a sequence with first, second, third, fourth and fifth",
  makers: [whichIs, whatPlace, inFront, nextPlace, whichIs, whatPlace],
});

const LINE_MIN = 0;
const line20 = (extra: { blankAt?: number; marks?: number[] } = {}) => ({ type: "numberLine" as const, min: LINE_MIN, max: 20, step: 1, labelEvery: 5, ...extra });

const blank: Maker = (d) => {
  const n = randInt(1, d === 1 ? 10 : 19);
  return num("What number goes where the ? is?", n, "Count on the number line from 0 to find it.", { min: 0, max: 20, visual: line20({ blankAt: n }) });
};

const greater: Maker = (d) => {
  const a = randInt(2, d === 1 ? 9 : 18);
  const right = randInt(a + 1, Math.min(20, a + (d === 1 ? 4 : 8)));
  const less = shuffle(Array.from({ length: a }, (_, i) => i).filter((x) => x < a)).slice(0, 3).map(String);
  return pickOne(`Which number is greater than ${a}?`, String(right), less, "Greater numbers are farther right on the number line.", line20({ marks: [a] }));
};

const lesser: Maker = (d) => {
  const a = randInt(d === 1 ? 5 : 3, d === 1 ? 10 : 18);
  const right = randInt(Math.max(0, a - (d === 1 ? 4 : 8)), a - 1);
  const more = shuffle(Array.from({ length: 20 - a }, (_, i) => a + 1 + i)).slice(0, 3).map(String);
  return pickOne(`Which number is less than ${a}?`, String(right), more, "Less numbers are farther left on the number line.", line20({ marks: [a] }));
};

const compareTwo: Maker = (d) => {
  const a = randInt(0, d === 1 ? 10 : 20);
  const b = randInt(0, d === 1 ? 10 : 20);
  const word = a < b ? "less than" : a === b ? "equal to" : "greater than";
  return pickOne(`Is ${a} less than, equal to or greater than ${b}?`, word, ["less than", "equal to", "greater than"].filter((w) => w !== word), "Find both numbers on the line. The one farther right is greater.", line20({ marks: [a, b] }));
};

const between: Maker = (d) => {
  const a = randInt(0, d === 1 ? 8 : 18);
  return num(`Which number is between ${a} and ${a + 2}?`, a + 1, "Look at the number line. It is the number right in the middle.", { min: 0, max: 20, visual: line20({ marks: [a, a + 2] }) });
};

const NUMBER_LINE = mathUnit({
  id: "fl-k-number-line-20",
  title: "Number Line to 20",
  emoji: "📏",
  blurb: "Find and compare numbers on a line",
  parentNote:
    "Practises Florida's B.E.S.T. benchmark MA.K.NSO.2.3: finding, ordering and comparing numbers from 0 to 20 on a number line, with the words less than, equal to and greater than. Draw a number line with chalk and hop along it together.",
  codes: "MA.K.NSO.2.3",
  text: "locating, ordering and comparing numbers from 0 to 20 on the number line",
  makers: [blank, greater, lesser, compareTwo, between, blank],
});

const THINGS = [
  { name: "book", unit: "cubes", emoji: "🧊" },
  { name: "shoe", unit: "paper clips", emoji: "📎" },
  { name: "crayon box", unit: "blocks", emoji: "🧱" },
  { name: "table", unit: "hands", emoji: "✋" },
  { name: "toy car", unit: "buttons", emoji: "🔘" },
  { name: "pencil", unit: "cubes", emoji: "🧊" },
];

const howMany: Maker = (d) => {
  const t = pick(THINGS);
  const n = randInt(2, d === 1 ? 8 : d === 2 ? 14 : 20);
  return num(`How many ${t.unit} long is the ${t.name}?`, n, `Count each ${t.unit.replace(/s$/, "")} in the row once.`, { min: 1, max: 20, visual: { type: "emojiRow", items: Array(n).fill(t.emoji) } });
};

const longer: Maker = (d) => {
  const t = pick(THINGS);
  const a = randInt(3, d === 1 ? 9 : 18);
  const b = randInt(2, a - 1);
  return pickOne(`A rug is ${a} ${t.unit} long. A mat is ${b} ${t.unit} long. Which is longer?`, "the rug", ["the mat", "they are the same"], `${a} is more than ${b}, so the rug is longer.`);
};

const howMuch: Maker = (d) => {
  const a = randInt(4, d === 1 ? 10 : 20);
  const b = randInt(1, a - 1);
  return num(`A rope is ${a} blocks. A string is ${b} blocks. How many more is the rope?`, a - b, `Take away ${b} from ${a}.`, { min: 0, max: 20 });
};

const GOOD_WAY = [
  ["lined up end to end, with no gaps", ["with gaps between them", "piled on top of each other", "spread out in a circle"]],
  ["starting at one end of the object", ["starting in the middle", "starting past the end", "starting anywhere"]],
  ["the same size as each other", ["all different sizes", "some big, some small", "any sizes at all"]],
] as const;

const goodWay: Maker = () => {
  const [right, wrong] = pick(GOOD_WAY);
  return pickOne("To measure length with objects, line them up…", right, [...wrong], "Objects in a row with no gaps or overlaps give a true count.");
};

const MEASURE = mathUnit({
  id: "fl-k-measure-with-objects",
  title: "Measure with Objects",
  emoji: "🧊",
  blurb: "How many cubes long?",
  parentNote:
    "Practises Florida's B.E.S.T. benchmark MA.K.M.1.3: finding the length of an object, up to 20 units, by laying small objects such as cubes or paper clips end to end with no gaps or overlaps. Try measuring a book or your child's foot with paper clips.",
  codes: "MA.K.M.1.3",
  text: "measuring length with non-standard objects laid end to end with no gaps or overlaps",
  makers: [howMany, longer, howMuch, goodWay, howMany],
});

const COMBINE: Q[] = [
  ["Two squares side by side make a…", "rectangle", ["circle", "triangle", "cone"], "Put the two squares together along one side."],
  ["Two triangles can make a…", "square or rectangle", ["circle", "sphere", "cube"], "Two triangles can fit together along their long sides."],
  ["Which shapes can you use to build a house shape?", "a square and a triangle", ["a circle and a sphere", "two cones", "a cube"], "A square for the walls and a triangle for the roof."],
  ["How many squares do you need to make a bigger rectangle?", "2", ["1", "0", "10"], "Two squares side by side make a rectangle."],
  ["Two rectangles can make a…", "bigger rectangle", ["circle", "cone", "sphere"], "Put them together along their long sides."],
  ["A triangle on top of a rectangle looks like a…", "house", ["ball", "can", "box"], "The triangle is the roof."],
  ["Three squares in a row make a…", "long rectangle", ["triangle", "circle", "cone"], "A row of squares is a long rectangle."],
  ["Four squares in a big block make a…", "bigger square", ["triangle", "circle", "cone"], "Two rows of two squares make a bigger square."],
  ["Two small triangles can make a bigger…", "triangle", ["circle", "sphere", "cone"], "Put four small triangles together for a big one.", true],
  ["Which shapes make a rocket ship picture?", "triangle, rectangle and triangle", ["sphere, cube and cone", "circle only", "cone only"], "A triangle nose, a rectangle body and triangle fins."],
  ["A circle on top of a rectangle makes a…", "lollipop", ["house", "pizza box", "stop sign"], "The circle is the candy and the rectangle is the stick."],
  ["You put 2 triangles together. Which shape can you make?", "a square", ["a sphere", "a cone", "a cylinder"], "Two matching triangles make a square or rectangle."],
  ["Which shape can you NOT make from squares and triangles?", "a circle", ["a rectangle", "a house", "a bigger square"], "A circle has no straight sides.", true],
  ["A rectangle and a square side by side make a…", "longer rectangle", ["circle", "sphere", "cone"], "Joined along a side they make one long shape."],
  ["To make a picture of a tree, you could use a…", "triangle and a rectangle", ["sphere and a cube", "two cones", "a cylinder only"], "A triangle for the leaves and a rectangle for the trunk."],
  ["Two triangles pointing opposite ways can make a…", "diamond or square", ["circle", "sphere", "cone"], "Match their long sides.", true],
  ["How many triangles do you need to cover a rectangle?", "2", ["1", "0", "12"], "Cut a rectangle corner to corner and you get 2 triangles."],
  ["A boat picture can be made from a…", "rectangle and a triangle", ["sphere and a cube", "two cones", "one cylinder"], "A rectangle for the boat and a triangle for the sail."],
  ["Two squares plus one triangle on top can make a…", "castle wall with a roof", ["ball", "can", "sphere"], "Squares make walls and a triangle is the roof."],
  ["Joining a triangle and a square, you get a…", "house shape", ["circle", "sphere", "can"], "A square with a triangle roof."],
  ["Six squares in 2 rows of 3 make a…", "big rectangle", ["circle", "triangle", "cone"], "Rows of squares make a rectangle."],
  ["Which pair of shapes is the best for building a robot body and head?", "two rectangles", ["a sphere and a cone", "a cube and a cylinder", "two cones"], "Rectangles stack neatly.", true],
  ["You join 2 rectangles end to end. Now you have…", "a longer rectangle", ["a circle", "a triangle", "a sphere"], "The shapes have formed one new shape."],
  ["A triangle plus a triangle, with long sides together, can make a…", "square", ["circle", "ball", "cone"], "Try it with paper triangles."],
  ["The pieces of a puzzle shape fit together with no…", "gaps or overlaps", ["shadows", "numbers", "names"], "Pieces should touch without covering each other."],
  ["Which of these is made by joining shapes?", "a picture of a house", ["a single circle", "a single triangle", "a single square"], "A picture is made of several shapes put together.", true],
];

const COMBINE_UNIT = bankUnit({
  id: "fl-k-put-shapes-together",
  title: "Put Shapes Together",
  emoji: "🧩",
  blurb: "Build new shapes from small ones",
  parentNote:
    "Practises Florida's B.E.S.T. benchmark MA.K.GR.1.5: combining triangles, rectangles and squares to make a bigger shape. Try building pictures with pattern blocks or cut-out paper shapes.",
  standards: ["MA.K.GR.1.5", "combining triangles, rectangles and squares to form a given shape"],
  items: COMBINE,
});

export const UNITS: Unit[] = [ORDINALS, NUMBER_LINE, MEASURE, COMBINE_UNIT];
/** Put the own units before the planned ones. */
export const FIRST = false;
