import type { Unit } from "../../types";
import { wordRoots as manitobaG7LanguageWordRoots } from "../../manitoba/units/g7-language";
import { units as ontarioG7Language } from "../../ontario/g7-language";
import { RML_7 as washingtonLanguageRmlUpperRML_7 } from "../../washington/units/language-rml-upper";
import { SPELLING_7 as washingtonLanguageSpellingSPELLING_7 } from "../../washington/units/language-spelling";

// Texas Grade 7 language. POOL is the units this course may copy from other frameworks (see ../plan/language.ts), as the
// exact unit files, so the grade's download carries only those files. OWN is the units written for Texas.
export const POOL: readonly Unit[] = [...ontarioG7Language, manitobaG7LanguageWordRoots, ...washingtonLanguageRmlUpperRML_7, washingtonLanguageSpellingSPELLING_7];

export const OWN: readonly Unit[] = [];
