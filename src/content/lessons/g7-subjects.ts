import type { GradeLessons } from "./index";
import { lessons as language } from "./g7-language";
import { lessons as science } from "./g7-science";
import { lessons as social } from "./g7-social";
import { lessons as immersion } from "./g7-immersion";
import { lessons as coreFrench } from "./g7-core-french";

/** Every subject but math, keyed "subject/unit-id". */
export const lessons: GradeLessons = { ...language, ...science, ...social, ...immersion, ...coreFrench };
