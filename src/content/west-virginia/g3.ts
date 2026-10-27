import type { Course } from "../types";
import type { Pool } from "../placement";
import { LANGUAGE_3 as californiaLanguage3 } from "../california/units/language-g3";
import { SOCIAL_3 as californiaSocialG3SOCIAL3 } from "../california/units/social-g3";
import { SOCIAL_5 as californiaSocialG5SOCIAL5 } from "../california/units/social-g5";
import { polygons as manitobaG3MathPolygons } from "../manitoba/units/g3-math";
import { wonder as manitobaG3MoreLanguageWonder } from "../manitoba/units/g3-more-language";
import { team as manitobaG3MoreSocialTeam } from "../manitoba/units/g3-more-social";
import { life as manitobaG3ScienceLife, speed as manitobaG3ScienceSpeed } from "../manitoba/units/g3-science";
import { units as ontarioG3Language } from "../ontario/g3-language";
import { units as ontarioG3Math } from "../ontario/g3-math";
import { units as ontarioG3ScienceUnits } from "../ontario/g3-science";
import { SCIENCE_3 as oregonScience35SCIENCE3 } from "../oregon/units/science-35";
import { SOCIAL_3 as texasSocialG3SOCIAL3 } from "../texas/units/social-g3";
import { RML_3 as washingtonLanguageRmlMiddleRML_3 } from "../washington/units/language-rml-middle";
import { G3_UNITS as washingtonMathMiddleG3_UNITS } from "../washington/units/math-middle";
import { SCIENCE_3 as washingtonScience35SCIENCE3 } from "../washington/units/science-35";
import { G6 as washingtonSocial59G6G6 } from "../washington/units/social-59-g6";
import { withLessons } from "../lessons";
import { westVirginiaGrade } from "./kit";
import { LESSONS } from "./lessons/g3";
import { OWN } from "./units/own-g3";

// West Virginia Grade 3. POOL holds the files of the units this grade copies from other frameworks (see ./plan), so
// the download carries those files and not the other frameworks' whole grades. LESSONS adds the lessons for
// West Virginia's own units and for units it teaches in a different grade from where their lesson is written.
const POOL: Pool = {
  math: [...ontarioG3Math, manitobaG3MathPolygons, ...washingtonMathMiddleG3_UNITS],
  language: [...ontarioG3Language, manitobaG3MoreLanguageWonder, washingtonLanguageRmlMiddleRML_3, ...californiaLanguage3],
  science: [...ontarioG3ScienceUnits, manitobaG3ScienceLife, manitobaG3ScienceSpeed, ...washingtonScience35SCIENCE3, ...oregonScience35SCIENCE3],
  social: [...texasSocialG3SOCIAL3, manitobaG3MoreSocialTeam, ...californiaSocialG3SOCIAL3, ...californiaSocialG5SOCIAL5, ...washingtonSocial59G6G6],
};

export const courses: Course[] = withLessons(westVirginiaGrade("3", POOL, OWN), LESSONS);
