import type { Unit } from "../../types";
import { G5_UNITS as washingtonUnitsMathMiddleG5_UNITS } from "../../washington/units/math-middle";
import { mental as manitobaUnitsG5MathMental } from "../../manitoba/units/g5-math";

// The units South Carolina's Grade 5 math course copies from other frameworks (see ../plan). Import only the
// unit files it adopts from, so the grade's download carries those files and not other frameworks' whole grades.
export const POOL: readonly Unit[] = [manitobaUnitsG5MathMental, ...washingtonUnitsMathMiddleG5_UNITS];
