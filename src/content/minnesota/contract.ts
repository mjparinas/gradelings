import { codeCite, research, type FrameworkContract } from "../contract";
import { PLAN } from "./plan";

// Minnesota's official benchmarks, built from the Minnesota K-12 Academic Standards by
// docs/research/minnesota/build_outcomes.py.
const OUTCOMES = research<Record<string, { idx: string }[]>>("minnesota/outcomes.json");

export const contract: FrameworkContract = {
  cite: codeCite(OUTCOMES, "Minnesota"),
  ownPrefix: "mn-",
  adoptsFrom: ["us-ca", "ca-nb", "ca-ns", "ca-pe", "ca-mb", "us-or", "us-ny", "us-wa"],
  plan: PLAN,
};
