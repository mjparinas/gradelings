import type { Course } from "../types";
import type { Pool } from "../placement";
import { polygons as manitobaG3MathPolygons } from "../manitoba/units/g3-math";
import { wonder as manitobaG3MoreLanguageWonder } from "../manitoba/units/g3-more-language";
import { units as ontarioG3Language } from "../ontario/g3-language";
import { units as ontarioG3Math } from "../ontario/g3-math";
import { RML_3 as washingtonLanguageRmlMiddleRML_3 } from "../washington/units/language-rml-middle";
import { G3_UNITS as washingtonMathMiddleG3_UNITS } from "../washington/units/math-middle";
import { LANGUAGE_3 as californiaLanguage3 } from "../california/units/language-g3";
import { ohioGrade } from "./kit";
import { OWN } from "./units/own-g3";
import { units as sci0 } from "../ontario/g3-science";
import { units as sci1 } from "../manitoba/units/g4-science";
import { units as sci2 } from "../alberta/g4-science";
import { units as sci3 } from "../alberta/g3-science";
import { units as sci4 } from "../ontario/g5-science";
import { SCIENCE_3 as sci5 } from "../washington/units/science-35";
import { units as sci6 } from "../ontario/g2-science";
import { OWN_SOCIAL_2 as soc0 } from "../oregon/units/social-k3";
import { life as soc1 } from "../manitoba/units/g3-social-b";
import { historyDetective5 as soc2 } from "../oregon/units/social-copies";
import { SCIENCE_K as scix0 } from "../texas/units/science-k";
import { SCIENCE_4 as scix1 } from "../washington/units/science-35";
import { SCIENCE_5 as scix2 } from "../texas/units/science-5";

// Ohio Grade 3. POOL holds the files of the units this grade copies from other frameworks (see ./plan), so
// the download carries those files and not the other frameworks' whole grades.
const POOL: Pool = {
  math: [...ontarioG3Math, manitobaG3MathPolygons, ...washingtonMathMiddleG3_UNITS],
  language: [...ontarioG3Language, manitobaG3MoreLanguageWonder, washingtonLanguageRmlMiddleRML_3, ...californiaLanguage3],
  science: [...sci0, ...sci1, ...sci2, ...sci3, ...sci4, ...sci5, ...sci6, ...scix0, ...scix1, ...scix2],
  social: [...soc0, soc1, soc2],
};

export const courses: Course[] = ohioGrade("3", POOL, OWN);
