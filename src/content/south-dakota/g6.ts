import type { Course } from "../types";
import type { Pool } from "../placement";
import { units as albertaG6Math } from "../alberta/g6-math";
import { senses as newBrunswickG6ScienceSenses } from "../new-brunswick/units/g6-science";
import { units as ontarioG6Language } from "../ontario/g6-language";
import { units as ontarioG6Math } from "../ontario/g6-math";
import { units as ontarioG8Science } from "../ontario/g8-science";
import { RML_6 as washingtonLanguageRmlUpperRML_6 } from "../washington/units/language-rml-upper";
import { SPELLING_6 as washingtonLanguageSpellingSPELLING_6 } from "../washington/units/language-spelling";
import { G6_UNITS as washingtonMathUpperG6_UNITS } from "../washington/units/math-upper";
import { SCIENCE_6 as washingtonScience68SCIENCE_6 } from "../washington/units/science-68";
import { LANGUAGE_6 as californiaLanguage6 } from "../california/units/language-g6";
import { MATH_6 as californiaMath6 } from "../california/units/math-g6";
import { OWN_SCIENCE as californiaOwnScience6, SCIENCE_COPIES as californiaScienceCopies6 } from "../california/units/science-g6";
import { SOCIAL_7 as georgiaUnitsSocialG67_SOCIAL7 } from "../georgia/units/social-g67";
import { G6 as washingtonUnitsSocial59G6_G6 } from "../washington/units/social-59-g6";
import { SOCIAL_6 as californiaUnitsSocialG6_SOCIAL6 } from "../california/units/social-g6";
import { course as gradesG8Social_course } from "../grades/g8/social";
import { UNITS as newYorkUnitsSocialG9_UNITS } from "../new-york/units/social-g9";
import { OWN_SOCIAL_7 as oregonUnitsSocialG67_OWNSOCIAL7 } from "../oregon/units/social-g67";
import { withLessons } from "../lessons";
import { southDakotaGrade } from "./kit";
import { LESSONS } from "./lessons/g6";
import { OWN } from "./units/own-g6";

// South Dakota Grade 6. POOL holds the files of the units this grade copies from other frameworks (see ./plan), so
// the download carries those files and not the other frameworks' whole grades. LESSONS adds the lessons for South Dakota's own
// units and for units it teaches in a different grade from the original.
const POOL: Pool = {
  math: [...ontarioG6Math, ...albertaG6Math, ...washingtonMathUpperG6_UNITS, ...californiaMath6],
  language: [...ontarioG6Language, ...washingtonLanguageRmlUpperRML_6, washingtonLanguageSpellingSPELLING_6, ...californiaLanguage6],
  science: [newBrunswickG6ScienceSenses, ...washingtonScience68SCIENCE_6, ...ontarioG8Science, ...californiaOwnScience6, ...californiaScienceCopies6],
  social: [...georgiaUnitsSocialG67_SOCIAL7, ...washingtonUnitsSocial59G6_G6, ...californiaUnitsSocialG6_SOCIAL6, ...gradesG8Social_course.units, ...newYorkUnitsSocialG9_UNITS, ...oregonUnitsSocialG67_OWNSOCIAL7],
};

export const courses: Course[] = withLessons(southDakotaGrade("6", POOL, OWN), LESSONS);
