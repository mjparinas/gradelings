import type { Unit } from "../../types";
import { units as ontarioG1SocialUnits } from "../../ontario/g1-social";
import { UNITS as newYorkUnitsSocialG1UNITS } from "../../new-york/units/social-g1";
import { SOCIAL_1 as californiaUnitsSocialG1SOCIAL1 } from "../../california/units/social-g1";
import { peGoodsAndServices1 as princeEdwardIslandUnitsK1ScienceSocialPeGoodsAndServices1 } from "../../prince-edward-island/units/k1-science-social";
import { peNeedsAndWants1 as princeEdwardIslandUnitsK1ScienceSocialPeNeedsAndWants1 } from "../../prince-edward-island/units/k1-science-social";
import { thinkingSkills as manitobaUnitsG1MoreSocialThinkingSkills } from "../../manitoba/units/g1-more-social";
import { OWN_SOCIAL_1 as washingtonUnitsSocialK4G1OWNSOCIAL1 } from "../../washington/units/social-k4-g1";

// The units Pennsylvania's Grade 1 social studies course copies from other frameworks (see ../plan). Import only the unit files it
// adopts from, so the grade's download carries those files and not other frameworks' whole grades.
export const POOL: readonly Unit[] = [...ontarioG1SocialUnits, ...newYorkUnitsSocialG1UNITS, ...californiaUnitsSocialG1SOCIAL1, princeEdwardIslandUnitsK1ScienceSocialPeGoodsAndServices1, princeEdwardIslandUnitsK1ScienceSocialPeNeedsAndWants1, manitobaUnitsG1MoreSocialThinkingSkills, ...washingtonUnitsSocialK4G1OWNSOCIAL1];
