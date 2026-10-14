import type { Unit } from "../../types";
import { SCIENCE_2 as washingtonUnitsScienceK2SCIENCE_2 } from "../../washington/units/science-k2";
import { SCIENCE_3 as washingtonUnitsScience35SCIENCE_3 } from "../../washington/units/science-35";
import { course as gradesKScienceCourse } from "../../grades/k/science";

// The units Minnesota's Grade 2 science course copies from other frameworks (see ../plan/science.ts). Import only the unit
// files it adopts from, so the grade's download carries those files and not other frameworks' whole grades.
export const POOL: readonly Unit[] = [...gradesKScienceCourse.units, ...washingtonUnitsScience35SCIENCE_3, ...washingtonUnitsScienceK2SCIENCE_2];
