import type { Unit } from "../../types";
import { mental as manitobaG5MathMental } from "../../manitoba/units/g5-math";
import { quadrilaterals as manitobaG5MathQuadrilaterals } from "../../manitoba/units/g5-math";
import { G5_UNITS as washingtonMathMiddleG5_UNITS } from "../../washington/units/math-middle";

// Texas Grade 5 math. POOL is the units this course may copy from other frameworks (see ../plan/math.ts), as the
// exact unit files, so the grade's download carries only those files. OWN is the units written for Texas.
export const POOL: readonly Unit[] = [manitobaG5MathMental, manitobaG5MathQuadrilaterals, ...washingtonMathMiddleG5_UNITS];

export const OWN: readonly Unit[] = [];
