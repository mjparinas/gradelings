import { codeCite, research, type FrameworkContract } from "../contract";
import { OTHER_STATE } from "./units/kit";
import { PLAN } from "./plan";

// North Dakota's official standards (mathematics and English language arts 2023, science 2019, social studies 2019), built
// from the Department of Public Instruction's CASE server packages by docs/research/north-dakota/build_outcomes.py.
const OUTCOMES = research<Record<string, { idx: string }[]>>("north-dakota/outcomes.json");

export const contract: FrameworkContract = {
  cite: codeCite(OUTCOMES, "North Dakota"),
  ownPrefix: "nd-",
  adoptsFrom: ["us-al", "us-az", "us-ca", "us-fl", "us-ga", "us-ny", "us-or", "us-pa", "us-wa", "ca-mb", "ca-nb", "ca-ns", "ca-pe"],
  plan: PLAN,
  // George Washington, Martha Washington and Washington, D.C. are fine. North Dakota's own units (nd-) may name its
  // neighbors where its story calls for it, and the United States history and civics grades (5, 8 and 9) name states
  // where the history does. The 3rd grade map and regions units name states by design; the 7th grade world geography
  // units compare places with the United States (Seattle's latitude, Cuba's distance from Florida, Lake Victoria and
  // Lake Michigan). The 2nd grade leaders unit tells Ruby Bridges's story in New Orleans, and the rhetoric unit quotes
  // Dr. King's letter from Birmingham.
  otherStates: {
    pattern: OTHER_STATE,
    exempt: ["ca-g2-citizens-and-leaders", "fl-g3-us-regions", "ga-g3-us-map", "or-g6-world-maps", "ga-g6-latin-america", "ga-g7-africa", "ca-g9-rhetoric-and-sources"],
    historyGrades: ["5", "8", "9"],
  },
  // North Dakota's own units about its tribal nations are written for North Dakota. Treaties alone aren't a sign
  // (adopted civics units ask about the Treaty of Paris).
  tribal: { words: /\b(Tribes?|Tribal)\b|California Indian/ },
};
