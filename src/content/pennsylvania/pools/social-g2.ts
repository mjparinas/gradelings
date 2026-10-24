import type { Unit } from "../../types";
import { units as ontarioG2SocialUnits } from "../../ontario/g2-social";
import { SOCIAL_2 as californiaUnitsSocialG2SOCIAL2 } from "../../california/units/social-g2";
import { pePeopleWhoChangeThings2 as princeEdwardIslandUnitsG2ScienceSocialPePeopleWhoChangeThings2 } from "../../prince-edward-island/units/g2-science-social";
import { peChangesInMyLife2 as princeEdwardIslandUnitsG2ScienceSocialPeChangesInMyLife2 } from "../../prince-edward-island/units/g2-science-social";
import { communityChange as novaScotiaUnitsG2SocialCommunityChange } from "../../nova-scotia/units/g2-social";
import { peTechnology2 as princeEdwardIslandUnitsG2ScienceSocialPeTechnology2 } from "../../prince-edward-island/units/g2-science-social";
import { peWorkAndPrices2 as princeEdwardIslandUnitsG2ScienceSocialPeWorkAndPrices2 } from "../../prince-edward-island/units/g2-science-social";
import { peChangingLand2 as princeEdwardIslandUnitsG2ScienceSocialPeChangingLand2 } from "../../prince-edward-island/units/g2-science-social";
import { COPIES_2 as arizonaUnitsCopiesG2COPIES2 } from "../../arizona/units/copies-g2";
import { UNITS as newYorkUnitsSocialG2UNITS } from "../../new-york/units/social-g2";
import { UNITS as alabamaUnitsSocialG2UNITS } from "../../alabama/units/social-g2";

// The units Pennsylvania's Grade 2 social studies course copies from other frameworks (see ../plan). Import only the unit files it
// adopts from, so the grade's download carries those files and not other frameworks' whole grades.
export const POOL: readonly Unit[] = [...ontarioG2SocialUnits, ...californiaUnitsSocialG2SOCIAL2, princeEdwardIslandUnitsG2ScienceSocialPePeopleWhoChangeThings2, princeEdwardIslandUnitsG2ScienceSocialPeChangesInMyLife2, novaScotiaUnitsG2SocialCommunityChange, princeEdwardIslandUnitsG2ScienceSocialPeTechnology2, princeEdwardIslandUnitsG2ScienceSocialPeWorkAndPrices2, princeEdwardIslandUnitsG2ScienceSocialPeChangingLand2, ...arizonaUnitsCopiesG2COPIES2, ...newYorkUnitsSocialG2UNITS, ...alabamaUnitsSocialG2UNITS];
