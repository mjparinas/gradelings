import type { Unit } from "../../types";
import { LANGUAGE_4 as texasUnitsLanguage4LANGUAGE_4 } from "../../texas/units/language-4";
import { RML_4 as washingtonUnitsLanguageRmlMiddleRML_4 } from "../../washington/units/language-rml-middle";
import { SPELLING_4 as washingtonUnitsLanguageSpellingSPELLING_4 } from "../../washington/units/language-spelling";
import { UNITS as newYorkUnitsLanguageG4UNITS } from "../../new-york/units/language-g4";
import { units as ontarioG4LanguageUnits } from "../../ontario/g4-language";

// The units South Carolina's Grade 4 English language arts course copies from other frameworks (see ../plan). Import only the
// unit files it adopts from, so the grade's download carries those files and not other frameworks' whole grades.
export const POOL: readonly Unit[] = [
  ...ontarioG4LanguageUnits,
  ...texasUnitsLanguage4LANGUAGE_4,
  ...newYorkUnitsLanguageG4UNITS,
  washingtonUnitsLanguageRmlMiddleRML_4,
  washingtonUnitsLanguageSpellingSPELLING_4,
];
