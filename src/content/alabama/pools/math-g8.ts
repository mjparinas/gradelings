import type { Unit } from "../../types";
import { units as ontarioG8Math } from "../../ontario/g8-math";
import { units as albertaG8Math } from "../../alberta/g8-math";
import { G8_UNITS as washingtonMathUpperG8 } from "../../washington/units/math-upper";

// The units Alabama's Grade 8 math course copies from other frameworks (see ../plan/math.ts). Import only the unit
// files it adopts from, so the grade's download carries those files and not other frameworks' whole grades.
export const POOL: readonly Unit[] = [...ontarioG8Math, ...albertaG8Math, ...washingtonMathUpperG8];
