import type { Unit } from "../../types";
import { units as ontarioG2Science } from "../../ontario/g2-science";
import { SCIENCE_2 as oregonScienceK2SCIENCE_2 } from "../../oregon/units/science-k2";
import { SCIENCE_2 as washingtonScienceK2SCIENCE_2 } from "../../washington/units/science-k2";

// Texas Grade 2 science. POOL is the units this course may copy from other frameworks (see ../plan/science.ts), as the
// exact unit files, so the grade's download carries only those files. OWN is the units written for Texas.
export const POOL: readonly Unit[] = [...ontarioG2Science, ...washingtonScienceK2SCIENCE_2, ...oregonScienceK2SCIENCE_2];

export const OWN: readonly Unit[] = [];
