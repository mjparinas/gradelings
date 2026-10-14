import type { Unit } from "../../types";
import { wordRoots as manitobaG7LanguageWordRoots } from "../../manitoba/units/g7-language";
import { units as ontarioG7Language } from "../../ontario/g7-language";
import { RML_7 as washingtonLanguageRmlUpperRML_7 } from "../../washington/units/language-rml-upper";
import { SPELLING_7 as washingtonLanguageSpellingSPELLING_7 } from "../../washington/units/language-spelling";
import { discussionSkills as manitobaG7MoreLanguageDiscussionSkills, presentingDesign as manitobaG7MoreLanguagePresentingDesign, readingStrategies as manitobaG7MoreLanguageReadingStrategies, wordChoiceVoice as manitobaG7MoreLanguageWordChoiceVoice, writingForms as manitobaG7MoreLanguageWritingForms } from "../../manitoba/units/g7-more-language";

// The units New York's Grade 7 language course copies from other frameworks (see ../plan/language.ts). Import only the unit
// files it adopts from, so the grade's download carries those files and not other frameworks' whole grades.
export const POOL: readonly Unit[] = [...ontarioG7Language, manitobaG7LanguageWordRoots, ...washingtonLanguageRmlUpperRML_7, washingtonLanguageSpellingSPELLING_7, manitobaG7MoreLanguageReadingStrategies, manitobaG7MoreLanguageWritingForms, manitobaG7MoreLanguageWordChoiceVoice, manitobaG7MoreLanguagePresentingDesign, manitobaG7MoreLanguageDiscussionSkills];
