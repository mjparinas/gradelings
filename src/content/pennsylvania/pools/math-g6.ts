import type { Unit } from "../../types";
import { G6_UNITS as washingtonUnitsMathUpperG6UNITS } from "../../washington/units/math-upper";
import { units as ontarioG6MathUnits } from "../../ontario/g6-math";
import { units as albertaG6MathUnits } from "../../alberta/g6-math";

// The units Pennsylvania's Grade 6 math course copies from other frameworks (see ../plan). Import only the unit files it
// adopts from, so the grade's download carries those files and not other frameworks' whole grades.
export const POOL: readonly Unit[] = [...washingtonUnitsMathUpperG6UNITS, ...ontarioG6MathUnits, ...albertaG6MathUnits];
