import { codeCite, preKCite, research, type FrameworkContract } from "../contract";
import { OTHER_STATE } from "./units/kit";
import { PLAN } from "./plan";

// South Dakota's official standards (mathematics 2018, English language arts 2025, science 2024 and social studies
// 2023), built from the Department of Education's documents by gradelings-research/south-dakota/build_outcomes.py.
const OUTCOMES = research<Record<string, { idx: string }[]>>("south-dakota/outcomes.json");

export const contract: FrameworkContract = {
  // Pre-K cites the early-learning document (docs/research/south-dakota/prek).
  preK: preKCite("south-dakota", "South Dakota"),
  cite: codeCite(OUTCOMES, "South Dakota"),
  ownPrefix: "sd-",
  adoptsFrom: ["us-al", "us-az", "us-ca", "us-fl", "us-ga", "us-ny", "us-or", "us-pa", "us-wa", "ca-mb", "ca-nb", "ca-ns", "ca-pe"],
  plan: PLAN,
  // George Washington, Martha Washington and Washington, D.C. are fine. South Dakota's own units (sd-) may name other
  // places where South Dakota's story calls for it (its neighbor states, the Little Bighorn), and social studies from
  // 1st to 5th grade and in 7th, 8th and 9th is American history and geography, which names states where the history
  // does. Kindergarten and 6th grade (world history) are checked: the kindergarten stories tell Daniel Boone's, which
  // South Dakota's kindergarten standard (K.SS.3) lists, and the ancient Egypt unit names the city of Memphis. The
  // rhetoric unit quotes Dr. King's letter from Birmingham.
  otherStates: {
    pattern: OTHER_STATE,
    exempt: ["ca-k-american-stories", "ca-g6-hebrews-kush", "ca-g9-rhetoric-and-sources"],
    historyGrades: ["1", "2", "3", "4", "5", "7", "8", "9"],
  },
  // South Dakota's own units about the Oceti Sakowin Oyate and the Tribal Nations of South Dakota are written for South
  // Dakota. Treaties alone aren't a sign (adopted civics units ask about the Treaty of Paris).
  tribal: { words: /\b(Tribes?|Tribal)\b|California Indian/ },
};
