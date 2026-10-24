import type { Course } from "../types";
import type { Pool } from "../placement";
import { units as albertaG7Math } from "../alberta/g7-math";
import { wordRoots as manitobaG7LanguageWordRoots } from "../manitoba/units/g7-language";
import { units as ontarioG7Language } from "../ontario/g7-language";
import { units as ontarioG7Math } from "../ontario/g7-math";
import { RML_7 as washingtonLanguageRmlUpperRML_7 } from "../washington/units/language-rml-upper";
import { SPELLING_7 as washingtonLanguageSpellingSPELLING_7 } from "../washington/units/language-spelling";
import { G7_UNITS as washingtonMathUpperG7_UNITS } from "../washington/units/math-upper";
import { LANGUAGE_7 as californiaLanguage7 } from "../california/units/language-g7";
import { MATH_7 as californiaMath7 } from "../california/units/math-g7";
import { ohioGrade } from "./kit";
import { OWN } from "./units/own-g7";
import { units as sci0 } from "../ontario/g8-science";
import { SCIENCE_6 as sci1 } from "../washington/units/science-68";
import { gravityTides as sci2 } from "../manitoba/units/g7-science";
import { units as sci3 } from "../ontario/g6-science";
import { units as sci4 } from "../ontario/g9-science";
import { SCIENCE_7 as sci5 } from "../washington/units/science-68";
import { units as sci6 } from "../ontario/g7-science";
import { G6 as soc0 } from "../washington/units/social-59-g6";
import { course as soc1 } from "../grades/g8/social";
import { OWN_SOCIAL_7 as soc2 } from "../oregon/units/social-g67";
import { UNITS as soc3 } from "../new-york/units/social-g6";
import { UNITS as scix0 } from "../new-york/units/science-g6";
import { SCIENCE_6 as scix1 } from "../texas/units/science-6";
import { SCIENCE_7 as scix2 } from "../texas/units/science-7";
import { OWN_SOCIAL_7 as socx0 } from "../oregon/units/social-g67";

// Ohio Grade 7. POOL holds the files of the units this grade copies from other frameworks (see ./plan), so
// the download carries those files and not the other frameworks' whole grades.
const POOL: Pool = {
  math: [...ontarioG7Math, ...albertaG7Math, ...washingtonMathUpperG7_UNITS, ...californiaMath7],
  language: [...ontarioG7Language, manitobaG7LanguageWordRoots, ...washingtonLanguageRmlUpperRML_7, washingtonLanguageSpellingSPELLING_7, ...californiaLanguage7],
  science: [...sci0, ...sci1, sci2, ...sci3, ...sci4, ...sci5, ...sci6, ...scix0, ...scix1, ...scix2],
  social: [...soc0, ...soc1.units, ...soc2, ...soc3, ...socx0],
};

export const courses: Course[] = ohioGrade("7", POOL, OWN);
