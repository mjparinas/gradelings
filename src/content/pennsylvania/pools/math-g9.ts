import type { Unit } from "../../types";
import { G9_UNITS as washingtonUnitsMathUpperG9UNITS } from "../../washington/units/math-upper";
import { MATH_9 as californiaUnitsMathG9MATH9 } from "../../california/units/math-g9";
import { units as ontarioG9MathUnits } from "../../ontario/g9-math";
import { UNITS as floridaUnitsMathG9UNITS } from "../../florida/units/math-g9";
import { UNITS as newYorkUnitsMathG9UNITS } from "../../new-york/units/math-g9";

// The units Pennsylvania's Grade 9 math course copies from other frameworks (see ../plan). Import only the unit files it
// adopts from, so the grade's download carries those files and not other frameworks' whole grades.
export const POOL: readonly Unit[] = [...washingtonUnitsMathUpperG9UNITS, ...californiaUnitsMathG9MATH9, ...ontarioG9MathUnits, ...floridaUnitsMathG9UNITS, ...newYorkUnitsMathG9UNITS];
