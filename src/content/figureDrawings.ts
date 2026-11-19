import type { GenerateOptions, Question, Unit, Visual } from "./types";

// Drawings for questions that can't really be answered without seeing the tool or the figure: a protractor with the
// angle on it, a thermometer at its reading, a shape before and after a slide, flip or turn, a compass for turns, and
// an outline for line symmetry. They are made from each question's own words, so the question and the picture can't
// disagree, and they never show the answer (a picture of "the move" repeats what the prompt already says).

/** Wrap a unit's questions so each one goes through `fix` (which returns it unchanged when there is nothing to draw). */
export function drawn(generate: (opts?: GenerateOptions) => Question[], fix: (q: Question) => Question): (opts?: GenerateOptions) => Question[] {
  return (opts) => generate(opts).map(fix);
}

/** The same unit with its questions drawn. */
export function withDrawings(unit: Unit, fix: (q: Question) => Question): Unit {
  return { ...unit, generate: drawn(unit.generate, fix) };
}

/** Add `draw(prompt, question)` as the picture of a choice or typed question that has none (or only a decorative emoji). */
export function picture(draw: (prompt: string, q: Question) => Visual | undefined): (q: Question) => Question {
  return (q) => {
    if (q.kind !== "choice" && q.kind !== "input") return q;
    if (q.visual && q.visual.type !== "emoji") return q;
    const visual = draw(q.prompt, q);
    return visual ? { ...q, visual } : q;
  };
}

const minus = (s: string) => Number(s.replace("−", "-"));

// ---------- Thermometers ----------

/** Thermometers for these readings, on a scale of whole tens that has room around them. */
export function thermometer(...values: number[]): Visual {
  const lo = Math.min(...values);
  const hi = Math.max(...values);
  let min = Math.min(0, Math.floor((lo - 5) / 10) * 10);
  const max = Math.max(min + 30, Math.ceil((hi + 5) / 10) * 10);
  if (max - min < 30) min = max - 30;
  return { type: "thermometer", values, min, max };
}

const TEMP = "(−?\\d+) ?°C";

/** The thermometer questions whose numbers are in the prompt or the choices (Measuring Temperature, Grade 6 Alberta). */
export const thermometerPicture = picture((prompt, q) => {
  let m = new RegExp(`^(?:A thermometer reads|Water is at) ${TEMP}`).exec(prompt);
  if (m) return thermometer(minus(m[1]));
  m = new RegExp(`^Which is (?:hotter|warmer): ${TEMP} or ${TEMP}\\?`).exec(prompt);
  if (m) return thermometer(minus(m[1]), minus(m[2]));
  m = new RegExp(`^Water's temperature changes from ${TEMP} to ${TEMP}\\.`).exec(prompt);
  if (m) return thermometer(minus(m[1]), minus(m[2]));
  if (prompt === "Which temperature is the coldest?" && q.kind === "choice") {
    const values = q.choices.map((c) => new RegExp(`^${TEMP}$`).exec(c.label)).map((x) => (x ? minus(x[1]) : NaN));
    if (values.length === 3 && values.every((v) => Number.isFinite(v))) return thermometer(...values);
  }
  return undefined;
});

// ---------- Slides, flips and turns ----------

type Move = Extract<Visual, { type: "move" }>;

const SLIDE: Move = { type: "move", move: "slide" };
const FLIP: Move = { type: "move", move: "flip" };
const TURN: Move = { type: "move", move: "turn", degrees: 90 };

/** Slides, flips and turns described in words about a shape (Grades 2 and 3): the shape before and after. */
const MOVE_WORDS: [RegExp, Visual][] = [
  [/^A shape moves along a line to a new spot|^Another word for a slide|^When you slide a shape|^A shape slides across a table/, SLIDE],
  [/^A shape is flipped over a line|^Another word for a flip|^When you flip a shape|^A shape is flipped and then flipped back/, FLIP],
  [/^A shape spins around a point|^Another word for a turn|^A shape turns around a point|quarter turn around its centre/, TURN],
  [/^A tile moves 3 squares to the right/, { ...SLIDE, figure: "square", dx: 3 }],
  [/^A square slides to the right, then slides down/, { ...SLIDE, figure: "square", dx: 3, dy: 3 }],
  [/^A triangle is turned a quarter turn/, { ...TURN, figure: "triangle" }],
  [/^A triangle has 3 sides\. You turn it/, { ...TURN, figure: "triangle" }],
  [/^A square has 4 equal sides\. You turn it to a diamond/, { ...TURN, figure: "square", degrees: 45 }],
  [/^A hexagon has 6 sides\. You flip it over/, { ...FLIP, figure: "hexagon" }],
];

export const movePicture = picture((prompt) => {
  // A letter that is flipped: show the letter (not its mirror image, which is the answer).
  const letter = /^A letter “(\w)” is flipped/.exec(prompt);
  if (letter) return { type: "letter", text: letter[1] };
  return MOVE_WORDS.find(([re]) => re.test(prompt))?.[1];
});

// ---------- Which way am I facing? ----------

const FACING = /^\w+ faces (north|east|south|west)\./;

/** A compass showing the way the person starts out facing, for the quarter-turn and half-turn questions. */
export const compassPicture = picture((prompt) => {
  const m = FACING.exec(prompt);
  return m ? { type: "facing", facing: m[1] as "north" | "east" | "south" | "west" } : undefined;
});

// ---------- Lines of symmetry ----------

const OUTLINES: [RegExp, Visual][] = [
  [/lines of symmetry does a square have/, { type: "figure", figure: "square" }],
  [/lines of symmetry does a rectangle \(not a square\) have/, { type: "figure", figure: "rectangle" }],
  [/lines of symmetry does an equilateral triangle have/, { type: "figure", figure: "equilateral" }],
  [/lines of symmetry does an isosceles triangle have/, { type: "figure", figure: "isosceles" }],
  [/lines of symmetry does a triangle with all different side lengths have/, { type: "figure", figure: "scalene" }],
  [/lines of symmetry does a rhombus/, { type: "figure", figure: "rhombus" }],
  [/lines of symmetry does a circle have/, { type: "figure", figure: "circle" }],
  [/lines of symmetry does the letter O \(as an oval\)/, { type: "figure", figure: "oval" }],
  [/lines of symmetry does a plus sign/, { type: "figure", figure: "plus" }],
  [/^The letter (\w) has a line of symmetry/, { type: "letter", text: "" }],
  [/lines of symmetry does the letter (\w) have/, { type: "letter", text: "" }],
];

/** A drawing of the figure a symmetry question names, without any fold lines (those would give the answer away). */
export const symmetryPicture = picture((prompt) => {
  const hit = OUTLINES.find(([re]) => re.test(prompt));
  if (!hit) return undefined;
  if (hit[1].type !== "letter") return hit[1];
  const letter = /letter (\w)/.exec(prompt)?.[1];
  return letter ? { type: "letter", text: letter } : undefined;
});

/** "Which shape has no lines of symmetry?": put a small drawing on each named shape. */
export function drawChoiceShapes(q: Question): Question {
  if (q.kind !== "choice" || q.prompt !== "Which shape has no lines of symmetry?") return q;
  const names = ["square", "rectangle", "parallelogram", "triangle", "circle"];
  if (!q.choices.every((c) => names.includes(c.label))) return q;
  return { ...q, choices: q.choices.map((c) => ({ ...c, shape: c.label as NonNullable<typeof c.shape> })) };
}

// ---------- Protractors ----------

/** A protractor with one ray on 0 of the first scale and the other at `degrees` on it. */
export function protractorFromZero(degrees: number, scale: "inner" | "outer" = "inner", twoScales = false): Visual {
  return scale === "inner" ? { type: "protractor", from: 0, to: degrees, twoScales } : { type: "protractor", from: 180, to: 180 - degrees, twoScales };
}

/** A protractor with the rays at `a` and `b` on the one scale that is printed. */
export function protractorBetween(a: number, b: number): Visual {
  return { type: "protractor", from: a, to: b };
}
