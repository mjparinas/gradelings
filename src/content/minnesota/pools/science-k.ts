import type { Unit } from "../../types";
import { SCIENCE_K as oregonUnitsScienceK2SCIENCE_K } from "../../oregon/units/science-k2";
import { SCIENCE_K as washingtonUnitsScienceK2SCIENCE_K } from "../../washington/units/science-k2";
import { units as albertaKScienceUnits } from "../../alberta/k-science";

// The units Minnesota's Kindergarten science course copies from other frameworks (see ../plan/science.ts). Import only the unit
// files it adopts from, so the grade's download carries those files and not other frameworks' whole grades.
export const POOL: readonly Unit[] = [...albertaKScienceUnits, ...washingtonUnitsScienceK2SCIENCE_K, ...oregonUnitsScienceK2SCIENCE_K];
