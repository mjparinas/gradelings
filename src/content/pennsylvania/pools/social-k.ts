import type { Unit } from "../../types";
import { socialUnits as manitobaUnitsGkMoreSocialSocialUnits } from "../../manitoba/units/gk-more-social";
import { SOCIAL_K as californiaUnitsSocialKSOCIALK } from "../../california/units/social-k";
import { UNITS as newYorkUnitsSocialKUNITS } from "../../new-york/units/social-k";
import { units as ontarioKSocialUnits } from "../../ontario/k-social";
import { OWN_SOCIAL_K as oregonUnitsSocialK3OWNSOCIALK } from "../../oregon/units/social-k3";
import { peFirstMapsK as princeEdwardIslandUnitsK1ScienceSocialPeFirstMapsK } from "../../prince-edward-island/units/k1-science-social";
import { UNITS as alabamaUnitsSocialKUNITS } from "../../alabama/units/social-k";

// The units Pennsylvania's Kindergarten social studies course copies from other frameworks (see ../plan). Import only the unit files it
// adopts from, so the grade's download carries those files and not other frameworks' whole grades.
export const POOL: readonly Unit[] = [...manitobaUnitsGkMoreSocialSocialUnits, ...californiaUnitsSocialKSOCIALK, ...newYorkUnitsSocialKUNITS, ...ontarioKSocialUnits, ...oregonUnitsSocialK3OWNSOCIALK, princeEdwardIslandUnitsK1ScienceSocialPeFirstMapsK, ...alabamaUnitsSocialKUNITS];
