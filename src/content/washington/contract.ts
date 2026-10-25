import { codeCite, research, type FrameworkContract } from "../contract";
import { PLAN } from "./plan";

// Washington's official standards, built from OSPI's files by docs/research/washington/build_outcomes.py.
const OUTCOMES = research<Record<string, { idx: string }[]>>("washington/outcomes.json");

export const contract: FrameworkContract = {
  cite: codeCite(OUTCOMES, "Washington"),
  ownPrefix: "wa-",
  // Other states may adopt them; no Canadian framework ever gets them.
  ownSharedWith: ["us-or", "us-ca", "us-ny", "us-tx", "us-me", "us-mn", "us-ak", "us-al", "us-az", "us-ar", "us-fl", "us-il", "us-co", "us-pa", "us-oh", "us-ga", "us-nj", "us-in", "us-va"],
  plan: PLAN,
};
