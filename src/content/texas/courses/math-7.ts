import type { Unit } from "../../types";
import { units as albertaG7Math } from "../../alberta/g7-math";
import { units as ontarioG7Math } from "../../ontario/g7-math";
import { G7_UNITS as washingtonMathUpperG7_UNITS } from "../../washington/units/math-upper";

// Texas Grade 7 math. POOL is the units this course may copy from other frameworks (see ../plan/math.ts), as the
// exact unit files, so the grade's download carries only those files. OWN is the units written for Texas.
export const POOL: readonly Unit[] = [...ontarioG7Math, ...albertaG7Math, ...washingtonMathUpperG7_UNITS];

export const OWN: readonly Unit[] = [];
