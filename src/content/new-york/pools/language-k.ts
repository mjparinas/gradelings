import type { Unit } from "../../types";
import { unitsOf } from "../../placement";
import { units as albertaKLanguage } from "../../alberta/k-language";
import { languageUnits as manitobaGkMoreLanguage } from "../../manitoba/units/gk-more-language";
import { courses as ontarioK } from "../../ontario/k";
import { RML_K as washingtonLanguageRmlEarlyRML_K } from "../../washington/units/language-rml-early";

// The units New York's Kindergarten language course copies from other frameworks (see ../plan/language.ts). Import only the unit
// files it adopts from, so the grade's download carries those files and not other frameworks' whole grades.
export const POOL: readonly Unit[] = [...unitsOf(ontarioK, "language"), ...albertaKLanguage, ...manitobaGkMoreLanguage, washingtonLanguageRmlEarlyRML_K];
