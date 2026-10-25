import type { Unit } from "../../types";
import { G3_UNITS as washingtonUnitsMathMiddleG3_UNITS } from "../../washington/units/math-middle";
import { polygons as manitobaUnitsG3MathPolygons } from "../../manitoba/units/g3-math";
import { units as ontarioG3MathUnits } from "../../ontario/g3-math";

// The units South Carolina's Grade 3 math course copies from other frameworks (see ../plan). Import only the
// unit files it adopts from, so the grade's download carries those files and not other frameworks' whole grades.
export const POOL: readonly Unit[] = [
  ...ontarioG3MathUnits,
  manitobaUnitsG3MathPolygons,
  ...washingtonUnitsMathMiddleG3_UNITS,
];
