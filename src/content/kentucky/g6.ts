import type { Course } from "../types";
import type { Pool } from "../placement";
import { units as albertaG6Math } from "../alberta/g6-math";
import { units as ontarioG6Language } from "../ontario/g6-language";
import { units as ontarioG6Math } from "../ontario/g6-math";
import { RML_6 as washingtonLanguageRmlUpperRML_6 } from "../washington/units/language-rml-upper";
import { SPELLING_6 as washingtonLanguageSpellingSPELLING_6 } from "../washington/units/language-spelling";
import { G6_UNITS as washingtonMathUpperG6_UNITS } from "../washington/units/math-upper";
import { LANGUAGE_6 as californiaLanguage6 } from "../california/units/language-g6";
import { MATH_6 as californiaMath6 } from "../california/units/math-g6";
import { withLessons } from "../lessons";
import { kentuckyGrade } from "./kit";
import { LESSONS } from "./lessons/g6";
import { OWN } from "./units/own-g6";
import { SOCIAL_6 as californiaSocial6 } from "../california/units/social-g6";
import { SOCIAL_7 as californiaSocial7 } from "../california/units/social-g7";
import { course as bcG7Social } from "../grades/g7/social";
import { UNITS as newYorkSocial6 } from "../new-york/units/social-g6";
import { G6 as washingtonSocial59G6G6 } from "../washington/units/social-59-g6";
import { course as bcG7Science } from "../grades/g7/science";
import { units as ontarioG7Science } from "../ontario/g7-science";
import { units as albertaG6Science } from "../alberta/g6-science";
import { units as albertaG7Science } from "../alberta/g7-science";

// Kentucky Grade 6. POOL holds the files of the units this grade copies from other frameworks (see ./plan), so
// the download carries those files and not the other frameworks' whole grades.
const POOL: Pool = {
  math: [...ontarioG6Math, ...albertaG6Math, ...washingtonMathUpperG6_UNITS, ...californiaMath6],
  language: [...ontarioG6Language, ...washingtonLanguageRmlUpperRML_6, washingtonLanguageSpellingSPELLING_6, ...californiaLanguage6],
  science: [...bcG7Science.units, ...ontarioG7Science, ...albertaG6Science, ...albertaG7Science],
  social: [...californiaSocial6, ...washingtonSocial59G6G6, ...bcG7Social.units, ...newYorkSocial6, ...californiaSocial7],
};

export const courses: Course[] = withLessons(kentuckyGrade("6", POOL, OWN), LESSONS);
