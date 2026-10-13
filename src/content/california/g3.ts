import type { Course } from "../types";
import { courses as alberta } from "../alberta/g3";
import { courses as manitoba } from "../manitoba/g3";
import { courses as newBrunswick } from "../new-brunswick/g3";
import { courses as novaScotia } from "../nova-scotia/g3";
import { courses as ontario } from "../ontario/g3";
import { courses as oregon } from "../oregon/g3";
import { courses as saskatchewan } from "../saskatchewan/g3";
import { courses as washington } from "../washington/g3";
import { californiaGrade } from "./kit";
import { OWN } from "./units/own-g3";

// California Grade 3.
export const courses: Course[] = californiaGrade("3", [
  washington,
  oregon,
  ontario,
  alberta,
  manitoba,
  saskatchewan,
  novaScotia,
  newBrunswick,
], OWN);
