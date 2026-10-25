import type { Course } from "../types";
import type { Pool } from "../placement";
import { G3_UNITS as mat0 } from "../washington/units/math-middle";
import { units as mat1 } from "../ontario/g3-math";
import { polygons as mat2 } from "../manitoba/units/g3-math";
import { units as lan0 } from "../ontario/g3-language";
import { wonder as lan1 } from "../manitoba/units/g3-more-language";
import { RML_3 as lan2 } from "../washington/units/language-rml-middle";
import { COMPARE_AND_CONNECT_3 as lan3 } from "../california/units/language-g3";
import { SCIENCE_3 as sci0 } from "../washington/units/science-35";
import { life as sci1 } from "../manitoba/units/g3-science";
import { SCIENCE_3 as sci2 } from "../oregon/units/science-35";
import { course as sci3 } from "../grades/g3/science";
import { units as sci4 } from "../ontario/g3-science";
import { findOut as soc0 } from "../manitoba/units/g3-more-social";
import { missouriGrade } from "./kit";
import { OWN } from "./units/own-g3";

// Missouri Grade 3. POOL holds the files of the units this grade copies from other frameworks (see ./plan), so
// the download carries those files and not the other frameworks' whole grades.
const POOL: Pool = {
  math: [...mat0, ...mat1, mat2],
  language: [...lan0, lan1, lan2, lan3],
  science: [...sci0, sci1, ...sci2, ...sci3.units, ...sci4],
  social: [soc0],
};

export const courses: Course[] = missouriGrade("3", POOL, OWN);
