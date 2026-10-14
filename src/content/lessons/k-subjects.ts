import type { GradeLessons } from "./index";
import { lessons as language } from "./k-language";
import { lessons as science } from "./k-science";
import { lessons as social } from "./k-social";
import { lessons as immersion } from "./k-immersion";

/** Every subject but math, keyed "subject/unit-id". */
export const lessons: GradeLessons = { ...language, ...science, ...social, ...immersion };
