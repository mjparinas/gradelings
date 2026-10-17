import type { Unit } from "../../types";
import { UNITS as newYorkUnitsSocialG3UNITS } from "../../new-york/units/social-g3";
import { SOCIAL_2 as californiaUnitsSocialG2SOCIAL2 } from "../../california/units/social-g2";
import { communityChange as novaScotiaUnitsG2SocialCommunityChange } from "../../nova-scotia/units/g2-social";
import { peWorkAndPrices2 as princeEdwardIslandUnitsG2ScienceSocialPeWorkAndPrices2 } from "../../prince-edward-island/units/g2-science-social";
import { moreSocial as manitobaUnitsG2MoreSocial } from "../../manitoba/units/g2-more-social";
import { COPIES_2 as arizonaUnitsCopiesG2COPIES2 } from "../../arizona/units/copies-g2";
import { units as ontarioG2SocialUnits } from "../../ontario/g2-social";
import { UNITS as alabamaUnitsSocialG2UNITS } from "../../alabama/units/social-g2";

// The units Florida's Grade 2 social studies course copies from other frameworks (see ../plan). Import only the unit files it
// adopts from, so the grade's download carries those files and not other frameworks' whole grades.
export const POOL: readonly Unit[] = [...newYorkUnitsSocialG3UNITS, ...californiaUnitsSocialG2SOCIAL2, novaScotiaUnitsG2SocialCommunityChange, princeEdwardIslandUnitsG2ScienceSocialPeWorkAndPrices2, ...manitobaUnitsG2MoreSocial.filter((u) => u.id === "mb-working-together"), ...arizonaUnitsCopiesG2COPIES2, ...ontarioG2SocialUnits, ...alabamaUnitsSocialG2UNITS];
