import type { Unit } from "../../types";
import { SOCIAL_1 as californiaSocialG1 } from "../../california/units/social-g1";
import { units as ontarioG1Social } from "../../ontario/g1-social";
import { OWN_SOCIAL_1 as washingtonSocialK4G1OWN_SOCIAL_1 } from "../../washington/units/social-k4-g1";
import { SOCIAL_1 } from "../units/social-g1";

// Texas Grade 1 social. POOL is the units this course may copy from other frameworks (see ../plan/social.ts), as the
// exact unit files, so the grade's download carries only those files. OWN is the units written for Texas.
export const POOL: readonly Unit[] = [...ontarioG1Social, ...washingtonSocialK4G1OWN_SOCIAL_1, ...californiaSocialG1];

export const OWN: readonly Unit[] = SOCIAL_1;
