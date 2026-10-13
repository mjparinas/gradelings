import type { Course } from "../types";
import type { Pool } from "../placement";
import { units as albertaG4Math } from "../alberta/g4-math";
import { units as manitobaG4MoreScience } from "../manitoba/units/g4-more-science";
import { units as ontarioG4Language } from "../ontario/g4-language";
import { units as ontarioG4Math } from "../ontario/g4-math";
import { units as ontarioG4Science } from "../ontario/g4-science";
import { washingtonGrade } from "./kit";
import { OWN } from "./units/own-g4";

// Washington Grade 4. POOL holds the files of the units this grade copies from other frameworks (see ./plan), so
// the download carries those files and not the other frameworks' whole grades.
const POOL: Pool = {
  math: [...albertaG4Math, ...ontarioG4Math],
  language: [...ontarioG4Language],
  science: [...ontarioG4Science, ...manitobaG4MoreScience],
};

export const courses: Course[] = washingtonGrade("4", POOL, OWN);
