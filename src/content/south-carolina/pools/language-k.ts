import type { Unit } from "../../types";
import { unitsOf } from "../../placement";
import { RML_K as washingtonUnitsLanguageRmlEarlyRML_K } from "../../washington/units/language-rml-early";
import { courses as ontarioKCourses } from "../../ontario/k";
import { languageUnits as manitobaUnitsGkMoreLanguageLanguageUnits } from "../../manitoba/units/gk-more-language";
import { units as albertaKLanguageUnits } from "../../alberta/k-language";

// The units South Carolina's Kindergarten English language arts course copies from other frameworks (see ../plan). Import only the
// unit files it adopts from, so the grade's download carries those files and not other frameworks' whole grades.
export const POOL: readonly Unit[] = [
  ...unitsOf(ontarioKCourses, "language"),
  ...albertaKLanguageUnits,
  ...manitobaUnitsGkMoreLanguageLanguageUnits,
  washingtonUnitsLanguageRmlEarlyRML_K,
];
