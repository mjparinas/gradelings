import type { Unit } from "../../types";
import { G3_UNITS as washingtonUnitsMathMiddleG3UNITS } from "../../washington/units/math-middle";
import { units as ontarioG3MathUnits } from "../../ontario/g3-math";
import { UNITS as newYorkUnitsMathG3UNITS } from "../../new-york/units/math-g3";
import { coinsBillsG3 as texasUnitsMathG3CoinsBillsG3 } from "../../texas/units/math-g3";
import { polygons as manitobaUnitsG3MathPolygons } from "../../manitoba/units/g3-math";

// The units Pennsylvania's Grade 3 math course copies from other frameworks (see ../plan). Import only the unit files it
// adopts from, so the grade's download carries those files and not other frameworks' whole grades.
export const POOL: readonly Unit[] = [...washingtonUnitsMathMiddleG3UNITS, ...ontarioG3MathUnits, ...newYorkUnitsMathG3UNITS, texasUnitsMathG3CoinsBillsG3, manitobaUnitsG3MathPolygons];
