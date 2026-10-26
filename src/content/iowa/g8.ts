import type { Course } from "../types";
import type { Pool } from "../placement";
import { units as albertaG7Science } from "../alberta/g7-science";
import { units as albertaG8Math } from "../alberta/g8-math";
import { LANGUAGE_8 as californiaUnitsLanguageG8LANGUAGE_8 } from "../california/units/language-g8";
import { MATH_8 as californiaUnitsMathG8MATH_8 } from "../california/units/math-g8";
import { OWN_SCIENCE as californiaUnitsScienceG6OWN_SCIENCE } from "../california/units/science-g6";
import { OWN_SCIENCE as californiaUnitsScienceG7OWN_SCIENCE } from "../california/units/science-g7";
import { OWN_SCIENCE as californiaUnitsScienceG8OWN_SCIENCE } from "../california/units/science-g8";
import { SOCIAL_8 as californiaUnitsSocialG8SOCIAL_8 } from "../california/units/social-g8";
import { course as bcG6Science } from "../grades/g6/science";
import { course as bcG7Science } from "../grades/g7/science";
import { units as manitobaUnitsG8MoreLanguage } from "../manitoba/units/g8-more-language";
import { units as ontarioG8Language } from "../ontario/g8-language";
import { units as ontarioG8Math } from "../ontario/g8-math";
import { WEIGH_THE_EVIDENCE as oregonUnitsLanguageWEIGH_THE_EVIDENCE } from "../oregon/units/language";
import { OWN_SOCIAL_8 as oregonUnitsSocialG8OWN_SOCIAL_8 } from "../oregon/units/social-g8";
import { RML_8 as washingtonUnitsLanguageRmlUpperRML_8 } from "../washington/units/language-rml-upper";
import { G8_UNITS as washingtonUnitsMathUpperG8_UNITS } from "../washington/units/math-upper";
import { SCIENCE_7 as washingtonUnitsScience68SCIENCE_7 } from "../washington/units/science-68";
import { SCIENCE_8 as washingtonUnitsScience68SCIENCE_8 } from "../washington/units/science-68";
import { G8 as washingtonUnitsSocial59G8G8 } from "../washington/units/social-59-g8";
import { withLessons } from "../lessons";
import { iowaGrade } from "./kit";
import { LESSONS } from "./lessons/g8";
import { OWN } from "./units/own-g8";

// Iowa Grade 8. POOL holds the files of the units this grade copies from other frameworks (see ./plan), so
// the download carries those files and not the other frameworks' whole grades. LESSONS adds the lessons for Iowa's own
// units and for units it teaches in a different grade from the original.
const POOL: Pool = {
  math: [...ontarioG8Math, ...albertaG8Math, ...washingtonUnitsMathUpperG8_UNITS, ...californiaUnitsMathG8MATH_8],
  language: [...ontarioG8Language, ...manitobaUnitsG8MoreLanguage, ...washingtonUnitsLanguageRmlUpperRML_8, oregonUnitsLanguageWEIGH_THE_EVIDENCE, ...californiaUnitsLanguageG8LANGUAGE_8],
  science: [...bcG7Science.units, ...bcG6Science.units, ...washingtonUnitsScience68SCIENCE_7, ...californiaUnitsScienceG7OWN_SCIENCE, ...albertaG7Science, ...washingtonUnitsScience68SCIENCE_8, ...californiaUnitsScienceG8OWN_SCIENCE, ...californiaUnitsScienceG6OWN_SCIENCE],
  social: [...californiaUnitsSocialG8SOCIAL_8, ...oregonUnitsSocialG8OWN_SOCIAL_8, ...washingtonUnitsSocial59G8G8],
};

export const courses: Course[] = withLessons(iowaGrade("8", POOL, OWN), LESSONS);
