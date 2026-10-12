import type { Course } from "../types";
import { courses as alberta } from "../alberta/k";
import { courses as manitoba } from "../manitoba/k";
import { courses as newBrunswick } from "../new-brunswick/k";
import { courses as novaScotia } from "../nova-scotia/k";
import { courses as ontario } from "../ontario/k";
import { courses as saskatchewan } from "../saskatchewan/k";
import { peGrade } from "./kit";
import { peCommunitiesConnectK, peFirstMapsK, peSenseWordsK } from "./units/k1-science-social";

// Prince Edward Island Kindergarten.
export const courses: Course[] = peGrade("k", [ontario, manitoba, alberta, saskatchewan, novaScotia, newBrunswick], { science: { units: [peSenseWordsK], order: ["five-senses-ab", "be-a-scientist", "materials", "pe-sense-words-k"] }, social: { units: [peCommunitiesConnectK, peFirstMapsK], order: ["i-am-me", "all-about-me", "needs-and-wants", "mb-k-working-together", "we-belong", "helpers-and-rules", "families", "mb-k-canada-and-celebrations", "places-near-me", "pe-communities-connect-k", "pe-first-maps-k"] } });
