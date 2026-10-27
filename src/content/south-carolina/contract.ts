import { codeCite, research, type FrameworkContract } from "../contract";
import { OTHER_STATE } from "./units/kit";
import { PLAN } from "./plan";

// The South Carolina College- and Career-Ready Standards, built from the South Carolina Department of Education's
// documents by docs/research/south-carolina/build_outcomes.py: every code as the documents print it ("4.NR.1.2",
// "ELA.4.AOR.1.2", "4-PS3-1", "4.2.CX", "3.1.2.AG"; Grade 9 "A1.PAFR.2.3", "ELA.E1.AOR.2.1", "B-LS1-1", "USG.2.CC",
// "EPF.3.ER").
const OUTCOMES = research<Record<string, { idx: string }[]>>("south-carolina/outcomes.json");

export const contract: FrameworkContract = {
  cite: codeCite(OUTCOMES, "South Carolina"),
  ownPrefix: "sc-",
  adoptsFrom: ["us-ca", "us-mn", "ca-nb", "us-al", "us-fl", "us-az", "ca-ns", "ca-pe", "ca-mb", "us-tx", "us-or", "us-ny", "us-ak", "us-wa", "us-me"],
  plan: PLAN,
  // George Washington, Washington, D.C., the Oregon Trail and the California Gold Rush are US history. South Carolina's
  // own units (sc-) may name other states where the history calls for it. United States history (Grades 4, 5 and 8) and
  // civics (Grade 9) name states where the history does: the Alamo, buying Alaska, the Montgomery bus boycott and
  // Miranda v. Arizona.
  otherStates: { pattern: OTHER_STATE, historyGrades: ["4", "5", "8", "9"], ownNotesOnly: true },
  // Treaties alone aren't a sign (adopted civics units ask about the Treaty of Paris), and neither is "Native
  // Americans" in a general US history unit such as the Columbian Exchange.
  tribal: { words: /\b(Tribes?|Tribal)\b|California Indian/, from: /^(wa|or|ca|ny|tx|mn|me|ak|al|az|ar|fl|il|co|pa|ga|oh|nj|in|va|mo|nc|ma|md)-/ },
};
