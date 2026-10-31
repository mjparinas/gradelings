import { codeCite, research, type FrameworkContract } from "../contract";
import { OTHER_STATE } from "./units/kit";
import { PLAN } from "./plan";

// Mississippi's official standards (the Mississippi College- and Career-Readiness Standards), built from the Mississippi
// Department of Education's files by gradelings-research/mississippi/build_outcomes.py.
const OUTCOMES = research<Record<string, { idx: string }[]>>("mississippi/outcomes.json");

export const contract: FrameworkContract = {
  cite: codeCite(OUTCOMES, "Mississippi"),
  ownPrefix: "ms-",
  adoptsFrom: ["ca-mb", "ca-pe", "us-al", "us-az", "us-ca", "us-co", "us-fl", "us-ga", "us-ny", "us-or", "us-tx", "us-wa"],
  plan: PLAN,
  // George Washington, Martha Washington and Washington, D.C. are fine. Mississippi's own units (ms-) may name other
  // places where Mississippi's story calls for it (its neighbor states, the Great Migration north), and the United
  // States and world history grades (4 to 8) name states where the history does. The national symbols unit names
  // national landmarks, the heroes unit tells Sacagawea's story, the leaders unit tells Ruby Bridges's story in New
  // Orleans, the Constitution unit names Philadelphia, the erosion unit names the Grand Canyon, and the rhetoric unit
  // quotes Dr. King's letter from Birmingham.
  otherStates: { pattern: OTHER_STATE, exempt: ["ca-g1-american-symbols", "ga-g1-american-heroes", "ca-g2-citizens-and-leaders", "ca-g5-constitution", "or-g4-rocks-erosion", "ca-g9-rhetoric-and-sources"], historyGrades: ["4", "5", "6", "7", "8"] },
  // Mississippi's own units about the Choctaw, Chickasaw and Natchez nations are written for Mississippi. Treaties
  // alone aren't a sign (adopted history units ask about the Treaty of Paris).
  tribal: { words: /\b(Tribes?|Tribal)\b|California Indian/ },
};
