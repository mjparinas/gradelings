import type { Unit } from "../../types";
import { units as albertaG2ScienceUnits } from "../../alberta/g2-science";
import { SCIENCE_1 as washingtonScience1 } from "../../washington/units/science-k2";
import { course as gradesKScienceCourse } from "../../grades/k/science";
import { units as ontarioG1ScienceUnits } from "../../ontario/g1-science";
import { SCIENCE_1 as texasScience1 } from "../../texas/units/science-1";
import { scienceUnits as manitobaKScience } from "../../manitoba/units/gk-more-science";

// The units Alabama's Grade 1 science course copies from other frameworks (see ../plan/science.ts). Import only the unit
// files it adopts from, so the grade's download carries those files and not other frameworks' whole grades.
export const POOL: readonly Unit[] = [
  ...albertaG2ScienceUnits,
  ...washingtonScience1,
  ...gradesKScienceCourse.units,
  ...ontarioG1ScienceUnits,
  ...texasScience1,
  ...manitobaKScience,
];
