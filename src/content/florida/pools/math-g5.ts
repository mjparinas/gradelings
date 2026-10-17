import type { Unit } from "../../types";
import { G5_UNITS as washingtonUnitsMathMiddleG5UNITS } from "../../washington/units/math-middle";
import { MATH_G5 as texasUnitsMathG5MATHG5 } from "../../texas/units/math-g5";
import { units as ontarioG5MathUnits } from "../../ontario/g5-math";
import { LINE_PLOTS_5 as californiaUnitsMathG5LINEPLOTS5 } from "../../california/units/math-g5";
import { quadrilaterals as manitobaUnitsG5MathQuadrilaterals } from "../../manitoba/units/g5-math";

// The units Florida's Grade 5 math course copies from other frameworks (see ../plan). Import only the unit files it
// adopts from, so the grade's download carries those files and not other frameworks' whole grades.
export const POOL: readonly Unit[] = [...washingtonUnitsMathMiddleG5UNITS, ...texasUnitsMathG5MATHG5, ...ontarioG5MathUnits, californiaUnitsMathG5LINEPLOTS5, manitobaUnitsG5MathQuadrilaterals];
