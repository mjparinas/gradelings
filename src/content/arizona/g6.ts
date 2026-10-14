import type { Course } from "../types";
import type { Pool } from "../placement";
import { units as albertaG6Math } from "../alberta/g6-math";
import { units as ontarioG6Language } from "../ontario/g6-language";
import { units as ontarioG6Math } from "../ontario/g6-math";
import { RML_6 as washingtonLanguageRmlUpperRML_6 } from "../washington/units/language-rml-upper";
import { SPELLING_6 as washingtonLanguageSpellingSPELLING_6 } from "../washington/units/language-spelling";
import { G6_UNITS as washingtonMathUpperG6_UNITS } from "../washington/units/math-upper";
import { units as albertaG6Science } from "../alberta/g6-science";
import { course as bcG7Science } from "../grades/g7/science";
import { SCIENCE_8 as washingtonScience68SCIENCE_8 } from "../washington/units/science-68";
import { SCIENCE_6 as texasScience6 } from "../texas/units/science-6";
import { SCIENCE_7 as texasScience7 } from "../texas/units/science-7";
import { units as ontarioG7Science } from "../ontario/g7-science";
import { G6 as washingtonSocial59G6G6 } from "../washington/units/social-59-g6";
import { course as bcG7Social } from "../grades/g7/social";
import { course as bcG8Social } from "../grades/g8/social";
import { arizonaGrade } from "./kit";

// Arizona Grade 6. POOL holds the files of the units this grade copies from other frameworks (see ./plan), so
// the download carries those files and not the other frameworks' whole grades.
const POOL: Pool = {
  math: [...ontarioG6Math, ...albertaG6Math, ...washingtonMathUpperG6_UNITS],
  language: [...ontarioG6Language, ...washingtonLanguageRmlUpperRML_6, washingtonLanguageSpellingSPELLING_6],
  science: [...albertaG6Science, ...bcG7Science.units, ...washingtonScience68SCIENCE_8, ...texasScience6, ...texasScience7, ...ontarioG7Science],
  social: [...washingtonSocial59G6G6, ...bcG7Social.units, ...bcG8Social.units],
};

export const courses: Course[] = arizonaGrade("6", POOL, {});
