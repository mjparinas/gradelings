import type { Unit } from "../../types";
import { units as ontarioG9Math } from "../../ontario/g9-math";
import { G9_UNITS as washingtonMathUpperG9_UNITS } from "../../washington/units/math-upper";

// Texas Grade 9 math. POOL is the units this course may copy from other frameworks (see ../plan/math.ts), as the
// exact unit files, so the grade's download carries only those files. OWN is the units written for Texas.
export const POOL: readonly Unit[] = [...ontarioG9Math, ...washingtonMathUpperG9_UNITS];

export const OWN: readonly Unit[] = [];
