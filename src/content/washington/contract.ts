import { codeCite, preKCite, research, type FrameworkContract } from "../contract";
import { PLAN } from "./plan";

// Washington's official standards, built from OSPI's files by gradelings-research/washington/build_outcomes.py.
const OUTCOMES = research<Record<string, { idx: string }[]>>("washington/outcomes.json");

export const contract: FrameworkContract = {
  cite: codeCite(OUTCOMES, "Washington"),
  // Pre-K cites the state's early-learning standards (docs/research/washington/prek).
  preK: preKCite("washington", "Washington"),
  ownPrefix: "wa-",
  adoptsFrom: ["ca-nb", "ca-ns", "ca-mb"],
  // Other states may adopt them; no Canadian framework ever gets them.
  plan: PLAN,
};
