import { codeCite, preKCite, research, type FrameworkContract } from "../contract";
import { OTHER_STATE } from "./units/kit";
import { PLAN } from "./plan";

// Indiana's official standards (the 2023 Indiana Academic Standards), built by gradelings-research/indiana/build_outcomes.py.
const OUTCOMES = research<Record<string, { idx: string }[]>>("indiana/outcomes.json");

export const contract: FrameworkContract = {
  // Pre-K cites the early-learning document (docs/research/indiana/prek).
  preK: preKCite("indiana", "Indiana"),
  cite: codeCite(OUTCOMES, "Indiana"),
  ownPrefix: "in-",
  adoptsFrom: ["us-ca", "us-mn", "ca-nb", "us-al", "us-fl", "us-az", "ca-ns", "ca-pe", "ca-mb", "us-tx", "us-or", "us-ny", "us-ak", "us-wa", "us-me"],
  plan: PLAN,
  // George Washington, Martha Washington and Washington, D.C. are fine. Indiana's own units (in-) may name other places
  // where Indiana's story calls for it (its neighbors Michigan, Ohio, Kentucky and Illinois), United States history and
  // civics (Grades 5, 6, 8 and 9) name states where the history does (the thirteen colonies, Spanish Florida, the
  // Montgomery bus boycott), and so does the Grade 9 rhetoric unit's "Letter from Birmingham Jail". The 50 states and
  // capitals unit names every state on purpose.
  otherStates: { pattern: OTHER_STATE, exempt: ["or-g5-states-capitals", "ca-g9-rhetoric-and-sources"], historyGrades: ["5", "6", "8", "9"] },
  // Indiana's own units about the Native nations of Indiana are written for Indiana. Treaties alone aren't a sign
  // (adopted civics units ask about the Treaty of Paris), and neither is "Native Americans" in a general US history
  // unit such as the explorers or westward expansion.
  tribal: { words: /(Tribes?|Tribal)|California Indian|Wabanaki/, from: /^(wa|or|ca|me|tx|ny|mn|ak|al|az|ar|fl|il|co|pa|ga)-/ },
};
