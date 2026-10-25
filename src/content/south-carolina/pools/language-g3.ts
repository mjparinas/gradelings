import type { Unit } from "../../types";
import { LANGUAGE_3 as texasUnitsLanguage3LANGUAGE_3 } from "../../texas/units/language-3";
import { RML_3 as washingtonUnitsLanguageRmlMiddleRML_3 } from "../../washington/units/language-rml-middle";
import { units as ontarioG3LanguageUnits } from "../../ontario/g3-language";
import { wonder as manitobaUnitsG3MoreLanguageWonder } from "../../manitoba/units/g3-more-language";

// The units South Carolina's Grade 3 English language arts course copies from other frameworks (see ../plan). Import only the
// unit files it adopts from, so the grade's download carries those files and not other frameworks' whole grades.
export const POOL: readonly Unit[] = [
  ...ontarioG3LanguageUnits,
  ...texasUnitsLanguage3LANGUAGE_3,
  manitobaUnitsG3MoreLanguageWonder,
  washingtonUnitsLanguageRmlMiddleRML_3,
];
