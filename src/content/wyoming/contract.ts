import { codeCite, research, type FrameworkContract } from "../contract";
import { OTHER_STATE } from "./units/kit";
import { PLAN } from "./plan";

// Wyoming's official standards (the Wyoming Content and Performance Standards), built from the Wyoming Department of
// Education's grade-level documents by docs/research/wyoming/build_outcomes.py.
const OUTCOMES = research<Record<string, { idx: string }[]>>("wyoming/outcomes.json");

export const contract: FrameworkContract = {
  cite: codeCite(OUTCOMES, "Wyoming"),
  ownPrefix: "wy-",
  adoptsFrom: ["us-az", "us-ca", "ca-nb", "ca-ns", "ca-mb", "ca-on", "ca-pe", "us-or", "us-ny", "us-wa"],
  plan: PLAN,
  // George Washington, Martha Washington and Washington, D.C. are fine. Wyoming's own units (wy-) may name other
  // places where Wyoming's story calls for it (its neighbor states, the trails west), and the United States
  // history and civics grades (5, 8 and 9) name states where the history does. The national symbols unit names national
  // landmarks, and the rhetoric unit quotes Dr. King's letter from Birmingham. The 2nd grade leaders unit tells Ruby
  // Bridges's story in New Orleans, which Wyoming's standard on people who changed life in the nation calls for.
  otherStates: { pattern: OTHER_STATE, exempt: ["ny-g1-american-symbols", "ca-g2-citizens-and-leaders", "ca-g9-rhetoric-and-sources"], historyGrades: ["5", "8", "9"] },
  // Wyoming's own units about the Eastern Shoshone and Northern Arapaho are written for Wyoming. Treaties alone
  // aren't a sign (adopted civics units ask about the Treaty of Paris).
  tribal: { words: /\b(Tribes?|Tribal)\b|California Indian/ },
};
