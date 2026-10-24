import type { Course } from "../types";
import type { Pool } from "../placement";
import { units as albertaG4Math } from "../alberta/g4-math";
import { units as ontarioG4Language } from "../ontario/g4-language";
import { units as ontarioG4Math } from "../ontario/g4-math";
import { FIRSTHAND_SECONDHAND as oregonLanguageReadingFIRSTHAND_SECONDHAND } from "../oregon/units/language-reading";
import { RML_4 as washingtonLanguageRmlMiddleRML_4 } from "../washington/units/language-rml-middle";
import { SPELLING_4 as washingtonLanguageSpellingSPELLING_4 } from "../washington/units/language-spelling";
import { G4_UNITS as washingtonMathMiddleG4_UNITS } from "../washington/units/math-middle";
import { LANGUAGE_4 as californiaLanguage4 } from "../california/units/language-g4";
import { MATH_4 as californiaMath4 } from "../california/units/math-g4";
import { ohioGrade } from "./kit";
import { OWN } from "./units/own-g4";
import { course as sci0 } from "../grades/g3/science";
import { units as sci1 } from "../ontario/g6-science";
import { units as sci2 } from "../manitoba/units/g4-more-science";
import { units as sci3 } from "../ontario/g4-science";
import { units as sci4 } from "../alberta/g3-science";
import { SOCIAL_5 as soc0 } from "../california/units/social-g5";
import { SCIENCE_4 as scix0 } from "../washington/units/science-35";
import { SCIENCE_5 as scix1 } from "../texas/units/science-5";
import { UNITS as scix2 } from "../new-york/units/science-g3";

// Ohio Grade 4. POOL holds the files of the units this grade copies from other frameworks (see ./plan), so
// the download carries those files and not the other frameworks' whole grades.
const POOL: Pool = {
  math: [...ontarioG4Math, ...albertaG4Math, ...washingtonMathMiddleG4_UNITS, ...californiaMath4],
  language: [...ontarioG4Language, washingtonLanguageRmlMiddleRML_4, washingtonLanguageSpellingSPELLING_4, oregonLanguageReadingFIRSTHAND_SECONDHAND, ...californiaLanguage4],
  science: [...sci0.units, ...sci1, ...sci2, ...sci3, ...sci4, ...scix0, ...scix1, ...scix2],
  social: [...soc0],
};

export const courses: Course[] = ohioGrade("4", POOL, OWN);
