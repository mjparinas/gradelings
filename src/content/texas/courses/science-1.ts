import type { Unit } from "../../types";
import { SCIENCE_1 as washingtonScienceK2SCIENCE_1 } from "../../washington/units/science-k2";

// Texas Grade 1 science. POOL is the units this course may copy from other frameworks (see ../plan/science.ts), as the
// exact unit files, so the grade's download carries only those files. OWN is the units written for Texas.
export const POOL: readonly Unit[] = [...washingtonScienceK2SCIENCE_1];

export const OWN: readonly Unit[] = [];
