import type { Course } from "../types";
import { courses as alberta } from "../alberta/g9";
import { courses as manitoba } from "../manitoba/g9";
import { courses as newBrunswick } from "../new-brunswick/g9";
import { courses as novaScotia } from "../nova-scotia/g9";
import { courses as ontario } from "../ontario/g9";
import { courses as saskatchewan } from "../saskatchewan/g9";
import { nlGrade } from "./kit";
import { agreements } from "./units/g8-g9-social";

// Newfoundland and Labrador Grade 9.
export const courses: Course[] = nlGrade("9", [ontario, manitoba, alberta, saskatchewan, novaScotia, newBrunswick], { social: { units: [agreements], first: true } });
