import { pick, randInt, shuffle } from "../../random";
import type { Unit } from "../../types";
import { mathUnit, num, pickOne, type Maker } from "./math-kit";

// Pennsylvania's own Grade 5 math unit (`pa-` id): choosing and reading the scale of a graph (CC.2.4.5.A.2).

const GROUPS = [
  ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  ["Maple St", "Oak St", "Pine St", "Elm St", "Cedar St", "Birch St"],
  ["Grade 1", "Grade 2", "Grade 3", "Grade 4", "Grade 5", "Grade 6"],
] as const;
const TITLES = ["Books read", "Cans collected", "Laps run"] as const;

const stepOf = (d: number) => (d === 1 ? 5 : d === 2 ? 10 : 20);

function bars(n: number, step: number, lo: number, hi: number) {
  const g = randInt(0, 2);
  const labels = shuffle(GROUPS[g]).slice(0, n);
  const values = shuffle(Array.from({ length: hi - lo + 1 }, (_, i) => lo + i)).slice(0, n);
  return { title: TITLES[g], data: labels.map((label, i) => ({ label, value: values[i] * step })) };
}

const readBar: Maker = (d) => {
  const step = stepOf(d);
  const { title, data } = bars(4, step, 2, 11);
  const t = pick(data);
  return num(`How tall is the ${t.label} bar?`, t.value, "Follow the top of the bar across to the scale on the side.", {
    step,
    min: step,
    visual: { type: "bars", title, bars: data },
  });
};

const difference: Maker = (d) => {
  const step = stepOf(d);
  const { title, data } = bars(4, step, 2, 11);
  const [a, b] = shuffle(data).slice(0, 2);
  const hi = a.value > b.value ? a : b;
  const lo = hi === a ? b : a;
  return num(`How much more is ${hi.label} than ${lo.label}?`, hi.value - lo.value, "Read both bars, then subtract the smaller from the larger.", {
    step,
    min: step,
    visual: { type: "bars", title, bars: data },
    extra: [hi.value + lo.value],
  });
};

const total: Maker = (d) => {
  const step = stepOf(d);
  const { title, data } = bars(3, step, 2, 9);
  const sum = data.reduce((s, r) => s + r.value, 0);
  return num("What is the total of all the bars?", sum, "Read each bar, then add them together.", {
    step,
    min: step,
    visual: { type: "bars", title, bars: data },
    extra: [sum - data[0].value],
  });
};

const bestScale: Maker = (d) => {
  const step = d === 1 ? 10 : pick([10, 20]);
  const values = Array.from({ length: 4 }, () => randInt(2, 14) * 5 * (step / 5 > 2 ? 2 : 1));
  const biggest = Math.max(...values);
  const top = Math.ceil((biggest + 1) / step) * step;
  const right = `0 to ${top}, counting by ${step}`;
  const tooLow = Math.floor((biggest / 2) / step) * step;
  if (tooLow < step || new Set(values).size < 4) return bestScale(d);
  const wrong = [`0 to ${tooLow}, counting by ${step}`, `0 to ${top * 10}, counting by ${step * 10}`, `0 to ${top}, counting by 7`];
  return pickOne(
    `You will draw a bar graph of ${values.join(", ")}. Which scale fits best?`,
    right,
    wrong,
    "The scale must reach past the biggest number, and it should count by an easy step.",
  );
};

const pictureKey: Maker = (d) => {
  const each = d === 1 ? 5 : d === 2 ? 10 : 20;
  const pics = randInt(3, 8);
  return num(`In a pictograph, each ⭐ stands for ${each}. A row has ${pics} ⭐. How many does that row show?`, pics * each, `Multiply ${pics} by ${each}.`, { step: each, min: each, extra: [pics + each] });
};

const picturesNeeded: Maker = (d) => {
  const each = d === 1 ? 5 : d === 2 ? 10 : 20;
  const pics = randInt(3, 9);
  return num(`Each 🍎 stands for ${each} apples. How many 🍎 do you draw for ${pics * each} apples?`, pics, `Divide ${pics * each} by ${each}.`, { step: 1, min: 1, extra: [pics * each - each, pics + 1] });
};

const halfwayBar: Maker = (d) => {
  const step = d === 1 ? 10 : d === 2 ? 20 : 50;
  const base = step * randInt(1, 4);
  return num(`A bar ends halfway between ${base} and ${base + step} on the scale. What value does the bar show?`, base + step / 2, `Halfway means half of ${step} past ${base}.`, { step: step / 2, min: step / 2, extra: [base + step, base] });
};

const UNIT = mathUnit({
  id: "pa-g5-graph-scales",
  title: "Graph Scales",
  emoji: "📈",
  blurb: "Choose and read a scale",
  parentNote:
    "Practises PA Core CC.2.4.5.A.2: representing and interpreting data with an appropriate scale. Your child reads bar graphs and pictographs, works out totals and differences, and picks a scale that reaches the biggest number and counts by an easy step.",
  codes: "CC.2.4.5.A.2",
  text: "choosing an appropriate scale and reading bar graphs and pictographs to compare data",
  makers: [readBar, difference, total, bestScale, pictureKey, picturesNeeded, halfwayBar],
});

export const UNITS: Unit[] = [UNIT];
/** Put the own units before the planned ones. */
export const FIRST = false;
