import type { Unit } from "../../types";
import { polygons as manitobaG3MathPolygons } from "../../manitoba/units/g3-math";
import { units as ontarioG3Math } from "../../ontario/g3-math";
import { G3_UNITS as washingtonMathMiddleG3_UNITS } from "../../washington/units/math-middle";

// Texas Grade 3 math. POOL is the units this course may copy from other frameworks (see ../plan/math.ts), as the
// exact unit files, so the grade's download carries only those files. OWN is the units written for Texas.
export const POOL: readonly Unit[] = [...ontarioG3Math, manitobaG3MathPolygons, ...washingtonMathMiddleG3_UNITS];

export const OWN: readonly Unit[] = [];
