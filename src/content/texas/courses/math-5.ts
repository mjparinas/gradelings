import type { Unit } from "../../types";
import { quadrilaterals as manitobaG5MathQuadrilaterals } from "../../manitoba/units/g5-math";
import { G5_UNITS as washingtonMathMiddleG5_UNITS } from "../../washington/units/math-middle";
import { PRIME_FACTORS_5 } from "../../california/units/math-g5";
import { units as ontarioG5Math } from "../../ontario/g5-math";
import { MATH_G5 } from "../units/math-g5";

/** California's prime factorization unit, with a parent note that doesn't call it a California addition. */
const PRIME_FACTORS: Unit = {
  ...PRIME_FACTORS_5,
  parentNote: "Writing whole numbers from 2 to 50 as products of prime factors, for example 24 = 2 × 2 × 2 × 3, using factor trees. In Texas, 5th graders identify prime and composite numbers.",
};

// Texas Grade 5 math. POOL is the units this course may copy from other frameworks (see ../plan/math.ts), as the
// exact unit files, so the grade's download carries only those files. OWN is the units written for Texas.
export const POOL: readonly Unit[] = [manitobaG5MathQuadrilaterals, ...ontarioG5Math, PRIME_FACTORS, ...washingtonMathMiddleG5_UNITS];

export const OWN: readonly Unit[] = [...MATH_G5];
