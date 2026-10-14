import type { Course } from "../types";
import type { Pool } from "../placement";
import { units as albertaG6Math } from "../alberta/g6-math";
import { units as albertaG6Science } from "../alberta/g6-science";
import { senses as newBrunswickG6ScienceSenses } from "../new-brunswick/units/g6-science";
import { units as ontarioG6Language } from "../ontario/g6-language";
import { units as ontarioG6Math } from "../ontario/g6-math";
import { washingtonGrade } from "./kit";
import { OWN } from "./units/own-g6";

// Washington Grade 6. POOL holds the files of the units this grade copies from other frameworks (see ./plan), so
// the download carries those files and not the other frameworks' whole grades.
const POOL: Pool = {
  math: [...ontarioG6Math, ...albertaG6Math],
  language: [...ontarioG6Language],
  science: [...albertaG6Science, newBrunswickG6ScienceSenses],
};

export const courses: Course[] = washingtonGrade("6", POOL, OWN);
