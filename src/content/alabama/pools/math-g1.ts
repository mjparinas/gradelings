import type { Unit } from "../../types";
import { units as ontarioG1Math } from "../../ontario/g1-math";
import { countingUnit, halvesUnit, numbersTo100Unit } from "../../alberta/g1-math";
import { G1_UNITS as washingtonMathEarlyG1 } from "../../washington/units/math-early";
import { UNITS as newYorkMathG1 } from "../../new-york/units/math-g1";

// The units Alabama's Grade 1 math course copies from other frameworks (see ../plan/math.ts). Import only the unit
// files it adopts from, so the grade's download carries those files and not other frameworks' whole grades.
export const POOL: readonly Unit[] = [...ontarioG1Math, numbersTo100Unit, countingUnit, halvesUnit, ...washingtonMathEarlyG1, ...newYorkMathG1];
