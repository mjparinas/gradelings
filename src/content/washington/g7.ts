import type { Course } from "../types";
import type { Pool } from "../placement";
import { units as albertaG7Math } from "../alberta/g7-math";
import { units as albertaG7Science } from "../alberta/g7-science";
import { wordRoots as manitobaG7LanguageWordRoots } from "../manitoba/units/g7-language";
import { units as ontarioG7Language } from "../ontario/g7-language";
import { units as ontarioG7Math } from "../ontario/g7-math";
import { units as ontarioG7Science } from "../ontario/g7-science";
import { washingtonGrade } from "./kit";
import { OWN } from "./units/own-g7";

// Washington Grade 7. POOL holds the files of the units this grade copies from other frameworks (see ./plan), so
// the download carries those files and not the other frameworks' whole grades.
const POOL: Pool = {
  math: [...ontarioG7Math, ...albertaG7Math],
  language: [...ontarioG7Language, manitobaG7LanguageWordRoots],
  science: [...ontarioG7Science, ...albertaG7Science],
};

export const courses: Course[] = washingtonGrade("7", POOL, OWN);
