import { codeCite, preKCite, research, type FrameworkContract } from "../contract";
import { OTHER_STATE } from "./units/kit";
import { PLAN } from "./plan";

// Kentucky's official standards, built from the Kentucky Department of Education's files by
// gradelings-research/kentucky/build_outcomes.py.
const OUTCOMES = research<Record<string, { idx: string }[]>>("kentucky/outcomes.json");

export const contract: FrameworkContract = {
  // Pre-K cites the early-learning document (docs/research/kentucky/prek).
  preK: preKCite("kentucky", "Kentucky"),
  cite: codeCite(OUTCOMES, "Kentucky"),
  ownPrefix: "ky-",
  adoptsFrom: ["us-ca", "ca-nb", "ca-ns", "ca-mb", "ca-pe", "us-az", "us-or", "us-ny", "us-wa"],
  plan: PLAN,
  // George Washington, Martha Washington and Washington, D.C. are fine. Kentucky's own units (ky-) may name other
  // places where Kentucky's story calls for it (Virginia, its neighbors across the Ohio River, the Tennessee River),
  // and the United States history and civics grades (4, 5, 8 and 9) name states where the history does.
  otherStates: { pattern: OTHER_STATE, exempt: ["ca-g9-rhetoric-and-sources"], historyGrades: ["4", "5", "8", "9"] },
  // Treaties alone aren't a sign (adopted civics units ask about the Treaty of Paris), and neither is "Native nations"
  // in a general unit about European explorers.
  tribal: { words: /\b(Tribes?|Tribal)\b|California Indian/, from: /^(wa|or|ca|me|tx|ny|mn|ak|al|az|ar|fl|il|co|pa|ga|oh|mi|tn|in|nj|ma|md|va|wi|mo|nc|sc)-/ },
};
