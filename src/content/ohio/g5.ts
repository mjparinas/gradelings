import type { Course } from "../types";
import type { Pool } from "../placement";
import { mental as manitobaG5MathMental } from "../manitoba/units/g5-math";
import { quadrilaterals as manitobaG5MathQuadrilaterals } from "../manitoba/units/g5-math";
import { multimodal as manitobaG5MoreLanguageMultimodal } from "../manitoba/units/g5-more-language";
import { RML_5 as washingtonLanguageRmlMiddleRML_5 } from "../washington/units/language-rml-middle";
import { SPELLING_5 as washingtonLanguageSpellingSPELLING_5 } from "../washington/units/language-spelling";
import { G5_UNITS as washingtonMathMiddleG5_UNITS } from "../washington/units/math-middle";
import { LANGUAGE_5 as californiaLanguage5 } from "../california/units/language-g5";
import { MATH_5 as californiaMath5 } from "../california/units/math-g5";
import { ohioGrade } from "./kit";
import { OWN } from "./units/own-g5";
import { units as sci0 } from "../alberta/g4-science";
import { SCIENCE_5 as sci1 } from "../washington/units/science-35";
import { course as sci2 } from "../grades/g4/science";
import { friction as sci3 } from "../manitoba/units/g5-science";
import { units as sci4 } from "../ontario/g4-science";
import { UNITS as soc0 } from "../new-york/units/social-g5";
import { SOCIAL_7 as soc1 } from "../california/units/social-g7";
import { SCIENCE_5 as scix0 } from "../texas/units/science-5";

// Ohio Grade 5. POOL holds the files of the units this grade copies from other frameworks (see ./plan), so
// the download carries those files and not the other frameworks' whole grades.
const POOL: Pool = {
  math: [manitobaG5MathMental, manitobaG5MathQuadrilaterals, ...washingtonMathMiddleG5_UNITS, ...californiaMath5],
  language: [manitobaG5MoreLanguageMultimodal, washingtonLanguageRmlMiddleRML_5, washingtonLanguageSpellingSPELLING_5, ...californiaLanguage5],
  science: [...sci0, ...sci1, ...sci2.units, sci3, ...sci4, ...scix0],
  social: [...soc0, ...soc1],
};

export const courses: Course[] = ohioGrade("5", POOL, OWN);
