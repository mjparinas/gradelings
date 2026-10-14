import type { Unit } from "../../types";
import { K_UNITS as washingtonUnitsMathEarlyK_UNITS } from "../../washington/units/math-early";
import { POOL as newYorkPoolsMathKPOOL } from "../../new-york/pools/math-k";
import { mathUnits as manitobaUnitsGkMoreMathMathUnits } from "../../manitoba/units/gk-more-math";
import { units as albertaKMathUnits } from "../../alberta/k-math";

// The units Minnesota's Kindergarten math course copies from other frameworks (see ../plan/math.ts). Import only the unit
// files it adopts from, so the grade's download carries those files and not other frameworks' whole grades.
export const POOL: readonly Unit[] = [...newYorkPoolsMathKPOOL, ...albertaKMathUnits, ...manitobaUnitsGkMoreMathMathUnits, ...washingtonUnitsMathEarlyK_UNITS];
