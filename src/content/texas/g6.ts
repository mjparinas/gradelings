import type { Course } from "../types";
import * as language from "./courses/language-6";
import * as math from "./courses/math-6";
import * as science from "./courses/science-6";
import * as social from "./courses/social-6";
import { texasGrade } from "./kit";

// Texas Grade 6. Each subject's file in ./courses holds the units it copies (POOL) and its own units (OWN).
export const courses: Course[] = texasGrade("6", { math, language, science, social });
