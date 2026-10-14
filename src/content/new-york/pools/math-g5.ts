import type { Unit } from "../../types";
import { mental, quadrilaterals } from "../../manitoba/units/g5-math";
import { G5_UNITS as washingtonMathMiddle } from "../../washington/units/math-middle";

// The units New York's Grade 5 math course copies from other frameworks (see ../plan/math.ts). Import only the unit
// files it adopts from, so the grade's download carries those files and not other frameworks' whole grades.
export const POOL: readonly Unit[] = [mental, quadrilaterals, ...washingtonMathMiddle];
