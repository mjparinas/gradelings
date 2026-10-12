import type { Course } from "../types";
import { courses as alberta } from "../alberta/g4";
import { courses as manitoba } from "../manitoba/g4";
import { courses as newBrunswick } from "../new-brunswick/g4";
import { courses as novaScotia } from "../nova-scotia/g4";
import { courses as ontario } from "../ontario/g4";
import { courses as saskatchewan } from "../saskatchewan/g4";
import { nlGrade } from "./kit";
import { peoples } from "./units/g3-g4-social";
import { erosion, rocksMinerals } from "./units/g4-science";
import { explorers, tools, whatIsExploration } from "./units/g4-social";

// Newfoundland and Labrador Grade 4.
export const courses: Course[] = nlGrade("4", [ontario, manitoba, alberta, saskatchewan, novaScotia, newBrunswick], {
  science: { units: [rocksMinerals, erosion] },
  social: { units: [peoples, whatIsExploration, explorers, tools], first: true },
});
