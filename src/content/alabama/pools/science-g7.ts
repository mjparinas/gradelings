import type { Unit } from "../../types";
import { SCIENCE_6 as washingtonScience6, SCIENCE_8 as washingtonScience8 } from "../../washington/units/science-68";
import { course as gradesG8ScienceCourse } from "../../grades/g8/science";
import { units as albertaG8ScienceUnits } from "../../alberta/g8-science";
import { units as ontarioG9ScienceUnits } from "../../ontario/g9-science";
import { course as gradesG9ScienceCourse } from "../../grades/g9/science";
import { course as gradesG6ScienceCourse } from "../../grades/g6/science";
import { course as gradesG5ScienceCourse } from "../../grades/g5/science";
import { units as ontarioG7ScienceUnits } from "../../ontario/g7-science";
import { units as ontarioG6ScienceUnits } from "../../ontario/g6-science";
import { SCIENCE_7 as texasScience7 } from "../../texas/units/science-7";
import { species as manitobaSpecies } from "../../manitoba/units/g6-more-science";

// The units Alabama's Grade 7 science course copies from other frameworks (see ../plan/science.ts). Import only the unit
// files it adopts from, so the grade's download carries those files and not other frameworks' whole grades.
export const POOL: readonly Unit[] = [
  ...washingtonScience6,
  ...washingtonScience8,
  ...gradesG8ScienceCourse.units,
  ...albertaG8ScienceUnits,
  ...ontarioG9ScienceUnits,
  ...gradesG9ScienceCourse.units,
  ...gradesG6ScienceCourse.units,
  ...gradesG5ScienceCourse.units,
  ...ontarioG7ScienceUnits,
  ...ontarioG6ScienceUnits,
  ...texasScience7,
  manitobaSpecies,
];
