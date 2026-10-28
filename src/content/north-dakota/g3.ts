import type { Course } from "../types";
import type { Pool } from "../placement";
import { polygons as manitobaG3MathPolygons } from "../manitoba/units/g3-math";
import { wonder as manitobaG3MoreLanguageWonder } from "../manitoba/units/g3-more-language";
import { life as manitobaG3ScienceLife } from "../manitoba/units/g3-science";
import { speed as manitobaG3ScienceSpeed } from "../manitoba/units/g3-science";
import { units as ontarioG3Language } from "../ontario/g3-language";
import { units as ontarioG3Math } from "../ontario/g3-math";
import { units as ontarioG3Science } from "../ontario/g3-science";
import { SCIENCE_3 as oregonScience35SCIENCE_3 } from "../oregon/units/science-35";
import { RML_3 as washingtonLanguageRmlMiddleRML_3 } from "../washington/units/language-rml-middle";
import { G3_UNITS as washingtonMathMiddleG3_UNITS } from "../washington/units/math-middle";
import { SCIENCE_3 as washingtonScience35SCIENCE_3 } from "../washington/units/science-35";
import { LANGUAGE_3 as californiaLanguage3 } from "../california/units/language-g3";
import { historyDetective5 as oregonSocialCopieshistoryDetective5 } from "../oregon/units/social-copies";
import { UNITS as newYorkSocialG3UNITS } from "../new-york/units/social-g3";
import { SOCIAL_3 as georgiaSocialG3SOCIAL_3 } from "../georgia/units/social-g3";
import { UNITS as floridaSocialG3UNITS } from "../florida/units/social-g3";
import { withLessons } from "../lessons";
import { northDakotaGrade } from "./kit";
import { LESSONS } from "./lessons/g3";
import { OWN } from "./units/own-g3";

// North Dakota Grade 3. POOL holds the files of the units this grade copies from other frameworks (see ./plan), so
// the download carries those files and not the other frameworks' whole grades. LESSONS adds the lessons for North Dakota's own
// units and for units it teaches in a different grade from the original.
const POOL: Pool = {
  math: [...ontarioG3Math, manitobaG3MathPolygons, ...washingtonMathMiddleG3_UNITS],
  language: [...ontarioG3Language, manitobaG3MoreLanguageWonder, washingtonLanguageRmlMiddleRML_3, ...californiaLanguage3],
  science: [...ontarioG3Science, manitobaG3ScienceLife, manitobaG3ScienceSpeed, ...washingtonScience35SCIENCE_3, ...oregonScience35SCIENCE_3],
  social: [oregonSocialCopieshistoryDetective5, ...newYorkSocialG3UNITS, ...georgiaSocialG3SOCIAL_3, ...floridaSocialG3UNITS],
};

export const courses: Course[] = withLessons(northDakotaGrade("3", POOL, OWN), LESSONS);
