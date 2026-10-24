import type { Course } from "../types";
import type { Pool } from "../placement";
import { units as albertaG8MathUnits } from "../alberta/g8-math";
import { LANGUAGE_8 as californiaUnitsLanguageG8LANGUAGE8 } from "../california/units/language-g8";
import { MATH_8 as californiaUnitsMathG8MATH8 } from "../california/units/math-g8";
import { course as gradesG6ScienceCourse } from "../grades/g6/science";
import { course as gradesG7ScienceCourse } from "../grades/g7/science";
import { units as manitobaUnitsG8MoreLanguageUnits } from "../manitoba/units/g8-more-language";
import { units as manitobaUnitsG8MoreSocialBUnits } from "../manitoba/units/g8-more-social-b";
import { units as ontarioG7ScienceUnits } from "../ontario/g7-science";
import { units as ontarioG8LanguageUnits } from "../ontario/g8-language";
import { units as ontarioG8MathUnits } from "../ontario/g8-math";
import { units as ontarioG8ScienceUnits } from "../ontario/g8-science";
import { units as ontarioG8SocialUnits } from "../ontario/g8-social";
import { WEIGH_THE_EVIDENCE as oregonUnitsLanguageWEIGHTHEEVIDENCE } from "../oregon/units/language";
import { OWN as texasCoursesScience6OWN } from "../texas/courses/science-6";
import { OWN as texasCoursesScience7OWN } from "../texas/courses/science-7";
import { RML_8 as washingtonUnitsLanguageRmlUpperRML8 } from "../washington/units/language-rml-upper";
import { G8_UNITS as washingtonUnitsMathUpperG8UNITS } from "../washington/units/math-upper";
import { SCIENCE_7 as washingtonUnitsScience68SCIENCE7, SCIENCE_8 as washingtonUnitsScience68SCIENCE8 } from "../washington/units/science-68";
import { georgiaGrade } from "./kit";
import { OWN } from "./units/own-g8";

// Georgia Grade 8. POOL holds the files of the units this grade copies from other frameworks (see ./plan), so
// the download carries those files and not the other frameworks' whole grades.
const POOL: Pool = {
  math: [...ontarioG8MathUnits, ...albertaG8MathUnits, ...washingtonUnitsMathUpperG8UNITS, ...californiaUnitsMathG8MATH8],
  language: [...ontarioG8LanguageUnits, ...manitobaUnitsG8MoreLanguageUnits, ...washingtonUnitsLanguageRmlUpperRML8, oregonUnitsLanguageWEIGHTHEEVIDENCE, ...californiaUnitsLanguageG8LANGUAGE8],
  science: [...ontarioG7ScienceUnits, ...gradesG7ScienceCourse.units, ...ontarioG8ScienceUnits, ...washingtonUnitsScience68SCIENCE7, ...washingtonUnitsScience68SCIENCE8, ...texasCoursesScience7OWN, ...gradesG6ScienceCourse.units, ...texasCoursesScience6OWN],
  social: [...manitobaUnitsG8MoreSocialBUnits, ...ontarioG8SocialUnits],
};

export const courses: Course[] = georgiaGrade("8", POOL, OWN);
