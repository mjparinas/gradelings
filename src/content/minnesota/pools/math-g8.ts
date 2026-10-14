import type { Unit } from "../../types";
import { G8_UNITS as washingtonUnitsMathUpperG8_UNITS } from "../../washington/units/math-upper";
import { units as albertaG8MathUnits } from "../../alberta/g8-math";
import { units as ontarioG8MathUnits } from "../../ontario/g8-math";

// The units Minnesota's Grade 8 math course copies from other frameworks (see ../plan/math.ts). Import only the unit
// files it adopts from, so the grade's download carries those files and not other frameworks' whole grades.
export const POOL: readonly Unit[] = [...ontarioG8MathUnits, ...albertaG8MathUnits, ...washingtonUnitsMathUpperG8_UNITS];
