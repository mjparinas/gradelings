import { codeCite, research, type FrameworkContract } from "../contract";
import { PLAN } from "./plan";

// Oregon's official standards, built from ODE's files by gradelings-research/oregon/build_outcomes.py.
const OUTCOMES = research<Record<string, { idx: string }[]>>("oregon/outcomes.json");

export const contract: FrameworkContract = {
  cite: codeCite(OUTCOMES, "Oregon"),
  ownPrefix: "or-",
  adoptsFrom: ["ca-nb", "ca-ns", "ca-mb", "us-wa"],
  // Other states may adopt them; no Canadian framework ever gets them.
  plan: PLAN,
  // George Washington and Washington, D.C. are fine; "Washington" as a state is not.
  otherStates: { pattern: /Washington(?!,? D\.?C\.?)(?<!George Washington)/, includeOwn: true },
  // Oregon's Tribal History/Shared History is about Oregon's nine Tribes; Washington's Tribal units stay Washington's.
  tribal: { words: /\b(Tribe|Tribal|Native|treaty|treaties)\b/i, from: /^wa-/ },
};
