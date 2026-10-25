import type { Course } from "../types";
import type { Pool } from "../placement";
import { units as albertaG2Math_units } from "../alberta/g2-math";
import { FABLES_2 as californiaUnitsLanguageG2_FABLES_2 } from "../california/units/language-g2";
import { FACT_READER_2 as californiaUnitsLanguageG2_FACT_READER_2 } from "../california/units/language-g2";
import { CAPITALS_2 as californiaUnitsLanguageG2_CAPITALS_2 } from "../california/units/language-g2";
import { ADD_FOUR_2 as californiaUnitsMathG2_ADD_FOUR_2 } from "../california/units/math-g2";
import { LENGTHS_2 as californiaUnitsMathG2_LENGTHS_2 } from "../california/units/math-g2";
import { SOCIAL_2 as californiaUnitsSocialG2_SOCIAL_2 } from "../california/units/social-g2";
import { skipCounting as manitobaUnitsG2Math_skipCounting } from "../manitoba/units/g2-math";
import { evenOdd as manitobaUnitsG2Math_evenOdd } from "../manitoba/units/g2-math";
import { moreLanguage as manitobaUnitsG2MoreLanguage_moreLanguage } from "../manitoba/units/g2-more-language";
import { UNITS as newYorkUnitsSocialG1_UNITS } from "../new-york/units/social-g1";
import { UNITS as newYorkUnitsSocialG3_UNITS } from "../new-york/units/social-g3";
import { units as ontarioG2Language_units } from "../ontario/g2-language";
import { units as ontarioG2Science_units } from "../ontario/g2-science";
import { units as ontarioG2Social_units } from "../ontario/g2-social";
import { SCIENCE_2 as oregonUnitsScienceK2_SCIENCE_2 } from "../oregon/units/science-k2";
import { OWN_SOCIAL_2 as oregonUnitsSocialK3_OWN_SOCIAL_2 } from "../oregon/units/social-k3";
import { RML_2 as washingtonUnitsLanguageRmlEarly_RML_2 } from "../washington/units/language-rml-early";
import { G2_UNITS as washingtonUnitsMathEarly_G2_UNITS } from "../washington/units/math-early";
import { SCIENCE_2 as washingtonUnitsScienceK2_SCIENCE_2 } from "../washington/units/science-k2";
import { withLessons } from "../lessons";
import { louisianaGrade } from "./kit";
import { LESSONS } from "./lessons/g2";
import { OWN } from "./units/own-g2";

// Louisiana Grade 2. POOL holds the files of the units this grade copies from other frameworks (see ./plan),
// so the download carries those files and not the other frameworks' whole grades. LESSONS adds the lessons for
// Louisiana's own units and for units it teaches in a different grade from the original.
const POOL: Pool = {
  math: [...albertaG2Math_units, manitobaUnitsG2Math_skipCounting, manitobaUnitsG2Math_evenOdd, ...washingtonUnitsMathEarly_G2_UNITS, californiaUnitsMathG2_ADD_FOUR_2, californiaUnitsMathG2_LENGTHS_2],
  language: [...ontarioG2Language_units, ...manitobaUnitsG2MoreLanguage_moreLanguage, washingtonUnitsLanguageRmlEarly_RML_2, californiaUnitsLanguageG2_FABLES_2, californiaUnitsLanguageG2_FACT_READER_2, californiaUnitsLanguageG2_CAPITALS_2],
  science: [...ontarioG2Science_units, ...washingtonUnitsScienceK2_SCIENCE_2, ...oregonUnitsScienceK2_SCIENCE_2],
  social: [...ontarioG2Social_units, ...newYorkUnitsSocialG1_UNITS, ...californiaUnitsSocialG2_SOCIAL_2, ...newYorkUnitsSocialG3_UNITS, ...oregonUnitsSocialK3_OWN_SOCIAL_2],
};

export const courses: Course[] = withLessons(louisianaGrade("2", POOL, OWN), LESSONS);
