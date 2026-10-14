import type { Unit } from "../../types";
import { units as albertaK } from "../../alberta/k-science";
import { SCIENCE_K as washingtonK } from "../../washington/units/science-k2";
import { SCIENCE_K as oregonK } from "../../oregon/units/science-k2";

// The units New York's Kindergarten science course copies from other frameworks (see ../plan/science.ts). Import only the unit
// files it adopts from, so the grade's download carries those files and not other frameworks' whole grades.
export const POOL: readonly Unit[] = [...albertaK, ...washingtonK, ...oregonK];
