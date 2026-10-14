import { pick, randInt, sample } from "../../random";
import type { Unit } from "../../types";
import { type Maker, fracChoice, num, pickOne, someone, typed } from "../../washington/units/math-kit";
import type { Q } from "../own";
import { bank, mathUnit } from "./math-kit";

// New York's own Grade 4 math units (`ny-` ids): measuring and sketching angles with a protractor and adding angle
// measures (NY-4.MD.6, 4.MD.7), and tenths as hundredths, including adding tenths and hundredths (NY-4.NF.5).

const deg = (n: number): string => `${n}°`;

// ---------- Angles: protractors and adding angles (NY-4.MD.6, 4.MD.7) ----------

/** Read a protractor when one ray is on 0. */
const readZero: Maker = (d) => {
  const a = randInt(2, 17) * 10 + (d === 3 ? pick([0, 5]) : 0);
  return num(`One ray of the angle is on 0° of the protractor. The other ray passes ${a}° on the same scale. How big is the angle?`, a, "When one ray is on 0, read the number the other ray passes on that same scale.", {
    step: 10,
    min: 1,
    max: 179,
    extra: [180 - a],
    label: deg,
    visual: { type: "angle", degrees: a },
  });
};

/** Inner and outer scales: use the scale that starts at 0 on the first ray. */
const twoScales: Maker = () => {
  const a = pick([20, 30, 40, 50, 60, 70, 110, 120, 130, 140, 150, 160]);
  return pickOne(
    `One ray is on 0° of the inner scale. The other ray points to ${a} on the inner scale and ${180 - a} on the outer scale. How big is the angle?`,
    deg(a),
    [deg(180 - a), deg(180), deg(90)],
    `Use the scale that starts at 0 on the first ray. That is the inner scale, so read ${a}.`,
    { type: "angle", degrees: a },
  );
};

/** Neither ray on 0: subtract the two readings. */
const readBetween: Maker = (d) => {
  const lo = randInt(1, 8) * 10 + (d === 3 ? 5 : 0);
  const size = randInt(2, 9) * 10;
  const hi = lo + size;
  if (d === 3) return typed(`On a protractor, one ray passes ${lo}° and the other passes ${hi}° on the same scale. How big is the angle?`, size, `Subtract the two readings: ${hi} − ${lo}.`, { suffix: "°" });
  return num(`On a protractor, one ray passes ${lo}° and the other passes ${hi}° on the same scale. How big is the angle?`, size, `Subtract the two readings: ${hi} − ${lo}.`, { step: 10, min: 1, extra: [hi, lo, hi + lo].filter((x) => x < 360), label: deg });
};

/** Estimate an angle from its picture. */
const estimate: Maker = () => {
  const options = [30, 45, 60, 90, 120, 135, 150];
  const a = pick(options);
  const wrong = sample(options.filter((o) => Math.abs(o - a) >= 45), 2);
  return pickOne("About how big is this angle?", deg(a), wrong.map(deg), "A square corner is 90°. Is this angle smaller (acute) or bigger (obtuse)?", { type: "angle", degrees: a });
};

/** Sketching an angle of a given size. */
const SKETCH: Q[] = [
  ["To sketch a 90° angle, where does the second ray go?", "straight up from the first ray, making a square corner", ["back along the first ray", "almost flat, close to the first ray", "a little past straight up"], "A 90° angle is a square corner."],
  ["You sketch a 30° angle. How does it look?", "a narrow angle, a third of a square corner", ["a square corner", "wider than a square corner", "a straight line"], "30° is a third of 90°, so it is a small, narrow angle."],
  ["You sketch a 150° angle. How does it look?", "wide, a little less than a straight line", ["a square corner", "narrow, close to the first ray", "a full turn"], "180° is a straight line. 150° is 30° less than that."],
  ["To draw a 60° angle with a protractor, what do you do first?", "put the center on the vertex and line up 0° with one ray", ["start the ray at the 60 mark", "line up 90° with the ray", "put the protractor anywhere on the page"], "Center on the vertex, 0° on the first ray, then mark 60°."],
  ["Which angle is closest to a square corner?", "85°", ["45°", "150°", "20°"], "A square corner is 90°."],
  ["A ray points straight back the other way from the first ray. What angle is that?", "180°", ["90°", "360°", "0°"], "Two rays pointing opposite ways make a straight angle: 180°."],
];

/** An angle split into two parts: add, or find a missing part. */
const addParts: Maker = (d) => {
  const a = randInt(2, 8) * 5;
  const b = randInt(3, 12) * 5;
  if (d === 1 || pick([true, false])) {
    return num(`An angle is split into two parts: ${a}° and ${b}°. How big is the whole angle?`, a + b, "When an angle is split into parts, the whole angle is the sum of the parts.", { step: 5, min: 5, extra: [Math.abs(b - a), a + b + 10], label: deg });
  }
  const whole = pick([90, 180]);
  const part = randInt(2, whole / 5 - 2) * 5;
  const name = whole === 90 ? "A square corner (90°)" : "A straight angle (180°)";
  const prompt = `${name} is split into two angles. One is ${part}°. How big is the other?`;
  const hint = `The parts add up to ${whole}°: ${whole} − ${part}.`;
  if (d === 3) return typed(prompt, whole - part, hint, { suffix: "°" });
  return num(prompt, whole - part, hint, { step: 5, min: 5, extra: [whole + part, part, (whole === 90 ? 180 : 90) - part].filter((x) => x > 0), label: deg });
};

/** Angles in real life that add up. */
const angleStory: Maker = () => {
  const kind = pick(["door", "sprinkler", "fan", "three"] as const);
  if (kind === "door") {
    const a = randInt(2, 6) * 5;
    const b = randInt(2, 8) * 5;
    return num(`A door is open ${a}°. ${someone()} opens it ${b}° more. How far is it open now?`, a + b, "Add the two turns.", { step: 5, min: 5, extra: [b - a].filter((x) => x > 0), label: deg });
  }
  if (kind === "sprinkler") {
    const total = pick([90, 120, 150, 180]);
    const done = randInt(2, total / 10 - 2) * 10;
    return num(`A sprinkler turns ${total}° in all. It has turned ${done}°. How many more degrees will it turn?`, total - done, `Subtract: ${total} − ${done}.`, { step: 10, min: 10, extra: [total + done], label: deg });
  }
  if (kind === "fan") {
    const n = pick([2, 3, 4, 6]);
    const each = 180 / n;
    return num(`${n} equal angles fit together to make a straight angle. How big is each one?`, each, `A straight angle is 180°. Share it into ${n} equal parts.`, { step: 5, min: 5, extra: [180 - each, 90 / n].filter((x) => Number.isInteger(x)), label: deg });
  }
  const a = randInt(3, 8) * 10;
  const b = randInt(3, 8) * 10;
  const c = 180 - a - b;
  return num(`Three angles make a straight line: ${a}°, ${b}° and one more. How big is the missing angle?`, c, `The three angles add up to 180°: 180 − ${a} − ${b}.`, { step: 10, min: 10, extra: [a + b, 90 - Math.min(a, b)].filter((x) => x > 0 && x !== c), label: deg });
};

// ---------- Tenths and hundredths (NY-4.NF.5) ----------

/** Write tenths as hundredths, or hundredths as tenths. */
const tenthsAsHundredths: Maker = (d) => {
  const t = randInt(1, 9);
  if (pick([true, false])) {
    if (d === 3) return typed(`${t}/10 = ?/100. What number goes in the box?`, t * 10, "Multiply the top and bottom by 10: tenths become hundredths.");
    return num(`${t}/10 = ?/100. What number goes in the box?`, t * 10, "Multiply the top and bottom by 10: tenths become hundredths.", { step: 10, min: 1, extra: [t, t + 10, t * 100].filter((x) => x <= 100) });
  }
  return pickOne(`Which fraction is equal to ${t}/10?`, `${t * 10}/100`, [`${t}/100`, `${t + 10}/100`, `${t}0/10`], "Each tenth is 10 hundredths.");
};

/** Add a number of tenths and a number of hundredths. */
const addTenthsHundredths: Maker = (d) => {
  const t = randInt(1, 8);
  const h = randInt(1, 99 - t * 10);
  const sum = t * 10 + h;
  const prompt = `${t}/10 + ${h}/100 = ?`;
  const hint = `Change ${t}/10 to ${t * 10}/100 first. Then add the hundredths: ${t * 10} + ${h}.`;
  if (d === 3) return typed(`Add: ${prompt}`, `${sum}/100`, hint, { keypad: "fraction", accept: sum % 10 === 0 ? [`${sum / 10}/10`] : [] });
  const show = (n: number, dd: number) => `${n}/${dd}`;
  return fracChoice(`Add: ${prompt}`, [sum, 100], [[t + h, 100], [t + h, 110], [sum + 10, 100], [t + h, 10]], hint, show);
};

const THINGS = [
  ["ran", "of a mile"],
  ["painted", "of a fence"],
  ["read", "of a book"],
  ["filled", "of a tank"],
] as const;

/** A story that adds tenths and hundredths. */
const tenthsStory: Maker = () => {
  const [verb, of] = pick(THINGS);
  const t = randInt(1, 6);
  const h = randInt(1, 39);
  const sum = t * 10 + h;
  return fracChoice(
    `${someone()} ${verb} ${t}/10 ${of}, then ${h}/100 more. How much in all?`,
    [sum, 100],
    [[t + h, 100], [t + h, 110], [sum + 10, 100]],
    `${t}/10 is ${t * 10}/100. Add ${h}/100 more.`,
    (n, dd) => `${n}/${dd} ${of}`,
  );
};

/** Compare tenths and hundredths by writing both as hundredths. */
const compareTenths: Maker = () => {
  const t = randInt(1, 9);
  let h = randInt(1, 99);
  while (h === t * 10) h = randInt(1, 99);
  const big = t * 10 > h ? `${t}/10` : `${h}/100`;
  return pickOne(`Which is greater: ${t}/10 or ${h}/100?`, big, [big === `${t}/10` ? `${h}/100` : `${t}/10`, "they are equal"], `Write ${t}/10 as ${t * 10}/100, then compare ${t * 10} and ${h} hundredths.`);
};

export const UNITS: Unit[] = [
  mathUnit({
    id: "ny-g4-angle-measure",
    title: "Measuring Angles",
    emoji: "📐",
    blurb: "Protractors and adding angles",
    parentNote: "Reading angles on a protractor (including which scale to use), sketching angles of a given size, and finding a whole angle or a missing part by adding and subtracting degrees.",
    codes: "NY-4.MD.6; NY-4.MD.7",
    text: "measuring and sketching angles in whole degrees with a protractor, and adding and subtracting angle measures to find unknown angles",
    makers: [readZero, twoScales, readBetween, estimate, bank(SKETCH), addParts, addParts, angleStory],
  }),
  mathUnit({
    id: "ny-g4-tenths-hundredths",
    title: "Tenths & Hundredths",
    emoji: "💯",
    blurb: "Write tenths as hundredths and add",
    parentNote: "Writing a fraction with 10 on the bottom as an equal fraction with 100 on the bottom (3/10 = 30/100), and using that to add tenths and hundredths.",
    codes: "NY-4.NF.5",
    text: "writing tenths as equivalent hundredths and adding fractions with denominators 10 and 100",
    makers: [tenthsAsHundredths, tenthsAsHundredths, addTenthsHundredths, addTenthsHundredths, tenthsStory, compareTenths],
  }),
];

