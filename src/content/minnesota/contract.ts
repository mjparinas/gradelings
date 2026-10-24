import { codeCite, research, type FrameworkContract } from "../contract";
import { PLAN } from "./plan";

// Minnesota's official benchmarks, built from the Minnesota K-12 Academic Standards by
// docs/research/minnesota/build_outcomes.py.
const OUTCOMES = research<Record<string, { idx: string }[]>>("minnesota/outcomes.json");

export const contract: FrameworkContract = {
  cite: codeCite(OUTCOMES, "Minnesota"),
  ownPrefix: "mn-",
  ownSharedWith: ["us-az", "us-ar", "us-fl", "us-pa", "us-ga", "us-nj", "us-in", "us-va"],
  plan: PLAN,
};
