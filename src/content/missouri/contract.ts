import { codeCite, preKCite, research, type FrameworkContract } from "../contract";
import { OTHER_STATE } from "./units/kit";
import { PLAN } from "./plan";

// Missouri's official standards (the Missouri Learning Standards' Grade-Level Expectations), built by
// docs/research/missouri/build_outcomes.py.
const OUTCOMES = research<Record<string, { idx: string }[]>>("missouri/outcomes.json");

export const contract: FrameworkContract = {
  // Pre-K cites the early-learning document (docs/research/missouri/prek).
  preK: preKCite("missouri", "Missouri"),
  cite: codeCite(OUTCOMES, "Missouri"),
  ownPrefix: "mo-",
  adoptsFrom: ["us-ca", "us-ga", "ca-nb", "us-al", "us-fl", "ca-ns", "ca-mb", "us-tx", "us-or", "us-ny", "us-wa", "us-me"],
  plan: PLAN,
  // George Washington, Martha Washington and Washington, D.C. are fine. Missouri's own units (mo-) may name other
  // places where Missouri's story calls for it (Kansas across the border, the trails west), and United States history
  // and civics (Grades 4, 5, 8 and 9) name states where the history does. The Grade 9 rhetoric unit quotes the "Letter
  // from Birmingham Jail".
  otherStates: { pattern: OTHER_STATE, exempt: ["ca-g9-rhetoric-and-sources"], historyGrades: ["4", "5", "8", "9"] },
  // Missouri's own units about the Osage, Missouria and other nations are written for Missouri. Other states' units
  // about their Tribes, treaties or California Indian nations stay theirs.
  tribal: { words: /\b(Tribes?|Tribal|treaty|treaties|Indian(?! Ocean)|Native|missions?|Wabanaki)\b/i, from: /^(wa|or|ca|me|tx|ny|mn|ak|al|az|ar|fl|il|co|ga|oh)-/, card: true },
};
