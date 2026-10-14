import type { Course } from "../types";
import { unitsOf, type Pool } from "../placement";
import { units as albertaKLanguage } from "../alberta/k-language";
import { units as albertaKMath } from "../alberta/k-math";
import { languageUnits as manitobaGkMoreLanguage } from "../manitoba/units/gk-more-language";
import { mathUnits as manitobaGkMoreMath } from "../manitoba/units/gk-more-math";
import { courses as ontarioK } from "../ontario/k";
import { RML_K as washingtonLanguageRmlEarlyRML_K } from "../washington/units/language-rml-early";
import { K_UNITS as washingtonMathEarlyK_UNITS } from "../washington/units/math-early";
import { course as bcG1Science } from "../grades/g1/science";
import { SCIENCE_K as washingtonScienceK2SCIENCE_K } from "../washington/units/science-k2";
import { OWN } from "./units/own-k";
import { arizonaGrade } from "./kit";
import { units as ontarioKSocial } from "../ontario/k-social";
import { socialUnits as manitobaGkMoreSocial } from "../manitoba/units/gk-more-social";
import { OWN_SOCIAL_K as oregonSocialK3OWN_SOCIAL_K } from "../oregon/units/social-k3";
import { SOCIAL_K as californiaSocialK } from "../california/units/social-k";

// Arizona Kindergarten. POOL holds the files of the units this grade copies from other frameworks (see ./plan), so
// the download carries those files and not the other frameworks' whole grades.
const POOL: Pool = {
  math: [...unitsOf(ontarioK, "math"), ...albertaKMath, ...manitobaGkMoreMath, ...washingtonMathEarlyK_UNITS],
  language: [...unitsOf(ontarioK, "language"), ...albertaKLanguage, ...manitobaGkMoreLanguage, washingtonLanguageRmlEarlyRML_K],
  science: [...bcG1Science.units, ...washingtonScienceK2SCIENCE_K],
  social: [...ontarioKSocial, ...manitobaGkMoreSocial, ...oregonSocialK3OWN_SOCIAL_K, ...californiaSocialK],
};

export const courses: Course[] = arizonaGrade("k", POOL, OWN);
