import type { Course } from "../types";
import type { Pool } from "../placement";
import { units as albertaG6Science } from "../alberta/g6-science";
import { units as albertaG7Math } from "../alberta/g7-math";
import { units as albertaG7Science } from "../alberta/g7-science";
import { units as albertaG8Social } from "../alberta/g8-social";
import { course as gradesG6Science } from "../grades/g6/science";
import { course as gradesG8Social } from "../grades/g8/social";
import { wordRoots as manitobaG7LanguageWordRoots } from "../manitoba/units/g7-language";
import { units as ontarioG7Language } from "../ontario/g7-language";
import { units as ontarioG7Math } from "../ontario/g7-math";
import { units as ontarioG7Science } from "../ontario/g7-science";
import { OWN_SOCIAL_7 as oregonSocialG67OWN_SOCIAL_7 } from "../oregon/units/social-g67";
import { RML_7 as washingtonLanguageRmlUpperRML_7 } from "../washington/units/language-rml-upper";
import { SPELLING_7 as washingtonLanguageSpellingSPELLING_7 } from "../washington/units/language-spelling";
import { G7_UNITS as washingtonMathUpperG7_UNITS } from "../washington/units/math-upper";
import { SCIENCE_7 as washingtonScience68SCIENCE_7 } from "../washington/units/science-68";
import { californiaGrade } from "./kit";
import { OWN } from "./units/own-g7";

// California Grade 7. POOL holds the files of the units this grade copies from other frameworks (see ./plan), so
// the download carries those files and not the other frameworks' whole grades.
const POOL: Pool = {
  math: [...ontarioG7Math, ...albertaG7Math, ...washingtonMathUpperG7_UNITS],
  language: [...ontarioG7Language, manitobaG7LanguageWordRoots, ...washingtonLanguageRmlUpperRML_7, washingtonLanguageSpellingSPELLING_7],
  science: [...ontarioG7Science, ...albertaG7Science, ...washingtonScience68SCIENCE_7, ...gradesG6Science.units, ...albertaG6Science],
  social: [...gradesG8Social.units, ...oregonSocialG67OWN_SOCIAL_7, ...albertaG8Social],
};

export const courses: Course[] = californiaGrade("7", POOL, OWN);
