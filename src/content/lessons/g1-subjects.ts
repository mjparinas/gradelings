import type { GradeLessons } from "./index";
import { lessons as language } from "./g1-language";
import { lessons as science } from "./g1-science";
import { lessons as social } from "./g1-social";
import { lessons as immersion } from "./g1-immersion";
import { lessons as coreFrench } from "./g1-core-french";

/** Every subject but math, keyed "subject/unit-id". */
export const lessons: GradeLessons = { ...language, ...science, ...social, ...immersion, ...coreFrench };
