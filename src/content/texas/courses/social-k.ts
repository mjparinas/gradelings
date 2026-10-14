import type { Unit } from "../../types";
import { SOCIAL_K as californiaSocialK } from "../../california/units/social-k";
import { socialUnits as manitobaGkMoreSocial } from "../../manitoba/units/gk-more-social";
import { units as ontarioKSocial } from "../../ontario/k-social";
import { SOCIAL_K } from "../units/social-gk";

// Texas Kindergarten social. POOL is the units this course may copy from other frameworks (see ../plan/social.ts), as the
// exact unit files, so the grade's download carries only those files. OWN is the units written for Texas.
export const POOL: readonly Unit[] = [...ontarioKSocial, ...manitobaGkMoreSocial, ...californiaSocialK];

export const OWN: readonly Unit[] = SOCIAL_K;
