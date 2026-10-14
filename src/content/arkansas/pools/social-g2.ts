import type { Unit } from "../../types";
import { SOCIAL_2 as californiaUnitsSocialG2SOCIAL_2 } from "../../california/units/social-g2";
import { UNITS as newYorkUnitsSocialG2 } from "../../new-york/units/social-g2";
import { moreSocial as manitobaUnitsG2MoreSocialMoreSocial } from "../../manitoba/units/g2-more-social";
import { peWorkAndPrices2 as princeEdwardIslandUnitsG2ScienceSocialPeWorkAndPrices2 } from "../../prince-edward-island/units/g2-science-social";
import { OWN_SOCIAL_2 as oregonUnitsSocialK3OWN_SOCIAL_2 } from "../../oregon/units/social-k3";
import { units as ontarioG2Social } from "../../ontario/g2-social";
import { communityChange as novaScotiaUnitsG2SocialCommunityChange } from "../../nova-scotia/units/g2-social";

// The units Arkansas's Grade 2 social studies course copies from other frameworks (see ../plan/social.ts). Import only the
// unit files it adopts from, so the grade's download carries those files and not other frameworks' whole grades.
export const POOL: readonly Unit[] = [...californiaUnitsSocialG2SOCIAL_2, ...newYorkUnitsSocialG2, ...manitobaUnitsG2MoreSocialMoreSocial, princeEdwardIslandUnitsG2ScienceSocialPeWorkAndPrices2, ...oregonUnitsSocialK3OWN_SOCIAL_2, ...ontarioG2Social, novaScotiaUnitsG2SocialCommunityChange];
