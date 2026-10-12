import type { Course } from "../types";
import { courses as alberta } from "../alberta/g7";
import { courses as manitoba } from "../manitoba/g7";
import { courses as newBrunswick } from "../new-brunswick/g7";
import { courses as novaScotia } from "../nova-scotia/g7";
import { courses as ontario } from "../ontario/g7";
import { courses as saskatchewan } from "../saskatchewan/g7";
import { peGrade } from "./kit";
import { peEmpowerCultural7, peEmpowerEconomic7, peEmpowerNational7, peEmpowerPolitical7, peEmpowerSocietal7, peRocksMinerals7, peWeatheringErosion7 } from "./units/g7-science-social";

// Prince Edward Island Grade 7.
export const courses: Course[] = peGrade("7", [ontario, manitoba, alberta, saskatchewan, novaScotia, newBrunswick], { science: { units: [peRocksMinerals7, peWeatheringErosion7], order: ["ecosystems-7", "food-chains-7", "cycles-succession-7", "human-impact-7", "restless-earth", "pe-rocks-minerals-7", "pe-weathering-erosion-7", "heat-particles-7", "heat-transfer-7", "particles-mixtures-7", "solutions-separation-7"] }, social: { units: [peEmpowerEconomic7, peEmpowerPolitical7, peEmpowerCultural7, peEmpowerSocietal7, peEmpowerNational7], order: ["pe-empower-economic-7", "mb-7-research-skills", "pe-empower-political-7", "pe-empower-cultural-7", "pe-empower-societal-7", "pe-empower-national-7"] } });
