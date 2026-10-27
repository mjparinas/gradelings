import { codeCite, research, type FrameworkContract } from "../contract";
import { OTHER_STATE } from "./units/kit";
import { PLAN } from "./plan";

// Oklahoma's official standards (the Oklahoma Academic Standards), built by
// docs/research/oklahoma/build_outcomes.py.
const OUTCOMES = research<Record<string, { idx: string }[]>>("oklahoma/outcomes.json");

export const contract: FrameworkContract = {
  cite: codeCite(OUTCOMES, "Oklahoma"),
  ownPrefix: "ok-",
  adoptsFrom: ["us-ca", "us-az", "us-co", "us-ga", "us-ny", "us-or", "us-tx", "us-wa", "ca-mb", "ca-nb", "ca-pe"],
  plan: PLAN,
  // George Washington, Martha Washington and Washington, D.C. are fine. Oklahoma's own units (ok-) may name other
  // places where Oklahoma's story calls for it (its neighbor states, California for the Dust Bowl migrants), the United
  // States geography and history grades (4, 5, 8 and 9) name states where the history does, and the states-and-capitals
  // unit names every state.
  otherStates: { pattern: OTHER_STATE, exempt: ["or-g5-states-capitals", "wa-g5-us-geography"], historyGrades: ["4", "5", "8", "9"] },
  // Oklahoma's own units about its Tribal nations are written for Oklahoma. Treaties alone aren't a sign (adopted
  // civics units ask about the Treaty of Paris), and neither is "Native nations" in a general unit about North America.
  tribal: { words: /\b(Tribes?|Tribal)\b|California Indian/ },
};
