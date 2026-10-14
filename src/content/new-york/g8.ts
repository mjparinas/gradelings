import type { Course } from "../types";
import { POOL as math } from "./pools/math-g8";
import { POOL as language } from "./pools/language-g8";
import { POOL as science } from "./pools/science-g8";
import { POOL as social } from "./pools/social-g8";
import { newYorkGrade } from "./kit";
import { OWN } from "./units/own-g8";

// New York Grade 8. Each subject's pool (./pools) holds the files of the units it copies from other frameworks (see
// ./plan), so the download carries those files and not the other frameworks' whole grades.
export const courses: Course[] = newYorkGrade("8", { math, language, science, social }, OWN);
