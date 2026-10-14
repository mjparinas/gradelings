import type { Unit } from "../../types";
import { units as ontarioG3Math } from "../../ontario/g3-math";
import { polygons } from "../../manitoba/units/g3-math";
import { G3_UNITS as washingtonMathMiddleG3 } from "../../washington/units/math-middle";

// The units Alabama's Grade 3 math course copies from other frameworks (see ../plan/math.ts). Import only the unit
// files it adopts from, so the grade's download carries those files and not other frameworks' whole grades.
export const POOL: readonly Unit[] = [...ontarioG3Math, polygons, ...washingtonMathMiddleG3];
