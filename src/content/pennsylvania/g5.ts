import type { Course } from "../types";
import { POOL as math } from "./pools/math-g5";
import { POOL as language } from "./pools/language-g5";
import { POOL as science } from "./pools/science-g5";
import { POOL as social } from "./pools/social-g5";
import { pennsylvaniaGrade } from "./kit";
import { OWN } from "./units/own-g5";

// Pennsylvania Grade 5. Each subject's pool (./pools) holds the files of the units it copies from other frameworks (see ./plan),
// so the download carries those files and not the other frameworks' whole grades.
export const courses: Course[] = pennsylvaniaGrade("5", { math, language, science, social }, OWN);
