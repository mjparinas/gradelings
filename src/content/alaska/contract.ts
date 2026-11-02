import { codeCite, preKCite, research, type FrameworkContract } from "../contract";
import { PLAN } from "./plan";

// Alaska's official standards, built from the Department of Education and Early Development's files by
// gradelings-research/alaska/build_outcomes.py. English language arts codes ("RL.4.2") add the strand and grade to the number
// the document prints, the way its own progressive-skills table does.
const OUTCOMES = research<Record<string, { idx: string }[]>>("alaska/outcomes.json");

export const contract: FrameworkContract = {
  // Pre-K cites the early-learning document (docs/research/alaska/prek).
  preK: preKCite("alaska", "Alaska"),
  cite: codeCite(OUTCOMES, "Alaska"),
  ownPrefix: "ak-",
  adoptsFrom: ["us-ca", "ca-nb", "ca-ns", "ca-mb", "us-tx", "us-or", "us-wa", "us-me"],
  plan: PLAN,
  // George Washington, Martha Washington and Washington, D.C. are fine, and so are the Oregon Trail and California in
  // United States history (the Gold Rush, statehood, the Compromise of 1850).
  otherStates: { pattern: /Washington(?!,? D\.?C\.?)|Oregon(?! Trail)|California(?! Gold Rush| became|, a free state)/, exempt: ["or-g5-states-capitals"], includeOwn: true },
  // Alaska's own units about Alaska Native peoples are written for Alaska. Other states' units about their Tribes,
  // treaties or California Indian nations stay theirs.
  tribal: { words: /\b(Tribes?|Tribal|treaty|treaties|Indian(?! Ocean)|Native|missions?|Wabanaki)\b/i, from: /^(wa|or|ca|me|tx|ny)-/, card: true },
};
