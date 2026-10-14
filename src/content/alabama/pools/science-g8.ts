import type { Unit } from "../../types";
import { course as gradesG6ScienceCourse } from "../../grades/g6/science";
import { units as ontarioG8ScienceUnits } from "../../ontario/g8-science";
import { course as gradesG7ScienceCourse } from "../../grades/g7/science";
import { units as ontarioG9ScienceUnits } from "../../ontario/g9-science";
import { SCIENCE_7 as washingtonScience7, SCIENCE_8 as washingtonScience8 } from "../../washington/units/science-68";
import { units as albertaG9ScienceUnits } from "../../alberta/g9-science";
import { SCIENCE_7 as texasScience7 } from "../../texas/units/science-7";
import { motionForces } from "../../new-brunswick/units/g8-science";
import { SCIENCE_6 as texasScience6 } from "../../texas/units/science-6";

// The units Alabama's Grade 8 science course copies from other frameworks (see ../plan/science.ts). Import only the unit
// files it adopts from, so the grade's download carries those files and not other frameworks' whole grades.
export const POOL: readonly Unit[] = [
  ...gradesG6ScienceCourse.units,
  ...ontarioG8ScienceUnits,
  ...gradesG7ScienceCourse.units,
  ...ontarioG9ScienceUnits,
  ...washingtonScience7,
  ...washingtonScience8,
  ...albertaG9ScienceUnits,
  ...texasScience7,
  motionForces,
  ...texasScience6,
];
