import { pick, randInt, shuffle } from "../../random";
import type { Unit } from "../../types";
import { bankUnit, type Q } from "../own";
import { fmt, linear, mathUnit, num, pickOne, typed, type Maker } from "./math-kit";

// Florida's own Grade 6 math units (`fl-` ids): absolute value (MA.6.NSO.1.3, 1.4), multiplying and dividing integers
// (MA.6.NSO.4.2), common factors and the distributive property (MA.6.NSO.3.2), writing expressions and inequalities
// (MA.6.AR.1.1, 1.2, 2.1), statistical questions (MA.6.DP.1.1) and box plots (MA.6.DP.1.3).

const absOf: Maker = (d) => {
  const n = randInt(1, d === 1 ? 12 : 60) * (randInt(0, 1) ? -1 : 1);
  return num(`What is |${fmt(n)}|?`, Math.abs(n), `Absolute value is the distance from 0 on a number line, so it is never negative.`, { min: 0 });
};

const distanceFromZero: Maker = (d) => {
  const n = randInt(2, d === 1 ? 15 : 34) * -1;
  return num(`How far from 0 on a number line is ${fmt(n)}?`, Math.abs(n), `${fmt(n)} is ${-n} steps from 0.`, { min: 1, visual: { type: "numberLine", min: Math.min(n, -5), max: 5, step: 1, marks: [n], labelEvery: 5 } });
};

const compareAbs: Maker = (d) => {
  const a = randInt(1, d === 1 ? 10 : 40) * (randInt(0, 1) ? -1 : 1);
  let b = randInt(1, d === 1 ? 10 : 40) * (randInt(0, 1) ? -1 : 1);
  if (Math.abs(a) === Math.abs(b)) b = b > 0 ? b + 1 : b - 1;
  const bigger = Math.abs(a) > Math.abs(b) ? a : b;
  const smaller = bigger === a ? b : a;
  return pickOne(`Which number has the greater absolute value, ${fmt(a)} or ${fmt(b)}?`, fmt(bigger), [fmt(smaller), "they are equal"], `|${fmt(a)}| = ${Math.abs(a)} and |${fmt(b)}| = ${Math.abs(b)}.`);
};

const farther: Maker = (d) => {
  const below = randInt(3, d === 1 ? 15 : 90);
  const above = randInt(2, d === 1 ? 14 : 80);
  if (below === above) return farther(d);
  const place = pick([["a diver", "a bird", "sea level", "feet"], ["a submarine", "a helicopter", "sea level", "meters"]]);
  const right = below > above ? place[0] : place[1];
  const wrong = below > above ? place[1] : place[0];
  return pickOne(`${place[0]} is at −${below} ${place[3]} and ${place[1]} is at +${above} ${place[3]}. Which is farther from ${place[2]}?`, right, [wrong, "they are the same distance"], `Compare |−${below}| = ${below} with |${above}| = ${above}.`);
};

const ABSOLUTE = mathUnit({
  id: "fl-g6-absolute-value",
  title: "Absolute Value",
  emoji: "📏",
  blurb: "How far from zero?",
  parentNote:
    "Practises Florida's B.E.S.T. benchmarks MA.6.NSO.1.3 and MA.6.NSO.1.4: the absolute value of a number as its distance from zero, and comparing absolute values in real situations such as temperatures and elevations. Ask which is farther from zero, a temperature of −8 or +5.",
  codes: "MA.6.NSO.1.3; MA.6.NSO.1.4",
  text: "absolute value as distance from zero, and comparing absolute values",
  makers: [absOf, distanceFromZero, compareAbs, farther, absOf],
});

const signed = (n: number) => (n < 0 ? `(${fmt(n)})` : String(n));

const multInt: Maker = (d) => {
  const a = randInt(2, d === 1 ? 9 : 12) * (randInt(0, 1) ? -1 : 1);
  const b = randInt(2, d === 1 ? 9 : 12) * (randInt(0, 1) ? -1 : 1);
  const hint = a * b < 0 ? "Different signs: the answer is negative." : "Same signs: the answer is positive.";
  return d === 3 ? typed(`${signed(a)} × ${signed(b)} = ?`, a * b, hint, { keypad: "integer" }) : num(`${signed(a)} × ${signed(b)} = ?`, a * b, hint, { min: -200, extra: [-(a * b), a + b] });
};

const divInt: Maker = (d) => {
  const q = randInt(2, d === 1 ? 9 : 12) * (randInt(0, 1) ? -1 : 1);
  const b = randInt(2, d === 1 ? 9 : 12) * (randInt(0, 1) ? -1 : 1);
  const a = q * b;
  const hint = q < 0 ? "Different signs: the answer is negative." : "Same signs: the answer is positive.";
  return num(`${signed(a)} ÷ ${signed(b)} = ?`, q, hint, { min: -200, extra: [-q] });
};

const signRule: Maker = () => {
  const items: [string, string][] = [
    ["negative × negative", "positive"],
    ["negative × positive", "negative"],
    ["positive × negative", "negative"],
    ["negative ÷ negative", "positive"],
    ["positive ÷ negative", "negative"],
    ["negative ÷ positive", "negative"],
  ];
  const [prompt, right] = pick(items);
  return pickOne(`Is the answer to ${prompt} positive or negative?`, right, [right === "positive" ? "negative" : "positive", "zero"], "Same signs give a positive. Different signs give a negative.");
};

const storyMult: Maker = (d) => {
  const n = randInt(2, d === 1 ? 6 : 9);
  const k = randInt(2, d === 1 ? 5 : 12);
  return num(`A diver goes down ${k} feet every minute for ${n} minutes. What is the change in depth (negative for down)?`, -k * n, `${n} × (−${k}) = −${k * n}.`, { min: -200, max: 0 });
};

const MULT_INT = mathUnit({
  id: "fl-g6-multiply-integers",
  title: "Multiply & Divide Integers",
  emoji: "✖️",
  blurb: "Positive and negative products",
  parentNote:
    "Practises Florida's B.E.S.T. benchmark MA.6.NSO.4.2: multiplying and dividing integers fluently. The signs rule is the key: two numbers with the same sign give a positive answer, and different signs give a negative answer.",
  codes: "MA.6.NSO.4.2",
  text: "multiplying and dividing integers with procedural fluency",
  makers: [multInt, divInt, signRule, storyMult, multInt, divInt],
});

const factorOut: Maker = (d) => {
  const g = pick([2, 3, 4, 5, 6, 7, 8, 9]);
  const a = randInt(2, d === 1 ? 6 : 9);
  let b = randInt(2, d === 1 ? 6 : 9);
  if (a === b) b += 1;
  const sum = g * a + g * b;
  const right = `${g}(${a} + ${b})`;
  const wrong = [`${g}(${a * b})`, `${a}(${g} + ${b})`, `${g}(${a} + ${b + 1})`].filter((x) => x !== right);
  return pickOne(`Rewrite ${g * a} + ${g * b} as a common factor times a sum.`, right, wrong, `${g} goes into both ${g * a} and ${g * b}: ${g * a} = ${g} × ${a} and ${g * b} = ${g} × ${b}. The total is ${sum}.`);
};

const commonFactor: Maker = () => {
  const g = pick([3, 4, 5, 6, 7, 8, 9, 12]);
  const a = randInt(2, 7);
  const b = randInt(2, 7) + (randInt(0, 1) ? 0 : 7);
  return num(`${g * a} + ${g * b} = ${g}(${a} + □). What number goes in the box?`, b, `${g * b} ÷ ${g} = ${b}.`, { min: 1, extra: [b + 1, a] });
};

const sumInOrder: Maker = () => {
  const g = pick([2, 3, 4, 5, 6, 8, 9]);
  const a = randInt(2, 9);
  const b = randInt(2, 9);
  const right = g * (a + b);
  return num(`${g}(${a} + ${b}) = ${g * a} + ${g * b} = ?`, right, `Multiply ${g} by each number inside, then add.`, { min: 1, extra: [g * a + b, g + a + b] });
};

const FACTOR = mathUnit({
  id: "fl-g6-common-factor",
  title: "Pull Out a Common Factor",
  emoji: "🧩",
  blurb: "Rewrite sums with the distributive property",
  parentNote:
    "Practises Florida's B.E.S.T. benchmark MA.6.NSO.3.2: rewriting the sum of two composite numbers with a common factor as that factor times a sum, for example 12 + 18 = 6(2 + 3). It is the distributive property run backwards.",
  codes: "MA.6.NSO.3.2",
  text: "rewriting a sum of two whole numbers as a common factor times a sum",
  makers: [factorOut, commonFactor, sumInOrder, factorOut],
});

const WORDS: [(n: string) => string, (n: string) => string][] = [
  [(n) => `${n} plus 5`, (n) => `${n} + 5`],
  [(n) => `${n} minus 3`, (n) => `${n} − 3`],
  [(n) => `twice ${n}`, (n) => `2${n}`],
  [(n) => `${n} divided by 4`, (n) => `${n} ÷ 4`],
  [(n) => `3 more than ${n}`, (n) => `${n} + 3`],
  [(n) => `7 less than ${n}`, (n) => `${n} − 7`],
  [(n) => `the product of 6 and ${n}`, (n) => `6${n}`],
  [(n) => `${n} times 8`, (n) => `8${n}`],
];

const expressionFromWords: Maker = () => {
  const [say, write] = pick(WORDS);
  const n = pick(["x", "n", "a", "m"]);
  const right = write(n);
  const wrongPool = WORDS.map(([, w]) => w(n)).filter((w) => w !== right);
  return pickOne(`Which expression means "${say(n)}"?`, right, shuffle(wrongPool).slice(0, 3), "Turn each phrase into math: plus is +, minus is −, twice is 2 times.");
};

const twoStepWords: Maker = () => {
  const a = randInt(2, 6);
  const b = randInt(1, 9);
  const x = pick(["x", "n"]);
  const right = `${a}${x} + ${b}`;
  return pickOne(`Which expression means "${a} times ${x}, plus ${b}"?`, right, [`${a}${x} − ${b}`, `${a + b}${x}`, `${a} + ${b}${x}`], `Multiply ${x} by ${a} first. Then add ${b}.`);
};

const evaluateExpression: Maker = (d) => {
  const a = randInt(2, 6);
  const b = randInt(1, 9);
  const x = randInt(1, d === 1 ? 5 : 9);
  return num(`Evaluate ${linear(a, b)} when x = ${x}.`, a * x + b, `Replace x with ${x}: ${a} × ${x} + ${b}.`, { min: 0, extra: [a + x + b] });
};

const inequalityFromWords: Maker = () => {
  const n = randInt(5, 60);
  const forms: [string, string, string][] = [
    [`at least ${n}`, `x ≥ ${n}`, "At least means greater than or equal to."],
    [`at most ${n}`, `x ≤ ${n}`, "At most means less than or equal to."],
    [`more than ${n}`, `x > ${n}`, "More than means greater than."],
    [`fewer than ${n}`, `x < ${n}`, "Fewer than means less than."],
  ];
  const [say, right, hint] = pick(forms);
  const wrong = forms.map((f) => f[1]).filter((f) => f !== right);
  return pickOne(`Which inequality means "x is ${say}"?`, right, wrong, hint);
};

const trueValue: Maker = () => {
  const a = randInt(2, 9);
  const t = randInt(a + 6, 30);
  const winners = [t - a + 1, t - a + 2, t].map(String);
  const losers = [t - a, t - a - 1, t - a - 3].map(String);
  return pickOne(`Which value of x makes x + ${a} > ${t} true?`, pick(winners), losers, `Try each: ${a} added to a value must be bigger than ${t}.`);
};

const EXPRESSIONS = mathUnit({
  id: "fl-g6-expressions-inequalities",
  title: "Expressions & Inequalities",
  emoji: "🔤",
  blurb: "Turn words into math",
  parentNote:
    "Practises Florida's B.E.S.T. benchmarks MA.6.AR.1.1, MA.6.AR.1.2 and MA.6.AR.2.1: translating phrases into algebraic expressions, writing inequalities such as x ≥ 18 from words, and testing which values make an equation or inequality true.",
  codes: "MA.6.AR.1.1; MA.6.AR.1.2; MA.6.AR.2.1",
  text: "writing expressions and inequalities from words and testing which values make them true",
  makers: [expressionFromWords, twoStepWords, evaluateExpression, inequalityFromWords, trueValue, expressionFromWords],
});

const STAT_QS: Q[] = [
  ["Which is a statistical question?", "How many pets does each student in our class have?", ["How many pets does Mia have?", "What is 5 + 6?", "Is Mia in our class?"], "A statistical question expects different answers from different people."],
  ["Which is a statistical question?", "How tall are the students in Grade 6?", ["How tall is Jay?", "What is 12 ÷ 4?", "What day is today?"], "Heights vary from student to student."],
  ["Which is NOT a statistical question?", "How old is our teacher?", ["How old are the students in our school?", "How long do students sleep at night?", "How many books do students read each month?"], "There is only one answer for one person."],
  ["Which is a statistical question?", "How many minutes do students spend on homework each night?", ["How many minutes are in an hour?", "How long is Sam's homework tonight?", "What is 60 ÷ 5?"], "There is variability in the answers."],
  ["Which is NOT a statistical question?", "What is the capital of Florida?", ["How many pets do students have?", "How far do students walk to school?", "What is the favorite sport of students in our class?"], "It has one correct answer."],
  ["Which question would give numerical data?", "How many siblings does each student have?", ["Which is your favorite color?", "Do you like pizza?", "What is your favorite animal?"], "Numerical data is a number."],
  ["A statistical question is one that…", "has many different answers", ["has exactly one answer", "needs no data", "can't be answered with numbers"], "Different values are expected."],
  ["Which is a statistical question?", "How many hours do students in our grade sleep?", ["How many hours are in a day?", "How long did Ava sleep last night?", "What time is it?"], "The answers will vary."],
  ["Which is a statistical question?", "How much money do 6th graders spend on lunch each week?", ["How much is a pizza slice?", "How much did Leo spend today?", "What is 4 × $3?"], "Many students, many amounts."],
  ["To answer a statistical question, we first…", "collect data", ["guess", "ask one person", "skip the data"], "Data is the information we gather."],
  ["Which is a statistical question about the temperature?", "What are the high temperatures in Orlando in July?", ["What is the temperature right now at my house?", "What is 90 − 5?", "Is it hot?"], "Many days give many temperatures."],
  ["Which question would NOT give numerical data?", "What is your favorite season?", ["How many books did you read?", "How many miles do you bike each week?", "How many minutes is your bus ride?"], "A favorite is a category, not a number."],
  ["Which is a statistical question?", "How many students ride the bus to school?", ["Does Mia ride the bus?", "Is the bus yellow?", "What is the bus number?"], "It describes a group."],
  ["Which statistical question can be answered with a number?", "How many goals did players score this season?", ["Which team is best?", "Who is your favorite player?", "Is soccer fun?"], "Count the goals for each player."],
  ["Is 'How many players are on a basketball team on the court?' a statistical question?", "no, it has one answer", ["yes, it varies", "yes, it needs many students", "only sometimes"], "The answer is always 5."],
  ["Is 'How many shoes do students own?' a statistical question?", "yes, answers vary", ["no, it has one answer", "no, it is not about students", "only if you ask one student"], "Each student may have a different number.", true],
  ["Which is the best statistical question to learn about how long students read?", "How many minutes do students in our class read each day?", ["How long did Kai read?", "How long is a book?", "What did Kai read?"], "It asks about a whole group.", true],
  ["Which statistical question needs data from each student to answer?", "How many hours of screen time do 6th graders have each day?", ["How many hours are in a day?", "Do I like screen time?", "What is the best game?"], "You need a number from each student.", true],
  ["Data from the question 'How tall are 6th graders?' will be…", "numerical", ["categorical", "no data", "only words"], "Heights are numbers.", true],
  ["Data from the question 'What is your favorite pet?' will be…", "categorical", ["numerical", "measured in inches", "impossible to collect"], "Answers are categories like dog or cat.", true],
  ["Which turns 'Do students like math?' into a numerical question?", "How would you rate math from 1 to 5?", ["Is math your favorite?", "Do you like math?", "What is math?"], "A rating is a number.", true],
  ["A school wants to know how far students live from school. Which is the statistical question?", "How many miles do students live from school?", ["How many miles is it to Orlando?", "How far does Ana live?", "How many miles in a kilometer?"], "Many students give many distances.", true],
  ["Which question is statistical?", "How many pages are in the books on our library shelf?", ["How many pages are in this book?", "How many shelves are there? (just one shelf)", "Is this book thick?"], "Different books have different page counts.", true],
  ["Which of these has variability?", "the number of text messages students send in a day", ["the number of days in a week", "the number of sides on a hexagon", "the number of months in a year"], "The first one changes from person to person.", true],
  ["'How many cups of water do 6th graders drink in a day?' is a statistical question because…", "answers will be different for different students", ["it has one answer", "it is about water", "it uses cups"], "Variation is the key.", true],
  ["Which question about a basketball game is statistical?", "How many points did each player score?", ["What was the final score?", "Who won?", "What time did it start?"], "One number per player.", true],
  ["Which question about a class pet is NOT statistical?", "How many legs does our pet rabbit have?", ["How much does each pet in school weigh?", "How long do pets live?", "How many pets do students own?"], "A rabbit has 4 legs, always.", true],
];

const STAT_UNIT = bankUnit({
  id: "fl-g6-statistical-questions",
  title: "Statistical Questions",
  emoji: "❓",
  blurb: "Questions that need data",
  parentNote:
    "Practises Florida's B.E.S.T. benchmark MA.6.DP.1.1: recognizing and writing a statistical question, one that expects different answers and can be answered with numerical data. Try turning 'How tall is my sister?' into a question about a whole group.",
  standards: ["MA.6.DP.1.1", "recognizing and formulating a statistical question that gives numerical data"],
  items: STAT_QS,
});

function fiveNumbers() {
  const min = randInt(2, 20);
  const q1 = min + randInt(2, 10);
  const med = q1 + randInt(2, 10);
  const q3 = med + randInt(2, 10);
  const max = q3 + randInt(2, 12);
  return { min, q1, med, q3, max };
}

const boxTable = (s: ReturnType<typeof fiveNumbers>) => ({
  type: "table" as const,
  title: "Summary of the data",
  headers: ["Minimum", "Lower quartile", "Median", "Upper quartile", "Maximum"],
  rows: [[s.min, s.q1, s.med, s.q3, s.max]],
});

const boxRange: Maker = () => {
  const s = fiveNumbers();
  return num("A box plot has this summary. What is the range?", s.max - s.min, `Range = maximum − minimum = ${s.max} − ${s.min}.`, { min: 1, extra: [s.q3 - s.q1, s.max], visual: boxTable(s) });
};

const boxIqr: Maker = () => {
  const s = fiveNumbers();
  return num("What is the interquartile range (upper quartile − lower quartile)?", s.q3 - s.q1, `IQR = ${s.q3} − ${s.q1}.`, { min: 1, extra: [s.max - s.min, s.med], visual: boxTable(s) });
};

const boxMedian: Maker = () => {
  const s = fiveNumbers();
  return num("Which value is the median of the data?", s.med, "The median is the middle line inside the box.", { min: 1, extra: [s.q1, s.q3], visual: boxTable(s) });
};

const boxHalf: Maker = () => {
  const s = fiveNumbers();
  return pickOne("About what part of the data lies between the lower quartile and upper quartile?", "half", ["a quarter", "all of it", "none of it"], "The box holds the middle 50% of the data.", boxTable(s));
};

const boxQuarter: Maker = () => {
  const s = fiveNumbers();
  return pickOne(`About what part of the data is less than ${s.q1}?`, "a quarter", ["half", "three quarters", "all of it"], "A quarter of the data is at or below the lower quartile.", boxTable(s));
};

const BOX_PLOTS = mathUnit({
  id: "fl-g6-box-plots",
  title: "Box Plots",
  emoji: "📦",
  blurb: "Read the five-number summary",
  parentNote:
    "Practises Florida's B.E.S.T. benchmark MA.6.DP.1.3: reading a box plot to find the minimum, lower quartile, median, upper quartile and maximum and using them to describe how the data is spread. The box holds the middle half of the data.",
  codes: "MA.6.DP.1.3",
  text: "reading a box plot's minimum, quartiles, median and maximum to describe the data",
  makers: [boxRange, boxIqr, boxMedian, boxHalf, boxQuarter, boxIqr],
});

export const UNITS: Unit[] = [ABSOLUTE, MULT_INT, FACTOR, EXPRESSIONS, STAT_UNIT, BOX_PLOTS];
/** Put the own units before the planned ones. */
export const FIRST = false;
