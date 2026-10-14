import type { Unit } from "../../types";
import { socialUnits as manitobaUnitsGkMoreSocialSocialUnits } from "../../manitoba/units/gk-more-social";
import { units as ontarioKSocial } from "../../ontario/k-social";
import { SOCIAL_K as californiaUnitsSocialKSOCIAL_K } from "../../california/units/social-k";
import { OWN_SOCIAL_K as oregonUnitsSocialK3OWN_SOCIAL_K } from "../../oregon/units/social-k3";
import { peFirstMapsK as princeEdwardIslandUnitsK1ScienceSocialPeFirstMapsK } from "../../prince-edward-island/units/k1-science-social";
import { UNITS as alabamaUnitsSocialK } from "../../alabama/units/social-k";
import { UNITS as newYorkUnitsSocialK } from "../../new-york/units/social-k";

// The units Arkansas's Kindergarten social studies course copies from other frameworks (see ../plan/social.ts). Import only the
// unit files it adopts from, so the grade's download carries those files and not other frameworks' whole grades.
export const POOL: readonly Unit[] = [...manitobaUnitsGkMoreSocialSocialUnits, ...ontarioKSocial, ...californiaUnitsSocialKSOCIAL_K, ...oregonUnitsSocialK3OWN_SOCIAL_K, princeEdwardIslandUnitsK1ScienceSocialPeFirstMapsK, ...alabamaUnitsSocialK, ...newYorkUnitsSocialK];
