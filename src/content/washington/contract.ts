import { codeCite, research, type FrameworkContract } from "../contract";
import { PLAN } from "./plan";

// Washington's official standards, built from OSPI's files by docs/research/washington/build_outcomes.py.
const OUTCOMES = research<Record<string, { idx: string }[]>>("washington/outcomes.json");

export const contract: FrameworkContract = {
  cite: codeCite(OUTCOMES, "Washington"),
  ownPrefix: "wa-",
  adoptsFrom: ["ca-nb", "ca-ns", "ca-mb"],
  // Other states may adopt them; no Canadian framework ever gets them.
  plan: PLAN,
};
