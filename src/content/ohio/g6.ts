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
import { ohioGrade } from "./kit";
import { OWN } from "./units/own-g6";
import { units as sci0 } from "../alberta/g7-science";
import { course as sci1 } from "../grades/g5/science";
import { units as sci2 } from "../manitoba/units/g4-science";
import { course as sci3 } from "../grades/g8/science";
import { units as sci4 } from "../alberta/g6-science";
import { storedEnergy as sci5 } from "../manitoba/units/g6-science";
import { SCIENCE_8 as sci6 } from "../washington/units/science-68";
import { SCIENCE_6 as sci7 } from "../washington/units/science-68";
import { SCIENCE_7 as sci8 } from "../texas/units/science-7";
import { units as sci9 } from "../alberta/g8-science";
import { G6 as soc0 } from "../washington/units/social-59-g6";
import { UNITS as soc1 } from "../new-york/units/social-g6";
import { course as soc2 } from "../grades/g7/social";
import { SCIENCE_6 as scix0 } from "../texas/units/science-6";
import { SOCIAL_6 as socx0 } from "../texas/units/social-g6";

// Ohio Grade 6. POOL holds the files of the units this grade copies from other frameworks (see ./plan), so
// the download carries those files and not the other frameworks' whole grades.
const POOL: Pool = {
  math: [...ontarioG6Math, ...albertaG6Math, ...washingtonMathUpperG6_UNITS, ...californiaMath6],
  language: [...ontarioG6Language, ...washingtonLanguageRmlUpperRML_6, washingtonLanguageSpellingSPELLING_6, ...californiaLanguage6],
  science: [...sci0, ...sci1.units, ...sci2, ...sci3.units, ...sci4, sci5, ...sci6, ...sci7, ...sci8, ...sci9, ...scix0],
  social: [...soc0, ...soc1, ...soc2.units, ...socx0],
};

export const courses: Course[] = ohioGrade("6", POOL, OWN);
