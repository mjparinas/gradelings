import type { Unit } from "../../types";
import { units as albertaKScience } from "../../alberta/k-science";
import { SCIENCE_K as oregonScienceK2SCIENCE_K } from "../../oregon/units/science-k2";
import { SCIENCE_K as washingtonScienceK2SCIENCE_K } from "../../washington/units/science-k2";

// Texas Kindergarten science. POOL is the units this course may copy from other frameworks (see ../plan/science.ts), as the
// exact unit files, so the grade's download carries only those files. OWN is the units written for Texas.
export const POOL: readonly Unit[] = [...albertaKScience, ...washingtonScienceK2SCIENCE_K, ...oregonScienceK2SCIENCE_K];

export const OWN: readonly Unit[] = [];
