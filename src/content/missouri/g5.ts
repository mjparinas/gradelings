import type { Course } from "../types";
import type { Pool } from "../placement";
import { G5_UNITS as mat0 } from "../washington/units/math-middle";
import { mental as mat1 } from "../manitoba/units/g5-math";
import { quadrilaterals as mat2 } from "../manitoba/units/g5-math";
import { LINE_PLOTS_5 as mat3 } from "../california/units/math-g5";
import { LANGUAGE_5 as lan0 } from "../california/units/language-g5";
import { multimodal as lan1 } from "../manitoba/units/g5-more-language";
import { RML_5 as lan2 } from "../washington/units/language-rml-middle";
import { SPELLING_5 as lan3 } from "../washington/units/language-spelling";
import { units as sci0 } from "../ontario/g5-science";
import { weather as sci1 } from "../manitoba/units/g5-science";
import { SCIENCE_5 as sci2 } from "../oregon/units/science-35";
import { units as sci3 } from "../alberta/g5-science";
import { SCIENCE_5 as sci4 } from "../washington/units/science-35";
import { SCIENCE_5 as sci5 } from "../texas/units/science-5";
import { units as sci6 } from "../ontario/g4-science";
import { UNITS as soc0 } from "../new-york/units/social-g8";
import { SOCIAL_8 as soc1 } from "../california/units/social-g8";
import { SOCIAL_5 as soc2 } from "../texas/units/social-g5";
import { G8 as soc3 } from "../washington/units/social-59-g8";
import { UNITS as soc4 } from "../alabama/units/social-g9";
import { missouriGrade } from "./kit";
import { OWN } from "./units/own-g5";

// Missouri Grade 5. POOL holds the files of the units this grade copies from other frameworks (see ./plan), so
// the download carries those files and not the other frameworks' whole grades.
const POOL: Pool = {
  math: [...mat0, mat1, mat2, mat3],
  language: [...lan0, lan1, lan2, lan3],
  science: [...sci0, sci1, ...sci2, ...sci3, ...sci4, ...sci5, ...sci6],
  social: [...soc0, ...soc1, ...soc2, ...soc3, ...soc4],
};

export const courses: Course[] = missouriGrade("5", POOL, OWN);
