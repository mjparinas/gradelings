import { codeCite, preKCite, research, type FrameworkContract } from "../contract";
import { OTHER_STATE } from "./units/kit";
import { PLAN } from "./plan";

// Tennessee's official standards (the Tennessee Academic Standards), built by
// gradelings-research/tennessee/build_outcomes.py.
const OUTCOMES = research<Record<string, { idx: string }[]>>("tennessee/outcomes.json");

export const contract: FrameworkContract = {
  // Pre-K cites the early-learning document (docs/research/tennessee/prek).
  preK: preKCite("tennessee", "Tennessee"),
  cite: codeCite(OUTCOMES, "Tennessee"),
  ownPrefix: "tn-",
  adoptsFrom: ["us-ca", "us-al", "us-az", "ca-pe", "ca-mb", "us-tx", "us-or", "us-ny", "us-wa"],
  plan: PLAN,
  // George Washington, Martha Washington and Washington, D.C. are fine. Tennessee's own units (tn-) may name other
  // places where Tennessee's story calls for it (its eight neighbor states, Texas for Crockett and Houston), and the
  // United States history and civics grades (3, 4, 8 and 9) name states where the history does.
  otherStates: { pattern: OTHER_STATE, exempt: ["or-g5-states-capitals", "ca-g9-rhetoric-and-sources"], historyGrades: ["3", "4", "8", "9"] },
  // Tennessee's own units about the Cherokee, Chickasaw and other nations are written for Tennessee. Treaties alone
  // aren't a sign (adopted civics units ask about the Treaty of Paris), and neither is "Native nations" in a general
  // unit about European explorers.
  tribal: { words: /\b(Tribes?|Tribal)\b|California Indian/, from: /^(wa|or|ca|me|tx|ny|mn|ak|al|az|ar|fl|il|co|pa|ga|oh)-/ },
};
