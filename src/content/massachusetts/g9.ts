import type { Course } from "../types";
import type { Pool } from "../placement";
import { units as ontarioG9Math } from "../ontario/g9-math";
import { G9_UNITS as washingtonUnitsMathUpperG9_UNITS } from "../washington/units/math-upper";
import { MATH_9 as californiaUnitsMathG9MATH_9 } from "../california/units/math-g9";
import { units as ontarioG9Language } from "../ontario/g9-language";
import { units as manitobaUnitsG9MoreLanguage } from "../manitoba/units/g9-more-language";
import { RML_9 as washingtonUnitsLanguageRmlUpperRML_9 } from "../washington/units/language-rml-upper";
import { SPELLING_9 as washingtonUnitsLanguageSpellingSPELLING_9 } from "../washington/units/language-spelling";
import { MEDIA_ANALYSIS as oregonUnitsLanguageMEDIA_ANALYSIS } from "../oregon/units/language";
import { LANGUAGE_9 as californiaUnitsLanguageG9LANGUAGE_9 } from "../california/units/language-g9";
import { units as ontarioG9Science } from "../ontario/g9-science";
import { units as albertaG9Science } from "../alberta/g9-science";
import { units as manitobaUnitsG9Science } from "../manitoba/units/g9-science";
import { units as manitobaUnitsG9MoreScience } from "../manitoba/units/g9-more-science";
import { SCIENCE_9 as washingtonUnitsScience9SCIENCE_9 } from "../washington/units/science-9";
import { PHYSICAL_SCIENCE as californiaUnitsScienceG9PhysicalPHYSICAL_SCIENCE } from "../california/units/science-g9-physical";
import { OWN_SCIENCE as californiaUnitsScienceG9OWN_SCIENCE } from "../california/units/science-g9";
import { SOCIAL_8 as californiaUnitsSocialG8SOCIAL_8 } from "../california/units/social-g8";
import { G5 as washingtonUnitsSocial59G5G5 } from "../washington/units/social-59-g5";
import { G8 as washingtonUnitsSocial59G8G8 } from "../washington/units/social-59-g8";
import { UNITS as newYorkUnitsSocialG8UNITS } from "../new-york/units/social-g8";
import { massachusettsGrade } from "./kit";
import { OWN } from "./units/own-g9";

// Massachusetts Grade 9. POOL holds the files of the units this grade copies from other frameworks (see ./plan), so
// the download carries those files and not the other frameworks' whole grades.
const POOL: Pool = {
  math: [...ontarioG9Math, ...washingtonUnitsMathUpperG9_UNITS, ...californiaUnitsMathG9MATH_9],
  language: [...ontarioG9Language, ...manitobaUnitsG9MoreLanguage, ...washingtonUnitsLanguageRmlUpperRML_9, washingtonUnitsLanguageSpellingSPELLING_9, oregonUnitsLanguageMEDIA_ANALYSIS, ...californiaUnitsLanguageG9LANGUAGE_9],
  science: [...ontarioG9Science, ...albertaG9Science, ...manitobaUnitsG9Science, ...manitobaUnitsG9MoreScience, ...washingtonUnitsScience9SCIENCE_9, ...californiaUnitsScienceG9PhysicalPHYSICAL_SCIENCE, ...californiaUnitsScienceG9OWN_SCIENCE],
  social: [...californiaUnitsSocialG8SOCIAL_8, ...washingtonUnitsSocial59G5G5, ...washingtonUnitsSocial59G8G8, ...newYorkUnitsSocialG8UNITS],
};

export const courses: Course[] = massachusettsGrade("9", POOL, OWN);
