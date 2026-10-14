import type { Unit } from "../../types";
import { units as ontarioG6Math } from "../../ontario/g6-math";
import { units as albertaG6Math } from "../../alberta/g6-math";
import { G6_UNITS as washingtonMathUpperG6 } from "../../washington/units/math-upper";

// The units Alabama's Grade 6 math course copies from other frameworks (see ../plan/math.ts). Import only the unit
// files it adopts from, so the grade's download carries those files and not other frameworks' whole grades.
export const POOL: readonly Unit[] = [...ontarioG6Math, ...albertaG6Math, ...washingtonMathUpperG6];
