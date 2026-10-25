import type { Unit } from "../../types";
import { SCIENCE_2 as oregonUnitsScienceK2SCIENCE_2 } from "../../oregon/units/science-k2";
import { SCIENCE_2 as washingtonUnitsScienceK2SCIENCE_2 } from "../../washington/units/science-k2";
import { units as ontarioG2ScienceUnits } from "../../ontario/g2-science";

// The units South Carolina's Grade 2 science course copies from other frameworks (see ../plan). Import only the
// unit files it adopts from, so the grade's download carries those files and not other frameworks' whole grades.
export const POOL: readonly Unit[] = [
  ...ontarioG2ScienceUnits,
  ...oregonUnitsScienceK2SCIENCE_2,
  ...washingtonUnitsScienceK2SCIENCE_2,
];
