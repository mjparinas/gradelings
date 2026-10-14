import type { Unit } from "../../types";
import { G6_UNITS as washingtonUnitsMathUpperG6_UNITS } from "../../washington/units/math-upper";
import { units as albertaG6MathUnits } from "../../alberta/g6-math";
import { units as ontarioG6MathUnits } from "../../ontario/g6-math";

// The units Minnesota's Grade 6 math course copies from other frameworks (see ../plan/math.ts). Import only the unit
// files it adopts from, so the grade's download carries those files and not other frameworks' whole grades.
export const POOL: readonly Unit[] = [...ontarioG6MathUnits, ...albertaG6MathUnits, ...washingtonUnitsMathUpperG6_UNITS];
