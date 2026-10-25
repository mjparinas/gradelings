import type { Course } from "../types";
import type { Pool } from "../placement";
import { units as albertaG6Math } from "../alberta/g6-math";
import { units as albertaG6Science } from "../alberta/g6-science";
import { LANGUAGE_6 as californiaUnitsLanguageG6LANGUAGE_6 } from "../california/units/language-g6";
import { MATH_6 as californiaUnitsMathG6MATH_6 } from "../california/units/math-g6";
import { OWN_SCIENCE as californiaUnitsScienceG8OWN_SCIENCE } from "../california/units/science-g8";
import { SOCIAL_6 as californiaUnitsSocialG6SOCIAL_6 } from "../california/units/social-g6";
import { SOCIAL_7 as californiaUnitsSocialG7SOCIAL_7 } from "../california/units/social-g7";
import { course as bcG7Social } from "../grades/g7/social";
import { course as bcG8Science } from "../grades/g8/science";
import { course as bcG8Social } from "../grades/g8/social";
import { units as manitobaUnitsG8MoreSocialA } from "../manitoba/units/g8-more-social-a";
import { senses as newBrunswickUnitsG6ScienceSenses } from "../new-brunswick/units/g6-science";
import { UNITS as newYorkUnitsSocialG9UNITS } from "../new-york/units/social-g9";
import { units as ontarioG6Language } from "../ontario/g6-language";
import { units as ontarioG6Math } from "../ontario/g6-math";
import { RML_6 as washingtonUnitsLanguageRmlUpperRML_6 } from "../washington/units/language-rml-upper";
import { SPELLING_6 as washingtonUnitsLanguageSpellingSPELLING_6 } from "../washington/units/language-spelling";
import { G6_UNITS as washingtonUnitsMathUpperG6_UNITS } from "../washington/units/math-upper";
import { SCIENCE_6 as washingtonUnitsScience68SCIENCE_6 } from "../washington/units/science-68";
import { G6 as washingtonUnitsSocial59G6G6 } from "../washington/units/social-59-g6";
import { withLessons } from "../lessons";
import { iowaGrade } from "./kit";
import { LESSONS } from "./lessons/g6";
import { OWN } from "./units/own-g6";

// Iowa Grade 6. POOL holds the files of the units this grade copies from other frameworks (see ./plan), so
// the download carries those files and not the other frameworks' whole grades. LESSONS adds the lessons for Iowa's own
// units and for units it teaches in a different grade from the original.
const POOL: Pool = {
  math: [...ontarioG6Math, ...albertaG6Math, ...washingtonUnitsMathUpperG6_UNITS, ...californiaUnitsMathG6MATH_6],
  language: [...ontarioG6Language, ...washingtonUnitsLanguageRmlUpperRML_6, washingtonUnitsLanguageSpellingSPELLING_6, ...californiaUnitsLanguageG6LANGUAGE_6],
  science: [...washingtonUnitsScience68SCIENCE_6, newBrunswickUnitsG6ScienceSenses, ...albertaG6Science, ...bcG8Science.units, ...californiaUnitsScienceG8OWN_SCIENCE],
  social: [...manitobaUnitsG8MoreSocialA, ...bcG7Social.units, ...washingtonUnitsSocial59G6G6, ...californiaUnitsSocialG6SOCIAL_6, ...californiaUnitsSocialG7SOCIAL_7, ...bcG8Social.units, ...newYorkUnitsSocialG9UNITS],
};

export const courses: Course[] = withLessons(iowaGrade("6", POOL, OWN), LESSONS);
