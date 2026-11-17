import type { Question } from "@/content/types";

// Step-by-step worked solutions (flag `worked-solutions`). Scripted, not AI: a plain-arithmetic question (adding,
// subtracting, multiplying or dividing whole numbers, adding or subtracting decimals and fractions, a percent of a whole
// number) is read from its prompt and worked out one step at a time. A solution is offered only when its own final answer
// equals the question's, so working that disagrees with the answer is never shown. Practice help only: nothing here is
// logged, scored or synced.

export interface WorkedStep {
  /** What to say, in kid-facing words. */
  say: string;
  /** The board after this step, one line each. Lines from `fresh` on were drawn by this step. */
  board: string[];
  fresh: number;
}

export interface WorkedSolution {
  title: string;
  steps: WorkedStep[];
  /** The answer the working reaches, as text. */
  answer: string;
}

const NUM = String.raw`\d{1,3}(?:[ ,  ]\d{3})+(?:\.\d+)?|\d+(?:\.\d+)?`;
const OPS = String.raw`[+−\-×x*÷]`;
const EXPR = new RegExp(String.raw`^(?:What is |Add: |Subtract: |Multiply: |Divide: |Find |Work out )?\$?(${NUM})\s*(${OPS})\s*\$?(${NUM})\s*(?:=\s*☐\s*)?[?.]?\s*$`, "i");
const FRACTION = /^(?:What is |Add: |Subtract: )?(\d+)\/(\d+)\s*([+−-])\s*(\d+)\/(\d+)\s*[?.]?(?:\s.*)?$/i;
const PERCENT = /^What is (\d+)% of \$?(\d[\d ,  ]*)\?$/i;

const clean = (s: string) => s.replace(/[ ,  ]/g, "");
const nbsp = " ";

const PLACES = ["ones", "tens", "hundreds", "thousands", "ten thousands", "hundred thousands", "millions", "ten millions", "hundred millions"];
const FRAC_PLACES = ["tenths", "hundredths", "thousandths", "ten-thousandths"];

function placeName(fromRight: number, scale: number): string {
  const p = fromRight - scale;
  return p >= 0 ? (PLACES[p] ?? `10^${p} place`) : (FRAC_PLACES[-p - 1] ?? "a smaller place");
}

/** Group digits with a thin gap for reading a long number (as in the questions); the board itself uses plain digits. */
function fmt(n: number): string {
  const s = String(n);
  return s.length > 4 ? s.replace(/\B(?=(\d{3})+(?!\d))/g, nbsp) : s;
}

interface Dec {
  /** The number times 10^scale, an integer. */
  n: number;
  scale: number;
}

function parseDec(s: string): Dec {
  const t = clean(s);
  const [i, f = ""] = t.split(".");
  return { n: Number(i + f), scale: f.length };
}

function decText(n: number, scale: number): string {
  if (scale === 0) return String(n);
  const s = String(n).padStart(scale + 1, "0");
  return `${s.slice(0, -scale)}.${s.slice(-scale)}`;
}

/** Strip a trailing zero run from a decimal answer so "1.50" matches "1.5". */
function normNumber(s: string): number | null {
  const t = s.replace(/[$¢%\s,  ]/g, "").replace(/−/g, "-");
  if (/^-?\d+(\.\d+)?$/.test(t)) return Number(t);
  const f = t.match(/^(-?\d+)\/(\d+)$/);
  if (f && Number(f[2]) !== 0) return Number(f[1]) / Number(f[2]);
  return null;
}

function same(a: string, b: string): boolean {
  const x = normNumber(a);
  const y = normNumber(b);
  return x !== null && y !== null && Math.abs(x - y) < 1e-9;
}

function gcd(a: number, b: number): number {
  return b === 0 ? Math.abs(a) : gcd(b, a % b);
}

// ---------- Columns: adding and subtracting ----------

function columns(a: Dec, b: Dec): { aN: number; bN: number; da: number[]; db: number[]; scale: number } {
  const scale = Math.max(a.scale, b.scale);
  const aN = a.n * 10 ** (scale - a.scale);
  const bN = b.n * 10 ** (scale - b.scale);
  // One spare column on the left for a carry out of the top place.
  const len = Math.max(String(aN).length, String(bN).length, scale + 1) + 1;
  return { aN, bN, da: [...String(aN).padStart(len, "0")].map(Number), db: [...String(bN).padStart(len, "0")].map(Number), scale };
}

/** One row of the board: a cell per column, a point where the decimal point goes. */
function drawRow(cells: string[], scale: number, prefix = "  ", point = "."): string {
  const out = [...cells];
  if (scale > 0) out.splice(out.length - scale, 0, point);
  return prefix + out.join("");
}

function columnSolve(a: Dec, b: Dec, add: boolean): WorkedSolution | null {
  const { aN, bN, da, db, scale } = columns(a, b);
  if (!add && aN < bN) return null;
  const len = da.length;
  const ones = len - scale - 1;
  let first = 0;
  while (first < ones && da[first] === 0 && db[first] === 0) first++;
  const shown = (d: number[]) => d.map((x, i) => (i >= first ? String(x) : " "));
  const topCells = shown(da);
  const botCells = shown(db);
  const result: string[] = Array(len).fill(" ");
  const carryRow: string[] = Array(len).fill(" ");
  const rule = "─".repeat(len + (scale > 0 ? 1 : 0) + 2);
  const pointedCarry = () => drawRow(carryRow, scale, "  ", " ");
  const frame = (withResult: boolean): string[] => [
    pointedCarry(),
    drawRow(topCells, scale),
    `${add ? "+" : "−"} ${drawRow(botCells, scale, "")}`,
    rule,
    ...(withResult ? [drawRow(result, scale)] : []),
  ];
  const steps: WorkedStep[] = [
    {
      say: scale > 0
        ? `Line up the decimal points. Then ${add ? "add" : "take away"} one place at a time, starting on the right.`
        : `Line up the numbers so each place sits under the same place. Then ${add ? "add" : "take away"} one place at a time, starting on the right.`,
      board: frame(false),
      fresh: 0,
    },
  ];
  let carry = 0;
  for (let i = len - 1; i >= first; i--) {
    const name = cap(placeName(len - 1 - i, scale));
    let say: string;
    let value: number;
    if (add) {
      const total = da[i] + db[i] + carry;
      value = total % 10;
      say = `${name}: ${da[i]} + ${db[i]}${carry ? " + 1 (carried)" : ""} = ${total}.`;
      say += total >= 10 ? ` Write ${value} and carry 1 to the next place.` : ` Write ${value}.`;
      carry = total >= 10 ? 1 : 0;
      carryRow.fill(" ");
      if (carry && i > 0) carryRow[i - 1] = "1";
    } else {
      const top = da[i] - carry;
      if (top < 0) {
        // A 0 that was asked to lend: it borrows from the next place and becomes 9.
        value = 9 - db[i];
        say = `${name}: this place is 0 and was asked to lend 1, so it borrows from the next place and becomes 9. 9 − ${db[i]} = ${value}.`;
        carry = 1;
        carryRow.fill(" ");
        if (i > 0) carryRow[i - 1] = "↓";
      } else {
        const lent = carry ? ` (the top is ${top} because 1 was lent to the place before)` : "";
        if (top < db[i]) {
          value = top + 10 - db[i];
          say = `${name}: ${top} is too small to take away ${db[i]}${lent}. Borrow 1 from the next place: ${top + 10} − ${db[i]} = ${value}.`;
          carry = 1;
          carryRow.fill(" ");
          if (i > 0) carryRow[i - 1] = "↓";
        } else {
          value = top - db[i];
          say = `${name}: ${top} − ${db[i]} = ${value}${lent}.`;
          carry = 0;
          carryRow.fill(" ");
        }
      }
    }
    result[i] = String(value);
    steps.push({ say, board: frame(true), fresh: 4 });
  }
  if (add && carry) {
    // The carry out of the top place is the leading digit of the answer.
    result[first - 1 >= 0 ? first - 1 : 0] = "1";
  }
  // Leading zeros are not part of the answer.
  for (let i = 0; i < ones && (result[i] === "0" || result[i] === " "); i++) result[i] = " ";
  const answerN = add ? aN + bN : aN - bN;
  const answer = decText(answerN, scale);
  steps.push({
    say: add ? `So the answer is ${answer}.` : `So the answer is ${answer}. Check: ${answer} + ${decText(bN, scale)} = ${decText(aN, scale)}.`,
    board: frame(true),
    fresh: 4,
  });
  return { title: add ? "Adding step by step" : "Taking away step by step", steps, answer };
}

const cap = (s: string) => s[0].toUpperCase() + s.slice(1);

// ---------- Multiplying ----------

function splitPlaces(n: number): number[] {
  const s = String(n);
  const parts: number[] = [];
  for (let i = 0; i < s.length; i++) {
    const d = Number(s[i]);
    if (d) parts.push(d * 10 ** (s.length - 1 - i));
  }
  return parts;
}

function multiply(a: number, b: number): WorkedSolution | null {
  if (a === 0 || b === 0) return null;
  // Split the bigger number into place values when the other is one digit; otherwise split the second number.
  const [big, small] = String(a).length >= String(b).length ? [a, b] : [b, a];
  const smallParts = splitPlaces(small);
  const bigParts = splitPlaces(big);
  const board: string[] = [];
  const steps: WorkedStep[] = [];
  const answer = String(a * b);
  if (String(small).length === 1 && bigParts.length > 1) {
    const sum = bigParts.map(fmt).join(" + ");
    board.push(`${fmt(big)} × ${small}`, `${fmt(big)} = ${sum}`);
    steps.push({ say: `Break ${fmt(big)} into place values: ${sum}. Multiply each part by ${small}.`, board: [...board], fresh: 0 });
    const prods: number[] = [];
    for (const p of bigParts) {
      const prod = p * small;
      prods.push(prod);
      board.push(`${fmt(p)} × ${small} = ${fmt(prod)}`);
      steps.push({ say: `${fmt(p)} × ${small} = ${fmt(prod)}.`, board: [...board], fresh: board.length - 1 });
    }
    board.push(`${prods.map(fmt).join(" + ")} = ${fmt(a * b)}`);
    steps.push({ say: `Now add the parts: ${prods.map(fmt).join(" + ")} = ${fmt(a * b)}.`, board: [...board], fresh: board.length - 1 });
  } else if (smallParts.length > 1 || String(small).length > 1) {
    const sum = smallParts.map(fmt).join(" + ");
    board.push(`${fmt(big)} × ${fmt(small)}`, `${fmt(small)} = ${sum}`);
    steps.push({ say: `Break ${fmt(small)} into place values: ${sum}. Multiply ${fmt(big)} by each part.`, board: [...board], fresh: 0 });
    const prods: number[] = [];
    for (const p of smallParts) {
      const prod = big * p;
      prods.push(prod);
      board.push(`${fmt(big)} × ${fmt(p)} = ${fmt(prod)}`);
      const lead = String(p)[0];
      const zeros = String(p).length - 1;
      steps.push({
        say: zeros ? `${fmt(big)} × ${lead} = ${fmt(big * Number(lead))}. Then put ${zeros} zero${zeros > 1 ? "s" : ""} on the end because it is ${fmt(p)}: ${fmt(prod)}.` : `${fmt(big)} × ${p} = ${fmt(prod)}.`,
        board: [...board],
        fresh: board.length - 1,
      });
    }
    board.push(`${prods.map(fmt).join(" + ")} = ${fmt(a * b)}`);
    steps.push({ say: `Now add the parts: ${prods.map(fmt).join(" + ")} = ${fmt(a * b)}.`, board: [...board], fresh: board.length - 1 });
  } else {
    // Both single digits: a fact. Show it as groups.
    board.push(`${a} × ${b} = ${a * b}`);
    steps.push({ say: `${a} × ${b} means ${b} groups of ${a}, or ${a} groups of ${b}. Count them up: ${a * b}.`, board: [...board], fresh: 0 });
  }
  steps.push({ say: `So the answer is ${fmt(a * b)}.`, board: [...board, `= ${fmt(a * b)}`], fresh: board.length });
  return { title: "Multiplying step by step", steps, answer };
}

// ---------- Dividing ----------

function divide(a: number, b: number): WorkedSolution | null {
  if (b === 0 || a % b !== 0 || a === 0) return null;
  const q = a / b;
  const steps: WorkedStep[] = [];
  const board: string[] = [`${fmt(a)} ÷ ${b}`];
  if (a < b * 13) {
    board.push(`${b} × ? = ${a}`, `${b} × ${q} = ${a}`);
    steps.push({ say: `Dividing is the opposite of multiplying. Ask: ${b} times what number makes ${a}?`, board: board.slice(0, 2), fresh: 1 });
    steps.push({ say: `${b} × ${q} = ${a}, so ${a} ÷ ${b} = ${q}.`, board: [...board], fresh: 2 });
    return { title: "Dividing step by step", steps, answer: String(q) };
  }
  // Long division, one digit at a time.
  steps.push({ say: `Work through ${fmt(a)} one digit at a time, from the left. At each step ask how many ${b}s fit.`, board: [...board], fresh: 0 });
  const digits = [...String(a)].map(Number);
  let rem = 0;
  let quotient = "";
  for (let i = 0; i < digits.length; i++) {
    const cur = rem * 10 + digits[i];
    const fit = Math.floor(cur / b);
    if (!quotient && fit === 0 && i < digits.length - 1) {
      rem = cur;
      continue;
    }
    quotient += String(fit);
    const used = fit * b;
    const left = cur - used;
    board.push(`${cur} ÷ ${b} = ${fit}, ${cur} − ${used} = ${left}`);
    steps.push({
      say: `${cur} ÷ ${b}: ${b} fits ${fit} time${fit === 1 ? "" : "s"} (${b} × ${fit} = ${used}). ${cur} − ${used} = ${left} left${i < digits.length - 1 ? ", so bring down the next digit" : ""}.`,
      board: [...board],
      fresh: board.length - 1,
    });
    rem = left;
  }
  steps.push({ say: `Put the digits you found together: ${quotient}. So ${fmt(a)} ÷ ${b} = ${quotient}. Check: ${b} × ${quotient} = ${fmt(a)}.`, board: [...board, `= ${quotient}`], fresh: board.length });
  return { title: "Dividing step by step", steps, answer: quotient };
}

// ---------- Fractions ----------

function lcm(a: number, b: number): number {
  return (a / gcd(a, b)) * b;
}

function fractionOp(a: number, b: number, sign: "+" | "−", c: number, d: number): WorkedSolution | null {
  if (b === 0 || d === 0 || b > 30 || d > 30) return null;
  const l = lcm(b, d);
  const ka = l / b;
  const kc = l / d;
  const n1 = a * ka;
  const n2 = c * kc;
  const top = sign === "+" ? n1 + n2 : n1 - n2;
  if (top < 0) return null;
  const g = gcd(top, l) || 1;
  const ls = top === 0 ? "0" : g > 1 ? `${top / g}/${l / g}` : `${top}/${l}`;
  const steps: WorkedStep[] = [];
  const board: string[] = [`${a}/${b} ${sign} ${c}/${d}`];
  if (b === d) {
    steps.push({ say: `The bottoms (denominators) are already the same, ${b}, so we can ${sign === "+" ? "add" : "take away"} the tops.`, board: [...board], fresh: 0 });
  } else {
    board.push(`Common bottom: ${l}`);
    steps.push({ say: `The bottoms are different, so find a number both ${b} and ${d} go into. The smallest is ${l}.`, board: [...board], fresh: 1 });
    board.push(`${a}/${b} = ${n1}/${l}   ${c}/${d} = ${n2}/${l}`);
    steps.push({ say: `Change each fraction to have ${l} on the bottom: multiply top and bottom of ${a}/${b} by ${ka}, and of ${c}/${d} by ${kc}.`, board: [...board], fresh: 2 });
  }
  board.push(`${n1}/${l} ${sign} ${n2}/${l} = ${top}/${l}`);
  steps.push({ say: `${sign === "+" ? "Add" : "Take away"} the tops and keep the bottom: ${n1} ${sign} ${n2} = ${top}, so ${top}/${l}.`, board: [...board], fresh: board.length - 1 });
  if (g > 1 && top !== 0) {
    board.push(`${top}/${l} = ${ls}`);
    steps.push({ say: `Both ${top} and ${l} divide by ${g}, so simplify: ${ls}.`, board: [...board], fresh: board.length - 1 });
  }
  steps.push({ say: `So the answer is ${ls}.`, board: [...board], fresh: board.length });
  return { title: "Fractions step by step", steps, answer: ls };
}

// ---------- Percent of a whole number ----------

function percentOf(p: number, n: number): WorkedSolution | null {
  const prod = p * n;
  if (prod % 100 !== 0) return null;
  const res = prod / 100;
  const steps: WorkedStep[] = [];
  const board: string[] = [`${p}% of ${fmt(n)}`];
  steps.push({ say: `Percent means "out of 100", so ${p}% is ${p} out of every 100.`, board: [...board], fresh: 0 });
  board.push(`${fmt(n)} × ${p} = ${fmt(prod)}`);
  steps.push({ say: `Multiply the whole by ${p}: ${fmt(n)} × ${p} = ${fmt(prod)}.`, board: [...board], fresh: 1 });
  board.push(`${fmt(prod)} ÷ 100 = ${fmt(res)}`);
  steps.push({ say: `Then divide by 100: ${fmt(prod)} ÷ 100 = ${fmt(res)}.`, board: [...board], fresh: 2 });
  steps.push({ say: `So ${p}% of ${fmt(n)} is ${fmt(res)}.`, board: [...board], fresh: board.length });
  return { title: "Percent step by step", steps, answer: String(res) };
}

// ---------- Entry point ----------

function build(prompt: string): WorkedSolution | null {
  const text = prompt.trim();
  const pct = text.match(PERCENT);
  if (pct) return percentOf(Number(pct[1]), Number(clean(pct[2])));
  const fr = text.match(FRACTION);
  if (fr) return fractionOp(Number(fr[1]), Number(fr[2]), fr[3] === "+" ? "+" : "−", Number(fr[4]), Number(fr[5]));
  const m = text.match(EXPR);
  if (!m) return null;
  const op = m[2];
  const a = parseDec(m[1]);
  const b = parseDec(m[3]);
  const whole = a.scale === 0 && b.scale === 0;
  // Single-digit facts are for recall and have their own strategy lessons; column working would be silly there.
  if ((op === "+" || op === "−" || op === "-") && Math.max(a.n, b.n) < 10 && whole) return null;
  if (op === "+") return columnSolve(a, b, true);
  if (op === "−" || op === "-") return columnSolve(a, b, false);
  if (!whole) return null;
  if (op === "×" || op === "x" || op === "*") return multiply(a.n, b.n);
  if (op === "÷") return divide(a.n, b.n);
  return null;
}

/** The text of a question's right answer, when it has one a number can be compared with. */
function answerText(q: Question): string | null {
  if (q.kind === "input") return q.answer;
  if (q.kind === "choice") return q.choices.find((c) => c.id === q.answer)?.label ?? null;
  return null;
}

/**
 * Worked steps for a question, or null when it isn't plain arithmetic we can work out, or when the working's answer
 * disagrees with the question's own (then nothing is shown rather than something wrong).
 */
export function workedSolution(q: Question): WorkedSolution | null {
  if (q.kind !== "input" && q.kind !== "choice") return null;
  if (q.lang) return null;
  const expected = answerText(q);
  if (expected === null) return null;
  const solution = build(q.prompt);
  if (!solution || solution.steps.length < 2) return null;
  return same(solution.answer, expected) ? solution : null;
}
