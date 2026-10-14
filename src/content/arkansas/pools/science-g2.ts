import type { Unit } from "../../types";
import { units as ontarioG2Science } from "../../ontario/g2-science";
import { SCIENCE_2 as oregonUnitsScienceK2SCIENCE_2 } from "../../oregon/units/science-k2";
import { SCIENCE_2 as washingtonUnitsScienceK2SCIENCE_2 } from "../../washington/units/science-k2";

// The units Arkansas's Grade 2 science course copies from other frameworks (see ../plan/science.ts). Import only the
// unit files it adopts from, so the grade's download carries those files and not other frameworks' whole grades.
export const POOL: readonly Unit[] = [...ontarioG2Science, ...oregonUnitsScienceK2SCIENCE_2, ...washingtonUnitsScienceK2SCIENCE_2];
