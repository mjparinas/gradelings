import type { Course } from "../types";
import { courses as alberta } from "../alberta/g6";
import { courses as manitoba } from "../manitoba/g6";
import { courses as newBrunswick } from "../new-brunswick/g6";
import { courses as novaScotia } from "../nova-scotia/g6";
import { courses as ontario } from "../ontario/g6";
import { courses as saskatchewan } from "../saskatchewan/g6";
import { peGrade } from "./kit";
import { peIslandCulture6, peIslandEconomy6, peIslandGovernment6, peIslandLifestyles6, peIslandPeople6, peIslandTime6, peIslandTransport6 } from "./units/g6-pei-history";
import { peAdaptationsEndangered6, peConstellations6, peCultureIntro6, peElectromagnets6, peGovernmentCulture6, peHumanRights6, peMicrobesArthropods6, peTraditions6 } from "./units/g6-world-science";

// Prince Edward Island Grade 6.
export const courses: Course[] = peGrade("6", [ontario, manitoba, alberta, saskatchewan, novaScotia, newBrunswick], { science: { units: [peMicrobesArthropods6, peAdaptationsEndangered6, peElectromagnets6, peConstellations6], order: ["classifying-life-6", "biodiversity-6", "mb-heredity-and-fossils", "pe-microbes-arthropods-6", "pe-adaptations-endangered-6", "static-electricity-6", "circuits-6", "mb-electrical-safety", "pe-electromagnets-6", "flight-6", "earth-moon-sun-6", "solar-system", "galaxies-and-space", "weight-and-space-tech-6", "pe-constellations-6"] }, social: { units: [peIslandTime6, peIslandPeople6, peIslandTransport6, peIslandGovernment6, peIslandEconomy6, peIslandLifestyles6, peIslandCulture6, peCultureIntro6, peTraditions6, peGovernmentCulture6, peHumanRights6], order: ["pe-island-time-6", "pe-culture-intro-6", "pe-island-people-6", "pe-traditions-6", "pe-government-culture-6", "global-challenges", "pe-island-transport-6", "cities-and-migration", "canadian-identities-6", "pe-island-government-6", "pe-island-economy-6", "pe-island-lifestyles-6", "pe-island-culture-6", "trade-and-globalization", "global-help-6", "pe-human-rights-6"] } });
