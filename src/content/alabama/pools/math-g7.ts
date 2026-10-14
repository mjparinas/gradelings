import type { Unit } from "../../types";
import { units as ontarioG7Math } from "../../ontario/g7-math";
import { units as albertaG7Math } from "../../alberta/g7-math";
import { G7_UNITS as washingtonMathUpperG7 } from "../../washington/units/math-upper";

// The units Alabama's Grade 7 math course copies from other frameworks (see ../plan/math.ts). Import only the unit
// files it adopts from, so the grade's download carries those files and not other frameworks' whole grades.
export const POOL: readonly Unit[] = [...ontarioG7Math, ...albertaG7Math, ...washingtonMathUpperG7];
