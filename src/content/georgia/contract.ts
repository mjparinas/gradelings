import { codeCite, preKCite, research, type FrameworkContract } from "../contract";
import { OTHER_STATE } from "./units/kit";
import { PLAN } from "./plan";

// Georgia's official standards (the Georgia Academic Standards), built by
// gradelings-research/georgia/build_outcomes.py.
const OUTCOMES = research<Record<string, { idx: string }[]>>("georgia/outcomes.json");

export const contract: FrameworkContract = {
  // Pre-K cites the early-learning document (docs/research/georgia/prek).
  preK: preKCite("georgia", "Georgia"),
  cite: codeCite(OUTCOMES, "Georgia"),
  ownPrefix: "ga-",
  adoptsFrom: ["us-ca", "us-mn", "ca-nb", "us-al", "us-fl", "us-az", "ca-ns", "ca-pe", "ca-mb", "us-tx", "us-or", "us-ny", "us-ak", "us-wa", "us-me"],
  plan: PLAN,
  // George Washington, Martha Washington and Washington, D.C. are fine. Georgia's own units (ga-) may name other places
  // where Georgia's story calls for it (the Trail of Tears to Oklahoma, Chattanooga's railroad), and United States
  // history and civics (Grades 4, 5, 8 and 9) name states where the history does.
  otherStates: { pattern: OTHER_STATE, exempt: ["or-g5-states-capitals", "ca-g9-rhetoric-and-sources"], historyGrades: ["4", "5", "8", "9"] },
  // Georgia's own units about the Muscogee (Creek) and Cherokee are written for Georgia. Treaties alone aren't a sign
  // (adopted civics units ask about the Treaty of Paris), and neither is "Native nations" in a general unit about
  // European explorers.
  tribal: { words: /\b(Tribes?|Tribal)\b|California Indian/, from: /^(wa|or|ca|me|tx|ny|mn|ak|al|az|ar|fl|il|co|pa)-/ },
};
