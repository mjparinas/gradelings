import type { Unit } from "../../types";
import { OWN_SOCIAL_K as oregonUnitsSocialK3OWN_SOCIAL_K } from "../../oregon/units/social-k3";
import { SOCIAL_K as californiaUnitsSocialKSOCIAL_K } from "../../california/units/social-k";
import { UNITS as alabamaUnitsSocialKUNITS } from "../../alabama/units/social-k";
import { course as gradesKSocialCourse } from "../../grades/k/social";
import { peFirstMapsK as princeEdwardIslandUnitsK1ScienceSocialPeFirstMapsK } from "../../prince-edward-island/units/k1-science-social";
import { socialUnits as manitobaUnitsGkMoreSocialSocialUnits } from "../../manitoba/units/gk-more-social";
import { units as ontarioKSocialUnits } from "../../ontario/k-social";

// The units South Carolina's Kindergarten social studies course copies from other frameworks (see ../plan). Import only the
// unit files it adopts from, so the grade's download carries those files and not other frameworks' whole grades.
export const POOL: readonly Unit[] = [
  ...gradesKSocialCourse.units,
  ...oregonUnitsSocialK3OWN_SOCIAL_K,
  ...ontarioKSocialUnits,
  princeEdwardIslandUnitsK1ScienceSocialPeFirstMapsK,
  ...manitobaUnitsGkMoreSocialSocialUnits,
  ...californiaUnitsSocialKSOCIAL_K,
  ...alabamaUnitsSocialKUNITS,
];
