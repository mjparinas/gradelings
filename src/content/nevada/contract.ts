import { codeCite, research, type FrameworkContract } from "../contract";
import { OTHER_STATE } from "./units/kit";
import { PLAN } from "./plan";

// Nevada's official standards (the Nevada Academic Content Standards), built from the Nevada Department of Education's
// files by docs/research/nevada/build_outcomes.py.
const OUTCOMES = research<Record<string, { idx: string }[]>>("nevada/outcomes.json");

export const contract: FrameworkContract = {
  cite: codeCite(OUTCOMES, "Nevada"),
  ownPrefix: "nv-",
  adoptsFrom: ["us-az", "us-ca", "ca-nb", "ca-ns", "ca-mb", "us-or", "us-ny", "us-wa"],
  plan: PLAN,
  // George Washington, Martha Washington and Washington, D.C. are fine. Nevada's own units (nv-) may name other places
  // where Nevada's story calls for it (its neighbor states, the trails west), and the United States history and civics
  // grades (5, 8 and 9) name states where the history does. The national symbols unit names national landmarks, and the
  // rhetoric unit quotes Dr. King's letter from Birmingham. The 2nd grade leaders unit tells Ruby Bridges's story in
  // New Orleans, which Nevada's national identity standards (SS.2.9, SS.2.12) call for.
  otherStates: { pattern: OTHER_STATE, exempt: ["ny-g1-american-symbols", "ca-g2-citizens-and-leaders", "ca-g9-rhetoric-and-sources"], historyGrades: ["5", "8", "9"] },
  // Nevada's own units about the Paiute, Shoshone and Washoe peoples and Nevada's Tribes are written for Nevada.
  // Treaties alone aren't a sign (adopted civics units ask about the Treaty of Paris).
  tribal: { words: /\b(Tribes?|Tribal)\b|California Indian/ },
};
