import type { Course } from "../types";
import { courses as alberta } from "../alberta/g7";
import { courses as manitoba } from "../manitoba/g7";
import { courses as newBrunswick } from "../new-brunswick/g7";
import { courses as novaScotia } from "../nova-scotia/g7";
import { courses as ontario } from "../ontario/g7";
import { courses as oregon } from "../oregon/g7";
import { courses as saskatchewan } from "../saskatchewan/g7";
import { courses as washington } from "../washington/g7";
import { californiaGrade } from "./kit";

// California Grade 7.
export const courses: Course[] = californiaGrade("7", [
  washington,
  oregon,
  ontario,
  alberta,
  manitoba,
  saskatchewan,
  novaScotia,
  newBrunswick,
]);
