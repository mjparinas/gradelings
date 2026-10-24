import type { Unit } from "../../types";
import { G2_UNITS as washingtonUnitsMathEarlyG2UNITS } from "../../washington/units/math-early";
import { units as albertaG2MathUnits } from "../../alberta/g2-math";
import { evenOdd as manitobaUnitsG2MathEvenOdd } from "../../manitoba/units/g2-math";
import { skipCounting as manitobaUnitsG2MathSkipCounting } from "../../manitoba/units/g2-math";

// The units Pennsylvania's Grade 2 math course copies from other frameworks (see ../plan). Import only the unit files it
// adopts from, so the grade's download carries those files and not other frameworks' whole grades.
export const POOL: readonly Unit[] = [...washingtonUnitsMathEarlyG2UNITS, ...albertaG2MathUnits, manitobaUnitsG2MathEvenOdd, manitobaUnitsG2MathSkipCounting];
