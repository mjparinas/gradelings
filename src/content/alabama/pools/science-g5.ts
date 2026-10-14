import type { Unit } from "../../types";
import { units as ontarioG5ScienceUnits } from "../../ontario/g5-science";
import { course as gradesG3ScienceCourse } from "../../grades/g3/science";
import { units as albertaG5ScienceUnits } from "../../alberta/g5-science";
import { SCIENCE_5 as washingtonScience5 } from "../../washington/units/science-35";
import { SCIENCE_5 as texasScience5 } from "../../texas/units/science-5";

// The units Alabama's Grade 5 science course copies from other frameworks (see ../plan/science.ts). Import only the unit
// files it adopts from, so the grade's download carries those files and not other frameworks' whole grades.
export const POOL: readonly Unit[] = [
  ...ontarioG5ScienceUnits,
  ...gradesG3ScienceCourse.units,
  ...albertaG5ScienceUnits,
  ...washingtonScience5,
  ...texasScience5,
];
