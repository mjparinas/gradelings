import type { Course } from "../types";
import { courses as alberta } from "../alberta/g4";
import { courses as manitoba } from "../manitoba/g4";
import { courses as newBrunswick } from "../new-brunswick/g4";
import { courses as novaScotia } from "../nova-scotia/g4";
import { courses as ontario } from "../ontario/g4";
import { courses as saskatchewan } from "../saskatchewan/g4";
import { peGrade } from "./kit";
import { peAdaptations4, peCanadaLandforms4, peCanadaMap4, peCanadaNature4, peCanadaPeople4, peCanadaSymbols4, peErosion4, peExplorers4, peLocalHabitat4, peMinerals4, pePeopleAndLand4, peWhatIsExploration4, peWhyExplore4, peWorldFeatures4 } from "./units/g4-science-social";

// Prince Edward Island Grade 4.
export const courses: Course[] = peGrade("4", [ontario, manitoba, alberta, saskatchewan, novaScotia, newBrunswick], { science: { units: [peErosion4, peMinerals4, peLocalHabitat4, peAdaptations4], order: ["food-webs-4", "habitats-4", "mb-adaptations", "pe-local-habitat-4", "pe-adaptations-4", "light-4", "sound-4", "pe-erosion-4", "pe-minerals-4", "mb-science-skills"] }, social: { units: [peWhatIsExploration4, peExplorers4, peWhyExplore4, peWorldFeatures4, pePeopleAndLand4, peCanadaLandforms4, peCanadaNature4, peCanadaPeople4, peCanadaMap4, peCanadaSymbols4], order: ["pe-what-is-exploration-4", "pe-explorers-4", "pe-why-explore-4", "pe-world-features-4", "pe-people-and-land-4", "pe-canada-landforms-4", "pe-canada-nature-4", "pe-canada-people-4", "pe-canada-map-4", "pe-canada-symbols-4"] } });
