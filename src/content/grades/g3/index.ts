import type { Course } from "../../types";
import { withLessons } from "../../lessons";
import { withRich } from "../../rich";
import { RICH } from "../../rich/units";
import { lessons, moreLessons } from "../../lessons/g3";
import { course as math } from "./math";
import { course as language } from "./language";
import { course as science } from "./science";
import { course as social } from "./social";
import { course as immersion } from "./immersion";
import { course as spanish } from "./spanish";

export const courses: Course[] = withRich(withLessons([math, language, science, social, immersion, spanish], lessons), RICH.g3);
export { lessons, moreLessons };
