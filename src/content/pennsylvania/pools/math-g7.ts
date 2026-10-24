import type { Unit } from "../../types";
import { G7_UNITS as washingtonUnitsMathUpperG7UNITS } from "../../washington/units/math-upper";
import { units as ontarioG7MathUnits } from "../../ontario/g7-math";
import { units as albertaG7MathUnits } from "../../alberta/g7-math";

// The units Pennsylvania's Grade 7 math course copies from other frameworks (see ../plan). Import only the unit files it
// adopts from, so the grade's download carries those files and not other frameworks' whole grades.
export const POOL: readonly Unit[] = [...washingtonUnitsMathUpperG7UNITS, ...ontarioG7MathUnits, ...albertaG7MathUnits];
