import type { Unit } from "../../types";
import { units as albertaG2Math } from "../../alberta/g2-math";
import { evenOdd, skipCounting } from "../../manitoba/units/g2-math";
import { G2_UNITS as washingtonMathEarlyG2 } from "../../washington/units/math-early";

// The units Arkansas's Grade 2 math course copies from other frameworks (see ../plan/math.ts). Import only the unit
// files it adopts from, so the grade's download carries those files and not other frameworks' whole grades.
export const POOL: readonly Unit[] = [...albertaG2Math, skipCounting, evenOdd, ...washingtonMathEarlyG2];
