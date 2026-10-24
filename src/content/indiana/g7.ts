import type { Course } from "../types";
import type { Pool } from "../placement";
import { UNITS as alabamaUnitsSocialG9UNITS } from "../alabama/units/social-g9";
import { units as albertaG6ScienceUnits } from "../alberta/g6-science";
import { units as albertaG7MathUnits } from "../alberta/g7-math";
import { units as albertaG7ScienceUnits } from "../alberta/g7-science";
import { units as albertaG8SocialUnits } from "../alberta/g8-social";
import { LANGUAGE_7 as californiaUnitsLanguageG7LANGUAGE7 } from "../california/units/language-g7";
import { MATH_7 as californiaUnitsMathG7MATH7 } from "../california/units/math-g7";
import { OWN_SCIENCE as californiaUnitsScienceG6OWNSCIENCE, SCIENCE_COPIES as californiaUnitsScienceG6SCIENCECOPIES } from "../california/units/science-g6";
import { OWN_SCIENCE as californiaUnitsScienceG7OWNSCIENCE, SCIENCE_COPIES as californiaUnitsScienceG7SCIENCECOPIES } from "../california/units/science-g7";
import { OWN_SCIENCE as californiaUnitsScienceG8OWNSCIENCE, SCIENCE_COPIES as californiaUnitsScienceG8SCIENCECOPIES } from "../california/units/science-g8";
import { course as gradesG6ScienceCourse } from "../grades/g6/science";
import { course as gradesG7ScienceCourse } from "../grades/g7/science";
import { course as gradesG8ScienceCourse } from "../grades/g8/science";
import { course as gradesG8SocialCourse } from "../grades/g8/social";
import { wordRoots as manitobaUnitsG7LanguageWordRoots } from "../manitoba/units/g7-language";
import { senses as newBrunswickUnitsG6ScienceSenses } from "../new-brunswick/units/g6-science";
import { motionForces as newBrunswickUnitsG8ScienceMotionForces } from "../new-brunswick/units/g8-science";
import { UNITS as newYorkUnitsSocialG6UNITS } from "../new-york/units/social-g6";
import { units as ontarioG7LanguageUnits } from "../ontario/g7-language";
import { units as ontarioG7MathUnits } from "../ontario/g7-math";
import { units as ontarioG7ScienceUnits } from "../ontario/g7-science";
import { units as ontarioG8ScienceUnits } from "../ontario/g8-science";
import { SCIENCE_COPIES as oregonUnitsScienceCopiesSCIENCECOPIES } from "../oregon/units/science-copies";
import { OWN_SOCIAL_7 as oregonUnitsSocialG67OWNSOCIAL7 } from "../oregon/units/social-g67";
import { RML_7 as washingtonUnitsLanguageRmlUpperRML7 } from "../washington/units/language-rml-upper";
import { SPELLING_7 as washingtonUnitsLanguageSpellingSPELLING7 } from "../washington/units/language-spelling";
import { G7_UNITS as washingtonUnitsMathUpperG7UNITS } from "../washington/units/math-upper";
import { SCIENCE_6 as washingtonUnitsScience68SCIENCE6, SCIENCE_7 as washingtonUnitsScience68SCIENCE7, SCIENCE_8 as washingtonUnitsScience68SCIENCE8 } from "../washington/units/science-68";
import { G6 as washingtonUnitsSocial59G6G6 } from "../washington/units/social-59-g6";
import { indianaGrade } from "./kit";
import { OWN } from "./units/own-g7";

// Indiana Grade 7. POOL holds the files of the units this grade copies from other frameworks (see ./plan), so
// the download carries those files and not the other frameworks' whole grades.
const POOL: Pool = {
  math: [...ontarioG7MathUnits, ...albertaG7MathUnits, ...washingtonUnitsMathUpperG7UNITS, ...californiaUnitsMathG7MATH7],
  language: [...ontarioG7LanguageUnits, manitobaUnitsG7LanguageWordRoots, ...washingtonUnitsLanguageRmlUpperRML7, washingtonUnitsLanguageSpellingSPELLING7, ...californiaUnitsLanguageG7LANGUAGE7],
  science: [newBrunswickUnitsG6ScienceSenses, ...washingtonUnitsScience68SCIENCE6, ...ontarioG8ScienceUnits, ...californiaUnitsScienceG6OWNSCIENCE, ...californiaUnitsScienceG6SCIENCECOPIES, ...ontarioG7ScienceUnits, ...albertaG7ScienceUnits, ...washingtonUnitsScience68SCIENCE7, ...gradesG6ScienceCourse.units, ...albertaG6ScienceUnits, ...californiaUnitsScienceG7OWNSCIENCE, ...californiaUnitsScienceG7SCIENCECOPIES, newBrunswickUnitsG8ScienceMotionForces, ...washingtonUnitsScience68SCIENCE8, ...(oregonUnitsScienceCopiesSCIENCECOPIES["8"] ?? []), ...californiaUnitsScienceG8OWNSCIENCE, ...californiaUnitsScienceG8SCIENCECOPIES, ...gradesG7ScienceCourse.units, ...gradesG8ScienceCourse.units],
  social: [...washingtonUnitsSocial59G6G6, ...gradesG8SocialCourse.units, ...oregonUnitsSocialG67OWNSOCIAL7, ...newYorkUnitsSocialG6UNITS, ...albertaG8SocialUnits, ...alabamaUnitsSocialG9UNITS],
};

export const courses: Course[] = indianaGrade("7", POOL, OWN);
