import type { Unit } from "../../types";
import { SCIENCE_K as washingtonUnitsScienceK2SCIENCE_K } from "../../washington/units/science-k2";
import { units as albertaKScience } from "../../alberta/k-science";
import { SCIENCE_K as oregonUnitsScienceK2SCIENCE_K } from "../../oregon/units/science-k2";

// The units Arkansas's Kindergarten science course copies from other frameworks (see ../plan/science.ts). Import only the
// unit files it adopts from, so the grade's download carries those files and not other frameworks' whole grades.
export const POOL: readonly Unit[] = [...washingtonUnitsScienceK2SCIENCE_K, ...albertaKScience, ...oregonUnitsScienceK2SCIENCE_K];
