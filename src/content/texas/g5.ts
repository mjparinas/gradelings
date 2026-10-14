import type { Course } from "../types";
import * as language from "./courses/language-5";
import * as math from "./courses/math-5";
import * as science from "./courses/science-5";
import * as social from "./courses/social-5";
import { texasGrade } from "./kit";

// Texas Grade 5. Each subject's file in ./courses holds the units it copies (POOL) and its own units (OWN).
export const courses: Course[] = texasGrade("5", { math, language, science, social });
