import type { Course } from "../types";
import { POOL as math } from "./pools/math-g4";
import { POOL as language } from "./pools/language-g4";
import { POOL as science } from "./pools/science-g4";
import { POOL as social } from "./pools/social-g4";
import { alabamaGrade } from "./kit";
import { OWN } from "./units/own-g4";

// Alabama Grade 4. Each subject's pool (./pools) holds the files of the units it copies from other frameworks (see ./plan),
// so the download carries those files and not the other frameworks' whole grades.
export const courses: Course[] = alabamaGrade("4", { math, language, science, social }, OWN);
