import type { Unit } from "../../types";
import { units as ontarioG4Math } from "../../ontario/g4-math";
import { units as albertaG4Math } from "../../alberta/g4-math";
import { G4_UNITS as washingtonMathMiddleG4 } from "../../washington/units/math-middle";

// The units Alabama's Grade 4 math course copies from other frameworks (see ../plan/math.ts). Import only the unit
// files it adopts from, so the grade's download carries those files and not other frameworks' whole grades.
export const POOL: readonly Unit[] = [...ontarioG4Math, ...albertaG4Math, ...washingtonMathMiddleG4];
