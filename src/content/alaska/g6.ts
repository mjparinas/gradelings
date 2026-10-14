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
import { alaskaGrade } from "./kit";
import { G6 as washingtonSocial59G6G6 } from "../washington/units/social-59-g6";
import { OWN } from "./units/own-g6";

// Alaska Grade 6. POOL holds the files of the units this grade copies from other frameworks (see ./plan), so
// the download carries those files and not the other frameworks' whole grades.
const POOL: Pool = {
  math: [...ontarioG6Math, ...albertaG6Math, ...washingtonMathUpperG6_UNITS],
  language: [...ontarioG6Language, ...washingtonLanguageRmlUpperRML_6, washingtonLanguageSpellingSPELLING_6],
  science: [newBrunswickG6ScienceSenses, ...washingtonScience68SCIENCE_6, ...ontarioG8Science],
  social: [...washingtonSocial59G6G6],
};

export const courses: Course[] = alaskaGrade("6", POOL, OWN);
