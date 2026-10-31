import { codeCite, preKCite, research, type FrameworkContract } from "../contract";
import { PLAN } from "./plan";

// Arizona's official standards, built from the Arizona Department of Education's files by
// docs/research/arizona/build_outcomes.py: every code as the documents print it ("4.NBT.A.1", "4.RL.1", "4.P4U1.1",
// "4.H2.1"; Grade 9 "A1.A-SSE.A.1", "9-10.RL.1", "HS.L2U1.20", "HS.C2.1").
const OUTCOMES = research<Record<string, { idx: string }[]>>("arizona/outcomes.json");

export const contract: FrameworkContract = {
  // Pre-K cites the early-learning document (docs/research/arizona/prek).
  preK: preKCite("arizona", "Arizona"),
  cite: codeCite(OUTCOMES, "Arizona"),
  ownPrefix: "az-",
  adoptsFrom: ["us-ca", "us-mn", "ca-nb", "ca-ns", "ca-pe", "ca-mb", "us-tx", "us-or", "us-ny", "us-wa", "us-me"],
  plan: PLAN,
  // George Washington, Martha Washington and Washington, D.C. are fine, and so are the Oregon Trail and California in
  // United States history (the Gold Rush, statehood, the Compromise of 1850).
  otherStates: { pattern: /Washington(?!,? D\.?C\.?)|Oregon(?! Trail)|California(?! Gold Rush| became|, a free state)/, exempt: ["or-g5-states-capitals"], includeOwn: true },
  // Arizona's own units about its Indian Nations are written for Arizona. Other states' units about their Tribes,
  // treaties or California Indian nations stay theirs.
  tribal: { words: /\b(Tribes?|Tribal|treaty|treaties|Indian(?! Ocean)|Native|missions?|Wabanaki)\b/i, from: /^(wa|or|ca|me|tx|ny|mn|ak|al)-/, card: true },
};
