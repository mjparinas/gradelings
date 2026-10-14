import type { Unit } from "../../types";
import { G6_UNITS as washingtonUnitsMathUpperG6_UNITS } from "../../washington/units/math-upper";
import { G7_UNITS as washingtonUnitsMathUpperG7_UNITS } from "../../washington/units/math-upper";
import { units as albertaG7MathUnits } from "../../alberta/g7-math";
import { units as ontarioG7MathUnits } from "../../ontario/g7-math";

// The units Minnesota's Grade 7 math course copies from other frameworks (see ../plan/math.ts). Import only the unit
// files it adopts from, so the grade's download carries those files and not other frameworks' whole grades.
export const POOL: readonly Unit[] = [...ontarioG7MathUnits, ...albertaG7MathUnits, ...washingtonUnitsMathUpperG6_UNITS, ...washingtonUnitsMathUpperG7_UNITS];
