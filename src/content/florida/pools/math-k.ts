import type { Unit } from "../../types";
import { unitsOf } from "../../placement";
import { K_UNITS as washingtonUnitsMathEarlyKUNITS } from "../../washington/units/math-early";
import { MEASURE_WORDS_K as californiaUnitsMathGkMEASUREWORDSK } from "../../california/units/math-gk";
import { mathUnits as manitobaUnitsGkMoreMathMathUnits } from "../../manitoba/units/gk-more-math";
import { units as albertaKMathUnits } from "../../alberta/k-math";
import { courses as ontarioKCourses } from "../../ontario/k";

// The units Florida's Kindergarten math course copies from other frameworks (see ../plan). Import only the unit files it
// adopts from, so the grade's download carries those files and not other frameworks' whole grades.
export const POOL: readonly Unit[] = [...washingtonUnitsMathEarlyKUNITS, californiaUnitsMathGkMEASUREWORDSK, ...manitobaUnitsGkMoreMathMathUnits, ...albertaKMathUnits, ...unitsOf(ontarioKCourses, "math")];
