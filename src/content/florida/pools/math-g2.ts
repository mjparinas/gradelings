import type { Unit } from "../../types";
import { G2_UNITS as washingtonUnitsMathEarlyG2UNITS } from "../../washington/units/math-early";
import { MATH_2 as californiaUnitsMathG2MATH2 } from "../../california/units/math-g2";
import { units as albertaG2MathUnits } from "../../alberta/g2-math";
import { units as ontarioG2MathUnits } from "../../ontario/g2-math";
import { evenOdd as manitobaUnitsG2MathEvenOdd } from "../../manitoba/units/g2-math";

// The units Florida's Grade 2 math course copies from other frameworks (see ../plan). Import only the unit files it
// adopts from, so the grade's download carries those files and not other frameworks' whole grades.
export const POOL: readonly Unit[] = [...washingtonUnitsMathEarlyG2UNITS, ...californiaUnitsMathG2MATH2, ...albertaG2MathUnits, ...ontarioG2MathUnits, manitobaUnitsG2MathEvenOdd];
