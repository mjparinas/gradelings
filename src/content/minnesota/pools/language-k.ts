import type { Unit } from "../../types";
import { POOL as newYorkPoolsLanguageKPOOL } from "../../new-york/pools/language-k";
import { RML_K as washingtonUnitsLanguageRmlEarlyRML_K } from "../../washington/units/language-rml-early";
import { languageUnits as manitobaUnitsGkMoreLanguageLanguageUnits } from "../../manitoba/units/gk-more-language";
import { units as albertaKLanguageUnits } from "../../alberta/k-language";

// The units Minnesota's Kindergarten language course copies from other frameworks (see ../plan/language.ts). Import only the unit
// files it adopts from, so the grade's download carries those files and not other frameworks' whole grades.
export const POOL: readonly Unit[] = [...newYorkPoolsLanguageKPOOL, ...albertaKLanguageUnits, ...manitobaUnitsGkMoreLanguageLanguageUnits, washingtonUnitsLanguageRmlEarlyRML_K];
