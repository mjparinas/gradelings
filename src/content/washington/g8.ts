import type { Course } from "../types";
import type { Pool } from "../placement";
import { units as albertaG8Math } from "../alberta/g8-math";
import { units as manitobaG8MoreLanguage } from "../manitoba/units/g8-more-language";
import { units as manitobaG8MoreSocialB } from "../manitoba/units/g8-more-social-b";
import { motionForces as newBrunswickG8ScienceMotionForces } from "../new-brunswick/units/g8-science";
import { units as ontarioG8Language } from "../ontario/g8-language";
import { units as ontarioG8Math } from "../ontario/g8-math";
import { units as ontarioG8Science } from "../ontario/g8-science";
import { units as ontarioG8Social } from "../ontario/g8-social";
import { washingtonGrade } from "./kit";
import { OWN } from "./units/own-g8";

// Washington Grade 8. POOL holds the files of the units this grade copies from other frameworks (see ./plan), so
// the download carries those files and not the other frameworks' whole grades.
const POOL: Pool = {
  math: [...ontarioG8Math, ...albertaG8Math],
  language: [...ontarioG8Language, ...manitobaG8MoreLanguage],
  science: [newBrunswickG8ScienceMotionForces, ...ontarioG8Science],
  social: [...manitobaG8MoreSocialB, ...ontarioG8Social],
};

export const courses: Course[] = washingtonGrade("8", POOL, OWN);
