import type { Course } from "../types";
import { POOL as math } from "./pools/math-g3";
import { POOL as language } from "./pools/language-g3";
import { POOL as science } from "./pools/science-g3";
import { POOL as social } from "./pools/social-g3";
import { southCarolinaGrade } from "./kit";
import { OWN } from "./units/own-g3";

// South Carolina Grade 3. Each subject's pool (./pools) holds the files of the units it copies from other frameworks (see ./plan),
// so the download carries those files and not the other frameworks' whole grades.
export const courses: Course[] = southCarolinaGrade("3", { math, language, science, social }, OWN);
