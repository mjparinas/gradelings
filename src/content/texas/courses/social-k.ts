import type { Unit } from "../../types";
import { socialUnits as manitobaGkMoreSocial } from "../../manitoba/units/gk-more-social";
import { units as ontarioKSocial } from "../../ontario/k-social";
import { OWN_SOCIAL_K as oregonSocialK3OWN_SOCIAL_K } from "../../oregon/units/social-k3";

// Texas Kindergarten social. POOL is the units this course may copy from other frameworks (see ../plan/social.ts), as the
// exact unit files, so the grade's download carries only those files. OWN is the units written for Texas.
export const POOL: readonly Unit[] = [...ontarioKSocial, ...manitobaGkMoreSocial, ...oregonSocialK3OWN_SOCIAL_K];

export const OWN: readonly Unit[] = [];
