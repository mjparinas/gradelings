import type { Unit } from "../../types";
import { units as ontarioG5Math } from "../../ontario/g5-math";
import { mental, quadrilaterals } from "../../manitoba/units/g5-math";
import { G5_UNITS as washingtonMathMiddleG5 } from "../../washington/units/math-middle";

// The units Alabama's Grade 5 math course copies from other frameworks (see ../plan/math.ts). Import only the unit
// files it adopts from, so the grade's download carries those files and not other frameworks' whole grades.
export const POOL: readonly Unit[] = [...ontarioG5Math, mental, quadrilaterals, ...washingtonMathMiddleG5];
