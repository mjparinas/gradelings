import type { Unit } from "../../types";
import { SCIENCE_3 as oregonUnitsScience35SCIENCE_3 } from "../../oregon/units/science-35";
import { SCIENCE_3 as washingtonUnitsScience35SCIENCE_3 } from "../../washington/units/science-35";
import { course as gradesG3ScienceCourse } from "../../grades/g3/science";
import { units as ontarioG3ScienceUnits } from "../../ontario/g3-science";

// The units Minnesota's Grade 4 science course copies from other frameworks (see ../plan/science.ts). Import only the unit
// files it adopts from, so the grade's download carries those files and not other frameworks' whole grades.
export const POOL: readonly Unit[] = [...gradesG3ScienceCourse.units, ...ontarioG3ScienceUnits, ...oregonUnitsScience35SCIENCE_3, ...washingtonUnitsScience35SCIENCE_3];
