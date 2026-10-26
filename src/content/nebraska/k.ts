import type { Course } from "../types";
import { unitsOf, type Pool } from "../placement";
import { units as albertaKLanguage } from "../alberta/k-language";
import { units as albertaKMath } from "../alberta/k-math";
import { units as albertaKScience } from "../alberta/k-science";
import { languageUnits as manitobaGkMoreLanguage } from "../manitoba/units/gk-more-language";
import { mathUnits as manitobaGkMoreMath } from "../manitoba/units/gk-more-math";
import { courses as ontarioK } from "../ontario/k";
import { SCIENCE_K as oregonScienceK2SCIENCE_K } from "../oregon/units/science-k2";
import { RML_K as washingtonLanguageRmlEarlyRML_K } from "../washington/units/language-rml-early";
import { K_UNITS as washingtonMathEarlyK_UNITS } from "../washington/units/math-early";
import { SCIENCE_K as washingtonScienceK2SCIENCE_K } from "../washington/units/science-k2";
import { units as ontarioKSocial } from "../ontario/k-social";
import { socialUnits as manitobaGkMoreSocial } from "../manitoba/units/gk-more-social";
import { OWN_SOCIAL_K as oregonSocialK3OWN_SOCIAL_K } from "../oregon/units/social-k3";
import { SOCIAL_K as californiaSocialK } from "../california/units/social-k";
import { MATH_K as californiaMathK } from "../california/units/math-gk";
import { LANGUAGE_K as californiaLanguageK } from "../california/units/language-k";
import { withLessons } from "../lessons";
import { nebraskaGrade } from "./kit";
import { LESSONS } from "./lessons/k";
import { OWN } from "./units/own-k";

// Nebraska Kindergarten. POOL holds the files of the units this grade copies from other frameworks (see ./plan), so
// the download carries those files and not the other frameworks' whole grades. LESSONS adds the lessons for Nebraska's own
// units and for units it teaches in a different grade from the original.
const POOL: Pool = {
  math: [...unitsOf(ontarioK, "math"), ...albertaKMath, ...manitobaGkMoreMath, ...washingtonMathEarlyK_UNITS, ...californiaMathK],
  language: [...unitsOf(ontarioK, "language"), ...albertaKLanguage, ...manitobaGkMoreLanguage, washingtonLanguageRmlEarlyRML_K, ...californiaLanguageK],
  science: [...albertaKScience, ...washingtonScienceK2SCIENCE_K, ...oregonScienceK2SCIENCE_K],
  social: [...ontarioKSocial, ...manitobaGkMoreSocial, ...oregonSocialK3OWN_SOCIAL_K, ...californiaSocialK],
};

export const courses: Course[] = withLessons(nebraskaGrade("k", POOL, OWN), LESSONS);
