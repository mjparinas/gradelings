import { pick, randInt, shuffle } from "../../random";
import type { Unit } from "../../types";
import { mathUnit, num, pickOne, type Maker } from "./math-kit";

// Pennsylvania's own Grade 4 math unit (`pa-` id): moving information from one kind of data display to another
// (CC.2.4.4.A.2), which no unit from another framework practises.

const GROUPS = [
  ["Soccer", "Swimming", "Chess", "Art", "Dance", "Drama", "Choir", "Robotics"],
  ["Apples", "Pears", "Grapes", "Plums", "Peaches", "Cherries", "Melons", "Berries"],
  ["Cats", "Dogs", "Fish", "Birds", "Rabbits", "Turtles", "Hamsters", "Frogs"],
  ["Rock", "Pop", "Jazz", "Folk", "Hip hop", "Country", "Classical", "Reggae"],
] as const;
const EMOJI = ["⭐", "🍎", "🐾", "🎵"] as const;

/** Four or five categories with different values that are multiples of `step`. */
function rows(n: number, step: number, lo: number, hi: number): { label: string; value: number; emoji: string }[] {
  const g = randInt(0, GROUPS.length - 1);
  const labels = shuffle(GROUPS[g]).slice(0, n);
  const values = shuffle(Array.from({ length: hi - lo + 1 }, (_, i) => lo + i)).slice(0, n);
  return labels.map((label, i) => ({ label, value: values[i] * step, emoji: EMOJI[g] }));
}

const stepOf = (d: number) => (d === 1 ? 2 : d === 2 ? 5 : 10);

const barToTable: Maker = (d) => {
  const step = stepOf(d);
  const data = rows(4, step, 2, 9);
  const target = pick(data);
  return num(`Copy this bar graph into a table. What number goes in the row for ${target.label}?`, target.value, "Find the top of the bar, then read across to the number scale.", {
    step,
    min: step,
    visual: { type: "bars", title: "Our class survey", bars: data.map(({ label, value }) => ({ label, value })) },
  });
};

const tableToBarTallest: Maker = (d) => {
  const step = stepOf(d);
  const data = rows(4, step, 2, 12);
  const tall = Math.max(...data.map((r) => r.value));
  const right = data.find((r) => r.value === tall)!;
  return pickOne(
    "If you drew this table as a bar graph, which bar would be the tallest?",
    right.label,
    data.filter((r) => r !== right).map((r) => r.label),
    "The tallest bar belongs to the biggest number in the table.",
    { type: "table", title: "Our class survey", headers: ["Group", "Votes"], rows: data.map((r) => [r.label, r.value]) },
  );
};

const tableToBarShortest: Maker = (d) => {
  const step = stepOf(d);
  const data = rows(5, step, 2, 14);
  const low = Math.min(...data.map((r) => r.value));
  const right = data.find((r) => r.value === low)!;
  return pickOne(
    "If you drew this table as a bar graph, which bar would be the shortest?",
    right.label,
    data.filter((r) => r !== right).map((r) => r.label),
    "The shortest bar belongs to the smallest number in the table.",
    { type: "table", title: "Our class survey", headers: ["Group", "Votes"], rows: data.map((r) => [r.label, r.value]) },
  );
};

const pictureToTable: Maker = (d) => {
  const each = d === 1 ? 2 : d === 2 ? 5 : 10;
  const data = rows(3, 1, 2, 7);
  const target = pick(data);
  const answer = target.value * each;
  return num(`Each picture stands for ${each}. Write the pictograph as a table. What number goes in the row for ${target.label}?`, answer, `Count the pictures, then multiply by ${each}.`, {
    step: each,
    min: each,
    extra: [target.value, target.value + each],
    visual: { type: "pictograph", title: "Our class survey", rows: data.map((r) => ({ label: r.label, emoji: r.emoji, count: r.value })), each },
  });
};

const barToPicture: Maker = (d) => {
  const each = d === 1 ? 2 : d === 2 ? 5 : 10;
  const pics = randInt(3, 9);
  const data = rows(3, each, 2, 9);
  const target = pick(data);
  const mine = { ...target, value: pics * each };
  const list = data.map((r) => (r === target ? mine : r));
  return num(
    `A bar graph shows ${mine.label}: ${mine.value}. In a pictograph where each picture stands for ${each}, how many pictures go in the row for ${mine.label}?`,
    pics,
    `Divide ${mine.value} by ${each}.`,
    {
      step: 1,
      min: 1,
      extra: [mine.value, mine.value - each],
      visual: { type: "bars", title: "Our class survey", bars: list.map(({ label, value }) => ({ label, value })) },
    },
  );
};

const listToCount: Maker = (d) => {
  const sizes = d === 1 ? [2, 3, 4] : [2, 3, 4, 5];
  const len = d === 1 ? 8 : 10;
  const data = Array.from({ length: len }, () => pick(sizes)).sort((a, b) => a - b);
  const target = pick(sizes);
  const count = data.filter((x) => x === target).length;
  if (count === 0) return listToCount(d);
  return num(`These pencils are ${data.join(", ")} inches long. Put them in a table that counts each length. How many pencils are ${target} inches long?`, count, `Count how many times ${target} appears in the list.`, {
    step: 1,
    min: 1,
    max: len,
  });
};

const linePlotToTotal: Maker = (d) => {
  const marks = d === 1 ? ["1/4", "1/2", "3/4"] : ["1/8", "1/4", "1/2", "3/4"];
  const counts = marks.map(() => randInt(1, 5));
  const parts = marks.map((m, i) => `${counts[i]} ${counts[i] === 1 ? "X" : "Xs"} above ${m} inch`);
  const total = counts.reduce((a, b) => a + b, 0);
  return num(
    `A line plot has ${parts.slice(0, -1).join(", ")} and ${parts[parts.length - 1]}. If you move it to a table, how many measurements are there in all?`,
    total,
    "Each X is one measurement. Add the counts for every mark.",
    { step: 1, min: 1, extra: [counts[0], total + 1, total - 1] },
  );
};

const UNIT = mathUnit({
  id: "pa-g4-data-displays",
  title: "From Graph to Table",
  emoji: "📊",
  blurb: "Move data between displays",
  parentNote:
    "Practises PA Core CC.2.4.4.A.2: translating information from one data display to another, such as a bar graph to a table, a pictograph to a table, or a list to a table of counts. Show your child a graph in the news and ask what the same facts would look like in a table.",
  codes: "CC.2.4.4.A.2",
  text: "moving information from one kind of data display to another, such as bar graphs, pictographs, tables and line plots",
  makers: [barToTable, tableToBarTallest, tableToBarShortest, pictureToTable, barToPicture, listToCount, linePlotToTotal],
});

export const UNITS: Unit[] = [UNIT];
/** Put the own units before the planned ones. */
export const FIRST = false;
