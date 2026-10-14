import type { Unit } from "../../types";
import { G6 as washingtonSocial59G6G6 } from "../../washington/units/social-59-g6";
import { SOCIAL_6 } from "../units/social-g6";

// Texas Grade 6 social. POOL is the units this course may copy from other frameworks (see ../plan/social.ts), as the
// exact unit files, so the grade's download carries only those files. OWN is the units written for Texas.
export const POOL: readonly Unit[] = [...washingtonSocial59G6G6];

export const OWN: readonly Unit[] = SOCIAL_6;
