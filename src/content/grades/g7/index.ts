import type { Course } from "../../types";
import { withLessons } from "../../lessons";
import { withRich } from "../../rich";
import { RICH } from "../../rich/units";
import { lessons, moreLessons } from "../../lessons/g7";
import { course as math } from "./math";
import { course as language } from "./language";
import { course as science } from "./science";
import { course as social } from "./social";
import { course as immersion } from "./immersion";
import { course as coreFrench } from "./core-french";
import { course as spanish } from "./spanish";

export const courses: Course[] = withRich(withLessons([math, language, science, social, immersion, coreFrench, spanish], lessons), RICH.g7);
export { lessons, moreLessons };
