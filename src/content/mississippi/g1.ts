import type { Course } from "../types";
import type { Pool } from "../placement";
import { units as albertaG1MathUnits } from "../alberta/g1-math";
import { LANGUAGE_1 as californiaLanguageG1LANGUAGE_1 } from "../california/units/language-g1";
import { MATH_1 as californiaMathG1MATH_1 } from "../california/units/math-g1";
import { SOCIAL_1 as californiaSocialG1SOCIAL_1 } from "../california/units/social-g1";
import { SOCIAL_1 as georgiaSocialK2SOCIAL_1 } from "../georgia/units/social-k2";
import { course as gradesKScienceCourse } from "../grades/k/science";
import { life as manitobaG3ScienceLife } from "../manitoba/units/g3-science";
import { UNITS as newYorkSocialG1UNITS } from "../new-york/units/social-g1";
import { units as ontarioG1LanguageUnits } from "../ontario/g1-language";
import { units as ontarioG1MathUnits } from "../ontario/g1-math";
import { units as ontarioG1SocialUnits } from "../ontario/g1-social";
import { units as ontarioG3ScienceUnits } from "../ontario/g3-science";
import { STORY_OR_FACTS as oregonLanguageReadingSTORY_OR_FACTS } from "../oregon/units/language-reading";
import { OWN_SOCIAL_2 as oregonSocialK3OWN_SOCIAL_2 } from "../oregon/units/social-k3";
import { SCIENCE_1 as texasScience1SCIENCE_1 } from "../texas/units/science-1";
import { RML_1 as washingtonLanguageRmlEarlyRML_1 } from "../washington/units/language-rml-early";
import { G1_UNITS as washingtonMathEarlyG1_UNITS } from "../washington/units/math-early";
import { SCIENCE_K as washingtonScienceK2SCIENCE_K } from "../washington/units/science-k2";
import { SCIENCE_1 as washingtonScienceK2SCIENCE_1 } from "../washington/units/science-k2";
import { SCIENCE_2 as washingtonScienceK2SCIENCE_2 } from "../washington/units/science-k2";
import { OWN_SOCIAL_1 as washingtonSocialK4G1OWN_SOCIAL_1 } from "../washington/units/social-k4-g1";
import { withLessons } from "../lessons";
import { mississippiGrade } from "./kit";
import { LESSONS } from "./lessons/g1";
import { OWN } from "./units/own-g1";

// Mississippi Grade 1. POOL holds the files of the units this grade copies from other frameworks (see ./plan), so
// the download carries those files and not the other frameworks' whole grades. LESSONS adds the lessons for
// Mississippi's own units and for units it teaches in a different grade from the original.
const POOL: Pool = {
  math: [...albertaG1MathUnits, ...washingtonMathEarlyG1_UNITS, ...californiaMathG1MATH_1, ...ontarioG1MathUnits],
  language: [...ontarioG1LanguageUnits, ...californiaLanguageG1LANGUAGE_1, oregonLanguageReadingSTORY_OR_FACTS, washingtonLanguageRmlEarlyRML_1],
  science: [...washingtonScienceK2SCIENCE_1, manitobaG3ScienceLife, ...texasScience1SCIENCE_1, ...gradesKScienceCourse.units, ...washingtonScienceK2SCIENCE_2, ...washingtonScienceK2SCIENCE_K, ...ontarioG3ScienceUnits],
  social: [...californiaSocialG1SOCIAL_1, ...washingtonSocialK4G1OWN_SOCIAL_1, ...newYorkSocialG1UNITS, ...georgiaSocialK2SOCIAL_1, ...ontarioG1SocialUnits, ...oregonSocialK3OWN_SOCIAL_2],
};

export const courses: Course[] = withLessons(mississippiGrade("1", POOL, OWN), LESSONS);
