import type { Unit } from "../../types";
import { G9_UNITS as washingtonUnitsMathUpperG9_UNITS } from "../../washington/units/math-upper";
import { units as ontarioG9MathUnits } from "../../ontario/g9-math";

// The units Minnesota's Grade 9 math course copies from other frameworks (see ../plan/math.ts). Import only the unit
// files it adopts from, so the grade's download carries those files and not other frameworks' whole grades.
export const POOL: readonly Unit[] = [...ontarioG9MathUnits, ...washingtonUnitsMathUpperG9_UNITS];
