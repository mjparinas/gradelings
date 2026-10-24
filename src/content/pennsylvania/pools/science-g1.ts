import type { Unit } from "../../types";
import { SCIENCE_1 as washingtonUnitsScienceK2SCIENCE1 } from "../../washington/units/science-k2";
import { SCIENCE_1 as californiaUnitsScienceG1SCIENCE1 } from "../../california/units/science-g1";

// The units Pennsylvania's Grade 1 science course copies from other frameworks (see ../plan). Import only the unit files it
// adopts from, so the grade's download carries those files and not other frameworks' whole grades.
export const POOL: readonly Unit[] = [...washingtonUnitsScienceK2SCIENCE1, ...californiaUnitsScienceG1SCIENCE1];
