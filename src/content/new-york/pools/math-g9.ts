import type { Unit } from "../../types";
import { units as ontarioG9Math } from "../../ontario/g9-math";
import { G9_UNITS as washingtonMathUpper } from "../../washington/units/math-upper";

// The units New York's Grade 9 (Algebra I) math course copies from other frameworks (see ../plan/math.ts). Import only
// the unit files it adopts from, so the grade's download carries those files and not other frameworks' whole grades.
export const POOL: readonly Unit[] = [...ontarioG9Math, ...washingtonMathUpper];
