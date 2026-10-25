import type { Course } from "../types";
import type { Pool } from "../placement";
import { units as ontarioG6Math } from "../ontario/g6-math";
import { units as albertaG6Math } from "../alberta/g6-math";
import { G6_UNITS as washingtonUnitsMathUpperG6_UNITS } from "../washington/units/math-upper";
import { MATH_6 as californiaUnitsMathG6MATH_6 } from "../california/units/math-g6";
import { units as ontarioG6Language } from "../ontario/g6-language";
import { RML_6 as washingtonUnitsLanguageRmlUpperRML_6 } from "../washington/units/language-rml-upper";
import { SPELLING_6 as washingtonUnitsLanguageSpellingSPELLING_6 } from "../washington/units/language-spelling";
import { LANGUAGE_6 as californiaUnitsLanguageG6LANGUAGE_6 } from "../california/units/language-g6";
import { SCIENCE_6 as washingtonUnitsScience68SCIENCE_6 } from "../washington/units/science-68";
import { course as gradesG8ScienceCourse } from "../grades/g8/science";
import { SCIENCE_COPIES as oregonScienceCopies } from "../oregon/units/science-copies";
import { OWN_SCIENCE as californiaUnitsScienceG8OWN_SCIENCE } from "../california/units/science-g8";
import { G6 as washingtonUnitsSocial59G6G6 } from "../washington/units/social-59-g6";
import { course as gradesG7SocialCourse } from "../grades/g7/social";
import { units as manitobaUnitsG8MoreSocialA } from "../manitoba/units/g8-more-social-a";
import { SOCIAL_6 as californiaUnitsSocialG6SOCIAL_6 } from "../california/units/social-g6";
import { UNITS as alabamaUnitsSocialG7UNITS } from "../alabama/units/social-g7";
import { SOCIAL_7 as californiaUnitsSocialG7SOCIAL_7 } from "../california/units/social-g7";
import { OWN_SOCIAL_7 as oregonUnitsSocialG67OWN_SOCIAL_7 } from "../oregon/units/social-g67";
import { SOCIAL_6 as georgiaUnitsSocialG67SOCIAL_6 } from "../georgia/units/social-g67";
import { OWN_SOCIAL_6 as oregonUnitsSocialG67OWN_SOCIAL_6 } from "../oregon/units/social-g67";
import { massachusettsGrade } from "./kit";
import { OWN } from "./units/own-g6";

// Massachusetts Grade 6. POOL holds the files of the units this grade copies from other frameworks (see ./plan), so
// the download carries those files and not the other frameworks' whole grades.
const POOL: Pool = {
  math: [...ontarioG6Math, ...albertaG6Math, ...washingtonUnitsMathUpperG6_UNITS, ...californiaUnitsMathG6MATH_6],
  language: [...ontarioG6Language, ...washingtonUnitsLanguageRmlUpperRML_6, washingtonUnitsLanguageSpellingSPELLING_6, ...californiaUnitsLanguageG6LANGUAGE_6],
  science: [...washingtonUnitsScience68SCIENCE_6, ...gradesG8ScienceCourse.units, ...(oregonScienceCopies["8"] ?? []), ...californiaUnitsScienceG8OWN_SCIENCE],
  social: [...washingtonUnitsSocial59G6G6, ...gradesG7SocialCourse.units, ...manitobaUnitsG8MoreSocialA, ...californiaUnitsSocialG6SOCIAL_6, ...alabamaUnitsSocialG7UNITS, ...californiaUnitsSocialG7SOCIAL_7, ...oregonUnitsSocialG67OWN_SOCIAL_7, ...georgiaUnitsSocialG67SOCIAL_6, ...oregonUnitsSocialG67OWN_SOCIAL_6],
};

export const courses: Course[] = massachusettsGrade("6", POOL, OWN);
