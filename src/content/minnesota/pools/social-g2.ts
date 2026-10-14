import type { Unit } from "../../types";
import { SOCIAL_2 as californiaUnitsSocialG2SOCIAL_2 } from "../../california/units/social-g2";
import { communityChange as novaScotiaUnitsG2SocialCommunityChange } from "../../nova-scotia/units/g2-social";
import { moreSocial as manitobaUnitsG2MoreSocialMoreSocial } from "../../manitoba/units/g2-more-social";
import { peWorkAndPrices2 as princeEdwardIslandUnitsG2ScienceSocialPeWorkAndPrices2 } from "../../prince-edward-island/units/g2-science-social";
import { units as albertaG2SocialUnits } from "../../alberta/g2-social";
import { units as ontarioG2SocialUnits } from "../../ontario/g2-social";

// The units Minnesota's Grade 2 social studies course copies from other frameworks (see ../plan/social.ts). Import only the unit
// files it adopts from, so the grade's download carries those files and not other frameworks' whole grades.
export const POOL: readonly Unit[] = [...ontarioG2SocialUnits, ...albertaG2SocialUnits, ...manitobaUnitsG2MoreSocialMoreSocial, ...californiaUnitsSocialG2SOCIAL_2, novaScotiaUnitsG2SocialCommunityChange, princeEdwardIslandUnitsG2ScienceSocialPeWorkAndPrices2];
