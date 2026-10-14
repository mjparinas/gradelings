import type { Unit } from "../../types";
import { units as albertaG1Science } from "../../alberta/g1-science";
import { units as ontarioG1Science } from "../../ontario/g1-science";
import { SCIENCE_1 as washingtonScience1 } from "../../washington/units/science-k2";
import { SCIENCE_1 as texasScience1 } from "../units/science-1";

// Texas Grade 1 science. POOL is the units this course may copy from other frameworks (see ../plan/science.ts), as the
// exact unit files, so the grade's download carries only those files. OWN is the units written for Texas.
export const POOL: readonly Unit[] = [...albertaG1Science, ...ontarioG1Science, ...washingtonScience1];

export const OWN: readonly Unit[] = texasScience1;
