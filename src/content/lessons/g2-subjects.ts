import type { GradeLessons } from "./index";
import { lessons as language } from "./g2-language";
import { lessons as science } from "./g2-science";
import { lessons as social } from "./g2-social";
import { lessons as immersion } from "./g2-immersion";
import { lessons as coreFrench } from "./g2-core-french";

/** Every subject but math, keyed "subject/unit-id". */
export const lessons: GradeLessons = { ...language, ...science, ...social, ...immersion, ...coreFrench };
