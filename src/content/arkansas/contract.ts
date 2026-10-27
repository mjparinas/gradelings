import { codeCite, research, type FrameworkContract } from "../contract";
import { OTHER_STATE } from "./units/kit";
import { PLAN } from "./plan";

// The Arkansas Academic Standards, built from the Division of Elementary and Secondary Education's documents by
// docs/research/arkansas/build_outcomes.py: every code as the documents print it ("4.NPV.3", "4.RC.8.RL", "4-PS3-1",
// "H.1.4.1"; Grade 9 "A1.LFE.3", "9.RC.5.RL", "BI-LS1-1", "C.3.CIV.5").
const OUTCOMES = research<Record<string, { idx: string }[]>>("arkansas/outcomes.json");

export const contract: FrameworkContract = {
  cite: codeCite(OUTCOMES, "Arkansas"),
  ownPrefix: "ar-",
  adoptsFrom: ["us-ca", "us-mn", "ca-nb", "us-al", "us-az", "ca-ns", "ca-pe", "ca-mb", "us-tx", "us-or", "us-ny", "us-ak", "us-wa", "us-me"],
  plan: PLAN,
  // George Washington, Washington, D.C., the Oregon Trail and the California Gold Rush are US history. Arkansas's own
  // units (ar-) may name other states where the history calls for it; the 50 states and capitals unit names them all.
  // United States history (Grades 7 and 8) and civics (Grade 9) name states where the history does: the Alamo, buying
  // Alaska, the USS Maine, the Montgomery bus boycott and Miranda v. Arizona.
  otherStates: { pattern: OTHER_STATE, exempt: ["or-g5-states-capitals"], historyGrades: ["7", "8", "9"], ownNotesOnly: true },
  // Treaties alone aren't a sign (adopted civics units ask about the Treaty of Paris), and neither is "Native
  // Americans" in a general US history unit such as the Columbian Exchange.
  tribal: { words: /\b(Tribes?|Tribal)\b|California Indian/, from: /^(wa|or|ca|ny|tx|mn|me|ak|al|az)-/ },
};
