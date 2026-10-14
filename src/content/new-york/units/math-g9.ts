import { pick, randInt, sample, shuffle } from "../../random";
import type { Unit, Visual } from "../../types";
import { type Maker, fmt, linear, num, pickOne, sp, typed } from "../../washington/units/math-kit";
import type { Q } from "../own";
import { bank, mathUnit } from "./math-kit";

// New York's own Algebra I units (`ny-` ids), for the standards no adopted unit practises: equations and inequalities
// in two variables and their graphs (AI-A.CED.2, A.REI.10, A.REI.12), comparing functions and their key features,
// including exponential growth overtaking linear and quadratic growth (AI-F.IF.4, F.IF.9, F.LE.3), forms of a quadratic
// and where a line meets a parabola (AI-F.IF.8, A.REI.7), units and a sensible level of accuracy (AI-N.Q.1, N.Q.3),
// and the correlation coefficient (AI-S.ID.8).

const pt = (x: number, y: number): string => `(${fmt(x)}, ${fmt(y)})`;
const YES_NO = ["Yes: it makes the equation true", "No: it does not make the equation true"] as const;

// ---------- Equations and inequalities in two variables (AI-A.CED.2, A.REI.10, A.REI.12) ----------

/** Is a point on the graph of y = mx + b? */
const onGraph: Maker = () => {
  const m = pick([-3, -2, -1, 2, 3, 4]);
  const b = randInt(-6, 6);
  const x = randInt(-4, 4);
  const on = pick([true, false]);
  const y = m * x + b + (on ? 0 : pick([-2, -1, 1, 2]));
  return pickOne(
    `Is ${pt(x, y)} on the graph of y = ${linear(m, b)}?`,
    on ? YES_NO[0] : YES_NO[1],
    [on ? YES_NO[1] : YES_NO[0]],
    `The graph is every point that makes the equation true. Put x = ${fmt(x)}: y = ${fmt(m * x + b)}.`,
  );
};

/** Which point is a solution of ax + by = c? */
const standardForm: Maker = () => {
  const a = randInt(1, 5);
  const b = randInt(1, 5);
  const x0 = randInt(-3, 5);
  const y0 = randInt(-3, 5);
  const c = a * x0 + b * y0;
  const sol = (x: number, y: number) => a * x + b * y === c;
  const wrong = shuffle([[x0 + 1, y0], [x0, y0 + 1], [y0, x0], [x0 - 1, y0 + 1], [-x0, y0]])
    .filter(([x, y]) => !sol(x, y))
    .slice(0, 3)
    .map(([x, y]) => pt(x, y));
  const lhs = `${a === 1 ? "" : a}x + ${b === 1 ? "" : b}y`;
  return pickOne(`Which point is on the graph of ${lhs} = ${fmt(c)}?`, pt(x0, y0), wrong, "A point is on the graph when its x and y make the equation true. Test each one.");
};

const SIGNS = [">", "≥", "<", "≤"] as const;

/** Which point is a solution of y > mx + b (or ≥, <, ≤)? */
const inequalityPoint: Maker = () => {
  const m = pick([-2, -1, 1, 2, 3]);
  const b = randInt(-4, 4);
  const s = pick(SIGNS);
  const above = s === ">" || s === "≥";
  const x = randInt(-3, 3);
  const line = m * x + b;
  const good = line + (above ? 1 : -1) * randInt(1, 4);
  const xs = [x + 1, x - 1, x + 2];
  const bad = xs.map((xx, i) => {
    const l = m * xx + b;
    return i === 0 && (s === ">" || s === "<") ? pt(xx, l) : pt(xx, l + (above ? -1 : 1) * randInt(1, 4));
  });
  return pickOne(
    `Which point is a solution of y ${s} ${linear(m, b)}?`,
    pt(x, good),
    bad,
    `Put each point in. ${above ? "y must be greater than" : "y must be less than"}${s === "≥" || s === "≤" ? " or equal to" : ""} ${linear(m, b)}.`,
  );
};

/** Dashed or solid boundary, and which side is shaded. */
const halfPlane: Maker = () => {
  const m = pick([-3, -2, -1, 1, 2, 3]);
  const b = randInt(-5, 5);
  const s = pick(SIGNS);
  if (pick([true, false])) {
    const strict = s === ">" || s === "<";
    return pickOne(
      `When you graph y ${s} ${linear(m, b)}, is the boundary line solid or dashed?`,
      strict ? "dashed: points on the line are not solutions" : "solid: points on the line are solutions",
      [strict ? "solid: points on the line are solutions" : "dashed: points on the line are not solutions", "there is no boundary line"],
      "A strict inequality (< or >) leaves the line out, so it is dashed. ≤ and ≥ include it, so it is solid.",
    );
  }
  const above = s === ">" || s === "≥";
  return pickOne(
    `When you graph y ${s} ${linear(m, b)}, which side of the line is shaded?`,
    above ? "the side above the line" : "the side below the line",
    [above ? "the side below the line" : "the side above the line", "only the line itself", "both sides"],
    "For y > or y ≥, the solutions have bigger y-values, so they lie above the line. Test (0, 0) if you are unsure.",
  );
};

/** A point in the solution of a system of two inequalities. */
const systemPoint: Maker = () => {
  const m = pick([1, 2, -1]);
  const b = randInt(-2, 2);
  const cap = randInt(4, 8);
  const x = randInt(-2, 2);
  const lo = m * x + b;
  const y = randInt(lo + 1, cap - 1 > lo + 1 ? cap - 1 : lo + 1);
  const ok = (px: number, py: number) => py > m * px + b && py < cap;
  const cands = [[x, cap + 1], [x, lo - 1], [x + 3, cap + 2], [x, lo], [x - 1, m * (x - 1) + b - 2]].filter(([px, py]) => !ok(px, py));
  if (!ok(x, y)) return systemPoint(1);
  return pickOne(
    `Which point is a solution of both y > ${linear(m, b)} and y < ${cap}?`,
    pt(x, y),
    sample(cands, 3).map(([px, py]) => pt(px, py)),
    "The solution of a system is where the two shaded half-planes overlap. The point must make both inequalities true.",
  );
};

/** Write an inequality or equation in two variables from a situation. */
const modelTwoVariables: Maker = () => {
  const kind = pick(["budget", "fee", "tickets"] as const);
  if (kind === "budget") {
    const [p, q] = sample([2, 3, 4, 5, 6, 8], 2);
    const total = pick([24, 30, 40, 48, 60]);
    return pickOne(
      `Notebooks cost $${p} and pens cost $${q}. You can spend at most $${total}. Which shows n notebooks and p pens you can buy?`,
      `${p}n + ${q}p ≤ ${total}`,
      [`${p}n + ${q}p ≥ ${total}`, `${q}n + ${p}p ≤ ${total}`, `n + p ≤ ${total}`],
      `Cost of notebooks plus cost of pens; “at most” means ≤.`,
    );
  }
  if (kind === "fee") {
    const fee = pick([25, 40, 50, 60, 75]);
    const rate = pick([15, 20, 30, 35, 45]);
    return pickOne(
      `A plumber charges $${fee} to visit plus $${rate} per hour. Which equation gives the cost C for h hours?`,
      `C = ${rate}h + ${fee}`,
      [`C = ${fee}h + ${rate}`, `C = ${rate + fee}h`, `h = ${rate}C + ${fee}`],
      "The hourly rate multiplies the hours; the visit fee is added once.",
    );
  }
  const [a, k] = [pick([8, 10, 12, 15]), pick([4, 5, 6])];
  const total = pick([600, 750, 900, 1200]);
  return pickOne(
    `Adult tickets cost $${a} and child tickets $${k}. The show took in $${sp(total)}. Which equation fits x adult and y child tickets?`,
    `${a}x + ${k}y = ${sp(total)}`,
    [`${k}x + ${a}y = ${sp(total)}`, `x + y = ${sp(total)}`, `${a + k}xy = ${sp(total)}`],
    "Money from adults plus money from children equals the total.",
  );
};

// ---------- Comparing functions (AI-F.IF.4, F.IF.9, F.LE.3) ----------

/** A linear function given by an equation against one given by a table or in words. */
const compareLinear: Maker = () => {
  const [m1, m2] = sample([2, 3, 4, 5, 6], 2);
  const [b1, b2] = sample([0, 1, 3, 5, 8, 10], 2);
  const asTable = pick([true, false]);
  const visual: Visual | undefined = asTable ? { type: "table", title: "g(x)", headers: ["x", "g(x)"], rows: [0, 1, 2, 3].map((x) => [x, m2 * x + b2]) } : undefined;
  const g = asTable ? "g (in the table)" : `g, which starts at ${b2} and goes up ${m2} for each 1 in x`;
  if (pick([true, false])) {
    const fWins = m1 > m2;
    return pickOne(`f(x) = ${linear(m1, b1)}. Compare it with ${g}. Which has the greater rate of change?`, fWins ? "f" : "g", [fWins ? "g" : "f", "they are the same"], `f's rate is its slope, ${m1}. g goes up ${m2} for each 1 in x.`, visual);
  }
  const fWins = b1 > b2;
  return pickOne(`f(x) = ${linear(m1, b1)}. Compare it with ${g}. Which has the greater y-intercept?`, fWins ? "f" : "g", [fWins ? "g" : "f", "they are the same"], `The y-intercept is the value at x = 0: f(0) = ${b1} and g(0) = ${b2}.`, visual);
};

/** A ball's height: key features from the formula and a table. */
const keyFeatures: Maker = () => {
  const k = pick([1, 2, 3]);
  const h = (t: number) => -16 * t * t + 32 * k * t;
  const visual: Visual = { type: "table", title: "Height of a ball", headers: ["t (seconds)", "h (feet)"], rows: Array.from({ length: 2 * k + 1 }, (_, t) => [t, h(t)]) };
  const kind = pick(["top", "max", "land", "rising"] as const);
  const prompt = `A ball is kicked from the ground. Its height is h(t) = −16t² + ${32 * k}t feet after t seconds.`;
  if (kind === "top") return num(`${prompt} When is it highest, in seconds?`, k, "The heights rise, then fall. Find the time with the greatest height; the table is symmetric about it.", { min: 0, extra: [2 * k, 0, k + 1], visual });
  if (kind === "max") return num(`${prompt} What is its greatest height, in feet?`, h(k), `The greatest height is at t = ${k}: h(${k}).`, { min: 0, step: 16, extra: [32 * k, h(k) * 2], visual });
  if (kind === "land") return num(`${prompt} When does it land, in seconds?`, 2 * k, "It lands when the height is 0 again, after t = 0.", { min: 0, extra: [k, 32 * k], visual });
  return pickOne(`${prompt} Over which times is the ball going up?`, `from t = 0 to t = ${k}`, [`from t = ${k} to t = ${2 * k}`, `from t = 0 to t = ${2 * k}`, "it never goes up"], "The function increases while the heights get bigger.", visual);
};

/** Exponential growth overtakes linear and quadratic growth. */
const overtakes: Maker = (d) => {
  const kind = pick(d === 1 ? (["at", "eventually"] as const) : (["at", "eventually", "first"] as const));
  const a = pick([10, 20, 50, 100]);
  if (kind === "first") {
    let x = 2;
    while (2 ** x <= a * x) x++;
    return num(`f(x) = ${a}x and g(x) = 2ˣ. Starting at x = 2, what is the first whole number x where g(x) is greater than f(x)?`, x, "Make a table: compare 2ˣ with the linear values for x = 2, 3, 4, …", { min: 2, extra: [x - 1, x + 1, a / 2], visual: { type: "table", headers: ["x", "f(x)", "g(x)"], rows: [x - 2, x - 1, x].map((v) => [v, a * v, 2 ** v]) } });
  }
  if (kind === "eventually") {
    const other = pick([`${a}x`, "x²", `${a}x + ${a}`, "100x²"]);
    return pickOne(`f(x) = ${other} and g(x) = 2ˣ. For very large x, which is greater?`, "g(x) = 2ˣ", [`f(x) = ${other}`, "they stay equal"], "A quantity that doubles each step eventually passes any linear or quadratic one.");
  }
  if (pick([true, false])) {
    const x = randInt(2, 12);
    const f = x * x;
    const g = 2 ** x;
    if (f === g) return overtakes(d);
    return pickOne(`f(x) = x² and g(x) = 2ˣ. Which is greater at x = ${x}?`, f > g ? `f: ${f} vs ${g}` : `g: ${g} vs ${f}`, [f > g ? `g: ${g} vs ${f}` : `f: ${f} vs ${g}`], `Work out both: ${x}² = ${f} and 2^${x} = ${sp(g)}.`);
  }
  const x = randInt(3, 12);
  const f = a * x;
  const g = 2 ** x;
  if (f === g) return overtakes(d);
  return pickOne(`f(x) = ${a}x and g(x) = 2ˣ. Which is greater at x = ${x}?`, f > g ? "f(x)" : "g(x)", [f > g ? "g(x)" : "f(x)", "they are equal"], `Work out both: ${a} × ${x} = ${sp(f)} and 2^${x} = ${sp(g)}.`);
};

const FEATURES: Q[] = [
  ["A graph shows a car's speed: it rises, stays level, then falls to 0. What happens to the car?", "it speeds up, keeps a steady speed, then stops", ["it drives up a hill, then down", "it goes backward at the end", "it stops, then speeds up"], "Read a graph in terms of the quantities: here, speed over time."],
  ["On a graph of temperature over a day, what does the highest point show?", "the warmest time and how warm it was", ["the time with the most change", "the coldest time", "the average temperature"], "A maximum is the greatest value of the function."],
  ["A table of a function's values goes up by 3 each time, then 3 again, then 3 again. What kind of function fits?", "linear", ["exponential", "quadratic", "none"], "Equal differences mean a constant rate of change."],
  ["f is a line with slope 4. g(x) = 3x + 10. Which grows faster?", "f", ["g", "they grow at the same rate"], "Compare the rates of change: 4 against 3."],
  ["A savings account starts with $100 and gains $20 a month. Another starts with $100 and gains 10% a month. Which is greater after 20 years?", "the one that gains 10% a month", ["the one that gains $20 a month", "they are equal"], "Growth by a percent is exponential and eventually beats steady growth.", true],
  ["Which feature tells where a graph crosses the y-axis?", "the y-intercept", ["the slope", "the maximum", "the x-intercept"], "The y-intercept is the value of the function at x = 0."],
  ["A pool drains at a steady rate until it is empty. Which graph of water level over time fits?", "a straight line going down to 0, then flat", ["a curve going up", "a straight line going up", "a flat line the whole time"], "Steady draining is a line with a negative slope.", true],
];

// ---------- Forms of a quadratic and where a line meets a parabola (AI-F.IF.8, A.REI.7) ----------

/** x² + bx + c written neatly. */
function quad(b: number, c: number): string {
  const mid = b === 0 ? "" : ` ${b < 0 ? "−" : "+"} ${Math.abs(b) === 1 ? "" : Math.abs(b)}x`;
  const end = c === 0 ? "" : ` ${c < 0 ? "−" : "+"} ${Math.abs(c)}`;
  return `x²${mid}${end}`;
}

/** (x − r) written neatly. */
const factor = (r: number): string => (r === 0 ? "x" : r > 0 ? `(x − ${r})` : `(x + ${-r})`);

/** Two different, non-zero whole-number roots. */
function roots(): [number, number] {
  const [r, s] = sample([-6, -5, -4, -3, -2, -1, 1, 2, 3, 4, 5, 6], 2);
  return r + s === 0 ? [r, -s + (s > 0 ? -1 : 1)] : [r, s];
}

/** Which form shows the zeros. */
const factoredForm: Maker = () => {
  const [r, s] = roots();
  const expanded = quad(-(r + s), r * s);
  return pickOne(
    `Which form of y = ${expanded} shows its zeros?`,
    `y = ${factor(r)}${factor(s)}`,
    [`y = ${factor(-r)}${factor(-s)}`, `y = ${factor(r)}${factor(-s)}`, `y = ${factor(-r)}${factor(s)}`],
    `Look for two numbers that multiply to ${r * s} and add to ${-(r + s)}... then check by multiplying out.`,
  );
};

/** Read the zeros from the factored form. */
const zeros: Maker = () => {
  const [r, s] = roots();
  return pickOne(
    `What are the zeros of y = ${factor(r)}${factor(s)}?`,
    `x = ${fmt(Math.min(r, s))} and x = ${fmt(Math.max(r, s))}`,
    [`x = ${fmt(Math.min(-r, -s))} and x = ${fmt(Math.max(-r, -s))}`, `x = ${fmt(r * s)}`, `x = ${fmt(r + s)}`],
    "y = 0 when one factor is 0: set each factor equal to 0.",
  );
};

/** The vertex form and the vertex. */
const vertexForm: Maker = () => {
  const h = pick([-4, -3, -2, -1, 1, 2, 3, 4, 5]);
  const k = randInt(-6, 6);
  const vf = `(x ${h > 0 ? "−" : "+"} ${Math.abs(h)})²${k === 0 ? "" : ` ${k < 0 ? "−" : "+"} ${Math.abs(k)}`}`;
  if (pick([true, false])) {
    return pickOne(`What is the vertex of y = ${vf}?`, pt(h, k), [pt(-h, k), pt(h, -k), pt(k, h)].filter((p) => p !== pt(h, k)), "In y = (x − h)² + k, the vertex is (h, k). Watch the sign inside the brackets.");
  }
  const b = -2 * h;
  const c = h * h + k;
  return pickOne(
    `Which is y = ${quad(b, c)} written in vertex form, to show its vertex?`,
    `y = ${vf}`,
    [
      `y = (x ${h > 0 ? "+" : "−"} ${Math.abs(h)})²${k === 0 ? "" : ` ${k < 0 ? "−" : "+"} ${Math.abs(k)}`}`,
      `y = (x ${h > 0 ? "−" : "+"} ${Math.abs(h)})²${c === 0 ? "" : ` ${c < 0 ? "−" : "+"} ${Math.abs(c)}`}`,
      `y = (x ${b > 0 ? "+" : "−"} ${Math.abs(b)})²${k === 0 ? "" : ` ${k < 0 ? "−" : "+"} ${Math.abs(k)}`}`,
    ],
    `Complete the square: half of ${fmt(b)} is ${fmt(b / 2)}, and (x ${h > 0 ? "−" : "+"} ${Math.abs(h)})² = ${quad(b, h * h)}. Then adjust the constant.`,
  );
};

/** Where a line meets a parabola. */
const lineMeetsParabola: Maker = (d) => {
  const [r, s] = roots();
  const c = randInt(-3, 3);
  const m = r + s;
  const b = c - r * s;
  const parabola = `y = ${quad(0, c)}`;
  const line = `y = ${linear(m, b)}`;
  const [lo, hi] = [Math.min(r, s), Math.max(r, s)];
  const at = (x: number) => pt(x, x * x + c);
  if (d === 1 || pick([true, false])) {
    return pickOne(
      `Solve the system ${parabola} and ${line}. What are the x-values where they meet?`,
      `x = ${fmt(lo)} and x = ${fmt(hi)}`,
      [`x = ${fmt(-hi)} and x = ${fmt(-lo)}`, `x = ${fmt(m)} and x = ${fmt(b)}`, `x = ${fmt(lo)} only`],
      `Set them equal: ${quad(0, c)} = ${linear(m, b)}, so ${quad(-m, c - b)} = 0. Factor: ${factor(r)}${factor(s)} = 0.`,
    );
  }
  return pickOne(
    `Where do ${parabola} and ${line} meet?`,
    `${at(lo)} and ${at(hi)}`,
    [`${at(-hi)} and ${at(-lo)}`, `${pt(lo, 0)} and ${pt(hi, 0)}`, `${at(lo)} only`],
    `Set them equal and factor to find x. Then find y from either equation.`,
  );
};

const PARABOLA_IDEAS: Q[] = [
  ["At most how many points can a line and a parabola share?", "2", ["1", "3", "infinitely many"], "Setting them equal gives a quadratic equation, which has at most 2 solutions."],
  ["A line touches a parabola at exactly one point. How many solutions does the system have?", "1", ["0", "2", "infinitely many"], "Each meeting point is one solution of the system."],
  ["Which form of a quadratic shows its vertex?", "y = a(x − h)² + k", ["y = ax² + bx + c", "y = a(x − r)(x − s)", "y = mx + b"], "Vertex form shows the vertex (h, k)."],
  ["Which form of a quadratic shows its y-intercept most directly?", "y = ax² + bx + c", ["y = a(x − h)² + k", "y = a(x − r)(x − s)", "none of them"], "In standard form, c is the value at x = 0."],
  ["A ball's height is h = −16(t − 2)² + 64. What is its greatest height?", "64", ["2", "−16", "16"], "In vertex form the vertex is (2, 64): the top of the path is 64.", true],
];

// ---------- Units and accuracy (AI-N.Q.1, N.Q.3) ----------

/** A rate with its units. */
const rateUnits: Maker = () => {
  const [what, a, b, ua, ub] = pick([
    ["A car drives", randInt(2, 6) * 60, randInt(2, 5), "miles", "hours"],
    ["A printer prints", randInt(3, 9) * 40, randInt(2, 8), "pages", "minutes"],
    ["A pump moves", randInt(2, 9) * 120, randInt(3, 8), "gallons", "minutes"],
    ["A cyclist rides", randInt(4, 9) * 30, randInt(2, 6), "kilometers", "hours"],
  ] as const);
  const total = a * b;
  return pickOne(
    `${what} ${sp(total)} ${ua} in ${b} ${ub}. What is the rate, with units?`,
    `${sp(a)} ${ua} per ${ub.replace(/s$/, "")}`,
    [`${fmt(Math.round((b / total) * 1000) / 1000)} ${ub} per ${ua.replace(/s$/, "")}`, `${sp(total * b)} ${ua} per ${ub.replace(/s$/, "")}`, `${sp(a)} ${ub} per ${ua.replace(/s$/, "")}`],
    `Rate = ${ua} ÷ ${ub}: ${sp(total)} ÷ ${b}.`,
  );
};

/** Let the units guide a two-step conversion. */
const unitChain: Maker = (d) => {
  const kind = pick(["gallons", "seconds", "price"] as const);
  if (kind === "gallons") {
    const r = randInt(2, 9);
    const h = randInt(2, 6);
    const prompt = `A hose sprays ${r} gallons per minute. How many gallons in ${h} hours?`;
    const hint = `(gallons/minute) × (minutes/hour) × hours = gallons: ${r} × 60 × ${h}.`;
    if (d === 3) return typed(prompt, r * 60 * h, hint);
    return num(prompt, r * 60 * h, hint, { min: 1, extra: [r * h, r * 60, (r * h) / 60].filter(Number.isInteger), label: sp });
  }
  if (kind === "seconds") {
    const h = randInt(2, 9);
    return num(`How many seconds are in ${h} hours?`, h * 3600, `${h} hours × 60 minutes per hour × 60 seconds per minute.`, { min: 1, extra: [h * 60, h * 360, h * 600], label: sp });
  }
  const p = pick([3, 4, 5, 6, 8]);
  const oz = pick([32, 48, 64, 80]);
  return num(`Coffee costs $${p} per pound. There are 16 ounces in a pound. What do ${oz} ounces cost, in dollars?`, (p * oz) / 16, `${oz} ounces ÷ 16 ounces per pound = ${oz / 16} pounds. Then × $${p} per pound.`, { min: 1, extra: [p * oz, p * 16, oz / 16] });
};

/** Report a calculated value to a sensible accuracy. */
const accuracy: Maker = () => {
  const kind = pick(["share", "scale", "area"] as const);
  if (kind === "share") {
    const total = pick([100, 50, 200, 10]);
    const n = pick([3, 6, 7]);
    const exact = total / n;
    return pickOne(
      `$${total} is shared equally by ${n} people. A calculator shows ${exact.toFixed(7)}. How should you report each share?`,
      `$${exact.toFixed(2)}`,
      [`$${exact.toFixed(5)}`, `$${Math.round(exact * 10) / 10}`, `$${exact.toFixed(7)}`],
      "Money is reported to the nearest cent: two decimal places.",
    );
  }
  if (kind === "scale") {
    const kg = randInt(400, 900) / 10;
    const extra = randInt(1, 999);
    return pickOne(
      `A scale measures to the nearest 0.1 kg. A calculation from its readings gives ${kg.toFixed(1)}${String(extra).padStart(3, "0")} kg. Which report is sensible?`,
      `${kg.toFixed(1)} kg`,
      [`${kg.toFixed(1)}${String(extra).padStart(3, "0")} kg`, `${Math.round(kg / 10) * 10} kg`, `${kg.toFixed(1)}0 kg`].filter((x, i, all) => all.indexOf(x) === i),
      "Don't report more accuracy than the tool measured: the scale reads to tenths.",
    );
  }
  const a = randInt(101, 149) / 10;
  const b = randInt(81, 119) / 10;
  const area = a * b;
  return pickOne(
    `A room is measured as ${a.toFixed(1)} ft by ${b.toFixed(1)} ft to the nearest tenth of a foot. Which area is a sensible report?`,
    `about ${Math.round(area)} square feet`,
    [`${area.toFixed(4)} square feet exactly`, `about ${Math.round(a + b)} square feet`, `about ${Math.round(area * 2)} square feet`],
    `${a.toFixed(1)} × ${b.toFixed(1)} = ${area.toFixed(2)}. The measurements are only to the nearest tenth, so extra decimal places are not meaningful.`,
  );
};

const UNITS_IDEAS: Q[] = [
  ["In d = rt, d is in meters and t is in seconds. What unit is r?", "meters per second", ["seconds per meter", "meters × seconds", "meters"], "r = d ÷ t, so its unit is meters ÷ seconds."],
  ["Density is mass ÷ volume. A mass in grams and a volume in cm³ give a density in…", "grams per cm³", ["cm³ per gram", "grams × cm³", "cm³"], "Divide the units the same way you divide the numbers."],
  ["Data runs from 2,300 to 9,800. Which y-axis fits best?", "0 to 10,000, counting by 1,000", ["0 to 100, counting by 10", "0 to 1,000,000, counting by 100,000", "2,300 to 2,400, counting by 10"], "The scale should cover all the data with even steps that are easy to read."],
  ["A graph of a town's population from 1990 to 2020 starts its time axis at 1990. Why?", "the data starts in 1990, so the axis need not start at year 0", ["the town was founded in 1990", "every graph must start at 1990", "it makes the population bigger"], "Choose an origin and scale that fit the data."],
  ["Which unit makes sense for a car's fuel economy?", "miles per gallon", ["gallons per hour per mile", "miles × gallons", "pounds per mile"], "Fuel economy is distance per amount of fuel."],
  ["Which accuracy makes sense for the length of a soccer field?", "to the nearest yard", ["to the nearest thousandth of an inch", "to the nearest mile", "to the nearest light-year"], "Choose an accuracy that fits the tool and the purpose."],
  ["A recipe needs 2.37829 cups of flour, by a calculator. What should you measure?", "about 2 3/8 cups", ["exactly 2.37829 cups", "about 20 cups", "about 1/4 cup"], "Measuring cups can't show 5 decimal places; round to a measure you can use.", true],
];

// ---------- The correlation coefficient (AI-S.ID.8) ----------

type Band = "strong positive" | "weak positive" | "strong negative" | "weak negative" | "almost no linear";
const BANDS: Band[] = ["strong positive", "weak positive", "strong negative", "weak negative", "almost no linear"];

/** A value of r that is clearly in one band. */
function rIn(band: Band): number {
  const mag = band.startsWith("strong") ? randInt(85, 98) : band.startsWith("weak") ? randInt(20, 35) : randInt(0, 5);
  const sign = band.endsWith("negative") || (band === "almost no linear" && pick([true, false])) ? -1 : 1;
  return (sign * mag) / 100;
}
const rText = (r: number): string => (r < 0 ? `−${Math.abs(r).toFixed(2)}` : r.toFixed(2));

/** Describe a correlation from r. */
const describeR: Maker = () => {
  const band = pick(BANDS);
  const r = rIn(band);
  const label = (b: Band) => `${b} correlation`;
  return pickOne(
    `Technology gives a correlation coefficient of r = ${rText(r)}. How would you describe it?`,
    label(band),
    sample(BANDS.filter((b) => b !== band), 3).map(label),
    "The sign gives the direction. Close to 1 or −1 is strong; close to 0 means little or no linear relationship.",
  );
};

/** Which r shows the strongest linear relationship? */
const strongest: Maker = () => {
  const strong = rIn(pick(["strong positive", "strong negative"]));
  const rest = [rIn("weak positive"), rIn("weak negative"), rIn("almost no linear")];
  return pickOne(
    "Which correlation coefficient shows the strongest linear relationship?",
    `r = ${rText(strong)}`,
    rest.map((r) => `r = ${rText(r)}`),
    "Strength depends on how close r is to 1 or −1, not on its sign.",
  );
};

/** Interpret r in context. */
const CONTEXTS = [
  ["hours of practice", "free throws made"],
  ["outdoor temperature", "heating bill"],
  ["age of a car", "its value"],
  ["shoe size", "test score"],
  ["minutes of exercise", "resting heart rate"],
  ["hours of sunlight", "plant growth"],
] as const;

const interpretR: Maker = () => {
  const [x, y] = pick(CONTEXTS);
  const band = pick(BANDS);
  const r = rIn(band);
  const right =
    band === "almost no linear"
      ? `${y} has almost no linear relationship with ${x}`
      : `${y} tends to ${band.endsWith("positive") ? "rise" : "fall"} as ${x} rises, ${band.startsWith("strong") ? "and the points lie close to a line" : "but the points are widely scattered"}`;
  const wrong = [
    `${x} causes ${y} to change`,
    band.endsWith("positive") ? `${y} tends to fall as ${x} rises` : `${y} tends to rise as ${x} rises, and the points lie close to a line`,
    `${Math.round(Math.abs(r) * 100)}% of the points are on the line`,
  ];
  return pickOne(`For ${x} (x) and ${y} (y), r = ${rText(r)}. What does this tell you?`, right, wrong, "r tells the direction and strength of a linear pattern. It never shows cause on its own.");
};

const CORRELATION_IDEAS: Q[] = [
  ["Which values can a correlation coefficient r take?", "any number from −1 to 1", ["any number from 0 to 100", "only 0 or 1", "any positive number"], "r is always between −1 and 1."],
  ["r = 1 means the points…", "lie exactly on a line that goes up", ["are scattered with no pattern", "lie exactly on a line that goes down", "form a circle"], "r = 1 is a perfect positive linear correlation."],
  ["r = −1 means the points…", "lie exactly on a line that goes down", ["lie exactly on a line that goes up", "have no pattern", "are all the same"], "r = −1 is a perfect negative linear correlation."],
  ["Ice cream sales and swimming pool visits have r = 0.9. Does buying ice cream cause pool visits?", "No: a strong correlation does not show cause; hot weather may drive both", ["Yes, because r is close to 1", "Yes, because r is positive", "No, because r must be 1 to show cause"], "Correlation is not causation."],
  ["A scatter plot curves like a U, and r is close to 0. What does this tell you?", "there is no linear relationship, though there may be a curved one", ["there is no relationship of any kind", "the data is wrong", "the relationship is strongly linear"], "r only measures linear patterns.", true],
  ["How do you usually find r for a data set?", "with technology, such as a graphing calculator or spreadsheet", ["by counting the points", "by finding the slope", "by measuring the line with a ruler"], "r is calculated from all the data; technology does the work."],
];

export const UNITS: Unit[] = [
  mathUnit({
    id: "ny-g9-two-variable-inequalities",
    title: "Graphs of Equations & Inequalities",
    emoji: "📐",
    blurb: "Lines, half-planes and systems",
    parentNote: "Writing equations and inequalities in two variables from real situations, knowing that a graph is every point that makes the equation true, and graphing inequalities as shaded half-planes with solid or dashed lines.",
    codes: "AI-A.CED.2; AI-A.REI.10; AI-A.REI.12",
    text: "creating equations and inequalities in two variables, understanding a graph as the set of all solutions, and graphing linear inequalities and systems of them as half-planes",
    makers: [onGraph, standardForm, inequalityPoint, halfPlane, halfPlane, systemPoint, modelTwoVariables, modelTwoVariables],
  }),
  mathUnit({
    id: "ny-g9-comparing-functions",
    title: "Comparing Functions",
    emoji: "📈",
    blurb: "Key features and growth",
    parentNote: "Reading key features of a function from a formula, a table or a graph (highest point, when it rises, intercepts), comparing two functions shown in different ways, and seeing that exponential growth eventually passes linear and quadratic growth.",
    codes: "AI-F.IF.4; AI-F.IF.9; AI-F.LE.3",
    text: "interpreting key features of functions in context, comparing functions shown in different ways, and seeing that exponential growth eventually exceeds linear and quadratic growth",
    makers: [compareLinear, compareLinear, keyFeatures, keyFeatures, overtakes, overtakes, bank(FEATURES)],
  }),
  mathUnit({
    id: "ny-g9-parabolas",
    title: "Parabolas & Lines",
    emoji: "🎯",
    blurb: "Forms of a quadratic and where a line meets it",
    parentNote: "Rewriting a quadratic in factored form to show its zeros and in vertex form to show its vertex, and solving a system of a line and a parabola by setting them equal and factoring.",
    codes: "AI-F.IF.8; AI-A.REI.7",
    text: "writing quadratic functions in equivalent forms to show zeros and the vertex, and solving a system of a linear and a quadratic equation",
    makers: [factoredForm, zeros, vertexForm, vertexForm, lineMeetsParabola, lineMeetsParabola, bank(PARABOLA_IDEAS)],
  }),
  mathUnit({
    id: "ny-g9-units-accuracy",
    title: "Units & Accuracy",
    emoji: "📏",
    blurb: "Let the units guide you",
    parentNote: "Using units to set up and check multi-step problems (gallons per minute times minutes), choosing sensible scales for graphs, and reporting answers to an accuracy that fits the measurements.",
    codes: "AI-N.Q.1; AI-N.Q.3",
    text: "using units to guide multi-step problems, formulas and graph scales, and choosing a level of accuracy that fits the measurements",
    makers: [rateUnits, unitChain, unitChain, accuracy, accuracy, bank(UNITS_IDEAS), bank(UNITS_IDEAS)],
  }),
  mathUnit({
    id: "ny-g9-correlation",
    title: "The Correlation Coefficient",
    emoji: "🔗",
    blurb: "What r tells you",
    parentNote: "Reading the correlation coefficient r that technology gives for a line of best fit: its sign shows direction, its closeness to 1 or −1 shows strength, and it never shows cause on its own.",
    codes: "AI-S.ID.8",
    text: "calculating the correlation coefficient of a linear fit with technology and interpreting it",
    makers: [describeR, describeR, strongest, interpretR, interpretR, bank(CORRELATION_IDEAS)],
  }),
];
