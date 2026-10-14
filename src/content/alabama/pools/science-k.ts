import type { Unit } from "../../types";
import { course as gradesG1ScienceCourse } from "../../grades/g1/science";
import { units as ontarioG1ScienceUnits } from "../../ontario/g1-science";
import { SCIENCE_K as texasScienceK } from "../../texas/units/science-k";
import { units as albertaKScienceUnits } from "../../alberta/k-science";
import { SCIENCE_K as washingtonScienceK } from "../../washington/units/science-k2";
import { SCIENCE_K as oregonScienceK } from "../../oregon/units/science-k2";
import { peFourSeasons1 } from "../../prince-edward-island/units/k1-science-social";

// The units Alabama's Kindergarten science course copies from other frameworks (see ../plan/science.ts). Import only the unit
// files it adopts from, so the grade's download carries those files and not other frameworks' whole grades.
export const POOL: readonly Unit[] = [
  ...gradesG1ScienceCourse.units,
  ...ontarioG1ScienceUnits,
  ...texasScienceK,
  ...albertaKScienceUnits,
  ...washingtonScienceK,
  ...(oregonScienceK),
  peFourSeasons1,
];
