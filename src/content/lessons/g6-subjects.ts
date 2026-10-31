import type { GradeLessons } from "./index";
import { lessons as language } from "./g6-language";
import { lessons as science } from "./g6-science";
import { lessons as social } from "./g6-social";
import { lessons as immersion } from "./g6-immersion";
import { lessons as spanish } from "./g6-spanish";
import { lessons as coreFrench } from "./g6-core-french";

/** Every subject but math, keyed "subject/unit-id". */
export const lessons: GradeLessons = { ...language, ...science, ...social, ...immersion, ...coreFrench, ...spanish };
