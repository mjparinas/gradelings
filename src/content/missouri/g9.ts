import type { Course } from "../types";
import type { Pool } from "../placement";
import { G9_UNITS as mat0 } from "../washington/units/math-upper";
import { MATH_9 as mat1 } from "../california/units/math-g9";
import { units as mat2 } from "../ontario/g9-math";
import { units as lan0 } from "../ontario/g9-language";
import { LANGUAGE_9 as lan1 } from "../california/units/language-g9";
import { units as lan2 } from "../manitoba/units/g9-more-language";
import { SPELLING_9 as lan3 } from "../washington/units/language-spelling";
import { MEDIA_ANALYSIS as lan4 } from "../oregon/units/language";
import { RML_9 as lan5 } from "../washington/units/language-rml-upper";
import { PHYSICAL_SCIENCE as sci0 } from "../california/units/science-g9-physical";
import { OWN_SCIENCE as sci1 } from "../california/units/science-g9";
import { units as sci2 } from "../ontario/g9-science";
import { units as sci3 } from "../manitoba/units/g9-science";
import { SCIENCE_9 as sci4 } from "../washington/units/science-9";
import { units as sci5 } from "../alberta/g9-science";
import { units as sci6 } from "../manitoba/units/g9-more-science";
import { SOCIAL_9 as soc0 } from "../california/units/social-g9";
import { SOCIAL_9 as soc1 } from "../georgia/units/social-g9";
import { SOCIAL_9 as soc2 } from "../maine/units/social-g9";
import { OWN_SOCIAL_9 as soc3 } from "../oregon/units/social-g9";
import { missouriGrade } from "./kit";
import { OWN } from "./units/own-g9";

// Missouri Grade 9. POOL holds the files of the units this grade copies from other frameworks (see ./plan), so
// the download carries those files and not the other frameworks' whole grades.
const POOL: Pool = {
  math: [...mat0, ...mat1, ...mat2],
  language: [...lan0, ...lan1, ...lan2, lan3, lan4, ...lan5],
  science: [...sci0, ...sci1, ...sci2, ...sci3, ...sci4, ...sci5, ...sci6],
  social: [...soc0, ...soc1, ...soc2, ...soc3],
};

export const courses: Course[] = missouriGrade("9", POOL, OWN);
