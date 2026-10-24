import { codeCite, research, type FrameworkContract } from "../contract";
import { PLAN } from "./plan";

// California's official standards, built from CDE's files by docs/research/california/build_outcomes.py.
const OUTCOMES = research<Record<string, { idx: string }[]>>("california/outcomes.json");

export const contract: FrameworkContract = {
  cite: codeCite(OUTCOMES, "California"),
  ownPrefix: "ca-",
  // Other states may adopt the ones that name no California place; no Canadian framework ever gets them.
  ownSharedWith: ["us-ny", "us-tx", "us-me", "us-mn", "us-ak", "us-al", "us-az", "us-ar", "us-fl", "us-il", "us-co", "us-pa", "us-oh", "us-ga", "us-tn"],
  plan: PLAN,
};
