import { codeCite, preKCite, research, type FrameworkContract } from "../contract";
import { OTHER_STATE } from "./units/kit";
import { PLAN } from "./plan";

// Iowa's official standards (the Iowa Academic Standards), built from the Iowa Department of Education's
// files by docs/research/iowa/build_outcomes.py.
const OUTCOMES = research<Record<string, { idx: string }[]>>("iowa/outcomes.json");

export const contract: FrameworkContract = {
  // Pre-K cites the early-learning document (docs/research/iowa/prek).
  preK: preKCite("iowa", "Iowa"),
  cite: codeCite(OUTCOMES, "Iowa"),
  ownPrefix: "ia-",
  adoptsFrom: ["us-az", "us-ca", "ca-nb", "ca-ns", "ca-mb", "us-or", "us-ny", "us-wa"],
  plan: PLAN,
  // George Washington, Martha Washington and Washington, D.C. are fine. Iowa's own units (ia-) may name other places
  // where Iowa's story calls for it (its neighbor states, where settlers came from), and the United States history and
  // civics grades (3, 4, 5, 8 and 9: the colonies, the Revolution, the Civil War and civics) name states where the
  // history does. The rhetoric unit quotes Dr. King's letter from Birmingham. The 2nd grade leaders unit tells Ruby
  // Bridges's story in New Orleans, which Iowa's standards on the contributions of people past and present (SS.2.12)
  // call for.
  otherStates: { pattern: OTHER_STATE, exempt: ["ca-g2-citizens-and-leaders", "ca-g9-rhetoric-and-sources"], historyGrades: ["3", "4", "5", "8", "9"] },
  // Iowa's own units about the Meskwaki Nation and the other Native nations of Iowa are written for Iowa. Treaties
  // alone aren't a sign (adopted civics units ask about the Treaty of Paris).
  tribal: { words: /\b(Tribes?|Tribal)\b|California Indian/ },
};
