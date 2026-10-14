import type { Unit } from "../../types";
import { countingUnit, halvesUnit, numbersTo100Unit } from "../../alberta/g1-math";
import { units as ontarioG1Math } from "../../ontario/g1-math";
import { G1_UNITS as washingtonMathEarly } from "../../washington/units/math-early";

// The units New York's Grade 1 math course copies from other frameworks (see ../plan/math.ts). Import only the unit
// files it adopts from, so the grade's download carries those files and not other frameworks' whole grades.
export const POOL: readonly Unit[] = [...ontarioG1Math, numbersTo100Unit, countingUnit, halvesUnit, ...washingtonMathEarly];
