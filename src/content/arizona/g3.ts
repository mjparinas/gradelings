import type { Course } from "../types";
import type { Pool } from "../placement";
import { polygons as manitobaG3MathPolygons } from "../manitoba/units/g3-math";
import { wonder as manitobaG3MoreLanguageWonder } from "../manitoba/units/g3-more-language";
import { units as ontarioG3Language } from "../ontario/g3-language";
import { units as ontarioG3Math } from "../ontario/g3-math";
import { RML_3 as washingtonLanguageRmlMiddleRML_3 } from "../washington/units/language-rml-middle";
import { G3_UNITS as washingtonMathMiddleG3_UNITS } from "../washington/units/math-middle";
import { units as ontarioG4Science } from "../ontario/g4-science";
import { course as bcG4Science } from "../grades/g4/science";
import { units as manitobaG4MoreScience } from "../manitoba/units/g4-more-science";
import { SCIENCE_3 as washingtonScience35SCIENCE_3, SCIENCE_5 as washingtonScience35SCIENCE_5 } from "../washington/units/science-35";
import { team as manitobaG3MoreSocialTeam } from "../manitoba/units/g3-more-social";
import { OWN } from "./units/own-g3";
import { arizonaGrade } from "./kit";

// Arizona Grade 3. POOL holds the files of the units this grade copies from other frameworks (see ./plan), so
// the download carries those files and not the other frameworks' whole grades.
const POOL: Pool = {
  math: [...ontarioG3Math, manitobaG3MathPolygons, ...washingtonMathMiddleG3_UNITS],
  language: [...ontarioG3Language, manitobaG3MoreLanguageWonder, washingtonLanguageRmlMiddleRML_3],
  science: [...ontarioG4Science, ...bcG4Science.units, ...manitobaG4MoreScience, ...washingtonScience35SCIENCE_3, ...washingtonScience35SCIENCE_5],
  social: [manitobaG3MoreSocialTeam],
};

export const courses: Course[] = arizonaGrade("3", POOL, OWN);
