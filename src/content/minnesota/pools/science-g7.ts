import type { Unit } from "../../types";
import { SCIENCE_6 as washingtonUnitsScience68SCIENCE_6 } from "../../washington/units/science-68";
import { SCIENCE_8 as washingtonUnitsScience68SCIENCE_8 } from "../../washington/units/science-68";
import { course as gradesG6ScienceCourse } from "../../grades/g6/science";
import { course as gradesG8ScienceCourse } from "../../grades/g8/science";
import { units as albertaG7ScienceUnits } from "../../alberta/g7-science";
import { units as ontarioG7ScienceUnits } from "../../ontario/g7-science";

// The units Minnesota's Grade 7 science course copies from other frameworks (see ../plan/science.ts). Import only the unit
// files it adopts from, so the grade's download carries those files and not other frameworks' whole grades.
export const POOL: readonly Unit[] = [...washingtonUnitsScience68SCIENCE_6, ...gradesG8ScienceCourse.units, ...gradesG6ScienceCourse.units, ...albertaG7ScienceUnits, ...ontarioG7ScienceUnits, ...washingtonUnitsScience68SCIENCE_8];
