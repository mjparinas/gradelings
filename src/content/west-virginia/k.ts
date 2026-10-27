import type { Course } from "../types";
import { unitsOf, type Pool } from "../placement";
import { units as albertaKLanguage } from "../alberta/k-language";
import { units as albertaKMath } from "../alberta/k-math";
import { units as albertaKScienceUnits } from "../alberta/k-science";
import { LANGUAGE_K as californiaLanguageK } from "../california/units/language-k";
import { MATH_K as californiaMathK } from "../california/units/math-gk";
import { SOCIAL_K as californiaSocialKSOCIALK } from "../california/units/social-k";
import { languageUnits as manitobaGkMoreLanguage } from "../manitoba/units/gk-more-language";
import { mathUnits as manitobaGkMoreMath } from "../manitoba/units/gk-more-math";
import { socialUnits as manitobaGkMoreSocialSocialUnits } from "../manitoba/units/gk-more-social";
import { courses as ontarioK } from "../ontario/k";
import { units as ontarioKSocialUnits } from "../ontario/k-social";
import { SCIENCE_K as oregonScienceK2SCIENCEK } from "../oregon/units/science-k2";
import { OWN_SOCIAL_K as oregonSocialK3OWNSOCIALK } from "../oregon/units/social-k3";
import { peFirstMapsK as princeEdwardIslandK1ScienceSocialPeFirstMapsK } from "../prince-edward-island/units/k1-science-social";
import { RML_K as washingtonLanguageRmlEarlyRML_K } from "../washington/units/language-rml-early";
import { K_UNITS as washingtonMathEarlyK_UNITS } from "../washington/units/math-early";
import { SCIENCE_K as washingtonScienceK2SCIENCEK } from "../washington/units/science-k2";
import { withLessons } from "../lessons";
import { westVirginiaGrade } from "./kit";
import { LESSONS } from "./lessons/k";
import { OWN } from "./units/own-k";

// West Virginia Kindergarten. POOL holds the files of the units this grade copies from other frameworks (see ./plan), so
// the download carries those files and not the other frameworks' whole grades. LESSONS adds the lessons for
// West Virginia's own units and for units it teaches in a different grade from where their lesson is written.
const POOL: Pool = {
  math: [...unitsOf(ontarioK, "math"), ...albertaKMath, ...manitobaGkMoreMath, ...washingtonMathEarlyK_UNITS, ...californiaMathK],
  language: [...unitsOf(ontarioK, "language"), ...albertaKLanguage, ...manitobaGkMoreLanguage, washingtonLanguageRmlEarlyRML_K, ...californiaLanguageK],
  science: [...albertaKScienceUnits, ...washingtonScienceK2SCIENCEK, ...oregonScienceK2SCIENCEK],
  social: [...ontarioKSocialUnits, princeEdwardIslandK1ScienceSocialPeFirstMapsK, ...manitobaGkMoreSocialSocialUnits, ...oregonSocialK3OWNSOCIALK, ...californiaSocialKSOCIALK],
};

export const courses: Course[] = withLessons(westVirginiaGrade("k", POOL, OWN), LESSONS);
