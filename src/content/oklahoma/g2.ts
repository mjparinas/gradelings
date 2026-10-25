import type { Course } from "../types";
import { type Pool } from "../placement";
import { withLessons } from "../lessons";
import { units as albertaG2Math_units } from "../alberta/g2-math";
import { COPIES_2 as arizonaUnitsCopiesG2_COPIES_2 } from "../arizona/units/copies-g2";
import { FABLES_2 as californiaUnitsLanguageG2_FABLES_2 } from "../california/units/language-g2";
import { FACT_READER_2 as californiaUnitsLanguageG2_FACT_READER_2 } from "../california/units/language-g2";
import { CAPITALS_2 as californiaUnitsLanguageG2_CAPITALS_2 } from "../california/units/language-g2";
import { SOCIAL_2 as californiaUnitsSocialG2_SOCIAL_2 } from "../california/units/social-g2";
import { skipCounting as manitobaUnitsG2Math_skipCounting } from "../manitoba/units/g2-math";
import { evenOdd as manitobaUnitsG2Math_evenOdd } from "../manitoba/units/g2-math";
import { moreLanguage as manitobaUnitsG2MoreLanguage_moreLanguage } from "../manitoba/units/g2-more-language";
import { UNITS as newYorkUnitsSocialG2_UNITS } from "../new-york/units/social-g2";
import { UNITS as newYorkUnitsSocialG3_UNITS } from "../new-york/units/social-g3";
import { units as ontarioG2Language_units } from "../ontario/g2-language";
import { units as ontarioG2Science_units } from "../ontario/g2-science";
import { units as ontarioG2Social_units } from "../ontario/g2-social";
import { SCIENCE_2 as oregonUnitsScienceK2_SCIENCE_2 } from "../oregon/units/science-k2";
import { OWN_SOCIAL_2 as oregonUnitsSocialK3_OWN_SOCIAL_2 } from "../oregon/units/social-k3";
import { peWorkAndPrices2 as princeEdwardIslandUnitsG2ScienceSocial_peWorkAndPrices2 } from "../prince-edward-island/units/g2-science-social";
import { RML_2 as washingtonUnitsLanguageRmlEarly_RML_2 } from "../washington/units/language-rml-early";
import { G2_UNITS as washingtonUnitsMathEarly_G2_UNITS } from "../washington/units/math-early";
import { SCIENCE_2 as washingtonUnitsScienceK2_SCIENCE_2 } from "../washington/units/science-k2";
import { oklahomaGrade } from "./kit";
import { LESSONS } from "./lessons/g2";
import { OWN } from "./units/own-g2";

// Oklahoma Grade 2. POOL holds the files of the units this grade copies from other frameworks (see ./plan),
// so the download carries those files and not the other frameworks' whole grades. LESSONS are the lessons for
// Oklahoma's own units, which ship in this download.
const POOL: Pool = {
  math: [...albertaG2Math_units, manitobaUnitsG2Math_skipCounting, manitobaUnitsG2Math_evenOdd, ...washingtonUnitsMathEarly_G2_UNITS],
  language: [...ontarioG2Language_units, ...manitobaUnitsG2MoreLanguage_moreLanguage, washingtonUnitsLanguageRmlEarly_RML_2, californiaUnitsLanguageG2_FABLES_2, californiaUnitsLanguageG2_FACT_READER_2, californiaUnitsLanguageG2_CAPITALS_2],
  science: [...ontarioG2Science_units, ...washingtonUnitsScienceK2_SCIENCE_2, ...oregonUnitsScienceK2_SCIENCE_2],
  social: [...californiaUnitsSocialG2_SOCIAL_2, ...newYorkUnitsSocialG2_UNITS, ...ontarioG2Social_units, ...oregonUnitsSocialK3_OWN_SOCIAL_2, ...arizonaUnitsCopiesG2_COPIES_2, ...newYorkUnitsSocialG3_UNITS, princeEdwardIslandUnitsG2ScienceSocial_peWorkAndPrices2],
};

export const courses: Course[] = withLessons(oklahomaGrade("2", POOL, OWN), LESSONS);
