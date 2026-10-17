import type { Unit } from "../../types";
import { unitsOf } from "../../placement";
import { LANGUAGE_K as californiaUnitsLanguageKLANGUAGEK } from "../../california/units/language-k";
import { RML_K as washingtonUnitsLanguageRmlEarlyRMLK } from "../../washington/units/language-rml-early";
import { units as albertaKLanguageUnits } from "../../alberta/k-language";
import { languageUnits as manitobaUnitsGkMoreLanguageLanguageUnits } from "../../manitoba/units/gk-more-language";
import { courses as ontarioKCourses } from "../../ontario/k";

// The units Florida's Kindergarten English language arts course copies from other frameworks (see ../plan). Import only the unit files it
// adopts from, so the grade's download carries those files and not other frameworks' whole grades.
export const POOL: readonly Unit[] = [...californiaUnitsLanguageKLANGUAGEK, washingtonUnitsLanguageRmlEarlyRMLK, ...albertaKLanguageUnits, ...manitobaUnitsGkMoreLanguageLanguageUnits, ...unitsOf(ontarioKCourses, "language")];
