import { codeCite, research, type FrameworkContract } from "../contract";
import { PLAN } from "./plan";

// Oregon's official standards, built from ODE's files by docs/research/oregon/build_outcomes.py.
const OUTCOMES = research<Record<string, { idx: string }[]>>("oregon/outcomes.json");

export const contract: FrameworkContract = {
  cite: codeCite(OUTCOMES, "Oregon"),
  ownPrefix: "or-",
  // Other states may adopt them; no Canadian framework ever gets them.
  ownSharedWith: ["us-ca", "us-ny", "us-tx", "us-me", "us-mn", "us-ak", "us-al", "us-az", "us-ar", "us-fl", "us-il", "us-co", "us-pa", "us-oh", "us-ga", "us-nj", "us-in", "us-va", "us-mo", "us-nc", "us-ma", "us-md"],
  plan: PLAN,
};
