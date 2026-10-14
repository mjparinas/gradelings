import type { Unit } from "../../types";
import { units as albertaG4Math } from "../../alberta/g4-math";
import { units as ontarioG4Math } from "../../ontario/g4-math";
import { G4_UNITS as washingtonMathMiddleG4_UNITS } from "../../washington/units/math-middle";

// Texas Grade 4 math. POOL is the units this course may copy from other frameworks (see ../plan/math.ts), as the
// exact unit files, so the grade's download carries only those files. OWN is the units written for Texas.
export const POOL: readonly Unit[] = [...ontarioG4Math, ...albertaG4Math, ...washingtonMathMiddleG4_UNITS];

export const OWN: readonly Unit[] = [];
