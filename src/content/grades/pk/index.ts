import type { Course } from "../../types";
import { withLessons } from "../../lessons";
import { withRich } from "../../rich";
import { RICH } from "../../rich/units";
import { lessons } from "../../lessons/pk";
import { course as math } from "./math";
import { course as language } from "./language";
import { course as science } from "./science";
import { course as social } from "./social";

// Pre-K, the year before Kindergarten. These units are shared by every framework that offers Pre-K: each one adds its
// own early-learning standards to them in its own Pre-K file (see ../../prek.ts). No French in Pre-K.
export const courses: Course[] = withRich(withLessons([math, language, science, social], lessons), RICH.pk);
export { lessons };
