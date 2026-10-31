import type { GradeLessons } from "./index";
import { lessons as language } from "./g8-language";
import { lessons as science } from "./g8-science";
import { lessons as social } from "./g8-social";
import { lessons as immersion } from "./g8-immersion";
import { lessons as spanish } from "./g8-spanish";
import { lessons as coreFrench } from "./g8-core-french";

/** Every subject but math, keyed "subject/unit-id". */
export const lessons: GradeLessons = { ...language, ...science, ...social, ...immersion, ...coreFrench, ...spanish };
