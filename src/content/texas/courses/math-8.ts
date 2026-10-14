import type { Unit } from "../../types";
import { units as albertaG8Math } from "../../alberta/g8-math";
import { units as ontarioG8Math } from "../../ontario/g8-math";
import { G8_UNITS as washingtonMathUpperG8_UNITS } from "../../washington/units/math-upper";

// Texas Grade 8 math. POOL is the units this course may copy from other frameworks (see ../plan/math.ts), as the
// exact unit files, so the grade's download carries only those files. OWN is the units written for Texas.
export const POOL: readonly Unit[] = [...ontarioG8Math, ...albertaG8Math, ...washingtonMathUpperG8_UNITS];

export const OWN: readonly Unit[] = [];
