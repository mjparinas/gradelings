import type { Unit } from "../../types";
import { units as albertaG7Math } from "../../alberta/g7-math";
import { units as ontarioG7Math } from "../../ontario/g7-math";
import { G6_UNITS as washingtonMathUpperG6_UNITS, G7_UNITS as washingtonMathUpperG7_UNITS } from "../../washington/units/math-upper";
import { MATH_G7 } from "../units/math-g7";

// Texas Grade 7 math. POOL is the units this course may copy from other frameworks (see ../plan/math.ts), as the
// exact unit files, so the grade's download carries only those files. OWN is the units written for Texas.
export const POOL: readonly Unit[] = [...ontarioG7Math, ...albertaG7Math, ...washingtonMathUpperG7_UNITS, ...washingtonMathUpperG6_UNITS];

export const OWN: readonly Unit[] = [...MATH_G7];
