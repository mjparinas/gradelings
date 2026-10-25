import type { Unit } from "../../types";
import { OWN_SOCIAL_2 as oregonUnitsSocialK3OWN_SOCIAL_2 } from "../../oregon/units/social-k3";
import { SOCIAL_2 as californiaUnitsSocialG2SOCIAL_2 } from "../../california/units/social-g2";
import { communityChange as novaScotiaUnitsG2SocialCommunityChange } from "../../nova-scotia/units/g2-social";
import { moreSocial as manitobaUnitsG2MoreSocialMoreSocial } from "../../manitoba/units/g2-more-social";
import { peWorkAndPrices2 as princeEdwardIslandUnitsG2ScienceSocialPeWorkAndPrices2 } from "../../prince-edward-island/units/g2-science-social";
import { units as ontarioG2SocialUnits } from "../../ontario/g2-social";

// The units South Carolina's Grade 2 social studies course copies from other frameworks (see ../plan). Import only the
// unit files it adopts from, so the grade's download carries those files and not other frameworks' whole grades.
export const POOL: readonly Unit[] = [
  ...californiaUnitsSocialG2SOCIAL_2,
  ...manitobaUnitsG2MoreSocialMoreSocial,
  princeEdwardIslandUnitsG2ScienceSocialPeWorkAndPrices2,
  ...ontarioG2SocialUnits,
  ...oregonUnitsSocialK3OWN_SOCIAL_2,
  novaScotiaUnitsG2SocialCommunityChange,
];
