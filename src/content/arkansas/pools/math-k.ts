import type { Unit } from "../../types";
import { unitsOf } from "../../placement";
import { courses as ontarioK } from "../../ontario/k";
import { units as albertaKMath } from "../../alberta/k-math";
import { mathUnits as manitobaGkMoreMath } from "../../manitoba/units/gk-more-math";
import { K_UNITS as washingtonMathEarlyK } from "../../washington/units/math-early";

// The units Arkansas's Kindergarten math course copies from other frameworks (see ../plan/math.ts). Import only the unit
// files it adopts from, so the grade's download carries those files and not other frameworks' whole grades.
export const POOL: readonly Unit[] = [...unitsOf(ontarioK, "math"), ...albertaKMath, ...manitobaGkMoreMath, ...washingtonMathEarlyK];
