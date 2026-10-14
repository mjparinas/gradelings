import type { Unit } from "../../types";
import { SCIENCE_6 as washingtonUnitsScience68SCIENCE_6 } from "../../washington/units/science-68";
import { SCIENCE_7 as washingtonUnitsScience68SCIENCE_7 } from "../../washington/units/science-68";
import { SCIENCE_8 as washingtonUnitsScience68SCIENCE_8 } from "../../washington/units/science-68";
import { course as gradesG6ScienceCourse } from "../../grades/g6/science";
import { course as gradesG7ScienceCourse } from "../../grades/g7/science";
import { motionForces as newBrunswickUnitsG8ScienceMotionForces } from "../../new-brunswick/units/g8-science";

// The units Minnesota's Grade 8 science course copies from other frameworks (see ../plan/science.ts). Import only the unit
// files it adopts from, so the grade's download carries those files and not other frameworks' whole grades.
export const POOL: readonly Unit[] = [...gradesG7ScienceCourse.units, ...washingtonUnitsScience68SCIENCE_8, ...gradesG6ScienceCourse.units, newBrunswickUnitsG8ScienceMotionForces, ...washingtonUnitsScience68SCIENCE_7, ...washingtonUnitsScience68SCIENCE_6];
