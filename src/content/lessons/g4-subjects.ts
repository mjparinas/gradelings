import type { GradeLessons } from "./index";
import { lessons as language } from "./g4-language";
import { lessons as science } from "./g4-science";
import { lessons as social } from "./g4-social";
import { lessons as immersion } from "./g4-immersion";
import { lessons as coreFrench } from "./g4-core-french";

/** Every subject but math, keyed "subject/unit-id". */
export const lessons: GradeLessons = { ...language, ...science, ...social, ...immersion, ...coreFrench };
