import { shuffle } from "../../random";
import type { GenerateOptions, Question, Unit } from "../../types";
import { type D, type Maker } from "../../washington/units/math-kit";
import { fl } from "../cite";

export * from "../../washington/units/math-kit";

// Helpers for Florida's own math units (`fl-` ids). Each unit is a list of question makers; a set of 8 questions
// cycles through them in a shuffled order so every set mixes the kinds of question.

interface Spec {
  id: string;
  title: string;
  emoji: string;
  blurb: string;
  parentNote: string;
  /** Florida benchmark codes ("MA.4.NSO.1.2; MA.4.NSO.2.5"). */
  codes: string;
  /** A short plain description of what the unit practises. */
  text: string;
  makers: Maker[];
  size?: number;
}

export function mathUnit(spec: Spec): Unit {
  return {
    id: spec.id,
    title: spec.title,
    emoji: spec.emoji,
    blurb: spec.blurb,
    parentNote: spec.parentNote,
    standards: fl(spec.codes, spec.text),
    generate: (opts?: GenerateOptions): Question[] => {
      const d: D = opts?.difficulty ?? 2;
      const size = spec.size ?? 8;
      const out: Question[] = [];
      let pool: Maker[] = [];
      while (out.length < size) {
        if (!pool.length) pool = shuffle(spec.makers);
        out.push(pool.pop()!(d));
      }
      return out;
    },
  };
}
