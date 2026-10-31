import { codeCite, preKCite, research, type FrameworkContract } from "../contract";
import { OTHER_STATE } from "./units/kit";
import { PLAN } from "./plan";

// Ohio's official standards (Ohio's Learning Standards), built by
// gradelings-research/ohio/build_outcomes.py.
const OUTCOMES = research<Record<string, { idx: string }[]>>("ohio/outcomes.json");

export const contract: FrameworkContract = {
  // Pre-K cites the early-learning document (docs/research/ohio/prek).
  preK: preKCite("ohio", "Ohio"),
  cite: codeCite(OUTCOMES, "Ohio"),
  ownPrefix: "oh-",
  adoptsFrom: ["us-ca", "ca-nb", "ca-ns", "ca-mb", "us-tx", "us-or", "us-ny", "us-wa"],
  plan: PLAN,
  // George Washington, Martha Washington and Washington, D.C. are fine. Ohio's own units (oh-) may name other places
  // where Ohio's story calls for it (the Northwest Territory states, Kentucky across the river), and United States
  // history and civics (Grades 8 and 9) name states where the history does. The Grade 9 rhetoric unit quotes the
  // "Letter from Birmingham Jail".
  otherStates: { pattern: OTHER_STATE, exempt: ["ca-g9-rhetoric-and-sources"], historyGrades: ["8", "9"] },
  // Ohio's own units about the Native nations of Ohio are written for Ohio. Other states' units about their Tribes,
  // treaties or California Indian nations stay theirs.
  tribal: { words: /\b(Tribes?|Tribal|treaty|treaties|Indian(?! Ocean)|Native|missions?|Wabanaki)\b/i, from: /^(wa|or|ca|me|tx|ny|mn|ak|al|az|ar|fl|il|co)-/, card: true },
};
