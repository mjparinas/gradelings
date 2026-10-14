import type { Unit } from "../../types";
import { OWN_SOCIAL_K as oregonUnitsSocialK3OWN_SOCIAL_K } from "../../oregon/units/social-k3";
import { peFirstMapsK as princeEdwardIslandUnitsK1ScienceSocialPeFirstMapsK } from "../../prince-edward-island/units/k1-science-social";
import { socialUnits as manitobaUnitsGkMoreSocialSocialUnits } from "../../manitoba/units/gk-more-social";
import { units as ontarioKSocialUnits } from "../../ontario/k-social";

// The units Minnesota's Kindergarten social studies course copies from other frameworks (see ../plan/social.ts). Import only the unit
// files it adopts from, so the grade's download carries those files and not other frameworks' whole grades.
export const POOL: readonly Unit[] = [...ontarioKSocialUnits, ...manitobaUnitsGkMoreSocialSocialUnits, princeEdwardIslandUnitsK1ScienceSocialPeFirstMapsK, ...oregonUnitsSocialK3OWN_SOCIAL_K];
