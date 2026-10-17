import type { Unit } from "../../types";
import { G6_UNITS as washingtonUnitsMathUpperG6UNITS } from "../../washington/units/math-upper";
import { MATH_6 as californiaUnitsMathG6MATH6 } from "../../california/units/math-g6";
import { units as ontarioG6MathUnits } from "../../ontario/g6-math";
import { MATH_G6 as texasUnitsMathG6MATHG6 } from "../../texas/units/math-g6";
import { units as albertaG6MathUnits } from "../../alberta/g6-math";

// The units Florida's Grade 6 math course copies from other frameworks (see ../plan). Import only the unit files it
// adopts from, so the grade's download carries those files and not other frameworks' whole grades.
export const POOL: readonly Unit[] = [...washingtonUnitsMathUpperG6UNITS, ...californiaUnitsMathG6MATH6, ...ontarioG6MathUnits, ...texasUnitsMathG6MATHG6, ...albertaG6MathUnits];
