import type { GradeLessons } from "./index";
import { lessons as language } from "./g9-language";
import { lessons as science } from "./g9-science";
import { lessons as social } from "./g9-social";
import { lessons as immersion } from "./g9-immersion";
import { lessons as coreFrench } from "./g9-core-french";

/** Every subject but math, keyed "subject/unit-id". */
export const lessons: GradeLessons = { ...language, ...science, ...social, ...immersion, ...coreFrench };
