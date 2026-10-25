import type { Course } from "../types";
import { unitsOf, type Pool } from "../placement";
import { units as albertaKLanguageUnits } from "../alberta/k-language";
import { units as albertaKMathUnits } from "../alberta/k-math";
import { units as albertaKScienceUnits } from "../alberta/k-science";
import { LANGUAGE_K as californiaLanguageKLANGUAGE_K } from "../california/units/language-k";
import { MATH_K as californiaMathGkMATH_K } from "../california/units/math-gk";
import { SOCIAL_K as californiaSocialKSOCIAL_K } from "../california/units/social-k";
import { course as gradesG1ScienceCourse } from "../grades/g1/science";
import { languageUnits as manitobaGkMoreLanguageLanguageUnits } from "../manitoba/units/gk-more-language";
import { mathUnits as manitobaGkMoreMathMathUnits } from "../manitoba/units/gk-more-math";
import { socialUnits as manitobaGkMoreSocialSocialUnits } from "../manitoba/units/gk-more-social";
import { UNITS as newYorkScienceKUNITS } from "../new-york/units/science-k";
import { UNITS as newYorkSocialKUNITS } from "../new-york/units/social-k";
import { courses as ontarioK } from "../ontario/k";
import { units as ontarioKSocialUnits } from "../ontario/k-social";
import { OWN_SOCIAL_K as oregonSocialK3OWN_SOCIAL_K } from "../oregon/units/social-k3";
import { peFirstMapsK as princeEdwardIslandK1ScienceSocialPeFirstMapsK } from "../prince-edward-island/units/k1-science-social";
import { SCIENCE_K as texasScienceKSCIENCE_K } from "../texas/units/science-k";
import { RML_K as washingtonLanguageRmlEarlyRML_K } from "../washington/units/language-rml-early";
import { K_UNITS as washingtonMathEarlyK_UNITS } from "../washington/units/math-early";
import { SCIENCE_K as washingtonScienceK2SCIENCE_K } from "../washington/units/science-k2";
import { SCIENCE_1 as washingtonScienceK2SCIENCE_1 } from "../washington/units/science-k2";
import { withLessons } from "../lessons";
import { mississippiGrade } from "./kit";
import { LESSONS } from "./lessons/k";
import { OWN } from "./units/own-k";

// Mississippi Kindergarten. POOL holds the files of the units this grade copies from other frameworks (see ./plan), so
// the download carries those files and not the other frameworks' whole grades. LESSONS adds the lessons for
// Mississippi's own units and for units it teaches in a different grade from the original.
const POOL: Pool = {
  math: [...unitsOf(ontarioK, "math"), ...californiaMathGkMATH_K, ...washingtonMathEarlyK_UNITS, ...manitobaGkMoreMathMathUnits, ...albertaKMathUnits],
  language: [...unitsOf(ontarioK, "language"), ...californiaLanguageKLANGUAGE_K, ...albertaKLanguageUnits, washingtonLanguageRmlEarlyRML_K, ...manitobaGkMoreLanguageLanguageUnits],
  science: [...albertaKScienceUnits, ...washingtonScienceK2SCIENCE_K, ...newYorkScienceKUNITS, ...texasScienceKSCIENCE_K, ...gradesG1ScienceCourse.units, ...washingtonScienceK2SCIENCE_1],
  social: [...californiaSocialKSOCIAL_K, ...newYorkSocialKUNITS, ...ontarioKSocialUnits, ...manitobaGkMoreSocialSocialUnits, ...oregonSocialK3OWN_SOCIAL_K, princeEdwardIslandK1ScienceSocialPeFirstMapsK],
};

export const courses: Course[] = withLessons(mississippiGrade("k", POOL, OWN), LESSONS);
