import type { Unit } from "../../types";
import { unitsOf } from "../../placement";
import { G3_UNITS as washingtonUnitsMathMiddleG3UNITS } from "../../washington/units/math-middle";
import { units as ontarioG3MathUnits } from "../../ontario/g3-math";
import { polygons as manitobaUnitsG3MathPolygons } from "../../manitoba/units/g3-math";
import { units as albertaG3MathUnits } from "../../alberta/g3-math";
import { courses as nunavutG3Courses } from "../../nunavut/g3";

// The units Florida's Grade 3 math course copies from other frameworks (see ../plan). Import only the unit files it
// adopts from, so the grade's download carries those files and not other frameworks' whole grades.
export const POOL: readonly Unit[] = [...washingtonUnitsMathMiddleG3UNITS, ...ontarioG3MathUnits, manitobaUnitsG3MathPolygons, ...albertaG3MathUnits, ...unitsOf(nunavutG3Courses, "math")];
