import type { Course } from "../types";
import { courses as alberta } from "../alberta/g4";
import { courses as manitoba } from "../manitoba/g4";
import { courses as newBrunswick } from "../new-brunswick/g4";
import { courses as novaScotia } from "../nova-scotia/g4";
import { courses as ontario } from "../ontario/g4";
import { courses as oregon } from "../oregon/g4";
import { courses as saskatchewan } from "../saskatchewan/g4";
import { courses as washington } from "../washington/g4";
import { californiaGrade } from "./kit";

// California Grade 4.
export const courses: Course[] = californiaGrade("4", [
  washington,
  oregon,
  ontario,
  alberta,
  manitoba,
  saskatchewan,
  novaScotia,
  newBrunswick,
]);
