import type { Unit } from "../../types";
import { countingUnit as albertaG1MathCountingUnit } from "../../alberta/g1-math";
import { halvesUnit as albertaG1MathHalvesUnit } from "../../alberta/g1-math";
import { numbersTo100Unit as albertaG1MathNumbersTo100Unit } from "../../alberta/g1-math";
import { units as ontarioG1Math } from "../../ontario/g1-math";
import { G1_UNITS as washingtonMathEarlyG1_UNITS } from "../../washington/units/math-early";
import { MATH_G1 } from "../units/math-g1";

// Texas Grade 1 math. POOL is the units this course may copy from other frameworks (see ../plan/math.ts), as the
// exact unit files, so the grade's download carries only those files. OWN is the units written for Texas.
export const POOL: readonly Unit[] = [...ontarioG1Math, albertaG1MathNumbersTo100Unit, albertaG1MathCountingUnit, albertaG1MathHalvesUnit, ...washingtonMathEarlyG1_UNITS];

export const OWN: readonly Unit[] = [...MATH_G1];
