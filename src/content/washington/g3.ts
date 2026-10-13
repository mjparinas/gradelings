import type { Course } from "../types";
import type { Pool } from "../placement";
import { polygons as manitobaG3MathPolygons } from "../manitoba/units/g3-math";
import { wonder as manitobaG3MoreLanguageWonder } from "../manitoba/units/g3-more-language";
import { team as manitobaG3MoreSocialTeam } from "../manitoba/units/g3-more-social";
import { life as manitobaG3ScienceLife } from "../manitoba/units/g3-science";
import { speed as manitobaG3ScienceSpeed } from "../manitoba/units/g3-science";
import { life as manitobaG3SocialBLife } from "../manitoba/units/g3-social-b";
import { units as ontarioG3Language } from "../ontario/g3-language";
import { units as ontarioG3Math } from "../ontario/g3-math";
import { units as ontarioG3Science } from "../ontario/g3-science";
import { washingtonGrade } from "./kit";
import { OWN } from "./units/own-g3";

// Washington Grade 3. POOL holds the files of the units this grade copies from other frameworks (see ./plan), so
// the download carries those files and not the other frameworks' whole grades.
const POOL: Pool = {
  math: [...ontarioG3Math, manitobaG3MathPolygons],
  language: [...ontarioG3Language, manitobaG3MoreLanguageWonder],
  science: [...ontarioG3Science, manitobaG3ScienceSpeed, manitobaG3ScienceLife],
  social: [manitobaG3SocialBLife, manitobaG3MoreSocialTeam],
};

export const courses: Course[] = washingtonGrade("3", POOL, OWN);
