import type { Unit } from "../../types";
import { SCIENCE_1 as washingtonUnitsScienceK2SCIENCE_1 } from "../../washington/units/science-k2";
import { scienceUnits as manitobaUnitsGkMoreScienceScienceUnits } from "../../manitoba/units/gk-more-science";

// The units South Carolina's Grade 1 science course copies from other frameworks (see ../plan). Import only the
// unit files it adopts from, so the grade's download carries those files and not other frameworks' whole grades.
export const POOL: readonly Unit[] = [...washingtonUnitsScienceK2SCIENCE_1, ...manitobaUnitsGkMoreScienceScienceUnits];
