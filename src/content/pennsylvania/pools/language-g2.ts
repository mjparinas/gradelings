import type { Unit } from "../../types";
import { units as ontarioG2LanguageUnits } from "../../ontario/g2-language";
import { LANGUAGE_2 as californiaUnitsLanguageG2LANGUAGE2 } from "../../california/units/language-g2";
import { LANGUAGE_2 as texasUnitsLanguage2LANGUAGE2 } from "../../texas/units/language-2";
import { moreLanguage as manitobaUnitsG2MoreLanguageMoreLanguage } from "../../manitoba/units/g2-more-language";
import { RML_2 as washingtonUnitsLanguageRmlEarlyRML2 } from "../../washington/units/language-rml-early";
import { UNITS as newYorkUnitsLanguageG2UNITS } from "../../new-york/units/language-g2";

// The units Pennsylvania's Grade 2 English language arts course copies from other frameworks (see ../plan). Import only the unit files it
// adopts from, so the grade's download carries those files and not other frameworks' whole grades.
export const POOL: readonly Unit[] = [...ontarioG2LanguageUnits, ...californiaUnitsLanguageG2LANGUAGE2, ...texasUnitsLanguage2LANGUAGE2, ...manitobaUnitsG2MoreLanguageMoreLanguage, washingtonUnitsLanguageRmlEarlyRML2, ...newYorkUnitsLanguageG2UNITS];
