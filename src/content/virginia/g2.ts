import type { Course } from "../types";
import type { Pool } from "../placement";
import { UNITS as alabamaUnitsSocialG2UNITS } from "../alabama/units/social-g2";
import { units as albertaG2MathUnits } from "../alberta/g2-math";
import { COPIES_2 as arizonaUnitsCopiesG2COPIES2 } from "../arizona/units/copies-g2";
import { LANGUAGE_2 as californiaUnitsLanguageG2LANGUAGE2 } from "../california/units/language-g2";
import { ADD_FOUR_2 as californiaUnitsMathG2ADDFOUR2 } from "../california/units/math-g2";
import { SOCIAL_2 as californiaUnitsSocialG2SOCIAL2 } from "../california/units/social-g2";
import { course as gradesKScienceCourse } from "../grades/k/science";
import { evenOdd as manitobaUnitsG2MathEvenOdd, skipCounting as manitobaUnitsG2MathSkipCounting } from "../manitoba/units/g2-math";
import { moreLanguage as manitobaUnitsG2MoreLanguageMoreLanguage } from "../manitoba/units/g2-more-language";
import { units as ontarioG2LanguageUnits } from "../ontario/g2-language";
import { units as ontarioG2ScienceUnits } from "../ontario/g2-science";
import { SCIENCE_2 as oregonUnitsScienceK2SCIENCE2 } from "../oregon/units/science-k2";
import { RML_2 as washingtonUnitsLanguageRmlEarlyRML2 } from "../washington/units/language-rml-early";
import { G2_UNITS as washingtonUnitsMathEarlyG2UNITS } from "../washington/units/math-early";
import { SCIENCE_3 as washingtonUnitsScience35SCIENCE3 } from "../washington/units/science-35";
import { SCIENCE_2 as washingtonUnitsScienceK2SCIENCE2 } from "../washington/units/science-k2";
import { virginiaGrade } from "./kit";
import { OWN } from "./units/own-g2";

// Virginia Grade 2. POOL holds the files of the units this grade copies from other frameworks (see ./plan), so
// the download carries those files and not the other frameworks' whole grades.
const POOL: Pool = {
  math: [...washingtonUnitsMathEarlyG2UNITS, ...albertaG2MathUnits, manitobaUnitsG2MathEvenOdd, californiaUnitsMathG2ADDFOUR2, manitobaUnitsG2MathSkipCounting],
  language: [...ontarioG2LanguageUnits, ...californiaUnitsLanguageG2LANGUAGE2, washingtonUnitsLanguageRmlEarlyRML2, ...manitobaUnitsG2MoreLanguageMoreLanguage],
  science: [...ontarioG2ScienceUnits, ...oregonUnitsScienceK2SCIENCE2, ...washingtonUnitsScienceK2SCIENCE2, ...gradesKScienceCourse.units, ...washingtonUnitsScience35SCIENCE3],
  social: [...californiaUnitsSocialG2SOCIAL2, ...alabamaUnitsSocialG2UNITS, ...arizonaUnitsCopiesG2COPIES2],
};

export const courses: Course[] = virginiaGrade("2", POOL, OWN);
