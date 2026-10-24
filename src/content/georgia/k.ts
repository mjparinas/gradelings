import type { Course } from "../types";
import { unitsOf, type Pool } from "../placement";
import { units as albertaKLanguageUnits } from "../alberta/k-language";
import { units as albertaKMathUnits } from "../alberta/k-math";
import { units as albertaKScienceUnits } from "../alberta/k-science";
import { LANGUAGE_K as californiaUnitsLanguageKLANGUAGEK } from "../california/units/language-k";
import { MATH_K as californiaUnitsMathGkMATHK } from "../california/units/math-gk";
import { SOCIAL_K as californiaUnitsSocialKSOCIALK } from "../california/units/social-k";
import { course as gradesG1ScienceCourse } from "../grades/g1/science";
import { languageUnits as manitobaUnitsGkMoreLanguageLanguageUnits } from "../manitoba/units/gk-more-language";
import { mathUnits as manitobaUnitsGkMoreMathMathUnits } from "../manitoba/units/gk-more-math";
import { scienceUnits as manitobaUnitsGkMoreScienceScienceUnits } from "../manitoba/units/gk-more-science";
import { socialUnits as manitobaUnitsGkMoreSocialSocialUnits } from "../manitoba/units/gk-more-social";
import { UNITS as newYorkUnitsMathKUNITS } from "../new-york/units/math-k";
import { UNITS as newYorkUnitsSocialKUNITS } from "../new-york/units/social-k";
import { courses as ontarioKCourses } from "../ontario/k";
import { units as ontarioKSocialUnits } from "../ontario/k-social";
import { OWN_SOCIAL_K as oregonUnitsSocialK3OWNSOCIALK } from "../oregon/units/social-k3";
import { OWN as texasCoursesScienceKOWN } from "../texas/courses/science-k";
import { RML_K as washingtonUnitsLanguageRmlEarlyRMLK } from "../washington/units/language-rml-early";
import { K_UNITS as washingtonUnitsMathEarlyKUNITS } from "../washington/units/math-early";
import { SCIENCE_1 as washingtonUnitsScienceK2SCIENCE1 } from "../washington/units/science-k2";
import { georgiaGrade } from "./kit";
import { OWN } from "./units/own-k";

// Georgia Kindergarten. POOL holds the files of the units this grade copies from other frameworks (see ./plan), so
// the download carries those files and not the other frameworks' whole grades.
const POOL: Pool = {
  math: [...unitsOf(ontarioKCourses, "math"), ...albertaKMathUnits, ...manitobaUnitsGkMoreMathMathUnits, ...washingtonUnitsMathEarlyKUNITS, ...californiaUnitsMathGkMATHK, ...newYorkUnitsMathKUNITS],
  language: [...unitsOf(ontarioKCourses, "language"), ...albertaKLanguageUnits, ...manitobaUnitsGkMoreLanguageLanguageUnits, washingtonUnitsLanguageRmlEarlyRMLK, ...californiaUnitsLanguageKLANGUAGEK],
  science: [...manitobaUnitsGkMoreScienceScienceUnits, ...texasCoursesScienceKOWN, ...gradesG1ScienceCourse.units, ...washingtonUnitsScienceK2SCIENCE1, ...albertaKScienceUnits],
  social: [...manitobaUnitsGkMoreSocialSocialUnits, ...newYorkUnitsSocialKUNITS, ...californiaUnitsSocialKSOCIALK, ...ontarioKSocialUnits, ...oregonUnitsSocialK3OWNSOCIALK],
};

export const courses: Course[] = georgiaGrade("k", POOL, OWN);
