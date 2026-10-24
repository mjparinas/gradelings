import type { Course } from "../types";
import type { Pool } from "../placement";
import { UNITS as alabamaUnitsSocialG9UNITS } from "../alabama/units/social-g9";
import { units as albertaG6MathUnits } from "../alberta/g6-math";
import { units as albertaG6ScienceUnits } from "../alberta/g6-science";
import { units as albertaG7ScienceUnits } from "../alberta/g7-science";
import { LANGUAGE_6 as californiaUnitsLanguageG6LANGUAGE6 } from "../california/units/language-g6";
import { MATH_6 as californiaUnitsMathG6MATH6 } from "../california/units/math-g6";
import { OWN_SCIENCE as californiaUnitsScienceG6OWNSCIENCE, SCIENCE_COPIES as californiaUnitsScienceG6SCIENCECOPIES } from "../california/units/science-g6";
import { OWN_SCIENCE as californiaUnitsScienceG7OWNSCIENCE, SCIENCE_COPIES as californiaUnitsScienceG7SCIENCECOPIES } from "../california/units/science-g7";
import { OWN_SCIENCE as californiaUnitsScienceG8OWNSCIENCE, SCIENCE_COPIES as californiaUnitsScienceG8SCIENCECOPIES } from "../california/units/science-g8";
import { SOCIAL_6 as californiaUnitsSocialG6SOCIAL6 } from "../california/units/social-g6";
import { SOCIAL_7 as californiaUnitsSocialG7SOCIAL7 } from "../california/units/social-g7";
import { SOCIAL_9 as californiaUnitsSocialG9SOCIAL9 } from "../california/units/social-g9";
import { course as gradesG6ScienceCourse } from "../grades/g6/science";
import { course as gradesG7ScienceCourse } from "../grades/g7/science";
import { course as gradesG8ScienceCourse } from "../grades/g8/science";
import { course as gradesG8SocialCourse } from "../grades/g8/social";
import { senses as newBrunswickUnitsG6ScienceSenses } from "../new-brunswick/units/g6-science";
import { motionForces as newBrunswickUnitsG8ScienceMotionForces } from "../new-brunswick/units/g8-science";
import { UNITS as newYorkUnitsSocialG5UNITS } from "../new-york/units/social-g5";
import { UNITS as newYorkUnitsSocialG9UNITS } from "../new-york/units/social-g9";
import { units as ontarioG6LanguageUnits } from "../ontario/g6-language";
import { units as ontarioG6MathUnits } from "../ontario/g6-math";
import { units as ontarioG7ScienceUnits } from "../ontario/g7-science";
import { units as ontarioG8ScienceUnits } from "../ontario/g8-science";
import { SCIENCE_COPIES as oregonUnitsScienceCopiesSCIENCECOPIES } from "../oregon/units/science-copies";
import { SOCIAL_6 as texasUnitsSocialG6SOCIAL6 } from "../texas/units/social-g6";
import { RML_6 as washingtonUnitsLanguageRmlUpperRML6 } from "../washington/units/language-rml-upper";
import { SPELLING_6 as washingtonUnitsLanguageSpellingSPELLING6 } from "../washington/units/language-spelling";
import { G6_UNITS as washingtonUnitsMathUpperG6UNITS } from "../washington/units/math-upper";
import { SCIENCE_6 as washingtonUnitsScience68SCIENCE6, SCIENCE_7 as washingtonUnitsScience68SCIENCE7, SCIENCE_8 as washingtonUnitsScience68SCIENCE8 } from "../washington/units/science-68";
import { G6 as washingtonUnitsSocial59G6G6 } from "../washington/units/social-59-g6";
import { G8 as washingtonUnitsSocial59G8G8 } from "../washington/units/social-59-g8";
import { indianaGrade } from "./kit";
import { OWN } from "./units/own-g6";

// Indiana Grade 6. POOL holds the files of the units this grade copies from other frameworks (see ./plan), so
// the download carries those files and not the other frameworks' whole grades.
const POOL: Pool = {
  math: [...ontarioG6MathUnits, ...albertaG6MathUnits, ...washingtonUnitsMathUpperG6UNITS, ...californiaUnitsMathG6MATH6],
  language: [...ontarioG6LanguageUnits, ...washingtonUnitsLanguageRmlUpperRML6, washingtonUnitsLanguageSpellingSPELLING6, ...californiaUnitsLanguageG6LANGUAGE6],
  science: [newBrunswickUnitsG6ScienceSenses, ...washingtonUnitsScience68SCIENCE6, ...ontarioG8ScienceUnits, ...californiaUnitsScienceG6OWNSCIENCE, ...californiaUnitsScienceG6SCIENCECOPIES, ...ontarioG7ScienceUnits, ...albertaG7ScienceUnits, ...washingtonUnitsScience68SCIENCE7, ...gradesG6ScienceCourse.units, ...albertaG6ScienceUnits, ...californiaUnitsScienceG7OWNSCIENCE, ...californiaUnitsScienceG7SCIENCECOPIES, newBrunswickUnitsG8ScienceMotionForces, ...washingtonUnitsScience68SCIENCE8, ...(oregonUnitsScienceCopiesSCIENCECOPIES["8"] ?? []), ...californiaUnitsScienceG8OWNSCIENCE, ...californiaUnitsScienceG8SCIENCECOPIES, ...gradesG7ScienceCourse.units, ...gradesG8ScienceCourse.units],
  social: [...washingtonUnitsSocial59G6G6, ...californiaUnitsSocialG6SOCIAL6, ...californiaUnitsSocialG7SOCIAL7, ...gradesG8SocialCourse.units, ...newYorkUnitsSocialG9UNITS, ...alabamaUnitsSocialG9UNITS, ...newYorkUnitsSocialG5UNITS, ...texasUnitsSocialG6SOCIAL6, ...californiaUnitsSocialG9SOCIAL9, ...washingtonUnitsSocial59G8G8],
};

export const courses: Course[] = indianaGrade("6", POOL, OWN);
