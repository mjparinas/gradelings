import { describe, expect, it } from "vitest";
import { withSeed } from "@/content/random";
import type { GradeId } from "@/content/types";
import { bridgeQuestion, frenchStep } from "./bridge";
import { clockMinutes, clockRound, decoyTime, digital, handAngles, inWords, sameTime } from "./clock";
import { canadianWords } from "@/content/locale";
import { fewestPieces, formatMoney, MONEY, sayMoney, shopOrder, US_MONEY } from "./coins";
import { CANADA, mapQuestion, regionBoard, STATES, townQuestion, US_FACTS, US_REGIONS, usaBoard, type UsRegion } from "./map";
import { orderSet, spaced } from "./timeline";
import { equation, towerChoices } from "./tower";

const GRADES: GradeId[] = ["k", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const seeds = (n: number) => Array.from({ length: n }, (_, i) => i + 1);

describe("Clock Catch", () => {
  it("reads o'clock and half past in Grade 1, up to any minute in Grade 4", () => {
    expect(clockMinutes("1")).toEqual([0, 30]);
    expect(clockMinutes("2")).toEqual([0, 15, 30, 45]);
    expect(clockMinutes("3")).toHaveLength(12);
    expect(clockMinutes("4")).toHaveLength(60);
  });

  it("never drops a wrong clock that shows the right time", () => {
    for (const grade of ["1", "2", "3", "4"] as GradeId[]) {
      for (const seed of seeds(60)) {
        withSeed(seed, () => {
          const round = clockRound(grade);
          expect(clockMinutes(grade)).toContain(round.target.minute);
          expect(round.title).toContain(digital(round.target));
          for (let i = 0; i < 10; i++) {
            const d = decoyTime(grade, round.target);
            expect(sameTime(d, round.target), `${digital(d)} vs ${digital(round.target)}`).toBe(false);
            expect(d.hour).toBeGreaterThanOrEqual(1);
            expect(d.hour).toBeLessThanOrEqual(12);
            expect(clockMinutes(grade)).toContain(d.minute);
          }
        });
      }
    }
  });

  it("says the time in words and draws the hour hand between the hours", () => {
    expect(inWords({ hour: 4, minute: 0 })).toBe("4 o'clock");
    expect(inWords({ hour: 4, minute: 30 })).toBe("half past 4");
    expect(inWords({ hour: 12, minute: 45 })).toBe("quarter to 1");
    expect(inWords({ hour: 7, minute: 43 })).toBe("7:43");
    expect(handAngles({ hour: 3, minute: 30 })).toEqual({ hour: 105, minute: 180 });
    expect(handAngles({ hour: 12, minute: 0 })).toEqual({ hour: 0, minute: 0 });
  });
});

describe("Coin Shop", () => {
  it("asks for amounts in 5¢ steps that the coins on the counter can make", () => {
    for (const grade of ["1", "2", "3", "4", "5"] as GradeId[]) {
      for (const seed of seeds(80)) {
        const order = withSeed(seed, () => shopOrder(grade));
        expect(order.target % 5, `${grade} ${order.target}`).toBe(0);
        expect(order.target).toBeGreaterThan(0);
        expect(fewestPieces(order.target, order.money)).toBeLessThan(Infinity);
        if (grade === "1") expect(order.target).toBeLessThanOrEqual(50);
        if (grade === "2") expect(order.target).toBeLessThanOrEqual(100);
        if (grade === "3") {
          expect(order.target).toBeGreaterThan(100);
          expect(order.target).toBeLessThanOrEqual(500);
        }
        if (Number(grade) <= 3) expect(order.prompt).toContain(`Pay exactly ${formatMoney(order.target)}`);
        else {
          // Making change: price + change = what was paid.
          const cents = (m: string) => (m.endsWith("¢") ? Number(m.slice(0, -1)) : Math.round(Number(m.slice(1)) * 100));
          const [, price, paid] = order.prompt.match(/costs (\S+)\. They pay (\S+)\. Give/)!;
          expect(cents(paid) - cents(price)).toBe(order.target);
          expect(order.target).toBeLessThanOrEqual(grade === "4" ? 500 : 1000);
        }
      }
    }
  });

  it("only uses Canadian coins and bills, and counts the fewest pieces", () => {
    expect(MONEY.map((m) => m.cents)).toEqual([5, 10, 25, 100, 200, 500]);
    expect(fewestPieces(135, MONEY)).toBe(3);
    expect(fewestPieces(40, MONEY)).toBe(3);
    expect(fewestPieces(3, MONEY)).toBe(Infinity);
    expect(formatMoney(35)).toBe("35¢");
    expect(formatMoney(365)).toBe("$3.65");
    expect(formatMoney(500)).toBe("$5.00");
    expect(sayMoney(365)).toBe("3 dollars and 65 cents");
    expect(sayMoney(100)).toBe("1 dollar");
    expect(sayMoney(35)).toBe("35 cents");
  });
});

/** The value of a number card: whole numbers with spaces, integers, decimals, fractions, percents, powers. */
function cardValue(label: string): number {
  const t = label.replaceAll("−", "-").replaceAll(" ", "");
  const sup: Record<string, string> = { "²": "2", "³": "3", "⁴": "4", "⁵": "5" };
  const sci = t.match(/^([\d.]+)×10([²³⁴⁵])$/);
  if (sci) return Number(sci[1]) * 10 ** Number(sup[sci[2]]);
  const pow = t.match(/^(\d+)([²³⁴⁵])$/);
  if (pow) return Number(pow[1]) ** Number(sup[pow[2]]);
  if (t.endsWith("%")) return Number(t.slice(0, -1)) / 100;
  if (t.includes("/")) {
    const [n, d] = t.split("/").map(Number);
    return n / d;
  }
  return Number(t);
}

describe("Timeline Snap", () => {
  it("deals distinct cards whose numbers really go from least to greatest", () => {
    for (const grade of GRADES) {
      for (const seed of seeds(80)) {
        const set = withSeed(seed, () => orderSet(grade));
        expect(set.items.length, set.title).toBeGreaterThanOrEqual(4);
        if (grade === "k" || grade === "1") expect(set.items).toHaveLength(4);
        const labels = set.items.map((i) => i.label);
        expect(new Set(labels).size, labels.join(", ")).toBe(labels.length);
        const values = labels.map(cardValue);
        if (values.every((v) => !Number.isNaN(v))) {
          for (let i = 1; i < values.length; i++) expect(values[i], labels.join(", ")).toBeGreaterThan(values[i - 1]);
        }
      }
    }
  });

  it("keeps sequences in their real order", () => {
    const before: [string, string][] = [
      ["Egg", "Caterpillar"],
      ["Caterpillar", "Butterfly"],
      ["Tadpole", "Froglet"],
      ["Confederation", "Manitoba joins Canada"],
      ["Manitoba joins Canada", "British Columbia joins Canada"],
      ["Alberta and Saskatchewan join Canada", "Newfoundland and Labrador joins Canada"],
      ["Telephone", "First airplane flight"],
      ["First person on the Moon", "World Wide Web"],
      ["The maple leaf flag is raised", "The Charter of Rights and Freedoms"],
      ["Cell", "Tissue"],
      ["Organ", "Organ system"],
      ["Mercury", "Venus"],
      ["Jupiter", "Saturn"],
      ["Pyramids of Giza", "The Colosseum in Rome"],
    ];
    let checked = 0;
    for (const grade of GRADES) {
      for (const seed of seeds(120)) {
        const labels = withSeed(seed, () => orderSet(grade)).items.map((i) => i.label);
        for (const [a, b] of before) {
          if (labels.includes(a) && labels.includes(b)) {
            expect(labels.indexOf(a), `${a} before ${b}`).toBeLessThan(labels.indexOf(b));
            checked++;
          }
        }
      }
    }
    expect(checked).toBeGreaterThan(50);
  });

  it("writes big numbers with Canadian spacing", () => {
    expect(spaced(4321)).toBe("4321");
    expect(spaced(54321)).toBe("54 321");
    expect(spaced(-12)).toBe("−12");
  });
});

/** Puts a value into an equation's sides and checks they match. */
function balances(left: string, right: string, value: number): boolean {
  const side = (s: string) => {
    const expr = s
      .replaceAll("−", "-")
      .replaceAll("×", "*")
      .replaceAll("÷", "/")
      .replace(/(\d)([xn])/g, "$1*$2")
      .replace(/(\d)\(/g, "$1*(")
      .replace(/[□xn]/g, `(${value})`);
    expect(expr).toMatch(/^[\d\s+\-*/().]+$/);
    return Function(`return (${expr});`)() as number;
  };
  return Math.abs(side(left) - side(right)) < 1e-9;
}

describe("Equation Tower", () => {
  it("has exactly one block that balances the scale, in every grade from 2", () => {
    for (const grade of ["2", "3", "4", "5", "6", "7", "8", "9"] as GradeId[]) {
      for (const seed of seeds(150)) {
        const eq = withSeed(seed, () => equation(grade));
        expect(eq.choices).toHaveLength(4);
        expect(new Set(eq.choices).size).toBe(4);
        expect(eq.choices).toContain(eq.answer);
        expect(balances(eq.left, eq.right, eq.answer), `${eq.left} = ${eq.right}, ${eq.answer}`).toBe(true);
        for (const c of eq.choices.filter((c) => c !== eq.answer)) expect(balances(eq.left, eq.right, c), `${eq.left} = ${eq.right} with ${c}`).toBe(false);
        for (const c of eq.choices) expect(Number.isInteger(c)).toBe(true);
        if (Number(grade) <= 6) {
          expect(eq.answer).toBeGreaterThan(0);
          for (const c of eq.choices) expect(c).toBeGreaterThanOrEqual(0);
        }
        if (Number(grade) <= 4) expect(eq.unknown).toBe("□");
        if (Number(grade) >= 6) expect(eq.unknown).toBe("x");
        expect(eq.speak.length).toBeGreaterThan(0);
      }
    }
  });

  it("reaches negative answers in Grades 8 and 9, and x on both sides in Grade 9", () => {
    const answers = seeds(200).map((s) => withSeed(s, () => equation("8")).answer);
    expect(answers.some((a) => a < 0)).toBe(true);
    const nine = withSeed(3, () => equation("9"));
    expect(nine.left).toContain("x");
    expect(nine.right).toContain("x");
  });

  it("makes four different blocks even when the slips repeat the answer", () => {
    for (const answer of [0, 1, 2, 7]) {
      const blocks = towerChoices(answer, [answer, answer]);
      expect(new Set(blocks).size).toBe(4);
      expect(blocks.every((b) => b >= 0)).toBe(true);
    }
  });
});

const FEMININE: Record<string, string> = { grand: "grande", petit: "petite", joli: "jolie", beau: "belle", nouveau: "nouvelle", vert: "verte", blanc: "blanche", noir: "noire" };
const BEFORE = ["grand", "petit", "joli", "beau", "nouveau"];

describe("Word Bridge", () => {
  it("moves faster through French in Immersion than in Core French", () => {
    expect(frenchStep("1", ["immersion"])).toBe(0);
    expect(frenchStep("4", ["immersion"])).toBe(2);
    expect(frenchStep("6", ["immersion"])).toBe(3);
    expect(frenchStep("5", ["core-french"])).toBe(1);
    expect(frenchStep("9", ["core-french"])).toBe(3);
    // Both on: Immersion leads.
    expect(frenchStep("4", ["core-french", "immersion"])).toBe(2);
  });

  it("always offers the answer once among different choices", () => {
    const subjects = [["immersion"], ["core-french"]] as const;
    for (const grade of GRADES) {
      for (const s of subjects) {
        for (const seed of seeds(60)) {
          const q = withSeed(seed, () => bridgeQuestion(grade, s));
          expect(q.choices.filter((c) => c === q.answer), q.prompt).toHaveLength(1);
          expect(new Set(q.choices).size).toBe(q.choices.length);
          expect(q.choices.length).toBeGreaterThanOrEqual(2);
          expect(q.speak.length).toBeGreaterThan(0);
        }
      }
    }
  });

  it("asks Immersion questions in French, as Immersion lessons do", () => {
    for (const grade of GRADES) {
      for (const seed of seeds(40)) {
        expect(withSeed(seed, () => bridgeQuestion(grade, ["immersion"])).speakLang).toBe("fr");
      }
    }
    const core = new Set(seeds(40).map((seed) => withSeed(seed, () => bridgeQuestion("5", ["core-french"])).speakLang));
    expect(core.has("en")).toBe(true);
  });

  it("gets the grammar right", () => {
    const facts: Record<string, string> = {
      "nous ___ (être)": "sommes",
      "j'___ (avoir)": "ai",
      "ils/elles ___ (aller)": "vont",
      "vous ___ (faire)": "faites",
      "___ école": "l'",
      "___ maison": "la",
      "___ soleil": "le",
      "Elle ___ allée au parc.": "est",
      "Nous ___ mangé une pomme.": "avons",
      "une maison ___": "",
    };
    const seen = new Set<string>();
    for (const seed of seeds(600)) {
      const q = withSeed(seed, () => bridgeQuestion("9", ["immersion"]));
      seen.add(q.prompt);
      if (facts[q.prompt]) expect(q.answer, q.prompt).toBe(facts[q.prompt]);
      // Adjectives agree with the noun, and sit before or after it as they do in French.
      const adjective = q.prompt.match(/^(un|une) (___ )?(\w+)( ___)?$/);
      if (adjective) {
        const masculine = q.choices.find((c) => FEMININE[c])!;
        expect(q.choices.sort()).toEqual([masculine, FEMININE[masculine]].sort());
        expect(q.answer).toBe(adjective[1] === "une" ? FEMININE[masculine] : masculine);
        expect(!!adjective[2], q.prompt).toBe(BEFORE.includes(masculine));
      }
    }
    expect([...seen].some((p) => p.includes("(être)") || p.includes("(avoir)"))).toBe(true);
  });
});

describe("Map Dash", () => {
  it("places every province and territory on its own square", () => {
    expect(CANADA).toHaveLength(13);
    const spots = new Set(CANADA.map((p) => `${p.col},${p.row}`));
    expect(spots.size).toBe(13);
    expect(CANADA.find((p) => p.id === "sk")?.capital).toBe("Regina");
    expect(CANADA.find((p) => p.id === "nu")?.capital).toBe("Iqaluit");
  });

  it("asks town questions with exactly one right place", () => {
    const step: Record<string, [number, number]> = {
      above: [0, -1],
      below: [0, 1],
      "to the left of": [-1, 0],
      "to the right of": [1, 0],
      "north of": [0, -1],
      "south of": [0, 1],
      "west of": [-1, 0],
      "east of": [1, 0],
    };
    for (const seed of seeds(120)) {
      for (const compass of [false, true]) {
        const q = withSeed(seed, () => townQuestion(compass));
        const m = q.speak.match(/^Tap the place (.+) the (.+)$/)!;
        const [dx, dy] = step[m[1]];
        expect(m[1].includes("of") && !m[1].startsWith("to")).toBe(compass);
        const from = q.board.tiles.find((t) => t.name === m[2])!;
        const to = q.board.tiles.find((t) => t.col === from.col + dx && t.row === from.row + dy)!;
        expect(q.answers).toEqual([to.id]);
      }
    }
  });

  it("only marks real answers right on the map of Canada", () => {
    for (const grade of ["4", "5", "6", "9"] as GradeId[]) {
      for (const seed of seeds(80)) {
        const q = withSeed(seed, () => mapQuestion(grade));
        const ids = q.board.tiles.map((t) => t.id);
        for (const a of q.answers) expect(ids, q.prompt).toContain(a);
        const capital = q.prompt.match(/whose capital is (.+)$/);
        if (capital) expect(CANADA.find((p) => p.id === q.answers[0])?.capital).toBe(capital[1]);
        if (q.prompt === "Tap a Prairie province") expect(q.answers.sort()).toEqual(["ab", "mb", "sk"]);
        if (q.prompt.includes("Pacific")) expect(q.answers).toEqual(["bc"]);
        if (q.prompt.includes("west side")) expect(q.answers).toEqual(["pacific"]);
        if (q.prompt.includes("east side")) expect(q.answers).toEqual(["atlantic"]);
      }
    }
  });

  it("uses position words in Kindergarten and compass words from Grade 2", () => {
    for (const seed of seeds(30)) {
      expect(withSeed(seed, () => mapQuestion("k")).prompt).not.toMatch(/north|south|east|west/);
      const two = withSeed(seed, () => mapQuestion("2"));
      expect(two.prompt).not.toMatch(/above|below|left|right/);
    }
  });
});

describe("Map Dash in the United States", () => {
  const REGIONS = Object.keys(US_REGIONS) as UsRegion[];

  it("places all 50 states, each once, on its own square of its Census region's map", () => {
    expect(STATES).toHaveLength(50);
    expect(new Set(STATES.map((st) => st.id)).size).toBe(50);
    expect(new Set(STATES.map((st) => st.capital)).size).toBe(50);
    const count = (r: UsRegion) => STATES.filter((st) => st.region === r).length;
    expect([count("west"), count("midwest"), count("south"), count("northeast")]).toEqual([13, 12, 16, 9]);
    for (const region of REGIONS) {
      const board = regionBoard(region);
      const spots = board.tiles.map((t) => `${t.col},${t.row}`);
      expect(new Set(spots).size, region).toBe(spots.length);
      for (const t of board.tiles) {
        expect(t.col, t.id).toBeLessThan(board.cols);
        expect(t.row, t.id).toBeLessThan(board.rows);
      }
      // Small enough to tap on a phone, like the map of Canada.
      expect(board.cols).toBeLessThanOrEqual(6);
    }
    expect(STATES.find((st) => st.id === "wa")).toMatchObject({ name: "Washington", capital: "Olympia", region: "west" });
    expect(STATES.find((st) => st.id === "ny")?.capital).toBe("Albany");
  });

  it("lists every right state for a fact, and only states on that map", () => {
    for (const f of US_FACTS) {
      const ids = regionBoard(f.region).tiles.map((t) => t.id);
      for (const a of f.answers) expect(ids, f.prompt).toContain(a);
      for (const a of f.answers) expect(STATES.find((st) => st.id === a)?.region, f.prompt).toBe(f.region);
    }
    const fact = (prompt: string) => US_FACTS.find((f) => f.prompt === prompt)!.answers.sort();
    expect(fact("Tap a Four Corners state")).toEqual(["az", "co", "nm", "ut"]);
    expect(fact("Tap a New England state")).toEqual(["ct", "ma", "me", "nh", "ri", "vt"]);
    expect(fact("Tap the smallest state")).toEqual(["ri"]);
    expect(fact("Tap the largest state by area")).toEqual(["ak"]);
  });

  it("only marks real answers right, in every grade", () => {
    for (const grade of GRADES) {
      for (const seed of seeds(80)) {
        const q = withSeed(seed, () => mapQuestion(grade, "US"));
        const ids = q.board.tiles.map((t) => t.id);
        expect(q.board.kind, q.prompt).not.toBe("canada");
        for (const a of q.answers) expect(ids, q.prompt).toContain(a);
        const capital = q.prompt.match(/whose capital is (.+)$/);
        if (capital) expect(STATES.find((st) => st.id === q.answers[0])?.capital).toBe(capital[1]);
        const named = q.prompt.match(/^Tap (.+)$/)?.[1];
        const state = STATES.find((st) => st.name === named);
        if (state) expect(q.answers).toEqual([state.id]);
        const region = q.prompt.match(/^Tap the region (.+) is in$/);
        if (region) expect(q.answers).toEqual([STATES.find((st) => st.name === region[1])!.region]);
        if (q.prompt.includes("west coast")) expect(q.answers).toEqual(["pacific"]);
        if (q.prompt.includes("east coast")) expect(q.answers).toEqual(["atlantic"]);
        if (q.prompt.includes("north of the United States")) expect(q.answers).toEqual(["canada"]);
        if (q.prompt.includes("south of the United States")) expect(q.answers).toEqual(["mexico"]);
        // No provinces, territories or Canadian places in a US child's game, beyond Canada as a neighbour.
        expect(canadianWords(`${q.prompt} ${q.why}`).filter((w) => w !== "Canada"), q.prompt).toEqual([]);
      }
    }
  });

  it("keeps position and compass words for little kids, with a fire station instead of a fire hall", () => {
    let station = false;
    for (const seed of seeds(40)) {
      const k = withSeed(seed, () => mapQuestion("k", "US"));
      expect(k.board.kind).toBe("town");
      expect(k.prompt).not.toMatch(/north|south|east|west/);
      expect(k.board.tiles.map((t) => t.name)).not.toContain("fire hall");
      if (k.board.tiles.some((t) => t.name === "fire station")) station = true;
    }
    expect(station).toBe(true);
    for (const seed of seeds(40)) expect(withSeed(seed, () => townQuestion(true)).board.tiles.map((t) => t.name)).toContain("fire hall");
  });

  it("shows the regions with Canada to the north, Mexico to the south and an ocean on each coast", () => {
    const at = (id: string) => usaBoard().tiles.find((t) => t.id === id)!;
    expect(at("canada").row).toBeLessThan(at("midwest").row);
    expect(at("mexico").row).toBeGreaterThan(at("west").row);
    expect(at("pacific").col).toBeLessThan(at("west").col);
    expect(at("atlantic").col).toBeGreaterThan(at("northeast").col);
    expect(at("pacific").water && at("atlantic").water).toBe(true);
    expect(at("canada").water).toBeFalsy();
  });

  it("keeps Canadian children on the map of Canada", () => {
    for (const seed of seeds(40)) {
      const q = withSeed(seed, () => mapQuestion("5"));
      expect(q.board.kind).toBe("canada");
      expect(withSeed(seed, () => mapQuestion("5", "CA"))).toEqual(q);
    }
  });
});

describe("Coin Shop in the United States", () => {
  it("pays with US coins and bills, any number of cents, that the counter can make", () => {
    let odd = false;
    for (const grade of ["1", "2", "3", "4", "5"] as GradeId[]) {
      for (const seed of seeds(80)) {
        const order = withSeed(seed, () => shopOrder(grade, "USD"));
        expect(order.target).toBeGreaterThan(0);
        if (order.target % 5 !== 0) odd = true;
        for (const m of order.money) expect(US_MONEY, m.name).toContain(m);
        expect(order.money.map((m) => m.id)).not.toContain("loonie");
        expect(order.money.map((m) => m.id)).not.toContain("toonie");
        expect(fewestPieces(order.target, order.money), `${grade} ${order.target}`).toBeLessThan(Infinity);
        expect(canadianWords(order.prompt + order.speak)).toEqual([]);
        if (grade === "1") expect(order.target).toBeLessThanOrEqual(50);
        if (grade === "2") expect(order.target).toBeLessThanOrEqual(100);
        if (grade === "3") expect(order.target).toBeGreaterThan(100);
        if (Number(grade) >= 4) {
          const cents = (m: string) => (m.endsWith("¢") ? Number(m.slice(0, -1)) : Math.round(Number(m.slice(1)) * 100));
          const [, price, paid] = order.prompt.match(/costs (\S+)\. They pay (\S+)\. Give/)!;
          expect(cents(paid) - cents(price)).toBe(order.target);
        }
      }
    }
    expect(odd).toBe(true);
  });

  it("has pennies and a $1 bill, and counts the fewest pieces", () => {
    expect(US_MONEY.map((m) => m.cents)).toEqual([1, 5, 10, 25, 100, 500]);
    expect(US_MONEY.find((m) => m.cents === 100)).toMatchObject({ name: "$1 bill", bill: true });
    expect(fewestPieces(141, US_MONEY)).toBe(5);
    expect(fewestPieces(3, US_MONEY)).toBe(3);
    expect(sayMoney(1)).toBe("1 cent");
    expect(sayMoney(201)).toBe("2 dollars and 1 cent");
  });

  it("keeps Canadian children on Canadian money", () => {
    for (const seed of seeds(20)) expect(withSeed(seed, () => shopOrder("3", "CAD"))).toEqual(withSeed(seed, () => shopOrder("3")));
  });
});

describe("Timeline Snap and Memory Match in the United States", () => {
  it("puts US history in order instead of Canada's, with commas in big numbers", () => {
    const before: [string, string][] = [
      ["The Declaration of Independence", "The Constitution is signed"],
      ["The Constitution is signed", "The Louisiana Purchase"],
      ["California becomes a state", "Washington becomes a state"],
      ["Washington becomes a state", "Alaska and Hawaii become states"],
      ["Women win the right to vote", "Brown v. Board of Education"],
      ["Alaska and Hawaii become states", "The Civil Rights Act"],
      ["The Civil Rights Act", "The Americans with Disabilities Act"],
    ];
    let checked = 0;
    let commas = false;
    for (const grade of GRADES) {
      for (const seed of seeds(120)) {
        const set = withSeed(seed, () => orderSet(grade, "US"));
        const labels = set.items.map((i) => i.label);
        expect(canadianWords(`${set.title} ${labels.join(" ")}`), labels.join(", ")).toEqual([]);
        for (const l of labels) expect(l).not.toMatch(/\d \d{3}/);
        if (labels.some((l) => /^\d{1,3},\d{3}$/.test(l))) commas = true;
        for (const [a, b] of before) {
          if (labels.includes(a) && labels.includes(b)) {
            expect(labels.indexOf(a), `${a} before ${b}`).toBeLessThan(labels.indexOf(b));
            checked++;
          }
        }
      }
    }
    expect(checked).toBeGreaterThan(30);
    expect(commas).toBe(true);
    expect(spaced(54321, "US")).toBe("54,321");
    expect(spaced(4321, "US")).toBe("4321");
  });
});
