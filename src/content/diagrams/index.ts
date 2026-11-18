import { chance, pick, randInt, sample, shuffle, textChoice } from "../random";
import type { Course, GenerateOptions, Question, Unit, Visual } from "../types";
import type { CellPart, Diagram } from "./types";

// Science drawings. A few units get questions that can't be answered without the picture (is this circuit complete,
// where is the Moon on its orbit, which cell part is marked A), and plain questions that describe a drawing in words
// get the drawing. Applied to every framework's science courses in `mergeCourses`, so a unit that several
// frameworks share has the same drawings in all of them. Nothing here names a place, so one set serves every region.

type Level = 1 | 2 | 3;

const letters = (n: number) => shuffle(["A", "B", "C", "D", "E"].slice(0, n));

export const drawing = (diagram: Diagram, label: string): Visual => ({ type: "diagram", diagram, label });

// ---------- Circuits ----------

type Circuit = Extract<Diagram, { kind: "circuit" }>;

export function describeCircuit(c: Circuit): string {
  const bulbs = `${c.bulbs} bulb${c.bulbs > 1 ? "s" : ""}`;
  const parts = [`a battery`, ...(c.switch === "none" ? [] : [`a switch that is ${c.switch}`]), bulbs];
  const extra = [c.gap ? " One wire does not reach the battery." : "", c.out !== undefined ? " One bulb is burnt out." : ""].join("");
  return `A ${c.parallel ? "parallel" : "series"} circuit with ${parts.slice(0, -1).join(", ")} and ${parts[parts.length - 1]}.${extra}`;
}

export const circuit = (c: Circuit): Visual => drawing(c, describeCircuit(c));

/** Does current flow, so the bulbs that aren't burnt out light? */
export function bulbsLight(c: Circuit): boolean {
  if (c.gap || c.switch === "open") return false;
  return c.parallel || c.out === undefined;
}

function litQuestion(d: Level): Question {
  const parallel = d > 1 && chance(0.5);
  const bulbs = randInt(1, d === 1 ? 2 : 3);
  const state = pick(["closed", "closed", "open", "gap"] as const);
  const c: Circuit = {
    kind: "circuit",
    parallel,
    bulbs,
    switch: state === "gap" ? "none" : state === "open" ? "open" : chance(0.6) ? "closed" : "none",
    ...(state === "gap" ? { gap: true } : {}),
  };
  const lit = bulbsLight(c);
  const noun = bulbs > 1 ? "bulbs" : "bulb";
  return textChoice(
    `Will the ${noun} light up?`,
    lit ? `Yes, the ${noun} will light` : "No, the circuit has a gap, so current can't flow",
    lit
      ? ["No, the circuit has a gap, so current can't flow", "Only if a second battery is added"]
      : [`Yes, the ${noun} will light`, "Only if a second battery is added"],
    lit
      ? "Follow the wire from the battery around the whole loop. There is no gap, so current flows and the bulbs light."
      : c.switch === "open"
        ? "An open switch leaves a gap in the loop, so the current can't get all the way around. Close the switch and the bulbs would light."
        : "Follow the wire from the battery. One wire stops short of the battery, so the loop isn't complete and no current flows.",
    circuit(c),
  );
}

function kindQuestion(d: Level): Question {
  const parallel = chance(0.5);
  const c: Circuit = { kind: "circuit", parallel, bulbs: randInt(2, 3), switch: chance(0.5) ? "closed" : "none" };
  return textChoice(
    "Is this a series circuit or a parallel circuit?",
    parallel ? "a parallel circuit" : "a series circuit",
    parallel ? ["a series circuit", ...(d > 1 ? ["an open circuit"] : [])] : ["a parallel circuit", ...(d > 1 ? ["an open circuit"] : [])],
    parallel
      ? "In a parallel circuit the current has more than one path. Each bulb is on its own branch."
      : "In a series circuit there is only one path. The current goes through every bulb, one after another.",
    circuit(c),
  );
}

function outQuestion(): Question {
  const parallel = chance(0.5);
  const bulbs = 3;
  const c: Circuit = { kind: "circuit", parallel, bulbs, switch: "closed", out: randInt(0, bulbs - 1) };
  return textChoice(
    "One bulb has burnt out. What happens to the other bulbs?",
    parallel ? "They stay lit" : "They all go out",
    parallel ? ["They all go out", "Only the bulb next to it goes out"] : ["They stay lit", "Only the bulb next to it goes out"],
    parallel
      ? "Each bulb is on its own branch. The other branches are still complete loops, so their bulbs stay lit."
      : "There is only one path. A burnt-out bulb breaks it, so the current stops everywhere.",
    circuit(c),
  );
}

export function circuitQuestions(d: Level): Question[] {
  return d === 1 ? [litQuestion(d), kindQuestion(d)] : d === 2 ? [litQuestion(d), pick([kindQuestion, outQuestion])(d)] : [outQuestion(), pick([litQuestion, kindQuestion])(d)];
}

// ---------- Cells ----------

const PART_NAME: Record<CellPart, string> = {
  nucleus: "nucleus",
  mitochondria: "mitochondria",
  membrane: "cell membrane",
  wall: "cell wall",
  chloroplast: "chloroplasts",
  vacuole: "vacuole",
};

const PART_JOB: Record<CellPart, string> = {
  nucleus: "It holds the DNA and controls the cell",
  mitochondria: "It releases energy from food",
  membrane: "It controls what goes into and out of the cell",
  wall: "It gives the plant cell its shape and strength",
  chloroplast: "It uses light to make sugar",
  vacuole: "It stores water",
};

// The wall and the membrane sit side by side in a plant cell, so a plant cell's drawing marks the wall, not the membrane.
const PARTS: Record<"plant" | "animal", CellPart[]> = {
  plant: ["wall", "nucleus", "mitochondria", "chloroplast", "vacuole"],
  animal: ["membrane", "nucleus", "mitochondria"],
};

const PART_HINT: Record<CellPart, string> = {
  nucleus: "The nucleus is the big round part near the middle of an animal cell. It holds the DNA.",
  mitochondria: "Mitochondria are the small bean-shaped parts with a wavy line inside. They release the cell's energy.",
  membrane: "The cell membrane is the thin outer edge of an animal cell.",
  wall: "The cell wall is the thick, stiff layer around the outside of a plant cell.",
  chloroplast: "Chloroplasts are the green parts with stripes. They capture light to make sugar.",
  vacuole: "The vacuole is the large blue sac in the middle of a plant cell. It stores water.",
};

function pickCell(d: Level): { cell: "plant" | "animal"; part: CellPart } {
  const cell = d === 1 ? "animal" : chance(0.5) ? "plant" : "animal";
  return { cell, part: pick(PARTS[cell]) };
}

function describeCell(cell: "plant" | "animal", letter: string): string {
  return `A ${cell} cell with one part marked ${letter}.`;
}

function partQuestion(d: Level): Question {
  const { cell, part } = pickCell(d);
  const letter = pick(["A", "B", "C", "D"]);
  const others = (["nucleus", "mitochondria", "membrane", "wall", "chloroplast", "vacuole"] as CellPart[]).filter((p) => p !== part);
  return textChoice(
    `Which part of the ${cell} cell is marked ${letter}?`,
    PART_NAME[part],
    sample(others, 3).map((p) => PART_NAME[p]),
    PART_HINT[part],
    drawing({ kind: "cell", cell, marks: [{ part, letter }] }, describeCell(cell, letter)),
  );
}

function jobQuestion(d: Level): Question {
  const { cell, part } = pickCell(d === 1 ? 2 : d);
  const letter = pick(["A", "B", "C", "D"]);
  const ban: CellPart[] = part === "wall" ? ["membrane"] : part === "membrane" ? ["wall"] : [];
  const others = (Object.keys(PART_JOB) as CellPart[]).filter((p) => p !== part && !ban.includes(p));
  return textChoice(
    `What does the part marked ${letter} do?`,
    PART_JOB[part],
    sample(others, 3).map((p) => PART_JOB[p]),
    `${PART_HINT[part]}`,
    drawing({ kind: "cell", cell, marks: [{ part, letter }] }, describeCell(cell, letter)),
  );
}

function kindOfCellQuestion(): Question {
  const cell = chance(0.5) ? "plant" : "animal";
  return textChoice(
    "Is this a plant cell or an animal cell?",
    `a ${cell} cell`,
    [`a${cell === "plant" ? "n animal" : " plant"} cell`],
    "A plant cell has a stiff wall, green chloroplasts and a big vacuole. An animal cell has none of these.",
    drawing(
      { kind: "cell", cell },
      cell === "plant"
        ? "A cell with a thick wall around it, green striped chloroplasts, a large central vacuole, a nucleus and mitochondria."
        : "A rounded cell with a nucleus and mitochondria, and no wall, chloroplasts or large vacuole.",
    ),
  );
}

export function cellQuestions(d: Level): Question[] {
  return d === 1 ? [partQuestion(d), kindOfCellQuestion()] : [pick([partQuestion, jobQuestion])(d), pick([partQuestion, jobQuestion, kindOfCellQuestion])(d)];
}

// ---------- Moon, seasons, day and night ----------

export const PHASES = ["new moon", "waxing crescent", "first quarter", "waxing gibbous", "full moon", "waning gibbous", "third quarter", "waning crescent"] as const;

const MIRROR = [4, 7, 6, 5, 0, 3, 2, 1];

const PHASE_WHY: Record<number, string> = {
  0: "The Moon is between Earth and the Sun, so the sunlit half faces away from us. We see a dark Moon.",
  1: "A bit of the sunlit half is turned towards us on the right: a thin, growing sliver.",
  2: "The Moon is a quarter of the way around its orbit. From Earth we see its right half lit.",
  3: "More than half of the face we see is lit, and it is still growing.",
  4: "The Moon is on the far side of Earth from the Sun, so the whole face we see is lit.",
  5: "More than half of the face we see is lit, and it is shrinking now.",
  6: "The Moon is three quarters of the way around its orbit. From Earth we see its left half lit.",
  7: "A thin sliver on the left is still lit and it is shrinking.",
};

function phaseFromSpot(d: Level): Question {
  const pool = d === 1 ? [0, 2, 4, 6] : [0, 1, 2, 3, 4, 5, 6, 7];
  const spot = pick(pool);
  const others = pool.filter((i) => i !== spot && (d !== 2 || i !== MIRROR[spot]));
  return textChoice(
    "The Moon is at the spot shown on its orbit. Which phase do we see from Earth's Northern Hemisphere?",
    PHASES[spot],
    sample(others, 3).map((i) => PHASES[i]),
    PHASE_WHY[spot],
    drawing({ kind: "orbit", spots: [], moonAt: spot }, `Sunlight comes from the left. Looking down on Earth, the Moon is at the spot ${spotWords(spot)} of its orbit.`),
  );
}

function spotWords(i: number): string {
  return ["between Earth and the Sun", "just below and between Earth and the Sun", "below Earth", "below and just beyond Earth", "on the far side of Earth from the Sun", "above and just beyond Earth", "above Earth", "above and between Earth and the Sun"][i];
}

function spotForPhase(d: Level): Question {
  const pool = d === 1 ? [0, 2, 4, 6] : [0, 1, 2, 3, 4, 5, 6, 7];
  const target = pick(pool);
  const spots = d === 1 ? pool : shuffle([target, ...sample(pool.filter((i) => i !== target && i !== MIRROR[target]), 3)]);
  const ids = letters(4);
  const marked = spots.map((index, i) => ({ index, letter: ids[i] }));
  const answer = marked.find((m) => m.index === target)!.letter;
  return textChoice(
    `At which spot is the Moon when we see a ${PHASES[target]}? (Sunlight comes from the left.)`,
    answer,
    ids.filter((l) => l !== answer),
    PHASE_WHY[target],
    drawing({ kind: "orbit", spots: marked }, `The Moon's orbit seen from above, with sunlight from the left and four spots marked ${[...ids].sort().join(", ")}.`),
  );
}

function seasonQuestion(d: Level): Question {
  const south = d === 3 && chance(0.5);
  const summer = chance(0.5);
  const ids = letters(4);
  // Left of the Sun the North Pole leans towards it; right of the Sun it leans away.
  const towardsSun = summer !== south;
  const answer = ids[towardsSun ? 0 : 2];
  const place = south ? "Southern" : "Northern";
  return textChoice(
    `Earth's tilt always points the same way. Which letter shows Earth when it is ${summer ? "summer" : "winter"} in the ${place} Hemisphere?`,
    answer,
    ids.filter((l) => l !== answer),
    south
      ? `In ${summer ? "summer" : "winter"} the Southern Hemisphere leans ${summer ? "towards" : "away from"} the Sun. When the North Pole leans ${towardsSun ? "towards" : "away from"} the Sun, the south leans the other way.`
      : `In ${summer ? "summer" : "winter"} the Northern Hemisphere leans ${summer ? "towards" : "away from"} the Sun. The North Pole (N) points ${summer ? "towards" : "away from"} it.`,
    drawing({ kind: "seasons", letters: ids as [string, string, string, string] }, `Earth at four places around the Sun, marked ${[...ids].sort().join(", ")}. Earth's axis tilts the same way at every place.`),
  );
}

function dayNightQuestion(): Question {
  const ids = letters(3);
  const daytime = chance(0.5);
  // One place on the side asked about and two on the other, at least 45 degrees apart so their letters never touch.
  const lone = daytime ? randInt(130, 230) : randInt(-50, 50);
  const first = daytime ? randInt(-50, 5) : randInt(130, 185);
  const second = randInt(first + 45, daytime ? 50 : 230);
  return textChoice(
    `Earth is spinning. At which place is it ${daytime ? "daytime" : "night"}?`,
    ids[0],
    [ids[1], ids[2]],
    "The side of Earth that faces the Sun has daytime. The side that faces away from the Sun is in shadow, so it has night.",
    drawing(
      {
        kind: "daynight",
        dots: [
          { letter: ids[0], angle: lone },
          { letter: ids[1], angle: first },
          { letter: ids[2], angle: second },
        ],
      },
      `Earth with the Sun on the left. Places ${[...ids].sort().join(", ")} are marked around it. The left half of Earth faces the Sun and the right half is in shadow.`,
    ),
  );
}

export function skyQuestions(d: Level): Question[] {
  const pool = d === 1 ? [phaseFromSpot, spotForPhase, dayNightQuestion] : [phaseFromSpot, spotForPhase, seasonQuestion, dayNightQuestion];
  return sample(pool, 2).map((make) => make(d));
}

// ---------- Existing questions that describe a drawing in words ----------

const SERIES_OUT = /^In a series circuit, (if one bulb (burns out|goes out)|what happens if one bulb is unscrewed)/;
const PARALLEL_OUT = /^In a parallel circuit, (if one bulb (burns out|goes out)|what happens if one bulb is unscrewed)/;

const ATTACH: [RegExp, () => Visual][] = [
  [SERIES_OUT, () => circuit({ kind: "circuit", parallel: false, bulbs: 3, switch: "closed", out: 1 })],
  [PARALLEL_OUT, () => circuit({ kind: "circuit", parallel: true, bulbs: 3, switch: "closed", out: 1 })],
  [/^Two bulbs are (connected )?in parallel/, () => circuit({ kind: "circuit", parallel: true, bulbs: 2, switch: "none" })],
  [/^Two branches of a parallel circuit/, () => circuit({ kind: "circuit", parallel: true, bulbs: 2, switch: "none" })],
  [/^Two bulbs are in series/, () => circuit({ kind: "circuit", parallel: false, bulbs: 2, switch: "none" })],
  [/^The bulb won't light\. One wire is not touching the battery/, () => circuit({ kind: "circuit", parallel: false, bulbs: 1, switch: "none", gap: true })],
  [/^A circuit where the switch is open is a/, () => circuit({ kind: "circuit", parallel: false, bulbs: 1, switch: "open" })],
  [/^A circuit with a gap in it is an/, () => circuit({ kind: "circuit", parallel: false, bulbs: 1, switch: "none", gap: true })],
];

export function attachDiagram(q: Question): Question {
  if (q.visual) return q;
  for (const [pattern, make] of ATTACH) if (pattern.test(q.prompt)) return { ...q, visual: make() };
  return q;
}

// ---------- Which units get picture questions ----------

type Maker = (d: Level) => Question[];

/** Units are picked by title, because each state has its own ids for the same topics. */
function makerFor(course: Pick<Course, "grade">, unit: Pick<Unit, "title">): Maker | undefined {
  if (["k", "pk", "1", "2", "3"].includes(course.grade)) return undefined;
  if (/^Circuits\b|^Electric Current$/.test(unit.title)) return circuitQuestions;
  if (/^Cells( &|:)/.test(unit.title)) return cellQuestions;
  if (/Seasons (&|and) (Tides|Moon Phases)|Seasons, Phases & Tides|Moon, Tides & Seasons|^Earth, Moon (&|and) Sun/.test(unit.title)) return skyQuestions;
  return undefined;
}

const SPOTS = [2, 5];

export function withDiagrams(course: Course): Course {
  if (course.subject !== "science") return course;
  return {
    ...course,
    units: course.units.map((u) => {
      const make = makerFor(course, u);
      return {
        ...u,
        generate: (opts?: GenerateOptions) => {
          const out = u.generate(opts).map(attachDiagram);
          if (!make || out.length < 4) return out;
          make(opts?.difficulty ?? 2).forEach((q, i) => {
            out[Math.min(SPOTS[i], out.length - 1)] = q;
          });
          return out;
        },
      };
    }),
  };
}
