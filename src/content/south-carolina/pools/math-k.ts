import type { Unit } from "../../types";
import { unitsOf } from "../../placement";
import { K_UNITS as washingtonUnitsMathEarlyK_UNITS } from "../../washington/units/math-early";
import { courses as ontarioKCourses } from "../../ontario/k";
import { mathUnits as manitobaUnitsGkMoreMathMathUnits } from "../../manitoba/units/gk-more-math";
import { units as albertaKMathUnits } from "../../alberta/k-math";

// The units South Carolina's Kindergarten math course copies from other frameworks (see ../plan). Import only the
// unit files it adopts from, so the grade's download carries those files and not other frameworks' whole grades.
export const POOL: readonly Unit[] = [
  ...unitsOf(ontarioKCourses, "math"),
  ...albertaKMathUnits,
  ...manitobaUnitsGkMoreMathMathUnits,
  ...washingtonUnitsMathEarlyK_UNITS,
];
