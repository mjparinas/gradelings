import { describe, expect, it } from "vitest";
import { COURSES } from "../all";
import { checkQuestion } from "../fairness/question";
import { withSeed } from "../random";
import type { ChoiceQuestion, Question } from "../types";
import { attachDiagram, bulbsLight, cellQuestions, circuitQuestions, PHASES, skyQuestions } from "./index";
import type { Diagram } from "./types";

const levels = [1, 2, 3] as const;
const seeds = Array.from({ length: 60 }, (_, i) => i + 1);

function many(make: (d: 1 | 2 | 3) => Question[]): { q: Question; d: Diagram }[] {
  const out: { q: Question; d: Diagram }[] = [];
  for (const level of levels) for (const s of seeds) for (const q of withSeed(s * 31 + level, () => make(level))) {
    expect(q.visual?.type).toBe("diagram");
    if (q.visual?.type === "diagram") out.push({ q, d: q.visual.diagram });
  }
  return out;
}

const choice = (q: Question) => q as ChoiceQuestion;
const answerLabel = (q: Question) => choice(q).choices.find((c) => c.id === choice(q).answer)!.label;

describe("picture questions are fair", () => {
  it.each([
    ["circuits", circuitQuestions],
    ["cells", cellQuestions],
    ["the sky", skyQuestions],
  ])("%s: choices, hints and a described picture", (_n, make) => {
    for (const { q } of many(make)) {
      checkQuestion(q, { grade: "6" });
      expect(q.kind).toBe("choice");
      if (q.visual?.type === "diagram") expect(q.visual.label.length).toBeGreaterThan(20);
    }
  });
});

describe("circuit questions", () => {
  it("say a circuit lights only when the loop is complete", () => {
    let lit = 0;
    let dark = 0;
    for (const { q, d } of many(circuitQuestions)) {
      if (d.kind !== "circuit" || !/^Will the/.test(q.prompt)) continue;
      const yes = answerLabel(q).startsWith("Yes");
      expect(yes, q.prompt).toBe(bulbsLight(d));
      if (yes) lit++;
      else dark++;
    }
    expect(lit).toBeGreaterThan(5);
    expect(dark).toBeGreaterThan(5);
  });

  it("know a parallel circuit keeps its other bulbs lit and a series one doesn't", () => {
    let seen = 0;
    for (const { q, d } of many(circuitQuestions)) {
      if (d.kind !== "circuit" || !/burnt out/.test(q.prompt)) continue;
      expect(answerLabel(q)).toBe(d.parallel ? "They stay lit" : "They all go out");
      expect(d.out).toBeGreaterThanOrEqual(0);
      expect(d.out).toBeLessThan(d.bulbs);
      seen++;
    }
    expect(seen).toBeGreaterThan(5);
  });

  it("name the wiring that is drawn", () => {
    for (const { q, d } of many(circuitQuestions)) {
      if (d.kind === "circuit" && /series circuit or a parallel/.test(q.prompt)) expect(answerLabel(q)).toBe(d.parallel ? "a parallel circuit" : "a series circuit");
    }
  });
});

describe("cell questions", () => {
  it("only ask about parts the drawn cell has and mark each once", () => {
    for (const { q, d } of many(cellQuestions)) {
      if (d.kind !== "cell") continue;
      const marks = d.marks ?? [];
      expect(new Set(marks.map((m) => m.letter)).size).toBe(marks.length);
      for (const m of marks) {
        if (d.cell === "animal") expect(["membrane", "nucleus", "mitochondria"]).toContain(m.part);
        else expect(["wall", "nucleus", "mitochondria", "chloroplast", "vacuole"]).toContain(m.part);
        expect(q.prompt).toContain(m.letter);
      }
      if (!marks.length) expect(answerLabel(q)).toBe(`a ${d.cell} cell`);
    }
  });

  it("name the marked part", () => {
    const names = { nucleus: "nucleus", mitochondria: "mitochondria", membrane: "cell membrane", wall: "cell wall", chloroplast: "chloroplasts", vacuole: "vacuole" };
    for (const { q, d } of many(cellQuestions)) {
      if (d.kind === "cell" && d.marks?.length && /^Which part/.test(q.prompt)) expect(answerLabel(q)).toBe(names[d.marks[0].part]);
    }
  });
});

describe("sky questions", () => {
  it("find the right spot for a phase and the right phase for a spot", () => {
    let spots = 0;
    let phases = 0;
    for (const { q, d } of many(skyQuestions)) {
      if (d.kind !== "orbit") continue;
      const asked = PHASES.find((p) => q.prompt.includes(`see a ${p}?`));
      if (asked) {
        const letter = answerLabel(q);
        expect(d.spots.find((s) => s.letter === letter)?.index, q.prompt).toBe(PHASES.indexOf(asked));
        expect(new Set(d.spots.map((s) => s.index)).size).toBe(d.spots.length);
        spots++;
      } else {
        expect(answerLabel(q)).toBe(PHASES[d.moonAt!]);
        phases++;
      }
    }
    expect(spots).toBeGreaterThan(5);
    expect(phases).toBeGreaterThan(5);
  });

  it("puts summer where the pole leans towards the Sun", () => {
    let seen = 0;
    for (const { q, d } of many(skyQuestions)) {
      if (d.kind !== "seasons") continue;
      const summer = /is summer/.test(q.prompt);
      const south = /Southern/.test(q.prompt);
      const left = answerLabel(q) === d.letters[0];
      const right = answerLabel(q) === d.letters[2];
      expect(left || right).toBe(true);
      expect(left).toBe(summer !== south);
      expect(new Set(d.letters).size).toBe(4);
      seen++;
    }
    expect(seen).toBeGreaterThan(3);
  });

  it("puts daytime on the side facing the Sun", () => {
    let seen = 0;
    for (const { q, d } of many(skyQuestions)) {
      if (d.kind !== "daynight") continue;
      const day = (a: number) => Math.cos((a * Math.PI) / 180) < 0;
      const dot = d.dots.find((p) => p.letter === answerLabel(q))!;
      expect(day(dot.angle)).toBe(/daytime/.test(q.prompt));
      for (const other of d.dots.filter((p) => p !== dot)) expect(day(other.angle)).toBe(!/daytime/.test(q.prompt));
      for (const a of d.dots) for (const b of d.dots) if (a !== b) expect(Math.abs(a.angle - b.angle)).toBeGreaterThanOrEqual(45);
      seen++;
    }
    expect(seen).toBeGreaterThan(5);
  });
});

describe("drawings for questions that describe one", () => {
  const plain = (prompt: string): Question => ({ kind: "input", prompt, hint: "h", answer: "1" });
  it("add a circuit when the words describe one and leave other questions alone", () => {
    expect(attachDiagram(plain("In a series circuit, if one bulb burns out, the others…")).visual?.type).toBe("diagram");
    expect(attachDiagram(plain("Two bulbs are connected in parallel across a 12 V battery. What is the potential difference across each bulb, in volts?")).visual).toMatchObject({ diagram: { parallel: true, bulbs: 2 } });
    expect(attachDiagram(plain("What is the basic unit of life?")).visual).toBeUndefined();
  });
  it("never replace a picture a question already has", () => {
    const q = { ...plain("In a series circuit, if one bulb burns out, the others…"), visual: { type: "emoji", emoji: "💡" } } as Question;
    expect(attachDiagram(q).visual).toEqual({ type: "emoji", emoji: "💡" });
  });
});

describe("the units that use them", () => {
  const titled = (re: RegExp) => COURSES.filter((c) => c.subject === "science").flatMap((c) => c.units.filter((u) => re.test(u.title)).map((u) => ({ c, u })));
  const hasDiagram = (u: { generate: (o: { difficulty: 1 | 2 | 3 }) => Question[] }) =>
    levels.some((difficulty) => seeds.slice(0, 5).some((s) => withSeed(s, () => u.generate({ difficulty })).some((q) => q.visual?.type === "diagram")));

  it.each([
    ["circuits", /^Circuits\b/],
    ["cells", /^Cells( &|:)/],
    ["the Moon and seasons", /Seasons (&|and) (Tides|Moon Phases)|^Earth, Moon (&|and) Sun/],
  ])("put a drawing in %s units, in every framework that has them", (_n, re) => {
    const found = titled(re).filter(({ c }) => !["k", "pk", "1", "2", "3"].includes(c.grade));
    expect(found.length).toBeGreaterThan(0);
    for (const { c, u } of found) expect(hasDiagram(u), `${c.grade} ${u.id}`).toBe(true);
  });

  it("keep every question in those units fair", () => {
    for (const { c, u } of [...titled(/^Circuits\b/), ...titled(/^Cells( &|:)/), ...titled(/^Earth, Moon (&|and) Sun/)]) {
      for (const difficulty of levels) for (const s of seeds.slice(0, 8)) for (const q of withSeed(s, () => u.generate({ difficulty }))) checkQuestion(q, c);
    }
  });
});
