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
import { washingtonGrade } from "./kit";
import { OWN } from "./units/own-k";

// Washington Kindergarten. POOL holds the files of the units this grade copies from other frameworks (see ./plan), so
// the download carries those files and not the other frameworks' whole grades.
const POOL: Pool = {
  math: [...unitsOf(ontarioK, "math"), ...albertaKMath, ...manitobaGkMoreMath],
  language: [...unitsOf(ontarioK, "language"), ...manitobaGkMoreLanguage, ...albertaKLanguage],
  science: [...albertaKScience],
  social: [...ontarioKSocial, ...manitobaGkMoreSocial],
};

export const courses: Course[] = washingtonGrade("k", POOL, OWN);
