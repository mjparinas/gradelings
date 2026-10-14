import type { Unit } from "../../types";
import { SCIENCE_3 as washingtonUnitsScience35SCIENCE_3 } from "../../washington/units/science-35";
import { course as gradesG1ScienceCourse } from "../../grades/g1/science";
import { life as manitobaUnitsG3ScienceLife } from "../../manitoba/units/g3-science";
import { units as manitobaUnitsG4MoreScienceUnits } from "../../manitoba/units/g4-more-science";
import { units as ontarioG3ScienceUnits } from "../../ontario/g3-science";
import { units as ontarioG4ScienceUnits } from "../../ontario/g4-science";

// The units Minnesota's Grade 3 science course copies from other frameworks (see ../plan/science.ts). Import only the unit
// files it adopts from, so the grade's download carries those files and not other frameworks' whole grades.
export const POOL: readonly Unit[] = [...ontarioG3ScienceUnits, manitobaUnitsG3ScienceLife, ...manitobaUnitsG4MoreScienceUnits, ...washingtonUnitsScience35SCIENCE_3, ...gradesG1ScienceCourse.units, ...ontarioG4ScienceUnits];
