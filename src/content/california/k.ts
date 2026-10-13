import type { Course } from "../types";
import { unitsOf, type Pool } from "../placement";
import { units as albertaKLanguage } from "../alberta/k-language";
import { units as albertaKMath } from "../alberta/k-math";
import { units as albertaKScience } from "../alberta/k-science";
import { languageUnits as manitobaGkMoreLanguage } from "../manitoba/units/gk-more-language";
import { mathUnits as manitobaGkMoreMath } from "../manitoba/units/gk-more-math";
import { socialUnits as manitobaGkMoreSocial } from "../manitoba/units/gk-more-social";
import { courses as ontarioK } from "../ontario/k";
import { units as ontarioKSocial } from "../ontario/k-social";
import { SCIENCE_K as oregonScienceK2SCIENCE_K } from "../oregon/units/science-k2";
import { OWN_SOCIAL_K as oregonSocialK3OWN_SOCIAL_K } from "../oregon/units/social-k3";
import { RML_K as washingtonLanguageRmlEarlyRML_K } from "../washington/units/language-rml-early";
import { K_UNITS as washingtonMathEarlyK_UNITS } from "../washington/units/math-early";
import { SCIENCE_K as washingtonScienceK2SCIENCE_K } from "../washington/units/science-k2";
import { californiaGrade } from "./kit";
import { OWN } from "./units/own-k";

// California Kindergarten. POOL holds the files of the units this grade copies from other frameworks (see ./plan), so
// the download carries those files and not the other frameworks' whole grades.
const POOL: Pool = {
  math: [...unitsOf(ontarioK, "math"), ...albertaKMath, ...manitobaGkMoreMath, ...washingtonMathEarlyK_UNITS],
  language: [...unitsOf(ontarioK, "language"), ...albertaKLanguage, ...manitobaGkMoreLanguage, washingtonLanguageRmlEarlyRML_K],
  science: [...albertaKScience, ...washingtonScienceK2SCIENCE_K, ...oregonScienceK2SCIENCE_K],
  social: [...ontarioKSocial, ...manitobaGkMoreSocial, ...oregonSocialK3OWN_SOCIAL_K],
};

export const courses: Course[] = californiaGrade("k", POOL, OWN);
