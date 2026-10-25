import type { Course } from "../types";
import type { Pool } from "../placement";
import { units as albertaG7Math } from "../alberta/g7-math";
import { wordRoots as manitobaG7LanguageWordRoots } from "../manitoba/units/g7-language";
import { units as ontarioG7Language } from "../ontario/g7-language";
import { units as ontarioG7Math } from "../ontario/g7-math";
import { RML_7 as washingtonLanguageRmlUpperRML_7 } from "../washington/units/language-rml-upper";
import { SPELLING_7 as washingtonLanguageSpellingSPELLING_7 } from "../washington/units/language-spelling";
import { G7_UNITS as washingtonMathUpperG7_UNITS } from "../washington/units/math-upper";
import { OWN_SOCIAL_7 as oregonSocialG67OWN_SOCIAL_7 } from "../oregon/units/social-g67";
import { LANGUAGE_7 as californiaLanguage7 } from "../california/units/language-g7";
import { MATH_7 as californiaMath7 } from "../california/units/math-g7";
import { UNITS as newYorkSocial6 } from "../new-york/units/social-g6";
import { withLessons } from "../lessons";
import { kentuckyGrade } from "./kit";
import { LESSONS } from "./lessons/g7";
import { OWN } from "./units/own-g7";
import { SOCIAL_7 as californiaSocial7 } from "../california/units/social-g7";
import { course as bcG8Social } from "../grades/g8/social";
import { UNITS as newYorkSocial5 } from "../new-york/units/social-g5";
import { UNITS as newYorkSocial9 } from "../new-york/units/social-g9";
import { course as bcG6Science } from "../grades/g6/science";
import { course as bcG8Science } from "../grades/g8/science";
import { senses as newBrunswickG6ScienceSenses } from "../new-brunswick/units/g6-science";
import { motionForces as newBrunswickG8ScienceMotionForces } from "../new-brunswick/units/g8-science";
import { units as ontarioG8Science } from "../ontario/g8-science";
import { SCIENCE_6 as washingtonScience68SCIENCE_6, SCIENCE_7 as washingtonScience68SCIENCE_7, SCIENCE_8 as washingtonScience68SCIENCE_8 } from "../washington/units/science-68";
import { OWN_SCIENCE as californiaOwnScience7, SCIENCE_COPIES as californiaScienceCopies7 } from "../california/units/science-g7";
import { OWN_SCIENCE as californiaOwnScience8, SCIENCE_COPIES as californiaScienceCopies8 } from "../california/units/science-g8";

// Kentucky Grade 7. POOL holds the files of the units this grade copies from other frameworks (see ./plan), so
// the download carries those files and not the other frameworks' whole grades.
const POOL: Pool = {
  math: [...ontarioG7Math, ...albertaG7Math, ...washingtonMathUpperG7_UNITS, ...californiaMath7],
  language: [...ontarioG7Language, manitobaG7LanguageWordRoots, ...washingtonLanguageRmlUpperRML_7, washingtonLanguageSpellingSPELLING_7, ...californiaLanguage7],
  science: [...bcG6Science.units, ...bcG8Science.units, newBrunswickG6ScienceSenses, newBrunswickG8ScienceMotionForces, ...ontarioG8Science, ...washingtonScience68SCIENCE_6, ...washingtonScience68SCIENCE_7, ...washingtonScience68SCIENCE_8, ...californiaOwnScience7, ...californiaScienceCopies7, ...californiaOwnScience8, ...californiaScienceCopies8],
  social: [...californiaSocial7, ...bcG8Social.units, ...newYorkSocial6, ...newYorkSocial9, ...newYorkSocial5, ...oregonSocialG67OWN_SOCIAL_7],
};

export const courses: Course[] = withLessons(kentuckyGrade("7", POOL, OWN), LESSONS);
