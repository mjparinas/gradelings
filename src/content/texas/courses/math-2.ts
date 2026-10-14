import type { Unit } from "../../types";
import { units as albertaG2Math } from "../../alberta/g2-math";
import { evenOdd as manitobaG2MathEvenOdd } from "../../manitoba/units/g2-math";
import { skipCounting as manitobaG2MathSkipCounting } from "../../manitoba/units/g2-math";
import { G2_UNITS as washingtonMathEarlyG2_UNITS } from "../../washington/units/math-early";
import { units as ontarioG2Math } from "../../ontario/g2-math";
import { MATH_G2 } from "../units/math-g2";

// Texas Grade 2 math. POOL is the units this course may copy from other frameworks (see ../plan/math.ts), as the
// exact unit files, so the grade's download carries only those files. OWN is the units written for Texas.
export const POOL: readonly Unit[] = [...albertaG2Math, ...ontarioG2Math, manitobaG2MathSkipCounting, manitobaG2MathEvenOdd, ...washingtonMathEarlyG2_UNITS];

export const OWN: readonly Unit[] = [...MATH_G2];
