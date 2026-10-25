import type { Course } from "../types";
import { unitsOf, type Pool } from "../placement";
import { units as albertaG1Math_units } from "../alberta/g1-math";
import { LANGUAGE_1 as californiaUnitsLanguageG1_LANGUAGE_1 } from "../california/units/language-g1";
import { THREE_ADDENDS_1 as californiaUnitsMathG1_THREE_ADDENDS_1 } from "../california/units/math-g1";
import { SOCIAL_1 as californiaUnitsSocialG1_SOCIAL_1 } from "../california/units/social-g1";
import { SOCIAL_K as californiaUnitsSocialK_SOCIAL_K } from "../california/units/social-k";
import { life as manitobaUnitsG3Science_life } from "../manitoba/units/g3-science";
import { scienceUnits as manitobaUnitsGkMoreScience_scienceUnits } from "../manitoba/units/gk-more-science";
import { UNITS as newYorkUnitsScienceG1_UNITS } from "../new-york/units/science-g1";
import { courses as ontarioG1_courses } from "../ontario/g1";
import { units as ontarioG1Language_units } from "../ontario/g1-language";
import { courses as ontarioG3_courses } from "../ontario/g3";
import { STORY_OR_FACTS as oregonUnitsLanguageReading_STORY_OR_FACTS } from "../oregon/units/language-reading";
import { peGoodsAndServices1 as princeEdwardIslandUnitsK1ScienceSocial_peGoodsAndServices1 } from "../prince-edward-island/units/k1-science-social";
import { RML_1 as washingtonUnitsLanguageRmlEarly_RML_1 } from "../washington/units/language-rml-early";
import { G1_UNITS as washingtonUnitsMathEarly_G1_UNITS } from "../washington/units/math-early";
import { SCIENCE_K as washingtonUnitsScienceK2_SCIENCE_K } from "../washington/units/science-k2";
import { SCIENCE_1 as washingtonUnitsScienceK2_SCIENCE_1 } from "../washington/units/science-k2";
import { OWN_SOCIAL_1 as washingtonUnitsSocialK4G1_OWN_SOCIAL_1 } from "../washington/units/social-k4-g1";
import { tennesseeGrade } from "./kit";
import { OWN } from "./units/own-g1";

// Tennessee Grade 1. POOL holds the files of the units this grade copies from other frameworks (see ./plan),
// so the download carries those files and not the other frameworks' whole grades.
const POOL: Pool = {
  math: [...albertaG1Math_units, ...washingtonUnitsMathEarly_G1_UNITS, californiaUnitsMathG1_THREE_ADDENDS_1, ...unitsOf(ontarioG1_courses, "math")],
  language: [...ontarioG1Language_units, ...californiaUnitsLanguageG1_LANGUAGE_1, oregonUnitsLanguageReading_STORY_OR_FACTS, washingtonUnitsLanguageRmlEarly_RML_1],
  science: [...unitsOf(ontarioG1_courses, "science"), ...washingtonUnitsScienceK2_SCIENCE_K, ...newYorkUnitsScienceG1_UNITS, manitobaUnitsG3Science_life, ...manitobaUnitsGkMoreScience_scienceUnits, ...unitsOf(ontarioG3_courses, "science"), ...washingtonUnitsScienceK2_SCIENCE_1],
  social: [...unitsOf(ontarioG1_courses, "social"), ...washingtonUnitsSocialK4G1_OWN_SOCIAL_1, ...californiaUnitsSocialG1_SOCIAL_1, ...californiaUnitsSocialK_SOCIAL_K, princeEdwardIslandUnitsK1ScienceSocial_peGoodsAndServices1],
};

export const courses: Course[] = tennesseeGrade("1", POOL, OWN);
