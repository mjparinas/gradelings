import type { Unit } from "../../types";
import { SCIENCE_K as washingtonUnitsScienceK2SCIENCEK } from "../../washington/units/science-k2";
import { SCIENCE_K as oregonUnitsScienceK2SCIENCEK } from "../../oregon/units/science-k2";
import { units as albertaKScienceUnits } from "../../alberta/k-science";

// The units Pennsylvania's Kindergarten science course copies from other frameworks (see ../plan). Import only the unit files it
// adopts from, so the grade's download carries those files and not other frameworks' whole grades.
export const POOL: readonly Unit[] = [...washingtonUnitsScienceK2SCIENCEK, ...oregonUnitsScienceK2SCIENCEK, ...albertaKScienceUnits];
