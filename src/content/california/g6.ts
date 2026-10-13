import type { Course } from "../types";
import { courses as alberta } from "../alberta/g6";
import { courses as manitoba } from "../manitoba/g6";
import { courses as newBrunswick } from "../new-brunswick/g6";
import { courses as novaScotia } from "../nova-scotia/g6";
import { courses as ontario } from "../ontario/g6";
import { courses as oregon } from "../oregon/g6";
import { courses as saskatchewan } from "../saskatchewan/g6";
import { courses as washington } from "../washington/g6";
import { californiaGrade } from "./kit";

// California Grade 6.
export const courses: Course[] = californiaGrade("6", [
  washington,
  oregon,
  ontario,
  alberta,
  manitoba,
  saskatchewan,
  novaScotia,
  newBrunswick,
]);
