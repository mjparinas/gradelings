import type { Unit } from "../../types";
import { units as ontarioKSocial } from "../../ontario/k-social";
import { socialUnits as manitobaGkMoreSocial } from "../../manitoba/units/gk-more-social";
import { peFirstMapsK } from "../../prince-edward-island/units/k1-science-social";
import { OWN_SOCIAL_K as oregonSocialK } from "../../oregon/units/social-k3";

// The units New York's Kindergarten social course copies from other frameworks (see ../plan/social-k3.ts). Import only
// the unit files it adopts from, so the grade's download carries those files and not other frameworks' whole grades.
export const POOL: readonly Unit[] = [...ontarioKSocial, ...manitobaGkMoreSocial, peFirstMapsK, ...oregonSocialK];
