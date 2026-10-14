import type { Unit } from "../../types";
import { G2_UNITS as washingtonUnitsMathEarlyG2_UNITS } from "../../washington/units/math-early";
import { skipCounting as manitobaUnitsG2MathSkipCounting } from "../../manitoba/units/g2-math";
import { units as albertaG2MathUnits } from "../../alberta/g2-math";

// The units Minnesota's Grade 2 math course copies from other frameworks (see ../plan/math.ts). Import only the unit
// files it adopts from, so the grade's download carries those files and not other frameworks' whole grades.
export const POOL: readonly Unit[] = [...albertaG2MathUnits, manitobaUnitsG2MathSkipCounting, ...washingtonUnitsMathEarlyG2_UNITS];
