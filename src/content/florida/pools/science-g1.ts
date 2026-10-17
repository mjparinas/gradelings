import type { Unit } from "../../types";
import { unitsOf } from "../../placement";
import { units as ontarioG1ScienceUnits } from "../../ontario/g1-science";
import { SCIENCE_1 as washingtonUnitsScienceK2SCIENCE1 } from "../../washington/units/science-k2";
import { motionUnit as albertaG1ScienceMotionUnit } from "../../alberta/g1-science";
import { SCIENCE_1 as texasUnitsScience1SCIENCE1 } from "../../texas/units/science-1";
import { units as ontarioG3ScienceUnits } from "../../ontario/g3-science";
import { courses as nunavutG1Courses } from "../../nunavut/g1";

// The units Florida's Grade 1 science course copies from other frameworks (see ../plan). Import only the unit files it
// adopts from, so the grade's download carries those files and not other frameworks' whole grades.
export const POOL: readonly Unit[] = [...ontarioG1ScienceUnits, ...washingtonUnitsScienceK2SCIENCE1, albertaG1ScienceMotionUnit, ...texasUnitsScience1SCIENCE1, ...ontarioG3ScienceUnits, ...unitsOf(nunavutG1Courses, "science")];
