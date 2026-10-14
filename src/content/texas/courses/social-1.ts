import type { Unit } from "../../types";
import { units as ontarioG1Social } from "../../ontario/g1-social";
import { OWN_SOCIAL_1 as washingtonSocialK4G1OWN_SOCIAL_1 } from "../../washington/units/social-k4-g1";

// Texas Grade 1 social. POOL is the units this course may copy from other frameworks (see ../plan/social.ts), as the
// exact unit files, so the grade's download carries only those files. OWN is the units written for Texas.
export const POOL: readonly Unit[] = [...ontarioG1Social, ...washingtonSocialK4G1OWN_SOCIAL_1];

export const OWN: readonly Unit[] = [];
