import type { Course } from "../types";
import type { Pool } from "../placement";
import { units as albertaG2Math } from "../alberta/g2-math";
import { skipCounting as manitobaUnitsG2MathSkipCounting } from "../manitoba/units/g2-math";
import { evenOdd as manitobaUnitsG2MathEvenOdd } from "../manitoba/units/g2-math";
import { G2_UNITS as washingtonUnitsMathEarlyG2_UNITS } from "../washington/units/math-early";
import { MATH_2 as californiaUnitsMathG2MATH_2 } from "../california/units/math-g2";
import { units as ontarioG2Language } from "../ontario/g2-language";
import { moreLanguage as manitobaUnitsG2MoreLanguageMoreLanguage } from "../manitoba/units/g2-more-language";
import { RML_2 as washingtonUnitsLanguageRmlEarlyRML_2 } from "../washington/units/language-rml-early";
import { LANGUAGE_2 as californiaUnitsLanguageG2LANGUAGE_2 } from "../california/units/language-g2";
import { units as ontarioG2Science } from "../ontario/g2-science";
import { SCIENCE_2 as washingtonUnitsScienceK2SCIENCE_2 } from "../washington/units/science-k2";
import { SCIENCE_2 as oregonUnitsScienceK2SCIENCE_2 } from "../oregon/units/science-k2";
import { OWN_SOCIAL_2 as washingtonUnitsSocialK4G2OWN_SOCIAL_2 } from "../washington/units/social-k4-g2";
import { OWN_SOCIAL_2 as oregonUnitsSocialK3OWN_SOCIAL_2 } from "../oregon/units/social-k3";
import { UNITS as newYorkUnitsSocialG3UNITS } from "../new-york/units/social-g3";
import { units as ontarioG2Social } from "../ontario/g2-social";
import { SOCIAL_2 as californiaUnitsSocialG2SOCIAL_2 } from "../california/units/social-g2";
import { massachusettsGrade } from "./kit";
import { OWN } from "./units/own-g2";

// Massachusetts Grade 2. POOL holds the files of the units this grade copies from other frameworks (see ./plan), so
// the download carries those files and not the other frameworks' whole grades.
const POOL: Pool = {
  math: [...albertaG2Math, manitobaUnitsG2MathSkipCounting, manitobaUnitsG2MathEvenOdd, ...washingtonUnitsMathEarlyG2_UNITS, ...californiaUnitsMathG2MATH_2],
  language: [...ontarioG2Language, ...manitobaUnitsG2MoreLanguageMoreLanguage, washingtonUnitsLanguageRmlEarlyRML_2, ...californiaUnitsLanguageG2LANGUAGE_2],
  science: [...ontarioG2Science, ...washingtonUnitsScienceK2SCIENCE_2, ...oregonUnitsScienceK2SCIENCE_2],
  social: [...washingtonUnitsSocialK4G2OWN_SOCIAL_2, ...oregonUnitsSocialK3OWN_SOCIAL_2, ...newYorkUnitsSocialG3UNITS, ...ontarioG2Social, ...californiaUnitsSocialG2SOCIAL_2],
};

export const courses: Course[] = massachusettsGrade("2", POOL, OWN);
