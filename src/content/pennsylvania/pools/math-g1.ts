import type { Unit } from "../../types";
import { G1_UNITS as washingtonUnitsMathEarlyG1UNITS } from "../../washington/units/math-early";
import { units as albertaG1MathUnits } from "../../alberta/g1-math";
import { units as ontarioG1MathUnits } from "../../ontario/g1-math";

// The units Pennsylvania's Grade 1 math course copies from other frameworks (see ../plan). Import only the unit files it
// adopts from, so the grade's download carries those files and not other frameworks' whole grades.
export const POOL: readonly Unit[] = [...washingtonUnitsMathEarlyG1UNITS, ...albertaG1MathUnits, ...ontarioG1MathUnits];
