import type { Course } from "../types";
import type { Pool } from "../placement";
import { units as albertaG9Science } from "../alberta/g9-science";
import { units as manitobaG9MoreLanguage } from "../manitoba/units/g9-more-language";
import { units as manitobaG9MoreScience } from "../manitoba/units/g9-more-science";
import { units as manitobaG9Science } from "../manitoba/units/g9-science";
import { units as ontarioG9Language } from "../ontario/g9-language";
import { units as ontarioG9Math } from "../ontario/g9-math";
import { units as ontarioG9Science } from "../ontario/g9-science";
import { washingtonGrade } from "./kit";
import { OWN } from "./units/own-g9";

// Washington Grade 9. POOL holds the files of the units this grade copies from other frameworks (see ./plan), so
// the download carries those files and not the other frameworks' whole grades.
const POOL: Pool = {
  math: [...ontarioG9Math],
  language: [...ontarioG9Language, ...manitobaG9MoreLanguage],
  science: [...ontarioG9Science, ...albertaG9Science, ...manitobaG9Science, ...manitobaG9MoreScience],
};

export const courses: Course[] = washingtonGrade("9", POOL, OWN);
