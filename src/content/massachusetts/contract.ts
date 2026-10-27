import { codeCite, research, type FrameworkContract } from "../contract";
import { OTHER_STATE } from "./units/kit";
import { PLAN } from "./plan";

// Massachusetts's official standards (the Massachusetts Curriculum Frameworks), built by
// docs/research/massachusetts/build_outcomes.py.
const OUTCOMES = research<Record<string, { idx: string }[]>>("massachusetts/outcomes.json");

export const contract: FrameworkContract = {
  cite: codeCite(OUTCOMES, "Massachusetts"),
  // "ma-g", not "ma-": Core French already has a unit called "ma-classe". Kindergarten units are "ma-gk-".
  ownPrefix: "ma-g",
  adoptsFrom: ["us-ca", "us-ga", "ca-nb", "us-al", "ca-mb", "us-tx", "us-or", "us-ny", "us-wa"],
  plan: PLAN,
  // George Washington, Martha Washington and Washington, D.C. are fine. Massachusetts's own units (ma-) may name other
  // places where New England's story calls for it (Maine, once part of Massachusetts, and its neighbors), Grade 4
  // studies the regions and states of the United States, and United States history and civics (Grades 3, 5, 8 and 9)
  // name states where the history does. The Grade 9 rhetoric unit quotes the "Letter from Birmingham Jail".
  otherStates: { pattern: OTHER_STATE, exempt: ["ca-g9-rhetoric-and-sources"], historyGrades: ["3", "4", "5", "8", "9"] },
  // Massachusetts's own units about the Native Peoples of New England are written for Massachusetts. Treaties alone
  // aren't a sign (adopted history units ask about the Treaty of Paris), and neither is "Native nations" in a general
  // unit about European explorers.
  tribal: { words: /\b(Tribes?|Tribal)\b|California Indian/, from: /^(wa|or|ca|me|tx|ny|mn|ak|al|az|ar|fl|il|co|pa|ga|oh)-/ },
};
