import type { Course, Question, Unit, Visual } from "./types";

// Drawings made from a question's own numbers. Many graph and data questions describe a picture in words ("A line
// graph shows 30 at 1 p.m., 45 at 2 p.m. ..."), and a child should see it. Each recognizer reads the prompt, and only
// when every number it needs is there does it draw the picture, so the drawing and the words can't disagree. A
// question that already has a picture is never touched, and a question that asks the child to make the graph themselves
// ("To make a line plot, how many X's go above 4?") is left alone, since drawing it would hand over the answer.

const MINUS = /[−–]/g;
const n = (s: string): number => Number(s.replace(MINUS, "-").replace(/\s+/g, ""));
const NUM = String.raw`[-−]?\d+(?:\.\d+)?`;

type Recognizer = (prompt: string) => Visual | undefined;

const nice = (v: number): number => {
  if (v <= 10) return Math.ceil(v);
  const step = v <= 50 ? 5 : v <= 100 ? 10 : 20;
  return Math.ceil(v / step) * step;
};

/** A window that holds every value, always includes 0 and leaves a little room. */
function span(values: number[], pad = 1): [number, number] {
  const lo = Math.min(0, ...values);
  const hi = Math.max(0, ...values);
  const room = Math.max(pad, (hi - lo) * 0.1);
  return [lo < 0 ? -nice(-lo + room) : 0, hi > 0 ? nice(hi + room) : 0];
}

// ---------- Line plots and line graphs ----------

const fractionValue = (s: string): number => {
  const [a, b] = s.split("/");
  return b ? Number(a) / Number(b) : Number(a);
};

/** "A line plot has 2 Xs above 1/4 inch, 3 Xs above 1/2 inch and 5 Xs above 3/4 inch." */
const linePlotGiven: Recognizer = (prompt) => {
  const m = /^A line plot has (.+?)\. /.exec(prompt);
  if (!m) return undefined;
  const parts = [...m[1].matchAll(/(\d+) Xs? above (\d+(?:\/\d+)?)(?: (inch|inches|foot|feet|cm|centimetres|centimeters|metre|metres|meters|pound|pounds|liter|liters|litre|litres|yard|yards))?/g)];
  const rest = m[1].replace(/(\d+) Xs? above (\d+(?:\/\d+)?)(?: [a-z]+)?/g, "").replace(/[,\s]|and/g, "");
  if (parts.length < 2 || rest) return undefined;
  const sorted = [...parts].sort((a, b) => fractionValue(a[2]) - fractionValue(b[2]));
  const unit = sorted.find((p) => p[3])?.[3];
  return {
    type: "linePlot",
    labels: sorted.map((p) => p[2]),
    counts: sorted.map((p) => Number(p[1])),
    caption: unit ? `Each X is one measurement, in ${unit === "inch" ? "inches" : unit}.` : "Each X is one measurement.",
  };
};

const TIME_LABEL = String.raw`\d{1,2} [ap]\.m\.|noon|midnight|(?:week|day|month|hour|year|minute) \d+|\d{4}|\d+ min`;

/** "A line graph shows 30 at 1 p.m., 45 at 2 p.m. and 60 at 3 p.m." / "reads 36 at 10 a.m. and 24 at noon" */
const lineGraphShows: Recognizer = (prompt) => {
  if (!/\b(line )?graph\b/i.test(prompt) || !/\b(shows|reads)\b/.test(prompt)) return undefined;
  const from = prompt.search(/\b(shows|reads)\b/);
  const body = prompt.slice(from);
  const re = new RegExp(String.raw`(${NUM})(?: ?(°C|°F|cm|m|kg|km))? (?:at|in) (${TIME_LABEL})`, "g");
  const found = [...body.matchAll(re)];
  if (found.length < 2) return undefined;
  const values = found.map((f) => n(f[1]));
  const [lo, hi] = span(values);
  const unit = found.find((f) => f[2])?.[2];
  return {
    type: "plot",
    xMin: 0.5,
    xMax: found.length + 0.5,
    yMin: lo,
    yMax: hi,
    yLabel: unit,
    xLabels: found.map((f) => f[3]),
    series: [{ points: values.map((y, i) => ({ x: i + 1, y })) }],
  };
};

/** "A line graph has points at (1, 4), (2, 6) and (3, 8)." */
const lineGraphPoints: Recognizer = (prompt) => {
  if (!/\bline graph\b/i.test(prompt)) return undefined;
  const pts = [...prompt.matchAll(new RegExp(String.raw`\((${NUM}), (${NUM})\)`, "g"))].map((p) => ({ x: n(p[1]), y: n(p[2]) }));
  if (pts.length < 2 || pts.length > 8) return undefined;
  const [xLo, xHi] = span(pts.map((p) => p.x));
  const [yLo, yHi] = span(pts.map((p) => p.y));
  return { type: "plot", xMin: xLo, xMax: xHi, yMin: yLo, yMax: yHi, series: [{ points: pts }] };
};

// ---------- Lines: slope, equations and systems ----------

interface Line {
  /** a·x + b·y = c */
  a: number;
  b: number;
  c: number;
}

/** "y = 3x − 5", "y = −x + 2", "y = 2x" */
function slopeIntercept(text: string): Line | undefined {
  const m = /^y = (?:([-−]?)(\d*)(x))?(?: ?([+−-]) ?(\d+))?$/.exec(text.trim());
  if (!m || (!m[3] && !m[5])) return undefined;
  const slope = m[3] ? (m[1] ? -1 : 1) * (m[2] === "" ? 1 : Number(m[2])) : 0;
  const b = m[5] === undefined ? 0 : (m[4] === "+" ? 1 : -1) * Number(m[5]);
  return { a: -slope, b: 1, c: b };
}

/** "3x + 3y = 15", "x − y = 10", "−4x − y = −15" */
function standardForm(text: string): Line | undefined {
  const m = /^(.+?) = (-?\d+|−\d+)$/.exec(text.trim());
  if (!m) return undefined;
  let a = 0;
  let b = 0;
  const terms = [...m[1].replace(/\s+/g, "").matchAll(/([+−-]?)(\d*)([xy])/g)];
  if (!terms.length || terms.map((t) => t[0]).join("") !== m[1].replace(/\s+/g, "")) return undefined;
  for (const t of terms) {
    const k = (t[1] === "−" || t[1] === "-" ? -1 : 1) * (t[2] === "" ? 1 : Number(t[2]));
    if (t[3] === "x") a += k;
    else b += k;
  }
  if (!a && !b) return undefined;
  return { a, b, c: n(m[2]) };
}

const WINDOW = 10;

/** Two points far apart on the line, so the drawing crosses the whole window. */
function ends(line: Line, lim: number): { x: number; y: number }[] {
  if (line.b === 0) return [{ x: line.c / line.a, y: -lim }, { x: line.c / line.a, y: lim }];
  return [-lim, lim].map((x) => ({ x, y: (line.c - line.a * x) / line.b }));
}

const grid = (series: Line[], lim = WINDOW): Visual => ({
  type: "plot",
  xMin: -lim,
  xMax: lim,
  yMin: -lim,
  yMax: lim,
  xStep: lim > 6 ? 2 : 1,
  yStep: lim > 6 ? 2 : 1,
  series: series.map((l) => ({ points: ends(l, lim * 3), dots: false })),
});

const POINT = String.raw`\((${NUM}), (${NUM})\)`;

/** "the line through (5, 0) and (7, 8)" */
const lineThrough: Recognizer = (prompt) => {
  if (!/slope|line through/.test(prompt)) return undefined;
  const m = new RegExp(String.raw`line through ${POINT} and ${POINT}`).exec(prompt);
  if (!m) return undefined;
  const p = [{ x: n(m[1]), y: n(m[2]) }, { x: n(m[3]), y: n(m[4]) }];
  if (p[0].x === p[1].x && p[0].y === p[1].y) return undefined;
  const [xLo, xHi] = span(p.map((q) => q.x));
  const [yLo, yHi] = span(p.map((q) => q.y));
  // Draw the whole line across the window, with the two named points marked.
  const dx = p[1].x - p[0].x;
  const dy = p[1].y - p[0].y;
  const line: Line = { a: -dy, b: dx, c: -dy * p[0].x + dx * p[0].y };
  const through = dx === 0 ? [{ x: p[0].x, y: yLo }, { x: p[0].x, y: yHi }] : [xLo, xHi].map((x) => ({ x, y: (line.c - line.a * x) / line.b }));
  return {
    type: "plot",
    xMin: xLo,
    xMax: xHi,
    yMin: yLo,
    yMax: yHi,
    series: [{ points: through, dots: false }, { points: p, line: false }],
  };
};

/** One linear equation named as a line or relation: "on the graph of y = 2x + 6", "the line y = 3x". */
const oneLine: Recognizer = (prompt) => {
  const eqs = [...prompt.matchAll(/y = [^?,.]*?(?=[?,.]| and |$|\s(?:what|which|how)\b)/gi)].map((e) => e[0].trim());
  if (eqs.length !== 1 || /\band\b.*\by =|solution of|system/.test(prompt)) return undefined;
  // "Which describes the graph of y = −6?" asks what the picture looks like, so the picture would be the answer.
  if (/describe|look like|looks like|which graph|shape/i.test(prompt)) return undefined;
  if (!/(graph of|the line|the relation|y-intercept of|slope of|the line with) y = /.test(prompt) && !/relation y = /.test(prompt)) return undefined;
  const line = slopeIntercept(eqs[0]);
  if (!line) return undefined;
  const slope = -line.a;
  if (Math.abs(slope) > 12 || Math.abs(line.c) > 30) return undefined;
  const lim = Math.abs(slope) > 3 || Math.abs(line.c) > 8 ? 20 : 10;
  return grid([line], lim);
};

/** Two equations: "How many solutions does this system have? y = 2x and y = 2x", "Solve the system: x + y = 0 and x − y = 10". */
const systemOfLines: Recognizer = (prompt) => {
  if (!/system|lines? y =|solution of both|where do the lines/i.test(prompt)) return undefined;
  const body = /Solve the system: (.+?)[.?]?$/.exec(prompt)?.[1];
  let eqs: string[];
  if (body) eqs = body.split(" and ");
  else eqs = [...prompt.matchAll(/y = [^?,.]*?(?= and |[?,.]|$)/g)].map((e) => e[0].trim());
  if (eqs.length !== 2) return undefined;
  const lines = eqs.map((e) => slopeIntercept(e) ?? standardForm(e));
  if (lines.some((l) => !l)) return undefined;
  return grid(lines as Line[]);
};

// ---------- Spinners, coins and tree diagrams ----------

const COLOURS: Record<string, string> = {
  red: "#ef4444",
  blue: "#3b82f6",
  green: "#22c55e",
  yellow: "#facc15",
  orange: "#fb923c",
  purple: "#a855f7",
  pink: "#ec4899",
};
const CYCLE = ["#ef4444", "#3b82f6", "#22c55e", "#facc15", "#a855f7", "#fb923c", "#ec4899", "#06b6d4"];
const cap = (s: string) => s[0].toUpperCase() + s.slice(1);

const numberedSpinner = (count: number): Visual => ({
  type: "spinner",
  segments: Array.from({ length: count }, (_, i) => CYCLE[i % CYCLE.length]),
  labels: Array.from({ length: count }, (_, i) => String(i + 1)),
});

const FRACTION_WORDS: Record<string, number> = { half: 1 / 2, quarter: 1 / 4, third: 1 / 3, fifth: 1 / 5 };

interface Device {
  label: string;
  outcomes: string[];
}

/** Coins, number cubes and spinners named in a sample-space question, in the order they are named. */
function devicesIn(prompt: string): Device[] {
  const out: Device[] = [];
  const re = /\b(?:a |an )?(coin|number cube|die|spinner with (\d+) equal (?:parts|sections)|spinner with red, blue and green)\b/g;
  for (const m of prompt.matchAll(re)) {
    if (m[1] === "coin") out.push({ label: "coin", outcomes: ["H", "T"] });
    else if (m[1] === "number cube" || m[1] === "die") out.push({ label: "cube", outcomes: ["1", "2", "3", "4", "5", "6"] });
    else if (m[2]) out.push({ label: "spinner", outcomes: Array.from({ length: Number(m[2]) }, (_, i) => String(i + 1)) });
    else out.push({ label: "spinner", outcomes: ["Red", "Blue", "Green"] });
  }
  return out;
}

/** "How many outcomes are in the sample space for using a coin and a spinner with 4 equal parts once each?" */
const sampleSpaceTree: Recognizer = (prompt) => {
  if (!/sample space/.test(prompt)) return undefined;
  const devices = devicesIn(prompt);
  if (devices.length < 2) return undefined;
  const stages = devices.map((d) => d.outcomes);
  // "for 2 spins": the same spinner twice.
  if (stages.reduce((k, s) => k * s.length, 1) > 24) return undefined;
  return { type: "tree", title: "Tree diagram", stages };
};

/** "A spinner has 3 equal parts. How many outcomes are in the sample space for 2 spins?" */
const repeatedSpins: Recognizer = (prompt) => {
  const m = /^A spinner has (\d+) equal parts?\..*sample space for (\d+) spins?\?/.exec(prompt);
  if (m) {
    const k = Number(m[1]);
    const spins = Number(m[2]);
    const one = Array.from({ length: k }, (_, i) => String(i + 1));
    if (k ** spins > 24 || spins < 2) return undefined;
    return { type: "tree", title: "Tree diagram", stages: Array.from({ length: spins }, () => one) };
  }
  const c = /^A spinner has (\d+) equal parts\. You spin it once and flip a coin (once|\d+ times)\./.exec(prompt);
  if (!c) return undefined;
  const flips = c[2] === "once" ? 1 : parseInt(c[2], 10);
  const stages = [Array.from({ length: Number(c[1]) }, (_, i) => String(i + 1)), ...Array.from({ length: flips }, () => ["H", "T"])];
  if (stages.reduce((k, s) => k * s.length, 1) > 24) return undefined;
  return { type: "tree", title: "Tree diagram", stages };
};

/** "A coin is tossed 2 times. A tree diagram shows every possible outcome." / "a choice of 2 shirts, then 3 pants" */
const treeDescribed: Recognizer = (prompt) => {
  const coin = /^A coin is (?:tossed|flipped) (\d+) times?\. A tree diagram/.exec(prompt);
  if (coin) {
    const k = Number(coin[1]);
    return k >= 2 && k <= 4 ? { type: "tree", stages: Array.from({ length: k }, () => ["H", "T"]) } : undefined;
  }
  const m = /tree diagram shows a choice of (\d+) (\w+), then (\d+) (\w+)(?:, then (\d+) (\w+))?\./.exec(prompt);
  if (!m) return undefined;
  const stage = (count: string, noun: string) => Array.from({ length: Number(count) }, (_, i) => `${cap(noun.replace(/s$/, ""))} ${i + 1}`);
  const stages = [stage(m[1], m[2]), stage(m[3], m[4]), ...(m[5] ? [stage(m[5], m[6])] : [])];
  return stages.reduce((k, s) => k * s.length, 1) > 24 ? undefined : { type: "tree", stages };
};

/** A single spinner described in words. */
const spinnerDescribed: Recognizer = (prompt) => {
  if (!/\bspinner\b/i.test(prompt) || /Spinner [AB]\b|spinners/.test(prompt) || (prompt.match(/\bspinner\b/gi) ?? []).length > 3) return undefined;
  if (/lands on .* with probability|times in \d+ spins|\d+ spins\. |Which colour does the spinner/.test(prompt)) return undefined;
  // "a spinner is half red, a quarter blue and a quarter green"
  const parts = [...prompt.matchAll(/\b(half|quarter|third|fifth) (red|blue|green|yellow|orange|purple|pink)\b/g)];
  if (parts.length >= 2 && /spinner is/i.test(prompt)) {
    const total = parts.reduce((s, p) => s + FRACTION_WORDS[p[1]], 0);
    if (Math.abs(total - 1) < 1e-9) {
      const slots = parts.some((p) => p[1] === "third") ? 6 : parts.some((p) => p[1] === "fifth") ? 10 : 4;
      return { type: "spinner", segments: parts.flatMap((p) => Array.from({ length: Math.round(FRACTION_WORDS[p[1]] * slots) }, () => COLOURS[p[2]])) };
    }
  }
  const numbered = /spinner (?:numbered 1 to (\d+)|has (\d+) equal (?:sections|parts) numbered 1 to \d+)/.exec(prompt) ?? /spinner with (\d+) equal (?:parts|sections)/.exec(prompt) ?? /^A spinner has (\d+) equal (?:parts|sections)\b/.exec(prompt);
  if (numbered) {
    const k = Number(numbered[1] ?? numbered[2]);
    if (k >= 2 && k <= 12) return numberedSpinner(k);
  }
  const named = /spinner with ((?:[a-z]+, )+[a-z]+ and [a-z]+|[a-z]+ and [a-z]+)\b/.exec(prompt);
  if (named) {
    const names = named[1].split(/, | and /);
    if (names.every((c) => COLOURS[c])) return { type: "spinner", segments: names.map((c) => COLOURS[c]) };
  }
  return undefined;
};

/** "Zoe spun a spinner 10 times and got blue 7 times and green 3 times." */
const spinResults: Recognizer = (prompt) => {
  const m = /spun a spinner (\d+) times and got (.+?)\. Which colour/.exec(prompt);
  if (!m) return undefined;
  const found = [...m[2].matchAll(/(red|blue|green|yellow|orange|purple|pink) (\d+) times?/g)];
  if (found.length < 2 || found.reduce((s, f) => s + Number(f[2]), 0) !== Number(m[1])) return undefined;
  return { type: "bars", title: `Results of ${m[1]} spins`, bars: found.map((f) => ({ label: cap(f[1]), value: Number(f[2]) })) };
};

const RECOGNIZERS: Recognizer[] = [
  linePlotGiven,
  lineGraphShows,
  lineGraphPoints,
  lineThrough,
  systemOfLines,
  oneLine,
  treeDescribed,
  repeatedSpins,
  sampleSpaceTree,
  spinResults,
  spinnerDescribed,
];

/** The drawing a question's prompt describes, if it is one of the shapes above. */
export function drawingFor(q: Pick<Question, "prompt" | "visual">): Visual | undefined {
  if (q.visual) return undefined;
  for (const r of RECOGNIZERS) {
    const v = r(q.prompt);
    if (v) return v;
  }
  return undefined;
}

const MARK = Symbol("drawn");

/** Adds the drawing to every question of a unit that describes one in words. */
export function withDrawing(unit: Unit): Unit {
  const generate = unit.generate as Unit["generate"] & { [MARK]?: true };
  if (generate[MARK]) return unit;
  const wrapped: Unit["generate"] & { [MARK]?: true } = (opts) =>
    generate(opts).map((q) => {
      const visual = drawingFor(q);
      return visual ? ({ ...q, visual } as Question) : q;
    });
  wrapped[MARK] = true;
  return { ...unit, generate: wrapped };
}

/** Math courses with drawings added to the questions that describe a graph or data display. */
export function withDrawings(course: Course): Course {
  return course.subject === "math" ? { ...course, units: course.units.map(withDrawing) } : course;
}
