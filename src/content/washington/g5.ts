import type { Course } from "../types";
import type { Pool } from "../placement";
import { units as albertaG5Science } from "../alberta/g5-science";
import { mental as manitobaG5MathMental } from "../manitoba/units/g5-math";
import { quadrilaterals as manitobaG5MathQuadrilaterals } from "../manitoba/units/g5-math";
import { multimodal as manitobaG5MoreLanguageMultimodal } from "../manitoba/units/g5-more-language";
import { weather as manitobaG5ScienceWeather } from "../manitoba/units/g5-science";
import { units as ontarioG5Science } from "../ontario/g5-science";
import { washingtonGrade } from "./kit";
import { OWN } from "./units/own-g5";

// Washington Grade 5. POOL holds the files of the units this grade copies from other frameworks (see ./plan), so
// the download carries those files and not the other frameworks' whole grades.
const POOL: Pool = {
  math: [manitobaG5MathMental, manitobaG5MathQuadrilaterals],
  language: [manitobaG5MoreLanguageMultimodal],
  science: [...ontarioG5Science, ...albertaG5Science, manitobaG5ScienceWeather],
};

export const courses: Course[] = washingtonGrade("5", POOL, OWN);
