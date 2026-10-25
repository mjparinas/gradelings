import { codeCite, research, type FrameworkContract } from "../contract";
import { PLAN } from "./plan";

// New Jersey's official standards (the New Jersey Student Learning Standards), built by
// docs/research/new-jersey/build_outcomes.py.
const OUTCOMES = research<Record<string, { idx: string }[]>>("new-jersey/outcomes.json");

export const contract: FrameworkContract = {
  cite: codeCite(OUTCOMES, "New Jersey"),
  ownPrefix: "nj-",
  adoptsFrom: ["us-ca", "us-mn", "ca-nb", "us-al", "us-fl", "us-az", "ca-ns", "ca-pe", "ca-mb", "us-tx", "us-or", "us-ny", "us-ak", "us-wa", "us-me"],
  plan: PLAN,
};
