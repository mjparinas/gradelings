import type { Unit } from "../../types";
import { G1_UNITS as washingtonUnitsMathEarlyG1_UNITS } from "../../washington/units/math-early";
import { UNITS as newYorkUnitsMathG1UNITS } from "../../new-york/units/math-g1";
import { countingUnit as albertaG1MathCountingUnit } from "../../alberta/g1-math";
import { halvesUnit as albertaG1MathHalvesUnit } from "../../alberta/g1-math";
import { numbersTo100Unit as albertaG1MathNumbersTo100Unit } from "../../alberta/g1-math";
import { units as ontarioG1MathUnits } from "../../ontario/g1-math";

// The units Minnesota's Grade 1 math course copies from other frameworks (see ../plan/math.ts). Import only the unit
// files it adopts from, so the grade's download carries those files and not other frameworks' whole grades.
export const POOL: readonly Unit[] = [...ontarioG1MathUnits, albertaG1MathNumbersTo100Unit, albertaG1MathCountingUnit, albertaG1MathHalvesUnit, ...newYorkUnitsMathG1UNITS, ...washingtonUnitsMathEarlyG1_UNITS];
