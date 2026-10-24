import type { Course } from "../types";
import type { Pool } from "../placement";
import { UNITS as alabamaUnitsSocialG2UNITS } from "../alabama/units/social-g2";
import { units as albertaG2MathUnits } from "../alberta/g2-math";
import { LANGUAGE_2 as californiaUnitsLanguageG2LANGUAGE2 } from "../california/units/language-g2";
import { MATH_2 as californiaUnitsMathG2MATH2 } from "../california/units/math-g2";
import { SOCIAL_2 as californiaUnitsSocialG2SOCIAL2 } from "../california/units/social-g2";
import { evenOdd as manitobaUnitsG2MathEvenOdd, skipCounting as manitobaUnitsG2MathSkipCounting } from "../manitoba/units/g2-math";
import { moreLanguage as manitobaUnitsG2MoreLanguageMoreLanguage } from "../manitoba/units/g2-more-language";
import { moreSocial as manitobaUnitsG2MoreSocialMoreSocial } from "../manitoba/units/g2-more-social";
import { UNITS as newYorkUnitsSocialG2UNITS } from "../new-york/units/social-g2";
import { communityChange as novaScotiaUnitsG2SocialCommunityChange } from "../nova-scotia/units/g2-social";
import { units as ontarioG2LanguageUnits } from "../ontario/g2-language";
import { units as ontarioG2ScienceUnits } from "../ontario/g2-science";
import { units as ontarioG2SocialUnits } from "../ontario/g2-social";
import { SCIENCE_2 as oregonUnitsScienceK2SCIENCE2 } from "../oregon/units/science-k2";
import { OWN_SOCIAL_2 as oregonUnitsSocialK3OWNSOCIAL2 } from "../oregon/units/social-k3";
import { peWorkAndPrices2 as princeEdwardIslandUnitsG2ScienceSocialPeWorkAndPrices2 } from "../prince-edward-island/units/g2-science-social";
import { RML_2 as washingtonUnitsLanguageRmlEarlyRML2 } from "../washington/units/language-rml-early";
import { G2_UNITS as washingtonUnitsMathEarlyG2UNITS } from "../washington/units/math-early";
import { SCIENCE_2 as washingtonUnitsScienceK2SCIENCE2 } from "../washington/units/science-k2";
import { indianaGrade } from "./kit";
import { OWN } from "./units/own-g2";

// Indiana Grade 2. POOL holds the files of the units this grade copies from other frameworks (see ./plan), so
// the download carries those files and not the other frameworks' whole grades.
const POOL: Pool = {
  math: [...albertaG2MathUnits, manitobaUnitsG2MathSkipCounting, manitobaUnitsG2MathEvenOdd, ...washingtonUnitsMathEarlyG2UNITS, ...californiaUnitsMathG2MATH2],
  language: [...ontarioG2LanguageUnits, ...manitobaUnitsG2MoreLanguageMoreLanguage, washingtonUnitsLanguageRmlEarlyRML2, ...californiaUnitsLanguageG2LANGUAGE2],
  science: [...ontarioG2ScienceUnits, ...washingtonUnitsScienceK2SCIENCE2, ...oregonUnitsScienceK2SCIENCE2],
  social: [...ontarioG2SocialUnits, novaScotiaUnitsG2SocialCommunityChange, ...manitobaUnitsG2MoreSocialMoreSocial, ...californiaUnitsSocialG2SOCIAL2, ...oregonUnitsSocialK3OWNSOCIAL2, ...alabamaUnitsSocialG2UNITS, princeEdwardIslandUnitsG2ScienceSocialPeWorkAndPrices2, ...newYorkUnitsSocialG2UNITS],
};

export const courses: Course[] = indianaGrade("2", POOL, OWN);
