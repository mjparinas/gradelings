import { pick, randInt, shuffle } from "../../random";
import { eq, num, pickOne, someone, typed, type Maker } from "../../washington/units/math-kit";
import { mathUnit } from "./math";

// Grade 4: tenths as hundredths and adding them (4.NF.5), and measuring, sketching and adding angles (4.MD.6, 4.MD.7).
// The shared helpers are in ./math.ts.

// ---------- Tenths and hundredths (4.NF.5) ----------

const asHundredths: Maker = (d) => {
  const t = randInt(1, 9);
  const prompt = `${t}/10 = ☐/100. What number goes in the box?`;
  const hint = `Tenths are 10 times bigger than hundredths. ${t} tenths = ${t * 10} hundredths.`;
  if (d === 3) return typed(prompt, t * 10, hint, { visual: eq(`${t}/10 = ☐/100`) });
  return num(prompt, t * 10, hint, { min: 1, extra: [t, t * 100, t + 10], visual: eq(`${t}/10 = ☐/100`) });
};

const addMixed: Maker = (d) => {
  const t = randInt(1, 8);
  const h = randInt(1, 9);
  const right = `${t * 10 + h}/100`;
  const wrong = [`${t + h}/100`, `${t + h}/110`, `${h * 10 + t}/100`, `${t + h}/10`].filter((w) => w !== right);
  const visual = eq(`${t}/10 + ${h}/100`);
  const hint = `Change ${t}/10 to ${t * 10}/100 first. Then ${t * 10}/100 + ${h}/100 = ${right}.`;
  if (d === 3) return typed(`What is ${t}/10 + ${h}/100? Write it in hundredths.`, right, hint, { keypad: "fraction", visual });
  return pickOne(`What is ${t}/10 + ${h}/100?`, right, shuffle(wrong).slice(0, 3), hint, visual);
};

const sumOfTenths: Maker = () => {
  const a = randInt(1, 6);
  const b = randInt(10, 30);
  const total = a * 10 + b;
  const right = `${total}/100`;
  return pickOne(
    `Add ${a}/10 and ${b}/100.`,
    right,
    [`${a + b}/100`, `${a + b}/110`, `${a * 10 + b + 10}/100`],
    `${a}/10 = ${a * 10}/100. ${a * 10} + ${b} = ${total}, so the sum is ${right}.`,
  );
};

const METER = [
  { what: "ribbon", unit: "meter" },
  { what: "board", unit: "meter" },
  { what: "string", unit: "meter" },
];

const twoPieces: Maker = (d) => {
  const m = pick(METER);
  const t = randInt(1, 6);
  const h = randInt(11, 39);
  const total = t * 10 + h;
  const name = someone();
  const prompt = `${name} has a ${m.what} ${t}/10 of a ${m.unit} long and another ${h}/100 of a ${m.unit} long. How many hundredths of a ${m.unit} in all?`;
  const hint = `${t}/10 = ${t * 10}/100. ${t * 10} + ${h} = ${total} hundredths.`;
  if (d >= 2) return typed(prompt, total, hint, { suffix: "/100" });
  return num(prompt, total, hint, { min: 1, extra: [t + h, total + 10, total - 10] });
};

const compareTenths: Maker = () => {
  const t = randInt(2, 8);
  const h = t * 10 + pick([-8, -5, -3, 3, 5, 8]);
  const bigger = t * 10 > h ? `${t}/10` : `${h}/100`;
  return pickOne(
    `Which is greater: ${t}/10 or ${h}/100?`,
    bigger,
    [t * 10 > h ? `${h}/100` : `${t}/10`, "They are equal"],
    `Write ${t}/10 as ${t * 10}/100. Then compare ${t * 10} hundredths with ${h} hundredths.`,
  );
};

const decimalToHundredths: Maker = () => {
  const t = randInt(1, 9);
  const h = randInt(1, 9);
  const dec = `0.${t}${h}`;
  const right = `${t}/10 + ${h}/100`;
  return pickOne(
    `Which sum is the same as ${dec}?`,
    right,
    [`${h}/10 + ${t}/100`, `${t}/100 + ${h}/100`, `${t}/10 + ${h}/10`],
    `In ${dec}, the ${t} is in the tenths place and the ${h} is in the hundredths place.`,
  );
};

export const TENTHS_HUNDREDTHS_4 = mathUnit({
  id: "ca-g4-tenths-hundredths",
  title: "Tenths into Hundredths",
  emoji: "💯",
  blurb: "Turn tenths into hundredths and add",
  parentNote:
    "Writing a fraction with denominator 10 as an equal fraction with denominator 100 (3/10 = 30/100), and using that to add tenths and hundredths (3/10 + 4/100 = 34/100).",
  codes: "4.NF.5",
  text: "expressing a fraction with denominator 10 as an equivalent fraction with denominator 100, and adding tenths and hundredths",
  makers: [asHundredths, addMixed, sumOfTenths, twoPieces, compareTenths, decimalToHundredths],
});

// ---------- Measuring and adding angles (4.MD.6, 4.MD.7) ----------

const readFromZero: Maker = (d) => {
  const deg = d === 1 ? randInt(2, 17) * 10 : randInt(11, 169);
  const prompt = `One ray of an angle lines up with 0 on a protractor. The other ray points to ${deg} on the same scale. What does the angle measure?`;
  const hint = `Start at 0 and read where the other ray crosses the scale: ${deg}°.`;
  const visual = { type: "angle" as const, degrees: deg };
  if (d === 3) return typed(prompt, deg, hint, { suffix: "°", visual });
  return num(prompt, deg, hint, { step: 10, min: 1, max: 179, extra: [180 - deg], label: (n) => `${n}°`, visual });
};

const readBetween: Maker = (d) => {
  const a = randInt(1, 8) * 10;
  const size = d === 1 ? randInt(2, 9) * 10 : randInt(15, 95);
  const b = a + size;
  const prompt = `On a protractor, one ray of an angle points to ${a} and the other points to ${b} on the same scale. What does the angle measure?`;
  const hint = `The angle is the space between the rays: ${b} − ${a} = ${size}°.`;
  if (d === 3) return typed(prompt, size, hint, { suffix: "°" });
  return num(prompt, size, hint, { step: 10, min: 1, extra: [b, a + b], label: (n) => `${n}°` });
};

const whichScale: Maker = () => {
  const inner = pick([true, false]);
  const deg = randInt(3, 7) * 10 + pick([0, 5]);
  const scale = inner ? "inner" : "outer";
  return pickOne(
    `A protractor has two scales. One ray of the angle lines up with 0 on the ${scale} scale. The other ray crosses ${deg} on the ${scale} scale and ${180 - deg} on the other. What does the angle measure?`,
    `${deg}°`,
    [`${180 - deg}°`, `${deg + 180}°`, "180°"],
    `Read the scale that starts at 0 on your first ray: the ${scale} scale.`,
  );
};

const estimate: Maker = () => {
  const deg = pick([20, 30, 45, 60, 90, 120, 135, 150, 160]);
  const options = [deg, ...shuffle([20, 45, 90, 135, 170].filter((x) => Math.abs(x - deg) >= 35)).slice(0, 2)];
  return pickOne(
    "About how many degrees is this angle?",
    `${options[0]}°`,
    options.slice(1).map((x) => `${x}°`),
    "Compare with a right angle (90°). Smaller than a corner of a page is less than 90°; wider is more.",
    { type: "angle", degrees: deg },
  );
};

const sketchStep: Maker = () => {
  const deg = randInt(2, 16) * 10 + pick([0, 5]);
  return pickOne(
    `You want to sketch a ${deg}° angle. You draw one ray and put the protractor's center on its endpoint, with the ray on 0. What next?`,
    `Make a dot at ${deg} and draw a ray from the endpoint through it`,
    [`Make a dot at ${180 - deg} on the same scale and draw a ray through it`, `Draw a ray straight up from the endpoint`, `Draw a ray ${deg} centimeters long`],
    `The second ray must pass through ${deg} on the scale that starts at 0 on the first ray.`,
  );
};

const addParts: Maker = (d) => {
  const a = randInt(15, 80);
  const b = randInt(15, d === 1 ? 60 : 95);
  const prompt = `An angle is split into two parts that don't overlap. One part is ${a}° and the other is ${b}°. What does the whole angle measure?`;
  const hint = `Angle measures add: ${a} + ${b} = ${a + b}°.`;
  if (d === 3) return typed(prompt, a + b, hint, { suffix: "°" });
  return num(prompt, a + b, hint, { step: 10, min: 1, extra: [Math.abs(a - b), a + b + 1], label: (n) => `${n}°` });
};

const missingPart: Maker = (d) => {
  const whole = pick(d === 1 ? [90] : [90, 180, 120, 150]);
  const part = randInt(15, whole - 15);
  const name = whole === 90 ? "A right angle (90°)" : whole === 180 ? "A straight angle (180°)" : `A ${whole}° angle`;
  const prompt = `${name} is split into two angles. One is ${part}°. What is the other?`;
  const hint = `The parts add up to the whole: ${whole} − ${part} = ${whole - part}°.`;
  if (d === 3) return typed(prompt, whole - part, hint, { suffix: "°" });
  return num(prompt, whole - part, hint, { step: 10, min: 1, extra: [whole + part, part], label: (n) => `${n}°` });
};

const threeParts: Maker = () => {
  const [a, b, c] = [randInt(10, 40), randInt(10, 40), randInt(10, 40)];
  return num(
    `Three angles sit side by side with no gaps or overlaps: ${a}°, ${b}° and ${c}°. What angle do they make together?`,
    a + b + c,
    `Add the parts: ${a} + ${b} + ${c} = ${a + b + c}°.`,
    { step: 10, min: 1, label: (n) => `${n}°` },
  );
};

export const ANGLES_4 = mathUnit({
  id: "ca-g4-measure-angles",
  title: "Protractors & Angle Parts",
  emoji: "📐",
  blurb: "Read a protractor and add angle parts",
  parentNote:
    "Reading angle measures in whole degrees from a protractor, the steps for sketching an angle of a given size, and adding or subtracting the parts of an angle split into pieces. At home, try measuring angles with a real protractor.",
  codes: "4.MD.6; 4.MD.7",
  text: "measuring angles in whole-number degrees with a protractor and sketching angles, and finding unknown angles by adding angle parts",
  makers: [readFromZero, readBetween, whichScale, estimate, sketchStep, addParts, missingPart, threeParts],
});

export const MATH_4 = [TENTHS_HUNDREDTHS_4, ANGLES_4];
