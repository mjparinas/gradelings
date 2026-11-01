import { codeCite, preKCite, research, type FrameworkContract } from "../contract";
import { OTHER_STATE } from "./units/kit";
import { PLAN } from "./plan";

// Kansas's official standards (the Kansas standards for mathematics, English language arts, science and history,
// government and social studies), built from the Kansas State Department of Education's files by gradelings-research/kansas/build_outcomes.py.
const OUTCOMES = research<Record<string, { idx: string }[]>>("kansas/outcomes.json");

export const contract: FrameworkContract = {
  // Pre-K cites the early-learning document (docs/research/kansas/prek).
  preK: preKCite("kansas", "Kansas"),
  cite: codeCite(OUTCOMES, "Kansas"),
  ownPrefix: "ks-",
  adoptsFrom: ["us-az", "us-ca", "ca-nb", "ca-ns", "ca-mb", "us-or", "us-ny", "us-wa"],
  plan: PLAN,
  // George Washington, Martha Washington and Washington, D.C. are fine. Kansas's own units (ks-) may name other places
  // where Kansas's story calls for it (its neighbor states, the trails west, the regions of the U.S.), and the United
  // States history and civics grades (5, 8 and 9) name states where the history does. The national symbols unit names
  // national landmarks, and the rhetoric unit quotes Dr. King's letter from Birmingham. The 2nd grade leaders unit
  // tells Ruby Bridges's story in New Orleans, which Kansas's rights and responsibilities standard calls for.
  otherStates: { pattern: OTHER_STATE, exempt: ["ny-g1-american-symbols", "ca-g2-citizens-and-leaders", "ca-g9-rhetoric-and-sources"], historyGrades: ["5", "8", "9"] },
  // Kansas's own units about the Kansa, Wichita and other nations in Kansas are written for Kansas. Treaties alone
  // aren't a sign (adopted civics units ask about the Treaty of Paris).
  tribal: { words: /\b(Tribes?|Tribal)\b|California Indian/ },
};
