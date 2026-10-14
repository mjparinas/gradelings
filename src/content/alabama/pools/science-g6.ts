import type { Unit } from "../../types";
import { SCIENCE_7 as texasScience7 } from "../../texas/units/science-7";
import { SCIENCE_8 as texasScience8 } from "../../texas/units/science-8";
import { UNITS as newYorkScienceG9 } from "../../new-york/units/science-g9";
import { course as gradesG5ScienceCourse } from "../../grades/g5/science";
import { UNITS as newYorkScienceG7 } from "../../new-york/units/science-g7";
import { SCIENCE_COPIES as oregonCopies } from "../../oregon/units/science-copies";
import { SCIENCE_6 as texasScience6 } from "../../texas/units/science-6";

// The units Alabama's Grade 6 science course copies from other frameworks (see ../plan/science.ts). Import only the unit
// files it adopts from, so the grade's download carries those files and not other frameworks' whole grades.
export const POOL: readonly Unit[] = [
  ...texasScience7,
  ...texasScience8,
  ...newYorkScienceG9,
  ...gradesG5ScienceCourse.units,
  ...newYorkScienceG7,
  ...(oregonCopies["8"] ?? []),
  ...texasScience6,
];
