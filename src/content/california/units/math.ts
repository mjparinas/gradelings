import { shuffle } from "../../random";
import type { GenerateOptions, Question, Unit } from "../../types";
import type { Maker } from "../../washington/units/math-kit";
import { cal } from "../cite";

// California-only math units, for the California additions to the Common Core that no other framework's unit
// practises: estimation in Grade 2 (2.NBT.7.1), prime factorization in Grade 5 (5.OA.2.1) and absolute-value equations
// and inequalities in Algebra I (A-REI.3.1, with A-CED.1). Every other California math unit is shared or adopted
// (../plan/math.ts). Each set of 8 questions cycles through the unit's question makers in a shuffled order.

export interface Spec {
  id: string;
  title: string;
  emoji: string;
  blurb: string;
  parentNote: string;
  codes: string;
  text: string;
  makers: Maker[];
}

export function mathUnit(spec: Spec): Unit {
  return {
    id: spec.id,
    title: spec.title,
    emoji: spec.emoji,
    blurb: spec.blurb,
    parentNote: spec.parentNote,
    standards: cal(spec.codes, spec.text),
    generate: (opts?: GenerateOptions): Question[] => {
      const d = opts?.difficulty ?? 2;
      const out: Question[] = [];
      let pool: Maker[] = [];
      while (out.length < 8) {
        if (!pool.length) pool = shuffle(spec.makers);
        out.push(pool.pop()!(d));
      }
      return out;
    },
  };
}
