import type { Course } from "../types";
import * as language from "./courses/language-k";
import * as math from "./courses/math-k";
import * as science from "./courses/science-k";
import * as social from "./courses/social-k";
import { texasGrade } from "./kit";

// Texas Kindergarten. Each subject's file in ./courses holds the units it copies (POOL) and its own units (OWN).
export const courses: Course[] = texasGrade("k", { math, language, science, social });
