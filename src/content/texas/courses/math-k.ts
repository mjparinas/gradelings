import { unitsOf } from "../../placement";
import type { Unit } from "../../types";
import { units as albertaKMath } from "../../alberta/k-math";
import { mathUnits as manitobaGkMoreMath } from "../../manitoba/units/gk-more-math";
import { courses as ontarioK } from "../../ontario/k";
import { K_UNITS as washingtonMathEarlyK_UNITS } from "../../washington/units/math-early";

// Texas Kindergarten math. POOL is the units this course may copy from other frameworks (see ../plan/math.ts), as the
// exact unit files, so the grade's download carries only those files. OWN is the units written for Texas.
export const POOL: readonly Unit[] = [...unitsOf(ontarioK, "math"), ...albertaKMath, ...manitobaGkMoreMath, ...washingtonMathEarlyK_UNITS];

export const OWN: readonly Unit[] = [];
