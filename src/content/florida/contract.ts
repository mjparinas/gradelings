import { codeCite, preKCite, research, type FrameworkContract } from "../contract";
import { OTHER_STATE } from "./units/kit";
import { PLAN } from "./plan";

// Florida's state academic standards, built from the Department of Education's books and CPALMS by
// gradelings-research/florida/build_outcomes.py: every benchmark code as the Department prints it ("MA.4.NSO.1.1",
// "ELA.4.R.1.1", "SC.4.L.16.1", "SS.4.A.1.1"; Grade 9 "MA.912.AR.3.1", "ELA.9.R.1.1", "SC.912.L.14.1", "SS.912.W.1.1").
const OUTCOMES = research<Record<string, { idx: string }[]>>("florida/outcomes.json");

export const contract: FrameworkContract = {
  cite: codeCite(OUTCOMES, "Florida"),
  // Pre-K cites the state's early-learning standards (docs/research/florida/prek).
  preK: preKCite("florida", "Florida"),
  ownPrefix: "fl-",
  adoptsFrom: ["us-ca", "us-mn", "ca-nb", "us-al", "us-az", "ca-ns", "ca-pe", "ca-mb", "us-tx", "us-or", "us-ny", "us-ak", "us-wa", "us-me"],
  plan: PLAN,
  // George Washington, Washington, D.C., the Oregon Trail and the California Gold Rush are US history. Florida's own
  // units (fl-) may name other states where the history calls for it; the 50 states and capitals unit names them all.
  // United States history (Grades 5 and 8) and civics (Grade 7) name states where the history does.
  otherStates: { pattern: OTHER_STATE, exempt: ["or-g5-states-capitals"], historyGrades: ["5", "7", "8", "9"], ownNotesOnly: true },
  // Treaties alone aren't a sign (adopted civics units ask about the Treaty of Paris), and neither is "Native
  // Americans" in a general US history unit such as the Columbian Exchange.
  tribal: { words: /\b(Tribes?|Tribal)\b|California Indian/, from: /^(wa|or|ca|ny|tx|mn|me|ak|al|az|ar|pa)-/ },
};
