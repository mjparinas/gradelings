import type { Course } from "../types";
import type { Pool } from "../placement";
import { units as albertaG8MathUnits } from "../alberta/g8-math";
import { LANGUAGE_8 as californiaLanguageG8LANGUAGE_8 } from "../california/units/language-g8";
import { MATH_8 as californiaMathG8MATH_8 } from "../california/units/math-g8";
import { OWN_SCIENCE as californiaScienceG8OWN_SCIENCE } from "../california/units/science-g8";
import { SOCIAL_8 as californiaSocialG8SOCIAL_8 } from "../california/units/social-g8";
import { UNITS as floridaSocialG8UNITS } from "../florida/units/social-g8";
import { course as gradesG5ScienceCourse } from "../grades/g5/science";
import { course as gradesG7ScienceCourse } from "../grades/g7/science";
import { units as manitobaG8MoreLanguageUnits } from "../manitoba/units/g8-more-language";
import { UNITS as newYorkScienceG8UNITS } from "../new-york/units/science-g8";
import { UNITS as newYorkSocialG9UNITS } from "../new-york/units/social-g9";
import { units as ontarioG8LanguageUnits } from "../ontario/g8-language";
import { units as ontarioG8MathUnits } from "../ontario/g8-math";
import { WEIGH_THE_EVIDENCE as oregonLanguageWEIGH_THE_EVIDENCE } from "../oregon/units/language";
import { reconstruction8 as oregonSocialCopiesReconstruction8 } from "../oregon/units/social-copies";
import { SCIENCE_6 as texasScience6SCIENCE_6 } from "../texas/units/science-6";
import { SCIENCE_7 as texasScience7SCIENCE_7 } from "../texas/units/science-7";
import { SOCIAL_8 as texasSocialG8SOCIAL_8 } from "../texas/units/social-g8";
import { RML_8 as washingtonLanguageRmlUpperRML_8 } from "../washington/units/language-rml-upper";
import { G8_UNITS as washingtonMathUpperG8_UNITS } from "../washington/units/math-upper";
import { SCIENCE_8 as washingtonScience68SCIENCE_8 } from "../washington/units/science-68";
import { G8 as washingtonSocial59G8G8 } from "../washington/units/social-59-g8";
import { withLessons } from "../lessons";
import { mississippiGrade } from "./kit";
import { LESSONS } from "./lessons/g8";
import { OWN } from "./units/own-g8";

// Mississippi Grade 8. POOL holds the files of the units this grade copies from other frameworks (see ./plan), so
// the download carries those files and not the other frameworks' whole grades. LESSONS adds the lessons for
// Mississippi's own units and for units it teaches in a different grade from the original.
const POOL: Pool = {
  math: [...washingtonMathUpperG8_UNITS, ...ontarioG8MathUnits, ...albertaG8MathUnits, ...californiaMathG8MATH_8],
  language: [...ontarioG8LanguageUnits, ...californiaLanguageG8LANGUAGE_8, oregonLanguageWEIGH_THE_EVIDENCE, ...manitobaG8MoreLanguageUnits, ...washingtonLanguageRmlUpperRML_8],
  science: [...texasScience6SCIENCE_6, ...californiaScienceG8OWN_SCIENCE, ...washingtonScience68SCIENCE_8, ...newYorkScienceG8UNITS, ...texasScience7SCIENCE_7, ...gradesG7ScienceCourse.units, ...gradesG5ScienceCourse.units],
  social: [...californiaSocialG8SOCIAL_8, ...texasSocialG8SOCIAL_8, ...washingtonSocial59G8G8, oregonSocialCopiesReconstruction8, ...newYorkSocialG9UNITS, ...floridaSocialG8UNITS],
};

export const courses: Course[] = withLessons(mississippiGrade("8", POOL, OWN), LESSONS);
