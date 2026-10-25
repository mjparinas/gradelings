import type { Course } from "../types";
import { POOL as math } from "./pools/math-k";
import { POOL as language } from "./pools/language-k";
import { POOL as science } from "./pools/science-k";
import { POOL as social } from "./pools/social-k";
import { southCarolinaGrade } from "./kit";
import { OWN } from "./units/own-k";

// South Carolina Kindergarten. Each subject's pool (./pools) holds the files of the units it copies from other frameworks (see ./plan),
// so the download carries those files and not the other frameworks' whole grades.
export const courses: Course[] = southCarolinaGrade("k", { math, language, science, social }, OWN);
