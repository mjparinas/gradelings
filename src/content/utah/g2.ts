import type { Course } from "../types";
import type { Pool } from "../placement";
import { units as albertaG2Math_units } from "../alberta/g2-math";
import { COPIES_2 as arizonaUnitsCopiesG2_COPIES_2 } from "../arizona/units/copies-g2";
import { LANGUAGE_2 as californiaUnitsLanguageG2_LANGUAGE_2 } from "../california/units/language-g2";
import { MATH_2 as californiaUnitsMathG2_MATH_2 } from "../california/units/math-g2";
import { SOCIAL_2 as californiaUnitsSocialG2_SOCIAL_2 } from "../california/units/social-g2";
import { evenOdd as manitobaUnitsG2Math_evenOdd } from "../manitoba/units/g2-math";
import { skipCounting as manitobaUnitsG2Math_skipCounting } from "../manitoba/units/g2-math";
import { moreLanguage as manitobaUnitsG2MoreLanguage_moreLanguage } from "../manitoba/units/g2-more-language";
import { UNITS as newYorkUnitsSocialG1_UNITS } from "../new-york/units/social-g1";
import { UNITS as newYorkUnitsSocialG2_UNITS } from "../new-york/units/social-g2";
import { UNITS as newYorkUnitsSocialG3_UNITS } from "../new-york/units/social-g3";
import { units as ontarioG2Language_units } from "../ontario/g2-language";
import { units as ontarioG2Science_units } from "../ontario/g2-science";
import { units as ontarioG2Social_units } from "../ontario/g2-social";
import { SCIENCE_2 as oregonUnitsScienceK2_SCIENCE_2 } from "../oregon/units/science-k2";
import { OWN_SOCIAL_2 as oregonUnitsSocialK3_OWN_SOCIAL_2 } from "../oregon/units/social-k3";
import { peNeedsAndWants1 as princeEdwardIslandUnitsK1ScienceSocial_peNeedsAndWants1 } from "../prince-edward-island/units/k1-science-social";
import { RML_2 as washingtonUnitsLanguageRmlEarly_RML_2 } from "../washington/units/language-rml-early";
import { G2_UNITS as washingtonUnitsMathEarly_G2_UNITS } from "../washington/units/math-early";
import { SCIENCE_1 as washingtonUnitsScienceK2_SCIENCE_1 } from "../washington/units/science-k2";
import { SCIENCE_2 as washingtonUnitsScienceK2_SCIENCE_2 } from "../washington/units/science-k2";
import { withLessons } from "../lessons";
import { utahGrade } from "./kit";
import { LESSONS } from "./lessons/g2";
import { OWN } from "./units/own-g2";

// Utah Grade 2. POOL holds the files of the units this grade copies from other frameworks (see ./plan), so the
// download carries those files and not the other frameworks' whole grades. LESSONS are the lessons for Utah's own
// units and for units Utah teaches in a different grade from the original, which ship in this download.
const POOL: Pool = {
  math: [...washingtonUnitsMathEarly_G2_UNITS, ...californiaUnitsMathG2_MATH_2, ...albertaG2Math_units, manitobaUnitsG2Math_evenOdd, manitobaUnitsG2Math_skipCounting],
  language: [...ontarioG2Language_units, ...californiaUnitsLanguageG2_LANGUAGE_2, washingtonUnitsLanguageRmlEarly_RML_2, ...manitobaUnitsG2MoreLanguage_moreLanguage],
  science: [...oregonUnitsScienceK2_SCIENCE_2, ...washingtonUnitsScienceK2_SCIENCE_1, ...washingtonUnitsScienceK2_SCIENCE_2, ...ontarioG2Science_units],
  social: [...californiaUnitsSocialG2_SOCIAL_2, ...ontarioG2Social_units, princeEdwardIslandUnitsK1ScienceSocial_peNeedsAndWants1, ...arizonaUnitsCopiesG2_COPIES_2, ...oregonUnitsSocialK3_OWN_SOCIAL_2, ...newYorkUnitsSocialG1_UNITS, ...newYorkUnitsSocialG2_UNITS, ...newYorkUnitsSocialG3_UNITS],
};

export const courses: Course[] = withLessons(utahGrade("2", POOL, OWN), LESSONS);
