import type { Unit } from "../../types";
import { G8_UNITS as washingtonUnitsMathUpperG8UNITS } from "../../washington/units/math-upper";
import { units as ontarioG8MathUnits } from "../../ontario/g8-math";
import { MATH_8 as californiaUnitsMathG8MATH8 } from "../../california/units/math-g8";
import { units as albertaG8MathUnits } from "../../alberta/g8-math";
import { bothSidesG8 as texasUnitsMathG8BothSidesG8 } from "../../texas/units/math-g8";

// The units Florida's Grade 8 math course copies from other frameworks (see ../plan). Import only the unit files it
// adopts from, so the grade's download carries those files and not other frameworks' whole grades.
export const POOL: readonly Unit[] = [...washingtonUnitsMathUpperG8UNITS, ...ontarioG8MathUnits, ...californiaUnitsMathG8MATH8, ...albertaG8MathUnits, texasUnitsMathG8BothSidesG8];
