import type { Course } from "../types";
import { unitsOf, type Pool } from "../placement";
import { LANGUAGE_9 as californiaUnitsLanguageG9_LANGUAGE_9 } from "../california/units/language-g9";
import { MATH_9 as californiaUnitsMathG9_MATH_9 } from "../california/units/math-g9";
import { OWN_SCIENCE as californiaUnitsScienceG9_OWN_SCIENCE } from "../california/units/science-g9";
import { PHYSICAL_SCIENCE as californiaUnitsScienceG9Physical_PHYSICAL_SCIENCE } from "../california/units/science-g9-physical";
import { SOCIAL_9 as californiaUnitsSocialG9_SOCIAL_9 } from "../california/units/social-g9";
import { units as manitobaUnitsG9MoreLanguage_units } from "../manitoba/units/g9-more-language";
import { courses as ontarioG9_courses } from "../ontario/g9";
import { units as ontarioG9Language_units } from "../ontario/g9-language";
import { MEDIA_ANALYSIS as oregonUnitsLanguage_MEDIA_ANALYSIS } from "../oregon/units/language";
import { OWN_SOCIAL_9 as oregonUnitsSocialG9_OWN_SOCIAL_9 } from "../oregon/units/social-g9";
import { RML_9 as washingtonUnitsLanguageRmlUpper_RML_9 } from "../washington/units/language-rml-upper";
import { SPELLING_9 as washingtonUnitsLanguageSpelling_SPELLING_9 } from "../washington/units/language-spelling";
import { G9_UNITS as washingtonUnitsMathUpper_G9_UNITS } from "../washington/units/math-upper";
import { SCIENCE_9 as washingtonUnitsScience9_SCIENCE_9 } from "../washington/units/science-9";
import { G9 as washingtonUnitsSocial59G9_G9 } from "../washington/units/social-59-g9";
import { tennesseeGrade } from "./kit";
import { OWN } from "./units/own-g9";

// Tennessee Grade 9. POOL holds the files of the units this grade copies from other frameworks (see ./plan),
// so the download carries those files and not the other frameworks' whole grades.
const POOL: Pool = {
  math: [...washingtonUnitsMathUpper_G9_UNITS, ...californiaUnitsMathG9_MATH_9, ...unitsOf(ontarioG9_courses, "math")],
  language: [...ontarioG9Language_units, ...californiaUnitsLanguageG9_LANGUAGE_9, ...manitobaUnitsG9MoreLanguage_units, oregonUnitsLanguage_MEDIA_ANALYSIS, washingtonUnitsLanguageSpelling_SPELLING_9, ...washingtonUnitsLanguageRmlUpper_RML_9],
  science: [...californiaUnitsScienceG9_OWN_SCIENCE, ...washingtonUnitsScience9_SCIENCE_9, ...unitsOf(ontarioG9_courses, "science"), ...californiaUnitsScienceG9Physical_PHYSICAL_SCIENCE],
  social: [...californiaUnitsSocialG9_SOCIAL_9, ...oregonUnitsSocialG9_OWN_SOCIAL_9, ...washingtonUnitsSocial59G9_G9],
};

export const courses: Course[] = tennesseeGrade("9", POOL, OWN);
