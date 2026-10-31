import type { GradeLessons } from "./index";
import { lessons as language } from "./g3-language";
import { lessons as science } from "./g3-science";
import { lessons as social } from "./g3-social";
import { lessons as immersion } from "./g3-immersion";
import { lessons as spanish } from "./g3-spanish";
import { lessons as coreFrench } from "./g3-core-french";

/** Every subject but math, keyed "subject/unit-id". */
export const lessons: GradeLessons = { ...language, ...science, ...social, ...immersion, ...coreFrench, ...spanish };
