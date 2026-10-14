import type { Unit } from "../../types";
import { units as ontarioG2ScienceUnits } from "../../ontario/g2-science";
import { units as ontarioG1ScienceUnits } from "../../ontario/g1-science";
import { SCIENCE_2 as washingtonScience2 } from "../../washington/units/science-k2";
import { peGrowingConditions3 } from "../../prince-edward-island/units/g3-science-social";
import { UNITS as newYorkScienceG2 } from "../../new-york/units/science-g2";

// The units Alabama's Grade 2 science course copies from other frameworks (see ../plan/science.ts). Import only the unit
// files it adopts from, so the grade's download carries those files and not other frameworks' whole grades.
export const POOL: readonly Unit[] = [
  ...ontarioG2ScienceUnits,
  ...ontarioG1ScienceUnits,
  ...washingtonScience2,
  peGrowingConditions3,
  ...newYorkScienceG2,
];
