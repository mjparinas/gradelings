import type { Course } from "../types";
import type { Pool } from "../placement";
import { LANGUAGE_3 as californiaUnitsLanguageG3LANGUAGE3 } from "../california/units/language-g3";
import { polygons as manitobaUnitsG3MathPolygons } from "../manitoba/units/g3-math";
import { wonder as manitobaUnitsG3MoreLanguageWonder } from "../manitoba/units/g3-more-language";
import { findOut as manitobaUnitsG3MoreSocialFindOut, team as manitobaUnitsG3MoreSocialTeam } from "../manitoba/units/g3-more-social";
import { life as manitobaUnitsG3ScienceLife, speed as manitobaUnitsG3ScienceSpeed } from "../manitoba/units/g3-science";
import { UNITS as newYorkUnitsSocialG3UNITS } from "../new-york/units/social-g3";
import { units as ontarioG3LanguageUnits } from "../ontario/g3-language";
import { units as ontarioG3MathUnits } from "../ontario/g3-math";
import { units as ontarioG3ScienceUnits } from "../ontario/g3-science";
import { SCIENCE_3 as oregonUnitsScience35SCIENCE3 } from "../oregon/units/science-35";
import { OWN_SOCIAL_2 as oregonUnitsSocialK3OWNSOCIAL2 } from "../oregon/units/social-k3";
import { SOCIAL_3 as texasUnitsSocialG3SOCIAL3 } from "../texas/units/social-g3";
import { RML_3 as washingtonUnitsLanguageRmlMiddleRML3 } from "../washington/units/language-rml-middle";
import { G3_UNITS as washingtonUnitsMathMiddleG3UNITS } from "../washington/units/math-middle";
import { SCIENCE_3 as washingtonUnitsScience35SCIENCE3 } from "../washington/units/science-35";
import { indianaGrade } from "./kit";
import { OWN } from "./units/own-g3";

// Indiana Grade 3. POOL holds the files of the units this grade copies from other frameworks (see ./plan), so
// the download carries those files and not the other frameworks' whole grades.
const POOL: Pool = {
  math: [...ontarioG3MathUnits, manitobaUnitsG3MathPolygons, ...washingtonUnitsMathMiddleG3UNITS],
  language: [...ontarioG3LanguageUnits, manitobaUnitsG3MoreLanguageWonder, washingtonUnitsLanguageRmlMiddleRML3, ...californiaUnitsLanguageG3LANGUAGE3],
  science: [...ontarioG3ScienceUnits, manitobaUnitsG3ScienceLife, manitobaUnitsG3ScienceSpeed, ...washingtonUnitsScience35SCIENCE3, ...oregonUnitsScience35SCIENCE3],
  social: [manitobaUnitsG3MoreSocialTeam, ...oregonUnitsSocialK3OWNSOCIAL2, ...texasUnitsSocialG3SOCIAL3, ...newYorkUnitsSocialG3UNITS, manitobaUnitsG3MoreSocialFindOut],
};

export const courses: Course[] = indianaGrade("3", POOL, OWN);
