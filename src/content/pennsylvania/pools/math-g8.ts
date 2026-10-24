import type { Unit } from "../../types";
import { G8_UNITS as washingtonUnitsMathUpperG8UNITS } from "../../washington/units/math-upper";
import { units as ontarioG8MathUnits } from "../../ontario/g8-math";
import { units as albertaG8MathUnits } from "../../alberta/g8-math";

// The units Pennsylvania's Grade 8 math course copies from other frameworks (see ../plan). Import only the unit files it
// adopts from, so the grade's download carries those files and not other frameworks' whole grades.
export const POOL: readonly Unit[] = [...washingtonUnitsMathUpperG8UNITS, ...ontarioG8MathUnits, ...albertaG8MathUnits];
