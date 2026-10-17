import type { Unit } from "../../types";
import { units as ontarioG3LanguageUnits } from "../../ontario/g3-language";
import { wonder as manitobaUnitsG3MoreLanguageWonder } from "../../manitoba/units/g3-more-language";
import { RML_3 as washingtonUnitsLanguageRmlMiddleRML3 } from "../../washington/units/language-rml-middle";
import { LANGUAGE_3 as texasUnitsLanguage3LANGUAGE3 } from "../../texas/units/language-3";
import { LANGUAGE_3 as californiaUnitsLanguageG3LANGUAGE3 } from "../../california/units/language-g3";

// The units Florida's Grade 3 English language arts course copies from other frameworks (see ../plan). Import only the unit files it
// adopts from, so the grade's download carries those files and not other frameworks' whole grades.
export const POOL: readonly Unit[] = [...ontarioG3LanguageUnits, manitobaUnitsG3MoreLanguageWonder, washingtonUnitsLanguageRmlMiddleRML3, ...texasUnitsLanguage3LANGUAGE3, ...californiaUnitsLanguageG3LANGUAGE3];
