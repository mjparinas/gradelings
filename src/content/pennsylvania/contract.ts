import { codeCite, preKCite, research, type FrameworkContract } from "../contract";
import { OTHER_STATE } from "./units/kit";
import { PLAN } from "./plan";

// Pennsylvania's academic standards, built from the Department of Education's documents by
// docs/research/pennsylvania/build_outcomes.py: every code as the Department prints it ("CC.2.1.4.B.1", "CC.1.2.4.A",
// "3.1.4.A", "5.1.4.A", "7.1.4.A", "8.1.4.A"; Grade 9 "CC.2.2.HS.D.1", "CC.1.2.9-10.A", "3.1.9-12.A", "5.1.9-12.A").
const OUTCOMES = research<Record<string, { idx: string }[]>>("pennsylvania/outcomes.json");

export const contract: FrameworkContract = {
  // Pre-K cites the early-learning document (docs/research/pennsylvania/prek).
  preK: preKCite("pennsylvania", "Pennsylvania"),
  cite: codeCite(OUTCOMES, "Pennsylvania"),
  ownPrefix: "pa-",
  adoptsFrom: ["us-ca", "us-mn", "ca-nb", "us-al", "us-fl", "us-az", "ca-ns", "ca-pe", "ca-mb", "us-tx", "us-or", "us-ny", "us-ak", "us-wa", "us-me"],
  plan: PLAN,
  // George Washington, Washington, D.C., the Oregon Trail and the California Gold Rush are US history. Pennsylvania's
  // own units (pa-) may name other states where the history calls for it; the 50 states and capitals unit names them
  // all. United States history and civics (Grades 5, 7, 8 and 9) name states where the history does.
  otherStates: { pattern: OTHER_STATE, exempt: ["or-g5-states-capitals"], historyGrades: ["5", "7", "8", "9"], ownNotesOnly: true },
  // Treaties alone aren't a sign (adopted civics units ask about the Treaty of Paris), and neither is "Native
  // Americans" in a general US history unit such as the Columbian Exchange.
  tribal: { words: /\b(Tribes?|Tribal)\b|California Indian/, from: /^(wa|or|ca|ny|tx|mn|me|ak|al|az|ar|fl)-/ },
};
