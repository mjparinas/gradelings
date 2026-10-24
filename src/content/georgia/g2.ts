import type { Course } from "../types";
import type { Pool } from "../placement";
import { units as albertaG2MathUnits } from "../alberta/g2-math";
import { units as albertaKScienceUnits } from "../alberta/k-science";
import { LANGUAGE_2 as californiaUnitsLanguageG2LANGUAGE2 } from "../california/units/language-g2";
import { MATH_2 as californiaUnitsMathG2MATH2 } from "../california/units/math-g2";
import { SOCIAL_2 as californiaUnitsSocialG2SOCIAL2 } from "../california/units/social-g2";
import { course as gradesG1ScienceCourse } from "../grades/g1/science";
import { evenOdd as manitobaUnitsG2MathEvenOdd, skipCounting as manitobaUnitsG2MathSkipCounting } from "../manitoba/units/g2-math";
import { moreLanguage as manitobaUnitsG2MoreLanguageMoreLanguage } from "../manitoba/units/g2-more-language";
import { units as ontarioG1ScienceUnits } from "../ontario/g1-science";
import { units as ontarioG2LanguageUnits } from "../ontario/g2-language";
import { units as ontarioG2ScienceUnits } from "../ontario/g2-science";
import { SCIENCE_2 as oregonUnitsScienceK2SCIENCE2 } from "../oregon/units/science-k2";
import { RML_2 as washingtonUnitsLanguageRmlEarlyRML2 } from "../washington/units/language-rml-early";
import { G2_UNITS as washingtonUnitsMathEarlyG2UNITS } from "../washington/units/math-early";
import { SCIENCE_2 as washingtonUnitsScienceK2SCIENCE2 } from "../washington/units/science-k2";
import { georgiaGrade } from "./kit";
import { OWN } from "./units/own-g2";

// Georgia Grade 2. POOL holds the files of the units this grade copies from other frameworks (see ./plan), so
// the download carries those files and not the other frameworks' whole grades.
const POOL: Pool = {
  math: [...albertaG2MathUnits, manitobaUnitsG2MathSkipCounting, manitobaUnitsG2MathEvenOdd, ...washingtonUnitsMathEarlyG2UNITS, ...californiaUnitsMathG2MATH2],
  language: [...ontarioG2LanguageUnits, ...manitobaUnitsG2MoreLanguageMoreLanguage, washingtonUnitsLanguageRmlEarlyRML2, ...californiaUnitsLanguageG2LANGUAGE2],
  science: [...gradesG1ScienceCourse.units, ...albertaKScienceUnits, ...washingtonUnitsScienceK2SCIENCE2, ...ontarioG2ScienceUnits, ...ontarioG1ScienceUnits, ...oregonUnitsScienceK2SCIENCE2],
  social: [...californiaUnitsSocialG2SOCIAL2],
};

export const courses: Course[] = georgiaGrade("2", POOL, OWN);
