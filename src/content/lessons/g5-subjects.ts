import type { GradeLessons } from "./index";
import { lessons as language } from "./g5-language";
import { lessons as science } from "./g5-science";
import { lessons as social } from "./g5-social";
import { lessons as immersion } from "./g5-immersion";
import { lessons as coreFrench } from "./g5-core-french";

/** Every subject but math, keyed "subject/unit-id". */
export const lessons: GradeLessons = { ...language, ...science, ...social, ...immersion, ...coreFrench };
