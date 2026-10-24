import type { Unit } from "../../types";
import { SCIENCE_2 as oregonUnitsScienceK2SCIENCE2 } from "../../oregon/units/science-k2";
import { SCIENCE_2 as alaskaUnitsScienceG2SCIENCE2 } from "../../alaska/units/science-g2";
import { SCIENCE_2 as washingtonUnitsScienceK2SCIENCE2 } from "../../washington/units/science-k2";
import { units as ontarioG2ScienceUnits } from "../../ontario/g2-science";

// The units Pennsylvania's Grade 2 science course copies from other frameworks (see ../plan). Import only the unit files it
// adopts from, so the grade's download carries those files and not other frameworks' whole grades.
export const POOL: readonly Unit[] = [...oregonUnitsScienceK2SCIENCE2, ...alaskaUnitsScienceG2SCIENCE2, ...washingtonUnitsScienceK2SCIENCE2, ...ontarioG2ScienceUnits];
