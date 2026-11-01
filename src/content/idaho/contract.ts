import { codeCite, preKCite, research, type FrameworkContract } from "../contract";
import { OTHER_STATE } from "./units/kit";
import { PLAN } from "./plan";

// Idaho's official standards (the Idaho Content Standards), built from the Idaho Department of Education's
// files by gradelings-research/idaho/build_outcomes.py.
const OUTCOMES = research<Record<string, { idx: string }[]>>("idaho/outcomes.json");

export const contract: FrameworkContract = {
  // Pre-K cites the early-learning document (docs/research/idaho/prek).
  preK: preKCite("idaho", "Idaho"),
  cite: codeCite(OUTCOMES, "Idaho"),
  ownPrefix: "id-",
  adoptsFrom: ["us-ca", "ca-mb", "ca-nb", "us-ny", "us-or", "us-wa"],
  plan: PLAN,
  // George Washington, Martha Washington and Washington, D.C. are fine. Idaho's own units (id-) may name other places
  // where Idaho's story calls for it (its neighbor states and territories), and the United States history and civics
  // grades (5, 8 and 9: the colonies, the Revolution, the Civil War and civics) name states where the history does. The
  // rhetoric unit quotes Dr. King's letter from Birmingham. The 2nd grade citizens unit tells Ruby Bridges's story in
  // New Orleans, which Idaho's standard on people who model good citizenship (2.SS.4.7) calls for.
  otherStates: { pattern: OTHER_STATE, exempt: ["ca-g2-citizens-and-leaders", "ca-g9-rhetoric-and-sources"], historyGrades: ["5", "8", "9"] },
  // Idaho's own units about the five tribes in Idaho are written for Idaho. Treaties alone aren't a sign (adopted
  // civics units ask about the Treaty of Paris).
  tribal: { words: /\b(Tribes?|Tribal)\b|California Indian/ },
};
