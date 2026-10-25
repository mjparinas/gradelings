import type { Course } from "../types";
import type { Pool } from "../placement";
import { units as albertaG8MathUnits } from "../alberta/g8-math";
import { units as albertaG9ScienceUnits } from "../alberta/g9-science";
import { LANGUAGE_8 as californiaUnitsLanguageG8LANGUAGE8 } from "../california/units/language-g8";
import { MATH_8 as californiaUnitsMathG8MATH8 } from "../california/units/math-g8";
import { SOCIAL_8 as californiaUnitsSocialG8SOCIAL8 } from "../california/units/social-g8";
import { course as gradesG7ScienceCourse } from "../grades/g7/science";
import { units as manitobaUnitsG8MoreLanguageUnits } from "../manitoba/units/g8-more-language";
import { MORE as newYorkUnitsScienceG8SignalsMORE } from "../new-york/units/science-g8-signals";
import { units as ontarioG7ScienceUnits } from "../ontario/g7-science";
import { units as ontarioG8LanguageUnits } from "../ontario/g8-language";
import { units as ontarioG8MathUnits } from "../ontario/g8-math";
import { units as ontarioG8SocialUnits } from "../ontario/g8-social";
import { units as ontarioG9ScienceUnits } from "../ontario/g9-science";
import { WEIGH_THE_EVIDENCE as oregonUnitsLanguageWEIGHTHEEVIDENCE } from "../oregon/units/language";
import { reconstruction8 as oregonUnitsSocialCopiesReconstruction8 } from "../oregon/units/social-copies";
import { OWN_SOCIAL_8 as oregonUnitsSocialG8OWNSOCIAL8 } from "../oregon/units/social-g8";
import { RML_8 as washingtonUnitsLanguageRmlUpperRML8 } from "../washington/units/language-rml-upper";
import { G8_UNITS as washingtonUnitsMathUpperG8UNITS } from "../washington/units/math-upper";
import { SCIENCE_7 as washingtonUnitsScience68SCIENCE7, SCIENCE_8 as washingtonUnitsScience68SCIENCE8 } from "../washington/units/science-68";
import { G8 as washingtonUnitsSocial59G8G8 } from "../washington/units/social-59-g8";
import { northCarolinaGrade } from "./kit";
import { OWN } from "./units/own-g8";

// North Carolina Grade 8. POOL holds the files of the units this grade copies from other frameworks (see ./plan), so
// the download carries those files and not the other frameworks' whole grades.
const POOL: Pool = {
  math: [...ontarioG8MathUnits, ...albertaG8MathUnits, ...washingtonUnitsMathUpperG8UNITS, ...californiaUnitsMathG8MATH8],
  language: [...ontarioG8LanguageUnits, ...manitobaUnitsG8MoreLanguageUnits, ...washingtonUnitsLanguageRmlUpperRML8, oregonUnitsLanguageWEIGHTHEEVIDENCE, ...californiaUnitsLanguageG8LANGUAGE8],
  science: [...ontarioG9ScienceUnits, ...ontarioG7ScienceUnits, ...gradesG7ScienceCourse.units, ...albertaG9ScienceUnits, ...washingtonUnitsScience68SCIENCE7, ...newYorkUnitsScienceG8SignalsMORE, ...washingtonUnitsScience68SCIENCE8],
  social: [...oregonUnitsSocialG8OWNSOCIAL8, ...washingtonUnitsSocial59G8G8, ...californiaUnitsSocialG8SOCIAL8, oregonUnitsSocialCopiesReconstruction8, ...ontarioG8SocialUnits],
};

export const courses: Course[] = northCarolinaGrade("8", POOL, OWN);
