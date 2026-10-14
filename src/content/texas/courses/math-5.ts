import type { Unit } from "../../types";
import { quadrilaterals as manitobaG5MathQuadrilaterals } from "../../manitoba/units/g5-math";
import { G5_UNITS as washingtonMathMiddleG5_UNITS } from "../../washington/units/math-middle";
import { PRIME_FACTORS_5 } from "../../california/units/math-g5";
import { units as ontarioG5Math } from "../../ontario/g5-math";
import { MATH_G5 } from "../units/math-g5";

// Texas Grade 5 math. POOL is the units this course may copy from other frameworks (see ../plan/math.ts), as the
// exact unit files, so the grade's download carries only those files. OWN is the units written for Texas.
export const POOL: readonly Unit[] = [manitobaG5MathQuadrilaterals, ...ontarioG5Math, PRIME_FACTORS_5, ...washingtonMathMiddleG5_UNITS];

export const OWN: readonly Unit[] = [...MATH_G5];
