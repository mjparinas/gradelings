import type { Unit } from "../../types";
import { units as ontarioG3ScienceUnits } from "../../ontario/g3-science";
import { life as manitobaLife, speed as manitobaSpeed } from "../../manitoba/units/g3-science";
import { peMagnetsStatic3 } from "../../prince-edward-island/units/g3-science-social";
import { SCIENCE_3 as oregonScience3 } from "../../oregon/units/science-35";
import { course as gradesG2ScienceCourse } from "../../grades/g2/science";
import { units as ontarioG2ScienceUnits } from "../../ontario/g2-science";
import { SCIENCE_3 as washingtonScience3 } from "../../washington/units/science-35";

// The units Alabama's Grade 3 science course copies from other frameworks (see ../plan/science.ts). Import only the unit
// files it adopts from, so the grade's download carries those files and not other frameworks' whole grades.
export const POOL: readonly Unit[] = [
  ...ontarioG3ScienceUnits,
  manitobaLife,
  manitobaSpeed,
  peMagnetsStatic3,
  ...(oregonScience3),
  ...gradesG2ScienceCourse.units,
  ...ontarioG2ScienceUnits,
  ...washingtonScience3,
];
