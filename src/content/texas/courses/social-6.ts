import type { Unit } from "../../types";
import { course as gradesG7Social } from "../../grades/g7/social";
import { G6 as washingtonSocial59G6G6 } from "../../washington/units/social-59-g6";

// Texas Grade 6 social. POOL is the units this course may copy from other frameworks (see ../plan/social.ts), as the
// exact unit files, so the grade's download carries only those files. OWN is the units written for Texas.
export const POOL: readonly Unit[] = [...washingtonSocial59G6G6, ...gradesG7Social.units];

export const OWN: readonly Unit[] = [];
