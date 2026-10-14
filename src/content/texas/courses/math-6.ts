import type { Unit } from "../../types";
import { units as albertaG6Math } from "../../alberta/g6-math";
import { units as ontarioG6Math } from "../../ontario/g6-math";
import { G6_UNITS as washingtonMathUpperG6_UNITS } from "../../washington/units/math-upper";
import { MATH_G6 } from "../units/math-g6";

// Texas Grade 6 math. POOL is the units this course may copy from other frameworks (see ../plan/math.ts), as the
// exact unit files, so the grade's download carries only those files. OWN is the units written for Texas.
export const POOL: readonly Unit[] = [...ontarioG6Math, ...albertaG6Math, ...washingtonMathUpperG6_UNITS];

export const OWN: readonly Unit[] = [...MATH_G6];
