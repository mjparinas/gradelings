import type { Course } from "../types";
import * as language from "./courses/language-9";
import * as math from "./courses/math-9";
import * as science from "./courses/science-9";
import * as social from "./courses/social-9";
import { texasGrade } from "./kit";

// Texas Grade 9. Each subject's file in ./courses holds the units it copies (POOL) and its own units (OWN).
export const courses: Course[] = texasGrade("9", { math, language, science, social });
