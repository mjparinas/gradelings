import { codeCite, preKCite, research, type FrameworkContract } from "../contract";
import { OTHER_STATE } from "./units/kit";
import { PLAN } from "./plan";

// Virginia's official standards (the Standards of Learning), built by gradelings-research/virginia/build_outcomes.py.
const OUTCOMES = research<Record<string, { idx: string }[]>>("virginia/outcomes.json");

export const contract: FrameworkContract = {
  // Pre-K cites the early-learning document (docs/research/virginia/prek).
  preK: preKCite("virginia", "Virginia"),
  cite: codeCite(OUTCOMES, "Virginia"),
  ownPrefix: "va-",
  adoptsFrom: ["us-ca", "us-mn", "ca-nb", "us-al", "us-fl", "us-az", "ca-ns", "ca-pe", "ca-mb", "us-tx", "us-or", "us-ny", "us-ak", "us-wa", "us-me"],
  plan: PLAN,
  // George Washington, Martha Washington, Booker T. Washington and Washington, D.C. are fine. Virginia's own units
  // (va-) may name other places where Virginia's story calls for it (Valley Forge, the Wilderness Road into Kentucky),
  // "Letter from Birmingham Jail" is a source in Grade 9 English, and United States history and civics (the units Grade
  // 4 borrows, and Grades 5, 6 and 7) name states where the history does.
  otherStates: { pattern: OTHER_STATE, exempt: ["ca-g9-rhetoric-and-sources"], historyGrades: ["4", "5", "6", "7"], people: ["Booker T."] },
  // Virginia's own units about Virginia's tribes are written for Virginia. Treaties alone aren't a sign (adopted civics
  // units ask about the Treaty of Paris), and neither is "Native nations" in a general unit about explorers.
  tribal: { words: /\b(Tribes?|Tribal)\b|California Indian/, from: /^(wa|or|ca|me|tx|ny|mn|ak|al|az|ar|fl|il|co|pa|ga)-/ },
};
