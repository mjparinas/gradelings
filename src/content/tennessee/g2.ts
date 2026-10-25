import type { Course } from "../types";
import { unitsOf, type Pool } from "../placement";
import { motionUnit as albertaG1Science_motionUnit } from "../alberta/g1-science";
import { units as albertaG2Math_units } from "../alberta/g2-math";
import { COPIES_2 as arizonaUnitsCopiesG2_COPIES_2 } from "../arizona/units/copies-g2";
import { LANGUAGE_2 as californiaUnitsLanguageG2_LANGUAGE_2 } from "../california/units/language-g2";
import { MATH_2 as californiaUnitsMathG2_MATH_2 } from "../california/units/math-g2";
import { SOCIAL_2 as californiaUnitsSocialG2_SOCIAL_2 } from "../california/units/social-g2";
import { skipCounting as manitobaUnitsG2Math_skipCounting } from "../manitoba/units/g2-math";
import { evenOdd as manitobaUnitsG2Math_evenOdd } from "../manitoba/units/g2-math";
import { moreLanguage as manitobaUnitsG2MoreLanguage_moreLanguage } from "../manitoba/units/g2-more-language";
import { UNITS as newYorkUnitsSocialG3_UNITS } from "../new-york/units/social-g3";
import { courses as ontarioG1_courses } from "../ontario/g1";
import { courses as ontarioG2_courses } from "../ontario/g2";
import { OWN_SOCIAL_2 as oregonUnitsSocialK3_OWN_SOCIAL_2 } from "../oregon/units/social-k3";
import { peWorkAndPrices2 as princeEdwardIslandUnitsG2ScienceSocial_peWorkAndPrices2 } from "../prince-edward-island/units/g2-science-social";
import { SCIENCE_2 as texasUnitsScience2_SCIENCE_2 } from "../texas/units/science-2";
import { RML_2 as washingtonUnitsLanguageRmlEarly_RML_2 } from "../washington/units/language-rml-early";
import { G2_UNITS as washingtonUnitsMathEarly_G2_UNITS } from "../washington/units/math-early";
import { SCIENCE_2 as washingtonUnitsScienceK2_SCIENCE_2 } from "../washington/units/science-k2";
import { SCIENCE_1 as washingtonUnitsScienceK2_SCIENCE_1 } from "../washington/units/science-k2";
import { tennesseeGrade } from "./kit";
import { OWN } from "./units/own-g2";

// Tennessee Grade 2. POOL holds the files of the units this grade copies from other frameworks (see ./plan),
// so the download carries those files and not the other frameworks' whole grades.
const POOL: Pool = {
  math: [...washingtonUnitsMathEarly_G2_UNITS, ...californiaUnitsMathG2_MATH_2, ...albertaG2Math_units, manitobaUnitsG2Math_skipCounting, manitobaUnitsG2Math_evenOdd],
  language: [...unitsOf(ontarioG2_courses, "language"), ...californiaUnitsLanguageG2_LANGUAGE_2, washingtonUnitsLanguageRmlEarly_RML_2, ...manitobaUnitsG2MoreLanguage_moreLanguage],
  science: [...unitsOf(ontarioG2_courses, "science"), ...washingtonUnitsScienceK2_SCIENCE_2, ...texasUnitsScience2_SCIENCE_2, ...unitsOf(ontarioG1_courses, "science"), albertaG1Science_motionUnit, ...washingtonUnitsScienceK2_SCIENCE_1],
  social: [...californiaUnitsSocialG2_SOCIAL_2, ...newYorkUnitsSocialG3_UNITS, ...arizonaUnitsCopiesG2_COPIES_2, ...unitsOf(ontarioG2_courses, "social"), ...oregonUnitsSocialK3_OWN_SOCIAL_2, princeEdwardIslandUnitsG2ScienceSocial_peWorkAndPrices2],
};

export const courses: Course[] = tennesseeGrade("2", POOL, OWN);
