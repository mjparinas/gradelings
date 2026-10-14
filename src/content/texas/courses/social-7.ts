import type { Unit } from "../../types";
import { units as albertaG8Social } from "../../alberta/g8-social";
import { course as gradesG8Social } from "../../grades/g8/social";
import { OWN_SOCIAL_7 as oregonSocialG67OWN_SOCIAL_7 } from "../../oregon/units/social-g67";

// Texas Grade 7 social. POOL is the units this course may copy from other frameworks (see ../plan/social.ts), as the
// exact unit files, so the grade's download carries only those files. OWN is the units written for Texas.
export const POOL: readonly Unit[] = [...gradesG8Social.units, ...oregonSocialG67OWN_SOCIAL_7, ...albertaG8Social];

export const OWN: readonly Unit[] = [];
