import type { Unit } from "../../types";
import { unitsOf } from "../../placement";
import { LANGUAGE_K as californiaUnitsLanguageKLANGUAGEK } from "../../california/units/language-k";
import { LANGUAGE_K as texasUnitsLanguageKLANGUAGEK } from "../../texas/units/language-k";
import { UNITS as newYorkUnitsLanguageKUNITS } from "../../new-york/units/language-k";
import { languageUnits as manitobaUnitsGkMoreLanguageLanguageUnits } from "../../manitoba/units/gk-more-language";
import { RML_K as washingtonUnitsLanguageRmlEarlyRMLK } from "../../washington/units/language-rml-early";
import { units as albertaKLanguageUnits } from "../../alberta/k-language";
import { courses as ontarioKCourses } from "../../ontario/k";

// The units Pennsylvania's Kindergarten English language arts course copies from other frameworks (see ../plan). Import only the unit files it
// adopts from, so the grade's download carries those files and not other frameworks' whole grades.
export const POOL: readonly Unit[] = [...californiaUnitsLanguageKLANGUAGEK, ...texasUnitsLanguageKLANGUAGEK, ...newYorkUnitsLanguageKUNITS, ...manitobaUnitsGkMoreLanguageLanguageUnits, washingtonUnitsLanguageRmlEarlyRMLK, ...albertaKLanguageUnits, ...unitsOf(ontarioKCourses, "language")];
