import type { Course } from "../types";
import { courses as alberta } from "../alberta/k";
import { courses as manitoba } from "../manitoba/k";
import { courses as newBrunswick } from "../new-brunswick/k";
import { courses as novaScotia } from "../nova-scotia/k";
import { courses as ontario } from "../ontario/k";
import { courses as oregon } from "../oregon/k";
import { courses as saskatchewan } from "../saskatchewan/k";
import { courses as washington } from "../washington/k";
import { californiaGrade } from "./kit";

// California Kindergarten.
export const courses: Course[] = californiaGrade("k", [
  washington,
  oregon,
  ontario,
  alberta,
  manitoba,
  saskatchewan,
  novaScotia,
  newBrunswick,
]);
