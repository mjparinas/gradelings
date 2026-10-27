import type { Course } from "../types";
import type { Pool } from "../placement";
import { units as albertaG6Science } from "../alberta/g6-science";
import { units as albertaG7Math } from "../alberta/g7-math";
import { units as albertaG7Science } from "../alberta/g7-science";
import { course as gradesG6Science } from "../grades/g6/science";
import { wordRoots as manitobaG7LanguageWordRoots } from "../manitoba/units/g7-language";
import { units as ontarioG7Language } from "../ontario/g7-language";
import { units as ontarioG7Math } from "../ontario/g7-math";
import { units as ontarioG7Science } from "../ontario/g7-science";
import { RML_7 as washingtonLanguageRmlUpperRML_7 } from "../washington/units/language-rml-upper";
import { SPELLING_7 as washingtonLanguageSpellingSPELLING_7 } from "../washington/units/language-spelling";
import { G7_UNITS as washingtonMathUpperG7_UNITS } from "../washington/units/math-upper";
import { SCIENCE_7 as washingtonScience68SCIENCE_7 } from "../washington/units/science-68";
import { LANGUAGE_7 as californiaLanguage7 } from "../california/units/language-g7";
import { MATH_7 as californiaMath7 } from "../california/units/math-g7";
import { OWN_SCIENCE as californiaOwnScience7, SCIENCE_COPIES as californiaScienceCopies7 } from "../california/units/science-g7";
import { UNITS as newYorkSocial5 } from "../new-york/units/social-g5";
import { SOCIAL_7 as californiaSocial7 } from "../california/units/social-g7";
import { units as ontarioG8Social } from "../ontario/g8-social";
import { withLessons } from "../lessons";
import { newHampshireGrade } from "./kit";
import { LESSONS } from "./lessons/g7";
import { OWN } from "./units/own-g7";

// New Hampshire Grade 7. POOL holds the files of the units this grade copies from other frameworks (see ./plan), so
// the download carries those files and not the other frameworks' whole grades. LESSONS adds the lessons for New Hampshire's own
// units and for units it teaches in a different grade from the original.
const POOL: Pool = {
  math: [...ontarioG7Math, ...albertaG7Math, ...washingtonMathUpperG7_UNITS, ...californiaMath7],
  language: [...ontarioG7Language, manitobaG7LanguageWordRoots, ...washingtonLanguageRmlUpperRML_7, washingtonLanguageSpellingSPELLING_7, ...californiaLanguage7],
  science: [...ontarioG7Science, ...albertaG7Science, ...washingtonScience68SCIENCE_7, ...gradesG6Science.units, ...albertaG6Science, ...californiaOwnScience7, ...californiaScienceCopies7],
  social: [...newYorkSocial5, ...ontarioG8Social, ...californiaSocial7],
};

export const courses: Course[] = withLessons(newHampshireGrade("7", POOL, OWN), LESSONS);
